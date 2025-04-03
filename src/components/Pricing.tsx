import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, DollarSign, Clock, XCircle, Star, Shield, Zap } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 600);
    return () => clearTimeout(timer);
  }, [isYearly]);

  const features = [
    {
      text: 'Complete menu management system',
      highlight: true
    },
    {
      text: 'Reservation booking tool',
      highlight: false
    },
    {
      text: 'Multi-channel ordering platform',
      highlight: true
    },
    {
      text: 'Customer database',
      highlight: false
    },
    {
      text: 'Order notification system',
      highlight: false
    },
    {
      text: 'Kanban-style order dashboard',
      highlight: true
    },
    {
      text: 'Comprehensive sales reporting',
      highlight: false
    },
    {
      text: 'All available integrations',
      highlight: false
    },
    {
      text: 'Web and mobile app presence',
      highlight: true
    },
    {
      text: 'Free customer support',
      highlight: false
    }
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
    <section id="pricing" className="py-20 overflow-hidden relative">
      {/* Background with gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10 overflow-hidden">
        <div className="absolute -right-32 top-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute right-1/3 bottom-1/3 w-8 h-8 bg-blue-400/20 rounded-full"></div>
        <div className="absolute left-1/4 top-1/4 w-6 h-6 border-2 border-blue-400/20 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">
            Simple Pricing
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Unlike delivery platforms that take up to 30% of your revenue, Wehanda offers a straightforward subscription model with no hidden fees or commissions.
          </p>

          {/* Enhanced Pricing Toggle */}
          <div className="mt-10 flex justify-center items-center">
            <div className="bg-gray-100 p-1.5 rounded-full inline-flex items-center">
              <button
                className={`relative px-6 py-2.5 rounded-full transition-all duration-300 ${!isYearly ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'
                  }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
                {!isYearly && (
                  <span className="absolute inset-0 rounded-full animate-pulse bg-blue-400/30 -z-10"></span>
                )}
              </button>
              <button
                className={`relative px-6 py-2.5 rounded-full transition-all duration-300 ${isYearly ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'
                  }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly
                {isYearly && (
                  <span className="absolute inset-0 rounded-full animate-pulse bg-blue-400/30 -z-10"></span>
                )}
                <span className="absolute -top-2 -right-2 py-0.5 px-2 text-xs bg-green-500 text-white rounded-full shadow-sm animate-bounce">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Pricing Card */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative transform transition-all duration-500 hover:scale-[1.02]">
            <div className="rounded-3xl shadow-xl overflow-hidden bg-white border-2 border-blue-500 relative">
              {/* Top decorative accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

              {/* Recommended badge */}
              <div className="absolute -top-1 right-0 left-0 flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-b-lg shadow-lg font-semibold text-sm flex items-center">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Recommended
                </div>
              </div>

              <div className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  {isYearly ? 'Annual Plan' : 'Monthly Plan'}
                </h3>
                <p className="mt-2 text-gray-600 pl-12">
                  {isYearly ? 'Best value for your business' : 'Perfect for trying out Wehanda'}
                </p>

                <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl">
                  <div className={`transition-all duration-500 ${animatePrice ? 'transform scale-110' : ''}`}>
                    <div className="flex items-baseline justify-center">
                      <span className="text-6xl font-bold text-gray-900 tracking-tight relative">
                        <span className="text-2xl absolute -left-4 top-2">$</span>
                        {isYearly ? '42' : '50'}
                        <span className="text-2xl">{isYearly ? '.50' : ''}</span>
                      </span>
                      <span className="ml-2 text-gray-600">/month</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                      {isYearly ? 'Billed annually at $510' : ''} + applicable taxes
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    What's Included:
                  </h4>
                  <ul className="space-y-4 grid grid-cols-1 gap-3">
                    {features.map((feature, index) => (
                      <li
                        key={feature.text}
                        className={`flex items-start p-3 rounded-lg transition-all duration-300 ${hoveredFeature === index ? 'bg-blue-50 transform scale-[1.02]' : ''
                          } ${feature.highlight ? 'border-l-4 border-blue-500 pl-4' : 'pl-5'}`}
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="flex-shrink-0">
                          <div className={`p-1 rounded-full ${feature.highlight ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                            }`}>
                            <Check className="h-4 w-4" />
                          </div>
                        </div>
                        <span className={`ml-3 text-gray-700 ${feature.highlight ? 'font-medium' : ''}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToContact}
                  className="mt-10 w-full py-4 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/30 transform hover:-translate-y-1 group relative overflow-hidden"
                >
                  {/* Button animation effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-20 transform group-hover:translate-y-0 transition-all duration-300"></span>

                  <span className="relative z-10 flex items-center justify-center">
                    Get Started {isYearly ? 'Annually' : 'Monthly'}
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Additional Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl text-white inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">No Commissions, Ever</h4>
              <p className="text-gray-600">Keep 100% of your sales revenue—we never take a percentage of your orders.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl text-white inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">No Setup Fees</h4>
              <p className="text-gray-600">Limited Time only: When you sign up for yearly subscription, get started without any upfront costs or installation charges.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-400 rounded-2xl text-white inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                <XCircle className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">No Long-Term Contracts</h4>
              <p className="text-gray-600">While we offer discounts for annual commitments, you're never locked into a long-term agreement.</p>
            </div>
          </div>

          {/* FAQ Teaser */}
          <div className="mt-16 bg-blue-50 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">Have questions about our pricing?</h4>
              <p className="mt-2 text-gray-600">Check our frequently asked questions or contact us directly.</p>
            </div>
            <button
              onClick={scrollToContact}
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center"
            >
              Contact Sales
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;