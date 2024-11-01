import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage'
import JobDescription from './components/jobDescription/JobDescription';
import NotFound from './components/notfound/NotFound';
import ApplicationPage from './components/applicationPage';
import NewJob from './components/newJob';
import ApplicationViewer from './components/applicationViewer';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/faculty/:title" element={<JobDescription />} />
        <Route path="/staff/:title" element={<JobDescription />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/admin/newJob" element={<NewJob />} />
        <Route path="/admin/applications/view/:id" element={<ApplicationViewer />} />
        <Route path="/admin/edit/:title/:id" element={<NewJob />} />
      </Routes>
    </Router>
  )
}
export default App
