
"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
      <Card className="mx-auto max-w-md w-full shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Admin Panel</CardTitle>
          <CardDescription>
            Authentication is currently disabled.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard">
                Go to Dashboard
              </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
