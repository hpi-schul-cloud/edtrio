import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faVimeo } from "@fortawesome/free-brands-svg-icons";

class ServiceTypeIcon extends Component {
  render() {
    const { type } = this.props;

    let icon, color;
    switch (type) {
      case "youtube":
        icon = faYoutube;
        color = "#ff0000";
        break;
      case "vimeo":
        icon = faVimeo;
        color = "#00acf2";
        break;
      default:
        icon = faExternalLinkSquareAlt;
    }

    return <FontAwesomeIcon icon={icon} style={{ color: color }} size="lg" />;
  }
}

export default ServiceTypeIcon;
