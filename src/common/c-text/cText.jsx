import './cText.css'

export const CText = ({ className, children }) => {

    const combinedClasses = `textDesign ${className || ""}`

    return (
        <div className={combinedClasses}>{children}</div>
    )
}