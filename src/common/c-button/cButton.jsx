import './cButton.css'

export const CButton = ({ title, onClick }) => {
    return (
        <div className="buttonDesign" onClick={onClick}>{title}</div>
    )
}