"use client";
import Cookies from "js-cookie";
import { Mail, Lock } from "lucide-react";
import { Input } from "../ui-components/Input"; // your custom Input
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/apiServices"; // your API fn
import { baseUrl, loginApi } from "@/app/apiEndpoints";
import { toast } from "sonner";

// ---------------------
// Types
// ---------------------
interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// ---------------------
// Validation Schema
// ---------------------
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// ---------------------
// Component
// ---------------------
const LoginForm: React.FC = () => {
  const router = useRouter();

  // -----------------
  // Mutation
  // -----------------
  const loginMutation = useMutation<LoginResponse, Error, LoginFormValues>({
    mutationFn: (values) => loginUser(baseUrl, loginApi, values),
    onSuccess: (res) => {
      // Save token & user
      Cookies.set("token", res.token, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (err: Error) => {
      toast.error("Invalid credentials");
    },
  });

  return (
    <div className="flex-1 px-4 sm:px-8 py-6 md:px-16 md:py-10 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Welcome back to TaskFlow
      </h1>
      <p className="text-sm text-gray-500 mb-6 sm:mb-8">
        Organize tasks, track progress, and collaborate efficiently.
      </p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => loginMutation.mutate(values)}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => {
          const isFormValid = values.email && values.password;
          return (
            <Form className="flex flex-col gap-2 sm:gap-2">
              <Input
                startIcon={
                  <Mail className="w-4 h-4 sm:w-4 sm:h-4 text-gray-400 mr-2 flex-shrink-0" />
                }
                type="email"
                name="email"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.email && errors.email ? "border-red-500" : ""
                }
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}

              {/* Password */}
              <Input
                startIcon={
                  <Lock className="w-4 h-4 sm:w-4 sm:h-4 text-gray-400 mr-2 flex-shrink-0" />
                }
                type="password"
                name="password"
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
              <div className="flex justify-end mt-1">
                <a
                  href="/forgot-password"
                  className="text-xs text-red-400 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              {/* Login Button */}
              <button
                type="submit"
                disabled={!isFormValid || loginMutation.isLoading}
                className={`bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition ${
                  (!isFormValid || loginMutation.isLoading) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                {loginMutation.isLoading ? "Logging in..." : "Login"}
              </button>

              {/* Google Login */}
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <img
                  src="/icons/google-icon.png"
                  alt="Google"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                />
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-4 sm:mt-6">
                Create an account?{" "}
                <a
                  href="/signup"
                  className="text-red-400 font-semibold hover:underline"
                >
                  Signup
                </a>
              </p>

              <p className="text-xs text-gray-400 text-center mt-2 sm:mt-4">
                By signing in, you agree to our Terms & Privacy Policy
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
