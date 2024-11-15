import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../layout/Layout";
import DOMPurify from 'dompurify';
import NotFound from "../notfound";
import 'quill/dist/quill.snow.css'


const JobDescription: React.FC = () => {
  const location = useLocation();
  const job = location.state?.job; //access the state passed through on render
  console.log(JSON.stringify(job));

  useEffect(() => {                                     //tailwindcss conflicts with the styles given by quill
    const parent = document.getElementById('rte-area');
    if (parent) {
      parent.querySelectorAll('h3').forEach(child =>{
        child.classList.add('text-xl');
      })
      parent.querySelectorAll('h2').forEach(child => {
        child.classList.add("text-2xl");
      });
      parent.querySelectorAll('h1').forEach(child => {
        child.classList.add("text-3xl");
        child.classList.add("border-b-2")
      });
    }
  }, [job]);

  if (!job) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    );
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
                <p className="py-3">{jobDetail.description}</p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Department</h2>
                <p className="py-3">{jobDetail.department}</p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Classification</h2>
                <p className="py-3">
                  {jobDetail.classification}
                </p>
                <h2 className="text-xl border-b-2 border-gray-400 py-1">Info</h2>
                <div id="rte-area" className="py-3"
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