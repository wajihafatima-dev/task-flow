"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/app/components/ui-components/Input";

interface ResetValues {
  password: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: async (values: ResetValues) => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: values.password,
        }),
      });

      return res.json();
    },
    onSuccess: () => {
      toast.success("Password reset successful 🔐");
      router.push("/login");
    },
    onError: () => {
      toast.error("Invalid or expired link");
    },
  });

  if (!token) {
    return <p className="text-center mt-20">Invalid reset link</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-2">Reset Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password
        </p>

        <Formik<ResetValues>
          initialValues={{ password: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(6, "Minimum 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className="space-y-4">
              <Input
                name="password"
                type="password"
                placeholder="New password"
                value={values.password}
                onChange={handleChange}
                className={
                  touched.password && errors.password
                    ? "border-red-500"
                    : ""
                }
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {mutation.isPending ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
