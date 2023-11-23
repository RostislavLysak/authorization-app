import { Stack } from "@mui/joy";

import { useVerify } from "@/hooks/useVerify";
import CustomSnackbar from "@/components/CustomSnackbar";

import VerifyForm from "./VerifyForm";

const Verify = ({ length = 4 }: { length: number }) => {
  const { verify, error, isError }: any = useVerify();

  return (
    <Stack>
      {isError && (
        <CustomSnackbar open={true} color="danger">
          {error?.response?.data.message}
        </CustomSnackbar>
      )}

      <VerifyForm length={length} onSubmit={verify} />
    </Stack>
  );
};

export default Verify;
