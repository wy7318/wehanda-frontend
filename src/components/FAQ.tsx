import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('General Questions');

  const categoryIcons = {
    'General Questions': <HelpCircle className="w-5 h-5" />,
    'Technical Questions': <Settings className="w-5 h-5" />,
    'Getting Started': <Rocket className="w-5 h-5" />,
    'Orders and Delivery': <Truck className="w-5 h-5" />,
    'Billing and Support': <CreditCard className="w-5 h-5" />
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

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#037ffc] to-[#0265ca]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Wehanda
          </p>
        </div>

        {/* Category Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-[#037ffc] text-white shadow-lg shadow-[#037ffc]/20'
                  : 'bg-white text-gray-600 hover:bg-[#037ffc]/5 shadow-sm'
              }`}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs
            .filter(faq => faq.category === selectedCategory)
            .map((faq, index) => {
              const globalIndex = faqs.findIndex(f => f === faq);
              const isActive = activeIndex === globalIndex;
              
              return (
                <div 
                  key={index}
                  className={`transform transition-all duration-300 ${
                    isActive ? 'scale-102' : ''
                  }`}
                >
                  <button
                    className={`w-full flex justify-between items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group ${
                      isActive ? 'shadow-lg ring-2 ring-[#037ffc]/20' : ''
                    }`}
                    onClick={() => setActiveIndex(activeIndex === globalIndex ? null : globalIndex)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        isActive 
                          ? 'bg-[#037ffc] text-white' 
                          : 'bg-[#037ffc]/5 text-[#037ffc] group-hover:bg-[#037ffc]/10'
                      }`}>
                        {questionIcons[faq.question] || <HelpCircle className="h-5 w-5" />}
                      </div>
                      <span className="text-lg font-medium text-gray-900 text-left">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`transition-transform duration-300 ${
                      isActive ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className={`h-5 w-5 ${
                        isActive ? 'text-[#037ffc]' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-6 bg-gradient-to-b from-white to-gray-50 rounded-b-xl border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Help Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#037ffc] to-[#0265ca] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6">Our support team is here to help you 24/7</p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-white text-[#037ffc] rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 transform hover:scale-105"
          >
            Contact Support
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;