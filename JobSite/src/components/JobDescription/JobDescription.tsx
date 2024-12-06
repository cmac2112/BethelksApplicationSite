import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css'
import { useAuth } from "../../context/LoginContext";
import Error from "../modals/Error";
import { Link } from "react-router-dom";
interface jobPost {
  id: number;
  title: string;
  employment: number;
  classification: string;
  department: string; //should be the departmeny and not faculty or staff
  description: string; //brief description below the title
  info: string; //html of rich text editor for the other relevant information
}

const JobDescription: React.FC = () => {
  const { errorMessage, setErrorMessage } = useAuth()
  const { id: jobId } = useParams<{ id: string }>();

  const [job, setJob] = useState<jobPost>()
  const [loading, setLoading] = useState<boolean>(false)
  console.log(JSON.stringify(job));
  
  const getJobData = async () =>{
    setLoading(true)
    try{
      const response = await fetch(`http://${import.meta.env.VITE_HOST}:3000/api/jobs/${jobId}`)
      const data = await response.json()
      console.log(data)
      setJob(data[0])
      setLoading(false)
    }catch(err){
      console.log('error', err)
      setErrorMessage('could not load job description')
      setLoading(false)
    }
  }

  useEffect(()=>{
    getJobData()
  },[])
  useEffect(() => { //tailwindcss conflicts with the styles given by quill this is a workaround for now
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
      parent.querySelectorAll('li').forEach(child =>{
        child.classList.add('list-inside');
        child.classList.add('indent-8')
        const dataList = child.getAttribute('data-list');
        if(dataList === 'ordered'){
          child.classList.add('list-decimal')
        }else{
          child.classList.add('list-disc')
        }
        
      })
    }
  }, [job]);


  return (
    <Layout>
      {errorMessage && (
        <div className="sticky top-0 w-full p-4" id="error">
          <Error errorString={errorMessage} />
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        job && (
          <>
            <div className="container max-w-full bg-maroon" id="job-page">
              <h2 className="text-center text-2xl text-white p-2">{job.title}</h2>
            </div>
            <div id="bg" className="bg-slate-100 flex justify-center p-2 md:p-6">
              <div className="px-5 bg-white w-3/4">
                <h2 className="text-3xl border-b-2 border-gray-400 py-1">
                  {job.title} -{' '}
                  
                </h2>
                <div className="list-container">
                  <p className="py-3">{job.description}</p>
                  <h2 className="text-xl border-b-2 border-gray-400 py-1">Department</h2>
                  <p className="py-3">{job.department}</p>
                  <h2 className="text-xl border-b-2 border-gray-400 py-1">Classification</h2>
                  <p className="py-3">{job.classification}</p>
                  <h2 className="text-xl border-b-2 border-gray-400 py-1">Info</h2>
                  <div
                    id="rte-area"
                    className="py-3"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.info) }}
                  ></div>
                  <Link to={'/apply'} className="bg-maroon p-2 rounded-xl text-white h-10 w-20 hover:cursor-pointer hover:bg-gray-400">Apply Now</Link>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </Layout>
  );
};


export default JobDescription;