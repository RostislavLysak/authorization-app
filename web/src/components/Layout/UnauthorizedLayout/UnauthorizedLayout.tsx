import { Box, IconButton } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import linking from "@/routes/linking";
import Footer from "../../../components/Footer";
import HomeIcon from "../../../plugins/ui/icons/HomeIcon";
import Header from "./Header";

interface UnauthorizedLayoutProps extends React.PropsWithChildren {}

const UnauthorizedLayout = ({ children }: UnauthorizedLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/verify") {
    return (
      <>
        <IconButton
          variant="outlined"
          onClick={() => navigate(linking.auth.login)}
          sx={{
            mt: 1.5,
            ml: 3,
          }}
        >
          <HomeIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100dvh - 66px)",
            paddingBottom: "52px",
          }}
        >
          {children}
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 66px)",
          paddingBottom: "52px",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default UnauthorizedLayout;
