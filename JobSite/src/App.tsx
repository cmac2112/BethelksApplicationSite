import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage'
import JobDescription from './components/jobDescription/JobDescription';
import NotFound from './components/notfound/NotFound';
import ApplicationPage from './components/applicationPage';
import NewJob from './components/newJob';
import ApplicationViewer from './components/applicationViewer';
import Success from './components/success';
import { ApplicationProvider } from './components/applicationPage/applicationContext.tsx'
import ConfigurePage from './components/configurePage/configurePage.tsx';
function App() {
  return (

      <Router>
        <ApplicationProvider>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/faculty/:id" element={<JobDescription />} />
        <Route path="/staff/:id" element={<JobDescription />} />
        <Route path="/other/:id" element={<JobDescription />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/admin/newJob" element={<NewJob />} />
        <Route path="/admin/applications/view/:id" element={<ApplicationViewer />} />
        <Route path="/admin/edit/:title/:id" element={<NewJob />} />
        <Route path="/success/:type" element={<Success />} />
        <Route path="/admin/configure" element={<ConfigurePage />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
        </ApplicationProvider>
        </Router>
    
  )
}
export default App
