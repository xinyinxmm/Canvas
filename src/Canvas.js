import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

export function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "#ea2c62";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const StartDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const FinishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const Drawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <canvas
      id="canvas"
      style={{ backgroundColor: "pink" }}
      width={window.innerWidth * 2}
      height={window.innerHeight * 2}
      onMouseDown={StartDrawing}
      onMouseUp={FinishDrawing}
      onMouseMove={Drawing}
      ref={canvasRef}
    >
      canvas
    </canvas>
  );
}
