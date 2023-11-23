import { useState } from "react";
import { IconButton, Sheet, Typography, useColorScheme } from "@mui/joy";

const Alert = ({ error }: any) => {
  const theme = useColorScheme();
  const [isClose, setIsClose] = useState<boolean>(true);

  if (!isClose) return null;

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 300,
        mx: "auto",
        mb: 3,
        py: 2,
        px: 4,
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
        backgroundColor: theme.mode === "dark" ? "#25171C" : "transparent",
        borderColor: theme.mode === "dark" ? "#792E2E" : "neutral.300",
      }}
      variant="outlined"
    >
      <Typography
        sx={{
          color: theme.mode === "dark" ? "neutral.200" : "danger.500",
        }}
      >
        {error?.response?.data.message}
      </Typography>
      <IconButton
        variant="plain"
        color="danger"
        size="sm"
        onClick={() => setIsClose(false)}
        sx={{ "--IconButton-size": "20px" }}
      >
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          ></path>
        </svg>
      </IconButton>
    </Sheet>
  );
};

export default Alert;
