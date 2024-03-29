import React, { FormEvent, useContext, useEffect, useRef } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { MessageType, PopupType } from "../../Interfaces"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"
import cross from './../../../static/images/cross.svg'

interface PopupCreateCameraProps {
    name: string
    ip_address: string
    description: string
    id: number
    parentID: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
    setFetching: CallableFunction
}

const PopupCreateCamera = (props:PopupCreateCameraProps) => {

    const nameInput = useRef<HTMLInputElement>(null),
        ipInput = useRef<HTMLInputElement>(null),
        macInput = useRef<HTMLInputElement>(null),
        descriptionInput = useRef<HTMLInputElement>(null),
        message = useContext(SysMessagesContext)

    const submitForm = (e:FormEvent) => {
        e.preventDefault()
        props.setFetching(true)
        APIRouter(APIRouterActions.createCamera, { 
            id: props.id,
            name: nameInput.current.value,
            ip_address: ipInput.current.value,
            mac_address: macInput.current.value,
            description: descriptionInput.current.value,
            parentID: props.parentID})
        .then(r => {
            props.setFetching(false)
            props.setUpdates()
            props.setPopup({type: PopupType.default})
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: e
            })
            throw new Error(e)
        })
    }

    useEffect(()=>{
        let form = document.getElementsByClassName('popup__form') as HTMLCollectionOf<HTMLElement>,
        formChild = form[0].children[0] as HTMLInputElement;
        formChild.focus()
    },[])

    return <div className="popup">
        <div className="popup__overlay" onClick={()=>{
            props.setPopup({type: PopupType.default})
        }}/>
        <div className="popup__container">
            <div className="popup__top">
                <h2 className="h2">Добавить камеру</h2>
                <button className="popup__cross" onClick={()=>{
                    props.setPopup({type: PopupType.default})
                    }}>
                    <img src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true}/>
                <Input reference={macInput} placeholder="255.255.255.0" label="MAC" type="text" isRequired={false}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text"/>
                <div className="popup__buttonWrapperWide">  
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupCreateCamera