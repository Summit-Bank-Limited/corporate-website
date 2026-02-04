"use client";

import React, { useState } from "react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import Modal from "react-modal";

Modal.setAppElement("body");

type Step = "account-details" | "pin" | "success";

export default function ActivateCardForm() {
  const [currentStep, setCurrentStep] = useState<Step>("account-details");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    bvnOrNin: "",
    cardNumber: "",
    token: "",
    pin: "",
    verifyPin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAccountDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length < 10) {
      newErrors.accountNumber = "Account number must be at least 10 digits";
    }

    if (!formData.bvnOrNin.trim()) {
      newErrors.bvnOrNin = "BVN is required";
    } else if (formData.bvnOrNin.length !== 11 || !/^\d+$/.test(formData.bvnOrNin)) {
      newErrors.bvnOrNin = "BVN must be exactly 11 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePin = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.length < 16) {
      newErrors.cardNumber = "Card number must be at least 16 digits";
    }

    if (!formData.token.trim()) {
      newErrors.token = "Token is required";
    } else if (formData.token.length !== 6 || !/^\d+$/.test(formData.token)) {
      newErrors.token = "Token must be exactly 6 digits";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN is required";
    } else if (formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
      newErrors.pin = "PIN must be exactly 4 digits";
    }

    if (!formData.verifyPin.trim()) {
      newErrors.verifyPin = "Please verify your PIN";
    } else if (formData.pin !== formData.verifyPin) {
      newErrors.verifyPin = "PINs do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAccountDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAccountDetails()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/mtd/request-token-bvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountNumber: formData.accountNumber,
          bvn: formData.bvnOrNin,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMessage = data.data?.statusDescription || data.message || 'Failed to verify account. Please try again.';
        toast.error(errorMessage);
        return;
      }

      toast.success(data.data?.statusDescription || "Account verified! Please check your phone/email for the activation token.");
      setCurrentStep("pin");
    } catch (error) {
      console.error('Error requesting token:', error);
      toast.error("Failed to verify account. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePin()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/mtd/card-activation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountNumber: formData.accountNumber,
          token: formData.token,
          cardNumber: formData.cardNumber,
          pin: formData.pin,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMessage = data.data?.statusDescription || data.message || 'Failed to activate card. Please try again.';
        toast.error(errorMessage);
        return;
      }

      toast.success("Card activated successfully!");
      setIsSuccessModalOpen(true);
      setCurrentStep("success");
    } catch (error) {
      console.error('Error activating card:', error);
      toast.error("Failed to activate card. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      accountNumber: "",
      bvnOrNin: "",
      cardNumber: "",
      token: "",
      pin: "",
      verifyPin: "",
    });
    setErrors({});
    setCurrentStep("account-details");
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #dee2e6",
          },
          success: {
            iconTheme: {
              primary: "#28a745",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc3545",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
              {[
              { step: "account-details", label: "Account Details", icon: CreditCard },
              { step: "pin", label: "PIN", icon: Lock },
              { step: "success", label: "Complete", icon: CheckCircle2 },
            ].map((item, index, array) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted =
                (item.step === "account-details" && currentStep !== "account-details") ||
                (item.step === "pin" && currentStep === "success");

              return (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-[var(--secondary-color)] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`mt-2 text-xs md:text-sm text-center ${
                        isActive ? "font-semibold text-[var(--secondary-color)]" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < array.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step 1: Account Details */}
        {currentStep === "account-details" && (
          <form onSubmit={handleAccountDetailsSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary-color)] mb-2">
                Enter Account Details
              </h2>
              <p className="text-gray-600">
                Please provide your account information to begin card activation
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your account number"
                  className={errors.accountNumber ? "border-red-500" : ""}
                  maxLength={10}
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BVN <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.bvnOrNin}
                  onChange={(e) => handleInputChange("bvnOrNin", e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="Enter your BVN"
                  className={errors.bvnOrNin ? "border-red-500" : ""}
                  maxLength={11}
                />
                {errors.bvnOrNin && (
                  <p className="text-red-500 text-xs mt-1">{errors.bvnOrNin}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`h-[45px] cursor-pointer hover:shadow-xl flex items-center gap-2 justify-center w-full text-center px-6 transition-all duration-300 hover:px-8 py-2 border rounded-lg bg-[var(--secondary-color)] border-[var(--secondary-color)] text-white disabled:bg-gray-400 disabled:text-gray-500`}
              >
                {isLoading ? "Verifying..." : "Continue"}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: PIN */}
        {currentStep === "pin" && (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-[var(--secondary-color)]" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary-color)] mb-2">
                Set Your PIN
              </h2>
              <p className="text-gray-600">
                Enter your card details, token, and create a 4-digit PIN
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 19))}
                  placeholder="Enter full card number"
                  className={errors.cardNumber ? "border-red-500" : ""}
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.token}
                  onChange={(e) => handleInputChange("token", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter activation token"
                  className={errors.token ? "border-red-500" : ""}
                  maxLength={6}
                />
                {errors.token && (
                  <p className="text-red-500 text-xs mt-1">{errors.token}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="Enter 4-digit PIN"
                  className={errors.pin ? "border-red-500" : ""}
                  maxLength={4}
                />
                {errors.pin && (
                  <p className="text-red-500 text-xs mt-1">{errors.pin}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verify PIN <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.verifyPin}
                  onChange={(e) => handleInputChange("verifyPin", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="Re-enter 4-digit PIN"
                  className={errors.verifyPin ? "border-red-500" : ""}
                  maxLength={4}
                />
                {errors.verifyPin && (
                  <p className="text-red-500 text-xs mt-1">{errors.verifyPin}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`h-[45px] cursor-pointer hover:shadow-xl flex items-center gap-2 justify-center w-full text-center px-6 transition-all duration-300 hover:px-8 py-2 border rounded-lg bg-[var(--secondary-color)] border-[var(--secondary-color)] text-white disabled:bg-gray-400 disabled:text-gray-500`}
              >
                {isLoading ? "Activating..." : "Activate Card"}
              </button>
            </div>
          </form>
        )}

        {/* Success Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onRequestClose={() => {}}
          contentLabel="Card Activated"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-500" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--secondary-color)] mb-2">
              Card Activated Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your card has been successfully activated. You can now start using it for transactions.
            </p>
            <Button
              text="Done"
              type="primary"
              buttonFn={() => {
                resetForm();
                window.location.href = "/";
              }}
              custom="w-full"
            />
          </div>
        </Modal>
      </div>
    </>
  );
}

