import React from 'react';

interface IInput {
    type: string
    placeholder: string
    label: string
    reference: any
    pattern?: string
}

const Input = (props:IInput) => {
    return <label className="input">
        <input className="input__input" ref={props.reference} type={props.type} placeholder={props.placeholder} pattern={props.pattern ? props.pattern : ''}/>
        <span className="input__label">{props.label}</span>
    </label>
}

export default Input