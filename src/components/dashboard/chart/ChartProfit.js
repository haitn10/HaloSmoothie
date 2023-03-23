import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getDataChart } from "api";
import moment from "moment";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";
import { StoreContext } from "store";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Box } from "@mui/material";

function ChartProfit() {
  const [state] = useContext(StoreContext);
  const [dataChart, setDataChart] = useState([]);
  const [value, setValue] = useState([
    moment("2023-01-01"),
    moment(new Date()),
  ]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (value[1] !== null && value[0] !== null) {
      setStartDate(value[0].format("YYYY-MM-DD"));
      setEndDate(value[1].format("YYYY-MM-DD"));
    }
    console.log(startDate, endDate);
    if (startDate !== "Invalid date" && endDate !== "Invalid date") {
      async function fetchApi() {
        const data = await getDataChart({
          startDate: startDate,
          endDate: endDate,
          token: state.accessToken,
        });
        if (data.statusCode === 200) {
          setDataChart(data.data);
        }
      }
      fetchApi();
    }
  }, [endDate, startDate, state.accessToken, value]);

  const data = [[{ type: "date", label: "" }, "Total Price"]];
  const options = {
    chart: {
      title: "Sales a day",
      subtitle: "in Viet Nam Dong(VND)",
    },
  };

  if (dataChart !== []) {
    dataChart.map((item) =>
      data.push([new Date(moment(item.dateCustome)), item.totalPrice])
    );
  }

  return (
    <>
      <Box sx={{ position: "absolute", zIndex: 1 }} width={350}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateRangePicker
            value={value}
            format="DD/MM/YYYY"
            minDate={moment("2023-01-01")}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <Chart
        chartType="Line"
        data={data}
        options={options}
        width="100%"
        height="100%"
        legendToggle
      />
    </>
  );
}

export default ChartProfit;
