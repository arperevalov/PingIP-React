import React, { FormEvent, useContext, useRef } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { IPopup, MessageType, PopupType } from "../../Interfaces"
import { PopupContext } from "../../Providers/PopupProvider"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"

const PopupDeleteServer = (props:IPopup) => {

    const nameInput = useRef<any>(props.name),
        popup = useContext(PopupContext),
        message = useContext(SysMessagesContext)

    const submitForm = (e:FormEvent) => {
        APIRouter(APIRouterActions.createServer, { 
            id: props.id})
        .then(r => {
            message.notifyUser({
                type: MessageType.success,
                text: 'Сервер успешно удален'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось удалить сервер'
            })
            throw new Error(e)
        })
        popup.setPopup({type: PopupType.default})
    }

    debugger

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{popup.setPopup({type: PopupType.default})}}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">Удалить {props.name}</h2>
                <button onClick={()=>{popup.setPopup({type: PopupType.default})}}>X</button>
            </div>
            <p>
                Пожалуйста, введите <strong>{props.name}</strong> в поле ввода, чтобы подтвердить удаление.
            </p>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                <div className="popup__buttonWrapper">
                    <button className='button button-3' >Удалить</button>   
                    <button className='button button-2' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupDeleteServer