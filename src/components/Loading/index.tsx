import React from "react"
import {SyncLoader} from "react-spinners"
import {Loader,Spinner} from "./styles"

const Loading:React.FC = ()=>{
    return(
        <>
        <Loader>
        </Loader>
        <Spinner><SyncLoader size={25} color="#09ac52" ></SyncLoader></Spinner>
        </>
    )
} 
export default Loading