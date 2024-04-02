import './home.css'
import { Header } from "../../common/header/header";
import homePicture from "../../../img/home/homePicture.png"

export const Home = () => {
    return (
        <>
            <Header />
            <div className="homeDesign">
                <div className="homeInfo">
                    <div className="infoTitle">TATTOOS BEYOND BOUNDARIES</div>
                    <div className="infoText">Step into a realm where artistry meets expression. At our tattoo studio, we craft more than just ink; we sculpt narratives, etch memories, and celebrate individuality. <br />
                        Explore a canvas of creativity as our skilled artisans translate your visions into timeless masterpieces. Dare to embrace your story, etched in ink, and embark on a journey of self-expression at our tattoo sanctuary</div>
                </div>
                <div className="homeImg">
                    <img src={homePicture} alt='home picture' />
                </div>
            </div>
            <div className="homeStyles">
                <div className="stylesTitle">ALL TATTOO STYLES<br /> IN THE SAME STUDIO</div>
                <div className="styles">
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/traditionalStyle.png" alt="" /><p>TRADITIONAL</p></div>
                        <div className="styleText">Tattoo with thick lines, bright but simple colors, based on iconic or nautical designs such as hearts, anchors, etc...</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/neotradicionalStyle.png" alt="" /><p>NEOTRADICIONAL</p></div>
                        <div className="styleText">Traditional elements with more details and more color, the result is much more 'elaborate' tattoos</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/newSchoolStyle.png" alt="" /><p>NEWSCHOOL</p></div>
                        <div className="styleText">Imagine 'cartoon', combining bright tones and thick lines to create fun but solid tattoos</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/blackworkStyle.png" alt="" /><p>BLACKWORK</p></div>
                        <div className="styleText">Made only with black ink, focused on the potential of black to create solid and elegant tattoos</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/realismStyle.png" alt="" /><p>REALISM</p></div>
                        <div className="styleText">Tattoos that imitate the effect of photography, creating pieces that are impressive and striking to look at. They are usually portraits or objects</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/dotworkStyle.png" alt="" /><p>DOTWORK</p></div>
                        <div className="styleText">They combine intricate lines with dots to create complex and delicate designs like mandalas. Based on patterns and sacred geometry</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/biomechanicStyle.png" alt="" /><p>BIOMECÁNICO</p></div>
                        <div className="styleText">Mix mechanical elements with organic shapes to create futuristic tattoos that adapt to the body. Hybrid between human and machine</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/orientalStyle.png" alt="" /><p>ORIENTAL</p></div>
                        <div className="styleText">Images inspired by Chinese and Japanese mythology and art, such as dragons, geishas, ​​native flowers or carp. Large pieces that flow with the body</div>
                    </div>
                    <div className="style">
                        <div className="styleLogo"><img src="../../img\home/homeStyles/letteringStyle.png" alt="" /><p>LETTERING</p></div>
                        <div className="styleText">Highlighting typography as an art in itself. From delicate calligraphy to striking fonts such as graffiti or gothic</div>
                    </div>
                </div>
            </div>
        </>
    )
}