"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface MTDApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MTDApplicationForm({
  isOpen,
  onClose,
}: MTDApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState<"terms" | "verification" | "form">("terms");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rateTiers, setRateTiers] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    type: "verifying" | "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [customerData, setCustomerData] = useState<any>(null);
  const [expectedProfitRate, setExpectedProfitRate] = useState<number>(0);
  const [formData, setFormData] = useState({
    accountNumber: "",
    bvn: "",
    investmentAmount: "",
    tenor: "",
    effectiveDate: "",
    maturityInstruction: "",
    staffId: "",
    staffEmail: "",
    customerSignature: null as File | null,
    signatureBase64: "",
  });
  const [maturityDate, setMaturityDate] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsModalAccepted, setTermsModalAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationResult, setApplicationResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const verificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch rate guide on mount
  useEffect(() => {
    if (isOpen) {
      fetchRateGuide();
      // Reset form when modal opens
      setCurrentStep("terms");
      setTermsAccepted(false);
      setFormData({
        accountNumber: "",
        bvn: "",
        investmentAmount: "",
        tenor: "",
        effectiveDate: "",
        maturityInstruction: "",
        staffId: "",
        staffEmail: "",
        customerSignature: null,
        signatureBase64: "",
      });
      setCustomerData(null);
      setVerificationStatus({ type: null, message: "" });
      setExpectedProfitRate(0);
      setMaturityDate("");
      setSubmitSuccess(false);
      setApplicationResult(null);
      setErrorMessage("");
    }
  }, [isOpen]);

  // Fetch rate guide
  const fetchRateGuide = async () => {
    try {
      const response = await fetch("http://localhost:9000/mtd/mtd/rates");
      const result = await response.json();
      if (result.success && result.data) {
        setRateTiers(result.data);
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  // Auto-verify account
  const autoVerifyAccount = async () => {
    const accountNumber = formData.accountNumber.trim();
    const bvn = formData.bvn.trim();

    if (!accountNumber || !bvn) return;
    if (!/^[0-9]{10}$/.test(accountNumber)) return;
    if (!/^[0-9]{11}$/.test(bvn)) return;

    if (isVerifying) return;
    setIsVerifying(true);
    setVerificationStatus({ type: "verifying", message: "Verifying account..." });

    try {
      const response = await fetch("http://localhost:9000/mtd/mtd/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, bvn }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setVerificationStatus({
          type: "success",
          message: "✓ Account verified successfully!",
        });
        setCustomerData(result.data);
        setTimeout(() => {
          setCurrentStep("form");
        }, 1000);
      } else {
        setVerificationStatus({
          type: "error",
          message: `✗ ${result.error || result.message || "Verification failed"}`,
        });
      }
    } catch (error) {
      setVerificationStatus({
        type: "error",
        message: "✗ Failed to verify account. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Debounced verification
  useEffect(() => {
    if (verificationTimeoutRef.current) {
      clearTimeout(verificationTimeoutRef.current);
    }

    if (formData.accountNumber && formData.bvn && currentStep === "verification") {
      verificationTimeoutRef.current = setTimeout(() => {
        autoVerifyAccount();
      }, 1000);
    }

    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, [formData.accountNumber, formData.bvn, currentStep]);

  // Calculate profit rate and maturity date
  const calculateRateAndMaturity = async () => {
    const amount = parseFloat(formData.investmentAmount);
    const tenor = parseInt(formData.tenor);
    const effectiveDate = formData.effectiveDate;

    if (amount >= 50000000 && tenor && effectiveDate) {
      try {
        const url = `http://localhost:9000/mtd/mtd/rates/calculate?amount=${amount}&tenor=${tenor}&effectiveDate=${effectiveDate}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.success && result.data) {
          setExpectedProfitRate(parseFloat(result.data.rate));
        }
      } catch (error) {
        console.error("Error calculating rate:", error);
      }
    }

    // Calculate maturity date
    if (effectiveDate && tenor) {
      const effective = new Date(effectiveDate);
      const maturity = new Date(effective);
      maturity.setDate(maturity.getDate() + tenor);
      const formattedDate = maturity.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const maturityDateStr = maturity.toISOString().split("T")[0];
      setMaturityDate(`${formattedDate} (${maturityDateStr})`);
    } else {
      setMaturityDate("");
    }
  };

  useEffect(() => {
    if (formData.investmentAmount && formData.tenor && formData.effectiveDate) {
      const timeout = setTimeout(() => {
        calculateRateAndMaturity();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [formData.investmentAmount, formData.tenor, formData.effectiveDate]);

  // Handle signature upload
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setErrorMessage("Please upload an image file (JPG, PNG, or GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData({ ...formData, customerSignature: file, signatureBase64: base64 });
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate
    const amount = parseFloat(formData.investmentAmount);
    if (!amount || isNaN(amount) || amount < 50000000) {
      setErrorMessage("Investment amount must be at least ₦50,000,000.00");
      return;
    }

    const validTenors = [30, 60, 90, 180, 365];
    if (!validTenors.includes(parseInt(formData.tenor))) {
      setErrorMessage("Invalid tenor. Must be 30, 60, 90, 180, or 365 days");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.effectiveDate);
    if (selectedDate < today) {
      setErrorMessage("Effective date must be today or a future date");
      return;
    }

    if (!expectedProfitRate || expectedProfitRate === 0) {
      setErrorMessage("Unable to determine applicable rate");
      return;
    }

    if (!formData.signatureBase64) {
      setErrorMessage("Please upload your signature");
      return;
    }

    if (!formData.maturityInstruction) {
      setErrorMessage("Please select a maturity instruction");
      return;
    }

    // Show terms modal
    setShowTermsModal(true);
  };

  // Final submission
  const proceedWithSubmission = async () => {
    if (!termsModalAccepted) return;

    setIsSubmitting(true);
    setShowTermsModal(false);

    const submitData = {
      accountNumber: formData.accountNumber,
      bvn: formData.bvn,
      investmentAmount: parseFloat(formData.investmentAmount),
      effectiveDate: formData.effectiveDate,
      tenor: parseInt(formData.tenor),
      expectedProfitRate: expectedProfitRate,
      maturityInstruction: formData.maturityInstruction,
      staffId: formData.staffId || null,
      staffEmail: formData.staffEmail || null,
      customerSignature: formData.signatureBase64,
      customerData: {
        fullName: customerData?.fullName || "",
        email: customerData?.email || "",
        phoneNumber: customerData?.phoneNumber || "",
      },
    };

    try {
      const response = await fetch("http://localhost:9000/mtd/mtd/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setApplicationResult(result.data);
        setSubmitSuccess(true);
        setCurrentStep("form");
      } else {
        let errorMsg = "An error occurred";
        if (result.errors && Array.isArray(result.errors)) {
          errorMsg = result.errors
            .map((err: any) => `${err.param || err.field}: ${err.msg || err.message}`)
            .join("\n");
        } else if (result.message) {
          errorMsg = result.message;
        }
        setErrorMessage(errorMsg);
        setShowTermsModal(false);
      }
    } catch (error) {
      setErrorMessage("Failed to submit application. Please try again.");
      setShowTermsModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formatAmount = (amount: number) => {
    if (amount >= 1000000000) {
      return `N${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `N${(amount / 1000000).toFixed(0)}M`;
    }
    return `N${amount.toLocaleString()}`;
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white p-3 text-center z-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C6B07D] via-[#AF1F23] to-[#C6B07D]"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="w-24"></div>
            <Image
              src="https://res.cloudinary.com/summitbank/image/upload/v1757037165/Summit_Logo_2_why0cs.png"
              alt="Summit Bank Logo"
              width={120}
              height={48}
              className="mx-auto"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <span className="text-base font-bold">Mudarabah Term Deposit Application</span>
        </div>

        <div className="p-3">
          {/* Terms Section */}
          {currentStep === "terms" && (
            <div className="space-y-4">
              <div className="border-2 border-l-4 border-l-[#C6B07D] rounded-lg p-3 bg-white shadow-sm">
                <span className="text-base font-bold text-[#AF1F23] mb-2">Terms and Conditions</span>

                <p ><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Investment Overview</span></p>
                <span className="text-[#495057] mb-3 text-xs">
                  <strong>Mudarabah</strong> is a partnership where the Investor (Customer) provides capital and the
                  Investment Manager (Bank) invests the capital to generate profit.
                </span>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Eligibility</span></p>
                <span className="text-[#495057] mb-3 text-xs">
                  Customer must have an individual Current or Savings Account, or a corporate Current Account.
                </span>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Investment Details</span></p>
                <ul className="list-disc pl-4 text-[#495057] space-y-0.5 mb-3 text-xs">
                  <span>
                  <li>
                    <span><strong>Minimum Investment:</strong> N50,000,000.00 (Fifty Million Naira Only)</span>
                  </li>
                  <li>
                    <strong>Tenure Options:</strong> 30, 60, 90, 180, or 365 days
                  </li>
                  <li>
                    <strong>Currency:</strong> Nigerian Naira (NGN)
                  </li>
                  <li>
                    <strong>Profit Payout:</strong> Profits are paid monthly, calculated on monthly average balance
                  </li>
                  </span>
                </ul>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Expected Profit Rate Guide</span></p>
                <div className="overflow-x-auto my-2">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#C6B07D] to-[#b09d6c]">
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">Amount Range</th>
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">30 Days</th>
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">60 Days</th>
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">90 Days</th>
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">180 Days</th>
                        <th className="p-2 text-center text-[10px] font-bold text-[#2c3e50] uppercase">365 Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rateTiers.length > 0 ? (
                        rateTiers.map((tier, idx) => {
                          const minAmount = parseFloat(tier.min_amount);
                          const maxAmount = tier.max_amount ? parseFloat(tier.max_amount) : null;
                          let rangeText = formatAmount(minAmount);
                          if (maxAmount !== null) {
                            rangeText += ` - ${formatAmount(maxAmount)}`;
                          } else {
                            rangeText = `Above ${formatAmount(minAmount)}`;
                          }
                          return (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-[#faf8f3]" : ""}>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">{rangeText}</td>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">
                                {parseFloat(tier.tenor_30).toFixed(2)}%
                              </td>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">
                                {parseFloat(tier.tenor_60).toFixed(2)}%
                              </td>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">
                                {parseFloat(tier.tenor_90).toFixed(2)}%
                              </td>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">
                                {parseFloat(tier.tenor_180).toFixed(2)}%
                              </td>
                              <td className="p-2 text-center border-b border-[#e9ecef] text-xs">
                                {parseFloat(tier.tenor_365).toFixed(2)}%
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-5 text-center text-gray-500 text-sm">
                            Loading rates...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Rollover Policy</span></p>
                <span className="text-[#495057] mb-3 text-xs">
                  The Customer is required to notify the Bank in writing, on or before the maturity date, of their
                  intention to either roll over or discontinue the investment. In the absence of rollover instructions
                  by the maturity date, the investment shall be automatically terminated.
                </span>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Early Redemption</span></p>
                <span className="text-[#495057] mb-3 text-xs">
                  Early redemption will automatically result in profit paid on a prorated basis and a surcharge of 10%
                  on the profit.
                </span>

                <p><span className="text-sm font-semibold text-[#AF1F23] mt-2 mb-1">Important Notes</span></p>
                <ul className="list-disc pl-4 text-[#495057] space-y-0.5 text-xs">
                  <li>All profit rates are expected rates and subject to actual performance</li>
                  <li>This is a Shariah-compliant investment product</li>
                  <li>Terms and conditions are subject to change without prior notice</li>
                  <li>Please read all terms carefully before proceeding</li>
                </ul>
              </div>

              <div className="flex items-center p-2 bg-gradient-to-r from-[#faf8f3] to-[#f5f0e1] border-2 border-[#C6B07D] rounded-lg shadow-sm">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mr-2 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-[#333] cursor-pointer text-xs">
                  I have read and accept the terms and conditions
                </label>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setCurrentStep("verification")}
                  disabled={!termsAccepted}
                  className="px-5 py-1.5 bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white rounded-lg text-xs font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:shadow-lg transition-all disabled:hover:shadow-none"
                >
                  Proceed to Application
                </button>
              </div>
            </div>
          )}

          {/* Verification Section */}
          {currentStep === "verification" && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#AF1F23] border-b-2 border-[#C6B07D] pb-1">
                Account Verification
              </h3>
              <p className="text-[#6c757d] mb-4 text-xs">
                Please enter your account number and BVN. Verification will happen automatically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Account Number *</label>
                  <input
                    type="text"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })
                    }
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">BVN (11 digits) *</label>
                  <input
                    type="text"
                    pattern="[0-9]{11}"
                    maxLength={11}
                    value={formData.bvn}
                    onChange={(e) => setFormData({ ...formData, bvn: e.target.value.replace(/\D/g, "") })}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 text-xs"
                    required
                  />
                </div>
              </div>

              {verificationStatus.type && (
                <div
                  className={`p-2 rounded-lg text-xs ${
                    verificationStatus.type === "verifying"
                      ? "bg-gradient-to-r from-[#fff3cd] to-[#ffeaa7] border-2 border-[#ffc107] border-l-4 text-[#856404]"
                      : verificationStatus.type === "success"
                      ? "bg-gradient-to-r from-[#d4edda] to-[#c3e6cb] border-2 border-[#28a745] border-l-4 text-[#155724]"
                      : "bg-gradient-to-r from-[#f8d7da] to-[#f5c6cb] border-2 border-[#dc3545] border-l-4 text-[#721c24]"
                  }`}
                >
                  {verificationStatus.message}
                </div>
              )}

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setCurrentStep("terms")}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#C6B07D] to-[#b09d6c] text-[#333] rounded-lg text-xs font-semibold hover:shadow-lg transition-all"
                >
                  Back to Terms
                </button>
              </div>
            </div>
          )}

          {/* Form Section */}
          {currentStep === "form" && !submitSuccess && (
            <form onSubmit={handleSubmit} className="space-y-3">
              {errorMessage && (
                <div className="bg-[#f8d7da] border-2 border-[#dc3545] rounded-lg p-2 text-[#721c24] text-xs">
                  {errorMessage}
                </div>
              )}

              <h3 className="text-sm font-bold text-[#AF1F23] border-b-2 border-[#C6B07D] pb-1">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Full Name *</label>
                  <input
                    type="text"
                    value={customerData?.fullName || ""}
                    readOnly
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg bg-[#e9ecef] text-[#6c757d] text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Phone Number *</label>
                  <input
                    type="tel"
                    value={customerData?.phoneNumber || ""}
                    readOnly
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg bg-[#e9ecef] text-[#6c757d] text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Email Address *</label>
                  <input
                    type="email"
                    value={customerData?.email || ""}
                    readOnly
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg bg-[#e9ecef] text-[#6c757d] text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Account Type *</label>
                  <input
                    type="text"
                    value={customerData?.accountType || ""}
                    readOnly
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg bg-[#e9ecef] text-[#6c757d] text-xs"
                  />
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#AF1F23] border-b-2 border-[#C6B07D] pb-1 mt-4">
                Investment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Investment Amount (NGN) *</label>
                  <input
                    type="number"
                    min="50000000"
                    step="0.01"
                    value={formData.investmentAmount}
                    onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 text-xs"
                    required
                  />
                  <small className="text-[#6c757d] text-[10px]">Minimum: ₦50,000,000.00</small>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Tenor (Days) *</label>
                  <select
                    value={formData.tenor}
                    onChange={(e) => setFormData({ ...formData, tenor: e.target.value })}
                    disabled={!formData.investmentAmount || parseFloat(formData.investmentAmount) < 50000000}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 disabled:bg-[#e9ecef] disabled:text-[#6c757d] text-xs"
                    required
                  >
                    <option value="">Select Tenor</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                    <option value="365">365 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Effective Date *</label>
                  <input
                    type="date"
                    min={today}
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    disabled={!formData.investmentAmount || parseFloat(formData.investmentAmount) < 50000000}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 disabled:bg-[#e9ecef] disabled:text-[#6c757d] text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Maturity Date</label>
                  <input
                    type="text"
                    value={maturityDate}
                    readOnly
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg bg-[#e9ecef] text-[#6c757d] text-xs"
                  />
                </div>
              </div>

              {expectedProfitRate > 0 && (
                <div className="bg-gradient-to-r from-[#faf8f3] to-[#f5f0e1] border-2 border-[#C6B07D] rounded-lg p-2 text-center text-[#AF1F23] font-bold text-xs">
                  Expected Profit Rate: {expectedProfitRate.toFixed(2)}% per annum
                </div>
              )}

              <div>
                <label className="block mb-1 font-semibold text-[10px]">Maturity Instruction *</label>
                <div className="flex flex-wrap gap-2">
                  {["TERMINATE", "ROLLOVER_PRINCIPAL", "ROLLOVER_PRINCIPAL_PROFIT"].map((value) => (
                    <label
                      key={value}
                      className={`flex items-center p-2 bg-[#f8f9fa] border-2 rounded-lg cursor-pointer transition-all ${
                        formData.maturityInstruction === value
                          ? "border-[#AF1F23] bg-gradient-to-r from-[#faf8f3] to-[#f5f0e1]"
                          : "border-[#dee2e6] hover:border-[#C6B07D]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="maturityInstruction"
                        value={value}
                        checked={formData.maturityInstruction === value}
                        onChange={(e) => setFormData({ ...formData, maturityInstruction: e.target.value })}
                        className="w-4 h-4 mr-1.5"
                        required
                      />
                      <span className="text-xs">
                        {value === "TERMINATE"
                          ? "Terminate Investment"
                          : value === "ROLLOVER_PRINCIPAL"
                          ? "Rollover Principal Only"
                          : "Rollover Principal and Profit"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#AF1F23] border-b-2 border-[#C6B07D] pb-1 mt-4">
                Staff Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Staff ID</label>
                  <input
                    type="text"
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-[10px]">Staff Email</label>
                  <input
                    type="email"
                    value={formData.staffEmail}
                    onChange={(e) => setFormData({ ...formData, staffEmail: e.target.value })}
                    className="w-full p-2 border-2 border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#AF1F23] focus:ring-1 focus:ring-[#AF1F23]/20 text-xs"
                  />
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#AF1F23] border-b-2 border-[#C6B07D] pb-1 mt-4">
                Customer Signature
              </h3>

              <div>
                <label className="block mb-1 font-semibold text-[10px]">Customer Signature *</label>
                <input
                  type="file"
                  id="customerSignature"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
                <label
                  htmlFor="customerSignature"
                  className="block p-3 text-center border-2 border-dashed border-[#dee2e6] rounded-lg bg-[#f8f9fa] cursor-pointer hover:border-[#C6B07D] hover:bg-[#faf8f3] transition-all"
                >
                  <div className="text-xs mb-1">📎 Click to upload signature</div>
                  <small className="text-[#6c757d] text-[10px]">Accepted formats: JPG, PNG, GIF (Max 5MB)</small>
                </label>
                {formData.signatureBase64 && (
                  <div className="mt-3">
                    <img
                      src={formData.signatureBase64}
                      alt="Signature Preview"
                      className="max-w-full max-h-48 border-2 border-[#dee2e6] rounded-lg p-1"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, signatureBase64: "", customerSignature: null })}
                      className="mt-1 px-3 py-1 bg-gradient-to-r from-[#C6B07D] to-[#b09d6c] text-[#333] rounded-lg text-[10px] font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("verification")}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#C6B07D] to-[#b09d6c] text-[#333] rounded-lg text-xs font-semibold hover:shadow-lg transition-all"
                >
                  Back to Verification
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-1.5 bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white rounded-lg text-xs font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="text-center space-y-3">
              <div className="bg-gradient-to-r from-[#d4edda] to-[#c3e6cb] border-2 border-[#28a745] border-l-4 rounded-xl p-4">
                <span className="text-base font-bold text-[#155724] mb-2">✓ Application Submitted Successfully!</span>
                <p className="text-[#155724] text-xs">
                  <strong>Application ID:</strong> {applicationResult?.applicationId || "N/A"}
                </p>
                <p className="text-[#155724] text-xs">
                  <strong>Status:</strong> Waiting for Bank Approval
                </p>
                <p className="text-[#155724] mt-1 text-xs">{applicationResult?.message || "Application submitted successfully"}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="px-5 py-1.5 bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>

        {/* Terms Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-base">📋</div>
                <span className="text-sm font-semibold">Terms and Conditions</span>
              </div>
              <div className="p-3 overflow-y-auto flex-1">
                <span className="text-sm font-bold text-[#AF1F23] mb-2">
                  Mudarabah Term Deposit Account - Terms and Conditions
                </span>
                <div className="space-y-2 text-[#333] leading-relaxed text-xs">
                  <div>
                    <span className="font-semibold mb-2"><p>1. Account Balance Requirements</p></span>
                    <span className="mb-3">

                      Your Term Deposit Account balance must be untouched within the tenor agreed. Any withdrawal
                      within this period will automatically result in profit paid on a prorated basis and a surcharge of
                      10% on the profit.
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">2. Withholding Tax</p>
                    <span className="mb-3">
                      Withholding Tax will be charged on your share of the profit based on FIRS regulatory requirement.
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">3. Terms Modification</p>
                    <span className="mb-3">
                      The Bank reserves the right to add or alter any or all of the conditions governing this deposit
                      scheme, and such alteration or addition shall be communicated to you at the end of every
                      accounting period (month-end), with a seven (7) days grace period starting from the date of
                      notification to withdraw your balance if you do not agree with such changes.
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">4. Withdrawal Process</p>
                    <span className="mb-3">
                      There shall be no direct withdrawal from the Mudarabah Term Deposit account, all withdrawals shall
                      be routed through your savings or current account.
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">5. Rollover Policy</p>
                    <span className="mb-3">
                      You are required to inform the Bank in writing on or before the maturity date of your intention to
                      rollover or discontinue the investment. Your investment shall be automatically terminated if we
                      do not receive rollover instruction from you.
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Authorization</p>
                    <span className="mb-3">
                      By executing this letter, you hereby authorize the Bank to invest your funds in line with terms
                      and conditions for operating the Term Mudarabah Deposit Account under the principles of Mudarabah.
                      Profit will apply on the deposit proportionate to the number of days the funds have been in your
                      Term Deposit Account.
                    </span>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-[#f5f0e1] border-2 border-[#C6B07D] rounded-lg">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsModalAccepted}
                      onChange={(e) => setTermsModalAccepted(e.target.checked)}
                      className="w-4 h-4 mr-2 mt-0.5"
                      required
                    />
                    <span className="text-[#333] font-medium text-[10px] leading-relaxed">
                      I have read and understood the Terms and Conditions above. I agree to authorize the Bank to invest
                      my funds in line with these terms and conditions for operating the Mudarabah Term Deposit Account.
                    </span>
                  </label>
                </div>
              </div>
              <div className="p-3 bg-[#f8f9fa] flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowTermsModal(false);
                    setTermsModalAccepted(false);
                  }}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#C6B07D] to-[#b09d6c] text-[#333] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={proceedWithSubmission}
                  disabled={!termsModalAccepted}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#AF1F23] to-[#8a181b] text-white rounded-lg text-xs font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Accept & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

