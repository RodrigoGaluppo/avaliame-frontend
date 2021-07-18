import React,{createContext,useCallback, useContext,useState} from "react"
import {v4} from "uuid"
import {ToastContainer} from "../components/ToastContainer"

interface IToastContextData{
    addToast(message:Omit<IToastMessage,"id">):void
    removeToast(id:string):void
}

interface IToastMessage{
    id:string
    type ?:"success" | "error" | "info"
    title:string
    description?:string
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData)

const ToastProvider:React.FC = ({children})=>{
    const [messages,setMessages] = useState<IToastMessage[]>([])

    const addToast = useCallback(({type,title,description}: Omit<IToastMessage,"id">)=>{
        const id = v4()
        const toast ={
            id,
            type,
            title,
            description
        }
        setMessages([...messages,toast])
    },[messages])

    const removeToast = useCallback((id:string)=>{
        const Messages = messages.filter((message)=>(
            message.id !== id
        ))
        setMessages(Messages)
    },[messages])

    return (
        <ToastContext.Provider value={{addToast,removeToast}} >
            {children}
            <ToastContainer messages={messages} ></ToastContainer>
        </ToastContext.Provider>
    )
}

const useToast = () =>{
    const context = useContext(ToastContext)
    if(!context){
        throw new Error("usetoast must be used within a Provider")
    }
    return context
}

export {ToastProvider,useToast}