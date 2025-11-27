"use client";
import Button from "@/components/Button";
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Enquiry",
    accountNumber: "",
    subjectText: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Auto-derive full subject
  const derivedSubject = `${form.type}${
    form.type === "Complaint" && form.accountNumber
      ? ` | Acc: ${form.accountNumber}`
      : ""
  }: ${form.subjectText}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: form.type,
          accountNumber: form.accountNumber,
          subject: derivedSubject,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          type: "Enquiry",
          accountNumber: "",
          subjectText: "",
          message: "",
        });
      } else {
        setSuccess("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send message. Try again later.");
    }

    setLoading(false);
  };

  return (
    <DefaultLayout>
      <div>
        <SectionHero
          mainClass="!pt-[50px]"
          title="Enquiries & Complaints"
          text="Can’t find what you are looking for? Please contact us, and we will get back to you as soon as possible."
        />

        <form onSubmit={submit} className="main lg:!w-[60%] space-y-6 py-10 pb-20">
          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label>Email Address</label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Type Dropdown */}
          <div>
            <label>Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
            >
              <option>Enquiry</option>
              <option>Complaint</option>
              <option>Suggestion</option>
            </select>
          </div>

          {/* Account Number (for complaints) */}
          {form.type === "Complaint" && (
            <div>
              <label>Account Number</label>
              <Input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="Enter your account number"
                required
              />
            </div>
          )}

          {/* Subject */}
          <div>
            <label>Subject</label>
            <Input
              name="subjectText"
              value={form.subjectText}
              onChange={handleChange}
              placeholder="Enter your subject"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Full subject will be sent as: <strong>{derivedSubject}</strong>
            </p>
          </div>

          {/* Message */}
          <div>
            <label>Message</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="h-[200px] resize-none"
              placeholder="Type in your message here"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            custom={`!w-full mt-4 ${loading ? "opacity-50 pointer-events-none" : ""}`}
            type="primary"
            text={loading ? "Sending..." : "Submit"}
            buttonFn={submit}
          />
        </form>

        {success && <p className="text-center text-green-600 mt-4">{success}</p>}

        {/* Contact Email */}
        <div className="w-full flex justify-center items-center pb-12 px-4">
          <p className="text-lg text-center text-neutral-700 dark:text-neutral-200">
            You can also contact us by sending an email to{" "}
            <a
              href="mailto:contact@summitbankng.com"
              className="text-[var(--secondary-color)] underline hover:text-[var(--secondary-dark)]"
            >
              contact@summitbankng.com
            </a>
            .
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
