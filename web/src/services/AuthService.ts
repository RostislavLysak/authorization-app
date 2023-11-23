import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/response/AuthResponse";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
}

export interface ResetInput {
  code: string;
  newPassword: string;
}

interface ForgerInput extends Omit<LoginInput, "password"> {}

interface ChangeInput extends Omit<ResetInput, 'code'> {
  oldPassword: string;
}

interface VerifyInput {
  code: string;
}

export default class AuthService {
  static async login({ email, password }: LoginInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration({
    email,
    password,
    firstName,
    lastName,
  }: RegisterInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password, firstName, lastName });
  }

  static async logout({refreshToken}: {refreshToken: string}): Promise<void> {
    return $api.post("/logout", {refreshToken});
  }

  static async forgetPassword({ email }: ForgerInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/forget-password", { email });
  }

  static async resetPassword({ newPassword, code }: ResetInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/reset-password", { newPassword, code });
  }

  static async resetPasswordStatus({ code }: VerifyInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/reset-password-status", { code });
  }

  static async changePassword({
    oldPassword,
    newPassword,
  }: ChangeInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/change-password", { oldPassword, newPassword });
  }

  static async changeEmail({
    email,
  }: Omit<LoginInput, "password">): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/change-email", { email });
  }

  static async verify({ code }: VerifyInput): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/account/verify", { code });
  }

  static async changeFullname({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/change-fullname", { firstName, lastName });
  }

  static async deleteAccount(): Promise<AxiosResponse<AuthResponse>> {
    return $api.delete<AuthResponse>("/delete-account");
  }

  static async createImage({ image }: { image: string }): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/create-image", { image });
  }
  static async deleteImage(): Promise<AxiosResponse<AuthResponse>> {
    return $api.delete<AuthResponse>("/delete-image");
  }

  static async me(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>("/me");
  }
}
