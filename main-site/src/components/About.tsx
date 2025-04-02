import React from 'react';
import { DollarSign, Globe, Clock, Shield, Target, Rocket } from 'lucide-react';

const About = () => {
  const stats = [
    { 
      label: 'Commission Free', 
      value: '0%', 
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Keep 100% of your revenue'
    },
    { 
      label: 'Global Coverage', 
      value: '200+', 
      icon: <Globe className="h-6 w-6" />,
      description: 'Countries supported'
    },
    { 
      label: 'Quick Setup', 
      value: '24h', 
      icon: <Clock className="h-6 w-6" />,
      description: 'Get started in a day'
    },
    { 
      label: 'Secure Platform', 
      value: '100%', 
      icon: <Shield className="h-6 w-6" />,
      description: 'Enterprise-grade security'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Revolutionizing Restaurant Management
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your all-in-one solution for modern restaurant success
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="bg-[#037ffc]/5 p-8 rounded-2xl border-l-4 border-[#037ffc] hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600">
                Born from a simple yet powerful idea: restaurant owners deserve better technology without excessive fees. While others charge up to 30% commission, we're changing the game with a fair, transparent pricing model.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="relative p-8">
              <div className="absolute top-0 left-0 text-[#037ffc] text-6xl opacity-20">"</div>
              <p className="italic text-xl text-gray-700 relative z-10">
                Technology should enhance your restaurant business, not become a financial burden.
              </p>
              <div className="absolute bottom-0 right-0 text-[#037ffc] text-6xl opacity-20">"</div>
            </blockquote>
          </div>

          {/* Right Column - Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#037ffc]/5 to-transparent p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-[#037ffc] mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                Empowering restaurants with commission-free technology that puts control back in the hands of business owners while delighting customers with seamless ordering experiences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#037ffc]/5 to-transparent p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <Rocket className="h-6 w-6 text-[#037ffc] mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                Creating a future where every restaurant, regardless of size, has access to enterprise-level technology without sacrificing their profits to third-party commissions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#037ffc]/10 rounded-full text-[#037ffc]">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-4xl font-bold text-[#037ffc]">{stat.value}</p>
                <p className="mt-2 text-gray-900 font-medium">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;