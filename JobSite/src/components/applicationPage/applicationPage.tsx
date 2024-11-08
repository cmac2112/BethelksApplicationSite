import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Error from "../modals/Error";
import { useNavigate } from "react-router-dom";

interface Positions {
  id: number;
  title: string;
  employment: string;
  description: string;
  department: string;
  classification: string;
  info: string;
}
interface WorkTime {
  fullTime: boolean;
  partTime: boolean;
  temporary: boolean;
  evenings: boolean;
  weekends: boolean;
  nights: boolean;
}
interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}
interface ContactInfo {
  phone: string;
  email: string;
}
interface EmploymentHistory {
  employer: string;
  address: string;
  positionTitle: string;
  startDate: string;
  endDate: string;
  duties: string;
  supervisor: string;
  supervisorTitle: string;
  contact: string;
  reasonLeft: string;
}
interface School{
  address: string;
  name: string;
  courseStudy?: string;
  diploma: string
}
const applicationPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  //below states are for page rendering
  const [openPositions, setOpenPositions] = useState<Positions[]>([]);
  //state management for fetching open positions
  const [isFaculty, setisFaculty] = useState(false);
  //if a position is faculty or not, display other upload file inputs
  const [optout, setOptout] = useState(false); //opt out of experience section

  //below are application information
  const [hearAbout, setHearAbout] = useState<string>(
    localStorage.getItem("hearAbout") || ""
  );
  const [position, setPosition] = useState<string>("");
  const [workTime, setWorkTime] = useState<WorkTime>(
    JSON.parse(
      localStorage.getItem("workTime") ||
        '{"fullTime":false,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}'
    )
  );
  const [startTime, setStartTime] = useState<string>(localStorage.getItem('start') || '')
  const [fullName, setFullName] = useState<string>(localStorage.getItem("name") || '');
  const [currentAddress, setCurrentAddress] = useState<Address>(JSON.parse(localStorage.getItem("curAddress") || '{"address":"","city":"","state":"","zip":""}'));
  const [permanentAddress, setPermanantAddress] = useState<Address>(JSON.parse(localStorage.getItem("permAddress") || '{"address":"","city":"","state":"","zip":""}'));
  const [contact, setContact] = useState<ContactInfo>(JSON.parse(localStorage.getItem("contactInfo") || `{"phone": "", "email": ""}`));
  const [preferredContact, setPreferredContact] = useState<string>(localStorage.getItem("preferredContact") || ''); 
  const [legalWork, setLegalWork] = useState<string>(localStorage.getItem("authorized") || '');
  const [sponsorship, setSponsorship] = useState<string>(localStorage.getItem("sponsorship") || '');
  const [applied, setApplied] = useState<string>(localStorage.getItem("everApplied") || '');
  const [employed, setEmployed] = useState<string>(localStorage.getItem("everEmployed") || '');
  const [related, setRelated] = useState<string>(localStorage.getItem("related") || '');

  //################################################################################
  //figure out file stuff
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [references, setReferences] = useState<File | null>(null);
  const [statementOfTeach, setStatementOfTeach] = useState<File | null>(null);
  const [diversityStatement, setDiversityStatement] = useState<File | null>(
    null
  );
  const [graduateTranscript, setGraduateTranscript] = useState<File | null>(
    null
  );
  const [performanceRec, setPerformanceRec] = useState<File | null>(null);
