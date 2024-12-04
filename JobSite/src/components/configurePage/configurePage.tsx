import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useAuth } from "../../context/LoginContext";
import Error from "../modals/Error";
interface user{
    id: string;
    email: string;
}
const ConfigurePage = () => {
  const { isLoggedIn, login, setErrorMessage, errorMessage } = useAuth();
  const [users, setUsers] = useState<user[]>([])
  const [newUser, setNewUser] = useState<string>('')

  const getAuthorizedUsers = async () =>{
    try{
        const response = await fetch(`http://${import.meta.env.VITE_HOST}:3000/api/authorized`,{
            method: 'GET',
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }catch(err){
        console.error(err)
        setErrorMessage('error getting authorized users')
    }
  }

  const addNewUser = async (e: React.FormEvent) =>{
    e.preventDefault()
    try{
        const response = await fetch(`http://${import.meta.env.VITE_HOST}:3000/api/authorized/add`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                email: newUser
            }),

            
        })
        const data = await response.json()
        console.log(data)
        getAuthorizedUsers();
    }catch(err){
        console.log(err)
        setErrorMessage('error adding new user')
    }
  }

  const deleteUser = async (email: string) =>{
    let data
    try{
        const response = await fetch(`http://${import.meta.env.VITE_HOST}:3000/api/authorized/delete/${email}`,{
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        data = await response.json();
        console.log(data)
        if(data.error){
            setErrorMessage(data.error)
            setTimeout(()=>{setErrorMessage('')}, 5000)
        }
        getAuthorizedUsers();
    }catch(err){
        console.error('could not delete',err)
        if(data.error){
            setErrorMessage(data.error)
        }
        setErrorMessage('could not delete user')
        setTimeout(()=>{setErrorMessage('')}, 5000)
    }
  }
  useEffect(()=>{
    getAuthorizedUsers();
  },[])
  if (!isLoggedIn) {
    return (
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
            <button className="text-xl text-maroon" onClick={login}>
              Log in Now
            </button>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        {errorMessage && (
          <div className="sticky top-0 w-full p-4" id="error">
            <Error errorString={errorMessage} />
          </div>

        )}
        <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Administrative Configurations
          </h2>
        </div>
        <div
          className="bg-gray-100 flex justify-center p-2 md:p-16"
          id="background-container"
        >
          <div className="p-5 bg-white w-3/4">
            <p className="text-center">list of current users</p>
            {users.map((user) => (
                <div className="border-b-2 flex justify-between" key={user.id}>
                    <p>{user.email}</p>
                    <button className="text-maroon hover:text-gray-400" onClick={()=>deleteUser(user.email)}>Remove</button>
                </div>
            ))}
            <h2 className="text-center text-xl">Add New User</h2>
            <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); addNewUser(e)}}>
            <label htmlFor="newUser">Email</label>
                <input
                type="email"
                name="newUser"
                id="newUser"
                value={newUser}
                onChange={(e)=>setNewUser(e.target.value)}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                 />
            <input type="submit" className="border border-maroon rounded-xl bg-maroon text-white p-2 hover:cursor-pointer hover:bg-gray-400 w-1/4" ></input>
            </form>

          </div>
        </div>
      </Layout>
    );
  }
};
export default ConfigurePage;
