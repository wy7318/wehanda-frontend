import React, { useState, useRef, useEffect } from 'react';
import {
  Smartphone, Store, CreditCard, MapPin, Bell, Settings,
  Menu, Calendar, Users, Database, Megaphone, BarChart,
  Facebook, LineChart, Wallet, CreditCard as Payment,
  Printer, ChevronDown, ChevronUp, ArrowRight, X, Check,
  ChevronRight, BookOpen, Clock, Tag, Zap, PenTool,
  Shield
} from 'lucide-react';
// Add these CSS keyframes to your global CSS or add at component level
const animationStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
}
`;


const Features = () => {
  // Inject animation styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = animationStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [expandedCard, setExpandedCard] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

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

  // Reset expanded card when tab changes
  useEffect(() => {
    setExpandedCard(null);
  }, [activeTab]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  const restaurantFeatures = [
    {
      icon: <Menu className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-blue-500 to-blue-600",
      title: 'Comprehensive Menu Management',
      description: 'Create and update digital menus, customize items, and organize categories with ease.',
      details: 'Our intuitive menu management system allows you to create, edit, and organize your menu items with drag-and-drop simplicity. Set prices, add modifiers, and manage inventory in real-time.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Comprehensive%20Menu%20Management.png',
      extendedDetails: {
        overview: 'The Menu Management system is the heart of your restaurant operation, providing a seamless way to create, update, and optimize your digital menu across all platforms.',
        benefits: [
          'Drag-and-drop interface for easy menu organization',
          'Real-time inventory tracking to prevent out-of-stock situations',
          'Customizable modifiers and add-ons for each menu item',
          'Dynamic pricing with support for happy hours and special promotions',
          'Menu analytics to identify your best-selling and most profitable items'
        ],
        keyFeatures: [
          {
            icon: <PenTool />,
            title: 'Visual Menu Builder',
            description: 'Design your menu with our intuitive visual editor - no coding required'
          },
          {
            icon: <Tag />,
            title: 'Smart Categorization',
            description: 'Organize items by category, dietary preferences, and popularity'
          },
          {
            icon: <Zap />,
            title: 'Instant Updates',
            description: 'Changes reflect instantly across all your ordering channels'
          }
        ],
        quote: {
          text: "The menu management system has completely transformed how we operate. We can now update our offerings in seconds rather than hours.",
          author: "Maria Chen, Restaurant Owner"
        }
      }
    },
    {
      icon: <Calendar className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-purple-500 to-purple-600",
      title: 'Reservation System',
      description: 'Manage bookings, set capacity limits, and send automated reminders.',
      details: 'Handle table reservations effortlessly with our smart booking system. Set custom table layouts, manage waitlists, and automate confirmation messages.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Reservation%20Management%20(1).png',
      extendedDetails: {
        overview: 'Our Reservation System transforms how you manage your restaurant capacity, providing a stress-free experience for both your staff and customers.',
        benefits: [
          'Smart capacity planning to maximize seating efficiency',
          'Automated guest communications with email reminders',
          'Waitlist management with accurate time estimates',
          'Customer preference tracking for personalized service'
        ],
        keyFeatures: [
          {
            icon: <Clock />,
            title: 'Intelligent Scheduling',
            description: 'Our algorithm optimizes reservation timing to balance kitchen load'
          },
          {
            icon: <Users />,
            title: 'Waitlist Management',
            description: 'Keep guests informed with accurate wait times and notifications'
          },
          {
            icon: <Bell />,
            title: 'Automated Reminders',
            description: 'Reduce no-shows with customizable confirmation messages'
          }
        ],
        quote: {
          text: "Since implementing the reservation system, we've reduced no-shows by 75% and increased our table turnover rate significantly.",
          author: "James Wilson, Restaurant Manager"
        }
      }
    },
    {
      icon: <Store className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-cyan-500 to-cyan-600",
      title: 'Multi-Channel Ordering',
      description: 'Accept orders through website, mobile app, and in-person with POS integration.',
      details: 'Streamline your order management across all channels. Whether customers order online, through our mobile app, or in person, everything is synchronized in one place.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multi-Channel%20Ordering.png',
      extendedDetails: {
        overview: 'Create a unified ordering experience across all customer touchpoints with our Multi-Channel Ordering system, ensuring consistency and efficiency.',
        benefits: [
          'Centralized order management regardless of source',
          'Synchronized inventory across all ordering channels',
          'Consistent menu and pricing across platforms',
          'Streamlined order fulfillment process',
          'Enhanced customer convenience and flexibility'
        ],
        keyFeatures: [
          {
            icon: <Smartphone />,
            title: 'Omnichannel Integration',
            description: 'Seamlessly connect website, app, and in-store ordering systems'
          },
          {
            icon: <Database />,
            title: 'Unified Dashboard',
            description: 'Manage all orders from a single, intuitive interface'
          },
          {
            icon: <CreditCard />,
            title: 'Flexible Payment Options',
            description: 'Accept multiple payment methods across all channels'
          }
        ],
        quote: {
          text: "The multi-channel system has revolutionized our operations. We can now handle twice the order volume with the same staff thanks to the streamlined process.",
          author: "David Chang, Restaurant Owner"
        }
      }
    },
    {
      icon: <Users className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-green-500 to-green-600",
      title: 'Customer Management',
      description: 'Build customer database, track patterns, and enable loyalty programs.',
      details: 'Get to know your customers better with detailed profiles, order history, and preferences. Create targeted marketing campaigns and reward loyal customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Customer%20Management.png',
      extendedDetails: {
        overview: 'Our Customer Management system helps you build lasting relationships with your customers by tracking their preferences, history, and behavior patterns to deliver personalized experiences.',
        benefits: [
          'Comprehensive customer profiles with order history and preferences',
          'Behavior analytics to understand spending patterns and favorite items',
          'Segmentation tools for targeted marketing campaigns with third-party integration',
          'Loyalty program management with customizable rewards',
          'Birthday and anniversary tracking for special promotions'
        ],
        keyFeatures: [
          {
            icon: <Users />,
            title: 'Smart Profiles',
            description: 'Automatically collect and organize customer data from every interaction'
          },
          {
            icon: <Tag />,
            title: 'Loyalty Engine',
            description: 'Create points-based or visit-based loyalty programs with integration'
          },
          {
            icon: <BarChart />,
            title: 'Customer Insights',
            description: 'View detailed analytics on customer behavior and preferences'
          }
        ],
        quote: {
          text: "The customer profiles have transformed our business. We can now greet regulars by name and suggest their favorites before they even ask.",
          author: "Sophia Rodriguez, Restaurant Owner"
        }
      }
    },
    {
      icon: <Bell className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-red-400 to-red-500",
      title: 'Smart Notifications',
      description: 'Send automated updates and promotional alerts to customers.',
      details: 'Keep your customers informed with real-time order updates, special offers, and personalized recommendations based on their preferences and order history.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Smart%20Notifications.png',
      extendedDetails: {
        overview: 'Our Smart Notifications system creates timely, relevant communication with your customers through multiple channels, keeping them engaged and informed without overwhelming them.',
        benefits: [
          'Real-time order status updates via email, or push notifications',
          'Automated reservation confirmations and reminders',
          'Personalized promotions based on customer preferences and history',
          'Scheduled campaigns for special events and holidays with integration'
        ],
        keyFeatures: [
          {
            icon: <Bell />,
            title: 'Intelligent Alerts',
            description: 'Send automated updates at critical moments in the customer journey'
          },
          {
            icon: <Megaphone />,
            title: 'Campaign Manager',
            description: 'Schedule and manage promotional messages across all channels'
          },
        ],
        quote: {
          text: "The notification system has dramatically improved our customer communication. Our no-show rate has dropped by 60%, and our promotional campaigns see 3x better engagement.",
          author: "Michael Thompson, Marketing Manager"
        }
      }
    },
    {
      icon: <Database className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-blue-400 to-blue-500",
      title: 'Order Dashboard',
      description: 'Visualize and manage orders in real-time with Kanban-style organization.',
      details: 'Monitor and manage all your orders in real-time with our intuitive dashboard. Track order status, manage delivery times, and handle special requests efficiently.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Advanced%20Order%20Dashboard.png',
      extendedDetails: {
        overview: 'Our Order Dashboard gives you complete visibility and control over your entire order flow, from incoming orders to delivery, with a visual interface designed for maximum efficiency.',
        benefits: [
          'Real-time order tracking across all channels in one unified view',
          'Kanban-style order management for intuitive workflow',
          'Color-coded status indicators for quick visual reference',
          'One-click status updates that sync across all systems',
          'Detailed order information available without leaving the dashboard'
        ],
        keyFeatures: [
          {
            icon: <Database />,
            title: 'Unified Order Hub',
            description: 'See all orders from every channel in a single, organized interface'
          },
          {
            icon: <Clock />,
            title: 'Time Management',
            description: 'Track preparation times and delivery estimates with automated alerts'
          },
          {
            icon: <Settings />,
            title: 'Customizable Views',
            description: 'Configure dashboard layouts and filters to match your workflow'
          }
        ],
        quote: {
          text: "The order dashboard has revolutionized our kitchen operations. We now process 40% more orders during peak hours with the same staff, and mistakes have been reduced by 85%.",
          author: "Chef Alex Rivera, Restaurant Operations"
        }
      }
    },
    {
      icon: <BarChart className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-indigo-500 to-indigo-600",
      title: 'Business Intelligence',
      description: 'Access detailed analytics and make data-driven decisions.',
      details: 'Get valuable insights into your business performance with comprehensive analytics. Track sales trends, popular items, peak hours, and customer behavior.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Business%20Intelligence.png',
      extendedDetails: {
        overview: 'Our Business Intelligence platform transforms your restaurant data into actionable insights, helping you identify trends, optimize operations, and make confident strategic decisions.',
        benefits: [
          'Comprehensive sales analytics by time period, menu category, and more',
          'Customer behavior insights to optimize menu design and pricing',
          'Competitive benchmarking against industry standards'
        ],
        keyFeatures: [
          {
            icon: <BarChart />,
            title: 'Interactive Dashboards',
            description: 'Visualize key metrics with customizable charts and graphs'
          },
          {
            icon: <LineChart />,
            title: 'Trend Analysis',
            description: 'Identify patterns and forecast future business performance'
          },
          {
            icon: <BookOpen />,
            title: 'Automated Reporting',
            description: 'Receive scheduled reports on key metrics delivered to your inbox'
          }
        ],
        quote: {
          text: "The business intelligence tools have completely changed how we make decisions. We've increased our profit margin by 12% by optimizing our menu and staffing based on the analytics.",
          author: "Robert Kim, Restaurant Owner"
        }
      }
    },
    {
      icon: <Printer className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-sky-500 to-sky-600",
      title: 'Multi-Channel Order Printing',
      description: 'Automatically print orders from all channels in real-time.',
      details: 'Streamline your kitchen operations with automatic order printing. Orders from all channels are instantly printed in your preferred format, ensuring smooth kitchen workflow.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//print.png',
      extendedDetails: {
        overview: 'Our Multi-Channel Order Printing system bridges the digital and physical worlds by automatically routing orders to the right printers in your establishment, ensuring smooth kitchen operations regardless of order source.',
        benefits: [
          'Automatic printing of orders from all channels (web, app, in-person)',
          'Intuitive ticket formats for kitchen stations',
          'Prioritization of orders based on preparation time and delivery needs',
          'Backup systems to ensure no order is ever lost',
          'Reduced errors and improved kitchen communication'
        ],
        keyFeatures: [
          {
            icon: <Printer />,
            title: 'Smart Routing',
            description: 'Automatically send orders to the right station printers based on item type'
          },
          {
            icon: <Settings />,
            title: 'Intuitive Formats',
            description: 'Intuitive ticket layouts with the information your kitchen staff needs most'
          },
          {
            icon: <Bell />,
            title: 'Alert System',
            description: 'Get notifications for high-priority orders or printing issues'
          }
        ],
        quote: {
          text: "The printing system has transformed our kitchen workflow. Orders flow seamlessly from online to the right stations, and our food preparation time has decreased by 35%.",
          author: "Thomas Lee, Head Chef"
        }
      }
    }
  ];

  const customerFeatures = [
    {
      icon: <Smartphone className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-blue-500 to-blue-600",
      title: 'User-Friendly Ordering',
      description: 'Browse menus, customize orders, and save favorites for quick reordering.',
      details: 'Enjoy a seamless ordering experience with our intuitive interface. Easily customize your meals, save favorite orders, and track delivery in real-time.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//User-Freindly%20Ordering.png',
      extendedDetails: {
        overview: 'Our User-Friendly Ordering system is designed with customer convenience in mind, making the entire process from browsing to checkout intuitive, fast, and enjoyable.',
        benefits: [
          'Intuitive menu navigation with visual food photography',
          'Intelligent item search with filters for dietary preferences',
          'One-click reordering of favorite items and combinations',
          'Simple customization of menu items with modifiers and special instructions',
          'Streamlined checkout process with saved payment methods'
        ],
        keyFeatures: [
          {
            icon: <Smartphone />,
            title: 'Responsive Design',
            description: 'Perfect experience on any device - mobile, tablet, or desktop'
          },
          {
            icon: <BookOpen />,
            title: 'Visual Menu',
            description: 'High-quality images and detailed descriptions of every item'
          },
          {
            icon: <Users />,
            title: 'Smart Profiles',
            description: 'Remembers your preferences and previous orders for faster checkout'
          }
        ],
        quote: {
          text: "The ordering system is so intuitive my 70-year-old grandmother uses it without any help. The ability to save favorites and customize orders is a game-changer.",
          author: "Emily Watkins, Regular Customer"
        }
      }
    },
    {
      icon: <Payment className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-purple-500 to-purple-600",
      title: 'Multiple Payment Options',
      description: 'Choose from various payment methods with secure processing.',
      details: 'Pay your way with support for credit cards, digital wallets, and other popular payment methods. All transactions are secured with enterprise-grade encryption.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multiple%20Payment%20Options.png',
      extendedDetails: {
        overview: 'Our Multiple Payment Options system gives customers the freedom to pay however they prefer, while providing restaurants with reliable, secure payment processing across all channels.',
        benefits: [
          'Support for all major credit and debit cards with quick processing',
          'Integration with popular digital wallets like Apple Pay',
          'Stored payment methods for faster checkout',
          'Enterprise-grade security with end-to-end encryption'
        ],
        keyFeatures: [
          {
            icon: <CreditCard />,
            title: 'Versatile Processing',
            description: 'Accept payments through 27+ different payment providers'
          },
          {
            icon: <Shield />,
            title: 'Secure Transactions',
            description: 'PCI-compliant processing with advanced fraud protection'
          },
          {
            icon: <Wallet />,
            title: 'Digital Wallets',
            description: 'Seamless integration with popular mobile payment solutions'
          }
        ],
        quote: {
          text: "Being able to use Apple Pay makes ordering so much faster. I love that I can pay however I want, and the split bill feature is perfect for our family dinners.",
          author: "Jason Martinez, Regular Customer"
        }
      }
    },
    {
      icon: <MapPin className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-cyan-500 to-cyan-600",
      title: 'Flexible Delivery Options',
      description: 'Select restaurant delivery or connect with delivery partners.',
      details: 'Choose between restaurant delivery, pickup, or third-party delivery services. Track your order in real-time and receive updates every step of the way.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Flexible%20Delivery%20Options.png',
      extendedDetails: {
        overview: 'Our Flexible Delivery Options system gives customers complete control over how they receive their food, with real-time tracking and integration with multiple delivery services.',
        benefits: [
          'Choice between restaurant delivery, pickup, or third-party services',
          'Real-time order tracking with accurate delivery estimates',
          'Custom delivery instructions for drivers',
          'Scheduled deliveries for advance ordering',
          'Contactless delivery options for enhanced safety'
        ],
        keyFeatures: [
          {
            icon: <MapPin />,
            title: 'Live Tracking',
            description: 'Follow your order from kitchen to doorstep'
          },
          {
            icon: <Clock />,
            title: 'Scheduled Orders',
            description: 'Place orders in advance for precise delivery times'
          },
          {
            icon: <Store />,
            title: 'Pickup Optimization',
            description: 'Receive notifications when your order is ready for smooth pickup'
          }
        ],
        quote: {
          text: "I love being able to track my delivery in real-time. The estimated arrival time is always spot-on, and the ability to add delivery instructions ensures my order arrives perfectly every time.",
          author: "Sarah Johnson, Regular Customer"
        }
      }
    },
    {
      icon: <Calendar className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-green-500 to-green-600",
      title: 'Easy Reservations',
      description: 'Book tables and manage reservations with ease.',
      details: 'Reserve tables at your favorite restaurants with just a few taps. Manage your bookings, set reminders, and easily modify or cancel reservations when needed.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Reservation%20Management.png',
      extendedDetails: {
        overview: 'Our Easy Reservations system makes securing your table simple and stress-free, with intuitive booking flows, automatic confirmations, and hassle-free management of your dining plans.',
        benefits: [
          'Quick table booking with visual seating preferences',
          'Real-time availability to find perfect dining times',
          'Automated confirmation and reminder messages',
          'Simple modification or cancellation of reservations',
          'Special requests handling for occasions or seating preferences'
        ],
        keyFeatures: [
          {
            icon: <Calendar />,
            title: 'Visual Booking',
            description: 'See available tables and select your preferred location'
          },
          {
            icon: <Bell />,
            title: 'Smart Reminders',
            description: 'Receive timely notifications about upcoming reservations'
          },
          {
            icon: <Users />,
            title: 'Party Management',
            description: 'Easily manage party or add special occasion information'
          }
        ],
        quote: {
          text: "The reservation system is incredibly convenient. I can book a table in seconds, and the reminders ensure I never forget a reservation. Being able to note that it's a birthday dinner in advance makes every celebration special.",
          author: "Lisa Chen, Regular Diner"
        }
      }
    }
  ];

  const integrations = [
    {
      icon: <Facebook className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-blue-500 to-blue-600",
      title: 'Marketing & Analytics',
      description: 'Connect with Facebook Pixel and Google Analytics.',
      details: 'Integrate with popular marketing and analytics tools to track customer behavior, measure campaign performance, and optimize your marketing strategy.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Facebook%20and%20Google.png'
    },
    {
      icon: <MapPin className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-purple-500 to-purple-600",
      title: 'Delivery Management',
      description: 'Integrate with Tookan, Shipday, and Uber.',
      details: 'Connect with leading delivery management platforms to optimize your delivery operations and provide real-time tracking to customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Delivery.png'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-cyan-500 to-cyan-600",
      title: 'Business Operations',
      description: 'Sync with PushPOS and Walletly for seamless operations.',
      details: 'Integrate with popular POS systems and business management tools to streamline your operations and maintain accurate records.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//POS.png'
    },
    {
      icon: <Wallet className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />,
      color: "from-green-500 to-green-600",
      title: 'Payment Processing',
      description: 'Choose from 27+ payment integrations including Stripe and PayPal.',
      details: 'Connect with leading payment processors to offer secure and convenient payment options to your customers.',
      image: 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//Multiple%20Payment%20Options.png'
    }
  ];

  // Handle opening the modal with detailed content
  const openFeatureModal = (feature) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  // Feature Detail Modal Component
  const FeatureDetailModal = () => {
    if (!selectedFeature) return null;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in" style={{ backdropFilter: 'blur(4px)' }}>
        <div
          ref={modalRef}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up"
        >
          {/* Close button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Feature header with colored background */}
          <div className={`bg-gradient-to-r ${selectedFeature.color} p-8 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 top-0 w-80 h-80 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute -left-20 bottom-0 w-80 h-80 bg-black/10 rounded-full blur-2xl"></div>
            </div>
            <div className="relative z-10 flex items-start gap-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm">
                {React.cloneElement(selectedFeature.icon, { className: "h-8 w-8 text-white" })}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedFeature.title}</h2>
                <p className="text-white/90 text-lg">{selectedFeature.description}</p>
              </div>
            </div>
          </div>

          {/* Image section */}
          <div className="px-8 py-6">
            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-100">
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Detailed content */}
          {selectedFeature.extendedDetails && (
            <div className="px-8 pb-8 space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-600">{selectedFeature.extendedDetails.overview}</p>
              </div>

              {/* Key Features */}
              {selectedFeature.extendedDetails.keyFeatures && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedFeature.extendedDetails.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br ${selectedFeature.color} mb-3`}>
                          {React.cloneElement(feature.icon, { className: "h-5 w-5 text-white" })}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {selectedFeature.extendedDetails.benefits && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedFeature.extendedDetails.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className={`mt-1 flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-br ${selectedFeature.color} mr-3`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Customer Quote */}
              {selectedFeature.extendedDetails.quote && (
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-400 italic">
                  <p className="text-gray-700 mb-3">"{selectedFeature.extendedDetails.quote.text}"</p>
                  <p className="text-gray-500 text-sm">— {selectedFeature.extendedDetails.quote.author}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFeatureCard = (feature, index, isIntegration = false) => {
    const isExpanded = expandedCard === feature.title;
    const isHovered = hoveredCard === feature.title;

    return (
      <div
        key={feature.title}
        className={`group bg-white p-6 rounded-xl border border-gray-100 transition-all duration-300
          ${isIntersecting ? 'animate-fade-in' : 'opacity-0'}
          ${isExpanded ? 'shadow-xl scale-[1.02]' : 'shadow-md hover:shadow-lg hover:scale-[1.01]'}
        `}
        style={{
          animationDelay: `${index * 100}ms`,
          transformOrigin: 'center'
        }}
        onMouseEnter={() => setHoveredCard(feature.title)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setExpandedCard(isExpanded ? null : feature.title)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setExpandedCard(isExpanded ? null : feature.title);
            }
          }}
        >
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} transition-all duration-300 ${isHovered || isExpanded ? 'scale-110' : ''}`}>
              {feature.icon}
            </div>
            <h3 className={`text-xl font-semibold ${isExpanded ? 'text-blue-600' : 'text-gray-900'} transition-colors duration-300`}>
              {feature.title}
            </h3>
          </div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 transition-all duration-500 ${isExpanded ? 'bg-blue-100 rotate-180' : 'group-hover:bg-blue-50'}`}>
            <ChevronDown className={`h-5 w-5 transition-all duration-300 ${isExpanded ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
          </div>
        </div>

        <div className={`mt-6 space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <p className="text-gray-600">{feature.description}</p>
          {feature.details && (
            <p className="text-gray-600 border-t border-gray-100 pt-4">{feature.details}</p>
          )}
          {feature.image && (
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-100 shadow-sm">
              <img
                src={feature.image}
                alt={feature.title}
                className={`w-full h-auto transition-all duration-700 ${isExpanded ? 'scale-100' : 'scale-95'}`}
              />
            </div>
          )}
          {/* Only show "Learn more" button for non-integration cards */}
          {!isIntegration && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFeatureModal(feature);
                }}
                className="flex items-center text-blue-600 font-medium text-sm group/btn bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
              >
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        <div className={`mt-4 transition-opacity duration-300 ${isExpanded ? 'hidden' : 'block'}`}>
          <p className="text-gray-600 line-clamp-2">{feature.description}</p>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative">
      {/* Visual connector from About section */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-48 bottom-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 top-1/3 w-8 h-8 border-2 border-blue-400/20 rounded-lg rotate-12"></div>
        <div className="absolute right-1/3 top-2/3 w-6 h-6 bg-blue-400/20 rounded-full"></div>
        <div className="absolute right-1/5 bottom-1/4 w-10 h-10 border border-blue-400/10 rounded-xl rotate-12"></div>
      </div>

      {/* Feature Detail Modal */}
      {modalOpen && <FeatureDetailModal />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center ${isIntersecting ? 'animate-fade-in' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">
            Powerful Features
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            Features & Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed for modern restaurant management and delightful customer experiences
          </p>
        </div>

        <div className="mt-12">
          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1.5 rounded-full inline-flex">
              <button
                onClick={() => setActiveTab('restaurants')}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-2 ${activeTab === 'restaurants'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:bg-white'
                  }`}
              >
                <Store className="h-4 w-4" />
                <span>For Restaurant Owners</span>
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-2 ${activeTab === 'customers'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:bg-white'
                  }`}
              >
                <Users className="h-4 w-4" />
                <span>For Customers</span>
              </button>
            </div>
          </div>

          {/* Feature Card Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(activeTab === 'restaurants' ? restaurantFeatures : customerFeatures).map((feature, index) =>
              renderFeatureCard(feature, index, false)
            )}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mt-24 relative">
          <div className={`text-center ${isIntersecting ? 'animate-fade-in animate-delay-500' : 'opacity-0'}`}>
            <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">
              Connect Everything
            </span>
            <h3 className="text-2xl font-bold text-gray-900">
              Powerful Integrations
            </h3>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Seamlessly connect with the tools and services you already use to create a unified experience
            </p>
          </div>

          {/* Decorative connector */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 h-10 w-px bg-gradient-to-b from-transparent to-blue-300"></div>

          {/* Integration cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration, index) => renderFeatureCard(integration, index, true))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;