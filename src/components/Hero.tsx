import React from 'react';
import { ArrowRight, BarChart2, Clock, CreditCard, Users, Percent, Shield, Star } from 'lucide-react';

const Hero = () => {
  const benefits = [
    {
      icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
      title: 'Streamline Operations',
      description: 'Unified order management',
      color: 'bg-blue-500'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      title: 'Boost Revenue',
      description: 'Commission-free ordering',
      color: 'bg-purple-500'
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-600" />,
      title: 'Delight Customers',
      description: 'Seamless dining experience',
      color: 'bg-cyan-500'
    },
    {
      icon: <Clock className="h-6 w-6 text-sky-600" />,
      title: 'Save Time',
      description: 'Intuitive dashboard',
      color: 'bg-sky-500'
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />

        {/* Decorative Shapes */}
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-blue-400/30 rounded-full" />
        <div className="absolute top-1/3 right-24 w-12 h-12 bg-cyan-400/30 rounded-lg rotate-12" />
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-sky-400/30 rounded-lg rotate-45" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-2 animate-bounce">
                Empowering Restaurants
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Serve More, Pay Less,
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500">
                  {' '}Keep 100%
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                All-in-one platform for online ordering, dine-in, delivery, and reservations
              </p>
            </div>

            {/* Benefits Grid - More Colorful */}
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:translate-y-1 border-t-4 border-blue-400 group"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
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

            {/* CTA Buttons - More Interactive */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 transform hover:scale-105 hover:translate-y-1 flex items-center justify-center group"
              >
                Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToFeatures}
                className="px-8 py-4 bg-white border-2 border-blue-400 text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:bg-blue-50 transform hover:scale-105 hover:translate-y-1 flex items-center justify-center group"
              >
                Explore What's Possible
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Indicators - More Vibrant */}
            <div className="pt-8 border-t border-blue-100">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow-sm">
                    <Percent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">0%</div>
                    <div className="text-sm text-gray-600">Commission</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-sm">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-sm">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl transform rotate-3 scale-105"></div>
            <div className="relative z-10 animate-float transform hover:rotate-1 transition-transform duration-500">
              <img
                src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//main%20pic.jpg"
                alt="Delicious Food Presentation"
                className="rounded-2xl shadow-xl w-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/20"
              />

              {/* Floating Stats - More Vibrant */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-float border-l-4 border-green-400">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-400 to-green-500 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Monthly Revenue</div>
                    <div className="text-lg font-bold text-gray-900">+27.4%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-float border-l-4 border-blue-400" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
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