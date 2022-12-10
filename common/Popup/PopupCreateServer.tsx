import React, { FormEvent, useContext, useEffect, useRef } from "react"
import { APIRouter, APIRouterActions } from "../API/APIRouter"
import { MessageType, PopupType } from "../Interfaces"
import { SysMessagesContext } from "./../../common/Providers/SysMessagesProvider"
import Input from "../Input"
import cross from './../../public/images/cross.svg'
import Image from "next/image"

interface PopupCreateServerProps {
    name: string
    ip_address: string
    description: string
    id: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
    setFetching: CallableFunction
}

const PopupCreateServer = (props:PopupCreateServerProps) => {

    const nameInput = useRef<HTMLInputElement>(null),
        ipInput = useRef<HTMLInputElement>(null),
        macInput = useRef<HTMLInputElement>(null),
        descriptionInput = useRef<HTMLInputElement>(null),
        message = useContext(SysMessagesContext)

    const submitForm = (e:FormEvent) => {
        e.preventDefault()
        props.setFetching(true)
        APIRouter(APIRouterActions.createServer, { 
            id: props.id,
            name: nameInput.current.value,
            ip_address: ipInput.current.value,
            mac_address: macInput.current.value,
            description: descriptionInput.current.value})
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
                <h2 className="h2">Добавить сервер</h2>
                <button className="popup__cross" onClick={()=>{
                    props.setPopup({type: PopupType.default})
                    }}>
                    <Image src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Камера #1" label="Имя" type="text" isRequired={true}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true}/>
                <Input reference={macInput} placeholder="MM:MM:MM:SS:SS:SS" label="MAC" type="text" isRequired={false}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text"/>
                <div className="popup__buttonWrapperWide">
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupCreateServer