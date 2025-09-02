import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface MoreIconProps extends SvgProps {
  color?: string; // optional color prop
}

export const MoreIcon: React.FC<MoreIconProps> = ({ color = "#1f1f1f", ...props }) => (
  <Svg
    height="30px"
    viewBox="0 -960 960 960"
    width="30px"
    fill={color} // use the color prop here
    {...props}
  >
    <Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640z" />
  </Svg>
);
