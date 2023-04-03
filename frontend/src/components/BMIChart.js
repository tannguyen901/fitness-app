import React from "react";

const healthyRange = [18.5, 24.9];

const BMIChart = ({ bmi }) => {
  const minScale = Math.min(healthyRange[0] - 10, bmi - 10);
  const maxScale = Math.max(healthyRange[1] + 10, bmi + 10);
  const userPositionPercentage = ((bmi - minScale) / (maxScale - minScale)) * 100;
  const healthyRangePercentage = [
    ((healthyRange[0] - minScale) / (maxScale - minScale)) * 100,
    ((healthyRange[1] - minScale) / (maxScale - minScale)) * 100,
  ];

  return (
    <div>
      <h3>BMI Chart</h3>
      <div
        style={{
          width: "100%",
          height: "40px",
          backgroundColor: "#f3f3f3",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${healthyRangePercentage[0]}%`,
            top: "0",
            height: "100%",
            width: `${healthyRangePercentage[1] - healthyRangePercentage[0]}%`,
            backgroundColor: "#28a745",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: `${userPositionPercentage}%`,
            top: "0",
            height: "100%",
            width: "2px",
            backgroundColor: "red",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
        }}
      >
        <div>{minScale.toFixed(1)}</div>
        <div>{healthyRange[0]}</div>
        <div>{healthyRange[1]}</div>
        <div>{maxScale.toFixed(1)}</div>
      </div>
    </div>
  );
};

export default BMIChart;
