import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-3xl">
        <CardHeader className="text-center pt-6 space-y-2">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-tr from-blue-200 to-blue-400 p-4 rounded-full shadow-lg">
              <LogIn className="w-7 h-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold text-blue-700">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Log in to continue your journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 text-center mb-5 leading-relaxed text-sm">
            Access your personalized dashboard and manage your tasks with ease.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-medium rounded-xl py-2 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
