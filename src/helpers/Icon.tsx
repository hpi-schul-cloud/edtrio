import React from "react";

const Icon = ({ className, children, ...rest }: any) => (
  <i
    style={{
      verticalAlign: "middle",
      paddingBottom: "3px",
    }}
    className={`material-icons ${className}`}
    {...rest}
  >
    {children}
  </i>
);

export default Icon;
