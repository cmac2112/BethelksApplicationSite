import { useEffect, useState } from "react";
import Layout from "../layout";

import { Link } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";

interface jobPost {
  id: number;
  title: string;
  employment: number;
  classification: string;
  department: string;
  description: string; //brief description below the title
  info: string; //html of rich text editor for the other relevant information
}

const LandingPage = () => {
  const [faculty, setFaculty] = useState<jobPost[]>([]);
  const [staff, setStaff] = useState<jobPost[]>([]);

  const { isLoggedIn } = useLogin();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/staff");
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch("http://localhost:3000/api/faculty");
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.log(error);
    }
  };
  const mapFaculty = faculty.map((faculty: jobPost) => (
    <li key={faculty.id}>
      <div className="flex justify-between">
      <Link
        to={`/faculty/${faculty.title.replace(/\s+/g, "-").toLowerCase()}`}
        state={{ job: [faculty] }}
        className="text-maroon underline hover:text-gray-500"
      >
        {typeof faculty.title === "string" ? faculty.title : faculty.title}
      </Link>
      {isLoggedIn && (
      <Link to="/" className="text-maroon">Edit</Link>
      )}
      </div>
    </li>
  ));

  const mapStaff = staff.map((staff: jobPost) => (
    <li key={staff.id}>
      <div className="flex justify-between">
      <Link
        to={`/staff/${staff.title.replace(/\s+/g, "-").toLowerCase()}`}
        state={{ job: [staff] }}
        className="text-maroon underline hover:text-gray-500"
      >
        {staff.title}
      </Link>
      {isLoggedIn && (
      <Link to="/" className="text-maroon">Edit</Link>
      )}
      </div>
    </li>
  ));

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Layout>
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Current Position Openings
          </h2>
        </div>
        <div
          className="bg-gray-100 flex justify-center p-2 md:p-16"
          id="background-container"
        >
          <div className="p-5 bg-white w-3/4" id="positions-faculty">
            <h2
              className="text-3xl  border-b-2 border-gray-400 px-5 py-1"
              id="position-header-faculty"
            >
              Faculty
            </h2>
            <div id="list-container">
              <ol id="faculty" className="py-5">{mapFaculty}</ol>
            </div>

            <h2
              className="text-3xl border-b-2 border-gray-400 px-5 py-1"
              id="position-header-staff"
            >
              Staff
            </h2>
            <div id="list-container">
              <ol id="staff" className="py-5">{mapStaff}</ol>
              <p className="non-dis">Non Discrimination Statement</p>
              {isLoggedIn && (
                <>
                <Link to="/newJob" className="text-maroon">Create New Job</Link>
                <Link to="/viewApplications" className="text-maroon">View Submitted Applications</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LandingPage;
