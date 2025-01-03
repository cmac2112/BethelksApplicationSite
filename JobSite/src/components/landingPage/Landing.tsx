import { useEffect, useState } from "react";
import Layout from "../layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/LoginContext";
import Error from "../modals/Error";

interface jobPost {
  id: number;
  title: string;
  employment: number;
  classification: string;
  department: string; //should be the departmeny and not faculty or staff
  description: string; //brief description below the title
  info: string; //html of rich text editor for the other relevant information
}

const LandingPage: React.FC = () => {
  const [faculty, setFaculty] = useState<jobPost[]>([]);
  // if we want to support positions other than faculty or staff, this state structure will have to change
  const [applicationCountsFaculty, setApplicationCountsFaculty] = useState<{
    [key: string]: number;
  }>({});
  //hashmaps for application number for each job posting
  /* would look like
  job1: 4 applications
  job2: 0 applications
  etc. */
  const [applicationCountsStaff, setApplicationCountsStaff] = useState<{
    [key: string]: number;
  }>({});
  const [applicationCountsOther, setApplicationCountsOther] = useState<{
    [key: string]: number;}>({});
  
  const [staff, setStaff] = useState<jobPost[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [other, setOther] = useState<jobPost[]>([]);
  const { isLoggedIn } = useAuth();

  //vite env variables need to be imported and defined like so
  const host = import.meta.env.VITE_HOST;

  const getData = async () => {
    try {
      const response = await fetch(`http://${host}:3000/api/staff`); //change these urls to whatever we need when hosting, i dont know enough about hosting environments to give an answer on these
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to fetch staff jobs')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    try {
      const response = await fetch(`http://${host}:3000/api/faculty`);
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to fetch faculty jobs')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    try{
      const response = await fetch(`http://${host}:3000/api/other`);
      const data = await response.json()
      setOther(data);
    }catch(error){
      console.log(error)
      setErrorMessage('Failed to fetch other jobs');
      setTimeout(() => setErrorMessage(null), 5000)
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://${host}:3000/api/jobs/delete/${id}`,
        {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
          },
        },
      );
      const data = await response.json();
      console.log(data)
      setFaculty([]);
      setStaff([]);
      getData();
    } catch (err) {
      console.error(err);
      setErrorMessage(`Failed to delete job with id: ${id}`)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  };
  const mapFaculty = faculty.map((faculty: jobPost) => (
    <li key={faculty.id}>
      <div className="flex justify-between py-1">
        <Link
          to={`/faculty/${faculty.id}`}
          className="text-maroon underline hover:text-gray-500"
        >
          {typeof faculty.title === "string" ? faculty.title : faculty.title}
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <Link
              to={`/admin/applications/view/${faculty.title}`}
              className="text-maroon px-2"
            >
              Applications
            </Link>
            <div className="bg-maroon h-6 w-6 rounded-full text-center text-white">
              {/*to hold application number notification */}
              {applicationCountsFaculty[faculty.title] || 0}
            </div>
            <Link
              to={`/admin/edit/${faculty.title}/${faculty.id}`}
              className="text-blue-800 px-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(faculty.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  ));

  const mapStaff = staff.map((staff: jobPost) => (
    <li key={staff.id}>
      <div className="flex justify-between py-1">
        <Link
          to={`/staff/${staff.id}`}
          className="text-maroon underline hover:text-gray-500"
        >
          {staff.title}
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <Link
              to={`/admin/applications/view/${staff.title}`}
              className="text-maroon px-2"
            >
              Applications
            </Link>
            <div className="bg-maroon h-6 w-6 rounded-full text-center text-white">
              {/*to hold application number notification */}
              {applicationCountsStaff[staff.title] || 0}
            </div>
            <Link
              to={`/admin/edit/${staff.title}/${staff.id}`}
              className="text-blue-800 px-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(staff.id)}
              className="text-red-600"
            >
              Delete
            </button>
            {/* have a "view applications button here
        that maybe also has the number of applications to it*/}
          </div>
        )}
      </div>
    </li>
  ));
  const mapOther = other.map((other: jobPost) => (
    <li key={other.id}>
      <div className="flex justify-between py-1">
        <Link
          to={`/other/${other.id}`}
          className="text-maroon underline hover:text-gray-500"
        >
          {other.title}
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <Link
              to={`/admin/applications/view/${other.title}`}
              className="text-maroon px-2"
            >
              Applications
            </Link>
            <div className="bg-maroon h-6 w-6 rounded-full text-center text-white">
              {/*to hold application number notification */}
              {applicationCountsOther[other.title] || 0}
            </div>
            <Link
              to={`/admin/edit/${other.title}/${other.id}`}
              className="text-blue-800 px-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(other.id)}
              className="text-red-600"
            >
              Delete
            </button>
            {/* have a "view applications button here
        that maybe also has the number of applications to it*/}
          </div>
        )}
      </div>
    </li>
  ));


  //get initial data
  useEffect(() => {
    getData();
  }, []);

  //second use effect to get the application count of each item
  useEffect(() => {
    const fetchApplicationCountsFaculty = async (faculty: jobPost[]) => {
      const counts: { [key: string]: number } = {};
      for (const job of faculty) {
        try {
          const response = await fetch(
            `http://${host}:3000/api/applications/${job.title}`
          );
          const data = await response.json();
          counts[job.title] = data.length;
        } catch (error) {
          console.log(error);
          setErrorMessage(`Unable to get application count for some jobs`)
          setTimeout(() => setErrorMessage(null), 5000)
        }
      }
      setApplicationCountsFaculty(counts);
    };
    const fetchApplicationCountsStaff = async (staff: jobPost[]) => {
      const counts: { [key: string]: number } = {};
      for (const job of staff) {
        try {
          const response = await fetch(
            `http://${host}:3000/api/applications/${job.title}`
          );
          const data = await response.json();
          counts[job.title] = data.length;
        } catch (error) {
          console.log(error);
          setErrorMessage(`Unable to get application count for some jobs`)
          setTimeout(() => setErrorMessage(null), 5000)
        }
      }
      setApplicationCountsStaff(counts);
    };
    const fetchApplicationCountsOther = async (other: jobPost[]) => {
      const counts: { [key: string]: number } = {};
      for (const job of other) {
        try {
          const response = await fetch(
            `http://${host}:3000/api/applications/${job.title}`
          );
          const data = await response.json();
          counts[job.title] = data.length;
        } catch (error) {
          console.log(error);
          setErrorMessage(`Unable to get application count for some jobs`)
          setTimeout(() => setErrorMessage(null), 5000)
        }
      }
      setApplicationCountsOther(counts);
    };
    if (faculty.length > 0) {
      fetchApplicationCountsFaculty(faculty);
    }
    if (staff.length > 0) {
      fetchApplicationCountsStaff(staff);
    }
    if(other.length > 0){
      fetchApplicationCountsOther(other)
    }
  }, [faculty, staff]);

  return (
    <div className="relative">
      {errorMessage && (
      <div className="absolute w-full top-48 left-1/2" id="error">
          <Error errorString={errorMessage} />
          </div>
  )}
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
          <div className="p-5 bg-white w-3/4 shadow-xl" id="positions-faculty">
            <h2
              className="text-3xl  border-b-2 border-gray-400 px-5 py-1"
              id="position-header-faculty"
            >
              Faculty
            </h2>
            <div id="list-container">
              <ol id="faculty" className="py-5">
                {mapFaculty}
              </ol>
            </div>

            <h2
              className="text-3xl border-b-2 border-gray-400 px-5 py-1"
              id="position-header-staff"
            >
              Staff
            </h2>
            <div id="list-container">
              <ol id="staff" className="py-5">
                {mapStaff}
              </ol>
              </div>
              <h2
              className="text-3xl border-b-2 border-gray-400 px-5 py-1"
              id="position-header-staff"
            >
              Other
            </h2>
            <div id="list-container">
              <ol id="other" className="py-5">
                {mapOther}
              </ol>
              <p className="non-dis">Non Discrimination Statement</p>
              {isLoggedIn && (
                <div className="flex flex-col">
                  <Link to="/admin/newJob" className="text-maroon">
                    Create New Job
                  </Link>
                  <Link to="/admin/configure" className="text-maroon">
                    Configure
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LandingPage;
