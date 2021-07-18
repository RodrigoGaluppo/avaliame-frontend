import React,{InputHTMLAttributes, useEffect,useRef} from "react"
import {Container} from "./styles"
import {useField} from "@unform/core"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string
}

const SearchInput:React.FC<InputProps>= ({name,...rest})=>{

    const inputRef = useRef<HTMLInputElement>(null) 
    const {fieldName,registerField} = useField(name)

    useEffect(()=>{
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:"value"
        })
    },[fieldName,registerField])

    return (
        <Container>
            <input 
            type="text"  
            ref={inputRef}
            {...rest} 
            />
            <div className="containerButton">
                
                <button type="submit">Search</button>
            </div>
        </Container>
        
    )
}

export default SearchInput