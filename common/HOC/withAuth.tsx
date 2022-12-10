import { useEffect } from "react"
import { useRouter } from "next/router"
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

const withAuth = (Component: React.ElementType) => ({...props}) => {
    const router = useRouter();
    const hasBearer = useSelector((store:RootState) => {return store.AuthPage.hasBearer});

    // Fix for not existing localStorage at nextJS server
    if ( typeof window === 'undefined' ) return (<Component/>)

    useEffect(()=>{
        if ( router.pathname === '/' ) {
            router.push('/servers')
        }
    
        if ( router.pathname.includes('/auth') && hasBearer ) {
            router.push('/servers')
        }
    
        if ( !router.pathname.includes('/auth') && !hasBearer ) {
            router.push('/auth')
        }
    
    },[])
    
    return (<Component/>)
}

export default withAuth