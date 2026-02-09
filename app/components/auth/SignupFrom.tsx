"use client";

import { User, Mail, Lock } from "lucide-react";
import { Input } from "../ui-components/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerUser } from "@/app/apiServices";
import { baseUrl, signupApi } from "@/app/apiEndpoints";

/* ---------------- Types ---------------- */
interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}


/* ---------------- Validation ---------------- */
const SignupSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

/* ---------------- Component ---------------- */
export default function SignupForm() {
  const router = useRouter();

 const signupMutation = useMutation<
  SignupResponse,
  Error,
  SignupFormValues
>({
  mutationFn: (values) =>
    registerUser(baseUrl, signupApi, values),

  onSuccess: () => {
    toast.success("Signup successful");
    router.push("/login");
  },
});


  return (
    <div className="flex-1 px-8 py-6 md:px-16 md:py-10 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Create your account
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Start organizing your work with TaskFlow.
      </p>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => signupMutation.mutate(values)}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          isValid,
        }) => (
          <Form className="flex flex-col gap-2">
            <Input
              startIcon={<User className="w-4 h-4 text-gray-400 mr-2" />}
              name="name"
              type="text"
              placeholder="Full name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? "border-red-500" : ""}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}

            <Input
              startIcon={<Mail className="w-4 h-4 text-gray-400 mr-2" />}
              name="email"
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "border-red-500" : ""}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

            <Input
              startIcon={<Lock className="w-4 h-4 text-gray-400 mr-2" />}
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && errors.password ? "border-red-500" : ""
              }
            />
            {touched.password && errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || signupMutation.isPending}
              className={`w-full bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition ${
                (!isValid || signupMutation.isPending) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {signupMutation.isPending
                ? "Creating account..."
                : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-xs text-gray-400 text-center mt-6">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
