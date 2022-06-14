import React from "react"

interface EmptyProps {
    action?: CallableFunction
    text?: string
}

const Empty = (props: EmptyProps) => {
    return <div className='empty'>
    <h2 className='h2'>Здесь ничего нет</h2>
    <p className='empty__text'>
        {props.text ? props.text : 'Если вы уверены, что на этой странице должны быть компоненты, обратитесь к разработчикам сайта.'}
    </p>
    {props.action ? <button className='button button-super empty__button' onClick={()=> {props.action()}}>+ Добавить объект</button> : ''}
</div>
}

export default Empty