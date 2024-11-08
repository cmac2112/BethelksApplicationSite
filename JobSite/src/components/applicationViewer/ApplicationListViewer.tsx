import { useEffect, useState } from "react";
import Layout from "../layout";
import { useLogin } from "../../context/LoginContext";
import { useParams } from "react-router-dom";
import Error from "../modals/Error";

interface pastEmployment {
  employer: string;
  address: string;
  positionTitle: string;
  startDate: string;
  endDate: string;
  duties: string;
  supervisor: string;
  supervisorTitle: string;
  contact: string;
  reasonLeft: string;
}
interface ApplicationType {
  id: number;
  hearAbout: string;
  position: string;
  workTime: string;
  start: string;
  name: string;
  curAddress: string;
  permAddress: string;
  contactInfo: string;
  preferredContact: string;
  authorized: string;
  sponsorship: string;
  everApplied: string;
  everEmployed: string;
  related: string;
  pastEmployment: pastEmployment[];
  highschool: string;
  university: string;
  gradUniversity: string;
  other: string;
  skills: string;
}

//maybe scrap this page and put show applications next to edit button on landing page
const ApplicationListViewer = () => {
  const { isLoggedIn, toggleLogIn } = useLogin();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  let host = import.meta.env.VITE_HOST;

  const getApplications = async () => {
    try {
      let response = await fetch(`http://${host}:3000/api/applications/${id}`); //change url later, typically stored in .env
      let data: ApplicationType[] = await response.json();

      const parsedData = data.map((application: ApplicationType) => ({
        ...application,
        pastEmployment: JSON.parse(
          application.pastEmployment as unknown as string //weird
        ),
      }));
      console.log(parsedData);
      setApplications(parsedData);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Unable to get applications for job id: ${id}`);
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  };
  useEffect(() => {
    getApplications();
  }, []);
  const parsedApplications = applications.map((application) => {
    let workTime;
    let curAddress;
    let permAddress;
    let contact;
    let highschool;
    let university;
    let gradUniversity;
    let other;
    let pastEmployment;

    workTime = JSON.parse(application.workTime);
    curAddress = JSON.parse(application.curAddress);
    permAddress = JSON.parse(application.permAddress);
    contact = JSON.parse(application.contactInfo);
    highschool = JSON.parse(application.highschool);
    university = JSON.parse(application.university);
    gradUniversity = JSON.parse(application.gradUniversity);
    other = JSON.parse(application.other);
    console.log(application.highschool);
    console.log(pastEmployment);
    return {
      ...application,
      workTime,
      curAddress,
      permAddress,
      contact,
      highschool,
      university,
      gradUniversity,
      other,
      pastEmployment,
    };
  });


  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://${host}:3000/api/applications/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      setApplications([]);
      getApplications();
    } catch (err) {
      console.error(err);
      setErrorMessage("Unable to delete application");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  if (!isLoggedIn) {
    return (
      <Layout>
        {errorMessage && (
          <div className="sticky top-0 w-full p-4" id="error">
            <Error errorString={errorMessage} />
          </div>
        )}
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
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            View Applications
          </h2>
          <div
            className="bg-gray-100 flex justify-center p-2 md:p-16"
            id="background-container"
          >
            <div className="p-5 bg-white w-3/4">
              {parsedApplications.map((application, index) => (
                <div key={index}>
                  <div className="flex justify-between border-b-2 border-gray-400">
                    <h2
                      className="text-2xl px-5 py-1"
                      id="position-header-faculty"
                    >
                      {application.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(application.id)}
                      className="bg-maroon text-white text-sm rounded-xl p-1 justify-end"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex flex-wrap py-3" id="row1">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Work Time:</p>
                      <p>
                        Full Time:{" "}
                        {application.workTime.fullTime ? "Yes" : "No"}
                      </p>
                      <p>
                        Part Time:{" "}
                        {application.workTime.partTime ? "Yes" : "No"}
                      </p>
                      <p>
                        Temporary:{" "}
                        {application.workTime.temporary ? "Yes" : "No"}
                      </p>
                      <p>
                        Evenings: {application.workTime.evenings ? "Yes" : "No"}
                      </p>
                      <p>
                        Weekends: {application.workTime.weekends ? "Yes" : "No"}
                      </p>
                      <p>
                        {" "}
                        Nights: {application.workTime.nights ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Preferred Start Date:</p>
                      <p>{application.start}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Current Address:</p>
                      <p>Street: {application.curAddress.address}</p>
                      <p> City: {application.curAddress.city}</p>
                      <p> State: {application.curAddress.state}</p>
                      <p> Zip: {application.curAddress.zip}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap py-3" id="row2">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Permanent Address:</p>
                      <p>Street: {application.permAddress.address}</p>
                      <p> City: {application.permAddress.city}</p>
                      <p> State: {application.permAddress.state}</p>
                      <p> Zip: {application.permAddress.zip}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Contact Info:</p>
                      <p>
                        Phone: {application.contact.phone}, Email:{" "}
                        {application.contact.email}
                      </p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Preferred Contact:</p>
                      <p>{application.preferredContact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap py-3" id="row3">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Allowed to work in US:</p>
                      <p>{application.authorized}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Sponsorship:</p>
                      <p>{application.sponsorship}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Ever Applied:</p>
                      <p>{application.everApplied}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap py-3" id="row4">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Ever Employed:</p>
                      <p>{application.everEmployed}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Relatives working here:</p>
                      <p>{application.related}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Skills:</p>
                      <p>{application.skills}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap py-3" id="row5">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">High School</p>
                      <p>Name: {application.highschool.name}</p>
                      <p>Address: {application.highschool.address}</p>
                      <p>Degree Level: {application.highschool.diploma}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">University:</p>
                      <p>Name: {application.university.name}</p>
                      <p>Address:{application.university.address}</p>
                      <p>
                        Course of Study: {application.university.courseStudy}
                      </p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Graduate University:</p>
                      <p>Name: {application.gradUniversity.name}</p>
                      <p>Address:{application.gradUniversity.address}</p>
                      <p>
                        Course of Study:{" "}
                        {application.gradUniversity.courseStudy}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap py-3" id="row6">
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Other:</p>
                      <p>Name: {application.other.name}</p>
                      <p>Address:{application.other.address}</p>
                      <p>Course of Study: {application.other.courseStudy}</p>
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="font-semibold">Past Employment:</p>
                      <p>{application.pastEmployment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default ApplicationListViewer;
