import React, { useEffect, useRef, useState } from "react"
import mark from '../../public/images/mark.svg'
import markActive from '../../public/images/mark-active.svg'
import Image from "next/image"

interface ListDescriptionProps {
    description: string
}

const ListDescription = (props: ListDescriptionProps) => {

    const { 
        description
     } = props;

    if (description.length < 1) return <></> 

    const [displayBlock, setDisplayBlock] = useState(false),
    descriptionButton = useRef(null)

    const toggleDescription = (event: React.MouseEvent):void => {
        event.preventDefault()
        setDisplayBlock(!displayBlock)
    }

    const handleOutsideClick = (event: Event) => {
        if (descriptionButton.current && !descriptionButton.current.contains(event.target)){
            setDisplayBlock(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click', handleOutsideClick);
    },[])

    return <button ref={descriptionButton} type="button" className={`item__descriptionButton`} onClick={toggleDescription}>
        <Image src={displayBlock ? markActive : mark} alt="Описание"/>
        <div className={`item__descriptionTextWrapper ${displayBlock ? '' : ' inactive'}`}>
            <div className='item__descriptionText'>
                <p>
                    {description}
                </p>
            </div>
        </div>
    </button>
}

export default ListDescription