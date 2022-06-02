import React, { FormEvent, useContext, useRef, useState } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { IPopup, MessageType, PopupType } from "../../Interfaces"
// import { PopupContext } from "../../Providers/PopupProvider"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"
import cross from './../../../static/images/cross.svg'

interface PopupUpdateCameraProps {
    name: string
    ip_address: string
    description: string
    id: number
    parentID: number
    setPopup: CallableFunction
}

const PopupUpdateCamera = (props:PopupUpdateCameraProps) => {

    const nameInput = useRef<any>(props.name),
        ipInput = useRef<any>(props.ip_address),
        descriptionInput = useRef<any>(props.description),
        deleteInput = useRef<any>(),
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
        props.setPopup({type: PopupType.default})
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
        props.setPopup({type: PopupType.default})
    }

    if(deleteStatePopup) {
        return <div className="popup">
            <div className="popup__overlay" onClick={()=>{
                props.setPopup({type: PopupType.default})
                }}/>
            <div className="popup__container">
                <div className="popup__top">
                    <h2 className="h2">Удалить {props.name}</h2>
                    <button className="popup__cross" onClick={()=>{
                        props.setPopup({type: PopupType.default})
                        }}>
                        <img src={cross} alt="" />
                    </button>
                </div>
                <p className="popup__text">Пожалуйста, введите <strong>{props.name}</strong> в поле ввода, чтобы подтвердить удаление.</p>
                <form className="popup__form" onSubmit={submitDeleteForm}>
                    <Input reference={deleteInput} placeholder=" " label="Введите название камеры" type="text" isRequired={true}/>
                    <div className="popup__buttonWrapperWide">
                        <button className='button button-1' type="button" onClick={()=>{setDeleteStatePopup(false)}}>Отменить</button>   
                        <button className='button button-5' type="submit">Удалить камеру</button>
                    </div>
                </form>
            </div>
        </div>
    }

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{
            props.setPopup({type: PopupType.default})
            }}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">Изменить {props.name}</h2>
                <button className="popup__cross" onClick={()=>{
                    props.setPopup({type: PopupType.default})
                    }}>
                    <img src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true} inputDefault={nameInput.current}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true} inputDefault={ipInput.current}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text" inputDefault={descriptionInput.current}/>
                <div className="popup__buttonWrapper">
                    <button className='button button-4' type="button" onClick={()=>{setDeleteStatePopup(true)}}>Удалить</button>   
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupUpdateCamera