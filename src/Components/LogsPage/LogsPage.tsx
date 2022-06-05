import React from "react";
import { ILogs } from "../../Interfaces";

interface LogsPageProps {
    logs: ILogs[]
}

const LogsPage = (props: LogsPageProps) => {
    return <main className='main'>
    <div className='main__top'>
        <h1 className='h1'>Логи</h1>
    </div>

    <div className="logs">
        <div className="logs__table">
            <ul className="logs__items">
                {props.logs.map(i=>{
                    return  <li className="logs__item">
                        <a href={i.path} className="logs__link">
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