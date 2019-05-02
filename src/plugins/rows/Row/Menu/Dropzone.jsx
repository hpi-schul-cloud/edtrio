import React from "react"
import styled from "styled-components"

const StyledDropzone = styled.div`
    width: 100%;
    background-color: rgba(73, 73, 73, 1);
    border: 3px dashed rgba(0, 0, 0, 0.4);
    transition: 250ms all ease-in-out;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
        border-color: rgb(200, 200, 200);
        background-color: rgba(60, 60, 60, 1);
    }

    &:hover img {
        opacity: 1;
    }

    @media (max-width: 1000px) {
        padding: 10px 20px;
    }

    @media (min-width: 1000px) {
        width: 85%;
    }
`

const StyledImage = styled.img`
    height: 48px;
    margin-bottom: 15px;
    opacity: 0.8;
    transition: 250ms all ease-in-out;
`

const Caption = styled.p`
    margin-bottom: 0;
    opacity: 0.8;
    color: #fff;
    text-align: center;
    max-width: 600px;
    font-family: "PT Sans Narrow", sans-serif;
    font-weight: bold;
`

const Dropzone = () => {
    return (
        <StyledDropzone>
            <StyledImage src={require("../../assets/upload.svg")} />
            <Caption>
                Du kannst überall Dateien per Drag'n'Drop hinzufügen. Alternativ
                kannst du auch hier klicken...
            </Caption>
        </StyledDropzone>
    )
}

export default Dropzone
