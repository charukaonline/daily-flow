import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

type UserRole = "admin" | "employee";

export default function Login() {
  const [role, setRole] = useState<UserRole>("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Store token or redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", role);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      }
      window.location.href =
        role === "admin" ? "/admin/dashboard" : "/dashboard";
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left Column - Image (hidden on mobile) */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Office workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Daily Flow</h1>
          <p className="text-xl text-center max-w-md">
            Streamline your workflow and boost productivity with our intuitive
            daily management system
          </p>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center px-4 py-8 sm:p-6 lg:p-12">
        {/* Mobile-only logo/header */}
        <div className="lg:hidden flex flex-col items-center mb-6 absolute top-8">
          <h1 className="text-3xl font-bold text-primary dark:text-primary">
            Daily Flow
          </h1>
        </div>

        <Card className="w-full max-w-md shadow-xl border-0 dark:border-gray-800 dark:bg-gray-950 overflow-hidden mt-16 lg:mt-0">
          <div className="bg-primary h-2 w-full"></div>
          <CardContent className="p-5 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 text-center dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base mb-4 sm:mb-6">
              Sign in to continue to Daily Flow
            </p>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-sm font-medium dark:text-gray-300">
                  Login As
                </Label>
                <ToggleGroup
                  type="single"
                  value={role}
                  onValueChange={(val) => {
                    if (val === "admin" || val === "employee") setRole(val);
                  }}
                  className="w-full border dark:border-gray-700 rounded-md p-1 justify-center"
                >
                  <ToggleGroupItem
                    value="employee"
                    className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-white dark:text-gray-300 dark:data-[state=off]:hover:bg-gray-800 text-sm py-1.5"
                  >
                    Employee
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="admin"
                    className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-white dark:text-gray-300 dark:data-[state=off]:hover:bg-gray-800 text-sm py-1.5"
                  >
                    Admin
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-11 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 sm:h-11 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="dark:border-gray-700 dark:data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-xs sm:text-sm dark:text-gray-400"
                  >
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-primary hover:underline dark:text-primary"
                >
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded-md border border-red-200 dark:border-red-800">
                  <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Create an account
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
