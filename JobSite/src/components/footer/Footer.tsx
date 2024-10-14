import Bcimage from "../../assets/Bethel College_signature_trimmed.png"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div id="footer-container" className='container mx-auto bg-white flex justify-center'>
      <div className="grid grid-cols-2 gap-12 px-16 py-8">
      <div id="col1" className="flex flex-col">
        <img src={Bcimage} className="w-24"/> 
        <Link to="https://maps.app.goo.gl/CJbwiVDj3YtFg53t6" className="text-maroon text-xs font-semibold hover:underline py-1">300 E 27th St, North Newton, KS 67117</Link>
        <p className="text-xs py-2">+1 (800) 522-1887</p>
        <p className="text-xs text-gray-600 py-2">Bethel College graduates students who increase human flourishing (shalom) in society by owning and enacting their faith, demonstrating compassion for the powerless, engaging in critical thought, and bringing value to the workplace.</p>
      </div>
      <div id="col2" className="flex flex-col px-10">
        <h2 className="border-b border-gray-400">Navigation</h2>
        <Link to="/" className="text-sm text-nowrap py-1 ">Home</Link>
        <Link to="/apply" className="text-sm text-nowrap py-1">Apply</Link>
        <Link to="https://www.bethelks.edu" className="text-sm text-nowrap py-1">Main Site</Link>
        <button className="text-sm text-nowrap py-1 text-start">Administrative Login</button>
      </div>
    </div>
    </div>
    
  )
}

export default Footer