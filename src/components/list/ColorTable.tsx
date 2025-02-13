import { ColorCount } from "@/utils/types";

export default function ColorTable({
  colorCounts,
}: {
  colorCounts: ColorCount;
}) {
  return (
    <table style={{ borderCollapse: "collapse", width: "300px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>색상</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>미리보기</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>카운트</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(colorCounts).map(([color, count]) => (
          <tr key={color}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {color}
            </td>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: color,
                  width: "20px",
                  height: "20px",
                  margin: "0 auto",
                }}
              />
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {count}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
