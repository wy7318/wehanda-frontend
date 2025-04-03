import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  DollarSign,
  Settings,
  Rocket,
  Truck,
  CreditCard,
  Users,
  Phone,
  Shield,
  FileText,
  Clock,
  Building2,
  MessageSquare,
  Globe,
  Palette,
  Star,
  Headphones,
  ChevronRight,
  Search,
  ArrowRight
} from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('General Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expanded, setExpanded] = useState({});

  // Track scroll position for animations
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryIcons = {
    'General Questions': <HelpCircle className="w-5 h-5" />,
    'Technical Questions': <Settings className="w-5 h-5" />,
    'Getting Started': <Rocket className="w-5 h-5" />,
    'Orders and Delivery': <Truck className="w-5 h-5" />,
    'Billing and Support': <CreditCard className="w-5 h-5" />
  };

  const categoryColors = {
    'General Questions': 'from-blue-500 to-blue-600',
    'Technical Questions': 'from-purple-500 to-purple-600',
    'Getting Started': 'from-green-500 to-green-600',
    'Orders and Delivery': 'from-amber-500 to-amber-600',
    'Billing and Support': 'from-red-500 to-red-600'
  };

  const categoryBgColors = {
    'General Questions': 'bg-blue-50',
    'Technical Questions': 'bg-purple-50',
    'Getting Started': 'bg-green-50',
    'Orders and Delivery': 'bg-amber-50',
    'Billing and Support': 'bg-red-50'
  };

  const questionIcons = {
    'What is Wehanda?': <Building2 />,
    'How is Wehanda different from services like Uber Eats or DoorDash?': <DollarSign />,
    'Is Wehanda available everywhere?': <Globe />,
    'Do I need special equipment to use Wehanda?': <Settings />,
    'Can Wehanda integrate with my existing POS system?': <Settings />,
    'Is the Wehanda platform mobile-friendly?': <Phone />,
    'How long does it take to set up Wehanda for my restaurant?': <Clock />,
    'Can I customize the look and feel to match my restaurant\'s branding?': <Palette />,
    'Do you offer training for my staff?': <Users />,
    'How do delivery options work with Wehanda?': <Truck />,
    'What happens if there\'s an issue with an order?': <MessageSquare />,
    'Can customers leave reviews?': <Star />,
    'Are there any hidden fees?': <DollarSign />,
    'What kind of support does Wehanda offer?': <Headphones />,
    'Can I cancel my subscription at any time?': <FileText />
  };

  const faqs = [
    // General Questions
    {
      question: 'What is Wehanda?',
      answer: 'Wehanda is an all-in-one food ordering and restaurant management platform that helps restaurant owners streamline operations while providing customers with a seamless ordering experience—all without the high commissions charged by typical delivery platforms.',
      category: 'General Questions'
    },
    {
      question: 'How is Wehanda different from services like Uber Eats or DoorDash?',
      answer: 'Unlike these services that charge restaurants up to 30% commission on each order, Wehanda operates on a flat subscription model of just $50 per month. We never take a cut of your sales, allowing you to keep 100% of your revenue while still accessing comprehensive digital ordering tools.',
      category: 'General Questions'
    },
    {
      question: 'Is Wehanda available everywhere?',
      answer: 'Wehanda\'s platform is available to restaurants throughout North America. As we continue to grow, we\'re expanding our service area to support restaurant owners worldwide.',
      category: 'General Questions'
    },
    // Technical Questions
    {
      question: 'Do I need special equipment to use Wehanda?',
      answer: 'No special equipment is required. Wehanda is a cloud-based solution that works with your existing computers, tablets, or smartphones. For the best experience, we recommend having a dedicated tablet for managing incoming orders.',
      category: 'Technical Questions'
    },
    {
      question: 'Can Wehanda integrate with my existing POS system?',
      answer: 'Yes, Wehanda integrates with PushPOS and is compatible with many popular POS systems. Contact our support team to verify compatibility with your specific setup.',
      category: 'Technical Questions'
    },
    {
      question: 'Is the Wehanda platform mobile-friendly?',
      answer: 'Absolutely! Wehanda provides both a responsive website for ordering and a dedicated Android mobile app. An iOS app is currently in development.',
      category: 'Technical Questions'
    },
    // Getting Started
    {
      question: 'How long does it take to set up Wehanda for my restaurant?',
      answer: 'Most restaurants can be fully set up within 24-48 hours. Our team will guide you through the process of uploading your menu, configuring delivery settings, and connecting any desired integrations.',
      category: 'Getting Started'
    },
    {
      question: 'Can I customize the look and feel to match my restaurant\'s branding?',
      answer: 'Yes, Wehanda allows for customization of colors, logos, and certain design elements to align with your restaurant\'s brand identity.',
      category: 'Getting Started'
    },
    {
      question: 'Do you offer training for my staff?',
      answer: 'Yes, we provide comprehensive training resources including video tutorials, documentation, and live training sessions to ensure your team feels comfortable using the platform.',
      category: 'Getting Started'
    },
    // Orders and Delivery
    {
      question: 'How do delivery options work with Wehanda?',
      answer: 'Wehanda offers flexible delivery options. You can use your own delivery staff, integrate with Uber for third-party delivery, or offer pickup options. The choice is entirely yours.',
      category: 'Orders and Delivery'
    },
    {
      question: 'What happens if there\'s an issue with an order?',
      answer: 'Wehanda provides tools to manage order issues directly through the platform. You can communicate with customers, update order statuses, process refunds if necessary, and resolve concerns efficiently.',
      category: 'Orders and Delivery'
    },
    {
      question: 'Can customers leave reviews?',
      answer: 'Yes, Wehanda includes a customer feedback system that allows diners to rate their experience and provide comments. These reviews are visible to you and can optionally be displayed publicly.',
      category: 'Orders and Delivery'
    },
    // Billing and Support
    {
      question: 'Are there any hidden fees?',
      answer: 'No. Wehanda operates on a transparent pricing model of $50/month or $510/year. The only additional costs would be payment processing fees charged by your selected payment processor (such as Stripe or PayPal), which is standard for any transaction.',
      category: 'Billing and Support'
    },
    {
      question: 'What kind of support does Wehanda offer?',
      answer: 'We provide email, chat, and phone support to all subscribers. Our support team is available during business hours, with emergency support available 24/7 for critical issues.',
      category: 'Billing and Support'
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Monthly subscribers can cancel at any time. Annual subscribers can cancel but will not receive a refund for the remaining portion of their subscription term.',
      category: 'Billing and Support'
    }
  ];

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === faq.category;

    return matchesSearch && matchesCategory;
  });

  // Handle expanding/collapsing with animation
  const toggleQuestion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);

      // Mark as fully expanded after animation completes
      setTimeout(() => {
        setExpanded(prev => ({ ...prev, [index]: true }));
      }, 300);
    }

    // Reset expanded state for the one being closed
    if (expanded[index]) {
      setExpanded(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Dynamic background with decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -right-32 top-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>

        {/* Decorative shapes */}
        <div className="absolute right-1/4 top-1/3 w-8 h-8 border-2 border-blue-400/20 rounded-lg rotate-12 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute left-1/4 bottom-1/4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium">
            Get Answers
          </span>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Wehanda
          </p>

          {/* Search input */}
          <div className="relative max-w-md mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Navigation - Tab style */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((category, idx) => {
            const isActive = selectedCategory === category;
            const gradientClass = categoryColors[category] || 'from-blue-500 to-blue-600';
            const bgColorClass = categoryBgColors[category] || 'bg-blue-50';

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${isActive
                    ? `bg-gradient-to-r ${gradientClass} text-white shadow-lg`
                    : `${bgColorClass} text-gray-700 hover:shadow-md`
                  }`}
                style={{
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                {/* Subtle pulse animation on hover */}
                {(isActive || hoveredCategory === category) && (
                  <span className="absolute inset-0 bg-white opacity-20 animate-pulse"></span>
                )}

                <div className={`${isActive ? 'text-white' : `text-${gradientClass.split('-')[1]}-500`}`}>
                  {categoryIcons[category]}
                </div>
                <span className="font-medium">
                  {category}
                </span>
                {idx === 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion with enhanced styling */}
        <div className="max-w-3xl mx-auto space-y-6">
          {filteredFaqs.map((faq, index) => {
            const globalIndex = faqs.findIndex(f => f === faq);
            const isActive = activeIndex === globalIndex;
            const isFullyExpanded = expanded[globalIndex];
            const gradientClass = categoryColors[faq.category] || 'from-blue-500 to-blue-600';

            return (
              <div
                key={index}
                className={`transition-all duration-500 ${isActive ? 'scale-[1.02]' : 'scale-100'
                  }`}
              >
                <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${isActive ? `shadow-lg ring-2 ring-${gradientClass.split('-')[1]}-300/30` : ''
                  }`}>
                  <button
                    className="w-full flex justify-between items-center p-6 bg-white group"
                    onClick={() => toggleQuestion(globalIndex)}
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${isActive
                          ? `bg-gradient-to-r ${gradientClass} text-white`
                          : `${categoryBgColors[faq.category]} text-${gradientClass.split('-')[1]}-500 group-hover:scale-110`
                        }`}>
                        {questionIcons[faq.question] || <HelpCircle className="h-5 w-5" />}
                      </div>
                      <span className={`text-lg font-medium text-left transition-colors duration-300 ${isActive ? `text-${gradientClass.split('-')[1]}-600` : 'text-gray-900'
                        }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`p-2 rounded-full transition-all duration-500 ${isActive
                        ? `bg-${gradientClass.split('-')[1]}-100 rotate-180`
                        : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                      <ChevronDown className={`h-5 w-5 transition-colors duration-300 ${isActive ? `text-${gradientClass.split('-')[1]}-500` : 'text-gray-400'
                        }`} />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[500px]' : 'max-h-0'
                      }`}
                  >
                    <div className={`p-6 bg-gradient-to-br from-white ${categoryBgColors[faq.category]}/30 border-t border-gray-100`}>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>

                      {/* Action links that appear after expansion */}
                      <div className={`mt-4 flex gap-4 transition-opacity duration-300 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <a href="#contact" className={`text-sm text-${gradientClass.split('-')[1]}-500 hover:underline flex items-center`}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Ask a follow-up
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty state if no results */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No matching questions found</h3>
              <p className="text-gray-500">Try adjusting your search or browse a different category</p>
            </div>
          )}
        </div>

        {/* Enhanced Help Banner */}
        <div className="mt-20 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-xl transform rotate-45"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          </div>

          <div className="relative p-10 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-8 max-w-lg mx-auto">
              Our friendly support team is here to help you 24/7. We're just a message away for any questions you might have.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-black/10 transform hover:-translate-y-1 group"
            >
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;