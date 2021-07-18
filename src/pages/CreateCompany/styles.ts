import styled from "styled-components"

export const Container = styled.div`
    max-width:780px;
    margin:0 auto;
    height:90vh;
    scroll-behavior:smooth;
    overflow-y:auto;
    padding: 10px 2% 30px 2%;
`
export const Text = styled.div`
    margin: 0 auto;
    width:100%;
    margin: 10px 0 -10px 0;
    h1{ 
        color:#323232;
        padding: 0 2%;
        margin-top:10px;
        font-size:24px;
    }
`
export const Info = styled.div`
    background-color:#323232;
    width:100%;
    padding: 20px 2%;
    margin:0 auto;
    display:flex;
    align-items:center;
    color:white;
    > span{
        
        svg{
            color:white;
        }
    }
    h1{ 
        padding-left:10px;
        
        font-size:24px;
        >strong{
            color:#04D361
        }
    }
    p{
        margin-top:10px;
        font-size:16px;
        padding-left:32px;
        >strong{
            color:#04D361
        }
    }
`
export const Search = styled.div`
    
    max-width:100%;
    margin: 30px auto;
    display:flex;
    padding-bottom:300px;
    h1{
        margin-top:5px;
        font-size:22px;

        >strong{
            color:#04D361
        }
    }
    form{
        padding: 0 2%;
        width:100%;

        width:100%;
        > div{
            width:100%;
            height:100%;
        }
    }
`

