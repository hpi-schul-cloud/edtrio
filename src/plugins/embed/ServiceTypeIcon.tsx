import React, { Component } from "react";

import { faVimeo, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IServiceTypeIconProps {
  type: string;
}

class ServiceTypeIcon extends Component<IServiceTypeIconProps> {
  public render() {
    const { type } = this.props;

    let icon;
    let color;
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

    return <FontAwesomeIcon icon={icon} style={{ color }} size="lg" />;
  }
}

export default ServiceTypeIcon;
