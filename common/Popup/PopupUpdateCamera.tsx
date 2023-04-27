import React, { FormEvent, useContext, useEffect, useState, useRef } from "react"
import { APIRouter, APIRouterActions } from "../API/APIRouter"
import { MessageType, PopupType } from "../Interfaces"
import { SysMessageType, SysMessagesContext } from "./../../common/Providers/SysMessagesProvider"
import { useForm } from "react-hook-form"
import cross from './../../public/images/cross.svg'
import Image from "next/image"
import Input from "../Input"

interface PopupUpdateCameraProps {
    name: string
    ip_address: string
    description: string
    id: number
    mac_address: string
    parentID: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
    setFetching: CallableFunction
}

const PopupUpdateCamera = (props:PopupUpdateCameraProps) => {

    const { register, handleSubmit } = useForm();
    const message = useContext(SysMessagesContext) as SysMessageType,
        [deleteStatePopup, setDeleteStatePopup] = useState(false),
        [disabledDeleteBtn, setDisabledDeleteBtn] = useState(true)

    const deleteInput = useRef<HTMLInputElement>(null);

    const submitForm = (formData: any) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.updateCamera, {parentID: props.parentID, 
            id: props.id,
            ...formData,
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


    const deleteInputChange = () => {
        setDisabledDeleteBtn(true)
        if (deleteInput.current.value === props.name.toString()) setDisabledDeleteBtn(false)
    }

    const submitDeleteForm = (e:FormEvent) => {
        e.preventDefault()
        props.setFetching(true)
        APIRouter(APIRouterActions.deleteCamera, {
            parentID: props.parentID,
            id: props.id})
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
                            label="Введите название камеры" 
                            type="text" 
                            isRequired={true}
                            onChange={deleteInputChange}/>
                    <div className="popup__buttonWrapperWide">
                        <button className='button button-1' type="button" onClick={()=>{setDeleteStatePopup(false)}}>Отменить</button>   
                        <button className='button button-5' type="submit" disabled={disabledDeleteBtn ? true : false}>Удалить камеру</button>
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
                <div className="popup__buttonWrapper">
                    <button className='button button-4' type="button" onClick={()=>{setDeleteStatePopup(true)}}>Удалить</button>   
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupUpdateCamera