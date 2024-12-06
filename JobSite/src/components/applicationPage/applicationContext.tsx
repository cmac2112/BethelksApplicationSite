
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let host = import.meta.env.VITE_HOST;

interface Positions {
  id: number;
  title: string;
  employment: string;
  description: string;
  department: string;
  classification: string;
  info: string;
}
interface WorkTime {
  fullTime: boolean;
  partTime: boolean;
  temporary: boolean;
  evenings: boolean;
  weekends: boolean;
  nights: boolean;
}
interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}
interface ContactInfo {
  phone: string;
  email: string;
}
interface EmploymentHistory {
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
interface School {
  address: string;
  name: string;
  courseStudy?: string;
  diploma: string;
}

interface ApplicationContextType {
  errorMessage?: string | null;
  setErrorMessage: (errorMessage: string) => void;
  openPositions: Positions[];
  isFaculty: boolean;
  setIsFaculty: (isFaculty: boolean) => void;
  hearAbout: string;
  setHearAbout: (hearAbout: string) => void;
  position: string;
  setPosition: (position: string) => void;
  workTime: WorkTime;
  setWorkTime: (workTime: WorkTime) => void;
  handleWorkTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  currentAddress: Address;
  setCurrentAddress: (currentAddress: Address) => void;
  permanentAddress: Address;
  setPermanentAddress: (permenantAddress: Address) => void;
  contact: ContactInfo;
  setContact: (contact: ContactInfo) => void;
  preferredContact: string;
  setPreferredContact: (preferredContact: string) => void;
  legalWork: string;
  setLegalWork: (legalWork: string) => void;
  sponsorship: string;
  setSponsorship: (sponsorship: string) => void;
  applied: string;
  setApplied: (applied: string) => void;
  employed: string;
  setEmployed: (employed: string) => void;
  related: string;
  setRelated: (related: string) => void;
  employmentHistories: EmploymentHistory[];
  setEmploymentHistories: (employmentHistories: EmploymentHistory[]) => void;
  highSchool: School;
  setHighSchool: (highSchool: School) => void;
  undergrad: School;
  setUndergrad: (undergrad: School) => void;
  grad: School;
  setGrad: (grad: School) => void;
  other: School;
  setOther: (other: School) => void;
  skills: string;
  setSkills: (skills: string) => void;
  resume: File | null;
  setResume: (resume: File | null) => void;
  coverLetter: File | null;
  setCoverLetter: (coverLetter: File | null) => void;
  references: File | null;
  setReferences: (references: File | null) => void;
  statementOfTeach: File | null;
  setStatementOfTeach: (statementOfTeach: File | null) => void;
  diversityStatement: File | null;
  setDiversityStatement: (diversityStatement: File | null) => void;
  graduateTranscript: File | null;
  setGraduateTranscript: (graduateTranscript: File | null) => void;
  performanceRec: File | null;
  setPerformanceRec: (performanceRec: File | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  positionId: number;
  setPositionId: (positionId: number) => void;
}

export const ApplicationContext = createContext<ApplicationContextType>({
  errorMessage: null,
  setErrorMessage: () => {},
  openPositions: [],
  isFaculty: false,
  setIsFaculty: () => {},
  hearAbout: "",
  setHearAbout: () => {},
  position: localStorage.getItem("position") || "",
  setPosition: () => {},
  workTime: JSON.parse(
    localStorage.getItem("workTime") ||
      '{"fullTime":false,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}'
  ),
  setWorkTime: () => {},
  handleWorkTimeChange: () => {},
  startTime: localStorage.getItem("start") || "",
  setStartTime: () => {},
  fullName: localStorage.getItem("name") || "",
  setFullName: () => {},
  currentAddress: JSON.parse(
    localStorage.getItem("curAddress") ||
      '{"address":"","city":"","state":"","zip":""}'
  ),
  setCurrentAddress: () => {},
  permanentAddress: JSON.parse(
    localStorage.getItem("permAddress") ||
      '{"address":"","city":"","state":"","zip":""}'
  ),
  setPermanentAddress: () => {},
  contact: JSON.parse(
    localStorage.getItem("contactInfo") || `{"phone": "", "email": ""}`
  ),
  setContact: () => {},
  preferredContact: localStorage.getItem("preferredContact") || "",
  setPreferredContact: () => {},
  legalWork: localStorage.getItem("authorized") || "",
  setLegalWork: () => {},
  sponsorship: localStorage.getItem("sponsorship") || "",
  setSponsorship: () => {},
  applied: localStorage.getItem("everApplied") || "",
  setApplied: () => {},
  employed: localStorage.getItem("everEmployed") || "",
  setEmployed: () => {},
  related: localStorage.getItem("related") || "",
  setRelated: () => {},
  employmentHistories: [],
  setEmploymentHistories: () => {},
  highSchool: JSON.parse(
    localStorage.getItem("highschool") ||
      '{"name": "", "address":"","diploma":""}'
  ),
  setHighSchool: () => {},
  undergrad: JSON.parse(
    localStorage.getItem("university") ||
      '{"name": "", "address":"","diploma":""}'
  ),
  setUndergrad: () => {},
  grad: JSON.parse(
    localStorage.getItem("gradUniversity") ||
      '{"name": "", "address":"","diploma":""}'
  ),
  setGrad: () => {},
  other: JSON.parse(
    localStorage.getItem("other") || '{"name": "", "address":"","diploma":""}'
  ),
  setOther: () => {},
  skills: localStorage.getItem("skills") || "",
  setSkills: () => {},
  resume: null,
  setResume: () => {},
  coverLetter: null,
  setCoverLetter: () => {},
  references: null,
  setReferences: () => {},
  statementOfTeach: null,
  setStatementOfTeach: () => {},
  diversityStatement: null,
  setDiversityStatement: () => {},
  graduateTranscript: null,
  setGraduateTranscript: () => {},
  performanceRec: null,
  setPerformanceRec: () => {},
  handleSubmit: () => {},
  setPositionId: () => {},
  positionId: 0
});

interface ApplicationProivderProps {
  children: React.ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProivderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openPositions, setOpenPositions] = useState<Positions[]>([]);
  const [isFaculty, setIsFaculty] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("");
  const [positionId, setPositionId] = useState<number>(0)
  const [hearAbout, setHearAbout] = useState<string>(
    localStorage.getItem("hearAbout") || ""
  );
  const [workTime, setWorkTime] = useState<WorkTime>(
    JSON.parse(
      localStorage.getItem("workTime") ||
        '{"fullTime":false,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}'
    )
  );
  const [startTime, setStartTime] = useState<string>(
    localStorage.getItem("start") || ""
  );
  const [fullName, setFullName] = useState<string>(
    localStorage.getItem("name") || ""
  );
  const [currentAddress, setCurrentAddress] = useState<Address>(
    JSON.parse(
      localStorage.getItem("curAddress") ||
        '{"address":"","city":"","state":"","zip":""}'
    )
  );
  const [permanentAddress, setPermanentAddress] = useState<Address>(
    JSON.parse(
      localStorage.getItem("permAddress") ||
        '{"address":"","city":"","state":"","zip":""}'
    )
  );
  const [contact, setContact] = useState<ContactInfo>(
    JSON.parse(
      localStorage.getItem("contactInfo") || `{"phone": "", "email": ""}`
    )
  );
  const [preferredContact, setPreferredContact] = useState<string>(
    localStorage.getItem("preferredContact") || ""
  );
  const [legalWork, setLegalWork] = useState<string>(
    localStorage.getItem("authorized") || ""
  );
  const [sponsorship, setSponsorship] = useState<string>(
    localStorage.getItem("sponsorship") || ""
  );
  const [applied, setApplied] = useState<string>(
    localStorage.getItem("everApplied") || ""
  );
  const [employed, setEmployed] = useState<string>(
    localStorage.getItem("everEmployed") || ""
  );
  const [related, setRelated] = useState<string>(
    localStorage.getItem("related") || ""
  );
  const [highSchool, setHighSchool] = useState<School>(
    JSON.parse(
      localStorage.getItem("highschool") ||
        '{"name": "", "address":"","diploma":""}'
    )
  );
  const [undergrad, setUndergrad] = useState<School>(
    JSON.parse(
      localStorage.getItem("university") ||
        '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'
    )
  );
  const [grad, setGrad] = useState<School>(
    JSON.parse(
      localStorage.getItem("gradUniversity") ||
        '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'
    )
  );
  const [other, setOther] = useState<School>(
    JSON.parse(
      localStorage.getItem("other") ||
        '{"name": "", "address": "", "courseStudy": "", "diploma": ""}'
    )
  );

