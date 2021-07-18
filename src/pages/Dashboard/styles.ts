import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    width:100%;
    height:100%;
    margin:0 auto;
    max-height:100vh;
    
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
    
`
export const Search = styled.div`
    max-width:calc(900px + 2%);
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
        margin-top:10px;
        width:100%;
        padding: 0 2%;
        

        > div{
            width:100%;
            height:100%;
        }
    }
`
export const ListRooms = styled.main`
    width:100%;
    max-height:65vh;
    
    margin:0 auto;
    overflow-y:auto; 
    overflow-x:hidden;

    article{
        width:100%;
        margin:0 auto;
        max-width:900px;
        transition:0.5s;
        &:active{
            opacity:0.4;
        }
        &:hover{
            transform:translateX(10px)
        }
        & + article{
            margin-top:20px;
        }
        a{
        background:#fff;
        border-radius:5px;
        display:flex;
        padding:10px;
        text-decoration:none;
        width:100%;
        
        div{
            
            width:100%;
            display:flex;
            
            article{
                width:100%;
                display:flex;
                flex-wrap:nowrap;
                
                strong{
                    font-size:20px;
                    color:#3D3D4D;
                    width:100%;
                }
                p{  
                    
                    align-self: flex-end;
                    text-align:center;
                    font-size:16px;
                    color:#3D3D4D;
                    font-style:italic;
                    width:50%;
                    
                }
                span{  
                    
                    align-self: flex-end;
                    text-align:left;
                    font-style:italic;
                    text-align:center;
                    font-size:16px;
                    color:#3D3D4D;
                    width:50%;
                }
            }

            .containerImg{
                width:50%;
                img{
                    margin-left:auto;
                    object-fit:cover;
                    height:120px;
                    width:100px;
                    width:50%;
                }
            }

            @media screen and (max-width:600px){
                .containerImg{
                    height:100%;
                    width:50%;
                    align-items:center;
                    align-content:center;
                    
                }
                strong{
                    font-size:16px;
                    color:#3D3D4D;
                    width:80%;
                }
            } 

            }
        }
}
   

@media screen and (max-width:670px)
{
article{
    
    a{
    
    div{
        height:100%;
        width:100%;
        display:flex;
        flex-wrap:wrap;
        
        article{
            width:100%;
            display:flex;
            flex-wrap:wrap;
            strong{
                font-size:20px;
                color:#3D3D4D;
                width:100%;
            }
            p{
                margin-top:10px;
                text-align:left;
            }
            
            span{  
                margin-top:10px;
                align-self: flex-end;
                text-align:left;
                width:50%;
                
            }
        }

        .containerImg{
            margin-top:20px;
            background-color:red;
            min-height:100px;
            min-width:100%;
            height:100%;
            img{
                min-width:100%;
                object-fit:cover;
                
            }
        }

        @media screen and (max-width:600px){
            .containerImg{
                height:100%;

                align-items:center;
                align-content:center;
                img{
                    height:200px;
                    width:100%;
                }
            }

            strong{
                font-size:16px;
                color:#3D3D4D;
                width:80%;
            }
        }     
    }
}
        
}
}
    
    padding: 0 2% 40px 2%;
`

export const Article = styled.div`

    width:100%;


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

