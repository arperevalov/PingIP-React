import React from "react"
import Input from "./Input"

interface PopupProps {
    setDisplayPopup: CallableFunction
}

const Popup = (props:PopupProps) => {

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{props.setDisplayPopup()}}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">Объект №1</h2>
                <button onClick={()=>{props.setDisplayPopup()}}>X</button>
            </div>
            <form className="popup__form">
                <Input nameValue='Имя'/>
                <Input nameValue='IP'/>
                <Input nameValue='Описание'/>
                <div className="popup__buttonWrapper">
                    <button className='button button-3'>Удалить</button>   
                    <button className='button button-2'>Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default Popup