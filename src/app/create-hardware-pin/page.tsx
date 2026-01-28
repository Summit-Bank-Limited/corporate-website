"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SectionHero from "@/components/generalHero/SectionHero";
import { Input } from "@/components/ui/input";
import { hardwarePinApi } from "@/lib/utils/hardwarePinApi";
import toast, { Toaster } from "react-hot-toast";
import {
  Key,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  ArrowLeft,
  Send,
  Check,
  Save,
  RotateCcw,
} from "lucide-react";
import Modal from "react-modal";

Modal.setAppElement("body");

type Step = 1 | 2 | 3;

interface PinData {
  userId: string;
  serialNumber: string;
  pin: string;
  confirmPin: string;
}

export default function CreateHardwarePinPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Generate Token
  const [customerId, setCustomerId] = useState("");
  const [generateTokenError, setGenerateTokenError] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Step 2: Validate Token
  const [otpToken, setOtpToken] = useState("");
  const [validateTokenError, setValidateTokenError] = useState("");
  const [otpValidated, setOtpValidated] = useState(false);

  // Step 3: Create Pin
  const [pinData, setPinData] = useState<PinData>({
    userId: "",
    serialNumber: "",
    pin: "",
    confirmPin: "",
  });
  const [createPinError, setCreatePinError] = useState("");

  // Success Dialog
  const [successDialog, setSuccessDialog] = useState(false);

  const steps = [
    { title: "Generate OTP", value: 1 },
    { title: "Validate OTP", value: 2 },
    { title: "Create PIN", value: 3 },
  ];

  // Validation Rules
  const requiredRule = (value: string) => !!value || "This field is required";

  const otpRule = (value: string) => {
    if (!value) return true;
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(value) || "OTP must be exactly 6 digits";
  };

  const pinLengthRule = (value: string) => {
    if (!value) return true;
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(value) || "PIN must be exactly 4 digits";
  };

  const pinMatchRule = (value: string) => {
    if (!value) return true;
    return value === pinData.pin || "PINs do not match";
  };

  // Methods
  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const openSnackbar = (message: string, type: "success" | "error" = "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleGenerateToken = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!requiredRule(customerId)) {
      setGenerateTokenError("Customer ID is required");
      return;
    }

    setLoading(true);
    setGenerateTokenError("");
    setOtpGenerated(false);
    setGeneratedOtp("");

    try {
      const response = await hardwarePinApi.sendOTP(customerId);

      if (response && (response.statusCode === "200" || response.statusCode === 200)) {
        setOtpGenerated(true);
        setGeneratedOtp(response.otp || "");
        openSnackbar(
          response.message || response.statusDescription || "OTP sent successfully",
          "success"
        );
        setTimeout(() => {
          goToStep(2);
        }, 1500);
      } else {
        throw new Error(
          response?.message || response?.statusDescription || "Failed to send OTP"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send OTP";
      setGenerateTokenError(errorMessage);
      openSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleValidateToken = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!requiredRule(otpToken)) {
      setValidateTokenError("OTP Token is required");
      return;
    }

    if (!otpRule(otpToken)) {
      setValidateTokenError("OTP must be exactly 6 digits");
      return;
    }

    setLoading(true);
    setValidateTokenError("");

    try {
      const response = await hardwarePinApi.validateOTP(otpToken, customerId);

      if (response && (response.statusCode === "200" || response.statusCode === 200)) {
        if (response.data?.respCode === "0") {
          setOtpValidated(true);
          openSnackbar(
            response.message ||
              response.statusDescription ||
              "OTP validated successfully",
            "success"
          );
          setTimeout(() => {
            goToStep(3);
          }, 1000);
        } else {
          throw new Error(
            response.data?.respMsg ||
              response.message ||
              response.statusDescription ||
              "OTP validation failed"
          );
        }
      } else {
        throw new Error(
          response?.message || response?.statusDescription || "Failed to validate OTP"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to validate OTP";
      setValidateTokenError(errorMessage);
      openSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validate all fields
    if (!requiredRule(pinData.userId)) {
      setCreatePinError("User ID is required");
      return;
    }
    if (!requiredRule(pinData.serialNumber)) {
      setCreatePinError("Serial Number is required");
      return;
    }
    if (!requiredRule(pinData.pin)) {
      setCreatePinError("PIN is required");
      return;
    }
    if (!pinLengthRule(pinData.pin)) {
      setCreatePinError("PIN must be exactly 4 digits");
      return;
    }
    if (!pinMatchRule(pinData.confirmPin)) {
      setCreatePinError("PINs do not match");
      return;
    }

    setLoading(true);
    setCreatePinError("");

    try {
      const response = await hardwarePinApi.createHardwarePin(
        pinData.userId,
        pinData.serialNumber,
        pinData.pin
      );

      if (response && (response.statusCode === "200" || response.statusCode === 200)) {
        if (response.data?.respCode === "00" || response.data?.respCode === "0") {
          openSnackbar(
            response.message ||
              response.statusDescription ||
              "Hardware PIN created successfully",
            "success"
          );
          setSuccessDialog(true);
        } else {
          throw new Error(
            response.data?.respMsg ||
              response.message ||
              response.statusDescription ||
              "Failed to create hardware PIN"
          );
        }
      } else {
        throw new Error(
          response?.message || response?.statusDescription || "Failed to create hardware PIN"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create hardware PIN";
      setCreatePinError(errorMessage);
      openSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessDialog(false);

    // Reset all form data
    setCustomerId("");
    setOtpToken("");
    setPinData({
      userId: "",
      serialNumber: "",
      pin: "",
      confirmPin: "",
    });

    // Reset state
    setOtpGenerated(false);
    setGeneratedOtp("");
    setOtpValidated(false);
    setGenerateTokenError("");
    setValidateTokenError("");
    setCreatePinError("");

    // Go back to first step
    goToStep(1);
  };

  return (
    <DefaultLayout>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#4CAF50",
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

      <SectionHero
        mainClass={"!pt-[50px]"}
        title="Create Hardware PIN"
        subtitle="Secure hardware token PIN creation with OTP verification"
      />

      <div className="main py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#AF1F23] to-[#8B1519] text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-1">Create Hardware PIN</h2>
                <p className="text-sm opacity-90">
                  Secure hardware token PIN creation with OTP verification
                </p>
              </div>
              <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center">
                <RotateCcw className="text-[#AF1F23]" size={36} />
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Info Alert */}
            <div className="mx-6 my-6 p-4 bg-blue-50 border-l-4 border-[#AF1F23] rounded">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-900">
                  Hardware PIN Creation Process
                </span>
                <div className="text-sm text-gray-700">
                  Follow the steps below to create a hardware PIN. You'll need to generate
                  and validate an OTP token before proceeding.
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-6 bg-gray-50 border-y border-gray-200">
              <div className="flex items-center justify-center gap-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.value}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          currentStep === step.value
                            ? "bg-[#AF1F23] text-white shadow-lg"
                            : currentStep > step.value
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {currentStep > step.value ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <span className="text-lg font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <div
                          className={`text-xs font-medium ${
                            currentStep >= step.value
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 ${
                          currentStep > step.value ? "bg-[#AF1F23]" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Step Content */}
            <div className="p-6 min-h-[400px]">
              {/* Step 1: Generate Token */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Key className="text-[#AF1F23]" size={24} />
                      Generate OTP Token
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter the customer ID to generate and send an OTP token to the account
                      holder's phone number.
                    </p>
                  </div>

                  <form onSubmit={handleGenerateToken} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer ID <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="Enter customer ID"
                        disabled={loading}
                        className="w-full"
                      />
                    </div>

                    {generateTokenError && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                        <p className="text-sm text-red-700">{generateTokenError}</p>
                      </div>
                    )}

                    {otpGenerated && (
                      <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-green-900">
                            OTP Generated Successfully!
                          </span>
                          <div className="text-sm text-green-800">
                            An OTP has been sent to the account holder's phone number.
                            {generatedOtp && (
                              <span className="font-bold ml-1">OTP: {generatedOtp}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="h-[45px] cursor-pointer hover:shadow-xl flex items-center gap-2 justify-center px-6 transition-all duration-300 py-2 border rounded-lg bg-[#AF1F23] border-[#AF1F23] text-white disabled:bg-gray-400 disabled:text-gray-500"
                      >
                        {loading ? (
                          "Generating..."
                        ) : (
                          <>
                            <Send size={18} />
                            Generate OTP
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Validate Token */}
              {currentStep === 2 && (
                <div>
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <ShieldCheck className="text-[#AF1F23]" size={24} />
                      Validate OTP Token
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter the OTP token that was sent to the account holder's phone number
                      to proceed.
                    </p>
                  </div>

                  <form onSubmit={handleValidateToken} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OTP Token <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={otpToken}
                        onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        disabled={loading || !otpGenerated}
                        maxLength={6}
                        className="w-full"
                      />
                    </div>

                    {customerId && (
                      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <div className="text-sm">
                          <strong>Customer ID:</strong> {customerId}
                        </div>
                      </div>
                    )}

                    {validateTokenError && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                        <p className="text-sm text-red-700">{validateTokenError}</p>
                      </div>
                    )}

                    <div className="flex justify-between gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        disabled={loading}
                        className="h-[45px] cursor-pointer flex items-center gap-2 justify-center px-6 transition-all duration-300 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <ArrowLeft size={18} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !otpGenerated}
                        className="h-[45px] cursor-pointer hover:shadow-xl flex items-center gap-2 justify-center px-6 transition-all duration-300 py-2 border rounded-lg bg-[#AF1F23] border-[#AF1F23] text-white disabled:bg-gray-400 disabled:text-gray-500"
                      >
                        {loading ? (
                          "Validating..."
                        ) : (
                          <>
                            <Check size={18} />
                            Validate OTP
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Create Pin */}
              {currentStep === 3 && (
                <div>
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <LockKeyhole className="text-[#AF1F23]" size={24} />
                      Create Hardware PIN
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter the hardware token details to create a new PIN. The PIN must be
                      exactly 4 digits.
                    </p>
                  </div>

                  <form onSubmit={handleCreatePin} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          User ID <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={pinData.userId}
                          onChange={(e) =>
                            setPinData({ ...pinData, userId: e.target.value })
                          }
                          placeholder="Enter user ID"
                          disabled={loading || !otpValidated}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Serial Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          value={pinData.serialNumber}
                          onChange={(e) =>
                            setPinData({ ...pinData, serialNumber: e.target.value })
                          }
                          placeholder="Enter serial number"
                          disabled={loading || !otpValidated}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="password"
                          value={pinData.pin}
                          onChange={(e) =>
                            setPinData({
                              ...pinData,
                              pin: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          placeholder="Enter 4-digit PIN"
                          disabled={loading || !otpValidated}
                          maxLength={4}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm PIN <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="password"
                          value={pinData.confirmPin}
                          onChange={(e) =>
                            setPinData({
                              ...pinData,
                              confirmPin: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          placeholder="Re-enter 4-digit PIN"
                          disabled={loading || !otpValidated}
                          maxLength={4}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {createPinError && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                        <p className="text-sm text-red-700">{createPinError}</p>
                      </div>
                    )}

                    <div className="flex justify-between gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        disabled={loading}
                        className="h-[45px] cursor-pointer flex items-center gap-2 justify-center px-6 transition-all duration-300 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <ArrowLeft size={18} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !otpValidated}
                        className="h-[45px] cursor-pointer hover:shadow-xl flex items-center gap-2 justify-center px-6 transition-all duration-300 py-2 border rounded-lg bg-[#AF1F23] border-[#AF1F23] text-white disabled:bg-gray-400 disabled:text-gray-500"
                      >
                        {loading ? (
                          "Creating..."
                        ) : (
                          <>
                            <Save size={18} />
                            Create PIN
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Modal
        isOpen={successDialog}
        onRequestClose={handleReset}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Success Dialog"
      >
        <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Success!</h2>
            <CheckCircle2 size={28} />
          </div>
          <div className="p-6">
            <div className="text-center py-4">
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hardware PIN Created Successfully
              </h3>
              <p className="text-sm text-gray-600 mb-0">
                The hardware PIN has been created for the specified token.
              </p>
            </div>
          </div>
          <div className="p-6 flex justify-end gap-3 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="h-[45px] cursor-pointer flex items-center justify-center px-6 transition-all duration-300 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
            >
              Create Another
            </button>
            <button
              onClick={handleReset}
              className="h-[45px] cursor-pointer hover:shadow-xl flex items-center justify-center px-6 transition-all duration-300 py-2 border rounded-lg bg-[#AF1F23] border-[#AF1F23] text-white"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          outline: none;
        }
      `}</style>
    </DefaultLayout>
  );
}

