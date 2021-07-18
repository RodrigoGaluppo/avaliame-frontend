import React,{createContext, useCallback,useState,useContext} from "react"
import api from "../services/apiClient"

interface Iuser{
    id:string
    username:string
    email:string
    img_url:string
}

interface IAuthContext{
    token:string
    user:Iuser
    signIn(credentials:Idata): Promise<void>
    signOut():void
    updateUser(Newuser:Iuser):void
}

interface Idata{
    email:string
    password:string
}

interface IAuthState{
    user:Iuser
    token:string
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider:React.FC = ({children})=>{


    const [data,setData] = useState<IAuthState>(()=>{
        const token = localStorage.getItem("@CovFree:token")
        const user = localStorage.getItem("@CovFree:user")
        
        if (token && user){
            return { token , user:JSON.parse(user)}
        }else{
            return {} as IAuthState
        }
    })

    const signIn = useCallback( async ({email,password}:Idata)=>{
        const res = await api.post("login",{
            email,password
        })
        
        const {token,user} = res.data
        
        const userObj:Iuser = {
            id:user.id,
            username:user.username,
            email:user.email,
            img_url:user.img_url
        }
        
        localStorage.setItem("@CovFree:token",token)
        localStorage.setItem("@CovFree:user",JSON.stringify(userObj))

        api.defaults.headers.authorization = `Bearer ${token}`
                                                                                                                                                     
        setData({token,user:userObj})
    },[])

    const signOut = useCallback(()=>{
        localStorage.removeItem("@CovFree:token")
        localStorage.removeItem("@CovFree:user")

        setData({} as IAuthState)
    },[])

    const updateUser = useCallback((Newuser:Iuser)=>{
        localStorage.setItem("@CovFree:token",data.token)
        localStorage.setItem("@CovFree:user",JSON.stringify(Newuser))
        setData({user:Newuser,token:data.token})

    },[data.token])



    return(
        <AuthContext.Provider value={{user:data.user,token:data.token,signIn,signOut,updateUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ():IAuthContext=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an auth provider")
    }else{
        return context
    }

}
