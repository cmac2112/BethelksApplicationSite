import { useState, useContext } from "react";
import Layout from "../layout/Layout";
import Error from "../modals/Error";
//import { useNavigate } from "react-router-dom";
import Pg1 from "./pages/Pg1";
import { ApplicationContext } from "./applicationContext";
import Pg2 from "./pages/Pg2";
import Pg3 from "./pages/Pg3";
import Pg4 from "./pages/Pg4";
import Pg5 from "./pages/Pg5";
import Pg6 from "./pages/Pg6";
const applicationPage = () => {
  const {
    errorMessage,
    setErrorMessage,
    legalWork, sponsorship, applied, related, employed
       } = useContext(ApplicationContext)
  const [page, setPage] = useState<number>(1)

  const validatePage = () => {
    if (page == 3){
      if(!legalWork || !related || !employed || !sponsorship || !applied){
        setErrorMessage('Please answer all required questions.')
        setTimeout(()=>setErrorMessage(''), 7000)
        return false;
      }
    }
    return true;
  }

  const handleNextClick = () =>{
    if(validatePage()){
      if(page == 6){
        return;
      }
      setPage((prevPage: number) => prevPage + 1);
      window.scrollTo(0,0);
    }
  }
  
  return (
      <Layout>
        {errorMessage && (
          <div className="sticky top-0 w-full p-4" id="error">
            <Error errorString={errorMessage} />
          </div>
        )}
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2">Application</h2>
        </div>
        <div id="bg" className="bg-gray-100 flex justify-center p-5 md:p-5">
          <div className="px-5 bg-white md:w-3/4 w-full">
          <div className="py-4">
          {page == 1 ? <Pg1 /> : page == 2 ? <Pg2 /> : page == 3 ? <Pg3 /> : page == 4 ? <Pg4 /> : page == 5 ? <Pg5 /> : <Pg6 />}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="flex justify-between py-5">
              {page !== 1 && (
                <button
                  className="bg-maroon p-2 rounded-xl text-white h-10 w-20 hover:cursor-pointer hover:bg-gray-400"
                  onClick={() => {
                    setPage((prevPage: number) => prevPage - 1);
                    window.scrollTo(0, 0);
                  }}
                >
                  Previous
                </button>
              )}
              {page !== 6 && (
              <button
                className="bg-maroon p-2 rounded-xl text-white h-10 w-20 hover:cursor-pointer hover:bg-gray-400"
                onClick={handleNextClick}
              >
                Next
              </button>
              )}
          </div>
          </div>
          </div>
        </div>
      </Layout>
  );
};

export default applicationPage;
