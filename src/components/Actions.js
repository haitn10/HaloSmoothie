import { Check, Save } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React, { useState } from "react";

const Actions = ({ params }) => {

    const [success, setSuccess] = useState(false);
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green,
            "&:hover": { bgcolor: grey },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green,
            "&:hover": { bgcolor: grey },
          }}
        >
          <Save />
        </Fab>
      )}
    </Box>
  );
};

export default Actions;
