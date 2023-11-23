import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "@/components/CustomSnackbar";
import InputControl from "@/components/InputControl";
import Loader from "@/components/Loader";
import { useChangeFullname } from "@/hooks/useChangeFullname";
import useForm from "@/hooks/useForm";
import { useMe } from "@/hooks/useMe";
import AddCircleIcon from "@/plugins/ui/icons/AddCircleIcon";
import { useCreateImage } from "@/hooks/useCreateImage";
import { useDeleteImage } from "@/hooks/useDeleteImage";
import { getReadableFileSizeString, readAsDataURL } from "@/utils";

type TMenuItem = {
  label: string;
  action: () => void;
};

const Profile = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { me, isLoading } = useMe();
  const { firstName, lastName, image }: any = me?.data;
  const fullName = `${firstName} ${lastName}`;

  const { values, register } = useForm({
    firstName,
    lastName,
  });

  const { createImage } = useCreateImage();
  const { deleteImage } = useDeleteImage();
  const { changeFullname, isSuccess, error, isError } = useChangeFullname();

  const onBlur = () => {
    if (firstName !== values.firstName || lastName !== values.lastName) {
      const timeout = setTimeout(() => {
        changeFullname({
          firstName: values.firstName,
          lastName: values.lastName,
        });
        return () => clearTimeout(timeout);
      }, 100);
    }
  };

  const menu: TMenuItem[] = [
    {
      label: "Upload a photo",
      action: () => ref.current?.click(),
    },
    {
      label: "Remove a photo",
      action: deleteImage,
    },
  ];

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const file = files?.[0];

    if (file) {
      console.log(getReadableFileSizeString(file.size));
      const base64 = await readAsDataURL(file);

      await createImage({ image: base64 });

      e.target.value = "";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isSuccess && (
        <CustomSnackbar open color="success">
          {t("snackbar.changesSaved")}
        </CustomSnackbar>
      )}
      {isError && (
        <CustomSnackbar open color="danger">
          {(error as any)?.response?.data.message}
        </CustomSnackbar>
      )}
      <Stack component="main" spacing={2} useFlexGap>
        <Card
          variant="outlined"
          sx={{
            border: "none",
          }}
        >
          <Box display="flex" alignItems="center">
            <Box position="relative">
              {image ? (
                <AspectRatio
                  ratio={1}
                  minHeight={48}
                  variant="outlined"
                  sx={{
                    minWidth: 48,
                    mr: 3,
                    borderRadius: "50%",
                  }}
                >
                  <img src={image} alt="profile" />
                </AspectRatio>
              ) : (
                <Avatar
                  size="lg"
                  variant="outlined"
                  sx={{
                    mr: 3,
                    "--Icon-color": "text.icon",
                  }}
                />
              )}

              <Dropdown>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <MenuButton
                    size="sm"
                    sx={{
                      position: "absolute",
                      right: 15,
                      top: 25,
                      border: "none",
                      borderRadius: "50%",
                      padding: 0,
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <AddCircleIcon />
                  </MenuButton>
                </Stack>
                <Menu sx={{ alignItems: "center" }}>
                  {menu.map((item) => (
                    <MenuItem
                      key={item.label}
                      sx={{
                        margin: 0,
                      }}
                      onClick={() => {
                        console.log(item.label);
                        item.action();
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
                <input
                  ref={ref}
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleChangeFile}
                />
              </Dropdown>
            </Box>
            <Typography level="title-lg">{fullName}</Typography>
          </Box>
          <CardContent
            orientation="horizontal"
            sx={{
              justifyContent: "center",
              mt: 2,
              pb: 6,
            }}
          >
            <Stack rowGap={4}>
              <InputControl
                onBlur={onBlur}
                label={t("auth.register.label.firstName")}
                placeholder={t("auth.register.placeholder.firstName")}
                {...register("firstName")}
                sx={{ width: "300px" }}
              />
              <InputControl
                onBlur={onBlur}
                label={t("auth.register.label.lastName")}
                placeholder={t("auth.register.placeholder.lastName")}
                {...register("lastName")}
                sx={{ width: "300px" }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default Profile;
