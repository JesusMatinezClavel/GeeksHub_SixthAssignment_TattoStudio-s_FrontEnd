import './cInput.css'

export const CInput = ({className,type,inputName,value, placeholder}) => {
    return (
        <input
            className={className}
            type={type}
            name={inputName}
            value={value}
            placeholder={placeholder}
        />
    )
}