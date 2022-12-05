import { useEffect } from "react"
import { useRouter } from "next/router"

const withAuth = (Component: React.ElementType) => ({...props}) => {
    const router = useRouter();

    // Fix for not existing localStorage at nextJS server
    if ( typeof window === 'undefined' ) return (<Component/>)

    if ( router.pathname === '/' ) {
        useEffect(()=>{
            router.push('/servers')
        },[])
    }

    if ( router.pathname.includes('/auth') && localStorage.getItem('Bearer') ) {
        useEffect(()=>{
            router.push('/servers')
        },[])
    }

    if ( !router.pathname.includes('/auth') && !localStorage.getItem('Bearer') ) {
        useEffect(()=>{
            router.push('/auth')
        },[])
    }
    return (<Component/>)
}

export default withAuth