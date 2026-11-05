import React, { useState } from 'react';
import { useAuth } from '../../services/authContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const Contact: React.FC = () => {
  const { addToast } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('success', 'Inquiry Dispatched', 'Thank you. The school administration office will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Connect With Us</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Campus Administration</h1>
          <p className="text-slate-600 text-sm">
            We are here to assist prospective guardians, students, and education partners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Campus Location & Office</h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Physical Address</strong>
                    <span>House 12, Road 5, Block B, Mirpur-10, Dhaka-1216, Bangladesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Helpline & Reception</strong>
                    <span>+880 2 55000000 / +880 1711-100200</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries</strong>
                    <span>info@greenfield.edu.bd / principal@greenfield.edu.bd</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Office & Visitor Hours</strong>
                    <span>Sunday to Thursday: 8:00 AM - 4:00 PM (Friday & Govt. Holidays Closed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 text-center space-y-2">
              <MapPin className="w-8 h-8 text-sky-400 mx-auto" />
              <h3 className="font-bold text-sm">Strategic Metro Accessibility</h3>
              <p className="text-xs text-slate-300">
                Located just 3 minutes walk from Mirpur-10 MRT Metro Rail Station (Exit 2).
              </p>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Message Received</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our academic admission coordinator will review your query and reply to {formData.email || 'your email'} within one business day.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Send Direct Inquiry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariqul Islam"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariqul@gmail.com"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1819-xxxxxx"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Purpose *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                    >
                      <option value="Admission Query">Admission Query 2026</option>
                      <option value="Fee Structure">Fee Structure & Scholarship</option>
                      <option value="Transfer Certificate">Transfer Certificate (TC)</option>
                      <option value="General Information">General School Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your questions or notes here..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                    Send Message to School
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
