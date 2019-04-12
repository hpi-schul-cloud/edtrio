import React from "react"
import styled from "styled-components"

const StyledDropzone = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 200px;
    width: 100%;
    background-color: rgba(245, 245, 245, 1);
    border: 3px dashed rgba(0, 0, 0, 0.4);
    transition: 250ms all ease-in-out;
    cursor: pointer;
    padding: 0 calc((100vw - 960px) / 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
        border-color: rgba(177, 4, 56, 1);
        background-color: rgba(250, 250, 250, 1);
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
            <p style={{ opacity: 0.8 }}>
                Du kannst überall Dateien per Drag'n'Drop hinzufügen. Alternativ
                kannst du auch hier klicken...
            </p>
        </StyledDropzone>
    )
}

export default Dropzone
