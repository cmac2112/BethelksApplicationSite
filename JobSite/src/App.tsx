//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage/Landing';
import JobDescription from './components/JobDescription/JobDescription';
/*
interface Faculty{
id: number;
title: string;
description: string;
department: string;
classification: number;
info: string;
}
*/

function App() {
  //const [test, setTest] = useState<Faculty[]>([])
/*
  const getData = async () => {
    try{
      const repsonse = await fetch('http://localhost:3000/api/faculty')
      const data = await repsonse.json()
      console.log(data)
      //const faculty = data.map((city: {name: string, id: number}) => ({name: city.name,id: city.id}));
      const faculty = data.map((faculty: {title: string, id: number}) =>({title: faculty.title, id: faculty.id}))
      console.log(faculty)
      setTest(faculty)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() =>{
    getData()
    }, [])
    
/*{test.map((faculty) => (
        <li key={faculty.id}>
          {faculty.title}
          </li>
          <div>
      <Header />
      {test.map((faculty) => (
        <li key={faculty.id}>
          {faculty.title}
          </li>
      ))}
    </div>
      ))}*/  

    //change apply route to a form
  return (

    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="faculty/:title" element={<JobDescription />} />
        <Route path="staff/:title" element={<JobDescription />} />
        <Route path="apply" element={<LandingPage />} />
      </Routes>
      </Router>
  )
}
export default App
