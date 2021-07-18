import styled from "styled-components"
import {shade} from "polished"
export const Container = styled.button`

    height:60px;
    margin-top:15px;
    background:#04D361;
    border-radius:10px;
    border:0;
    padding:16px;
    width:100%;
    transition: background-color 0.1s;
    &:hover{
        background:${shade(0.2,"#04D361")}
    }
    &:active{
        background:${shade(0.2,"#04D361")}
    }


`