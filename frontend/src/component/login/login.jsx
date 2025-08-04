import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lensifyImg from "../../assets/photos/lensify.jpg";
import googleIcon from "../../assets/photos/google.png";
import PhoneIcon from "../../assets/photos/phone.png";
import axios from "axios";

export const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => navigate("/signup");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (step === "email") {
        setStep("password");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.data.accesstoken);
      setIsAuthenticated(true); // Update authentication state

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-svh">
      <div className="bg-white flex flex-col items-center justify-center min-h-[550px] h-screen sm:h-auto text-black shadow-2xl mt-0 px-2 sm:px-8 rounded-none sm:rounded-xl w-full sm:max-w-md mx-auto">
        <img
          src={lensifyImg}
          alt="Lensify logo"
          className="w-32 h-20 object-contain mb-2 mt-4"
        />

        <h2 className="text-2xl font-bold mb-2 text-center">
          {step === "email" ? "Sign in" : "Enter your password"}
        </h2>

        {/* Social login buttons (shown only in email step) */}
        {step === "email" && (
          <div className="flex flex-col items-center justify-center w-full">
            <button className="rounded-3xl border border-gray-300 mt-4 w-full max-w-xs py-3 pl-12 flex items-center justify-center relative hover:border-black transition-all duration-200">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                <img
                  src={googleIcon}
                  alt="G"
                  className="w-7 h-7 object-contain"
                />
              </span>
              <span className="mx-auto">Sign in With Google</span>
            </button>
            <button className="rounded-3xl border border-gray-300 mt-4 w-full max-w-xs py-3 pl-12 flex items-center justify-center relative hover:border-black transition-all duration-200">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                <img
                  src={PhoneIcon}
                  alt="phone"
                  className="w-7 h-7 object-contain"
                />
              </span>
              <span className="mx-auto">Sign in With Mobile</span>
            </button>
            <div className="flex items-center w-full my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
          </div>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form
          className="w-full flex flex-col items-center gap-4 "
          onSubmit={handleSubmit}
        >
          {step === "email" ? (
            <div className="relative w-full flex justify-center">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="block px-4 pb-1.5 pt-3 w-90 text-md text-black rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:border-black peer"
              />
              <label
                htmlFor="email"
                className="ml-5 absolute text-md text-black duration-300 transform -translate-y-4 scale-80 top-1 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-80 peer-focus:-translate-y-4 left-2.5"
              >
                Email Address*
              </label>
            </div>
          ) : (
            <>
              <div className="text-center mb-2">
                <p>Welcome back</p>
                <p className="font-medium">{email}</p>
              </div>
              <div className="relative w-full flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  required
                  className="block px-4 pb-1.5 pt-3 w-90 text-md text-black rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:border-black peer pr-12"
                />
                <label
                  htmlFor="password"
                  className="ml-5 absolute text-md text-black duration-300 transform -translate-y-4 scale-80 top-1 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-80 peer-focus:-translate-y-4 left-2.5"
                >
                  Password*
                </label>
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M6.53 6.53A9.77 9.77 0 0 1 12 5.25c3.68 0 7.714 2.943 9.75 6.75a10.49 10.49 0 0 1-4.21 4.502M6.53 6.53l10.94 10.94M6.53 6.53 3.98 8.223M17.47 17.47l2.55-1.693"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`rounded-2xl border border-gray-400 py-2 h-10 mt-4 w-full max-w-xs bg-blue-500 text-white font-semibold hover:bg-blue-600 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Processing..."
              : step === "email"
              ? "Continue"
              : "Sign in"}
          </button>

          {step === "email" && (
            <h2 className="mt-3 mb-6 text-center text-gray-700 text-base font-normal">
              Don't have an account?
              <span
                onClick={handleClick}
                className="cursor-pointer hover:underline ml-1 font-semibold text-blue-600"
              >
                Create An Account
              </span>
            </h2>
          )}
        </form>
      </div>
    </div>
  );
};
