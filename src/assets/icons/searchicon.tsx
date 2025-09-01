import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Searchicon = (props: SvgProps) => (
 <Svg
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#1f1f1f"
      {...props}
    >
      <Path d="M784-120L532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56zM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400z" />
    </Svg>
);
