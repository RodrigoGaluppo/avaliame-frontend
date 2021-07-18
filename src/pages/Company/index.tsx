import React, { useEffect, useRef, useState } from "react"
import {Container,Article,ListRooms,AddRoom} from "./styles"
import {Info} from "../Profile/styles"
import {Link,useRouteMatch} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import QRCode from "qrcode.react"
import "react-day-picker/lib/style.css"
import {useToast} from "../../hooks/ToastContext"

import api from "../../services/apiClient"
import Loading from "../../components/Loading"

interface IParams{
    company_id:string | undefined
}

interface IUser{
    user_id:string
    name:string
    img_url:string
}

interface IReview{
    id:string
    user_review:IUser
    company_to_review:string
    score:number
    comment:string
}

interface ICompany{
    id:string
    name:string
    city:string
    description:string
    img_url:string
    averageScore:number
    site_url:string
    reviews:IReview[]
}

const Company:React.FC = ()=>{
    const {user,signOut} = useAuth()
    const {addToast} = useToast()
    const [loading,setLoading] = useState<boolean>(false)
    const [company,setCompany] = useState<ICompany>({} as ICompany)
    const { params } = useRouteMatch<IParams>()

    const QrCodeRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

        setLoading(true)

        api.get(`company/${params.company_id}`)
        .then((res)=>{
            setCompany(res.data)

            setLoading(false) 
        })
        .catch((e)=>{

            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            setLoading(false)
            setCompany({} as ICompany)
            addToast({type:"error","title":"could not connect to the server"})
            
        })
    /* eslint-disable react-hooks/exhaustive-deps */
    },[])

    const downloadQR = () => {
        
        if(QrCodeRef.current)
        {
            const pngUrl = QrCodeRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = `link-${company.name}.png`
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        
      };
      
      
    return(
        <>
        <Info>
            <div className="container" >
                <Link to="/" ><h1>Avalia<strong>.Me</strong></h1></Link>  
            </div>
        </Info>
    
        <Container>
            <Article>
            <main>
                <h1> {company.name} </h1><h3>Avaliação: { !company.averageScore ? "0" : company.averageScore }</h3>
                
                <div className="img">
                    <img src={company.img_url} alt={company.name} />
                </div>
                <p>{company.description}</p>

                {!!true && 
                    <div className="source">
                        <p>Contactos</p>
                        <a href={company.site_url}><span>{"clique aqui para ver o site"}</span></a>
                    </div>
                }
                <h2> Reviews </h2>
            </main>
            
            <ListRooms>
                
                {
                !!company.reviews && company.reviews.map(review=>(
                    <article onClick={()=>{
                        if(review.user_review.user_id === user.id)
                        {
                            // eslint-disable-next-line no-restricted-globals
                            location.href = `update_review/${review.id}`
                        }

                    }} className="News" key={review.id}>
                    <div>
                        <div>
                            <div className="grid-container">
                                <div className="item2">
                                    <img src={review.user_review.img_url} alt={review.user_review.name}/>
                                </div>

                                <div className="right" >

                                    <div className="item3">
                                        {review.user_review.name}
                                    </div>  
                                    <div className="item4">
                                        Avaliação: {review.score}
                                    </div>
                                
                                    <div className="item5">{review.comment}</div>
                                    
                                </div>

                            </div>
                            
                        </div>
                    </div>
                    </article>
                ))
                }

                
                
            </ListRooms>

            <h2>QrCode</h2>
            <div className="qrBox">
                <QRCode id="123456"
                // eslint-disable-next-line no-restricted-globals
                value={location.href}
                size={300}
                level={"H"}
                includeMargin={false}
                color={"#323232"}
                onClick={()=>{downloadQR()}}
                 ></QRCode>
            </div>
        </Article>
        </Container>
        
        {!!user && <AddRoom><Link to={`/add_review/${params.company_id}`} ><span>+</span></Link></AddRoom>}
        
        {loading && <Loading></Loading>}
        </>
    )
}
export default Company
