import styled from "styled-components"
import {shade} from "polished"
import logoImg2 from "../../assets/logo_transparent2.svg"
import Building from "../../assets/building.jpg"


export const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:stretch;
    width:100%;
    background:url(${logoImg2}) no-repeat;
    background-size:cover;
    background-position:top;
`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    place-content:center;
    width:100%;
    max-width:900px;
    form{
        padding: 0 4%;
        margin:10vh auto;
        width:100%;
        max-width:400px;
        text-align:center;

        h1{
            margin:15px 0;
        }
        > a{
            color:#111;
            display:block;
            margin-top:10px;
            text-decoration:none;
            transition: color 0.1s;
            &:hover{
                color:${shade(0.2,"#04D361")}
            }
            &:active{
                color:${shade(0.2,"#04D361")}
            }
        }
    }

    > a{
        
        color:${shade(0.2,"#04D361")};
        display:block;
        margin: 0 auto;
        text-decoration:none;
        display:flex;
        align-items:center;
        transition: color 0.1s;
         &:hover{
            color:${shade(0.4,"#04D361")}
        }
        &:active{
            color:${shade(0.4,"#04D361")}
        }
        
    }
    
`
export const Background = styled.div`
    flex:1;
    background:url(${Building}) no-repeat;
    background-size:cover;
    background-position:top;
`