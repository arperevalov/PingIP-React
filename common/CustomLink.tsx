import Link from "next/link"
import { useRouter } from "next/router";

interface CustomLinkProps {
    children: React.ReactNode,
    href: string,
    className: string,
    activeClassName?: string,
    onClick?: (e: any) => void
}

const CustomLink = (props: CustomLinkProps) => {

    const { 
        children,
        href,
        className,
        activeClassName,
        onClick
    } = props;

    let customClassName = className;

    const router = useRouter()
    if (router.asPath === href) customClassName = `${className} ${activeClassName}`

    return <Link href={href} className={customClassName} onClick={onClick}>
        {children}
    </Link>
}

export default CustomLink