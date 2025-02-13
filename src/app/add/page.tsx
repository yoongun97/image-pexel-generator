"use client";
import { getMostFrequentColor, printCanvas } from "@/utils/helpers";
import { ColorCount } from "@/utils/types";
import React, { useRef, useState } from "react";

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
          ctx.fillStyle = mostFrequentColor;
          ctx.fillRect(
            col * cellWidth,
            row * cellHeight,
            cellWidth,
            cellHeight
          );
          // ctx.fillText(
          //   mostFrequentColor,
          //   col * cellWidth + 5,
          //   row * cellHeight + 15
          // );

          // Update global color count
          newColorCounts[mostFrequentColor] =
            (newColorCounts[mostFrequentColor] || 0) + 1;
        }
      }

      setColorCounts(newColorCounts);
    };
  };

  const handlePrintBtn = () => {
    if (canvasRef.current) printCanvas(canvasRef.current);
  };

  return (
    <div className="w-full h-screen p-10">
      <h1 className="w-full text-center text-2xl font-semibold">
        Image Split and Color Analysis
      </h1>
      <div className="flex justify-between mt-5 p-2">
        <input
          type="file"
          className="bg-transparent border-white border cursor-pointer"
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="flex items-center gap-x-5">
          <label className="flex gap-x-2">
            Columns:
            <input
              className="bg-transparent border-2 rounded border-white px-1"
              type="number"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              min="1"
            />
          </label>
          <label className="flex gap-x-2">
            Rows:
            <input
              className="bg-transparent border-2 rounded border-white px-1"
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value))}
              min="1"
            />
          </label>
          <button
            className="border border-white rounded p-1"
            onClick={handleProcessImage}
          >
            Process Image
          </button>
        </div>
        <button
          className="border border-white rounded p-1"
          onClick={handlePrintBtn}
        >
          인쇄하기
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
