import { useMutation } from "@tanstack/react-query";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, string>({
    // mutationFn takes the email as argument
    mutationFn: async (email: string) => {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ForgotPasswordResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
  });
};
