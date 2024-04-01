import './cInput.css'

export const CInput = ({className,type,name,value, placeholder, onChange, onBlur, onClick}) => {

    const combinedClasses = `inputDesign ${className || ""}`

    return (
        <input
            className={combinedClasses}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onClick={onClick}
        />
    )
}