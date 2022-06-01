import React, { FormEvent, useContext, useRef, useState } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { IPopup, MessageType, PopupType } from "../../Interfaces"
import { PopupContext } from "../../Providers/PopupProvider"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"

const PopupUpdateCamera = (props:IPopup) => {

    const nameInput = useRef<any>(props.name),
        ipInput = useRef<any>(props.ip_address),
        descriptionInput = useRef<any>(props.description),
        deleteInput = useRef<any>(),
        popup = useContext(PopupContext),
        message = useContext(SysMessagesContext),
        [deleteStatePopup, setDeleteStatePopup] = useState(false)

    const submitForm = (e:FormEvent) => {
        APIRouter(APIRouterActions.updateCamera, {parentID: props.parentID, 
            id: props.id,
            name: nameInput.current.value,
            ip_address: ipInput.current.value,
            description: descriptionInput.current.value})
        .then(r => {
            message.notifyUser({
                type: MessageType.success,
                text: 'Камера успешно обновлена'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось обновить камеру'
            })
            throw new Error(e)
        })
        popup.setPopup({type: PopupType.default})
    }

    const submitDeleteForm = (e:FormEvent) => {
        APIRouter(APIRouterActions.deleteCamera, {
            parentID: props.parentID,
            id: props.id})
        .then(r => {
            message.notifyUser({
                type: MessageType.success,
                text: 'Камера успешно удалена'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось удалить камеру'
            })
            throw new Error(e)
        })
        popup.setPopup({type: PopupType.default})
    }

    if(deleteStatePopup) {
        return <div className="popup">
            <div className="popup__overlay" onClick={()=>{popup.setPopup({type: PopupType.default})}}/>
            <div className="popup__container">
                <div className="popup__top">
                    <h2 className="h2">{props.name}</h2>
                    <button onClick={()=>{popup.setPopup({type: PopupType.default})}}>X</button>
                </div>
                <form className="popup__form" onSubmit={submitDeleteForm}>
                    <Input reference={deleteInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                    <div className="popup__buttonWrapper">
                        <button className='button button-3' type="button" onClick={()=>{setDeleteStatePopup(false)}}>Отменить</button>   
                        <button className='button button-2' type="submit">Удалить камеру</button>
                    </div>
                </form>
            </div>
        </div>
    }

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{popup.setPopup({type: PopupType.default})}}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">{props.name}</h2>
                <button onClick={()=>{popup.setPopup({type: PopupType.default})}}>X</button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true} inputDefault={nameInput.current}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true} inputDefault={ipInput.current}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text" inputDefault={descriptionInput.current}/>
                <div className="popup__buttonWrapper">
                    <button className='button button-3' type="button" onClick={()=>{setDeleteStatePopup(true)}}>Удалить</button>   
                    <button className='button button-2' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupUpdateCamera