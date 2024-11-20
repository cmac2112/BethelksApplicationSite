//hold context for a logged in user here
import React, { createContext, useContext, useEffect, useState } from "react";
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
  interface School{
    address: string;
    name: string;
    courseStudy?: string;
    diploma: string
  }

interface LoggedInContextType{
    errorMessage?: string | null;
    setErrorMessage:(errorMessage: string) => void;
    openPositions: Positions[];
    isFaculty: boolean;
    setIsFaculty:(isFaculty: boolean)=>void;
    hearAbout: string;
    setHearAbout:(hearAbout: string)=>void;
    position: string,
    setPosition:(position: string)=>void;
    workTime: WorkTime;
    setWorkTime:(workTime: WorkTime) => void;
    handleWorkTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    startTime: string;
    setStartTime:(startTime: string) => void;
    fullName: string;
    setFullName:(fullName: string) => void;
    currentAddress: Address;
    setCurrentAddress:(currentAddress: Address) => void;
    permanentAddress: Address;
    setPermanentAddress:(permenantAddress: Address) => void;
}

export const ApplicationContext = createContext<LoggedInContextType>({
    errorMessage: null,
    setErrorMessage: () => {},
    openPositions: [],
    isFaculty: false,
    setIsFaculty: () => {},
    hearAbout: '',
    setHearAbout:()=>{},
    position: localStorage.getItem("position") || '',
    setPosition: () => {},
    workTime: JSON.parse(
        localStorage.getItem("workTime") ||
          '{"fullTime":false,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}'
      ),
      setWorkTime:() => {},
    handleWorkTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
    startTime: localStorage.getItem('start') || '',
    setStartTime: () => {},
    fullName: localStorage.getItem('name') || '',
    setFullName: () => {},
    currentAddress: JSON.parse(localStorage.getItem("curAddress") || '{"address":"","city":"","state":"","zip":""}'),
    setCurrentAddress: () => {},
    permanentAddress: JSON.parse(localStorage.getItem("permAddress") || '{"address":"","city":"","state":"","zip":""}'),
    setPermanentAddress: () => {}
    
})


interface LoggedInProivderProps{
    children: React.ReactNode
}

export const ApplicationProvider: React.FC<LoggedInProivderProps> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openPositions, setOpenPositions] = useState<Positions[]>([]);
    const [isFaculty, setIsFaculty] = useState<boolean>(false);
    const [position, setPosition] = useState<string>("");
    const [hearAbout, setHearAbout] = useState<string>(
        localStorage.getItem("hearAbout") || ""
      );
    const [workTime, setWorkTime] = useState<WorkTime>(
        JSON.parse(
          localStorage.getItem("workTime") ||
            '{"fullTime":false,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}'
        )
      );
    const [startTime, setStartTime] = useState<string>(localStorage.getItem('start') || '')
    const [fullName, setFullName] = useState<string>(localStorage.getItem("name") || '');
    const [currentAddress, setCurrentAddress] = useState<Address>(JSON.parse(localStorage.getItem("curAddress") || '{"address":"","city":"","state":"","zip":""}'));
    const [permanentAddress, setPermanentAddress] = useState<Address>(JSON.parse(localStorage.getItem("permAddress") || '{"address":"","city":"","state":"","zip":""}'));
    useEffect(() => {
        getPositionOpenings();
      }, []);

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
   
    return(
        <ApplicationContext.Provider value={{
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
            setPermanentAddress
            }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(ApplicationContext);
    if (context === undefined) {
      throw new Error('not inside of Applicationcontext provider');
    }
    return context;
  };