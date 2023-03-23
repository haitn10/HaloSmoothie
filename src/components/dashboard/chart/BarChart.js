import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "store";
import { getDataByCategory } from "api";
import Chart from "react-google-charts";

function BarChart() {
  const [state] = useContext(StoreContext);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await getDataByCategory({ token: state.accessToken });
      setDataChart(data);
    }
    fetchApi();
  }, [state.accessToken]);

  const data = [
    [
      "Element",
      "Quantity",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
  ];

  dataChart.map((item) =>
    data.push([item.name, item.productQuantity, "#10654E",null])
  );
  const options = {
    width: "100%",
    height: 250,
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
  };
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default BarChart;
