import './cCard.css'

export const CCard = ({className,children}) => {
    return (
        <div className={"cardDesign" && className}>{children}</div>
    )
}