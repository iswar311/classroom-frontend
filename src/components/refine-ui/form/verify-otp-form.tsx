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

interface VerifyOTPFormProps {
  email: string;
  onOTPVerified: (resetToken: string) => void;
  onBack: () => void;
}

export const VerifyOTPForm = ({
  email,
  onOTPVerified,
  onBack,
}: VerifyOTPFormProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to verify OTP");
        setIsSubmitting(false);
        return;
      }

      onOTPVerified(data.resetToken);
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
            Verify OTP
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Enter the OTP sent to {email}
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleVerifyOTP}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className={cn("flex-1", "text-center", "tracking-widest")}
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
              {isSubmitting ? "Verifying..." : "Verify OTP"}
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

VerifyOTPForm.displayName = "VerifyOTPForm";
