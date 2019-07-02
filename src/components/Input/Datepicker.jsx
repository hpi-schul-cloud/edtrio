import React from "react"
import DP from "react-datepicker"

import "./datepicker.css"

const Datepicker = ({ showTimeSelect, ...props }) => {
    return (
        <DP
            dateFormat="dd/MM/yyyy HH:mm"
            timeFormat="HH:mm"
            placeholderText="DD/MM/JJJJ"
            timeIntervals={30}
            showTimeSelect
            {...props}
        />
    )
}

export default Datepicker
