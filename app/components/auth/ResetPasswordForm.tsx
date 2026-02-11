"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/app/components/ui-components/Input";
import { resetPassword } from "../../utils/apiServices";
import { baseUrl, ResetPasswordApi } from "../../apiEndpoints";

interface ResetValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: (values: ResetValues) =>
      resetPassword(baseUrl, ResetPasswordApi, { token, password: values.password }),
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push("/login"); // redirect to login after success
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="flex-1 px-4 sm:px-8 py-0 md:px-16 md:py-10 flex flex-col justify-center">
      <h1 className="text-xl text-black font-semibold mb-2">Reset Password</h1>
      <p className="text-sm text-gray-500 mb-6">
        Enter your new password below
      </p>

      <Formik<ResetValues>
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              resetForm();
              setFieldValue("password", "");
              setFieldValue("confirmPassword", "");
            },
          });
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form className="flex flex-col gap-2 sm:gap-2">
            <Input
              name="password"
              type="password"
              placeholder="New Password"
              value={values.password}
              onChange={handleChange}
              className={touched.password && errors.password ? "border-red-500" : ""}
            />
            {touched.password && errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              className={touched.confirmPassword && errors.confirmPassword ? "border-red-500" : ""}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}

            <button
              type="submit"
              disabled={mutation.isLoading || !token}
              className="w-full bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 disabled:opacity-50"
            >
              {mutation.isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}