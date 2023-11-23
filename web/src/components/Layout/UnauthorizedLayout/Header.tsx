import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, ListItem, Stack } from "@mui/joy";

import ButtonTheme from "../../../components/ButtonTheme";
import BurgerMenu from "../../../components/BurgerMenu";
import UniversalLink from "../../../components/UniversalLink";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import linking from "@/routes/linking";

type LinkMenuItem = {
  label: string;
  href: string;
};

interface IBurgerProps {
  links: LinkMenuItem[];
  buttonText: {
    login: string;
    register: string;
  };
}

const DesktopHeader = ({ links, buttonText }: IBurgerProps) => {
  const burgetRef = useRef<any>();

  return (
    <>
      <BurgerMenu ref={burgetRef}>
        <Grid component="ul">
          {links.map(
            (navLink, index): React.ReactElement => (
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
            ),
          )}
        </Grid>
      </BurgerMenu>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Button
          component={UniversalLink}
          href={linking.auth.login}
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{
            px: 1,
            fontWeight: "normal",
            fontSize: "md",
          }}
        >
          {buttonText.login}
        </Button>
        <Button
          component={UniversalLink}
          href={linking.auth.register}
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{
            px: 1,
            fontWeight: "normal",
            fontSize: "md",
          }}
        >
          {buttonText.register}
        </Button>
        <ButtonTheme />
      </Stack>
    </>
  );
};

const MobileHeader = ({ links, buttonText }: IBurgerProps) => {
  const burgetRef = useRef<any>();

  return (
    <>
      <Button
        component={UniversalLink}
        href={linking.auth.register}
        variant="outlined"
        color="neutral"
        size="sm"
        sx={{
          px: 1,
          fontWeight: "normal",
          fontSize: "md",
        }}
      >
        {buttonText.register}
      </Button>

      <BurgerMenu
        ref={burgetRef}
        position="right"
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

        <Grid gap={2} display="flex" alignItems="center" justifyContent="space-between">
          <Box minWidth={32}></Box>
          <Button
            fullWidth
            component={UniversalLink}
            href={linking.auth.login}
            onClick={() => burgetRef.current.close()}
          >
            {buttonText.login}
          </Button>
          <ButtonTheme />
        </Grid>
      </BurgerMenu>
    </>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const navLinks: LinkMenuItem[] = [
    {
      label: t(`common.menu.unAuth.1`),
      href: linking.product.index,
    },
    {
      label: t(`common.menu.unAuth.2`),
      href: linking.openSource.index,
    },
    {
      label: t(`common.menu.unAuth.3`),
      href: linking.pricing.index,
    },
  ];

  const buttonText = {
    login: t("auth.login.button.submit"),
    register: t("auth.register.button.submit"),
  };

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
        <DesktopHeader links={navLinks} buttonText={buttonText} />
      ) : (
        <MobileHeader links={navLinks} buttonText={buttonText} />
      )}
    </Grid>
  );
};

export default Header;
