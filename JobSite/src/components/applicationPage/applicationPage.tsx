import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";

/*
id INT AUTO_INCREMENT PRIMARY KEY,
    hearAbout INT,
    position VARCHAR(255),
    workTime VARCHAR(255),
    start VARCHAR(255),
    name VARCHAR(255),
    curAddress VARCHAR(255),
    permAddress VARCHAR(255),
    contactInfo VARCHAR(255),
    preferredContact VARCHAR(255),
    authorized INT,
    sponsorship INT,
    everApplied INT,
    everEmployed INT,
    pastEmployment LONGTEXT,
    highschool VARCHAR(255),
    university VARCHAR(255),
    gradUniversity VARCHAR(255),
    other VARCHAR(255),
    skills VARCHAR(255)
*/
interface Positions {
  id: number;
  title: string;
  employment: string;
  description: string;
  department: string;
  classification: string;
  info: string;
}
const applicationPage = () => {
  //use state variables to store all information to post
  
  //can either have one big state variable, or seperate them out into their own, either works fine
  //separating them here for easier bug fixing
  const [openPositions, setOpenPositions] = useState<Positions[]>([]);

  const [hearAbout, setHearAbout] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [workTime, setWorkTime] = useState({
    fullTime: false,
    partTime: false,
    temporary: false,
    evenings: false,
    weekends: false,
    nights: false
  })
  const [startTime, setStartTime] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [permAdress, setPermAdress] = useState('')
  const [permCity, setpermCity] = useState('')
  const [permState, setpermState] = useState('')
  const [permZip, setpermZip] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [preferredContact, setPreferredContact] = useState('')
  const [legalWork, setLegalWork] = useState('')
  const [sponsorship, setSponsorship] = useState('')
  const [applied, setApplied] = useState('')


  useEffect(() => {
    getPositionOpenings();
    console.log(workTime)
  }, []);

  //get current posisitions for <select>
  const getPositionOpenings = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/jobs");
      let data = await response.json();

      console.log("open positions", data);
      setOpenPositions(data);
    } catch (error) {
      console.error("unable to fetch open positions");
    }
  };
  
  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, checked } = event.target;

    setWorkTime((prevState) => ({
      ...prevState,
      [name]: checked
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //store urls in env variable, but keep this local host for now
    const response = await fetch(`http://localhost:3000/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hear_about: hearAbout,
        position: position,
        work_time: workTime,
        start_time: startTime,
        fullName: fullName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        permAdress: permAdress,
        permCity: permCity,
        permState: permState,
        permZip: permZip,
        phone: phone,
        email: email,
        preferredContact: preferredContact,
        legalWork: legalWork,
        sponsorship: sponsorship,
      }),
    });
    if (response.ok) {
      console.log("form submitted");
    } else {
      console.error("error submitting form");
    }
  };

  //setup requirement
  // name attribute groups items
  //then set required attribute

  return (
    <>
      <Layout>
        <div className="container mx-auto bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2">Application</h2>
        </div>
        <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
          <form className="px-5 bg-white md:w-3/4 w-full" onSubmit={handleSubmit}>
            <h2 className="p-5 text-xl" id="position-header">How did you hear about Bethel?</h2>
            <div className="px-5">
              <div>
                <input
                  type="radio"
                  id="Indeed"
                  name="hear_about"
                  value="Indeed"
                  checked={hearAbout === "Indeed"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Indeed">Indeed</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="HACU"
                  name="hear_about"
                  value="HACU"
                  checked={hearAbout === "HACU"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="HACU">HACU</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Academic-Diversity-Search"
                  name="hear_about"
                  value="Academic-Diversity-Search"
                  checked={hearAbout === "Academic-Diversity-Search"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Academic-Diversity-Search">
                  Academic Diversity Search
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Higher-Ed-Jobs"
                  name="hear_about"
                  value="Higher-Ed-Jobs"
                  checked={hearAbout === "Higher-Ed-Jobs"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Higher-Ed-Jobs">Higher Ed Jobs</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="hear_about"
                  value="other"
                  checked={hearAbout === "other"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="other">Other</label>
              </div>
            </div>
            <h2 className="p-5 text-xl">Position applying for</h2>
            <div className="px-5">
              <select
                name="job-applying-for"
                id="job-applying-for"
                className="bg-slate-200"
                onChange={(e) => {
                  const selectedOption = e.target.selectedOptions[0];
                  setPosition(selectedOption.text);
                }}
              >
                <option value="">Choose an option</option>
                {openPositions.map((positions) => (
                  <option key={positions.id} value={positions.id} className="bg-white">
                    {positions.title}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="p-5 text-xl">Working Time</h2>
            <div className="px-5">
            <div>
              <input
                type="checkbox"
                id="FullTime"
                name="fullTime"
                value="Full-Time"
                checked={workTime.fullTime}
                onChange={handleWorkTimeChange}
              />
              <label className="px-1" htmlFor="fullTime">Full Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="PartTime"
                name="partTime"
                value="Part-Time"
                checked={workTime.partTime}
                onChange={handleWorkTimeChange}
              />
              <label className="px-1" htmlFor="partTime">Part Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="temporary"
                name="temporary"
                value="Temporary"
                checked={workTime.temporary}
                onChange={handleWorkTimeChange}
              />
              <label className="px-1" htmlFor="temporary">Temporary</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="evenings"
                name="evenings"
                value="Evenings"
                checked={workTime.evenings}
                onChange={handleWorkTimeChange}
              />
              <label className="px-1" htmlFor="evenings">Evenings</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="weekends"
                name="weekends"
                value="Weekends"
                checked={workTime.weekends}
                onChange={handleWorkTimeChange}
              />
              <label className="px-1" htmlFor="weekends">Weekends</label>
              <div>
                <input
                  type="checkbox"
                  id="nights"
                  name="nights"
                  value="Nights"
                  checked={workTime.nights}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="nights">Nights</label>
              </div>
            </div>
            </div>
            <h2 className="p-5 text-xl">When are you available to start?</h2>
            <div className="px-5">
                <input
                type="date"
                name="start-time"
                className="border border-gray-200 rounded-xl p-2"
                onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <h2 className="p-5 text-xl">Personal Information</h2>
              <div className="px-5">
                <input 
                type="text"
                id="first-name"
                name="first-name" 
                placeholder="Enter full name..."
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setFullName(e.target.value)} />
              </div>
              <h2 className="p-5 text-xl">Current Address</h2>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="address-street"
                name="address-street" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setAddress(e.target.value)} />
                <label htmlFor="address-street">Address</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="city"
                name="city" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setCity(e.target.value)} />
                <label htmlFor="city">City</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="state"
                name="state" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setState(e.target.value)} />
                <label htmlFor="state">State</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="zip"
                name="zip" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setZip(e.target.value)} />
                <label htmlFor="zip">Zip</label>
              </div>
              <h2 className="p-5 text-xl">Permenant Address If Different From Above</h2>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-address-street"
                name="perm-address-street" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setPermAdress(e.target.value)} />
                <label htmlFor="perm-address-street">Address</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-city"
                name="perm-city" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermCity(e.target.value)} />
                <label htmlFor="perm-city">City</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-state"
                name="perm-state" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermState(e.target.value)} />
                <label htmlFor="perm-state">State</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-zip"
                name="perm-zip" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermZip(e.target.value)} />
                <label htmlFor="perm-zip">Zip</label>
              </div>
              <h2 className="p-5 text-xl">Contact Information</h2>
              <div className="px-5 flex flex-col-reverse">
                <input
                type="number"
                id="phone"
                name="phone"
                required
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setPhone(e.target.value)} />
                <label htmlFor="phone">Cell/Home Phone</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input
                type="email"
                id="email"
                name="email"
                required
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
              </div>
              <h2 className="p-5 text-xl">Preferred Contact Method</h2>
              <div className="px-5">
              <div>
                <input
                type="radio"
                id="phone"
                name="phone"
                value="phone"
                checked={preferredContact === "phone"}
                onChange={(e) =>{
                  setPreferredContact(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="phone">Phone</label>
              </div>
              <div>
                <input
                type="radio"
                id="email"
                name="email"
                value="email"
                checked={preferredContact === "email"}
                onChange={(e) =>{
                  setPreferredContact(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="email">Email</label>
              </div>
              <div>
                <input
                type="radio"
                id="no-preference"
                name="no-preference"
                value="no-preference"
                checked={preferredContact === "no-preference"}
                onChange={(e) =>{
                  setPreferredContact(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="no-preference">No Preference</label>
              </div>
              </div>
              <h2 className="p-5 text-xl">Are You Leagally Allowed To Work In The United States?</h2>
              <div className="px-5">
                <input
                type="radio"
                name="legal-work"
                id="legal-yes"
                value="allowed-to-work"
                checked={legalWork === "allowed-to-work"}
                onChange={(e) =>{
                  setLegalWork(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="legal-work"
                id="legal-no"
                value="not-allowed-to-work"
                checked={legalWork === "not-allowed-to-work"}
                onChange={(e) =>{
                  setLegalWork(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-no">No</label>
              </div>
              <h2 className="p-5 text-xl">Will You Require Sponsorship In The Next 1-3 Years?</h2>
              <div className="px-5">
                <input
                type="radio"
                name="sponsorship"
                id="sponsor-yes"
                value="sponsorship-yes"
                checked={legalWork === "sponsorship-yes"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsorship-no"
                value="sponsorship-no"
                checked={legalWork === "sponsorship-no"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-no">No</label>
                </div>
                <h2 className="p-5 text-xl">Have You Ever Applied For Employment With Our Organization?*</h2>
              <div className="px-5">
                <input
                type="radio"
                name="ever-applied"
                id="applied-yes"
                value="applied-yes"
                checked={legalWork === "sponsorship-yes"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsorship-no"
                value="sponsorship-no"
                checked={legalWork === "sponsorship-no"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                required />
                <label className="px-1" htmlFor="legal-no">No</label>
                </div>
            <input type="submit"></input>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default applicationPage;
