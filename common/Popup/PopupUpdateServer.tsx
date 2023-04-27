import React, { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { APIRouter, APIRouterActions } from "../API/APIRouter"
import { MessageType, PopupType } from "../Interfaces"
import { SysMessageType, SysMessagesContext } from "./../../common/Providers/SysMessagesProvider"
import cross from './../../public/images/cross.svg'
import Image from "next/image"
import { useForm } from "react-hook-form"
import Input from "../Input"

interface PopupUpdateServerProps {
    name: string
    ip_address: string
    mac_address: string
    description: string
    id: number
    parentID: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
    setFetching: CallableFunction
}

const PopupUpdateServer = (props:PopupUpdateServerProps) => {

    const { register, handleSubmit } = useForm();
    const deleteInput = useRef<HTMLInputElement>(null),
        message = useContext(SysMessagesContext) as SysMessageType,
        [deleteStatePopup, setDeleteStatePopup] = useState(false),
        [disabledDeleteBtn, setDisabledDeleteBtn] = useState(true)

    const submitForm = (formData: any) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.updateServer, {
            id: props.id,
            ...formData,})
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

    const deleteInputChange = () => {
        setDisabledDeleteBtn(true)
        if (deleteInput.current.value === props.name.toString()) setDisabledDeleteBtn(false)
    }

    const submitDeleteForm = (e:FormEvent) => {
        e.preventDefault()
        props.setFetching(true)
        APIRouter(APIRouterActions.deleteServer, {id: props.id})
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
                        <Image src={cross} alt="" />
                    </button>
                </div>
                <p className="popup__text">Пожалуйста, введите <strong>{props.name}</strong> в поле ввода, чтобы подтвердить удаление.</p>
                <form className="popup__form" onSubmit={submitDeleteForm}>
                    <Input  reference={deleteInput} 
                            placeholder=" " 
                            label="Введите название сервера" 
                            type="text" 
                            isRequired={true}
                            onChange={deleteInputChange}/>
                    <div className="popup__buttonWrapperWide">
                        <button className='button button-1' type="button" onClick={()=>{setDeleteStatePopup(false)}}>Отменить</button>   
                        <button className='button button-5' type="submit" disabled={disabledDeleteBtn ? true : false}>Удалить сервер</button>
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
                    <Image src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={handleSubmit(submitForm)}>
                <label className="input">
                    <input {...register("name")} className="input__input" placeholder="Например, Камера #1" type="text" required={true} defaultValue={props.name}/>
                    <span className="input__label" >Имя</span>
                </label>
                <label className="input">
                    <input {...register("ip_address")} className="input__input" placeholder="255.255.255.0" type="text" required={true} defaultValue={props.ip_address}/>
                    <span className="input__label">IP</span>
                </label>
                <label className="input">
                    <input {...register("mac_address")} className="input__input" placeholder="MM:MM:MM:SS:SS:SS" type="text" defaultValue={props.mac_address}/>
                    <span className="input__label">MAC</span>
                </label>
                <label className="input">
                    <input {...register("description")} className="input__input" placeholder="Короткое описание для важного объекта" type="text" defaultValue={props.description}/>
                    <span className="input__label">Описание</span>
                </label>
                <div className="popup__buttonWrapper">
                    <button className='button button-4' type="button" onClick={()=>{setDeleteStatePopup(true)}}>Удалить</button>   
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupUpdateServer