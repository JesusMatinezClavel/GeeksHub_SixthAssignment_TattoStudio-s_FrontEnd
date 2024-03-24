import './header.css'
import { Navigator } from "../navigator/navigator";

export const Header = () => {
    return (
        <div className="headerDesign">
            <div className="headerHome">
            <Navigator title={"Home"} destination="/" />
            </div>
            <div className="headerRest">
            <Navigator title={"Register"} destination="/register" />
            <Navigator title={"Login"} destination="/login" />
            </div>
        </div>
    )
}