import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { submitWeb3FormsContact } from '../services/api';
import { trackEvent } from '../utils/analytics';

const fallbackPersonal = {
  email: 'nagamounika624@gmail.com',
  phone: '+91 7331102982',
  location: 'Ongole, Andhra Pradesh, India',
};

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    field: 'email',
    bg: 'bg-[#EDE7FF]/30',
    iconBg: 'bg-[#EDE7FF]',
    iconColor: 'text-[#9180D8]',
  },
  {
    icon: Phone,
    label: 'Phone',
    field: 'phone',
    bg: 'bg-[#E5F2FF]/30',
    iconBg: 'bg-[#E5F2FF]',
    iconColor: 'text-blue-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    field: 'location',
    bg: 'bg-[#FFF0F4]/30',
    iconBg: 'bg-[#FFF0F4]',
    iconColor: 'text-pink-500',
  },
];

export default function Contact({ personal = {} }) {
  const info = { ...fallbackPersonal, ...personal };

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Please provide your name';
    } else if (form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!emailRegex.test(form.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!form.message.trim()) {
      errs.message = 'Please write a message';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot
    if (form.botcheck) {
      // Bot detected, silently reject without crashing
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await submitWeb3FormsContact(form);
      setStatus('success');
      trackEvent('contact_form_submit', {
        event_category: 'contact',
        event_label: form.subject || 'General Inquiry',
      });
      // Clear form ONLY after successful submission
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        botcheck: false,
      });
      setErrors({});
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err?.message || 'Failed to deliver message via Web3Forms. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        background:
          'linear-gradient(180deg, rgba(237,231,255,0.15) 0%, #FCFBFF 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5F2FF]/50 border border-[#E5F2FF]/70 mb-4">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26324A] mb-3">
            Contact Me
          </h2>
          <p className="text-[#707789] max-w-xl mx-auto">
            Have an internship opportunity, project collaboration, or question?
            Send me a message and it will be delivered directly to my inbox.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column – Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5"
          >
            {contactCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.field}
                  className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-[#EDE7FF]/60 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}
                  >
                    <IconComp className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#707789] uppercase tracking-wider mb-0.5">
                      {card.label}
                    </p>
                    <p className="text-sm font-semibold text-[#26324A]">
                      {info[card.field] || '—'}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Web3Forms & Zero-Database Architecture Card */}
            <div className="p-5 bg-white rounded-2xl border border-[#EDE7FF]/60 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E8F8F0] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#26324A] mb-1">
                    Direct Email Delivery (Zero Database)
                  </h4>
                  <p className="text-xs text-[#707789] leading-relaxed">
                    Powered by Web3Forms. Your message is dispatched securely and directly
                    to my inbox via encrypted transmission. No database permanently stores your message.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Honeypot anti-spam protection enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column – Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl border border-[#EDE7FF]/60 shadow-sm p-7 md:p-9">
              {/* Success Alert Banner */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#E8F8F0] border border-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Message Sent Successfully!
                    </p>
                    <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                      Thank you for contacting me. Your message was confirmed by Web3Forms and delivered directly to my email. I will respond to you shortly!
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Error Alert Banner */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#FFF0F4] border border-red-200"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-800">
                      Failed to Send Message
                    </p>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      {errorMessage}
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white border border-red-300 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Contact Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Web3Forms Honeypot Anti-Spam Checkbox */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={form.botcheck}
                    onChange={handleChange}
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#26324A] mb-1.5"
                      >
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        placeholder="Your full name"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors disabled:opacity-60 ${
                          errors.name
                            ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200 bg-red-50/20'
                            : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20 bg-[#FCFBFF] focus:bg-white'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#26324A] mb-1.5"
                      >
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors disabled:opacity-60 ${
                          errors.email
                            ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200 bg-red-50/20'
                            : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20 bg-[#FCFBFF] focus:bg-white'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-[#26324A] mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="e.g. Internship Inquiry / Project Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE7FF]/60 text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20 bg-[#FCFBFF] focus:bg-white disabled:opacity-60"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#26324A] mb-1.5"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="Write your message here (min. 10 characters)..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors resize-none disabled:opacity-60 ${
                        errors.message
                          ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200 bg-red-50/20'
                          : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20 bg-[#FCFBFF] focus:bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:shadow-md"
                    style={{
                      background:
                        'linear-gradient(135deg, #9180D8 0%, #6C83D8 100%)',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending via Web3Forms...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
