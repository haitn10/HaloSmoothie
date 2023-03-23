import React from "react";
import { Box } from "@mui/material";
import Chart from "react-google-charts";
import { useContext } from "react";
import { StoreContext } from "store";
import { useState } from "react";
import { useEffect } from "react";
import { getDataByStore } from "api";

const BreakdownChart = ({ isDashboard = false }) => {
  const [state] = useContext(StoreContext);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await getDataByStore({ token: state.accessToken });
      setDataChart(data);
    }
    fetchApi();
  }, [state.accessToken]);

  const data = [
    ["Task", "Hours per Day"],
  ];
  dataChart.map((item) =>
    data.push([item.officeName, item.totalPrice])
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <Chart chartType="PieChart" data={data} width="100%" height="100%" />
    </Box>
  );
};

export default BreakdownChart;
