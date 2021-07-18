import React from "react"
import {Container} from  "./styles"
import Toast from "./Toast"
import {useTransition} from "react-spring"

interface IToastContainerProps{
    messages:{
        id:string
        type ?:"success" | "error" | "info"
        title:string
        description?:string
    }[]
}

export const ToastContainer:React.FC<IToastContainerProps> = ({messages})=>{
    
    const messagesWithTransitions = useTransition(
        messages,
        message=>message.id,
        {
            from:{right:"-120%"},
            enter:{right:"0%"},
            leave:{right:"-120%"}
        }
    )
    
    return(
        <Container>
            {messagesWithTransitions.map(({item,key,props})=>{
                return(
                    <Toast key={key} message={item} style={props} >

                    </Toast>
                )
            })}
        </Container>
    )
}