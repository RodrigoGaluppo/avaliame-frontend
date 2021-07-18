import React,{useCallback,useRef,useState} from "react"
import {Container,Content,Background} from "./styles"
import {FormHandles} from "@unform/core"
import {FiArrowLeft,FiMail,FiLock,FiUser} from "react-icons/fi"
import {Form} from "@unform/web"
import * as Yup from "yup"
import {Link} from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import getValidationErrors from "../../utils/getValidationErrors"
import {useToast} from "../../hooks/ToastContext"
import api from "../../services/apiClient"
import Loading from "../../components/Loading"

interface SignUpFormData{
    name:string
    email:string
    password:string
}

export const SignUp:React.FC = ()=>{

    const formRef = useRef<FormHandles>(null)
    const{addToast} = useToast()
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubmit = useCallback(async (data:SignUpFormData)=>{
        formRef.current?.setErrors({})
        try{
            const schema = Yup.object().shape({
                name:Yup.string().required("name is required"),
                email:Yup.string().required("email is required").email("the email must have a valid format"),
                password:Yup.string().min(3,"password must have at least 3 digits")
            })
            await schema.validate(data,{abortEarly:false});
            setIsLoading(true)
            api.post("/user",data)
            .then(()=>{
                addToast({ 
                    type:"success",
                    title:"user was created successfully",
                    description:"before loging in you must verify the e-mail we've sent to you"
                })
                setIsLoading(false)
            })
            .catch(e=>{
                addToast({ 
                    type:"error",
                    title:"data error",
                    description:e.response.data.message
                })
                setIsLoading(false)
            })
            
        }catch(e){
            if(e instanceof Yup.ValidationError){
                const errors = getValidationErrors(e)
                formRef.current?.setErrors(errors)
                return
            }
            setIsLoading(false)
            addToast({type:"error",title:"something went wrong",description:"could not lod the request"})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Container>
            <Background></Background>
            <Content>
                <Form ref={formRef} /*initialData={{}}*/ onSubmit={handleSubmit} >
                    <h1>Sign up</h1>
                    <Input name="name" icon={FiUser} placeholder="name"/>
                    <Input name="email" icon={FiMail} placeholder="email"/>
                    <Input name="password"  icon={FiLock} placeholder="password" type="password" />
                    <Button type="submit">Sign up</Button>
                </Form>
                <Link to="/signin">
                    <FiArrowLeft/>
                    Voltar ao Login
                </Link>
            </Content>
            {isLoading && <Loading></Loading>}
        </Container>
    )
}