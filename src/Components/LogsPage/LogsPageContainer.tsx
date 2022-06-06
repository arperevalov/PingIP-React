import React from "react";
import { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { ILogs, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setLogs } from "../../Redux/LogsReducer";
import { setFetching } from "../../Redux/AppReducer";
import LogsPage from "./LogsPage";

interface LogsPageAPIProps  {
    logs: ILogs[],
    setFetching: CallableFunction,
    setLogs: CallableFunction
    isFetching: boolean
}

const LogsPageAPI = (props: LogsPageAPIProps) => {
    
    const message = useContext(SysMessagesContext)

    const getLogs = () => {
        props.setFetching(true)
        APIRouter(APIRouterActions.getLogs, {})
        .then(r => {
            props.setFetching(false)
            props.setLogs(r)
            message.notifyUser({
                type: MessageType.success,
                text: 'Все логи загрузились'
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось загрузить все логи'
            })
            throw new Error(e)
        })   
    }

    useEffect(()=>{
        getLogs()        
    },[])

    return <LogsPage logs={props.logs} isFetching={props.isFetching}/>
}


const mapStateToProps = (store: any) => {
    return {
        logs: store.LogsPage.logs,
        isFetching: store.AppPage.isFetching
    }
}

const LogsPageContainer = connect(mapStateToProps,{
    setFetching,
    setLogs
})(LogsPageAPI)

export default LogsPageContainer