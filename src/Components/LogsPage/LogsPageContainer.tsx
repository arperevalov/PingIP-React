import React from "react";
import { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setLogs } from "../../Redux/LogsReducer";
import { setFetching } from "../../Redux/AppReducer";
import LogsPage from "./LogsPage";

interface LogsPageAPIProps  {
    logs: [],
    setFetching: CallableFunction,
    setLogs: CallableFunction
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
                text: 'Все сервера пинганулись'
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось пингануть все сервера'
            })
            throw new Error(e)
        })   
    }

    useEffect(()=>{
        getLogs()        
    },[])

    return <LogsPage/>
}


const mapStateToProps = (store: any) => {
    return {
        logs: store.LogsPage.logs
    }
}

const LogsPageContainer = connect(mapStateToProps,{
    setFetching,
    setLogs
})(LogsPageAPI)

export default LogsPageContainer