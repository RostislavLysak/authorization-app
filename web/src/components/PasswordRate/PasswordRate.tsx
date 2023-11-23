import { Typography, LinearProgress } from "@mui/joy";
import { validateStrongPassword } from "../../plugins/validation";
import { useTranslation } from "react-i18next";

type PasswordRateProps = {
  password: string;
  minLength?: number;
};

const PasswordRate = ({ password, minLength = 12 }: PasswordRateProps) => {
  const { t } = useTranslation();

  if (!password) return <div style={{ marginTop: 26 }} />;

  const rules = {
    veryWeak: t("common.rules.validatePassword.veryWeak") ?? "",
    weak: t("common.rules.validatePassword.weak") ?? "",
    strong: t("common.rules.validatePassword.strong") ?? "",
    veryStrong: t("common.rules.validatePassword.veryStrong") ?? "",
  };

  return (
    <>
      <LinearProgress
        determinate
        size="sm"
        value={Math.min((password.length * 100) / minLength, 100)}
        sx={{
          mt: 0.5,
          bgcolor: "background.level3",
          color: "hsl(var(--hue) 80% 40%)",
        }}
      />
      <Typography level="body-xs" sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}>
        {validateStrongPassword({ password, rules })}
      </Typography>
    </>
  );
};

export default PasswordRate;