//###################################################################################

  console.log(
    coverLetter,
    references,
    statementOfTeach,
    diversityStatement,
    graduateTranscript,
    performanceRec
  );

  const [employmentHistory1, setEmploymentHistory1] = useState<EmploymentHistory>(
    JSON.parse(localStorage.getItem("employmentHistory1") || '{"employer":"","address":"","positionTitle":"","startDate":"","endDate":"","duties":"","supervisor":"","supervisorTitle":"","contact":"","reasonLeft":""}')
  );
  const [employmentHistory2, setEmploymentHistory2] = useState<EmploymentHistory>(
    JSON.parse(localStorage.getItem("employmentHistory2") || '{"employer":"","address":"","positionTitle":"","startDate":"","endDate":"","duties":"","supervisor":"","supervisorTitle":"","contact":"","reasonLeft":""}')
  );
  const [employmentHistory3, setEmploymentHistory3] = useState<EmploymentHistory>(
    JSON.parse(localStorage.getItem("employmentHistory3") || '{"employer":"","address":"","positionTitle":"","startDate":"","endDate":"","duties":"","supervisor":"","supervisorTitle":"","contact":"","reasonLeft":""}')
  );
  const [employmentHistory4, setEmploymentHistory4] = useState<EmploymentHistory>(
    JSON.parse(localStorage.getItem("employmentHistory4") || '{"employer":"","address":"","positionTitle":"","startDate":"","endDate":"","duties":"","supervisor":"","supervisorTitle":"","contact":"","reasonLeft":""}')
  );
  const [highSchool, setHighSchool] = useState<School>(JSON.parse(localStorage.getItem("highschool") || '{"name": "", "address":"","diploma":""}'));
  const [undergrad, setUndergrad] = useState<School>(JSON.parse(localStorage.getItem("university") || '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'));
  const [grad, setGrad] = useState<School>(JSON.parse(localStorage.getItem("gradUniversity") || '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'));
  const [other, setOther] = useState<School>(JSON.parse(localStorage.getItem("other") || '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'));

  const [skills, setSkills] = useState<string>(localStorage.getItem("skills") || '');
  const [agree, setAgree] = useState<boolean>(false);

  // got to be an easier way than all of these ^

  useEffect(() => {
    getPositionOpenings();
  }, []);

  //get current posisitions for <select>
  let host = import.meta.env.VITE_HOST;
  const getPositionOpenings = async () => {
    try {
      let response = await fetch(`http://${host}:3000/api/jobs`);
      let data = await response.json();

      console.log("open positions", data);
      setOpenPositions(data);
    } catch (error) {
      console.error("unable to fetch open positions");
      setErrorMessage("Unable to fetch open positions, please try again");
    }
  };

  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setWorkTime((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    localStorage.setItem("hearAbout", hearAbout);
    localStorage.setItem("position", position);
    localStorage.setItem("workTime", JSON.stringify(workTime));
    localStorage.setItem("start", startTime);
    localStorage.setItem("name", fullName);
    localStorage.setItem("curAddress", JSON.stringify(currentAddress));
    localStorage.setItem("permAddress", JSON.stringify(permanentAddress));
    localStorage.setItem("contactInfo", JSON.stringify(contact));
    localStorage.setItem("preferredContact", preferredContact);
    localStorage.setItem("authorized", legalWork);
    localStorage.setItem("sponsorship", sponsorship);
    localStorage.setItem("everApplied", applied);
    localStorage.setItem("everEmployed", employed);
    localStorage.setItem("related", related);
    localStorage.setItem(
      "employmentHistory1",
      JSON.stringify(employmentHistory1)
    );
    localStorage.setItem(
      "employmentHistory2",
      JSON.stringify(employmentHistory2)
    );
    localStorage.setItem(
      "employmentHistory3",
      JSON.stringify(employmentHistory3)
    );
    localStorage.setItem(
      "employmentHistory4",
      JSON.stringify(employmentHistory4)
    );
    localStorage.setItem("highschool", JSON.stringify(highSchool));
    localStorage.setItem("university", JSON.stringify(undergrad));
    localStorage.setItem("gradUniversity", JSON.stringify(grad));
    localStorage.setItem("other", JSON.stringify(other));
    localStorage.setItem("skills", skills);
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(resume);
    const formData = new FormData();
    formData.append("hearAbout", hearAbout);
    formData.append("position", position);
    formData.append("workTime", JSON.stringify(workTime)); // Assuming workTime is an object
    formData.append("start", startTime);
    formData.append("name", fullName);
    formData.append("curAddress", JSON.stringify(currentAddress));
    formData.append("permAddress", JSON.stringify(permanentAddress));
    formData.append("contactInfo", JSON.stringify(contact));
    formData.append("preferredContact", preferredContact);
    formData.append("authorized", legalWork);
    formData.append("sponsorship", sponsorship);
    formData.append("everApplied", applied);
    formData.append("everEmployed", employed);
    formData.append("related", related);
    /*
    if (resume) {
      formData.append("resume", resume);
    }
    if(coverLetter){
    formData.append("coverLetter", coverLetter)
    }
    if(references){
      formData.append("references", references)
    }
    if(statementOfTeach){
      formData.append("statementOfTeaching", statementOfTeach)
    }
    if(diversityStatement){
      formData.append("diversityStatement",diversityStatement)
    }
    if(graduateTranscript){
      formData.append("graduateTranscript", graduateTranscript)
    }
    if(performanceRec){
      formData.append("performanceRec", performanceRec)
    }
      */
    const employmentHistory = [
      employmentHistory1,
      employmentHistory2,
      employmentHistory3,
      employmentHistory4,
    ];
    console.log(employmentHistory);
    formData.append("pastEmployment", JSON.stringify(employmentHistory));
    formData.append("highschool", JSON.stringify(highSchool));
    formData.append("university", JSON.stringify(undergrad));
    formData.append("gradUniversity", JSON.stringify(grad));
    formData.append("other", JSON.stringify(other));
    formData.append("skills", skills);
    console.log("form data", formData.get("pastEmployment"));

    try {
      const host = import.meta.env.VITE_HOST;
      const response = await fetch(`http://${host}:3000/api/apply`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("form submitted", formData);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        localStorage.clear();
        navigate("/success");
      } else {
        console.error("error submitting form");
        setErrorMessage("Bad response from server, Form not submitted");
      }
    } catch (error) {
      console.error("error submitting form", error);
      setErrorMessage("Form was unable to be sent");
    }
  };
  return (
    <>
      <Layout>
        {errorMessage && (
          <div className="sticky top-0 w-full p-4" id="error">
            <Error errorString={errorMessage} />
          </div>
        )}
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2">Application</h2>
        </div>
        <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
          <form
            className="px-5 bg-white md:w-3/4 w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="p-5 text-xl" id="position-header">
              How did you hear about Bethel?
            </h2>
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
                <label className="px-1" htmlFor="Indeed">
                  Indeed
                </label>
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
                <label className="px-1" htmlFor="HACU">
                  HACU
                </label>
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
                <label className="px-1" htmlFor="Higher-Ed-Jobs">
                  Higher Ed Jobs
                </label>
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
                <label className="px-1" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <h2 className="p-5 text-xl">Position applying for</h2>
            <div className="px-5">
              <select
                name="job-applying-for"
                id="job-applying-for"
                className="bg-slate-200"
                onChange={(e) => {
                  const selectedTitle = e.target.value;
                  setPosition(selectedTitle);

                  // Find the position that matches the selected title
                  const selectedPosition = openPositions.find(
                    (positions) => positions.title === selectedTitle
                  );

                  // If found, set the employment type to state
                  if (selectedPosition) {
                    setisFaculty(
                      selectedPosition.employment === "faculty" ? true : false
                    );
                  }
                }}
              >
                <option value="">Choose an option</option>
                {openPositions.map((positions) => (
                  <option
                    key={positions.id}
                    value={positions.title}
                    className="bg-white"
                  >
                    {positions.title}
                    {positions.employment}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="p-5 text-xl">Working Time</h2>
            <div className="px-5">
              <div>
                <input
                  type="checkbox"
                  id="fullTime"
                  name="fullTime"
                  value="fullTime"
                  checked={workTime.fullTime}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="fullTime">
                  Full Time
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="partTime"
                  value="partTime"
                  name="partTime"
                  checked={workTime.partTime}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="partTime">
                  Part Time
                </label>
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
                <label className="px-1" htmlFor="temporary">
                  Temporary
                </label>
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
                <label className="px-1" htmlFor="evenings">
                  Evenings
                </label>
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
                <label className="px-1" htmlFor="weekends">
                  Weekends
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="nights"
                    name="nights"
                    value="Nights"
                    checked={workTime.nights}
                    onChange={handleWorkTimeChange}
                  />
                  <label className="px-1" htmlFor="nights">
                    Nights
                  </label>
                </div>
              </div>
            </div>
            <h2 className="p-5 text-xl">When are you available to start?</h2>
            <div className="px-5">
              <input
                type="date"
                name="start-time"
                className="border border-gray-200 rounded-xl p-2"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <h2 className="p-5 text-xl">Personal Information</h2>
            <div className="px-5">
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="Enter full name..."
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <h2 className="p-5 text-xl">Current Address</h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="address-street"
                name="address-street"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={currentAddress.address}
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    address: e.target.value,
                  })
                }
              />
              <label htmlFor="address-street">Address</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="city"
                name="city"
                value={currentAddress.city}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    city: e.target.value,
                  })
                }
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="state"
                name="state"
                value={currentAddress.state}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    state: e.target.value,
                  })
                }
              />
              <label htmlFor="state">State</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="zip"
                name="zip"
                value={currentAddress.zip}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    zip: e.target.value,
                  })
                }
              />
              <label htmlFor="zip">Zip</label>
            </div>
            <h2 className="p-5 text-xl">
              Permenant Address If Different From Above
            </h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-address-street"
                name="perm-address-street"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={permanentAddress.address}
                onChange={(e) =>
                  setPermanantAddress({
                    ...permanentAddress,
                    address: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-address-street">Address</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-city"
                name="perm-city"
                value={permanentAddress.city}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanantAddress({
                    ...permanentAddress,
                    city: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-city">City</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-state"
                name="perm-state"
                value={permanentAddress.state}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanantAddress({
                    ...permanentAddress,
                    state: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-state">State</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-zip"
                name="perm-zip"
                value={permanentAddress.zip}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanantAddress({
                    ...permanentAddress,
                    zip: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-zip">Zip</label>
            </div>
            <h2 className="p-5 text-xl">Contact Information</h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contact.phone}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    phone: e.target.value,
                  })
                }
              />
              <label htmlFor="phone">Cell/Home Phone</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="email"
                id="email"
                name="email-input"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={contact.email}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    email: e.target.value,
                  })
                }
              />
              <label htmlFor="email">Email</label>
            </div>
            <h2 className="p-5 text-xl">Preferred Contact Method</h2>
            <div className="px-5">
              <div>
                <input
                  type="radio"
                  id="phone-radio"
                  name="phone-input"
                  value="phone"
                  checked={preferredContact === "phone"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="phone-radio">
                  Phone
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="email-radio"
                  name="email"
                  value="email"
                  checked={preferredContact === "email"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="email-radio">
                  Email
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no-preference"
                  name="no-preference"
                  value="no-preference"
                  checked={preferredContact === "no-preference"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="no-preference">
                  No Preference
                </label>
              </div>
            </div>
            <h2 className="p-5 text-xl">
              Are You Leagally Allowed To Work In The United States?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="legal-work"
                id="legal-yes"
                value="allowed-to-work"
                checked={legalWork === "allowed-to-work"}
                onChange={(e) => {
                  setLegalWork(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="legal-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="legal-work"
                id="legal-no"
                value="not-allowed-to-work"
                checked={legalWork === "not-allowed-to-work"}
                onChange={(e) => {
                  setLegalWork(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="legal-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Will You Require Sponsorship In The Next 1-3 Years?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsor-yes"
                value="yes"
                checked={sponsorship === "yes"}
                onChange={(e) => {
                  setSponsorship(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="sponsor-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsor-no"
                value="no"
                checked={sponsorship === "no"}
                onChange={(e) => {
                  setSponsorship(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="sponsor-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Have You Ever Applied For Employment With Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="ever-applied"
                id="applied-yes"
                value="yes"
                checked={applied === "yes"}
                onChange={(e) => {
                  setApplied(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="applied-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="ever-applied"
                id="applied-no"
                value="no"
                checked={applied === "no"}
                onChange={(e) => {
                  setApplied(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="applied-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Have You Ever Been Employed By Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="ever-employed"
                id="employed-yes"
                value="yes"
                checked={employed === "yes"}
                onChange={(e) => {
                  setEmployed(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="employed-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="ever-employed"
                id="employed-no"
                value="no"
                checked={employed === "no"}
                onChange={(e) => {
                  setEmployed(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="employed-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Are You Related To Anyone Currently Employed By Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="related"
                id="related-yes"
                value="yes"
                checked={related === "yes"}
                onChange={(e) => {
                  setRelated(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="related-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="related"
                id="related-no"
                value="no"
                checked={related === "no"}
                onChange={(e) => {
                  setRelated(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="related-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">Upload Documents</h2>
            <p className="py-2 px-5">
              If you choose to upload a resume, you may opt to skip employment,
              education, and skills sections. Please continue to signature
              section.
            </p>
            <div className="p-5">
              <input
                type="checkbox"
                name="optout-input"
                id="optout"
                checked={optout === true}
                onChange={() => {
                  setOptout(!optout);
                }}
              />
              <label htmlFor="optout" className="px-1">
                Opt out of sections?
              </label>
            </div>
            <div className="px-5 flex flex-col">
              <label htmlFor="resume">Resume/CV</label>
              <input
                type="file"
                name="resume-input"
                id="resume"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setResume(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="cover-letter">Cover Letter</label>
              <input
                type="file"
                name="cover-letter-input"
                id="cover-letter"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files) {
                    setCoverLetter(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="references">References</label>
              <input
                type="file"
                name="references-input"
                id="references"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files) {
                    setReferences(e.target.files[0]);
                  }
                }}
              />
              {/*if a position is faculty display below, if not dont show this*/}
              {isFaculty && (
                <>
                  <div className="py-5">
                    <h2 className="py-3 text-xl">
                      Upload Required Faculty Documents
                    </h2>
                    <p className="text-maroon">
                      These files are required because you selected a faculty
                      position
                    </p>
                  </div>
                  <label htmlFor="philosophy">
                    Statement of Teaching Philosophy*
                  </label>
                  <input
                    type="file"
                    name="philosophy"
                    id="philosophy"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setStatementOfTeach(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="diversity">Diversity Statement*</label>
                  <input
                    type="file"
                    name="diversity"
                    id="diversity"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setDiversityStatement(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="grad">Graduate Transcript*</label>
                  <input
                    type="file"
                    name="grad"
                    id="grad"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setGraduateTranscript(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="performance">
                    Performance or Rehersal Recording
                  </label>
                  <input
                    type="file"
                    name="performance"
                    id="performance"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setPerformanceRec(e.target.files[0]);
                      }
                    }}
                  />
                </>
              )}
            </div>
            {/* kind of cluttered and long here, maybe set these below to their own components
            to make this file not 2000 lines */}
            {!optout && (
              <div className="px-5 flex flex-col">
                <h2 className="py-5 text-xl">
                  Present or Most Recent Employer
                </h2>
                <label htmlFor="employer-input">Employer</label>
                <input
                  type="text"
                  id="employer-input"
                  name="employer"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.employer}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      employer: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-address-input1">Address</label>
                <input
                  type="text"
                  id="employer-address-input1"
                  name="employer-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.address}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-pos-title1">Position</label>
                <input
                  type="text"
                  id="employer-pos-title1"
                  name="employer-pos1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.positionTitle}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      positionTitle: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-start1">Start Date</label>
                <input
                  type="date"
                  id="employer-start1"
                  name="employer-startdate1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.startDate}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      startDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-end1">End Date</label>
                <input
                  type="date"
                  id="employer-end1"
                  name="employer-end-date1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.endDate}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      endDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-duties1">Duties</label>
                <textarea
                  id="employer-duties1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.duties}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      duties: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-name1">Supervisor Name</label>
                <input
                  type="text"
                  id="employer-super-name1"
                  name="employer-supervisorname"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.supervisor}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      supervisor: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-title1">Supervisor Title</label>
                <input
                  type="text"
                  id="employer-super-title1"
                  name="employer-supervisorTitle"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.supervisorTitle}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      supervisorTitle: e.target.value,
                    })
                  }
                />
                <h2 className="text-lg py-3">May we Contact?</h2>
                <div>
                  <input
                    type="radio"
                    id="employer-contact1-yes"
                    name="can-contact1"
                    value="yes"
                    checked={employmentHistory1.contact === "yes"}
                    onChange={(e) =>
                      setEmploymentHistory1({
                        ...employmentHistory1,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact1-yes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="employer-contact1-no"
                    name="can-contact1"
                    value="no"
                    checked={employmentHistory1.contact === "no"}
                    onChange={(e) =>
                      setEmploymentHistory1({
                        ...employmentHistory1,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact1-no">
                    No
                  </label>
                </div>
                <label htmlFor="employer-leaving1">Reason For Leaving</label>
                <input
                  type="text"
                  id="employer-leaving1"
                  name="employer-reason1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.reasonLeft}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      reasonLeft: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">Employer 2</h2>
                <label htmlFor="employer-input2">Employer</label>
                <input
                  type="text"
                  id="employer-input2"
                  name="employer2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.employer}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      employer: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-address-input2">Address</label>
                <input
                  type="text"
                  id="employer-address-input2"
                  name="employer-address2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.address}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-pos-title2">Position</label>
                <input
                  type="text"
                  id="employer-pos-title2"
                  name="employer-pos2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.positionTitle}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      positionTitle: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-start2">Start Date</label>
                <input
                  type="date"
                  id="employer-start2"
                  name="employer-startdate2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.startDate}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      startDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-end2">End Date</label>
                <input
                  type="date"
                  id="employer-end2"
                  name="employer-end-date2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.endDate}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      endDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-duties2">Duties</label>
                <textarea
                  id="employer-duties2"
                  name="employer-duty2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.duties}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      duties: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-name2">Supervisor Name</label>
                <input
                  type="text"
                  id="employer-super-name2"
                  name="employer-supervisorname2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.supervisor}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      supervisor: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-title2">Supervisor Title</label>
                <input
                  type="text"
                  id="employer-super-title2"
                  name="employer-supervisorTitle2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.supervisorTitle}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      supervisorTitle: e.target.value,
                    })
                  }
                />
                <h2 className="text-lg py-3">May we Contact?</h2>
                <div>
                  <input
                    type="radio"
                    id="employer-contact2-yes"
                    name="can-contact2"
                    value="yes"
                    checked={employmentHistory2.contact === "yes"}
                    onChange={(e) =>
                      setEmploymentHistory2({
                        ...employmentHistory2,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact2-yes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="employer-contact2-no"
                    name="can-contact2"
                    value="no"
                    checked={employmentHistory2.contact === "no"}
                    onChange={(e) =>
                      setEmploymentHistory2({
                        ...employmentHistory2,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact2-no">
                    No
                  </label>
                </div>
                <label htmlFor="employer-leaving2">Reason For Leaving</label>
                <input
                  type="text"
                  id="employer-leaving2"
                  name="employer-reason2"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory2.reasonLeft}
                  onChange={(e) =>
                    setEmploymentHistory2({
                      ...employmentHistory2,
                      reasonLeft: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">Employer 3</h2>
                <label htmlFor="employer-input3">Employer</label>
                <input
                  type="text"
                  id="employer-input3"
                  name="employer3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.employer}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      employer: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-address-input3">Address</label>
                <input
                  type="text"
                  id="employer-address-input3"
                  name="employer-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.address}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-pos-title3">Position</label>
                <input
                  type="text"
                  id="employer-pos-title3"
                  name="employer-pos3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.positionTitle}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      positionTitle: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-start3">Start Date</label>
                <input
                  type="date"
                  id="employer-start3"
                  name="employer-startdate3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.startDate}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      startDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-end3">End Date</label>
                <input
                  type="date"
                  id="employer-end3"
                  name="employer-end-date3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.endDate}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      endDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-duties3">Duties</label>
                <textarea
                  id="employer-duties3"
                  name="employer-duty3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.duties}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      duties: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-name3">Supervisor Name</label>
                <input
                  type="text"
                  id="employer-super-name3"
                  name="employer-supervisorname3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.supervisor}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      supervisor: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-title3">Supervisor Title</label>
                <input
                  type="text"
                  id="employer-super-title3"
                  name="employer-supervisorTitle3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.supervisorTitle}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      supervisorTitle: e.target.value,
                    })
                  }
                />
                <h2 className="text-lg py-3">May we Contact?</h2>
                <div>
                  <input
                    type="radio"
                    id="employer-contact3-yes"
                    name="can-contact3"
                    value="yes"
                    checked={employmentHistory3.contact === "yes"}
                    onChange={(e) =>
                      setEmploymentHistory3({
                        ...employmentHistory3,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact3-yes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="employer-contact3-no"
                    name="can-contact3"
                    value="no"
                    checked={employmentHistory3.contact === "no"}
                    onChange={(e) =>
                      setEmploymentHistory3({
                        ...employmentHistory3,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact3-no">
                    No
                  </label>
                </div>
                <label htmlFor="employer-leaving3">Reason For Leaving</label>
                <input
                  type="text"
                  id="employer-leaving3"
                  name="employer-reason3"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory3.reasonLeft}
                  onChange={(e) =>
                    setEmploymentHistory3({
                      ...employmentHistory3,
                      reasonLeft: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">Employer 4</h2>
                <label htmlFor="employer-input4">Employer</label>
                <input
                  type="text"
                  id="employer-input4"
                  name="employer4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.employer}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      employer: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-address-input4">Address</label>
                <input
                  type="text"
                  id="employer-address-input4"
                  name="employer-address4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.address}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-pos-title4">Position</label>
                <input
                  type="text"
                  id="employer-pos-title4"
                  name="employer-pos4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.positionTitle}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      positionTitle: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-start4">Start Date</label>
                <input
                  type="date"
                  id="employer-start4"
                  name="employer-startdate4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.startDate}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      startDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-end4">End Date</label>
                <input
                  type="date"
                  id="employer-end4"
                  name="employer-end-date4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.endDate}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      endDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-duties4">Duties</label>
                <textarea
                  id="employer-duties4"
                  name="employer-duty4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.duties}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      duties: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-name4">Supervisor Name</label>
                <input
                  type="text"
                  id="employer-super-name4"
                  name="employer-supervisorname4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.supervisor}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      supervisor: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-title4">Supervisor Title</label>
                <input
                  type="text"
                  id="employer-super-title4"
                  name="employer-supervisorTitle4"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.supervisorTitle}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      supervisorTitle: e.target.value,
                    })
                  }
                />
                <h2 className="text-lg py-3">May we Contact?</h2>
                <div>
                  <input
                    type="radio"
                    id="employer-contact4-yes"
                    name="can-contact1"
                    value="yes"
                    checked={employmentHistory4.contact === "yes"}
                    onChange={(e) =>
                      setEmploymentHistory4({
                        ...employmentHistory4,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact4-yes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="employer-contact4-no"
                    name="can-contact4"
                    value="no"
                    checked={employmentHistory4.contact === "no"}
                    onChange={(e) =>
                      setEmploymentHistory4({
                        ...employmentHistory4,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact4-no">
                    No
                  </label>
                </div>
                <label htmlFor="employer-leaving4">Reason For Leaving</label>
                <input
                  type="text"
                  id="employer-leaving4"
                  name="employer-reason1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory4.reasonLeft}
                  onChange={(e) =>
                    setEmploymentHistory4({
                      ...employmentHistory4,
                      reasonLeft: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">High School</h2>
                <label htmlFor="highschool">Name</label>
                <input
                  type="text"
                  id="highschool"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={highSchool.name}
                  onChange={(e) =>
                    setHighSchool({
                      ...highSchool,
                      name: e.target.value,
                    })
                  }
                />
                <label htmlFor="highschool-address">Address</label>
                <input
                  type="text"
                  id="highschool-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={highSchool.address}
                  onChange={(e) =>
                    setHighSchool({
                      ...highSchool,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="highschool-diploma">Diploma/Degree Level</label>
                <input
                  type="text"
                  id="highschool-diploma"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={highSchool.diploma}
                  onChange={(e) =>
                    setHighSchool({
                      ...highSchool,
                      diploma: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">
                  Undergraduate College or University
                </h2>
                <label htmlFor="undergrad-name">Name</label>
                <input
                  type="text"
                  id="undergrad-name"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={undergrad.name}
                  onChange={(e) =>
                    setUndergrad({
                      ...undergrad,
                      name: e.target.value,
                    })
                  }
                />
                <label htmlFor="undergrad-address">Address</label>
                <input
                  type="text"
                  id="undergrad-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={undergrad.address}
                  onChange={(e) =>
                    setUndergrad({
                      ...undergrad,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="undergrad-course">Course of Study</label>
                <input
                  type="text"
                  id="undergrad-course"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={undergrad.courseStudy}
                  onChange={(e) =>
                    setUndergrad({
                      ...undergrad,
                      courseStudy: e.target.value,
                    })
                  }
                />
                <label htmlFor="undergrad-diploma">Diploma/Degree Level</label>
                <input
                  type="text"
                  id="undergrad-diploma"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={undergrad.diploma}
                  onChange={(e) =>
                    setUndergrad({
                      ...undergrad,
                      diploma: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">
                  Graduate/Professional College or University
                </h2>
                <label htmlFor="grad-name">Name</label>
                <input
                  type="text"
                  id="grad-name"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={grad.name}
                  onChange={(e) =>
                    setGrad({
                      ...grad,
                      name: e.target.value,
                    })
                  }
                />
                <label htmlFor="grad-address">Address</label>
                <input
                  type="text"
                  id="grad-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={grad.address}
                  onChange={(e) =>
                    setGrad({
                      ...grad,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="grad-course">Course of Study</label>
                <input
                  type="text"
                  id="grad-course"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={grad.courseStudy}
                  onChange={(e) =>
                    setGrad({
                      ...grad,
                      courseStudy: e.target.value,
                    })
                  }
                />
                <label htmlFor="grad-diploma">Diploma/Level of Degree</label>
                <input
                  type="text"
                  id="grad-diploma"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={grad.diploma}
                  onChange={(e) =>
                    setGrad({
                      ...grad,
                      diploma: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">Other (Specify)</h2>
                <label htmlFor="other-name">Name</label>
                <input
                  type="text"
                  id="other-name"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={other.name}
                  onChange={(e) =>
                    setOther({
                      ...other,
                      name: e.target.value,
                    })
                  }
                />
                <label htmlFor="other-address">Address</label>
                <input
                  type="text"
                  id="other-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={other.address}
                  onChange={(e) =>
                    setOther({
                      ...other,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="other-courseStudy">Course of Study</label>
                <input
                  type="text"
                  id="other-courseStudy"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={other.courseStudy}
                  onChange={(e) =>
                    setOther({
                      ...other,
                      courseStudy: e.target.value,
                    })
                  }
                />
                <label htmlFor="other-diploma">Diploma/Level of Degree</label>
                <input
                  type="text"
                  id="other-diploma"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={other.diploma}
                  onChange={(e) =>
                    setOther({
                      ...other,
                      diploma: e.target.value,
                    })
                  }
                />
                <h2 className="py-5 text-xl">Skills</h2>
                <label htmlFor="skills" className="text-xs">
                  SPECIAL TRAINING/SKILLS/PROFESSIONAL MEMBERSHIPS/OTHER
                  INFORMATION
                </label>
                <textarea
                  id="skills"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            )}
            <p className="font-semibold text-sm p-5">
              By checking the below box, I certify that the answers given herein
              are true and complete to the best of my knowledge. I authorize
              investigation of all statements contained in this application and
              supporting documents which have been submitted for employment as
              may be necessary in arriving at an employment decision.{" "}
            </p>
            <p className="font-semibold text-sm p-5">
              I HEREBY UNDERSTAND AND ACKNOWLEDGE THAT, IF HIRED, MY EMPLOYMENT
              RELATIONSHIP WITH THIS ORGANIZATION WOULD BE OF AN “AT WILL”
              NATURE, WHICH MEANS THAT THE EMPLOYEE MAY RESIGN AT ANY TIME AND
              THE EMPLOYER MAY DISCHARGE THE EMPLOYEE AT ANY TIME AND FOR ANY OR
              NO REASON. IT IS FURTHER UNDERSTOOD THAT THIS “AT WILL” EMPLOYMENT
              RELATIONSHIP MAY NOT BE CHANGED BY ANY WRITTEN DOCUMENT OR CONDUCT
              UNLESS SUCH CHANGE IS SPECIFICALLY ACKNOWLEDGED IN WRTING BY AN
              AUTHORIZED EXECUTIVE OF THIS ORGANIZATION.
            </p>
            <p className="p-5">
              In the event of employment, I understand that false or misleading
              information given in my application or interview(s) may result in
              discharge.{" "}
            </p>
            <div className="p-5">
              <input
                type="checkbox"
                id="agree"
                value="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <label htmlFor="agree" className="px-5">
                I Agree
              </label>
            </div>
            <p className="p-5">
              Bethel College does not discriminate in its employment practices
              or in its educational programs or activities on basis of race,
              religion, color, sex/gender, pregnancy, political affiliation,
              religion, creed, ethnicity, national origin (including ancestry),
              citizenship status, physical or mental disability (including
              perceived disability), age, marital status, sexual orientation,
              gender identity, gender expression, veteran or military status
              (including disabled veteran, recently separated veteran, active
              duty wartime or campaign badge veteran, and Armed Forces Service
              Medal veteran), predisposing genetic characteristics, domestic
              violence victim status, or any other protected category under
              applicable local, state, or federal law. The College also
              prohibits retaliation against any person opposing discrimination
              or participating in any discrimination investigation or complaint
              process internally or externally. Reports of misconduct, questions
              regarding Title IX, and concerns about noncompliance should be
              directed to the Director of Human Resources & Compliance (Title IX
              Coordinator). For a complete copy of the policy or for more
              information, please contact the Director of Human Resources &
              Compliance (Title IX Coordinator) or the Assistant Secretary of
              Education within the Office for Civil Rights (OCR). Bethel College
            </p>
            <a href="https://www.bethelks.edu/equalopp">
              Equal Opportunity Policy
            </a>
            <div className="flex justify-center">
              <input
                type="submit"
                className="border border-maroon rounded-xl bg-maroon text-white p-2"
              ></input>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default applicationPage;
