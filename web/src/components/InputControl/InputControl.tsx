import { FormControl, FormLabel, Input, Typography, type InputProps } from "@mui/joy";

interface InputControlProps extends InputProps {
  label: string;
  helperText?: string;
  type?: "email" | "text";
}

const InputControl = ({
  label,
  placeholder,
  helperText,
  type = "text",
  ...props
}: InputControlProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type={type} placeholder={placeholder} {...props} />
      {helperText ? (
        <Typography color="danger" fontSize={12} mt={0.5} ml={0.2}>
          {helperText}
        </Typography>
      ) : null}
    </FormControl>
  );
};

export default InputControl;
