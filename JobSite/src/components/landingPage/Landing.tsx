import { useEffect, useState} from 'react'
import Layout from '../layout'
import "./Landing.css"
import { Link } from 'react-router-dom'

interface jobPost{
    id: number,
    title: string,
    employment: number;
    classification: string,
    department: string,
    description: string, //brief description below the title
    info: string;   //html of rich text editor for the other relevant information
}

const LandingPage = () => {
    const [faculty, setFaculty] = useState<jobPost[]>([]);
    const [staff, setStaff] = useState<jobPost[]>([]);

    const getData = async () =>{
        try{
        const response = await fetch('http://localhost:3000/api/staff');
        const data = await response.json();
        setStaff(data);
        }catch(error){
            console.log(error);
    }
    try{
        const response = await fetch('http://localhost:3000/api/faculty');
        const data = await response.json();
        setFaculty(data);
        }catch(error){
            console.log(error);
        }
    }
    const mapFaculty = faculty.map((faculty: jobPost) => (
        <li key={faculty.id}>
          <Link
            to={`/faculty/${faculty.title.replace(/\s+/g, '-').toLowerCase()}`}
            state={{ job: [faculty] }}
          >
            {typeof faculty.title === 'string' ? faculty.title : faculty.title}
          </Link>
        </li>
      ));

      //overlay the job description on the landing page as a floating div possibly
      //or redirect to a new page and pass related data to the new page
        const mapStaff = staff.map((
            staff: jobPost
        ) => (
            <li key={staff.id}>
                <Link to={`/staff/${staff.title.replace(/\s+/g, '-').toLowerCase()}`}
                state={{job: [staff]}}>
                {staff.title}
                </Link>
            </li>
        ))

    useEffect(() =>{
        getData();
    },[])

  return (
    <>
    
    <Layout>
        <div className="job-page">
                <h2 className="job-header">Current Position Openings</h2>
        </div>
        <div className="bg">
        <div className="positions">
            <h2 className="position-header">Faculty</h2>
            <div className="list-container">
            <ol className="faculty">
                {mapFaculty}
            </ol>
            </div>
            <div className="list-container">
            <h2 className="position-header">Staff</h2>
                <ol className="staff">
                    {mapStaff}
                </ol>
                <p className="non-dis">Non Discrimination Statement</p>
            </div>
        </div>
        </div>
    </Layout>

    </>
  )
}

export default LandingPage;