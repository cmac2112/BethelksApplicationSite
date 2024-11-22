import React, { useState, useEffect, useContext } from "react";
import Layout from "../layout/Layout";
import Error from "../modals/Error";
import { useNavigate } from "react-router-dom";
import Pg1 from "./pages/Pg1";
import { ApplicationContext } from "./applicationContext";
import Pg2 from "./pages/Pg2";
import Pg3 from "./pages/Pg3";

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
  const {
    errorMessage,
      setErrorMessage,
      openPositions,
      isFaculty,
      setIsFaculty,
      hearAbout,
      setHearAbout,
      position,
      setPosition,
      workTime,
      setWorkTime,
      handleWorkTimeChange,
      startTime,
      setStartTime,
      fullName,
      setFullName,
      currentAddress,
      setCurrentAddress,
      permanentAddress,
      setPermanentAddress,
      contact,
      setContact,
      preferredContact,
      setPreferredContact,
      legalWork,
      setLegalWork,
      sponsorship,
      setSponsorship,
      applied,
      setApplied,
      employed,
      setEmployed,
      related,
      setRelated,
      employmentHistories,
        setEmploymentHistories,
        highSchool,
        setHighSchool,
        undergrad,
        setUndergrad,
        grad,
        setGrad,
        other,
        setOther,
        skills,
        setSkills
       } = useContext(ApplicationContext)

  const navigate = useNavigate();
  //if a position is faculty or not, display other upload file inputs
  const [optout, setOptout] = useState(false); //opt out of experience section

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

  
  const [agree, setAgree] = useState<boolean>(false);

  // got to be an easier way than all of these ^

  //get current posisitions for <select>

  

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
    //console.log(employmentHistory);
    //formData.append("pastEmployment", JSON.stringify(employmentHistory));
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
          <div className="px-5 bg-white md:w-3/4 w-full">
          <Pg1 />
          <Pg2 />
          <Pg3 />
            {/* kind of cluttered and long here, maybe set these below to their own components
            to make this file not 2000 lines */}
            {!optout && (
              <div className="px-5 flex flex-col">

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
          </div>
        </div>
      </Layout>
  );
};

export default applicationPage;
