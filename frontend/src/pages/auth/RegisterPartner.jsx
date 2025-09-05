import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function RegisterPartner() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };
    try {
      const response = await axios.post("http://localhost:3000/api/auth/partner/register", data, {
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
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
              Register Partner
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Create your business partner account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Business Name field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="organization"
                placeholder="e.g. dullat.inc"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Phone field */}
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. 78346834"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Address field */}
            <div className="group">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="e.g. paper street"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

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
                placeholder="e.g. partner@mail.com"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Password field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a secure password"
                className="w-full px-3 py-2.5 bg-gray-50/50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-neutral-600 text-base"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:ring-offset-neutral-900 transition-colors duration-200"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-700 dark:text-gray-300 leading-4">
                I agree to the <span className="text-indigo-600 dark:text-indigo-400 font-medium">Partner Terms</span> and <span className="text-indigo-600 dark:text-indigo-400 font-medium">Privacy Policy</span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 text-sm"
            >
              Create Partner Account
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
                  Already have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Sign in link */}
          <div className="mt-3 text-center">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4"
            >
              Sign in to your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
