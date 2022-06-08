import React, { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { MessageType, PopupType } from "../../Interfaces"
import { SysMessagesContext } from "../../Providers/SysMessagesProvider"
import Input from "../Common/Input"
import cross from './../../../static/images/cross.svg'

interface PopupUpdateServerProps {
    name: string
    ip_address: string
    description: string
    id: number
    parentID: number
    setPopup: CallableFunction
    setUpdates: CallableFunction
    setFetching: CallableFunction
}

const PopupUpdateServer = (props:PopupUpdateServerProps) => {

    const nameInput = useRef<HTMLInputElement>(null),
        ipInput = useRef<HTMLInputElement>(null),
        descriptionInput = useRef<HTMLInputElement>(null),
        deleteInput = useRef<HTMLInputElement>(null),
        message = useContext(SysMessagesContext),
        [deleteStatePopup, setDeleteStatePopup] = useState(false),
        [disabledDeleteBtn, setDisabledDeleteBtn] = useState(true)

    const submitForm = (e:FormEvent) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.updateServer, {
            id: props.id,
            name: nameInput.current.value,
            ip_address: ipInput.current.value,
            description: descriptionInput.current.value})
        .then(r => {
            props.setFetching(false)
            props.setUpdates()
            message.notifyUser({
                type: MessageType.success,
                text: 'Сервер успешно обновлен'
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось обновить сервер'
            })
            throw new Error(e)
        })
        props.setPopup({type: PopupType.default})
    }

    const deleteInputChange = () => {
        setDisabledDeleteBtn(true)
        if (deleteInput.current.value === props.name.toString()) setDisabledDeleteBtn(false)
    }

    const submitDeleteForm = (e:FormEvent) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.deleteServer, {id: props.id})
        .then(r => {
            props.setFetching(false)
            props.setUpdates()
            message.notifyUser({
                type: MessageType.success,
                text: 'Сервер успешно удален'
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось удалить сервер'
            })
            throw new Error(e)
        })
        props.setPopup({type: PopupType.default})
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
                        <img src={cross} alt="" />
                    </button>
                </div>
                <p className="popup__text">Пожалуйста, введите <strong>{props.name}</strong> в поле ввода, чтобы подтвердить удаление.</p>
                <form className="popup__form" onSubmit={submitDeleteForm}>
                    <Input  reference={deleteInput} 
                            placeholder=" " 
                            label="Введите название сервера" 
                            type="text" 
                            isRequired={true}
                            onChangeAction={deleteInputChange}/>
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
                    <img src={cross} alt="" />
                </button>
            </div>
            <form className="popup__form" onSubmit={submitForm}>
                <Input reference={nameInput} placeholder="Например, Сервер #1" label="Имя" type="text" isRequired={true} inputDefault={props.name}/>
                <Input reference={ipInput} placeholder="255.255.255.0" label="IP" type="text" isRequired={true} inputDefault={props.ip_address}/>
                <Input reference={descriptionInput} placeholder="Короткое описание для важного объекта" label="Описание" type="text" inputDefault={props.description ? props.description : ''}/>
                <div className="popup__buttonWrapper">
                    <button className='button button-4' type="button" onClick={()=>{setDeleteStatePopup(true)}}>Удалить</button>   
                    <button className='button button-super' type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    </div>
}

export default PopupUpdateServer