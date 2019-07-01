import React, { useState, useEffect, useContext } from "react"


function Roberta(props) {
    let robertaFrame

    let { state } = props

    //only render if a valid source link for the openRoberta iFrae has been set
    if (
        state.link.value.startsWith("https://lab.open-roberta.org")
    ) {
        //render the openRoberta iFrame
        robertaFrame = (
            <div>
                <iframe
                    src={state.link.value}
                    key={state.random.value}
                    sandbox="allow-scripts allow-forms allow-same-origin"
                    style={{
                        width: "100%",
                        height: "600px",
                    }}
                    data-identifier="iframe-0"
                />
            </div>
        )
    } else {
        //Render placeholder if no link has been defined yet
        robertaFrame = (
            <React.Fragment>
                <img
                    src={require("./assets/logo.svg")}
                    style={{ height: 50 }}
                    alt=""
                />
                <ol>
                    <li>
                        Programm auf{" "}
                        <a
                            href="https://lab.open-roberta.org"
                            target="_blank"
                            rel="noopener noreferrer">
                            lab.open-roberta.org
                        </a>{" "}
                        erstellen.
                    </li>
                    <li>
                        Über <i>Bearbeiten/erstelle Programmlink...</i> einen
                        Programmlink erzeugen
                    </li>
                    <li>Programmlink kopieren und hier einfügen</li>
                </ol>
            </React.Fragment>
        )
    }
    return robertaFrame
}

export default Roberta
