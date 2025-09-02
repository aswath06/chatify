import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Chaticon = (props: SvgProps) => (
<Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#10C17D"
      {...props}
    >
      <Path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80zm126-240h594v-480H160v525l46-45zm-46 0v-480 480z" />
    </Svg>
);
