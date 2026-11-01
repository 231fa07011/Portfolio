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
} from 'lucide-react';
import { submitContactForm } from '../services/api';

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
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Invalid email address';
    }
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await submitContactForm(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err?.message || 'Something went wrong. Please try again.'
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
            Have a question or want to work together? Drop me a message and
            I&apos;ll get back to you as soon as possible.
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
                  className={`group flex items-center gap-4 p-5 bg-white rounded-2xl border border-[#EDE7FF]/60 shadow-sm hover:shadow-md transition-all duration-300`}
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

            {/* Architecture Note */}
            <div className="p-5 bg-white rounded-2xl border border-[#EDE7FF]/60 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E8F8F0] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#26324A] mb-1">
                    Zero-Database Architecture
                  </h4>
                  <p className="text-xs text-[#707789] leading-relaxed">
                    Messages are delivered directly via email transporter — no
                    database stores your data. Your privacy is protected by
                    design.
                  </p>
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
              {/* Success Alert */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#E8F8F0]/50 border border-[#E8F8F0]"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      Message Sent Successfully!
                    </p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Thank you for reaching out. I&apos;ll get back to you
                      soon.
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Error Alert */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-[#FFF0F4]/50 border border-[#FFF0F4]"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      Failed to Send
                    </p>
                    <p className="text-xs text-red-600 mt-0.5">
                      {errorMessage}
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Try again
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Contact Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                        placeholder="Your full name"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors ${
                          errors.name
                            ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200'
                            : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20'
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
                        placeholder="you@email.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors ${
                          errors.email
                            ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200'
                            : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20'
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
                      placeholder="What's this about?"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE7FF]/60 text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20"
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
                      placeholder="Tell me about your project or question..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#26324A] placeholder:text-[#707789]/50 outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200'
                          : 'border-[#EDE7FF]/60 focus:border-[#9180D8] focus:ring-1 focus:ring-[#9180D8]/20'
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        'linear-gradient(135deg, #9180D8 0%, #7b6bc4 100%)',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
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
