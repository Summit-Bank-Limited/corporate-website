"use client";
import Button from "@/components/Button";
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://products.summitbankng.com/mtd/enquiry/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Enquiry submitted successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        const errorMessage = result.error || result.message || "Failed to submit enquiry. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #dee2e6',
          },
          success: {
            iconTheme: {
              primary: '#28a745',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },
          },
        }}
      />
      <div>
        <SectionHero
          mainClass="!pt-[50px]"
          title="Enquiries & Complaints"
          text="Can't find what you are looking for? Please contact us, and we will get back to you as soon as possible."
        />
        <div className="main lg:!w-[60%] space-y-6 py-10 pb-20">
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
          <div>
            <label>Message *</label>
            <Textarea
              className="h-[200px] resize-none"
              placeholder="Type in your message here"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <Button
            custom="!w-full"
            type="primary"
            text={isSubmitting ? "Submitting..." : "Submit"}
            buttonFn={submit}
            loading={isSubmitting}
          />
        </div>

        {/* Centered email contact message */}
        <div className="w-full flex justify-center items-center pb-12 px-4">
          <p className="text-lg text-center text-neutral-700 dark:text-neutral-200">
            You can also contact us by sending an email to{" "}
            <a
              href="mailto:contactsummit@summitbankng.com"
              className="text-[var(--secondary-color)] underline hover:text-[var(--secondary-dark)]"
            >
              contactsummit@summitbankng.com
            </a>
            .
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
