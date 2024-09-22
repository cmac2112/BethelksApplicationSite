import "./Footer.css"
import Bcimage from "../../assets/Bethel College_signature_trimmed.png"

const Footer = () => {
  return (
    <div className="footer-container">
        <div className="footer-content">
            <div className="col-1">
            <img src={Bcimage} alt="Bethel College Logo" height={40} />
            </div>
            </div>
        Footer
    </div>
  )
}

export default Footer