import { ColorCount } from "./types";

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

export const getMostFrequentColor = (imageData: ImageData) => {
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

export const printCanvas = (canvas: HTMLCanvasElement) => {
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
