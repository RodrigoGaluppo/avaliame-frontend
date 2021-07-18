import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`

    position:relative;
    span{
        background:${shade(0,"#C53030")};
        padding:8px;
        border-radius:4px;
        font-weight:500;
        opacity:0;

        transition: opacity 0.4s;
        visibility:hidden;
        position:absolute;
        bottom:calc(100% + 12px);
        width:160px;
        left:50%;
        transform:translateX(-80%);
        color:#000;
        &::before{
            content:"";
            border-style:solid;
            border-color:${shade(0,"#C53030")} transparent;
            border-width:6px 6px 0 6px;
            left:50%;
            top:100%;
            position:absolute;
            transform:translateX(380%);
            
        }
        
    }
    &:hover span{
        opacity:1;
        transition: opacity 0.4s;
        visibility:visible;
    }
`