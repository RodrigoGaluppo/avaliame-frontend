import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    height:92vh;
    scroll-behavior:smooth;
    overflow-y:auto;
    padding: 0px 2%;
`
export const Search = styled.div`
    max-width:600px;
    width:100%;
    
    margin: 30px auto;
    h1{
        margin-top:5px;
        font-size:22px;
        >strong{
            color:#04D361
        }
    }
    form{
        margin-top:15px;
        width:100%;
        
        > div{
            width:100%;
            height:100%;
        }
    }
`
export const Text = styled.div`
    width:100%;
    margin: 0 auto;
    
    max-width:600px;
    p{
        color:#323232;
        padding-left:1%;
        margin-top:10px;
        font-size:18px;
        font-style:italic;
    }
    h1{ 
        
        color:#323232;
        margin-top:15px;
        font-size:26px;
    }
`
export const Info = styled.header`
    background-color:#323232;
    width:100%;
    
    .container{
        position:relative;
        
        padding: 20px 2%;
        color:white;
        width:90%;
        margin:0 auto;
        > a{
            text-decoration:none;
            color:white;
            h1{
                text-align:left;
                display:inline-block;
                margin-top:5px;
                font-size:26px;
                >strong{
                    color:#04D361;
                }
            }
            p{
                margin-top:10px;
                font-size:16px;
                >strong{
                    color:#04D361;
                }
            }
        }
    }
    
`
export const ProfilePic = styled.div`
    margin-top:20px;
    width:100%;
    padding:20px 0;
    
    display:flex;

    justify-content:center;
    align-items:center;
    img{
        width:100%;
        max-width:250px;
        height:300px;
        object-fit:cover;
    }

`

export const User = styled.div`
    display:inline-block;
    background-color:${shade(0.3,"#323232")};
    justify-content:center;
    
    width:50px;
    height:50px;
    cursor: pointer;
    border-radius:calc(50px/2);
    color:#04D361;
    position:absolute;
    right:0;
    top:50%;
    transform:translate(0,-50%);
    text-align:center;
    svg{
        position:relative;
        top:50%;
        transform:translateY(-50%)
    }
    &:active{
        border:0;
        background-color:${shade(0.5,"#323232")};
    }
    a{  
        outline:0;
        border:0;
        text-decoration:none;
        color:#04D361;
    }

`

export const AddRoom = styled.div`
    width:65px;
    height:65px;
    cursor: pointer;
    border-radius:calc(65px/2);
    background-color:#04D361;
    position:absolute;
    bottom:15px;
    right:10px;
    color:black;
    text-align:center;
    span{
        line-height:65px;
        font-size:45px;
    }
    &:active{
        background-color:${shade(0.3,"#04D361")};
    }
    a{
        text-decoration:none;
        color:black;
    }
`