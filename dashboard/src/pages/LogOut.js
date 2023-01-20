import { useEffect } from "react"
import { Navigate } from "react-router-dom"
const LogOut = () => {
    useEffect(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    },[])

    return(<Navigate to="sign-in" replace/>)
}

export default LogOut