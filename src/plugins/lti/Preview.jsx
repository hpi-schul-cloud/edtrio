import React from "react"
import Flex from "~/components/Flex"

const ltiPlugin = {
    Component: () => {
        return (
            <Flex
                justifyCenter
                alignCenter
                style={{
                    minHeight: 800,
                    backgroundColor: "rgba(240, 240, 240)",
                }}>
                <h1>LTI Tools</h1>
            </Flex>
        )
    },
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "LTI",
    description: "Learning Tools Interoperability.",
}

export default ltiPlugin
