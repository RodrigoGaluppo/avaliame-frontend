import React from "react"
import {useAuth} from "../hooks/AuthContext"
import {RouteProps as RProps,Route as ReactDomRoute,Redirect} from "react-router-dom"

interface RouteProps extends RProps{
    isPrivate ?: boolean
    component:React.ComponentType
}

const Route:React.FC<RouteProps> = ({isPrivate = false,component:Component,...rest})=>{
    const {user} = useAuth()

    return(
        <ReactDomRoute 
        {...rest} 
        render={({location})=>{

            if(!isPrivate)
                return (<Component></Component>)
            else
            {
                if(!!user)
                {
                    return <Component></Component>
                }
                else
                {
                    return (
                        <Redirect 
                            to={{
                                pathname: "signin",
                                state:{from:location}
                            }}>   
                        </Redirect>
                    )
                }
            }
             
        }}>
            
        </ReactDomRoute>
    )
}

export default Route