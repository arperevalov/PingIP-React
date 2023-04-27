import React from "react";
import { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../common/API/APIRouter";
import { ILogs, MessageType } from "../../common/Interfaces";
import { SysMessagesContext } from "../../common/Providers/SysMessagesProvider";
import { setLogs } from "../../Redux/LogsReducer";
import { setFetching } from "../../Redux/AppReducer";
import { RootState } from "../../Redux/store";
import LogsLayout from "./LogsLayout";
import withAuth from "../../common/HOC/withAuth";

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
        getLogs()        
    },[])

    return <LogsLayout logs={props.logs} isFetching={props.isFetching}/>
}


const mapStateToProps = (store: RootState) => {
    return {
        logs: store.LogsPage.logs,
        isFetching: store.AppPage.isFetching
    }
}

const LogsPageContainer = connect(mapStateToProps,{
    setFetching,
    setLogs
})(LogsPageAPI)

export default withAuth(LogsPageContainer)