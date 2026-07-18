import api from "@/lib/api";
import axios from "axios";
import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("access_token", response.data.access_token);

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error))
        alert(
          error.response?.data.detail ??
            "Login failed. Please try again later.",
        );
      else alert("Login failed. Please try again later.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] opacity-20 blur-3xl animate-pulse" />

      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent transition-opacity hover:opacity-80"
          >
            MediaVault
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Welcome back</CardTitle>

            <CardDescription>
              Continue building your personal media library.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="mt-2 w-full" size="lg">
                Log In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-foreground hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
