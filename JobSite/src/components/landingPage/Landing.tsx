import { useEffect, useState } from "react";
import Layout from "../layout";
import { Link } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";

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
  const [staff, setStaff] = useState<jobPost[]>([]);
  const { isLoggedIn } = useLogin();

  //vite env variables need to be imported and defined like so
  const host = import.meta.env.VITE_HOST;

  const getData = async () => {
    try {
      const response = await fetch(`http://${host}:3000/api/staff`); //change these urls to whatever we need when hosting, i dont know enough about hosting environments to give an answer on these
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.log(error);
     
    }
    try {
      const response = await fetch(`http://${host}:3000/api/faculty`);
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://${host}:3000/api/jobs/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      setFaculty([]);
      setStaff([]);
      getData();
    } catch (err) {
      console.error(err);
    }
  };
  const mapFaculty = faculty.map((faculty: jobPost) => (
    <li key={faculty.id}>
      <div className="flex justify-between py-1">
        <Link
          to={`/faculty/${faculty.title.replace(/\s+/g, "-").toLowerCase()}`}
          state={{ job: [faculty] }}
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
          to={`/staff/${staff.title.replace(/\s+/g, "-").toLowerCase()}`}
          state={{ job: [staff] }}
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
          console.log("faculty count", counts);
        } catch (error) {
          console.log(error);
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
          console.log("staff count:", counts);
        } catch (error) {
          console.log(error);
        }
      }
      setApplicationCountsStaff(counts);
    };
    if (faculty.length > 0) {
      fetchApplicationCountsFaculty(faculty);
    }
    if (staff.length > 0) {
      fetchApplicationCountsStaff(staff);
    }
  }, [faculty, staff]);

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
    </>
  );
};

export default LandingPage;
