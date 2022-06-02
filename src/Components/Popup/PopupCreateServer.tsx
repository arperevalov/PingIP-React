import React, { FormEvent, useContext, useRef } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { MessageType, PopupType } from "../../Interfaces"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"
import cross from './../../../static/images/cross.svg'

interface PopupCreateServerProps {
    name: string
    ip_address: string
    description: string
    id: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
}

const PopupCreateServer = (props:PopupCreateServerProps) => {

    const nameInput = useRef<any>(props.name),
        ipInput = useRef<any>(props.ip_address),
        descriptionInput = useRef<any>(props.description),
        message = useContext(SysMessagesContext)

    const submitForm = (e:FormEvent) => {
        APIRouter(APIRouterActions.createServer, { 
            id: props.id,
            name: nameInput.current.value,
            ip_address: ipInput.current.value,
            description: descriptionInput.current.value})
        .then(r => {
            props.setUpdates()
            message.notifyUser({
                type: MessageType.success,
                text: 'Сервер успешно добавлен'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось добавить сервер'
            })
            throw new Error(e)
        })
        props.setPopup({type: PopupType.default})
    }

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{
            props.setPopup({type: PopupType.default})
            }}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">Добавить сервер</h2>
                <button className="popup__cross" onClick={()=>{
                    props.setPopup({type: PopupType.default})
                    }}>
                    <img src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text"/>
                <div className="popup__buttonWrapperWide">
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupCreateServer