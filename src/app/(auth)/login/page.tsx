
"use client";

import Link from "next/link";
import { useState } from "react";
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
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
      <Card className="mx-auto max-w-md w-full shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Username</Label>
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email or username"
                  className="pl-10"
                  required
                />
              </div>
               <p className="text-xs text-muted-foreground mt-1">
                Admin login: username "admin", password "Admin@123"
              </p>
            </div>
            <div className="grid gap-2">
               <Label htmlFor="password">Password</Label>
               <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
               </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-light text-primary-foreground hover:opacity-90 transition-opacity">
              Sign In
            </Button>
          </form>

           <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline text-primary hover:text-primary/90 font-medium">
              Create Account
            </Link>
          </div>

          <div className="mt-8 p-4 bg-secondary/70 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Admin:</strong> admin / Admin@123</p>
              <p><strong>User:</strong> Register a new account</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
