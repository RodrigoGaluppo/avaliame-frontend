import React, {useState,useRef, useEffect } from "react"
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


interface IReview{
    review_id:string
    score:number
    comment:string
    company_to_review:string
}
interface IParams{
    review_id:string |undefined
}

const CreateReview:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const [review,setReview] = useState<IReview>()
    const { params } = useRouteMatch<IParams>()
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const normalizeCardNumber = (value:string)=>{
        value = value.replace(/[^0-9.]/g, '')
        value = value.replace(/(\..*)\./g, '$1')
        return value
    }

    useEffect(()=>{
        api.get(`review/${params.review_id}`,{headers:{authorization:`Bearer ${token}`}})
        .then((res)=>{
            setReview(res.data.review) 
        })
        .catch(e=>{
            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })


    /* eslint-disable react-hooks/exhaustive-deps */
    },[])

    const handleSubmit = async (data:IReview)=>{ 
        

        // eslint-disable-next-line eqeqeq
        if(data.score == review?.score && data.comment == review?.comment )
            return

        setIsLoading(true) 
        api.put(`/review`,{
            review_id:params.review_id,
            score:data.score,
            comment:data.comment
        },{headers:{"authorization" : `Bearer ${token}`}})

        .then((res)=>{
            
            addToast({type:"success",title:"success",description:"sua review foi atualizada com sucesso"})

            history.push(`/view_company/${res.data.review.company_to_review}`)

            setIsLoading(false)
        })
        .catch(e=>{

            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    }

    
    
    return(
        
        <>
            <Info>
                <span>
                    <Link to={`/view_company/${review?.company_to_review}`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Atualizar sua Review</strong></h1>
            </Info>
            <Container>
                <Text>
                    <h1> Partilhe sua experiência quanto ao seguimento das restrições</h1>
                </Text>
                <Search>
                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input defaultValue={review?.score} onChange={(e)=>{
                            e.currentTarget.maxLength=5
                            let value = e.currentTarget.value
                            e.currentTarget.value = normalizeCardNumber(value)
                        }} placeholder="Avaliação" icon={FiBook} name="score" ></Input>
                        <TextArea defaultValue={review?.comment} placeholder="Comentário" icon={FaPen} name="comment" ></TextArea>
                
                        <Button>Atualizar</Button>
                    </Form>
                </Search>
                {isLoading && <Loading></Loading>}
            </Container>
        </>
    )
}
export default CreateReview
