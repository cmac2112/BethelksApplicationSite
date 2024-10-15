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

  //this is a little bit of an amalgamation though, may change this
  //to one use state somehow.

  //below states are for page rendering
  const [openPositions, setOpenPositions] = useState<Positions[]>([]);
  //state management for fetching open positions
  const [isFaculty, setisFaculty] = useState(true) 
  //if a position is faculty or not, display other upload file inputs

  const [optout, setOptout] = useState(false) //opt out of experience section

  //below are application information
  const [hearAbout, setHearAbout] = useState('');
  const [position, setPosition] = useState('');
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
  const [preferredContact, setPreferredContact] = useState('') // so many, one big one may be more confusing though
  const [legalWork, setLegalWork] = useState('')
  const [sponsorship, setSponsorship] = useState('')
  const [applied, setApplied] = useState('')
  const [employed, setEmployed] = useState('');
  const [related, setRelated] = useState('');
  const [resume, setResume] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState<File | null>(null)
  const [references, setReferences] = useState<File | null>(null)
  const [statementOfTeach, setStatementOfTeach] = useState<File | null>(null)
  const [diversityStatement, setDiversityStatement] = useState<File | null>(null)
  const [graduateTranscript, setGraduateTranscript] = useState<File | null>(null)
  const [performanceRec, setPerformanceRec] = useState<File | null>(null)
  const [employmentHistory1, setEmploymentHistory1] = useState({
    employer: '',
    address: '',
    positionTitle: '',
    startDate: '',
    endDate: '',
    duties: '',
    supervisor: '',
    supervisorTitle: '',
    contact: null,
    reasonLeft: ''
  })
  const [employmentHistory2, setEmploymentHistory2] = useState({
    employer: '',
    address: '',
    positionTitle: '',
    startDate: '',
    endDate: '',
    duties: '',
    supervisor: '',
    supervisorTitle: '',
    contact: null,
    reasonLeft: ''
  })
  const [employmentHistory3, setEmploymentHistory3] = useState({
    employer: '',
    address: '',
    positionTitle: '',
    startDate: '',
    endDate: '',
    duties: '',
    supervisor: '',
    supervisorTitle: '',
    contact: null,
    reasonLeft: ''
  })
  const [employmentHistory4, setEmploymentHistory4] = useState({
    employer: '',
    address: '',
    positionTitle: '',
    startDate: '',
    endDate: '',
    duties: '',
    supervisor: '',
    supervisorTitle: '',
    contact: null,
    reasonLeft: ''
  })
  const [highSchool, setHighSchool] = useState({
    name: '',
    address: '',
    diploma: '',
  })
  const [undergrad, setUndergrad] = useState({
    name: '',
    address: '',
    courseStudy: '',
    diploma: ''
  })
  const [grad, setGrad] = useState({
    name: '',
    address: '',
    courseStudy: '',
    diploma: ''
  })
  const [other, setOther] = useState({
    name: '',
    address: '',
    courseStudy: '',
    diploma: '',
  })
  const [skills, setSkills] = useState('')


  useEffect(() => {
    getPositionOpenings();
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(resume)
    const formData = new FormData();
    formData.append("hear_about", hearAbout);
    formData.append("position", position);
    formData.append("work_time", JSON.stringify(workTime)); // Assuming workTime is an object
    formData.append("start_time", startTime);
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("permAdress", permAdress);
    formData.append("permCity", permCity);
    formData.append("permState", permState);
    formData.append("permZip", permZip);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("preferredContact", preferredContact);
    formData.append("legalWork", legalWork);
    formData.append("sponsorship", sponsorship);
    formData.append("applied", applied);
    formData.append("employed", employed);
    formData.append("related", related);
    if (resume) {
      formData.append("resume", resume);
    }
  
    const response = await fetch(`http://localhost:3000/api/apply`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log("form submitted", formData);
      for(let [key, value] of formData.entries()){
        console.log(`${key}: ${value}`)
      }
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
                onChange={(e) =>{
                  const selectedTitle = e.target.value;
                  setPosition(selectedTitle);
                
                  // Find the position that matches the selected title
                  const selectedPosition = openPositions.find(
                    (positions) => positions.title === selectedTitle
                  );
                
                  // If found, set the employment type to state
                  if (selectedPosition) {
                    setisFaculty(selectedPosition.employment === "faculty" ? true : false)
                  }}}
              >
                <option value="">Choose an option</option>
                {openPositions.map((positions) => (
                  <option key={positions.id} value={positions.title} className="bg-white">
                    {positions.title}{positions.employment}
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
                
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setPhone(e.target.value)} />
                <label htmlFor="phone">Cell/Home Phone</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input
                type="email"
                id="email"
                name="email"
                
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
              <h2 className="p-5 text-xl">Are You Leagally Allowed To Work In The United States?*</h2>
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
                 />
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
                 />
                <label className="px-1" htmlFor="legal-no">No</label>
              </div>
              <h2 className="p-5 text-xl">Will You Require Sponsorship In The Next 1-3 Years?*</h2>
              <div className="px-5">
                <input
                type="radio"
                name="sponsorship"
                id="sponsor-yes"
                value="yes"
                checked={sponsorship === "yes"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="sponsor-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsor-no"
                value="no"
                checked={sponsorship === "no"}
                onChange={(e) =>{
                  setSponsorship(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="sponsor-no">No</label>
                </div>
                <h2 className="p-5 text-xl">Have You Ever Applied For Employment With Our Organization?*</h2>
              <div className="px-5">
                <input
                type="radio"
                name="ever-applied"
                id="applied-yes"
                value="yes"
                checked={applied === "yes"}
                onChange={(e) =>{
                  setApplied(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="applied-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="ever-applied"
                id="applied-no"
                value="no"
                checked={applied === "no"}
                onChange={(e) =>{
                  setApplied(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="applied-no">No</label>
                </div>
                <h2 className="p-5 text-xl">Have You Ever Been Employed By Our Organization?*</h2>
              <div className="px-5">
                <input
                type="radio"
                name="ever-employed"
                id="employed-yes"
                value="yes"
                checked={ employed === "yes"}
                onChange={(e) =>{
                  setEmployed(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="employed-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="ever-employed"
                id="employed-no"
                value="no"
                checked={employed === "no"}
                onChange={(e) =>{
                  setEmployed(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="employed-no">No</label>
                </div>
                <h2 className="p-5 text-xl">Are You Related To Anyone Currently Employed By Our Organization?*</h2>
              <div className="px-5">
                <input
                type="radio"
                name="related"
                id="related-yes"
                value="yes"
                checked={ related === "yes" }
                onChange={(e) =>{
                  setRelated(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="related-yes">Yes</label>
                
              </div>
              <div className="px-5">
              <input
                type="radio"
                name="related"
                id="related-no"
                value="no"
                checked={ related === "no"}
                onChange={(e) =>{
                  setRelated(e.target.value)
                }}
                 />
                <label className="px-1" htmlFor="related-no">No</label>
                </div>
                <h2 className="p-5 text-xl">Upload Documents</h2>
                <p className="py-2 px-5">If you choose to upload a resume, you may opt to skip employment, education, and skills sections.  Please continue to signature section.</p>
                <div className="p-5">
                
                <input
                type="checkbox"
                name="optout"
                id="optout"
                checked={optout === true}
                onChange={() =>{
                  setOptout(!optout)
                }}
                />
                <label htmlFor="optout" className="px-1">Opt out of sections?</label>
                </div>
                <div className="px-5 flex flex-col">
                <label htmlFor="resume">Resume/CV</label>
                  <input
                  type="file"
                  name="resume"
                  id="resume"
                  className="py-3"
                  onChange={(e) =>{
                    if(e.target.files && e.target.files.length > 0){
                    setResume(e.target.files[0])
                    }
                  
                  }}
                   />
                   <label htmlFor="cover-letter">Cover Letter</label>
                   <input
                    type="file"
                    name="cover-letter"
                    id="cover-letter"
                    className="py-3"
                    onChange={(e)=>{
                      if(e.target.files){
                        setCoverLetter(e.target.files[0])
                      }
                    }} />
                    <label htmlFor="references">References</label>
                    <input
                    type="file"
                    name="references"
                    id="references"
                    className="py-3"
                    onChange={(e) =>{
                      if(e.target.files){
                        setReferences(e.target.files[0])
                      }
                    }} />
                    {/*if a position is faculty display below, if not dont show this*/}
                    {isFaculty && (
                      <>
                      <div className="py-5">
                        <h2 className="py-3 text-xl">Upload Required Faculty Documents</h2>
                        <p className="text-maroon">These files are required because you selected a faculty position</p>
                        </div>
                        <label htmlFor="philosophy">Statement of Teaching Philosophy*</label>
                    <input
                    type="file"
                    name="philosophy"
                    id="philosophy"
                    className="py-3"
                    onChange={(e) =>{
                      if(e.target.files){
                        setStatementOfTeach(e.target.files[0])
                      }
                    }} />
                    <label htmlFor="diversity">Diversity Statement*</label>
                    <input
                    type="file"
                    name="diversity"
                    id="diversity"
                    className="py-3"
                    onChange={(e) =>{
                      if(e.target.files){
                     setDiversityStatement(e.target.files[0])
                      }
                    }} />
                    <label htmlFor="grad">Graduate Transcript*</label>
                    <input
                    type="file"
                    name="grad"
                    id="grad"
                    className="py-3"
                    onChange={(e) =>{
                      if(e.target.files){
                     setGraduateTranscript(e.target.files[0])
                      }
                    }} />
                    <label htmlFor="performance">Performance or Rehersal Recording</label>
                    <input
                    type="file"
                    name="performance"
                    id="performance"
                    className="py-3"
                    onChange={(e) =>{
                      if(e.target.files){
                     setPerformanceRec(e.target.files[0])
                      }
                    }} />
                    </>
                    
                    )}
                </div>
                
            <input type="submit"></input>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default applicationPage;
