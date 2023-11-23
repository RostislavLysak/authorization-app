import { FormControl, FormLabel, type InputProps } from "@mui/joy";
import PasswordInput from "../PasswordInput";
import PasswordRate from "../PasswordRate";

interface PasswordControlProps extends Omit<InputProps, "value"> {
  label: React.ReactNode;
  value: string;
  withRate?: boolean;
}

const PasswordControl = ({ label, placeholder, withRate, ...props }: PasswordControlProps) => {
  if (!withRate) {
    return (
      <FormControl>
        <FormLabel
          sx={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {label}
        </FormLabel>

        <PasswordInput placeholder={placeholder} {...props} />
      </FormControl>
    );
  }

  return (
    <FormControl
      sx={{
        "--hue": Math.min(props.value.length * 10, 120),
      }}
    >
      <FormLabel
        sx={{
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {label}
      </FormLabel>

      <PasswordInput placeholder={placeholder} {...props} />
      <PasswordRate password={props.value} />
    </FormControl>
  );
};

export default PasswordControl;
