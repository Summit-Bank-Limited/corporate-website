"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import SectionHero from "@/components/generalHero/SectionHero";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, KeyRound, ShieldCheck, Send, ArrowLeft, MailCheck } from "lucide-react";
import Modal from "react-modal";

Modal.setAppElement("body");

type Step = 1 | 2 | 3;

export default function RequestETokenPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [token, setToken] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");

  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);

  const steps = [
    { title: "Generate Token", value: 1 },
    { title: "Validate Token", value: 2 },
    { title: "Submit Request", value: 3 },
  ];

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleGenerateToken = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!customerId.trim()) {
      setErrorMessage("Customer ID is required");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(customerId)) {
      setErrorMessage("Customer ID must be alphanumeric");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setTokenGenerated(false);
    setTokenValidated(false);

    try {
      const response = await fetch("/api/mtd/etoken/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId.trim() }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate token");
      }

      setTokenGenerated(true);
      toast.success("Token generated successfully.");
      setCurrentStep(2);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate token";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateToken = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!tokenGenerated) {
      setErrorMessage("Generate token first");
      return;
    }
    if (!token.trim()) {
      setErrorMessage("Token is required");
      return;
    }
    if (!/^\d+$/.test(token)) {
      setErrorMessage("Token must contain only digits");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setTokenValidated(false);

    try {
      const response = await fetch("/api/mtd/etoken/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId.trim(), token: token.trim() }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to validate token");
      }

      setTokenValidated(true);
      toast.success("Token validated successfully.");
      setCurrentStep(3);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to validate token";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!tokenValidated) {
      setErrorMessage("Validate token before submitting request");
      return;
    }
    if (!accountNumber.trim()) {
      setErrorMessage("Account number is required");
      return;
    }
    if (!/^\d+$/.test(accountNumber)) {
      setErrorMessage("Account number must contain only digits");
      return;
    }
    if (!accountName.trim()) {
      setErrorMessage("Account name is required");
      return;
    }
    if (!email.trim() || !validateEmail(email.trim())) {
      setErrorMessage("A valid email is required");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/mtd/etoken/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: accountNumber.trim(),
          accountName: accountName.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process eToken request");
      }
      toast.success(data.message || "eToken request submitted successfully");
      setSuccessDialog(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit eToken request";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setSuccessDialog(false);
    setCurrentStep(1);
    setCustomerId("");
    setToken("");
    setAccountNumber("");
    setAccountName("");
    setEmail("");
    setTokenGenerated(false);
    setTokenValidated(false);
    setErrorMessage("");
  };

  return (
    <DefaultLayout>
      <Toaster position="top-right" />
      <SectionHero
        mainClass={"!pt-[50px]"}
        title="Request eToken"
        subtitle="Generate and validate OTP, then submit your eToken request"
      />

      <div className="main py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#AF1F23] to-[#8B1519] text-white p-6">
              <h2 className="text-2xl font-bold mb-1">eToken Request</h2>
              <p className="text-sm opacity-90">Complete all steps to request your eToken</p>
            </div>

            <div className="px-6 py-6 bg-gray-50 border-y border-gray-200">
              <div className="flex items-center justify-center gap-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.value}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          currentStep === step.value
                            ? "bg-[#AF1F23] text-white"
                            : currentStep > step.value
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {currentStep > step.value ? <CheckCircle2 size={22} /> : <span>{index + 1}</span>}
                      </div>
                      <span className="text-xs mt-2">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 ${currentStep > step.value ? "bg-[#AF1F23]" : "bg-gray-200"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-6 min-h-[340px]">
              {currentStep === 1 && (
                <form onSubmit={handleGenerateToken} className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <KeyRound className="text-[#AF1F23]" size={20} />
                    Generate Token
                  </h3>
                  <Input
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                    placeholder="Enter customer ID"
                    disabled={loading}
                  />
                  {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-[45px] px-6 rounded-lg bg-[#AF1F23] text-white disabled:bg-gray-400"
                    >
                      {loading ? "Generating..." : "Generate Token"}
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 2 && (
                <form onSubmit={handleValidateToken} className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <ShieldCheck className="text-[#AF1F23]" size={20} />
                    Validate Token
                  </h3>
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter token"
                    disabled={loading || !tokenGenerated}
                    maxLength={6}
                  />
                  {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      disabled={loading}
                      className="h-[45px] px-6 rounded-lg border border-gray-300 text-gray-700 disabled:bg-gray-100"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Back
                      </span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !tokenGenerated}
                      className="h-[45px] px-6 rounded-lg bg-[#AF1F23] text-white disabled:bg-gray-400"
                    >
                      {loading ? "Validating..." : "Validate Token"}
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 3 && (
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MailCheck className="text-[#AF1F23]" size={20} />
                    Submit eToken Request
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="Account number"
                      disabled={loading || !tokenValidated}
                    />
                    <Input
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Account name"
                      disabled={loading || !tokenValidated}
                    />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    disabled={loading || !tokenValidated}
                  />
                  {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={loading}
                      className="h-[45px] px-6 rounded-lg border border-gray-300 text-gray-700 disabled:bg-gray-100"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Back
                      </span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !tokenValidated}
                      className="h-[45px] px-6 rounded-lg bg-[#AF1F23] text-white disabled:bg-gray-400"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Send size={16} />
                        {loading ? "Submitting..." : "Submit Request"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={successDialog}
        onRequestClose={resetFlow}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="eToken Request Success"
      >
        <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
            <h2 className="text-xl font-bold">Success</h2>
          </div>
          <div className="p-6 text-center">
            <CheckCircle2 size={56} className="text-green-500 mx-auto mb-3" />
            <p className="text-gray-700">Your eToken request has been submitted successfully.</p>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={resetFlow}
              className="h-[45px] px-6 rounded-lg bg-[#AF1F23] text-white"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
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
