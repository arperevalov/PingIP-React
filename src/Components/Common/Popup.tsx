import React, { FormEvent, useRef } from "react"
import Input from "./Input"

interface PopupProps {
    setDisplayPopup: CallableFunction
    itemId: number
    popupName: string
}

const Popup = (props:PopupProps) => {

    const nameInput = useRef(null),
    ipInput = useRef(null),
    descriptionInput = useRef(null)

    const submitForm = (e:FormEvent) => {
        e.preventDefault()
        const url = "https://example.com/nodes/" + props.itemId
        async function changeItem() {
            let resp = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.current.value,
                    ip_address: ipInput.current.value,
                    description: descriptionInput.current.value
                })
            })
            if (resp.ok) {
                // ALERT OK
                console.log('OK:', resp)
            } else {
                // ALERT NOTOK
                console.log('NOTOK:', resp)
            }

            props.setDisplayPopup(false)
        }
        changeItem()
    }

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{props.setDisplayPopup()}}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">{props.popupName}</h2>
                <button onClick={()=>{props.setDisplayPopup()}}>X</button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text"/>
                <div className="popup__buttonWrapper">
                    <button className='button button-3'>Удалить</button>   
                    <button className='button button-2' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default Popup