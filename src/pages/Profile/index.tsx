import React, { useCallback,useRef, useState,useEffect} from "react"
import {Container,Info,Text,Search,ProfilePic,User,AddRoom} from "./styles"
import {Link} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import "react-day-picker/lib/style.css"
import {useToast} from "../../hooks/ToastContext"
import Input from '../../components/Input'
import {FiCamera, FiLogOut, FiMail, FiUser} from "react-icons/fi"
import {FaIdCard} from "react-icons/fa"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import { ListRooms } from '../Dashboard/styles'
import api from "../../services/apiClient"
import Button from '../../components/Button'
import Loading from "../../components/Loading"

interface ICompany{
    id:string
    name:string
    city:string
    description:string
    img_url:string
    averageScore:string
}

interface IUser{
    id:string
    email:string
    img_url:string
    username:string
}

const Config:React.FC = ()=>{
    const {addToast} = useToast()
    const {user,signOut,token,updateUser} = useAuth()
    const [companies,setCompanies] = useState<ICompany[]>([])
    const formRef = useRef<FormHandles>(null)
    const formUploadRef = useRef<FormHandles>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [file,setFile] = useState<File>()
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubmit = useCallback((data:IUser)=>{
     
        // eslint-disable-next-line eqeqeq
        if(user.id != data.id)
            return 

        // eslint-disable-next-line eqeqeq
        if(user.username == data.username && user.email == data.email)
            return
        

        api.put(`user`,{
            name:data.username,
            email:data.email
        },{headers:{authorization:`Bearer ${token}`}})

        .then((res)=>{
            addToast({type:"success",title:"success",description:"foto de perfil atualizada com sucesso"})
            updateUser(res.data.user)
            
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
      

    },[addToast, signOut, token, updateUser, user.email, user.id, user.username])

    useEffect(()=>{
        setIsLoading(true)
        api.get(`companies/`,{headers:{"authorization" : `Bearer ${token}`}})
        .then((res)=>{
            setCompanies(res.data.companies)
            setIsLoading(false)
        })
        .catch((e)=>{
            setIsLoading(false)
            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
                
            }
            addToast({type:"error",title:"não foi possivel se conectar ao servidor"})
        })
        /* eslint-disable react-hooks/exhaustive-deps */
    
    },[])

    const handelChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files)
        {
            setFile(e.target.files[0])
            if(imgRef.current)
                imgRef.current.src = URL.createObjectURL(e.target.files[0])
                
        }
    }

    const handleUpload = async ()=>{

        const formData = new FormData()

        if(file)
            formData.append("profile_img",file)
        
        api.post(`/user/upload`,formData,{
            headers:{
                "authorization" : `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        }
        )

        .then((res)=>{
            addToast({type:"success",title:"success",description:"foto de perfil atualizada com sucesso"})
            updateUser(res.data.user)
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
            <div className="container" >
                <Link to="/" ><h1>Avalia<strong>.Me</strong></h1></Link>
                <User><FiLogOut onClick={()=>{signOut()}} size={20} ></FiLogOut></User>   
            </div>
        </Info>
    
        <Container>
            <Search>
                    <Text><h1>Foto de Perfil</h1></Text>
                    <ProfilePic>
                        <img ref={imgRef}  src={user.img_url} alt="" />
                    </ProfilePic>
                    <Form ref={formUploadRef} onSubmit={handleUpload} >
                        <Input onChange={(e)=>{handelChangeFile(e)}} name="profile_img" type="file" accept=".png,.jpg,.jpeg" icon={FiCamera}  ></Input>
                        <Button>Atualizar</Button>
                    </Form>
                    
            </Search>
            <Search>
            <hr />
                <Text><h1>Meus Dados</h1></Text>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    
                    <Input readOnly name="id" defaultValue={user.id} icon={FaIdCard}  ></Input>
                    <Input name="username" placeholder="username" defaultValue={user.username} icon={FiUser}  ></Input>
                    <Input name="email" placeholder="email" defaultValue={user.email} icon={FiMail}  ></Input>
                        
                    <Button>Atualizar</Button>

                </Form>
            </Search>
           
            <Search>
                <Text>
                    <h1 style={{marginBottom:"30px"}} >Meus Negócios </h1>
                </Text>

                <ListRooms >
                
                {companies.map((company)=>(
                    <article className="News" key={company.id}>
                        <Link to={`/update_company/${company.id}`} >
                                <div>
                                    <article>
                                        <div>
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

            </Search>
            <AddRoom><Link to={`/add_company/`} ><span>+</span></Link></AddRoom>
        </Container>
        {isLoading && <Loading></Loading>}
        </>
    )
}
export default Config
