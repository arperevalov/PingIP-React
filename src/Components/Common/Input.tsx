import React from "react";

const Input = (props:any) => {
    return <label>
        <input placeholder={props.nameValue}/>
    </label>
}

export default Input