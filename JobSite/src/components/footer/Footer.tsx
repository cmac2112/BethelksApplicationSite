import "./Footer.css"
import Bcimage from "../../assets/Bethel College_signature_trimmed.png"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div id="footer-container" className='container mx-auto bg-white flex justify-center'>
      <div className="grid grid-cols-5 gap-12 px-16 py-8">
      <div id="col1" className="flex flex-col flex-grow">
        <img src={Bcimage}/> 
        <Link to="https://maps.app.goo.gl/CJbwiVDj3YtFg53t6" className="text-maroon text-xs font-semibold hover:underline py-1">300 E 27th St, North Newton, KS 67117</Link>
        <p className="text-xs py-2">+1 (800) 522-1887</p>
        <p className="text-xs text-gray-600 py-2">Bethel College graduates students who increase human flourishing (shalom) in society by owning and enacting their faith, demonstrating compassion for the powerless, engaging in critical thought, and bringing value to the workplace.</p>
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      
    </div>
    </div>
    
  )
}

export default Footer