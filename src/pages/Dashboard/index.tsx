import React, { useEffect, useState,useRef,useCallback} from "react"
import "./Dash.css"
import {Container,Info,Search,ListRooms,User} from "./styles"
import {Link} from "react-router-dom"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiUser} from "react-icons/fi"
import api from "../../services/apiClient"
import SearchInput from "../../components/SearchInput"
import Loading from "../../components/Loading"

interface ICompany{
    id:string
    name:string
    city:string
    description:string
    img_url:string
    averageScore:string
}

const Dashboard:React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)
    //const history = useHistory()

    const {addToast} = useToast()

    const [companies,setCompanies] = useState<ICompany[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [page,setPage] = useState<number>(0)
    const [query,setQuery] = useState<string>(``)
    
    const HandleSearch = useCallback((data)=>{

        setPage(0)

        if(data.query !== "")
        {

            setQuery(data.query)

            api.get(`companies/portugal/${page}/${data.query}`)
            .then((res)=>{
                setCompanies(res.data.companies)
                setLoading(false)
            })
            .catch((response)=>{

                if(response.request)
                {
                    if(response.request.status === 404)
                        return
                }
                else{
                    addToast({type:"error","title":"could not connect to the server"})
                }
               
                setLoading(false)
            })
        }
        else{

            setQuery("")

            api.get(`companies/portugal/${page}/`)
            .then((res)=>{
                setCompanies(res.data.companies)
                setLoading(false)
            })
            .catch((response)=>{

                if(response.request)
                {
                    if(response.request.status === 404)
                        return
                }
                else{
                    addToast({type:"error","title":"could not connect to the server"})
                }
               
                setLoading(false)
            })
        }
        
        
    },[addToast, page])

    useEffect(()=>{
    
        api.get(`companies/portugal/${page}/${query}`)
        .then((res)=>{
            
            if(companies.length > 0)
                setCompanies([...companies,...res.data.companies])
            else
            setCompanies(res.data.companies)

            
        })
        .catch((response)=>{
            
            if(response.request)
            {
                if(response.request.status === 404)
                    return
            }
            else{
                addToast({type:"error","title":"could not connect to the server"})
            }
        
            setLoading(false)
            
            
        })
    /* eslint-disable react-hooks/exhaustive-deps */
    
    },[page])

    const handleScroll = async (e:React.UIEvent)=>{
        const {scrollTop, clientHeight, scrollHeight} = e.currentTarget

        if(scrollHeight - scrollTop === clientHeight)
            setPage(page + 1)
    }

    return(
        <>
        
        <Container>
            
            <Info>
                <div className="container" >
                    <h1>Avalia<strong>.Me</strong></h1>
                    <User><Link to={"/profile"} ><FiUser size={20} ></FiUser></Link></User>
                    
                </div>

            </Info>
            <Search>
                <Form ref={formRef} onSubmit={HandleSearch} >
                    <SearchInput  placeholder="nome de um negócio"  name="query" >
                        
                    </SearchInput>
                </Form>
            </Search>

            <ListRooms
                onScroll={(e)=>{handleScroll(e)}}
            >

               {companies.map((company)=>(
                   <article className="News" key={company.id + new Date() + Math.random()}>
                       <Link to={`/view_company/${company.id}`} >
                            <div>
                                <article>
                                   <div >
                                        <strong>{company.name}</strong>
                                        
                                        <p>{company.city}</p><span>Pontuação {company.averageScore}</span>
                                        
                                    </div> 
                                   
                                </article>
                                <div className="containerImg">
                                    <img src={company.img_url} alt={company.name}/>
                                </div>
                                
                            </div>
                       </Link>
                   </article>
               ))}
               
            </ListRooms>
            
            
        
        </Container>
        
        {loading && <Loading></Loading>}
        </>
    )
}
export default Dashboard