import React, { useEffect, useRef, useState, VoidFunctionComponent } from "react"
import mark from './../../../static/images/mark.svg'
import markActive from './../../../static/images/mark-active.svg'

interface ListDescriptionProps {
    description: string
}

const ListDescription = (props: ListDescriptionProps) => {

    const [displayBlock, setDisplayBlock] = useState(false),
    descriptionButton = useRef(null)

    const toggleDescription = (event: React.MouseEvent):void => {
        event.preventDefault()
        setDisplayBlock(!displayBlock)
    }

    const handleOutsideClick = (event: Event) => {
        if (descriptionButton && !descriptionButton.current.contains(event.target)){
            setDisplayBlock(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click', handleOutsideClick);
    },[])

    return <button ref={descriptionButton} type="button" className={`item__descriptionButton ${props.description ? '' : ' inactive'}`} onClick={toggleDescription}>
        <img src={displayBlock ? markActive : mark}/>
        <div className={`item__descriptionTextWrapper ${displayBlock ? '' : ' inactive'}`}>
            <svg className='item__descriptionCorner' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0H0L24 24V0Z" fill="#f5f5f5"/>
            </svg>
            <div className='item__descriptionText'>
                <p>
                    {props.description}
                </p>
            </div>
        </div>
    </button>
}

export default ListDescription