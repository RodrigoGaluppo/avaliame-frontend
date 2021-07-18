import React,{useCallback,useRef,useState} from "react"
import {Container,Content,Background} from "./styles"
import {FormHandles} from "@unform/core"
import {FiMail,FiLock,FiLogIn, FiArrowLeft} from "react-icons/fi"
import {Form} from "@unform/web"
import * as Yup from "yup"
import {Link,useHistory} from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import getValidationErrors from "../../utils/getValidationErrors"
import {useAuth} from "../../hooks/AuthContext"
import {useToast} from "../../hooks/ToastContext"
import Loading from "../../components/Loading"

interface SigInFormData{
    email:string,
    password:string
}

export const SignIn:React.FC = ()=>{

    const formRef = useRef<FormHandles>(null)
    const history = useHistory()
    const {signIn} = useAuth()
    const{addToast} = useToast()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    
    const handleSubmit = useCallback(async (data:SigInFormData)=>{

        formRef.current?.setErrors({})

        try{

            const schema = Yup.object().shape({
                email:Yup.string().required("email is required").email("the email must have a valid format"),
                password:Yup.string().min(3,"password must have at least 3 digits")
            })

            await schema.validate(data,{abortEarly:false})

            setIsLoading(true)
            await signIn({
                email:data.email,
                password:data.password
            })
            .then(()=>{

                addToast({ 
                    type:"success",
                    title:"you've logged in successfully"
                })
                setIsLoading(false)
                history.push("/")
            })
            .catch(e=>{
   
                addToast({ 
                    type:"error",
                    title:"authentication error",
                    description:"error"
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
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        
            
        }

    },[signIn,addToast,history])

    return (
        <Container>
            <Content>
            
                <Link to="/">
                    <FiArrowLeft/> <p>Voltar a tela inicial</p>
                </Link>

                <Form ref={formRef} onSubmit={handleSubmit} action="">
                    <h1>Login</h1>
                    <Input name="email" icon={FiMail} placeholder="email"/>
                    <Input name="password"  icon={FiLock} placeholder="password" type="password" />
                    <Button type="submit">Sign in</Button>
                    
                </Form>
                <Link to="/signup">
                    <FiLogIn/> <p>Criar conta</p>
                </Link>
                
            </Content>
            <Background></Background>
            {isLoading && <Loading></Loading>}
        </Container>
    )
}