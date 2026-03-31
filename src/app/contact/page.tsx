"use client";

import Button from "@/components/Button";
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subjectType: "Enquiries",
    subjectText: "",
    nubanAccountNumber: "",
    message: "",
    last6Digits: "",
    amount: "",
    amountFormatted: "",
    transactionID: "",
    channel: "",
    startDate: "",
    endDate: "",
    customerId: "",
    token: "",
    etokenAccountNumber: "",
    etokenAccountName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(false);
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);

  const messageCharacterLimit = 1500;

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.subjectType === "eToken Request") {
      if (!formData.customerId.trim()) {
        toast.error("Please enter Customer ID");
        return false;
      }
      if (!/^\d+$/.test(formData.customerId)) {
        toast.error("Customer ID must contain only digits");
        return false;
      }
      if (!formData.token.trim()) {
        toast.error("Please enter token");
        return false;
      }
      if (!/^\d+$/.test(formData.token)) {
        toast.error("Token must contain only digits");
        return false;
      }
      if (!tokenValidated) {
        toast.error("Please validate token before submitting request");
        return false;
      }
      if (!formData.etokenAccountNumber.trim()) {
        toast.error("Please enter account number");
        return false;
      }
      if (!/^\d+$/.test(formData.etokenAccountNumber)) {
        toast.error("Account number must contain only digits");
        return false;
      }
      if (!formData.etokenAccountName.trim()) {
        toast.error("Please enter account name");
        return false;
      }
      return true;
    }
    if (!formData.subjectText.trim()) {
      toast.error("Please enter a subject");
      return false;
    }
    if (formData.subjectType === "Complaints") {
      if (!formData.nubanAccountNumber.trim()) {
        toast.error("Please enter your Nuban Account Number for complaints");
        return false;
      }
      const accountRegex = /^\d{10}$/;
      if (!accountRegex.test(formData.nubanAccountNumber)) {
        toast.error("Nuban Account Number must be exactly 10 digits");
        return false;
      }
    }
    if (formData.subjectType === "Dispense Error") {
      if (!formData.nubanAccountNumber.trim()) {
        toast.error("Please enter your Nuban Account Number");
        return false;
      }
      const accountRegex = /^\d{10}$/;
      if (!accountRegex.test(formData.nubanAccountNumber)) {
        toast.error("Nuban Account Number must be exactly 10 digits");
        return false;
      }
      if (!formData.last6Digits.trim()) {
        toast.error("Please enter the last 6 digits of your card");
        return false;
      }
      const cardDigitsRegex = /^\d{6}$/;
      if (!cardDigitsRegex.test(formData.last6Digits)) {
        toast.error("Last 6 digits of card must be exactly 6 digits");
        return false;
      }
      if (!formData.amount.trim()) {
        toast.error("Please enter the transaction amount");
        return false;
      }
      const amountNum = parseFloat(formData.amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        toast.error("Please enter a valid transaction amount");
        return false;
      }
      if (!formData.transactionID.trim()) {
        toast.error("Please enter the Transaction/Session ID");
        return false;
      }
      if (!formData.channel.trim()) {
        toast.error("Please select a channel");
        return false;
      }
      if (!formData.startDate.trim()) {
        toast.error("Please enter the transaction date");
        return false;
      }
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    return true;
  };

  const handleSubjectTextChange = (value: string) => {
    const prefix = `${formData.subjectType}: `;
    if (value.startsWith(prefix)) {
      setFormData({ ...formData, subjectText: value.slice(prefix.length) });
    } else {
      setFormData({ ...formData, subjectText: value });
    }
  };

  // Helper function to convert date from YYYY-MM-DD to dd/mm/yyyy
  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (formData.subjectType === "eToken Request") {
        const etokenResponse = await fetch('/api/mtd/etoken/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNumber: formData.etokenAccountNumber.trim(),
            accountName: formData.etokenAccountName.trim(),
            email: formData.email.trim(),
          }),
        });

        const etokenResult = await etokenResponse.json();
        if (etokenResponse.ok && etokenResult.success) {
          toast.success(etokenResult.message || "eToken request submitted successfully.");
          setFormData({
            name: "",
            email: "",
            subjectType: "Enquiries",
            subjectText: "",
            nubanAccountNumber: "",
            message: "",
            last6Digits: "",
            amount: "",
            amountFormatted: "",
            transactionID: "",
            channel: "",
            startDate: "",
            endDate: "",
            customerId: "",
            token: "",
            etokenAccountNumber: "",
            etokenAccountName: "",
          });
          setTokenGenerated(false);
          setTokenValidated(false);
        } else {
          toast.error(etokenResult.error || "Failed to submit eToken request.");
        }
        return;
      }

      const payload: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subjectType: formData.subjectType,
        subject: `${formData.subjectType}: ${formData.subjectText.trim()}`,
        message: formData.message.trim(),
      };

      // Add fields based on subject type
      if (formData.subjectType === "Complaints") {
        payload.nubanAccountNumber = formData.nubanAccountNumber.trim();
      } else if (formData.subjectType === "Dispense Error") {
        payload.nubanAccountNumber = formData.nubanAccountNumber.trim();
        payload.last6DigitsOfCard = formData.last6Digits.trim();
        payload.amount = formData.amount.trim();
        payload.transactionSessionId = formData.transactionID.trim();
        payload.channel = formData.channel.trim();
        payload.transactionDate = formatDateForAPI(formData.startDate);
      }

      const response = await fetch('/api/mtd/enquiry/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || "Enquiry submitted successfully.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subjectType: "Enquiries",
          subjectText: "",
          nubanAccountNumber: "",
          message: "",
          last6Digits: "",
          amount: "",
          amountFormatted: "",
          transactionID: "",
          channel: "",
          startDate: "",
          endDate: "",
          customerId: "",
          token: "",
          etokenAccountNumber: "",
          etokenAccountName: "",
        });
        setTokenGenerated(false);
        setTokenValidated(false);
      } else {
        toast.error(result.error || "Failed to submit enquiry.");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const prefix = `${formData.subjectType}: `;

  const handleGenerateToken = async () => {
    if (!formData.customerId.trim()) {
      toast.error("Please enter Customer ID");
      return;
    }
    if (!/^\d+$/.test(formData.customerId)) {
      toast.error("Customer ID must contain only digits");
      return;
    }

    setIsGeneratingToken(true);
    try {
      const response = await fetch('/api/mtd/etoken/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: formData.customerId.trim() }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setTokenGenerated(true);
        setTokenValidated(false);
        toast.success("Token generated successfully. Please enter the token.");
      } else {
        toast.error(result.error || "Failed to generate token.");
      }
    } catch (error) {
      console.error("Error generating token:", error);
      toast.error("Failed to generate token. Please try again.");
    } finally {
      setIsGeneratingToken(false);
    }
  };

  const handleValidateToken = async () => {
    if (!formData.customerId.trim()) {
      toast.error("Please enter Customer ID");
      return;
    }
    if (!formData.token.trim()) {
      toast.error("Please enter token");
      return;
    }
    if (!/^\d+$/.test(formData.token)) {
      toast.error("Token must contain only digits");
      return;
    }

    setIsValidatingToken(true);
    try {
      const response = await fetch('/api/mtd/etoken/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: formData.customerId.trim(),
          token: formData.token.trim(),
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setTokenValidated(true);
        toast.success("Token validated successfully. You can now submit your request.");
      } else {
        setTokenValidated(false);
        toast.error(result.error || "Failed to validate token.");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setTokenValidated(false);
      toast.error("Failed to validate token. Please try again.");
    } finally {
      setIsValidatingToken(false);
    }
  };

  return (
    <DefaultLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#fff", color: "#333", border: "1px solid #dee2e6" },
          success: { iconTheme: { primary: "#28a745", secondary: "#fff" } },
          error: { iconTheme: { primary: "#dc3545", secondary: "#fff" } },
        }}
      />
      <div>
        <SectionHero
          mainClass="!pt-[50px]"
          title="Enquiries, Complaints, Dispense Errors & eToken Request"
          text="Can't find what you are looking for? Please contact us, and we will get back to you as soon as possible."
        />

        <form onSubmit={handleSubmit} className="main lg:!w-[60%] space-y-6 py-10 pb-20">
          <div>
            <label>Full Name *</label>
            <Input
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label>Email Address *</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          {/* Subject Type */}
          <div>
            <label>Subject Type (Click the DropDown) *</label>
            <select
              value={formData.subjectType}
              onChange={(e) => {
                const nextSubjectType = e.target.value;
                setFormData({
                  ...formData,
                  subjectType: nextSubjectType,
                  customerId: nextSubjectType === "eToken Request" ? formData.customerId : "",
                  token: nextSubjectType === "eToken Request" ? formData.token : "",
                  etokenAccountNumber: nextSubjectType === "eToken Request" ? formData.etokenAccountNumber : "",
                  etokenAccountName: nextSubjectType === "eToken Request" ? formData.etokenAccountName : "",
                });
                if (nextSubjectType !== "eToken Request") {
                  setTokenGenerated(false);
                  setTokenValidated(false);
                }
              }}
              className="w-full border p-2 rounded"
              disabled={isSubmitting}
            >
              <option value="Enquiries">Enquiries</option>
              <option value="Complaints">Complaints</option>
              <option value="Dispense Error">Dispense Error</option>
              <option value="eToken Request">eToken Request</option>
            </select>
          </div>

          {formData.subjectType !== "eToken Request" && (
            <div>
              <label>Subject *</label>
              <Input
                placeholder="Enter your subject"
                value={prefix + formData.subjectText}
                onChange={(e) => handleSubjectTextChange(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {formData.subjectType === "eToken Request" && (
            <div className="space-y-4 rounded-lg border p-4">
              <p className="text-sm text-gray-600">
                Follow the secure steps below to complete your eToken request.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Customer ID *</label>
                  <Input
                    placeholder="Enter customer ID"
                    value={formData.customerId}
                    onChange={(e) => {
                      setFormData({ ...formData, customerId: e.target.value.replace(/\D/g, "") });
                      setTokenGenerated(false);
                      setTokenValidated(false);
                    }}
                    disabled={isSubmitting || isGeneratingToken || isValidatingToken}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleGenerateToken}
                    disabled={isSubmitting || isGeneratingToken || isValidatingToken}
                    className="h-[45px] cursor-pointer hover:shadow-xl flex items-center justify-center w-full text-center px-6 transition-all duration-300 hover:px-8 py-2 border rounded-lg bg-[var(--secondary-color)] border-[var(--secondary-color)] text-white disabled:bg-gray-400 disabled:text-gray-500"
                  >
                    {isGeneratingToken ? "Generating..." : "Generate Token"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Token *</label>
                  <Input
                    placeholder="Enter token"
                    value={formData.token}
                    onChange={(e) => {
                      setFormData({ ...formData, token: e.target.value.replace(/\D/g, "") });
                      setTokenValidated(false);
                    }}
                    disabled={isSubmitting || isValidatingToken || !tokenGenerated}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleValidateToken}
                    disabled={isSubmitting || isValidatingToken || !tokenGenerated}
                    className="h-[45px] cursor-pointer hover:shadow-xl flex items-center justify-center w-full text-center px-6 transition-all duration-300 hover:px-8 py-2 border rounded-lg bg-[var(--secondary-color)] border-[var(--secondary-color)] text-white disabled:bg-gray-400 disabled:text-gray-500"
                  >
                    {isValidatingToken ? "Validating..." : "Validate Token"}
                  </button>
                </div>
              </div>

              {tokenValidated && <p className="text-sm text-green-600">Token validated successfully.</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Account Number *</label>
                  <Input
                    placeholder="Enter account number"
                    value={formData.etokenAccountNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, etokenAccountNumber: e.target.value.replace(/\D/g, "") })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label>Account Name *</label>
                  <Input
                    placeholder="Enter account name"
                    value={formData.etokenAccountName}
                    onChange={(e) => setFormData({ ...formData, etokenAccountName: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          )}

          {formData.subjectType === "Complaints" && (
            <div>
              <label>Nuban Account Number *</label>
              <Input
                placeholder="Enter your 10-digit Nuban account number"
                value={formData.nubanAccountNumber}
                maxLength={10}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nubanAccountNumber: e.target.value.replace(/\D/, ""),
                  })
                }
                disabled={isSubmitting}
              />
            </div>
          )}

          {formData.subjectType === "Dispense Error" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NUBAN Account Number */}
              <div>
                <label>Nuban Account Number *</label>
                <Input
                  placeholder="Enter your 10-digit Nuban account number"
                  value={formData.nubanAccountNumber}
                  maxLength={10}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nubanAccountNumber: e.target.value.replace(/\D/, ""),
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>

              {/* Last 6 Digits of Card */}
              <div>
                <label>Last 6 Digits of Card *</label>
                <Input
                  placeholder="Enter last 6 digits of your card"
                  value={formData.last6Digits}
                  maxLength={6}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last6Digits: e.target.value.replace(/\D/, ""),
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>

              {/* Amount */}
              <div>
                <label>Amount *</label>
                <Input
                  type="text"
                  placeholder="Enter transaction amount"
                  value={formData.amountFormatted || ""}
                  onChange={(e) => {
                    // Remove non-digit and non-decimal characters
                    const rawValue = e.target.value.replace(/[^0-9.]/g, "");

                    // Format with commas
                    const parts = rawValue.split(".");
                    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    const formattedValue = parts.length > 1
                      ? `${integerPart}.${parts[1].slice(0, 2)}` // allow 2 decimals
                      : integerPart;

                    setFormData({
                      ...formData,
                      amount: rawValue,             // raw number for submission
                      amountFormatted: formattedValue, // formatted for display
                    });
                  }}
                  disabled={isSubmitting}
                />
              </div>
              {/* Transaction/Session ID */}
              <div>
                <label>Transaction/Session ID *</label>
                <Input
                  type="text"
                  placeholder="Enter Transaction/Session ID"
                  value={formData.transactionID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionID: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>

              {/* Channel */}
              <div>
                <label>Channel *</label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.channel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channel: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                >
                  <option value="">Select Channel</option>
                  <option value="ATM">ATM</option>
                  <option value="POS">POS</option>
                  <option value="WEB">WEB</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>

              {/* Transaction Date */}
              <div>
                <label>Transaction Date *</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  max={new Date(Date.now() - 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}
      
          {formData.subjectType !== "eToken Request" && (
            <div>
              <label>Message * (max {messageCharacterLimit} characters)</label>
              <Textarea
                name="message"
                value={formData.message}
                maxLength={messageCharacterLimit}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="h-[200px] resize-none"
                placeholder="Type in your message here"
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500">
                {formData.message.length}/{messageCharacterLimit} characters
              </p>
            </div>
          )}

          <Button
            custom="!w-full mt-4"
            type="primary"
            text={formData.subjectType === "eToken Request" ? "Submit eToken Request" : "Submit"}
            buttonFn={handleSubmit}
            loading={isSubmitting}
          />
        </form>
      </div>
    </DefaultLayout>
  );
}
