import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle, AlertCircle, Send, ArrowRight, Star, Users, Gift, Clock, Heart } from 'lucide-react';
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Calculate form progress
  useEffect(() => {
    const filledFields = Object.values(formState).filter(val => val.trim() !== '').length;
    const requiredFields = 4; // name, email, company, message
    const progress = Math.min(100, Math.round((filledFields / requiredFields) * 100));
    setFormProgress(progress);
  }, [formState]);

  useEffect(() => {
    const handlePrefillMessage = (event) => {
      setFormState(prev => ({
        ...prev,
        message: event.detail.message
      }));
    };

    window.addEventListener('prefillMessage', handlePrefillMessage);

    return () => {
      window.removeEventListener('prefillMessage', handlePrefillMessage);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
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

  // Extract initials from the name for the animated avatar
  const getInitials = () => {
    if (!formState.name) return '';
    return formState.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Enhanced Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -right-32 top-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>

        {/* Decorative elements */}
        <div className="absolute right-1/4 top-1/3 w-8 h-8 border-2 border-blue-400/20 rounded-lg rotate-12 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute left-1/4 bottom-1/4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">
            Let's Connect
          </span>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your restaurant business? Let's talk about how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced Contact Information Card */}
          <div className="lg:col-span-1">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl group">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="p-3 bg-blue-100 rounded-xl mr-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <MessageSquare className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  Contact Information
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4 group/item">
                    <div className="rounded-full bg-blue-50 p-3 text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-300 transform group-hover/item:scale-110">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 group-hover/item:text-blue-500 transition-colors">Email Us</h4>
                      <a
                        href="mailto:matt.lee@sumisubi.com"
                        className="text-gray-600 hover:text-blue-500 transition-colors flex items-center"
                      >
                        matt.lee@sumisubi.com
                        <ArrowRight className="ml-2 h-3 w-0 opacity-0 group-hover/item:w-3 group-hover/item:opacity-100 transition-all duration-300" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="rounded-full bg-blue-50 p-3 text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-300 transform group-hover/item:scale-110">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 group-hover/item:text-blue-500 transition-colors">Live Chat</h4>
                      <p className="text-gray-600 flex items-center">
                        Available 24/7 for support
                        <span className="ml-2 relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Social Proof */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Trusted by Restaurants
                  </h4>
                  <div className="flex items-center space-x-2 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">4.9/5 rating</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Based on 100+ reviews</p>

                  {/* Benefits mini-cards */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">Fast Response Time</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Gift className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Free Onboarding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl relative">
              {/* Form progress indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 rounded-t-2xl overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out"
                  style={{ width: `${formProgress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
                {formProgress > 0 && (
                  <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    {formProgress}% Complete
                  </span>
                )}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600 animate-fade-in">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-500 mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Your message has been sent successfully. Our team will get back to you within 24 hours.
                  </p>

                  {/* Animated celebration */}
                  <div className="flex justify-center mb-8">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="mx-1 p-2 bg-blue-500 rounded-full transform animate-bounce opacity-80"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <Heart className="h-3 w-3 text-white" fill="white" />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSuccess(false)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${formState.name ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        Full Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 group ${focusedField === 'name' ? 'transform scale-[1.02]' : ''
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                          placeholder="John Doe"
                        />
                        {/* Name visualization */}
                        {formState.name && (
                          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs shadow-lg">
                            {getInitials()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${formState.email ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        Email Address
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 group ${focusedField === 'email' ? 'transform scale-[1.02]' : ''
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                          placeholder="john@example.com"
                        />
                        <Mail className={`absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${formState.email ? 'text-blue-500' : 'text-gray-300'
                          }`} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${formState.company ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        Company Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 group ${focusedField === 'company' ? 'transform scale-[1.02]' : ''
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                          placeholder="Acme Inc"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${formState.phone ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        Phone Number
                      </label>
                      <div className={`relative transition-all duration-300 group ${focusedField === 'phone' ? 'transform scale-[1.02]' : ''
                        }`}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                          placeholder="+1 (234) 567-890"
                        />
                        <Phone className={`absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${formState.phone ? 'text-blue-500' : 'text-gray-300'
                          }`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${formState.message ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      Message
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className={`relative transition-all duration-300 group ${focusedField === 'message' ? 'transform scale-[1.02]' : ''
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none group-hover:border-blue-300"
                        placeholder="Let us know how we can help you..."
                      ></textarea>

                      {/* Character counter */}
                      <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {formState.message.length} characters
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="peer sr-only"
                      />
                      <div className="h-5 w-5 border border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 cursor-pointer transition-all duration-300 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white transform scale-0 peer-checked:scale-100 transition-transform duration-300" />
                      </div>
                      <label
                        htmlFor="consent"
                        className="absolute inset-0 w-5 h-5 cursor-pointer"
                      ></label>
                    </div>
                    <label htmlFor="consent" className="ml-3 text-gray-600 text-sm cursor-pointer">
                      I agree to the processing of my personal data according to the{' '}
                      <a href="#privacy" className="text-blue-500 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                    className="w-full py-4 px-8 rounded-xl font-medium transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                    style={{
                      background: isHoveringButton
                        ? 'linear-gradient(to right, #1e40af, #3b82f6)'
                        : 'linear-gradient(to right, #3b82f6, #1e40af)'
                    }}
                  >
                    {/* Button animation effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white to-white opacity-0 group-hover:opacity-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>

                    <span className="relative z-10 flex items-center justify-center text-white">
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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