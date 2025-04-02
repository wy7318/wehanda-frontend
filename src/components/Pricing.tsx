import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, DollarSign, Clock, XCircle } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);

  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 600);
    return () => clearTimeout(timer);
  }, [isYearly]);

  const features = [
    'Complete menu management system',
    'Reservation booking tool',
    'Multi-channel ordering platform',
    'Customer database',
    'Order notification system',
    'Kanban-style order dashboard',
    'Comprehensive sales reporting',
    'All available integrations',
    'Web and mobile app presence',
    'Free customer support'
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Use custom event to communicate with Contact component
      const planType = isYearly ? 'Annual' : 'Monthly';
      const message = `Hi, I'm interested in the ${planType} plan for Wehanda Ordering. I'd like to learn more about getting started with this subscription option and discuss how it can benefit my business. Please provide information about the onboarding process and any current promotions available for this plan.`;
      
      const event = new CustomEvent('prefillMessage', { 
        detail: { message }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Unlike delivery platforms that take up to 30% of your revenue, Wehanda offers a straightforward subscription model with no hidden fees or commissions.
          </p>

          {/* Pricing Toggle */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              className="relative w-14 h-8 rounded-full bg-[#037ffc] flex items-center transition duration-300 focus:outline-none"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1.5 py-0.5 px-2 text-xs bg-green-100 text-green-800 rounded-full">
                Save 15%
              </span>
            </span>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative transform transition-all duration-300 hover:scale-105">
            <div className="rounded-2xl shadow-lg overflow-hidden bg-white border-2 border-[#037ffc]">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isYearly ? 'Annual Plan' : 'Monthly Plan'}
                </h3>
                <p className="mt-2 text-gray-500">
                  {isYearly ? 'Best value for your business' : 'Perfect for trying out Wehanda'}
                </p>

                <div className="mt-6">
                  <div className={`flex items-baseline transition-all duration-300 ${animatePrice ? 'transform scale-105' : ''}`}>
                    <span className="text-5xl font-bold text-gray-900">
                      ${isYearly ? '42.50' : '50'}
                    </span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {isYearly ? 'Billed annually at $510' : ''} + applicable taxes
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-4">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0 p-1">
                          <Check className="h-5 w-5 text-[#037ffc]" />
                        </div>
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToContact}
                  className="mt-8 w-full py-4 px-8 rounded-xl bg-[#037ffc] text-white text-center font-semibold transition-all duration-300 hover:bg-[#0265ca] group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started {isYearly ? 'Annually' : 'Monthly'}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#037ffc] transition-colors">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-[#037ffc]" />
                <h4 className="ml-2 text-lg font-semibold text-gray-900">No Commissions, Ever</h4>
              </div>
              <p className="text-gray-600">Keep 100% of your sales revenue—we never take a percentage of your orders.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#037ffc] transition-colors">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-[#037ffc]" />
                <h4 className="ml-2 text-lg font-semibold text-gray-900">No Setup Fees</h4>
              </div>
              <p className="text-gray-600">Limited Time only: Get started without any upfront costs or installation charges.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#037ffc] transition-colors">
              <div className="flex items-center mb-4">
                <XCircle className="h-6 w-6 text-[#037ffc]" />
                <h4 className="ml-2 text-lg font-semibold text-gray-900">No Long-Term Contracts</h4>
              </div>
              <p className="text-gray-600">While we offer discounts for annual commitments, you're never locked into a long-term agreement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;