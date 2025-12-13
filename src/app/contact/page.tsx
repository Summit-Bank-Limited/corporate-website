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
    // Remove prefix if accidentally typed
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
        nubanAccountNumber: formData.subjectType === "Complaints" ? formData.nubanAccountNumber.trim() : "",
        message: formData.message.trim(),
      };

      console.log("Submitting:", payload);
      toast.success("Form is ready to submit (currently disabled).");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subjectType: "Enquiries",
        subjectText: "",
        nubanAccountNumber: "",
        message: "",
      });
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
          title="Enquiries & Complaints"
          text="Can't find what you are looking for? Please contact us, and we will get back to you as soon as possible."
        />

        <form onSubmit={handleSubmit} className="main lg:!w-[60%] space-y-6 py-10 pb-20">
          {/* Full Name */}
          <div>
            <label>Full Name *</label>
            <Input
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
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
            <label>Subject Type *</label>
            <select
              value={formData.subjectType}
              onChange={(e) => setFormData({ ...formData, subjectType: e.target.value })}
              className="w-full border p-2 rounded"
              disabled={isSubmitting}
            >
              <option value="Enquiries">Enquiries</option>
              <option value="Complaints">Complaints</option>
            </select>
          </div>

          {/* Subject Text with fixed prefix */}
          <div>
            <label>Subject *</label>
            <Input
              placeholder="Enter your subject"
              value={prefix + formData.subjectText}
              onChange={(e) => handleSubjectTextChange(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Nuban Account Number (conditional) */}
          {formData.subjectType === "Complaints" && (
            <div>
              <label>Nuban Account Number *</label>
              <Input
                placeholder="Enter your 10-digit Nuban account number"
                value={formData.nubanAccountNumber}
                maxLength={10}
                onChange={(e) => setFormData({ ...formData, nubanAccountNumber: e.target.value.replace(/\D/, '') })}
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Message */}
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
            <p className="text-sm text-gray-500">{formData.message.length}/{messageCharacterLimit} characters</p>
          </div>

          {/* Submit Button */}
          <Button
            custom={`!w-full mt-4 opacity-50 pointer-events-none`} // Disabled for now
            type="primary"
            text="Submit"
            buttonFn={handleSubmit}
            loading={isSubmitting}
          />
        </form>

        {/* Contact Email */}
        <div className="w-full flex justify-center items-center pb-12 px-4">
          <p className="text-lg text-center text-neutral-700 dark:text-neutral-200">
            You can also contact us by sending an email to{" "}
            <a
              href="mailto:contact@summitbankng.com"
              className="text-[var(--secondary-color)] underline hover:text-[var(--secondary-dark)]"
            >
              contact@summitbankng.com
            </a>.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
