interface IInput {
    type: string
    placeholder: string
    label: string
    isRequired?: boolean
    reference: any
    inputDefault?: string | number
    onChangeAction?: any
}


const Input = (props:IInput) => {
    return <label className="input">
        <input className="input__input" 
            ref={props.reference} 
            type={props.type} 
            placeholder={props.placeholder}
            required={props.isRequired ? true : false}
            defaultValue={props.inputDefault}
            onInput={props.onChangeAction}
            />
            
        <span className="input__label">{props.label}</span>
    </label>
}

export default Input