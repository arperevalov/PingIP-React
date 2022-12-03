import React from "react";
import { ILogs } from "../../common/Interfaces";
import { APIRouter, APIRouterActions } from "../../common/API/APIRouter";
import Empty from "../../common/Empty";

interface LogsPageProps {
    logs: ILogs[]
    isFetching: boolean
}

const LogsLayout = (props: LogsPageProps) => {

    const downloadFile = (id:number, name: string) => {
        APIRouter(APIRouterActions.downloadFile, {id, name})
        .catch(e => {
            throw new Error(e)
        })   
    }

    if(props.logs.length < 1 && !props.isFetching) {
        return <main className='main'>
            <div className='main__top'>
                <h1 className='h1'>Логи</h1>
            </div>
            <Empty text='Логи появляются, когда на сервере есть серверы/камеры. Пожалуйста, проверьте их наличие.'/>
        </main>
    }

    return <main className='main'>
    <div className='main__top'>
        <h1 className='h1'>Логи</h1>
    </div>

    <div className="logs">
        <div className="logs__table">
            <ul className="logs__items">
                {props.logs
                .sort((a,b) => {return new Date(b.date).getTime() - new Date(a.date).getTime()})
                .map(i=>{
                    return  <li className="logs__item" key={i.id}>
                        <a href="#" onClick={()=>{downloadFile(i.id, i.date)}} className="logs__link">
                            <span className="logs__name">{new Date(i.date).toLocaleDateString() + ' ' + new Date(i.date).toLocaleTimeString()}</span>
                        </a>
                    </li>
                })}
            </ul>
        </div>
    </div>
    </main>
}

export default LogsLayout