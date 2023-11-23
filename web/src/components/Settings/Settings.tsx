import UniversalLink from "@/components/UniversalLink";
import ArrowIcon from "@/plugins/ui/icons/ArrowIcon";
import linking from "@/routes/linking";
import { Box, Button, IconButton, Sheet, Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type LinkMenuItem = {
  label: string;
  href: string;
};

const Settings = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: LinkMenuItem[] = [
    {
      label: t("common.settingMenu.profile"),
      href: linking.profile.index,
    },
    {
      label: t("common.settingMenu.access"),
      href: linking.security.index,
    },
  ];

  return (
    <Box
      display="flex"
      sx={{
        minHeight: 450,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          borderRight: "none",
          // minHeight: 450,
        }}
      >
        <Stack>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
            gap={2}
            sx={{
              borderBottom: 1,
              borderColor:
                "var(--variant-outlinedBorder, var(--joy-palette-neutral-outlinedBorder))",
            }}
          >
            <IconButton
              onClick={() => navigate(linking.dashboard.root)}
              size="sm"
              sx={{ borderRadius: "50%" }}
              variant="soft"
            >
              <ArrowIcon />
            </IconButton>
            <Typography textAlign="center" fontSize="md" fontWeight="bold">
              {t("common.sidebar.menu.settings")}
            </Typography>
          </Box>
          {navLinks.map((item) => (
            <Button
              fullWidth
              component={UniversalLink}
              href={item.href}
              key={item.label}
              // size="sm"
              // sx={{
              //   px: 1,
              //   fontWeight: "normal",
              //   fontSize: "md",
              // }}
              sx={{
                py: 2,
                px: 4,
                fontWeight: "normal",
                fontSize: "md",
                borderRadius: 0,
                backgroundColor:
                  location.pathname === item.href ? "neutral.plainActiveBg" : "transparent",
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "neutral.plainHoverBg",
                },
                "&:active": {
                  backgroundColor: "neutral.plainActiveBg",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 450,
          p: 4,
          borderRadius: "sm",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Outlet />
      </Sheet>
    </Box>
  );
};

export default Settings;
