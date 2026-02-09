"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/app/components/ui-components/Input";
import { forgotPassword } from "../apiServices";
import { baseUrl, ForgotPasswordApi } from "../apiEndpoints";

interface ForgotValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const mutation = useMutation({
    mutationFn: (values: ForgotValues) =>
      forgotPassword(baseUrl, ForgotPasswordApi, values),
    onSuccess: () => toast.success("Reset link sent! Check your email."),
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl text-black font-semibold mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a reset link
        </p>

        <Formik<ForgotValues>
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
          })}
          onSubmit={(values, { setFieldValue, resetForm }) => {
            mutation.mutate(values, {
              onSuccess: () => {
                resetForm(); // clear the form after success
                setFieldValue("email", ""); // explicitly reset email if needed
              },
            });
          }}
        >
          {({ values, handleChange, touched, errors, setFieldValue }) => (
            <Form className="space-y-4">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
                className={touched.email && errors.email ? "border-red-500" : ""}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}

              <button
                type="submit"
                disabled={mutation.isLoading} // correct React Query state
                className="w-full bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 disabled:opacity-50"
              >
                {mutation.isLoading ? "Sending..." : "Reset"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
