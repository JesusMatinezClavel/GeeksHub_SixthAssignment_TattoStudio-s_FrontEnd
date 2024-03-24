import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import './login.css'

export const Login = () => {
    return (
        <>
            <Header />
            <div className="loginDesign">
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"name"}
                    value={""}
                    placeholder={"input name"}
                />
            </div>
        </>
    )
}