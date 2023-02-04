import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";

export default function NavigatorBar() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar color="inherit">
      <Toolbar variant="regular">
        <Typography>HEALTHY SHOP</Typography>
        {isMobile ? (
          <></>
        ) : (
          <>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
              indicatorColor="secondary"
            >
              <Tab label="List Order" />
              <Tab label="History" />
              <Tab label="Products Of Shop" />
            </Tabs>
            <Button
              style={{ marginLeft: "auto" }}
              color="secondary"
              variant="contained"
            >
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
