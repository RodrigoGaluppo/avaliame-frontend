import styled from "styled-components"

export const Loader = styled.div`
    position:absolute;
    top:0;
    right:0;
    width:100%;
    height:100%;
    opacity:0.6;
    background-color:#ccc;
    z-index:3;
`
export const Spinner = styled.div`
    position:absolute;
    z-index:4;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
`