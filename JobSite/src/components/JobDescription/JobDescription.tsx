import React from "react";
import "./JobDescription.css";
import { useLocation } from "react-router-dom";
import Layout from "../layout/Layout";
//import sanitizeHTML from 'sanitize-html'
//state is transferred from the landing page to the job description page
const JobDescription: React.FC = () => {
  const location = useLocation();
  const { job } = location.state; //access the state
  console.log(JSON.stringify(job));


  //title
  //employment (faculty or staff) binary
  //description
  //department
  //classification - full time- part time etc
  //info - rte of everything else, {dangourouslySet.innerHTML} and sanatize it

  return (
    <Layout>
      {job.map((jobDetail: any, index: number) => (
        <div key={index}>
          <div className="job-page">
            <h2 className="job-header">{jobDetail.title}</h2>
          </div>
          <div className="bg">
            <div className="positions">
              <h2 className="position-header">
                {jobDetail.title} -{" "}
                {jobDetail.employment.data == 1 ? "Faculty" : "Staff"}
              </h2>
              <div className="list-container">
                <p className="job-text">{jobDetail.description}</p>
                <h2>Department</h2>
                <p className="job-text">{jobDetail.department}</p>
                <h2>Classification</h2>
                <p className="job-text">
                  {jobDetail.classification}
                </p>
                <h2>Info</h2>
                <div className="info-container">
                <div className="info"
                dangerouslySetInnerHTML={{ __html: jobDetail.info }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default JobDescription;
