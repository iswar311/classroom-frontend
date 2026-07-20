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
import { useLink, useRefineOptions, useNotification } from "@refinedev/core";
import { VerifyOTPForm } from "./verify-otp-form";
import { ResetPasswordForm } from "./reset-password-form";

type Step = "email" | "otp" | "reset";

export const ForgotPasswordForm = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const Link = useLink();
  const { title } = useRefineOptions();
  const { open } = useNotification();

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        setIsSubmitting(false);
        return;
      }

      open?.({
        type: "success",
        message: "Success",
        description: "OTP has been sent to your email",
      });

      setStep("otp");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleOTPVerified = (token: string) => {
    setResetToken(token);
    setStep("reset");
  };

  if (step === "otp") {
    return (
      <VerifyOTPForm
        email={email}
        onOTPVerified={handleOTPVerified}
        onBack={() => setStep("email")}
      />
    );
  }

  if (step === "reset") {
    return (
      <ResetPasswordForm
        email={email}
        resetToken={resetToken}
        onBack={() => setStep("email")}
      />
    );
  }

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
      <div className={cn("flex", "items-center", "justify-center", "gap-2")}>
        {title.icon && (
          <div
            className={cn("text-foreground", "[&>svg]:w-12", "[&>svg]:h-12")}
          >
            {title.icon}
          </div>
        )}
      </div>

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
            Forgot password
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Enter your email to receive an OTP
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleSendOTP}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="email">Email</Label>
              <div className={cn("flex", "gap-2")}>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("flex-1")}
                />
                <Button
                  type="submit"
                  className={cn(
                    "bg-blue-600",
                    "hover:bg-blue-700",
                    "text-white",
                    "px-6"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
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
          </form>

          <div className={cn("mt-8")}>
            <Link
              to="/login"
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
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ForgotPasswordForm.displayName = "ForgotPasswordForm";
