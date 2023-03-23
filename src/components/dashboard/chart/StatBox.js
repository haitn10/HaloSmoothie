import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../common/FlexBetween";

const StatBox = ({ title, value, icon }) => {
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor="#fff"
      borderRadius="0.55rem"
    >
      <Typography variant="h6" sx={{ color: "#10654E" }}>
        {title}
      </Typography>

      <FlexBetween>
        <Typography
          marginX={2}
          variant="h2"
          fontWeight="600"
          sx={{ color: "#10654E" }}
        >
          {value}
        </Typography>
        {icon}
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
