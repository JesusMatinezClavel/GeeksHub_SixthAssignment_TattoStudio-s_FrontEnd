import './footer.css'
import face from "../../../img/rrss/face.png"
import tiktok from "../../../img/rrss/tiktok.png"
import insta from "../../../img/rrss/insta.png"
import twitter from "../../../img/rrss/twitter.png"

export const Footer = () => { 
    return (
        <div className="footerDesign">
            <div className="rrss">
                <img src={tiktok} alt="tiktok" />
                <img src={face} alt="facebook" />
                <img src={insta} alt="instagram" />
                <img src={twitter} alt="twitter" />
            </div>
        </div>
    )
}