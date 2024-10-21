import React from 'react'
import { useLogin } from '../../context/LoginContext'
import Layout from '../layout';

const NewJob = () => {
  const { isLoggedIn, toggleLogIn } = useLogin();

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    console.log("submitted")
  }

  if (!isLoggedIn){
    return(
      <Layout>
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
    <button className="text-xl text-maroon" onClick={toggleLogIn}>Log in Now</button>
    </div>
    </div>
    </Layout>
  )
  }else{
  return (
    <Layout>
      <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Create New Job Posting
          </h2>
          <div
          className="bg-gray-100 flex justify-center p-2 md:p-16"
          id="background-container"
        >
          <div className="p-5 bg-white w-3/4">
          <form
            className="px-5 bg-white md:w-3/4 w-full"
            onSubmit={handleSubmit}
          >
            <p>test</p>
            <input type="submit" />
            </form>
        </div>
        </div>
        </div>
    </Layout>
  )
}
}

export default NewJob