"use client";
import { Mail, Lock } from 'lucide-react'; // lucide icons import

const LoginForm = () => {
  return (
    <div className="flex-1 px-8 py-6 md:px-16 md:py-10 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Welcome back to TaskFlow
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Organize tasks, track progress, and collaborate efficiently.
      </p>

      <form className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Lock className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition"
        >
          Login
        </button>

        {/* Google Login */}
        <button
          type="button"
          className="flex items-center justify-center border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          <img src="/icons/google-icon.png" alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Create an account?{" "}
          <a href="/signup" className="text-red-400 font-semibold hover:underline">
            Signup
          </a>
        </p>

        <p className="text-xs text-gray-400 text-center">
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
