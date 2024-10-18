//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage'
import JobDescription from './components/JobDescription/JobDescription';
import NotFound from './components/notfound/NotFound';
import ApplicationPage from './components/applicationPage';
import NewJob from './components/newJob';
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
  return (

    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/faculty/:title" element={<JobDescription />} />
        <Route path="/staff/:title" element={<JobDescription />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/newJob" element={<NewJob />} />
      </Routes>
    </Router>
  )
}
export default App
