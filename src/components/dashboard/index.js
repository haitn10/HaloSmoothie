import {
  Category,
  ConfirmationNumber,
  Person,
  Store,
} from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import StatBox from "./chart/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "./chart/BreakdownChart";
import { useContext } from "react";
import { StoreContext } from "store";
import ChartProfit from "./chart/ChartProfit";
import { useEffect } from "react";
import { getTotal } from "api";
import { useState } from "react";

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [state, dispatch] = useContext(StoreContext);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await getTotal({ token: state.accessToken });
      setTotal(data);
    }
    fetchApi();
  }, [state.accessToken]);

  console.log(total);
  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Users"
          value={total.totalUser}
          icon={<Person sx={{ color: "#4e6c50", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Stores"
          value={total.totalOffice}
          icon={<Store sx={{ color: "#4e6c50", fontSize: "26px" }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={"#fff"}
          p="1rem"
          borderRadius="0.55rem"
        ></Box>
        <StatBox
          title="Total Products"
          value={total.totalProduct}
          icon={<Category sx={{ color: "#4e6c50", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Cupons"
          value={total.totalCoupon}
          icon={
            <ConfirmationNumber sx={{ color: "#4e6c50", fontSize: "26px" }} />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={"#fff"}
          p="1rem"
          borderRadius="0.55rem"
        >
          <ChartProfit />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={"#333"}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={"#333"}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={"#333"}>
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
