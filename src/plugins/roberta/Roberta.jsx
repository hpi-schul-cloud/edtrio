import React, { useState, useEffect, useContext } from "react"
import { Icon, faLink } from '@edtr-io/editor-ui'

const openRobertaOrigin = "http://localhost:1999"


class Roberta extends React.Component {
    //For future use with a modified version of openRoberta and data storeage in the schulCloud Editor
    /*
    componentDidMount() {
        console.log("mounted")
        this.ifr.onload = () => {
            console.log("starting"); 
            var iframe = this.ifr
            this.ticker = window.setInterval(function(){
                console.log("making link request"); 
                iframe.contentWindow.postMessage('getLink', openRobertaOrigin);
            }, 5000)
        }
        window.addEventListener("message",this.handleFrameTasks)
    }

    

    handleFrameTasks(e){
        console.log(e)
            if(e.origin === openRobertaOrigin){
                if(e.data.dataType === "programLink"){
                    state.link.set(e.data.data)
                    console.log("saved: " + state.link.value)
                }
            }
    }

    componentWillUnmount() {
        console.log("unmounting")
        clearInterval(this.ticker)
        window.removeEventListener("message", this.handleFrameTasks);
    }
    */
    render() {
        let robertaFrame

        let { state } = this.props



        //only render if a valid source link for the openRoberta iFrae has been set
        if (state.link.value.startsWith("http://localhost") || state.link.value.startsWith("https://lab.open-roberta.org")) {

            //render the openRoberta iFrame
            robertaFrame = (
                <div>
                    <iframe
                        src={state.link.value}
                        key={state.random.value}
                        style={{
                            width: "100%",
                            height: "600px"
                        }}
                        ref={(f) => this.ifr = f}
                        data-identifier="iframe-0"
                    />
                </div>

            )


        } else {
            //Render placeholder if no link has been defined yet
            robertaFrame = (
                <React.Fragment>
                    <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
                    <ol >
                        <li>Programm auf <a href="https://lab.open-roberta.org" target="_blank" rel="noopener noreferrer">lab.open-roberta.org</a> erstellen.</li>
                        <li>Über <i>Bearbeiten/erstelle Programmlink...</i> einen Programmlink erzeugen</li>
                        <li>Programmlink kopieren und hier einfügen</li>
                    </ol>
                </React.Fragment>


                    )
                }
                return robertaFrame
            }
        }
        
export default Roberta