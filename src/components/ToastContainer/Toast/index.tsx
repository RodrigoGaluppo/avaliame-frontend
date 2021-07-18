import React, { useEffect } from "react"
import {FiAlertCircle,FiXCircle,FiCheck} from "react-icons/fi"
import {Container} from "./styles"
import {useToast} from "../../../hooks/ToastContext"

interface IToastProps{
    style:object
    message:{
        id:string
        type ?:"success" | "error" | "info"
        title:string
        description?:string
    }
}

const icons = {
    info:<FiAlertCircle size={20} ></FiAlertCircle>,
    error:<FiAlertCircle size={20} ></FiAlertCircle>,
    success:<FiCheck size={20} ></FiCheck>
}

const Toast:React.FC<IToastProps> = ({message,style})=>{
    const {removeToast} = useToast()

    useEffect(()=>{
       const timer = setTimeout(()=>{
           removeToast(message.id)
       },6000) 

       return()=>{
           clearTimeout(timer)
       }
    },[removeToast,message.id])
    

    return(
        <Container style={style} type={message.type} >
            {icons[message.type || "info"]}
            <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
            </div>
            <button type="button" onClick={()=>removeToast(message.id)} >
            <FiXCircle size={18} ></FiXCircle>
            </button>
        </Container>
    )
}
export default Toast