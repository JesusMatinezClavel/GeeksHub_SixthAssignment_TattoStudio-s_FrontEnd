import './cButton.css'

export const CButton = ({ className,title, onClick }) => {
    return (
        <div className={"buttonDesign"||className} onClick={onClick}>{title}</div>
    )
}