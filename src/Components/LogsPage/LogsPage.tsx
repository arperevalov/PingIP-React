import React from "react";
import { ILogs } from "../../Interfaces";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";

interface LogsPageProps {
    logs: ILogs[]
}

const LogsPage = (props: LogsPageProps) => {

    const downloadFile = (id:number, name: string) => {
        APIRouter(APIRouterActions.downloadFile, {id, name})
        .catch(e => {
            throw new Error(e)
        })   
    }

    return <main className='main'>
    <div className='main__top'>
        <h1 className='h1'>Логи</h1>
    </div>

    <div className="logs">
        <div className="logs__table">
            <ul className="logs__items">
                {props.logs.map(i=>{
                    return  <li className="logs__item">
                        <a onClick={()=>{downloadFile(i.id, i.date)}} className="logs__link">
                            <span className="logs__name">{new Date(i.date).toLocaleDateString() + ' ' + new Date(i.date).toLocaleTimeString()}</span>
                        </a>
                    </li>
                })}
            </ul>
        </div>
    </div>
    </main>
}

export default LogsPage