import React, {useState,useCallback,useRef } from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory,useRouteMatch} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft, FiBook} from "react-icons/fi"
import {FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface IFilter{
    score:number
    comment:string
}
interface IParams{
    company_id:string |undefined
}


const CreateReview:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const { params } = useRouteMatch<IParams>()
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const normalizeCardNumber = (value:string)=>{
        value = value.replace(/[^0-9.]/g, '')
        value = value.replace(/(\..*)\./g, '$1')
        return value
    }

    const handleSubmit = useCallback(async (data:IFilter)=>{ 

        setIsLoading(true) 
        api.post(`/review`,{
            company_to_review:params.company_id,
            score:data.score,
            comment:data.comment
        },{headers:{"authorization" : `Bearer ${token}`}})

        .then((res)=>{
            console.log(res);
            
            addToast({type:"success",title:"success",description:"sua review foi publicada com sucesso"})

            history.push(`/view_company/${params.company_id}`)

            setIsLoading(false)
        })
        .catch(e=>{

            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
                signOut()
                    
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    },[params.company_id, token, addToast, history, signOut])
    
    return(
        
        <>
            <Info>
                <span>
                    <Link to={`/view_company/${params.company_id}`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Publicar uma Review</strong></h1>
            </Info>
            <Container>
                <Text>
                    <h1> Partilhe sua experiência quanto ao seguimento das restrições</h1>
                </Text>
                <Search>
                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input onChange={(e)=>{
                            e.currentTarget.maxLength=5
                            let value = e.currentTarget.value
                            e.currentTarget.value = normalizeCardNumber(value)
                        }} placeholder="Avaliação" icon={FiBook} name="score" ></Input>
                        <TextArea placeholder="Comentário" icon={FaPen} name="comment" ></TextArea>
                
                        <Button>Publicar</Button>
                    </Form>
                </Search>
                {isLoading && <Loading></Loading>}
            </Container>
        </>
    )
}
export default CreateReview
