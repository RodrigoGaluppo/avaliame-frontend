import React, {useState,useCallback,useRef } from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaBuilding, FaCity, FaLink, FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface IFilter{
    score:number
    comment:string
}



const CreateCompany:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubmit = useCallback(async (data:IFilter)=>{ 

        setIsLoading(true) 
        api.post(`/company`,{
            ...data,country:"portugal"
        },{headers:{"authorization" : `Bearer ${token}`}})

        .then((res)=>{
            console.log(res);
            
            addToast({type:"success",title:"success",description:"seu negócio foi publicado com sucesso"})

            history.push(`/view_company/${res.data.newCompany.id}`)

            setIsLoading(false)
        })
        .catch(e=>{

            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
                signOut()
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    },[ token, addToast, history, signOut])
    
    return(
        
        <>
            <Info>
                <span>
                    <Link to={`/profile`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Publicar um Negócio</strong></h1>
            </Info>
            <Container>
                <Text>
                    <h1>Preencha as respetivas informações para publicar seu negócio em nossa app :)</h1>
                </Text>
                <Search>
                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input  placeholder="nome do negócio" icon={FaBuilding} name="name" ></Input>
                        <TextArea  placeholder="descrição breve" icon={FaPen} name="description" ></TextArea>
                        <Input  placeholder="cidade" icon={FaCity} name="city" ></Input>
                        <Input  placeholder="link do site ou rede social" icon={FaLink} name="site_url" ></Input>
                
                        <Button>Publicar</Button>
                    </Form>
                </Search>
                {isLoading && <Loading></Loading>}
            </Container>
        </>
    )
}
export default CreateCompany
