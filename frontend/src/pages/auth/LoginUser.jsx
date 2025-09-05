import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginUser() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login", data, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 p-3 sm:p-4 lg:p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
      
      {/* Main form container */}
      <div className="relative w-full max-w-xs sm:max-w-sm">
        <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-gray-200/20 dark:border-white/10 rounded-xl shadow-xl shadow-gray-500/10 dark:shadow-black/20 p-5 sm:p-6">
          {/* Header */}
          <div className="text-center mb-5 sm:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Password field */}
            <div className="group">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200 font-medium"
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/40 focus:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:ring-offset-neutral-900 transition-colors duration-200"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 text-sm"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/50 dark:border-neutral-700/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white/80 dark:bg-neutral-900/80 px-3 text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-3 text-center">
            <button
              type="button"
              className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
