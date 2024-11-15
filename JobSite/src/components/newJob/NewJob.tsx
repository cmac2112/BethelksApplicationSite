import React, { useRef, useState, useEffect } from "react";
import { useLogin } from "../../context/LoginContext";
import Layout from "../layout";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";

const NewJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [employment, setEmployment] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [classification, setClassification] = useState("");
  const [info, setInfo] = useState("");
  

  useEffect(()=>{
    const headers = document.getElementById('editor')?.querySelectorAll('h1');
    headers?.forEach(header =>{
      header.classList.add('border-b-2')
    })
  },[info])


  //reusing this create job component to edit jobs as well
  const { title } = useParams<{title: string}>();
  const { id } = useParams<{id: string}>();
  console.log(title, 'url title')
  console.log(id, 'job id')

  //vite env variables need to be imported and defined like so
  const host = import.meta.env.VITE_HOST;


  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { isLoggedIn, toggleLogIn } = useLogin();
  
  const getData = async (id: string) =>{
    try{
    const response = await fetch(`http://${host}:3000/api/jobs/${id}`)
    const data = await response.json()
    const jobData = data[0]
    console.log(jobData)
    console.log('editing this data')
    //set states to data grabbed
    setJobTitle(jobData.title)
    setEmployment(jobData.employment)
    setDepartment(jobData.department)
    setDescription(jobData.description)
    setClassification(jobData.classification)
    setInfo(jobData.info)

    if(quillRef.current){
      quillRef.current.root.innerHTML = jobData.info
    }
    }catch(err){
      console.error(err);
    }
  }
  useEffect(() =>{
    if(id){
      //if in edit mode, then prepopulate all fields with data grabbed from database
      getData(id)
      console.log(id)
    }
  }, [id])
  console.log(jobTitle, employment, department, description, classification, info)
  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    
      ['clean']                                         // remove formatting button
    ];
    if(editorRef.current && !quillRef.current){
      quillRef.current = new Quill(editorRef.current,{
        placeholder: "additional info...",
        theme:"snow",
        modules:{
          toolbar: toolbarOptions
        }
      })
      quillRef.current.on('text-change', () =>{
        if(quillRef.current){
          setInfo(quillRef.current.root.innerHTML)
        }
        
      })
    }
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(quillRef.current){
      console.log(quillRef.current.root.innerHTML)
    }
    let url: string;
    let method: string;
    if(id){
     url = `http://${host}:3000/api/newjob/${id}`
     method = "PUT"
    }else{
     url = `http://${host}:3000/api/newjob/`
     method = "POST"
    }
    const response = await fetch(url ,{
      method,
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: jobTitle,
        employment: employment,
        description: description,
        department: department,
        classification: classification,
        info: info,
      })
    }
  
  )
  const data = await response.json();
  console.log(data);
};

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
          {!title ? <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Create New Job Posting
          </h2> : <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Edit : {title}
          </h2>}
          <div
            className="bg-gray-100 flex justify-center p-2 md:p-16"
            id="background-container"
          >
            <div className="p-5 bg-white w-3/4">
              <form
                className="px-5 bg-white md:w-3/4 w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col py-2">
                  <label htmlFor="title" className="text-xl">
                    Job Title
                  </label>
                  
                  <input
                    value={jobTitle}
                    type="text"
                    id="title"
                    className="border border-gray-200 rounded-xl p-2 w-1/2"
                    onChange={(e) => setJobTitle(e.target.value)}
                  /> 
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="employment">
                    Employment type -- support more in configure options page --
                    note to self, api call these options and map them to here
                  </label>
                  <select
                    id="employment"
                    className="bg-slate-200 w-1/4"
                    defaultValue={"Select"}
                    value={employment}
                    onChange={(e) => {
                      setEmployment(e.target.value);
                    }}
                  >
                    <option className="bg-white" value="">
                      Select
                    </option>
                    <option className="bg-white" value="faculty">
                      Faculty
                    </option>
                    <option className="bg-white" value="staff">
                      Staff
                    </option>
                  </select>
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="description">
                    Very brief description of job duties (insert more detailed
                    in the "info" section)
                  </label>
                  <textarea
                    id="description"
                    className="border border-gray-200 rounded-xl p-2 w-1/2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="department">Department</label>
                  <input
                  value={department}
                    type="text"
                    id="department"
                    className="border border-gray-200 rounded-xl p-2 w-1/2"
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="classification">
                    Classification (full-time, part-time etc..)
                  </label>
                  <input
                  value={classification}
                    type="text"
                    id="classification"
                    className="border border-gray-200 rounded-xl p-2 w-1/2"
                    onChange={(e) => setClassification(e.target.value)}
                  />
                </div>
                <div id="toolbar" >
                  <div
                  
                    id="editor"
                    ref={editorRef}
                    role="quilltextbox"
                    content="text/html; charset=UTF-8"
                  ></div>
                </div>
                  <div className="py-3" >
                <input type="submit" className="bg-maroon text-white p-2 rounded-xl hover:cursor-pointer hover:bg-red-600" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default NewJob;
