import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-3xl">
          <CardHeader className="text-center space-y-2 pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-tr from-blue-200 to-blue-400 p-4 rounded-full shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-extrabold text-blue-700">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Join us and start your journey toward success
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 text-center mb-5 leading-relaxed text-sm">
              Unlock your personalized dashboard experience where technology meets simplicity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg"
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-medium rounded-xl py-2 flex items-center justify-center gap-2"
              >
                {loading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
