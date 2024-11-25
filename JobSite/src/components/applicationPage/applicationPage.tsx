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
       } = useContext(ApplicationContext)

  //const navigate = useNavigate();
  const [page, setPage] = useState<number>(1)
  
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
        <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
          <div className="px-5 bg-white md:w-3/4 w-full">
          <button className="bg-green-400 p-5" onClick={()=>setPage((prevPage: number) => prevPage + 1)}>increment page</button>
          <button className="bg-red-400 p-5" onClick={()=>setPage((prevPage: number) => prevPage - 1)}>decrement page</button>
          {page == 1 ? <Pg1 /> : page == 2 ? <Pg2 /> : page == 3 ? <Pg3 /> : page == 4 ? <Pg4 /> : page == 5 ? <Pg5 /> : <Pg6 />}

            
            
          </div>
        </div>
      </Layout>
  );
};

export default applicationPage;
