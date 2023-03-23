import {
  Category,
  ConfirmationNumber,
  Person,
  Store,
} from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import StatBox from "./chart/StatBox";
import BreakdownChart from "./chart/BreakdownChart";
import { useContext } from "react";
import { StoreContext } from "store";
import ChartProfit from "./chart/ChartProfit";
import BarChart from "./chart/BarChart";
import { useEffect } from "react";
import { getTotal } from "api";
import { useState } from "react";

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [state] = useContext(StoreContext);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await getTotal({ token: state.accessToken });
      setTotal(data);
    }
    fetchApi();
  }, [state.accessToken]);

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
          icon={<Person sx={{ color: "#10654E", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Stores"
          value={total.totalOffice}
          icon={<Store sx={{ color: "#10654E", fontSize: "26px" }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={"#fff"}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" color="#10654E">
            Number of products by category
          </Typography>
          <BarChart />
        </Box>
        <StatBox
          title="Total Products"
          value={total.totalProduct}
          icon={<Category sx={{ color: "#10654E", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Cupons"
          value={total.totalCoupon}
          icon={
            <ConfirmationNumber sx={{ color: "#10654E", fontSize: "26px" }} />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          backgroundColor={"#fff"}
          p="1rem"
          borderRadius="0.55rem"
          display="flex"
          justifyContent="flex-end"
        >
          <ChartProfit />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor="#fff"
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" color="#10654E">
            Revenue Stores
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem">
            Chart shows sales information of all stores in the year.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
