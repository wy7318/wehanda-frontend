import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, Store, CreditCard, MapPin, Bell, Settings,
  Menu, Calendar, Users, Database, Megaphone, BarChart,
  Facebook, LineChart, Wallet, CreditCard as Payment,
  Printer, ChevronDown, ChevronUp
} from 'lucide-react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const restaurantFeatures = [
    {
      icon: <Menu className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Comprehensive Menu Management',
      description: 'Create and update digital menus, customize items, and organize categories with ease.',
      details: 'Our intuitive menu management system allows you to create, edit, and organize your menu items with drag-and-drop simplicity. Set prices, add modifiers, and manage inventory in real-time.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Comprehensive%20Menu%20Management.png'
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Reservation System',
      description: 'Manage bookings, set capacity limits, and send automated reminders.',
      details: 'Handle table reservations effortlessly with our smart booking system. Set custom table layouts, manage waitlists, and automate confirmation messages.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Reservation%20Management.png'
    },
    {
      icon: <Store className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Multi-Channel Ordering',
      description: 'Accept orders through website, mobile app, and in-person with POS integration.',
      details: 'Streamline your order management across all channels. Whether customers order online, through our mobile app, or in person, everything is synchronized in one place.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multi-Channel%20Ordering.png'
    },
    {
      icon: <Users className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Customer Management',
      description: 'Build customer database, track patterns, and enable loyalty programs.',
      details: 'Get to know your customers better with detailed profiles, order history, and preferences. Create targeted marketing campaigns and reward loyal customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Customer%20Management.png'
    },
    {
      icon: <Bell className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Smart Notifications',
      description: 'Send automated updates and promotional alerts to customers.',
      details: 'Keep your customers informed with real-time order updates, special offers, and personalized recommendations based on their preferences and order history.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Smart%20Notifications.png'
    },
    {
      icon: <Database className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Order Dashboard',
      description: 'Visualize and manage orders in real-time with Kanban-style organization.',
      details: 'Monitor and manage all your orders in real-time with our intuitive dashboard. Track order status, manage delivery times, and handle special requests efficiently.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Advanced%20Order%20Dashboard.png'
    },
    {
      icon: <BarChart className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Business Intelligence',
      description: 'Access detailed analytics and make data-driven decisions.',
      details: 'Get valuable insights into your business performance with comprehensive analytics. Track sales trends, popular items, peak hours, and customer behavior.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Business%20Intelligence.png'
    },
    {
      icon: <Printer className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Multi-Channel Order Printing',
      description: 'Automatically print orders from all channels in real-time.',
      details: 'Streamline your kitchen operations with automatic order printing. Orders from all channels are instantly printed in your preferred format, ensuring smooth kitchen workflow.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//print.png'
    }
  ];

  const customerFeatures = [
    {
      icon: <Smartphone className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'User-Friendly Ordering',
      description: 'Browse menus, customize orders, and save favorites for quick reordering.',
      details: 'Enjoy a seamless ordering experience with our intuitive interface. Easily customize your meals, save favorite orders, and track delivery in real-time.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//User-Freindly%20Ordering.png'
    },
    {
      icon: <Payment className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Multiple Payment Options',
      description: 'Choose from various payment methods with secure processing.',
      details: 'Pay your way with support for credit cards, digital wallets, and other popular payment methods. All transactions are secured with enterprise-grade encryption.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multiple%20Payment%20Options.png'
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Flexible Delivery Options',
      description: 'Select restaurant delivery or connect with delivery partners.',
      details: 'Choose between restaurant delivery, pickup, or third-party delivery services. Track your order in real-time and receive updates every step of the way.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Flexible%20Delivery%20Options.png'
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Easy Reservations',
      description: 'Book tables and manage reservations with ease.',
      details: 'Reserve tables at your favorite restaurants with just a few taps. Manage your bookings, set reminders, and easily modify or cancel reservations when needed.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Reservation%20Management.png'
    }
  ];

  const integrations = [
    {
      icon: <Facebook className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Marketing & Analytics',
      description: 'Connect with Facebook Pixel and Google Analytics.',
      details: 'Integrate with popular marketing and analytics tools to track customer behavior, measure campaign performance, and optimize your marketing strategy.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Facebook%20and%20Google.png'
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Delivery Management',
      description: 'Integrate with Tookan, Shipday, and Uber.',
      details: 'Connect with leading delivery management platforms to optimize your delivery operations and provide real-time tracking to customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Delivery.png'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Business Operations',
      description: 'Sync with PushPOS and Walletly for seamless operations.',
      details: 'Integrate with popular POS systems and business management tools to streamline your operations and maintain accurate records.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//POS.png'
    },
    {
      icon: <Wallet className="h-6 w-6 text-[#037ffc] transition-transform group-hover:rotate-12" />,
      title: 'Payment Processing',
      description: 'Choose from 27+ payment integrations including Stripe and PayPal.',
      details: 'Connect with leading payment processors to offer secure and convenient payment options to your customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multiple%20Payment%20Options.png'
    }
  ];

  const renderFeatureCard = (feature: any, index: number) => (
    <div
      key={feature.title}
      className={`group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer
        ${isIntersecting ? 'animate-fade-in' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setExpandedCard(expandedCard === feature.title ? null : feature.title)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setExpandedCard(expandedCard === feature.title ? null : feature.title);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#037ffc]/5 group-hover:bg-[#037ffc]/10 transition-colors">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#037ffc] transition-colors">
            {feature.title}
          </h3>
        </div>
        <div className="transition-transform duration-300">
          {expandedCard === feature.title ? (
            <ChevronUp className="h-5 w-5 text-[#037ffc]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#037ffc]" />
          )}
        </div>
      </div>

      <div className={`mt-4 space-y-4 transition-all duration-300 ${
        expandedCard === feature.title ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <p className="text-gray-600">{feature.description}</p>
        {feature.details && (
          <p className="text-gray-600 border-t pt-4">{feature.details}</p>
        )}
        {feature.image && (
          <div className="mt-6 overflow-hidden rounded-lg">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      <div className={`mt-4 ${expandedCard === feature.title ? 'hidden' : 'block'}`}>
        <p className="text-gray-600 line-clamp-2">{feature.description}</p>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#037ffc] to-[#0265ca]">
            Features & Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive tools designed for modern restaurant management
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'restaurants'
                  ? 'bg-[#037ffc] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#037ffc]/5'
              }`}
            >
              For Restaurant Owners
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'customers'
                  ? 'bg-[#037ffc] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#037ffc]/5'
              }`}
            >
              For Customers
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(activeTab === 'restaurants' ? restaurantFeatures : customerFeatures).map((feature, index) => 
              renderFeatureCard(feature, index)
            )}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mt-20 reveal">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Integrations
          </h3>
          <p className="mt-4 text-lg text-gray-600 text-center mb-12">
            Seamlessly connect with the tools and services you already use
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration, index) => renderFeatureCard(integration, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;