  const [skills, setSkills] = useState<string>(
    localStorage.getItem("skills") || ""
  );
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [references, setReferences] = useState<File | null>(null);
  const [statementOfTeach, setStatementOfTeach] = useState<File | null>(null);
  const [diversityStatement, setDiversityStatement] = useState<File | null>(
    null
  );
  const [graduateTranscript, setGraduateTranscript] = useState<File | null>(
    null
  );
  const [performanceRec, setPerformanceRec] = useState<File | null>(null);
  useEffect(() => {
    getPositionOpenings();
  }, []);
  const [employmentHistories, setEmploymentHistories] = useState<
    EmploymentHistory[]
  >([
    {
      employer: "",
      address: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      duties: "",
      supervisor: "",
      supervisorTitle: "",
      contact: "",
      reasonLeft: "",
    },
  ]);

  const getPositionOpenings = async () => {
    try {
      let response = await fetch(`http://${host}:3000/api/jobs`);
      let data = await response.json();

      console.log("open positions", data);
      setOpenPositions(data);
    } catch (error) {
      console.error("unable to fetch open positions");
      setErrorMessage("Unable to fetch open positions, please try again");
    }
  };
  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setWorkTime((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    localStorage.setItem("hearAbout", hearAbout);
    localStorage.setItem("position", position);
    localStorage.setItem("positionId", positionId.toString())
    localStorage.setItem("workTime", JSON.stringify(workTime));
    localStorage.setItem("start", startTime);
    localStorage.setItem("name", fullName);
    localStorage.setItem("curAddress", JSON.stringify(currentAddress));
    localStorage.setItem("permAddress", JSON.stringify(permanentAddress));
    localStorage.setItem("contactInfo", JSON.stringify(contact));
    localStorage.setItem("preferredContact", preferredContact);
    localStorage.setItem("authorized", legalWork);
    localStorage.setItem("sponsorship", sponsorship);
    localStorage.setItem("everApplied", applied);
    localStorage.setItem("everEmployed", employed);
    localStorage.setItem("related", related);
    localStorage.setItem("highschool", JSON.stringify(highSchool));
    localStorage.setItem("university", JSON.stringify(undergrad));
    localStorage.setItem("gradUniversity", JSON.stringify(grad));
    localStorage.setItem("other", JSON.stringify(other));
    localStorage.setItem("skills", skills);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hearAbout", hearAbout);
    formData.append("position", position);
    formData.append("positionId", positionId.toString())
    formData.append("workTime", JSON.stringify(workTime)); // Assuming workTime is an object
    formData.append("start", startTime);
    formData.append("name", fullName);
    formData.append("curAddress", JSON.stringify(currentAddress));
    formData.append("permAddress", JSON.stringify(permanentAddress));
    formData.append("contactInfo", JSON.stringify(contact));
    formData.append("preferredContact", preferredContact);
    formData.append("authorized", legalWork);
    formData.append("sponsorship", sponsorship);
    formData.append("everApplied", applied);
    formData.append("everEmployed", employed);
    formData.append("related", related);
    if (resume) {
      formData.append("resume", resume);
    }
    if(coverLetter){
    formData.append("coverLetter", coverLetter)
    }
    if(references){
      formData.append("references", references)
    }
    if(statementOfTeach){
      formData.append("statementOfTeach", statementOfTeach)
    }
    if(diversityStatement){
      formData.append("diversityStatement",diversityStatement)
    }
    if(graduateTranscript){
      formData.append("graduateTranscript", graduateTranscript)
    }
    if(performanceRec){
      formData.append("performanceRec", performanceRec)
    }
    formData.append("pastEmployment", JSON.stringify(employmentHistories));
    formData.append("highschool", JSON.stringify(highSchool));
    formData.append("university", JSON.stringify(undergrad));
    formData.append("gradUniversity", JSON.stringify(grad));
    formData.append("other", JSON.stringify(other));
    formData.append("skills", skills);
    console.log("form data", formData.get("pastEmployment"));
    console.log(resume)

    try {
      const host = import.meta.env.VITE_HOST;
      const response = await fetch(`http://${host}:3000/api/apply`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("form submitted", formData);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        localStorage.clear();
        navigate("/success");
      } else {
        console.error("error submitting form");
        setErrorMessage("Bad response from server, Form not submitted");
      }
    } catch (error) {
      console.error("error submitting form", error);
      setErrorMessage("Form was unable to be sent");
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        openPositions,
        isFaculty,
        setIsFaculty,
        hearAbout,
        setHearAbout,
        position,
        setPosition,
        workTime,
        setWorkTime,
        handleWorkTimeChange,
        startTime,
        setStartTime,
        fullName,
        setFullName,
        currentAddress,
        setCurrentAddress,
        permanentAddress,
        setPermanentAddress,
        contact,
        setContact,
        preferredContact,
        setPreferredContact,
        legalWork,
        setLegalWork,
        sponsorship,
        setSponsorship,
        applied,
        setApplied,
        employed,
        setEmployed,
        related,
        setRelated,
        employmentHistories,
        setEmploymentHistories,
        highSchool,
        setHighSchool,
        undergrad,
        setUndergrad,
        grad,
        setGrad,
        other,
        setOther,
        skills,
        setSkills,
        coverLetter,
        setCoverLetter,
        resume,
        setResume,
        references,
        setReferences,
        statementOfTeach,
        setStatementOfTeach,
        diversityStatement,
        setDiversityStatement,
        graduateTranscript,
        setGraduateTranscript,
        performanceRec,
        setPerformanceRec,
        handleSubmit,
        setPositionId,
        positionId
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("not inside of Applicationcontext provider");
  }
  return context;
};
