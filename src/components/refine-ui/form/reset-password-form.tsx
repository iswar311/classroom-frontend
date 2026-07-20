"use client";

import { ArrowLeft } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useNotification } from "@refinedev/core";

interface ResetPasswordFormProps {
  email: string;
  resetToken: string;
  onBack: () => void;
}

export const ResetPasswordForm = ({
  email,
  resetToken,
  onBack,
}: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { open } = useNotification();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resetToken,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password");
        setIsSubmitting(false);
        return;
      }

      open?.({
        type: "success",
        message: "Success",
        description: "Password has been reset successfully. Redirecting to login...",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "px-6",
        "py-8",
        "min-h-svh"
      )}
    >
      <Card className={cn("sm:w-[456px]", "p-12", "mt-6")}>
        <CardHeader className={cn("px-0")}>
          <CardTitle
            className={cn(
              "text-blue-600",
              "dark:text-blue-400",
              "text-3xl",
              "font-semibold"
            )}
          >
            Reset Password
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Enter your new password
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleResetPassword}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={cn("flex", "flex-col", "gap-2", "mt-4")}>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <div
                className={cn(
                  "mt-4",
                  "p-3",
                  "bg-red-50",
                  "border",
                  "border-red-200",
                  "rounded",
                  "text-red-700",
                  "text-sm"
                )}
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className={cn("w-full", "mt-6")}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>

            <div className={cn("mt-8")}>
              <button
                type="button"
                onClick={onBack}
                className={cn(
                  "inline-flex",
                  "items-center",
                  "gap-2",
                  "text-sm",
                  "text-muted-foreground",
                  "hover:text-foreground",
                  "transition-colors"
                )}
              >
                <ArrowLeft className={cn("w-4", "h-4")} />
                <span>Back</span>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

ResetPasswordForm.displayName = "ResetPasswordForm";
