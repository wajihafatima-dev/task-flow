export interface ApiError {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordPayload {
  token: string | null;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
import Cookies from "js-cookie";
import { 
  LoginRequest, RegisterRequest, UserResponse, ApiError,
  ForgotPasswordPayload, ForgotPasswordResponse,
  ResetPasswordPayload, ResetPasswordResponse
} from "./types";
import { toast } from "sonner";

// ---------------- GET API ----------------
export const getApi = <T>(baseUrl: string, endpoint: string) => async (): Promise<T | ApiError> => {
  try {
    const token = Cookies.get("token"); // get token from cookie
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${baseUrl}${endpoint}`, { headers });
    const data = await response.json();
    if (!response.ok) return { message: data.message || "Failed to fetch data" };
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) return { message: error.message };
    return { message: "Unknown error occurred" };
  }
};

// ---------------- DELETE API ----------------
export const deleteApi = async (baseUrl: string, endpoint: string, id: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("Unknown error occurred while deleting");
  }
};

// ---------------- LOGIN USER ----------------
export const loginUser = async (baseUrl: string, endpoint: string, data: LoginRequest) => {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.message || "Login failed");

  return {
    token: json.token,
    user: {
      id: json.user.id,
      name: json.user.name,
      email: json.user.email,
    },
  };
};

// ---------------- REGISTER USER ----------------
export const registerUser = async (
  baseUrl: string,
  endpoint: string,
  userData: RegisterRequest
): Promise<UserResponse> => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = (await response.json()) as UserResponse | ApiError;

    if (!response.ok) throw new Error("message" in data ? data.message : "Failed to register");

    return data as UserResponse;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("Unknown error occurred during registration");
  }
};

// ---------------- LOGOUT USER ----------------
export const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");       
      Cookies.remove("refreshToken"); 
      Cookies.remove("session");     
      toast.success("Logged out successfully");
      window.location.href = "/login"; 
    } else {
      toast.error(data.message || "Logout failed");
    }
  } catch (error: unknown) {
    if (error instanceof Error) toast.error(error.message);
    else toast.error("Unknown error occurred during logout");
  }
};

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (
  baseUrl: string,
  endpoint: string,
  values: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data = (await res.json()) as ForgotPasswordResponse;

  if (!res.ok) throw new Error(data.message || "Failed to send reset email");

  return data;
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (
  baseUrl: string,
  endpoint: string,
  values: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  if (!values.token) throw new Error("Invalid or missing token");

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data = (await res.json()) as ResetPasswordResponse;

  if (!res.ok) throw new Error(data.message || "Failed to reset password");

  return data;
};
