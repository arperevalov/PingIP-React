import React from "react";

interface InputProps {
    nameValue: string
}

const Input = (props:InputProps) => {
    return <label>
        <input placeholder={props.nameValue}/>
    </label>
}

export default Input