import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        outline:0;
    }
    body{
        overflow:hidden;
        background:#E5E5E5;
        color:#000;
        -webkit-font-smoothing:antialiased;
    }
    body,input,button,textarea{
        font-family: 'Roboto Slab', serif;
        font-size:16px;
    }
    button{
        cursor: pointer;
    }
`