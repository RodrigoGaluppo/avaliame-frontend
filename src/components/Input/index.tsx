import React,{InputHTMLAttributes, useEffect,useRef,useState,useCallback} from "react"
import {Container,Error} from "./styles"
import {IconBaseProps} from "react-icons"
import {FiAlertCircle} from "react-icons/fi"
import {useField} from "@unform/core"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string
    icon:React.ComponentType<IconBaseProps>
}

const Input:React.FC<InputProps>= ({name,icon:Icon,...rest})=>{
    const [isFocused,setIsFocused] = useState(false) 
    const [isFilled,setIsFilled] = useState(false) 

    const inputRef = useRef<HTMLInputElement>(null) 
    
    const {fieldName,defaultValue,error,registerField} = useField(name)

    const handleInputBlur = useCallback(()=>{
        setIsFocused(false)

        if(inputRef.current?.value){
            setIsFilled(true)
        }else{
            setIsFilled(false) 
        }
    },[])
    const hanldeInputFocus = useCallback(()=>{
        setIsFocused(true)
    },[])

    useEffect(()=>{
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:"value"
        })
    },[fieldName,registerField])

    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused} >
            {Icon && <Icon size={20}/> }
            <input 
            
            onFocus={hanldeInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue} 
            ref={inputRef} {...rest}
            />
            {error && <Error title={error} ><FiAlertCircle color="red" size={20} ></FiAlertCircle></Error>}
        </Container>
        
    )
}

export default Input