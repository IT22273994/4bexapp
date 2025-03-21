import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Grantchart.css";
import Navigation from "./Navigation";

export default function ResourceUtilization() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/utilization")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);  
        setData(data);  
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Navigation/>
    <div className="chart-container">
      <h2>  Resource Utilization Over Time</h2>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" label={{ value: "Resource Name", position: "insideBottom", dy: 10 }} />
            <YAxis label={{ value: "Days Used", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="daysUsed" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>  No data available</p>
      )}
    </div>
    </div>
  );
}
