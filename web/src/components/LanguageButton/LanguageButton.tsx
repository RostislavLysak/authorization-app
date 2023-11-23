import { Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import i18n, { LOCALES } from "@/plugins/i18n";
import UkraineIcon from "../../plugins/ui/icons/flags/UkraineIcon";
import USAIcon from "../../plugins/ui/icons/flags/USAIcon";
import ArrowDropDownIcon from "../../plugins/ui/icons/ArrowDropDownIcon";

const LanguageButton = () => {
  const menu = [
    {
      label: "English",
      value: LOCALES.en,
      icon: <USAIcon />,
    },
    {
      label: "Українська",
      value: LOCALES.uk,
      icon: <UkraineIcon />,
    },
  ];

  const selected = menu.find((item) => item.value === i18n.language);

  const handleChange = (v: any) => {
    i18n.changeLanguage(v);
    localStorage.setItem("lang", v);
  };

  return (
    <Dropdown>
      <MenuButton
        size="sm"
        variant="plain"
        endDecorator={<ArrowDropDownIcon />}
        slots={{
          root: IconButton,
        }}
        slotProps={{
          root: {
            sx: {
              pl: 1.5,
            },
          },
        }}
      >
        {selected?.icon}
      </MenuButton>
      <Menu
        size="sm"
        sx={{
          zIndex: "calc(var(--joy-zIndex-modal) + 1)",
        }}
      >
        {menu.map((item) => (
          <MenuItem
            key={item.value}
            selected={selected?.label === item.label}
            onClick={() => handleChange(item.value)}
            sx={{
              padding: 1,
            }}
          >
            {item.icon}
            <Typography marginLeft={1}>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default LanguageButton;
