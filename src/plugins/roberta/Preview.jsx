import React from "react"
import Flex from "~/components/Flex"

const robertaPlugin = {
    Component: () => {
        return (
            <Flex
                justifyCenter
                alignCenter
                style={{
                    minHeight: 400,
                    backgroundColor: "rgba(240, 240, 240)",
                }}>
                <img
                    src={require("./assets/logo.svg")}
                    style={{ height: 50 }}
                    alt=""
                />
            </Flex>
        )
    },
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "OpenRoberta",
    description: "Graphical Robot programming.",
}

export default robertaPlugin
