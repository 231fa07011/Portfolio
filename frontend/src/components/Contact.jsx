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
    label: 'Email Address',
    field: 'email',
    iconBg: 'bg-[#EDE7FF] dark:bg-purple-950/60',
    iconColor: 'text-[#9180D8] dark:text-[#C4B5FD]',
  },
  {
    icon: Phone,
    label: 'Phone Contact',
    field: 'phone',
    iconBg: 'bg-[#E5F2FF] dark:bg-sky-950/60',
    iconColor: 'text-[#0284C7] dark:text-[#38BDF8]',
  },
  {
    icon: MapPin,
    label: 'Current Location',
    field: 'location',
    iconBg: 'bg-[#E0F2F1] dark:bg-teal-950/60',
    iconColor: 'text-[#0D9488] dark:text-[#2DD4BF]',
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
      // Clear form ONLY after confirmed submission
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
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-[#0B0F19] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFBFF] dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-800 shadow-xs mb-3">
            <Mail className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#9180D8] dark:text-[#C4B5FD]">
              Direct Contact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Have an internship opportunity, project collaboration, or inquiry?
            Send me a message and it will be delivered directly to my inbox.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column – Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {contactCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.field}
                  className="group flex items-center gap-4 p-5 bg-[#FAF9F6] dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 shadow-xs hover:border-[#9180D8]/40 transition-all"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                    <IconComp className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-0.5">
                      {card.label}
                    </p>
                    <p className="text-sm font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
                      {info[card.field] || '—'}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Web3Forms & Zero-Database Architecture Card */}
            <div className="p-6 bg-[#FAF9F6] dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#E8F8F0] dark:bg-emerald-950/60 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                    Direct Email Delivery (Zero Database)
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    Powered by Web3Forms. Messages are encrypted and dispatched directly
                    to my Gmail inbox. No database permanently stores personal contact logs.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Honeypot anti-spam protection active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column – Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9F6] dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 shadow-xs p-7 sm:p-9">
              {/* Success Alert Banner */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#E8F8F0] dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Message Sent Successfully!
                    </p>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                      Thank you! Your message was confirmed by Web3Forms and delivered directly to my email. I will respond to you shortly!
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 transition-colors cursor-pointer"
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
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#FFF0F4] dark:bg-rose-950/60 border border-red-200 dark:border-rose-800"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900 dark:text-rose-200">
                      Failed to Send Message
                    </p>
                    <p className="text-xs text-red-800 dark:text-rose-300 mt-1 leading-relaxed">
                      {errorMessage}
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-red-300 dark:border-rose-700 text-xs font-semibold text-red-700 dark:text-rose-300 hover:bg-red-50 transition-colors cursor-pointer"
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
                        className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#E2E8F0] mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8]/60 outline-none transition-colors disabled:opacity-60 ${
                          errors.name
                            ? 'border-red-300 dark:border-rose-700 bg-red-50/20 dark:bg-rose-950/20'
                            : 'border-[#EDE7FF] dark:border-slate-700 focus:border-[#9180D8] bg-white dark:bg-slate-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#E2E8F0] mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8]/60 outline-none transition-colors disabled:opacity-60 ${
                          errors.email
                            ? 'border-red-300 dark:border-rose-700 bg-red-50/20 dark:bg-rose-950/20'
                            : 'border-[#EDE7FF] dark:border-slate-700 focus:border-[#9180D8] bg-white dark:bg-slate-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#E2E8F0] mb-2"
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
                      placeholder="e.g. Internship Inquiry / Web Project"
                      className="w-full px-4 py-3 rounded-2xl border border-[#EDE7FF] dark:border-slate-700 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#9180D8] bg-white dark:bg-slate-800 disabled:opacity-60"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#E2E8F0] mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="Write your message here (min. 10 characters)..."
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8]/60 outline-none transition-colors resize-none disabled:opacity-60 ${
                        errors.message
                          ? 'border-red-300 dark:border-rose-700 bg-red-50/20 dark:bg-rose-950/20'
                          : 'border-[#EDE7FF] dark:border-slate-700 focus:border-[#9180D8] bg-white dark:bg-slate-800'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-md shadow-[#9180D8]/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
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
