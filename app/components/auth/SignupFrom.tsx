"use client";
import { User, Mail, Lock } from 'lucide-react';

export default function SignupForm() {
  return (
    <div className="flex-1 px-8 py-6 md:px-16 md:py-10 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Create your account
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Start organizing your work with TaskFlow.
      </p>

      <form className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-11 focus-within:border-red-600">
          <User className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Full name"
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-11 focus-within:border-red-600">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 h-11 focus-within:border-red-600">
          <Lock className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          className="w-full bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition"
        >
          Create Account
        </button>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <img src="/icons/google-icon.png" alt="Google" className="h-5 w-5" />
          Sign up with Google
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>

      {/* Trust Text */}
      <p className="text-xs text-gray-400 text-center mt-6">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
