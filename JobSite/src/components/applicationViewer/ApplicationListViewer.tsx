import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useLogin } from "../../context/LoginContext";
import { Link, useParams } from "react-router-dom";
interface pastEmployment {
  employer: string,
  address: string,
  positionTitle: string,
  startDate: string,
  endDate: string,
  duties:string,
  supervisor:string,
  supervisorTitle: string,
  contact: string,
  reasonLeft: string,
}

interface ApplicationType {
  id: number;
  hearAbout: string;
  position: string;
  workTime: string;
  start: string;
  name: string;
  curAddress: string;
  permAddress: string;
  contactInfo: string;
  preferredContact: string;
  authorized: string;
  sponsorship: string;
  everApplied: string;
  everEmployed: string;
  related: string;
  pastEmployment: pastEmployment,
  highschool: string;
  university: string;
  gradUniversity: string;
  other: string;
  skills: string;
}

//maybe scrap this page and put show applications next to edit button on landing page
const ApplicationListViewer = () => {
  const { isLoggedIn, toggleLogIn } = useLogin();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const { id } = useParams<{ id: string }>();

  const getApplications = async () => {
    let response = await fetch(`http://localhost:3000/api/applications/${id}`); //change url later, typically stored in .env
    let data = await response.json();
    setApplications(data);
  };
  useEffect(() => {
    getApplications();
  }, []);
  console.log(applications);
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Error: Not Logged In
          </h2>
        </div>
        <div
          className="bg-gray-100 flex justify-center p-2 md:p-16"
          id="background-container"
        >
          <div className="p-5 bg-white w-3/4">
            <p>Doesnt look like you are logged in</p>
            <button className="text-xl text-maroon" onClick={toggleLogIn}>
              Log in Now
            </button>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            View Applications
          </h2>
          <div
            className="bg-gray-100 flex justify-center p-2 md:p-16"
            id="background-container"
          >
            <div className="p-5 bg-white w-3/4">
              {applications.map((application, index) => (
                <div key={index}>
                  <div>{application.name}</div>
                  <div>{application.workTime}</div>
                  <div>{application.start}</div>
                  <div>{application.curAddress}</div>
                  <div>{application.contactInfo}</div>
                  <div>{application.preferredContact}</div>
                  <div>{application.authorized}</div>
                  <div>{application.sponsorship}</div>
                  <div>{application.everApplied}</div>
                  <div>{application.everEmployed}</div>
                  <div>{application.related}</div>
                  <div>placeholder for resumes and stuff</div>
                  <div>
                    <div>Employer: {application.pastEmployment.employer}</div>
                    <div>Address: {application.pastEmployment.address}</div>
                    <div>Position Title: {application.pastEmployment.positionTitle}</div>
                    <div>Start Date: {application.pastEmployment.startDate}</div>
                    <div>End Date: {application.pastEmployment.endDate}</div>
                    <div>Duties: {application.pastEmployment.duties}</div>
                    <div>Supervisor: {application.pastEmployment.supervisor}</div>
                    <div>Supervisor Title: {application.pastEmployment.supervisorTitle}</div>
                    <div>Contact: {application.pastEmployment.contact}</div>
                    <div>Reason Left: {application.pastEmployment.reasonLeft}</div>
                  </div>
                  <div>{application.highschool}</div>
                  <div>{application.university}</div>
                  <div>{application.gradUniversity}</div>
                  <div>{application.other}</div>
                  <div>{application.skills}</div>
                  <h2 className="text-3xl">end</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
export default ApplicationListViewer;
