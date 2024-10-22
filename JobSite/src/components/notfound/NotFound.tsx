import { Link } from "react-router-dom"
import Layout from "../layout"
const NotFound = () => {
  return (
    <Layout>
    <div className="container max-w-full bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2" id="job-header">
            Error: 404 Not Found
          </h2>
        </div>
        <div className="bg-gray-100 flex justify-center p-2 md:p-16">
          <div className="bg-white w-3/4 p-5 rounded-sm">
      <h2 className="text-center text-3xl">Doesn't seem like this page exists</h2>
      <Link to="/" className="text-center text-2xl text-maroon">Back To Saftey</Link>
      </div>
    </div>
    </Layout>
  )
}

export default NotFound