import React, { useContext, useEffect } from "react"
import { APIRouter, APIRouterActions } from "../API/APIRouter"
import { MessageType, PopupType } from "../Interfaces"
import { SysMessageType, SysMessagesContext } from "./../../common/Providers/SysMessagesProvider"
import cross from './../../public/images/cross.svg'
import Image from "next/image"
import { useForm } from "react-hook-form"

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

    const { register, handleSubmit } = useForm();
    const message = useContext(SysMessagesContext) as SysMessageType

    const submitForm = (formData: any) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.createCamera, { 
            id: props.id,
            parentID: props.parentID,
            ...formData
        })
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
                    <Image src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={handleSubmit(submitForm)}>
                <label className="input">
                    <input {...register("name")} className="input__input" placeholder="Например, Камера #1" type="text" required={true}/>
                    <span className="input__label" >Имя</span>
                </label>
                <label className="input">
                    <input {...register("ip_address")} className="input__input" placeholder="255.255.255.0" type="text" required={true}/>
                    <span className="input__label">IP</span>
                </label>
                <label className="input">
                    <input {...register("mac_address")} className="input__input" placeholder="MM:MM:MM:SS:SS:SS" type="text"/>
                    <span className="input__label">MAC</span>
                </label>
                <label className="input">
                    <input {...register("description")} className="input__input" placeholder="Короткое описание для важного объекта" type="text"/>
                    <span className="input__label">Описание</span>
                </label>
                <div className="popup__buttonWrapperWide">  
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupCreateCamera