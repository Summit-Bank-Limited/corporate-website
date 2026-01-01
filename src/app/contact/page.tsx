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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `${formData.subjectType}: ${formData.subjectText.trim()}`,
        nubanAccountNumber:
          formData.subjectType === "Complaints"
            ? formData.nubanAccountNumber.trim()
            : undefined,
        message: formData.message.trim(),
      };

      const response = await fetch("https://products.summitbankng.com/mtd/enquiry/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
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
        });
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
          title="Enquiries, Complaints & Dispense Errors"
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
              onChange={(e) => setFormData({ ...formData, subjectType: e.target.value })}
              className="w-full border p-2 rounded"
              disabled={isSubmitting}
            >
              <option value="Enquiries">Enquiries</option>
              <option value="Complaints">Complaints</option>
              <option value="Dispense Error">Dispense Error</option>
            </select>
          </div>

          <div>
            <label>Subject *</label>
            <Input
              placeholder="Enter your subject"
              value={prefix + formData.subjectText}
              onChange={(e) => handleSubjectTextChange(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

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
                  type="number"
                  placeholder="Enter Transaction/Session ID"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last6Digits: e.target.value.replace(/\D/, ""),
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

          <Button
            custom="!w-full mt-4"
            type="primary"
            text="Submit"
            buttonFn={handleSubmit}
            loading={isSubmitting}
          />
        </form>
      </div>
    </DefaultLayout>
  );
}
