import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
interface City {
  id: number;
  name: string;
}

function App() {
  const [count, setCount] = useState(0)
  const [test, setTest] = useState<City[]>([])

  const getData = async () => {
    try{
      const repsonse = await fetch('http://localhost:3000/api/city')
      const data = await repsonse.json()
      console.log(data)
      const cityNames = data.map((city: {name: string, id: number}) => ({name: city.name,id: city.id}));
      console.log(cityNames)
      setTest(cityNames)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() =>{
    getData()
    }, [])
    

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ul>
      {test.map((city)=>(
        <li key={city.id}>{city.name}</li>
      ))}
      </ul>
      
    </>
  )
}

export default App
