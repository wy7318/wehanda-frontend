import React from 'react';
import { ArrowRight, BarChart2, Clock, CreditCard, Users, Percent, Shield, Star } from 'lucide-react';

const Hero = () => {
  const benefits = [
    {
      icon: <BarChart2 className="h-6 w-6 text-[#037ffc]" />,
      title: 'Streamline Operations',
      description: 'Unified order management'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#037ffc]" />,
      title: 'Boost Revenue',
      description: 'Commission-free ordering'
    },
    {
      icon: <Users className="h-6 w-6 text-[#037ffc]" />,
      title: 'Delight Customers',
      description: 'Seamless dining experience'
    },
    {
      icon: <Clock className="h-6 w-6 text-[#037ffc]" />,
      title: 'Save Time',
      description: 'Intuitive dashboard'
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#037ffc]/5 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 reveal">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight animate-slide-in-left">
                Serve More, Pay Less,
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#037ffc] to-[#0265ca]">
                  {' '}Keep 100%
                </span>
              </h1>
              <p className="text-xl text-gray-600 animate-slide-in-left animate-delay-200">
                All-in-one platform for online ordering, dine-in, delivery, and reservations
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in animate-delay-300">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-[#037ffc]/10 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-400">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-[#037ffc] text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#0265ca] transform hover:scale-105 flex items-center justify-center group"
              >
                Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToFeatures}
                className="px-8 py-4 bg-[#037ffc]/10 text-[#037ffc] rounded-xl font-semibold transition-all duration-300 hover:bg-[#037ffc]/20 transform hover:scale-105 group"
              >
                Explore What's Possible
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-100 animate-fade-in animate-delay-500">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Percent className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">0%</div>
                    <div className="text-sm text-gray-600">Commission</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-[#037ffc]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#037ffc]">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative reveal">
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
                alt="Delicious Food Presentation"
                className="rounded-2xl shadow-2xl w-full hover:shadow-3xl transition-shadow duration-300"
              />
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Monthly Revenue</div>
                    <div className="text-lg font-bold text-gray-900">+27.4%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-[#037ffc]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Customer Growth</div>
                    <div className="text-lg font-bold text-gray-900">+48.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;