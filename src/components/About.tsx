import React, { useEffect, useState } from 'react';
import { DollarSign, Globe, Clock, Shield, Target, Rocket } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Final values for the counters
  const finalValues = {
    commission: 0,
    countries: 200,
    hours: 24,
    security: 100
  };

  const [counters, setCounters] = useState({
    commission: 0,
    countries: 0,
    hours: 0,
    security: 0
  });

  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Only run this effect if animation hasn't completed yet
    if (animationComplete) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationComplete) {
          setIsVisible(true);

          // Animate counters when section becomes visible
          const duration = 1500; // Shorter duration for quicker animation
          const frameRate = 30;
          const frames = duration / (1000 / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = Math.min(frame / frames, 1); // Ensure progress doesn't exceed 1

            setCounters({
              commission: Math.round(finalValues.commission * progress),
              countries: Math.round(finalValues.countries * progress),
              hours: Math.round(finalValues.hours * progress),
              security: Math.round(finalValues.security * progress)
            });

            // Check if animation should end
            if (frame >= frames) {
              clearInterval(timer);
              setAnimationComplete(true);
              // Ensure final values are exactly as specified
              setCounters(finalValues);
            }
          }, 1000 / frameRate);

          // Safety cleanup - clear any hanging timers after duration + buffer
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [animationComplete]); // Re-run if animationComplete changes

  const stats = [
    {
      label: 'Commission Free',
      value: counters.commission + '%',
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-100',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Keep 100% of your revenue'
    },
    {
      label: 'Global Coverage',
      value: counters.countries + '+',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-100',
      icon: <Globe className="h-6 w-6" />,
      description: 'Countries supported'
    },
    {
      label: 'Quick Setup',
      value: counters.hours + 'h',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-100',
      icon: <Clock className="h-6 w-6" />,
      description: 'Get started in a day'
    },
    {
      label: 'Secure Platform',
      value: counters.security + '%',
      color: 'from-cyan-400 to-cyan-500',
      bgColor: 'bg-cyan-100',
      icon: <Shield className="h-6 w-6" />,
      description: 'Enterprise-grade security'
    }
  ];

  // Animate CSS classes based on visibility
  const getAnimateClass = (delay = 0) => {
    return isVisible ? `opacity-100 translate-y-0 transition-all duration-1000 delay-${delay}` : 'opacity-0 translate-y-8';
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-sky-50 to-white overflow-hidden relative">
      {/* Connecting element from hero to about */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-50 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 top-40 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 bottom-40 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/3 w-8 h-8 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute left-1/4 top-1/4 w-6 h-6 bg-sky-400/20 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute right-1/3 top-1/2 w-10 h-10 border-2 border-blue-400/20 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center ${getAnimateClass()}`}>
          <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">About Us</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500">
            Revolutionizing Restaurant Management
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your all-in-one solution for modern restaurant success
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <div className={`space-y-8 ${getAnimateClass(300)}`}>
            <div className="bg-gradient-to-br from-blue-100/50 to-white p-8 rounded-2xl border-l-4 border-blue-500 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 transform hover:translate-x-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-blue-500 rounded-full mr-3"></span>
                Our Story
              </h3>
              <p className="text-gray-600">
                Born from a simple yet powerful idea: restaurant owners deserve better technology without excessive fees. While others charge up to 30% commission, we're changing the game with a fair, transparent pricing model.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="relative p-8">
              <div className="absolute top-0 left-0 text-blue-500 text-6xl opacity-20">"</div>
              <p className="italic text-xl text-gray-700 relative z-10">
                Technology should enhance your restaurant business, not become a financial burden.
              </p>
              <div className="absolute bottom-0 right-0 text-blue-500 text-6xl opacity-20">"</div>
            </blockquote>
          </div>

          {/* Right Column - Mission & Vision */}
          <div className={`space-y-6 ${getAnimateClass(500)}`}>
            <div className="bg-gradient-to-br from-blue-100/50 to-transparent p-8 rounded-2xl hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 transform hover:translate-x-1 border-r-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-sky-500 rounded-lg text-white mr-3">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                Empowering restaurants with commission-free technology that puts control back in the hands of business owners while delighting customers with seamless ordering experiences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100/50 to-transparent p-8 rounded-2xl hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 transform hover:translate-x-1 border-r-4 border-cyan-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg text-white mr-3">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                Creating a future where every restaurant, regardless of size, has access to enterprise-level technology without sacrificing their profits to third-party commissions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-20 ${getAnimateClass(700)}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-transparent hover:border-blue-400 ${getAnimateClass(800 + index * 100)}`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-full text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="mt-2 text-gray-900 font-medium">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual connector to next section */}
        <div className="mt-20 flex justify-center">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default About;