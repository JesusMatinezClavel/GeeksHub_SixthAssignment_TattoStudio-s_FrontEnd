import './header.css'
import { Navigator } from "../navigator/navigator";
import { Home } from '../../pages/home/home';

export const Header = () => {
    return (
        <div className="headerDesign">
            <Navigator title={"Home"} destination="/" />
            <Navigator title={"Register"} destination="/register" />
        </div>
    )
}