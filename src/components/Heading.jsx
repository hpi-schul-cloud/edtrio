import React, { useContext } from "react"
import styled, { css } from "styled-components"

import { ThemeContext, theme as defaultTheme } from "~/Contexts/Theme"

const baseStyle = css`
    margin-top: 0;
    color: ${props => {
        if (props.primary) return props.theme.colors.red
        return props.theme.colors.text
    }};
    font-family: "Poppins", sans-serif;
    font-weight: bold;

    text-align: ${props => {
        if (props.center) return "center"
        if (props.right) return "right"
        return "left"
    }};

    max-width: 100%;
`

const HeadingOne = styled.h1`
    font-size: 40px;
    margin-bottom: ${props => (props.noMargin ? 0 : 25)}px;
    ${baseStyle};

    @media (max-width: 480px) {
        font-size: 40px;
    }
`

const HeadingTwo = styled.h2`
    font-size: 32px;
    margin-bottom: ${props => (props.noMargin ? 0 : 20)}px;
    ${baseStyle};
`

const HeadingThree = styled.h3`
    font-size: 28px;
    margin-bottom: ${props => (props.noMargin ? 0 : 15)}px;
    ${baseStyle};
`

const HeadingFour = styled.h4`
    font-size: 24px;
    margin-bottom: ${props => (props.noMargin ? 0 : 10)}px;
    ${baseStyle};
`

const HeadingFive = styled.h5`
    font-size: 20px;
    margin-bottom: ${props => (props.noMargin ? 0 : 5)}px;
    ${baseStyle};
`

/**
 * props: {
 *     h1,
 *     h2,
 *     h3,
 *     h4,
 *     h5,
 *     noMargin,
 *     primary: Displays a red heading
 * }
 */

const Heading = ({ h2, h3, h4, h5, ...props }) => {
    const context = useContext(ThemeContext)
    const theme = context && context.theme ? context.theme : defaultTheme

    if (h2) return <HeadingTwo theme={theme} {...props} />
    if (h3) return <HeadingThree theme={theme} {...props} />
    if (h4) return <HeadingFour theme={theme} {...props} />
    if (h5) return <HeadingFive theme={theme} {...props} />
    return <HeadingOne theme={theme} {...props} />
}

export default Heading
