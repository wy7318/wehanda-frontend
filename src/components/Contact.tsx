import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handlePrefillMessage = (event: CustomEvent<{ message: string }>) => {
      setFormState(prev => ({
        ...prev,
        message: event.detail.message
      }));
    };

    window.addEventListener('prefillMessage', handlePrefillMessage as EventListener);

    return () => {
      window.removeEventListener('prefillMessage', handlePrefillMessage as EventListener);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nameParts = formState.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'Wehanda')
        .single();

      if (orgError) throw orgError;
      if (!orgData?.id) throw new Error('Default organization not found');

      const { error: leadError } = await supabase
        .from('leads')
        .insert([{
          organization_id: orgData.id,
          first_name: firstName,
          last_name: lastName,
          email: formState.email,
          company: formState.company,
          phone: formState.phone || null,
          description: formState.message,
          status: 'New',
          lead_source: 'web',
          created_by: '9754b84d-c65c-45b8-8f51-a59a9a25edcd',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }]);

      if (leadError) throw leadError;

      setSuccess(true);
      setFormState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#037ffc] to-[#0265ca]">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ready to transform your restaurant business? Let's talk about how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="rounded-full bg-[#037ffc]/10 p-3 text-[#037ffc] group-hover:bg-[#037ffc] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email Us</h4>
                    <a 
                      href="mailto:matt.lee@sumisubi.com" 
                      className="text-gray-600 hover:text-[#037ffc] transition-colors"
                    >
                      matt.lee@sumisubi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="rounded-full bg-[#037ffc]/10 p-3 text-[#037ffc] group-hover:bg-[#037ffc] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Live Chat</h4>
                    <p className="text-gray-600">
                      Available 24/7 for support
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-lg font-medium mb-4">Trusted by Restaurants</h4>
                <div className="flex items-center space-x-2 text-yellow-400">
                  {'★'.repeat(5)}
                  <span className="ml-2 text-gray-600">4.9/5 rating</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Based on 100+ reviews</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-600 mb-6">Your message has been sent successfully.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 bg-[#037ffc] hover:bg-[#0265ca] rounded-lg text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className={`relative transition-all duration-300 ${
                        focusedField === 'name' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#037ffc] focus:border-transparent transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className={`relative transition-all duration-300 ${
                        focusedField === 'email' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#037ffc] focus:border-transparent transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <div className={`relative transition-all duration-300 ${
                        focusedField === 'company' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#037ffc] focus:border-transparent transition-all duration-300"
                          placeholder="Acme Inc"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className={`relative transition-all duration-300 ${
                        focusedField === 'phone' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#037ffc] focus:border-transparent transition-all duration-300"
                          placeholder="+1 (234) 567-890"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === 'message' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#037ffc] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Let us know how we can help you..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="w-4 h-4 rounded text-[#037ffc] focus:ring-2 focus:ring-[#037ffc] transition-all duration-300"
                    />
                    <label htmlFor="consent" className="ml-2 text-gray-600 text-sm">
                      I agree to the processing of my personal data according to the{' '}
                      <a href="#privacy" className="text-[#037ffc] hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#037ffc] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#0265ca] disabled:opacity-70 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;