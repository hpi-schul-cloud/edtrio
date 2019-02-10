import React from "react"

import Action from "~/components/Action"
import Container from "~/components/Container"
import Text from "~/components/Text"
import Heading from "~/components/Heading"

const Dashboard = () => {
    return (
        <Container>
            <Heading primary>Dashboard</Heading>
            <Text>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Donec sed odio dui. Fusce
                dapibus, tellus ac cursus commodo, tortor mauris condimentum
                nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper
                nulla non metus auctor fringilla. Maecenas sed diam eget risus
                varius blandit sit amet non magna. Maecenas sed diam eget risus
                varius blandit sit amet non magna. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam.
            </Text>
            <Action to="/lesson/1234" block>
                Go to sample Lesson 1234
            </Action>
            <Action to="/lesson/5678" block>
                Go to sample Lesson 5678
            </Action>
            <Action to="/apollo/5678" block>
                Go to Apollo Playground
            </Action>
        </Container>
    )
}

export default Dashboard
