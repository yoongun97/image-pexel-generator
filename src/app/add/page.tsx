"use client";
import { rgbToHex } from "@/utils/color";
import React, { useRef, useState } from "react";

interface ColorCount {
  [key: string]: number;
}

export default function Add() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<number>(4);
  const [rows, setRows] = useState<number>(4);
  const [colorCounts, setColorCounts] = useState<ColorCount>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleProcessImage = () => {
    if (!imageFile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(imageFile);

    image.onload = () => {
      if (!ctx) return;
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const cellWidth = canvas.width / columns;
      const cellHeight = canvas.height / rows;

      const newColorCounts: ColorCount = {};

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          // Draw grid
          ctx.strokeStyle = "black";
          ctx.strokeRect(
            col * cellWidth,
            row * cellHeight,
            cellWidth,
            cellHeight
          );

          // Get image data for the cell
          const imageData = ctx.getImageData(
            col * cellWidth,
            row * cellHeight,
            cellWidth,
            cellHeight
          );
          const mostFrequentColor = getMostFrequentColor(imageData);

          // Draw color code on the cell
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.fillRect(col * cellWidth, row * cellHeight, 80, 20);
          ctx.fillStyle = mostFrequentColor;
          ctx.fillText(
            mostFrequentColor,
            col * cellWidth + 5,
            row * cellHeight + 15
          );

          // Update global color count
          newColorCounts[mostFrequentColor] =
            (newColorCounts[mostFrequentColor] || 0) + 1;
        }
      }

      setColorCounts(newColorCounts);
    };
  };

  const getMostFrequentColor = (imageData: ImageData) => {
    const { data } = imageData;
    const colorMap: ColorCount = {};

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const color = rgbToHex(r, g, b);

      colorMap[color] = (colorMap[color] || 0) + 1;
    }

    return Object.keys(colorMap).reduce((a, b) =>
      colorMap[a] > colorMap[b] ? a : b
    );
  };

  const printCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Canvas</title>
          </head>
          <body onload="window.print(); window.close();">
            <img src="${dataUrl}" style="width: 100%;" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div>
      <h1>Image Split and Color Analysis</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={printCanvas} style={{ margin: "10px", padding: "10px" }}>
        인쇄하기
      </button>
      <div style={{ marginTop: "10px" }}>
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <button onClick={handleProcessImage} style={{ marginLeft: "10px" }}>
          Process Image
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", marginTop: "20px" }}
      ></canvas>
      <div style={{ marginTop: "20px" }}>
        <h3>Used Colors and Counts</h3>
        <ul>
          {Object.entries(colorCounts).map(([color, count]) => (
            <li key={color} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  background: color,
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                }}
              ></div>
              {color}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
