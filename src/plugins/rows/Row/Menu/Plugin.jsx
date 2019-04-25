import React from "react"
import styled from "styled-components"

const StyledPlugin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px;
    width: 175px;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    transition: 250ms all ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const DefaultIcon = styled.img`
    height: 50px;
`

const Title = styled.h3`
    margin-top: 15px;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
`

const Description = styled.p`
    margin: 0;
    text-align: center;
    font-size: 16px;
`

const Plugin = ({ plugin, pluginName, onClick }) => {
    return (
        <StyledPlugin onClick={onClick}>
            {plugin.icon ? (
                <plugin.icon style={{ height: 50 }} />
            ) : (
                <DefaultIcon src={require("../../assets/default-plugin.svg")} />
            )}
            <Title>{plugin.title || pluginName}</Title>
            {plugin.description && (
                <Description>{plugin.description}</Description>
            )}
        </StyledPlugin>
    )
}

export default Plugin
