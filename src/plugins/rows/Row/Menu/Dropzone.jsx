import React from "react"
import styled from "styled-components"

const StyledDropzone = styled.div`
    height: 200px;
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

    &:hover {
        border-color: rgb(200, 200, 200);
        background-color: rgba(60, 60, 60, 1);
    }

    &:hover img {
        opacity: 1;
    }

    @media (max-width: 1000px) {
        padding: 0 20px;
    }
`

const StyledImage = styled.img`
    height: 75px;
    margin-bottom: 15px;
    opacity: 0.6;
    transition: 250ms all ease-in-out;
`

const Dropzone = () => {
    return (
        <StyledDropzone>
            <StyledImage src={require("../../assets/upload.svg")} />
            <p
                style={{
                    opacity: 0.8,
                    color: "#fff",
                    textAlign: "center",
                    maxWidth: 600,
                }}>
                Du kannst überall Dateien per Drag'n'Drop hinzufügen. Alternativ
                kannst du auch hier klicken...
            </p>
        </StyledDropzone>
    )
}

export default Dropzone
