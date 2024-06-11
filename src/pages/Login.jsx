import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/Admin/signin",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (
        signIn({
          auth: {
            token: "codecamps__" + response.data.token,
            type: "Bearer",
          },
          userState: { name: response.data.name },
        })
      ) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeacherLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/Teacher/signin",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (
        signIn({
          auth: {
            token: "codecamps__" + response.data.token,
            type: "Bearer",
          },
          userState: { name: response.data.name },
        })
      ) {
        navigate("/teacher-home");
      }
    } catch (error) {
      setError(error.response.data.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 h-screen w-screen">
      <div className="text-center pt-24">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Sign in into your account</h2>
        <span className="text-sm">
          or{" "}
          <a href="#" className="text-blue            -500">
            register a new account
          </a>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3">
              <label htmlFor="remember" className="flex items-center w-1/2">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="mr-1 bg-white shadow"
                />
                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
              </label>
              <div className="w-1/2 text-right">
                <a href="#" className="text-blue-500 text-sm tracking-tight">
                  Forget your password?
                </a>
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button
                type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:border-gray-500"
              >
                Sign in
              </button>
            </div>
            <div className="mx-auto -mb-6 pb-1">
              <span className="text-center text-xs text-gray-700">
                or Sign in as a teacher
              </span>
            </div>
            <div className="flex items-center w-full mt-6 justify-center">
              <button
                type="button"
                onClick={handleTeacherLogin}
                className="appearance-none block w-full bg-green-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Sign in as a Teacher
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
