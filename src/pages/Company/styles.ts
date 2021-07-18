import styled from "styled-components"
import { shade } from 'polished'

export const Container = styled.div`
    
    scroll-behavior:smooth;
    overflow-y:auto;
    padding: 0px 2%;
`
export const Text = styled.div`
    margin: 0 auto;
    padding: 0 2%;

    h1{ 
        color:#323232;
        margin-top:20px;
        font-size:30px;
    }
`
export const Info = styled.header`
    background-color:#323232;
    width:100%;
    padding: 20px 2%;
    .container{
        
        align-items:center;
        color:white;
        width:90%;
        margin:0 auto;
        a{
            text-decoration:none;
            color:white;
            > span{
                svg{
                    color:white;
                }
            }
            h1{
                text-align:left;
                display:inline-block;
                
                font-size:26px;
                >strong{
                    
                    color:#04D361
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
export const Article = styled.article`
    width:100%;
    height:100%;
    max-height:80vh;
    overflow-y:auto;
    max-width:780px;
    margin:15px auto;
    main{
        padding-bottom:30px;
        h1{ 
            color:#323232;
            
            font-size:40px;
            width:100%;
            
        }
        h3{ 
            color:#323232;
            margin:10px 0 20px 0;
            font-size:24px;
            width:100%;
        }
        h2{ 
            color:#323232;
            margin:30px 0 0 0;
            font-size:26px;
        }
        strong{
            text-align:left;
            font-style:italic;
            font-size:19px;
        }
        p{
            margin-top:15px;  
            text-align:justify;
            font-size:19px;
            max-width:100%;
            white-space: pre-wrap;
        }
        .source{
            max-width:100%;
           

            p{font-size:22px;}
            a{
                width:100%;
                text-decoration:none;
                span{width:100%;}
            }
        }
        span{
            margin-top:5px;
            font-size:18px;
            color:#04D361;
            font-style:italic;
        }
        .img{
            max-width:100%;
            height:100%;
            
            img{
                width:100%;
                height:500px;
                object-fit:cover;
            }
        }
    }

    div.qrBox
    {
        margin:10px auto;
        width:100%;
        padding:30px 0 100px 0;
        
        
        display:flex;
        justify-content:center;
        align-items:center;
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

export const ListRooms = styled.main`
    width:100%;
    height:50%;
    max-height:30vh;
    margin:0 auto 20px auto;
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
        div{
        background:#fff;
        border-radius:5px;
        display:flex;
        padding:4px;
        text-decoration:none;
        width:100%;
        
        div{
            
            width:100%;
            display:flex;
        
            div.grid-container {
                width:100%;
                display:flex;
                div.item2 { 
                    width:10%;
                    height:auto;
                    img{

                        max-height:50px;
                        max-width:50px;
                        
                        object-fit:contain;
                        border-radius:20px;
                        
                    }
                }

                div.right{
                    
                    display:flex;
                    flex-wrap:wrap;
                    flex:1;

                    div.item3 { 
                        width:50%;
                        text-align:left;
                    }
                    div.item4 { 
                        
                        width:50%;
                    }
                    div.item5 { width:100%;  }
                    
                    }
                
                }   

                @media screen and (max-width:600px){
                    div.grid-container{

                        div.item2 { 
                            width:20%;
                        }

                        
                    } 

                
                }
     
            } 
            
            
            
        }

        

    }
    
    
    
    padding: 0 0 40px 0;
`