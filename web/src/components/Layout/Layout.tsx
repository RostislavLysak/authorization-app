import { Box } from "@mui/joy";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Header from "./Header";

interface LayoutProps extends React.PropsWithChildren {
  loading?: boolean;
}

const Layout = ({ loading, children }: LayoutProps) => {
  if (loading) {
    return <Loader />;
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
          paddingBottom: "66px",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
