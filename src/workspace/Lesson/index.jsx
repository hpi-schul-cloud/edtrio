import React from "react"
import { withRouter } from "react-router"
import Action from "~/components/Action"
import Container from "~/components/Container"
import Text from "~/components/Text"

const Lesson = props => {
    return (
        <Container>
            <h1>
                This is could be a page for lesson {props.match.params.lessonId}
            </h1>
            <Text>
                Curabitur blandit tempus porttitor. Etiam porta sem malesuada
                magna mollis euismod. Etiam porta sem malesuada magna mollis
                euismod. Aenean lacinia bibendum nulla sed consectetur.
            </Text>
            <Action to="/">Go back to Dashboard</Action>
        </Container>
    )
}

export default withRouter(Lesson)
