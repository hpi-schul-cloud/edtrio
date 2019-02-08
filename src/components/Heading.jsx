import React, { useContext } from "react"
import styled, { css } from "styled-components"

import { ThemeContext } from "~/Contexts/Theme"

const baseStyle = css`
    margin-bottom: ${props => props.noMargin && "0"};
    color: ${props => {
        if (props.primary) return props.theme.colors.red
        return props.theme.colors.text
    }};
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
    margin-bottom: 25px;
    ${baseStyle};

    @media (max-width: 480px) {
        font-size: 40px;
    }
`

const HeadingTwo = styled.h2`
    font-size: 32px;
    margin-bottom: 20px;
    ${baseStyle};
`

const HeadingThree = styled.h3`
    font-size: 28px;
    margin-bottom: 15px;
    ${baseStyle};
`

const HeadingFour = styled.h4`
    font-size: 24px;
    margin-bottom: 10px;
    ${baseStyle};
`

const HeadingFive = styled.h5`
    font-size: 20px;
    margin-bottom: 5px;
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
    const { theme } = useContext(ThemeContext)
    if (h2) return <HeadingTwo theme={theme} {...props} />
    if (h3) return <HeadingThree theme={theme} {...props} />
    if (h4) return <HeadingFour theme={theme} {...props} />
    if (h5) return <HeadingFive theme={theme} {...props} />
    return <HeadingOne theme={theme} {...props} />
}

export default Heading
