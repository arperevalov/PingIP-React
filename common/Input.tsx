interface IInput {
    type: string
    placeholder: string
    label: string,
    name?: string,
    isRequired?: boolean
    inputDefault?: string | number
    onChange: any
    onBlur?: React.ChangeEventHandler<HTMLInputElement>
    reference: any
}


const Input = (props:IInput) => {
    debugger
    return <label className="input">
        <input className="input__input"
            ref={props.reference}
            name={props.name}
            type={props.type} 
            placeholder={props.placeholder}
            required={props.isRequired ? true : false}
            defaultValue={props.inputDefault}
            onChange={props.onChange}
            onBlur={props.onBlur}
            />
            
        <span className="input__label">{props.label}</span>
    </label>
}

export default Input