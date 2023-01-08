import * as React from "react";
import QrCode from "qrcode";
import clsx from "clsx";

import { useRef } from "react";
import { QrcodeComponentProps } from "./Qrcode.types";

export const QrCodeComponent = ({
  className,
  content,
  width,
  height,
}: QrcodeComponentProps) => {
  let canvasRef = useRef<HTMLCanvasElement | null>();

  React.useEffect(() => {
    const color = {
      dark: "000000",
      light: "ffffff",
    };
    QrCode.toCanvas(
      canvasRef.current,
      content,
      { width, color },
      () => {}
    );
  }, [canvasRef, content]);

  return (
    <div className={clsx("absolute rounded-2xl overflow-hidden", className)}>
      <canvas ref={(ref) => (canvasRef.current = ref)}></canvas>
    </div>
  );
};
