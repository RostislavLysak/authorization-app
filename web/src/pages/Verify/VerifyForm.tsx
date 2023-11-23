import { useState } from "react";
import OtpInput from "react-otp-input";
import { Input, Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

const VerifyForm = ({
  length = 4,
  onSubmit,
}: {
  length: number;
  onSubmit: ({ code }: { code: string }) => void;
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");

  return (
    <>
      <Stack spacing={1} mb={3} textAlign="center">
        <Typography level="h2" fontWeight="lg">
          {t("verify.confirmation")}
        </Typography>
        <Typography level="title-lg" textColor="text.icon" maxWidth="440px" noWrap>
          {t("verify.codeSent")}******
        </Typography>
      </Stack>
      <OtpInput
        value={otp}
        onChange={(code) => {
          setOtp(code.toUpperCase());

          if (code.length === length) {
            onSubmit({ code });
          }
        }}
        numInputs={length}
        renderSeparator={<span style={{ width: 16 }} />}
        renderInput={({ style, ref, ...props }) => (
          <Input
            slotProps={{
              root: {
                sx: {
                  height: 54,
                  width: 60,
                },
              },
              input: {
                ref,
                sx: {
                  textAlign: "center",
                },
              },
            }}
            {...props}
          />
        )}
      />
    </>
  );
};

export default VerifyForm;
