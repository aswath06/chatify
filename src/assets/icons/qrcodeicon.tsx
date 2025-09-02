import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const QrcodeIcon = (props: SvgProps) => (
<Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#01F094"
      {...props}
    >
      <Path d="M520-120v-80h80v80h-80zm-80-80v-200h80v200h-80zm320-120v-160h80v160h-80zm-80-160v-80h80v80h-80zm-480 80v-80h80v80h-80zm-80-80v-80h80v80h-80zm360-280v-80h80v80h-80zM180-660h120v-120H180v120zm-60 60v-240h240v240H120zm60 420h120v-120H180v120zm-60 60v-240h240v240H120zm540-540h120v-120H660v120zm-60 60v-240h240v240H600zm80 480v-120h-80v-80h160v120h80v80H680zM520-400v-80h160v80H520zm-160 0v-80h-80v-80h240v80h-80v80h-80zm40-200v-160h80v80h80v80H400zm-190-90v-60h60v60h-60zm0 480v-60h60v60h-60zm480-480v-60h60v60h-60z" />
    </Svg>
);
