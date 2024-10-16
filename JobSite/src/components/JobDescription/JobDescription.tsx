import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../layout/Layout";
import DOMPurify from 'dompurify';
import NotFound from "../notfound";

const JobDescription: React.FC = () => {
  const location = useLocation();
  const job = location.state?.job; //access the state passed through on render
  console.log(JSON.stringify(job));

  /*
  const { title } = useParams<{ title: string }>();
  console.log("from params",title) -- handling this by passing the state to this new component using location.state
  dont need to grap anything from the url and make a get request, this is simple enough

  //title
  //employment (faculty or staff) binary
  //description
  //department
  //classification - full time- part time etc
  //info - rte of everything else, {dangourouslySet.innerHTML} and sanatize it
*/

if (!job){ //if job is null, then show 404
  return(
    <Layout>
      <NotFound />
    </Layout>
  )
}
  return (
    <Layout>
      {job.map((jobDetail: any, index: number) => (
        <div key={index}>
          <div className="container max-w-full bg-maroon" id="job-page">
            <h2 className="text-center text-2xl text-white p-2">{jobDetail.title}</h2>
          </div>
          <div id="bg" className="bg-slate-100 flex justify-center p-2 md:p-6">
            <div className="px-5 bg-white w-3/4">
              <h2 className="text-3xl border-b-2 border-gray-400 py-1">
                {jobDetail.title} -{" "}
                {jobDetail.employment === 'faculty' ? "Faculty" : "Staff"}
              </h2>
              <div className="list-container">
                <p className="job-text">{jobDetail.description}</p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Department</h2>
                <p className="job-text">{jobDetail.department}</p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Classification</h2>
                <p className="job-text">
                  {jobDetail.classification}
                </p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Info</h2>
                <div className="info-container"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jobDetail.info) }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default JobDescription;
