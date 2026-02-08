import React, { useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  HeadphonesIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Let's <span className="text-indigo-600">Connect</span> Together
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Have any questions or feedback ? We'd love to hear from you. Our
              team is here to help and will respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactCard
              icon={<Mail className="w-6 h-6 text-blue-800" />}
              iconBg="bg-blue-100"
              title="Email Us"
              content="support@collabspace.com"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6 text-green-800" />}
              iconBg="bg-green-100"
              title="Call Us"
              content="+977 981-426-5591"
            />
            <ContactCard
              icon={<MapPin className="w-6 h-6 text-purple-800" />}
              iconBg="bg-purple-100"
              title="Visit Us"
              content="Kathmandu, Nepal"
            />
            <ContactCard
              icon={<Clock className="w-6 h-6 text-orange-800" />}
              iconBg="bg-orange-100"
              title="Working Hours"
              content="Mon-Fri, 9AM-6PM NPT"
            />
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Form */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-base text-slate-600 mb-8 text-justify">
                Fill out the form below and our team will get back to you within
                24 hours. We're here to help with any questions, concerns, or
                feedback you may have.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-slate-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-slate-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.subject
                        ? "border-red-500 bg-red-50"
                        : "border-slate-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border ${
                      errors.message
                        ? "border-red-500 bg-red-50"
                        : "border-slate-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? "bg-green-600 text-white"
                      : isSubmitting
                        ? "bg-indigo-400 text-white cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right - Info Cards */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Other Ways to Reach Us
              </h2>

              {/* Support Center */}
              <InfoCard
                icon={<HeadphonesIcon className="w-8 h-8 text-blue-800" />}
                iconBg="bg-blue-100"
                title="Support Center"
                description="Browse our comprehensive help documentation, tutorials, and FAQs to find quick answers."
                actionText="Visit Help Center"
                gradient="from-blue-600 to-indigo-600"
              />

              {/* Live Chat */}
              <InfoCard
                icon={<MessageSquare className="w-8 h-8 text-purple-800" />}
                iconBg="bg-purple-100"
                title="Live Chat"
                description="Get instant help from our support team. Available Monday to Friday, 9 AM to 6 PM PST."
                actionText="Start Live Chat"
                gradient="from-purple-600 to-pink-600"
              />

              {/* Enterprise Sales */}
              <InfoCard
                icon={<Mail className="w-8 h-8 text-green-800" />}
                iconBg="bg-green-100"
                title="Enterprise Sales"
                description="Interested in CollabSpace for your organization? Let's discuss custom solutions for your team."
                actionText="Contact Sales"
                gradient="from-green-600 to-emerald-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Quick answers to questions you may have
          </p>
          <div className="space-y-6">
            <FAQItem
              question="What is your response time?"
              answer="We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line."
            />
            <FAQItem
              question="Do you offer custom enterprise solutions?"
              answer="Yes! We work with enterprise clients to create custom solutions tailored to their specific needs. Contact our sales team to learn more."
            />
            <FAQItem
              question="Can I schedule a demo?"
              answer="Absolutely! You can request a personalized demo by filling out the contact form above or by calling our sales team directly."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, PayPal, and bank transfers for enterprise plans. All payments are processed securely."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  content: string;
}

function ContactCard({ icon, iconBg, title, content }: ContactCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
      <div
        className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{content}</p>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  actionText: string;
  gradient: string;
}

function InfoCard({
  icon,
  iconBg,
  title,
  description,
  actionText,
  gradient,
}: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6">
        <div
          className={`w-16 h-16 ${iconBg} rounded-xl flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {description}
        </p>
        <button
          className={`w-full py-2.5 bg-linear-to-r ${gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-all`}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ⏷
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-justify">{answer}</p>
        </div>
      )}
    </div>
  );
}
