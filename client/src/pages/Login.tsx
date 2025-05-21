import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type UserRole = "admin" | "employee";

export default function Login() {
  const [role, setRole] = useState<UserRole>("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

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
      window.location.href = role === "admin" ? "/admin/dashboard" : "/dashboard";
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <ToggleGroup
              type="single"
              value={role}
              onValueChange={(val) => {
                if (val === "admin" || val === "employee") setRole(val);
              }}
              className="mb-4"
            >
              <ToggleGroupItem value="employee">Employee</ToggleGroupItem>
              <ToggleGroupItem value="admin">Admin</ToggleGroupItem>
            </ToggleGroup>

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
