import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Righticon = (props: SvgProps) => (
<Svg
      height="35px"
      viewBox="0 -960 960 960"
      width="35px"
      fill="#01F094"
      {...props}
    >
      <Path d="M504-480L320-664l56-56 240 240-240 240-56-56 184-184z" />
    </Svg>
);
