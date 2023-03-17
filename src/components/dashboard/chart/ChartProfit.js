import { getDataChart } from "api";
import moment from "moment";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";
import { StoreContext } from "store";

function ChartProfit() {
  const [state] = useContext(StoreContext);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await getDataChart({ token: state.accessToken });
      setDataChart(data);
    }
    fetchApi();
  }, [state.accessToken]);

  const data = [[{ type: "date", label: "Day" }, "Total Price"]];
  const options = {
    chart: {
      title: "Sales in day of years",
      subtitle: "in Viet Nam Dong(VND)",
    },
  };
  dataChart.map((item) =>
    data.push([new Date(moment(item.dateCustome)), item.totalPrice])
  );
  return (
    <Chart
      chartType="Line"
      data={data}
      options={options}
      width="100%"
      height="100%"
      legendToggle
    />
  );
}

export default ChartProfit;
