import { Stack, Sheet, Grid, Typography, Box, useTheme } from "@mui/joy";
import UniversalLink from "../UniversalLink";
import LogoDevIcon from "../../plugins/ui/icons/LogoDevIcon";
import { useTranslation } from "react-i18next";
import { arrayRange } from "../../utils";

type MenuItem = {
  label: string;
  href: string;
};

const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const menu: MenuItem[] = arrayRange(8).map((index) => ({
    label: t(`common.footer.links.${index + 1}.label`),
    href: t(`common.footer.links.${index + 1}.href`),
  }));

  const renderLink = (i: MenuItem) => {
    return (
      <UniversalLink key={i.label} href={i.href} textColor="text.icon" underline="hover">
        {i.label}
      </UniversalLink>
    );
  };

  return (
    <>
      <Sheet variant={theme.palette.mode === "dark" ? "plain" : "outlined"} component="footer">
        <Grid
          container
          gap={0}
          columnSpacing={{ xs: 0, sm: 2, md: 2, lg: 2 }}
          rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
          maxWidth={1200}
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            margin: "auto",
            py: 4,
            px: 2,
          }}
        >
          <Grid
            xs={12}
            sm={6}
            md={3}
            order={{
              xs: 4,
              sm: 0,
              md: 0,
              lg: 0,
            }}
          >
            <Stack
              spacing={2}
              alignItems={{
                xs: "center",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
              textAlign={{
                xs: "center",
                sm: "initial",
                md: "initial",
                lg: "initial",
              }}
              mt={{
                xs: 2,
                sm: 0,
                md: 0,
                lg: 0,
              }}
            >
              <Box lineHeight={0}>
                <LogoDevIcon />
              </Box>
              <Box fontSize="sm">
                <Typography
                  component="div"
                  color="neutral"
                  fontSize={{
                    xs: "xs",
                    sm: "sm",
                    md: "sm",
                    lg: "sm",
                  }}
                >
                  Copyright © {new Date().getFullYear()}
                </Typography>
                <Typography
                  component="div"
                  color="neutral"
                  fontSize={{
                    xs: "xs",
                    sm: "sm",
                    md: "sm",
                    lg: "sm",
                  }}
                >
                  DotSatoshi
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack
              spacing={1}
              alignItems={{
                xs: "center",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
            >
              {menu.slice(0, 3).map(renderLink)}
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack
              spacing={1}
              alignItems={{
                xs: "center",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
            >
              {menu.slice(3, 6).map(renderLink)}
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack
              spacing={1}
              alignItems={{
                xs: "center",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
            >
              {menu.slice(6).map(renderLink)}
            </Stack>
          </Grid>
        </Grid>
      </Sheet>
    </>
  );
};

export default Footer;
