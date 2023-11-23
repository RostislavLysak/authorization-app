import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import {
  styled,
  Badge,
  MenuItem,
  MenuButton,
  Menu,
  Dropdown,
  Avatar,
  Stack,
  ListItem,
  Grid,
  AspectRatio,
} from "@mui/joy";

import { useLogout } from "@/hooks/useLogout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import linking from "@/routes/linking";
import ButtonTheme from "@/components/ButtonTheme";
import BurgerMenu from "@/components/BurgerMenu";
import LanguageButton from "@/components/LanguageButton";
import UniversalLink from "../UniversalLink";
import { useMe } from "@/hooks/useMe";

type LinkMenuItem = {
  label: string;
  href: string;
};

type TMenuItem = {
  label: string;
  action?: () => void;
};

interface IHeaderProps {
  links: LinkMenuItem[];
  menu: TMenuItem[];
  image?: string;
}

const StyledBadge = styled(Badge)(({ theme }: any) => ({
  "& .MuiBadge-badge": {
    position: "absolute",
    top: "15px",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const DesktopHeader = ({ links, menu, image }: IHeaderProps) => {
  const burgetRef = useRef<any>();

  return (
    <>
      <BurgerMenu ref={burgetRef}>
        <Grid component="ul">
          {links.map((navLink, index) => (
            <ListItem
              key={index}
              sx={{
                mx: 1,
                my: 1,
              }}
            >
              <UniversalLink
                href={navLink.href}
                onClick={() => burgetRef.current.close()}
                textColor="text.primary"
              >
                {navLink.label}
              </UniversalLink>
            </ListItem>
          ))}
        </Grid>
      </BurgerMenu>

      <Stack flexDirection="row" gap={4} alignItems="center">
        <LanguageButton />
        <Dropdown>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <MenuButton
              size="sm"
              sx={{
                border: "none",
                borderRadius: "50%",
                padding: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {image ? (
                <AspectRatio
                  ratio={1}
                  minHeight={40}
                  variant="outlined"
                  sx={{
                    minWidth: 40,
                    borderRadius: "50%",
                  }}
                >
                  <img src={image} alt="profile" />
                </AspectRatio>
              ) : (
                <Avatar
                  variant="outlined"
                  sx={{
                    "--Icon-color": "text.icon",
                    "&:hover": {
                      backgroundColor: "neutral.plainHoverBg",
                    },
                    "&:active": {
                      backgroundColor: "neutral.plainActiveBg",
                    },
                  }}
                />
              )}
              <StyledBadge variant="plain" />
            </MenuButton>
          </Stack>
          <Menu>
            {menu.map((item) => (
              <MenuItem key={item.label} onClick={item.action}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        <ButtonTheme />
      </Stack>
    </>
  );
};

const MobileHeader = ({ links, menu, image }: IHeaderProps) => {
  const burgetRef = useRef<any>();

  return (
    <>
      <BurgerMenu
        ref={burgetRef}
        contentSx={{
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid component="ul">
          {links.map((navLink, index) => (
            <ListItem
              key={index}
              sx={{
                mx: 1,
                my: 1,
              }}
            >
              <UniversalLink
                href={navLink.href}
                onClick={() => burgetRef.current.close()}
                textColor="text.primary"
              >
                {navLink.label}
              </UniversalLink>
            </ListItem>
          ))}
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <LanguageButton />
          <ButtonTheme />
        </Grid>
      </BurgerMenu>

      <Dropdown>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <MenuButton
            size="sm"
            sx={{
              border: "none",
              borderRadius: "50%",
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {image ? (
              <AspectRatio
                ratio={1}
                minHeight={40}
                variant="outlined"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                }}
              >
                <img src={image} alt="profile" />
              </AspectRatio>
            ) : (
              <Avatar
                variant="outlined"
                sx={{
                  "--Icon-color": "text.icon",
                  "&:hover": {
                    backgroundColor: "neutral.plainHoverBg",
                  },
                  "&:active": {
                    backgroundColor: "neutral.plainActiveBg",
                  },
                }}
              />
            )}
            <StyledBadge variant="plain" />
          </MenuButton>
        </Stack>
        <Menu>
          {menu.map((item) => (
            <MenuItem key={item.label} onClick={item.action}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { t } = useTranslation();

  const { me } = useMe();
  const { image }: any = me?.data ?? {};

  const menu: TMenuItem[] = [
    {
      label: t("common.sidebar.menu.settings"),
      action: () => {
        navigate(linking.profile.index);
      },
    },
    {
      label: t("common.sidebar.menu.logout"),
      action: () => {
        logout();
      },
    },
  ];

  const navLinks: LinkMenuItem[] = [
    {
      label: t(`common.menu.auth.1`),
      href: linking.dashboard.root,
    },
    {
      label: t(`common.menu.auth.2`),
      href: linking.explore.index,
    },
    {
      label: t(`common.menu.auth.3`),
      href: linking.marketPlace.index,
    },
  ];

  const isPageWide = useMediaQuery("(min-width: 900px)");

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      mx={4}
      maxWidth={2000}
      component="header"
    >
      {isPageWide ? (
        <DesktopHeader links={navLinks} menu={menu} image={image} />
      ) : (
        <MobileHeader links={navLinks} menu={menu} image={image} />
      )}
    </Grid>
  );
};

export default Header;
