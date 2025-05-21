"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ToastExamples() {
  const handleDefaultToast = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      // You can add other options here, like `duration`, `icon`, etc.
    });
  };

  const handleSuccessToast = () => {
    toast.success("Success!", {
      description: "Your changes have been saved.",
    });
  };

  const handleErrorToast = () => {
    toast.error("Error!", {
      description: "Could not save your changes.",
    });
  };

  const handleWarningToast = () => {
    // Sonner typically uses `toast()` or `toast.info()` for warnings,
    // often differentiated by a custom icon or prefix in the title.
    // `toast.warning()` is not a standard method in sonner's default API.
    // We'll use a default toast and label it as a warning.
    toast("Warning", {
      description: "Please be cautious before proceeding.",
      // icon: <YourWarningIcon />, // Example: You could add a custom icon
    });
  };

  const handleToastWithAction = () => {
    toast("Event has been created", {
      description: "A new event has been added to your calendar.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo action triggered!"),
      },
    });
  };

  const handlePromiseToast = () => {
    // 成功時のレスポンス型を定義
    interface SuccessResponse {
      name: string;
    }

    // エラー時のレスポンス型を定義
    interface ErrorResponse {
      error: string;
    }

    const promise = () =>
      new Promise<SuccessResponse>((resolve, reject) => {
        const success = Math.random() > 0.5; // Simulate success/failure
        setTimeout(() => {
          if (success) {
            resolve({ name: "My Event" });
          } else {
            reject({ error: "Network error" });
          }
        }, 2000);
      });

    toast.promise(promise, {
      loading: "Processing your request...",
      success: (data: SuccessResponse) => {
        return `${data.name} has been successfully processed!`;
      },
      error: (err: ErrorResponse) => {
        return `Error: ${err.error || "Something went wrong"}.`;
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-3">Toast Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button onClick={handleDefaultToast} variant="default">
          Default Toast
        </Button>
        <Button onClick={handleSuccessToast} variant="success">
          Success Toast
        </Button>
        <Button onClick={handleErrorToast} variant="destructive">
          Error Toast
        </Button>
        <Button onClick={handleWarningToast} variant="warning">
          Warning Toast
        </Button>
        <Button onClick={handleToastWithAction} variant="default">
          Toast with Action
        </Button>
        <Button onClick={handlePromiseToast} variant="default">
          Promise Toast
        </Button>
      </div>
    </div>
  );
}

// Note: For these toasts to appear, the <Toaster /> component from 'sonner'
// must be rendered somewhere in your application's layout (e.g., in the root layout).
// This file only provides the trigger examples.
