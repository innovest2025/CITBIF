"use client";

import {
  Play,
  Tag,
  X,
  Cpu,
  Cog,
  Microscope,
  Wrench,
  TrendingUp,
  Download,
  ExternalLink,
  ChevronLeft,
  Filter,
  ChevronRight,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/navbar";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

// Add cardVariants before the MorePage component
const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.95,
  },
  onscreen: (index: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
};

export default function MorePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentReportSlide, setCurrentReportSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isItLoaded, setIsItLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mouseItPosition, setMouseItPosition] = useState({ x: 0, y: 0 });
  const [filterAnimation, setFilterAnimation] = useState(false);
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setIsItLoaded(true);
    // Set isLoaded to true after a short delay to trigger the animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Initialize animations for elements in viewport on page load
      const sections = document.querySelectorAll(".scroll-animation");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const id = section.id;
          if (id) {
            setAnimatedSections((prev) => new Set([...prev, id]));
          }
        }
      });
      
      // Add scroll event listener to handle animations
      const handleScroll = () => {
        // Handle all elements with scroll-animation class
        document.querySelectorAll('.scroll-animation').forEach((element) => {
          const htmlElement = element as HTMLElement;
          const rect = htmlElement.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            htmlElement.style.opacity = '1';
            htmlElement.style.transform = 'translateY(0)';
          } else {
            htmlElement.style.opacity = '0';
            htmlElement.style.transform = 'translateY(20px)';
          }
        });
        
        // Handle dashboard cards
        document.querySelectorAll('.dashboard-card').forEach((card) => {
          const htmlCard = card as HTMLElement;
          const rect = htmlCard.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            htmlCard.style.opacity = '1';
            htmlCard.classList.add('in-view');
          } else {
            htmlCard.style.opacity = '0';
            htmlCard.classList.remove('in-view');
          }
        });
      };
      
      // Run once on load
      handleScroll();
      
      // Add event listener
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, 100); // Small delay to ensure CSS is ready

    const handleMouseMove = (e: MouseEvent) => {
      setMouseItPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [animatedSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (id) {
            if (entry.isIntersecting) {
              setAnimatedSections((prev) => new Set([...prev, id]));
              
              // Add animate class for scroll animations
              if (entry.target.classList.contains('scroll-animation')) {
                entry.target.classList.add('animate');
              }
            } else {
              setAnimatedSections((prev) => {
                const newSet = new Set([...prev]);
                newSet.delete(id);
                return newSet;
              });
              
              // Remove animate class when out of view
              if (entry.target.classList.contains('scroll-animation')) {
                entry.target.classList.remove('animate');
              }
            }
          }
          
          // Handle the dashboard-card class specifically
          if (entry.target.classList.contains('dashboard-card')) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const sections = document.querySelectorAll(".scroll-animation");
    sections.forEach((section) => observer.observe(section));
    
    // Also observe all dashboard-card elements
    const dashboardCards = document.querySelectorAll(".dashboard-card");
    dashboardCards.forEach((card) => observer.observe(card));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      dashboardCards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const categories = [
    "All",
    "Events",
    "Workshops",
    "Hackathons",
    "Awards",
    "Infrastructure",
    "Videos",
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Auto-rotate reports carousel only when not hovering
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentReportSlide((prev) => (prev + 1) % annualReports.length);
      }
    }, 5000);

    // Animate counters
    const animateCounters = () => {
      const targets = {
        startups: 60,
        jobs: 300,
        revenue: 15,
        countries: 12,
        research: 150,
        publications: 810,
        innovations: 500,
        projects: 75,
        labs: 32,
        equipment: 50,
        area: 10,
        centers: 15,
      };

      Object.keys(targets).forEach((key) => {
        let current = 0;
        const target = targets[key as keyof typeof targets];
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }, 50);
      });
    };

    const timer = setTimeout(animateCounters, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isHovering]);

  const annualReports = [
    {
      year: "2023-24",
      title: "Annual Report 2023-24",
      description:
        "Comprehensive overview of our achievements, financial performance, and strategic initiatives",
      pages: 45,
      size: "2.3 MB",
      highlights: [
        "60+ Startups Incubated",
        "₹2Cr+ Funding Facilitated",
        "32 Centers of Excellence",
      ],
      downloadUrl: "/reports/annual-report-2023-24.pdf",
      color: "from-[#af363c] to-[#8b2635]",
      icon: "📊",
    },
    {
      year: "2022-23",
      title: "Annual Report 2022-23",
      description:
        "Detailed analysis of growth trajectory and milestone achievements",
      pages: 38,
      size: "1.8 MB",
      highlights: [
        "45+ Startups Launched",
        "₹1.5Cr Funding",
        "25 Industry Partners",
      ],
      downloadUrl: "/reports/annual-report-2022-23.pdf",
      color: "from-[#8b2635] to-[#af363c]",
      icon: "📈",
    },
    {
      year: "2021-22",
      title: "Annual Report 2021-22",
      description:
        "Foundation year achievements and strategic roadmap development",
      pages: 32,
      size: "1.5 MB",
      highlights: ["25+ Startups", "₹80L Funding", "15 Partnerships"],
      downloadUrl: "/reports/annual-report-2021-22.pdf",
      color: "from-[#af363c] to-[#8b2635]",
      icon: "🚀",
    },
  ];

  const achievements = [
    {
      category: "Recognition & Awards",
      items: [
        {
          title: "Best Incubator Award 2023",
          organization: "Startup India",
          description:
            "Recognized for outstanding contribution to startup ecosystem",
          date: "December 2023",
          icon: "🏆",
        },
        {
          title: "Excellence in Innovation",
          organization: "AICTE",
          description: "Award for promoting innovation in higher education",
          date: "October 2023",
          icon: "🌟",
        },
        {
          title: "Top Performing Incubator",
          organization: "Tamil Nadu Government",
          description: "State-level recognition for startup development",
          date: "August 2023",
          icon: "🥇",
        },
      ],
    },
    {
      category: "Research & Publications",
      items: [
        {
          title: "285 Patents Published",
          organization: "Indian Patent Office",
          description: "Innovative solutions across various technology domains",
          date: "2024",
          icon: "📜",
        },
        {
          title: "810 Research Publications",
          organization: "International Journals",
          description: "500 Web of Science indexed publications",
          date: "2024",
          icon: "📚",
        },
        {
          title: "Research Excellence",
          organization: "Various Conferences",
          description:
            "Presentations at national and international conferences",
          date: "2023-24",
          icon: "🔬",
        },
      ],
    },
    {
      category: "Industry Collaborations",
      items: [
        {
          title: "KUKA Partnership",
          organization: "KUKA Robotics",
          description: "On-campus robotics center and training programs",
          date: "2023",
          icon: "🤖",
        },
        {
          title: "Fronius Collaboration",
          organization: "Fronius International",
          description: "Advanced welding technology research center",
          date: "2022",
          icon: "⚡",
        },
        {
          title: "Bonfiglioli Academy",
          organization: "Bonfiglioli Group",
          description: "Cutting-edge engineering education programs",
          date: "2023",
          icon: "⚙️",
        },
      ],
    },
  ];

  const keyMetrics = [
    {
      title: "Innovation Impact",
      metrics: [
        {
          label: "Startups Incubated",
          value: "60+",
          growth: "+25%",
          key: "startups",
        },
        { label: "Jobs Created", value: "300+", growth: "+40%", key: "jobs" },
        {
          label: "Revenue Generated",
          value: "₹15Cr+",
          growth: "+60%",
          key: "revenue",
        },
        {
          label: "International Reach",
          value: "12 Countries",
          growth: "+50%",
          key: "countries",
        },
      ],
    },
    {
      title: "Academic Excellence",
      metrics: [
        {
          label: "Research Projects",
          value: "150+",
          growth: "+30%",
          key: "research",
        },
        {
          label: "Faculty Publications",
          value: "810",
          growth: "+20%",
          key: "publications",
        },
        {
          label: "Student Innovations",
          value: "500+",
          growth: "+45%",
          key: "innovations",
        },
        {
          label: "Industry Projects",
          value: "75+",
          growth: "+35%",
          key: "projects",
        },
      ],
    },
    {
      title: "Infrastructure Growth",
      metrics: [
        { label: "Lab Facilities", value: "32", growth: "+15%", key: "labs" },
        {
          label: "Equipment Value",
          value: "₹50Cr+",
          growth: "+25%",
          key: "equipment",
        },
        {
          label: "Campus Area",
          value: "10K Sq.ft",
          growth: "+20%",
          key: "area",
        },
        {
          label: "Technology Centers",
          value: "15",
          growth: "+30%",
          key: "centers",
        },
      ],
    },
  ];

  const initiatives = [
    {
      title: "CITIL & Kairos Joint Acceleration",
      description:
        "Partnership combining R&D, infrastructure, and mentorship for annual demo day",
      status: "Active",
      participants: "50+ Startups",
      impact: "High",
      icon: "🚀",
      progress: 85,
    },
    {
      title: "AICTE Idea Lab",
      description:
        "Collaboration offering labs for ideation and product development",
      status: "Ongoing",
      participants: "200+ Students",
      impact: "Medium",
      icon: "💡",
      progress: 70,
    },
    {
      title: "Ignite Network Program",
      description:
        "Partnership with colleges providing access to CITIL facilities",
      status: "Expanding",
      participants: "15+ Colleges",
      impact: "High",
      icon: "🔥",
      progress: 60,
    },
    {
      title: "Minor Degree in Innovation",
      description:
        "18-credit program for innovation and entrepreneurship education",
      status: "Active",
      participants: "300+ Students",
      impact: "High",
      icon: "🎓",
      progress: 90,
    },
  ];

  const facilities = [
    {
      title: "Advanced Manufacturing",
      description: "State-of-the-art manufacturing equipment and processes",
      icon: Cog,
      items: [
        "CNC Machines",
        "Industrial Robots",
        "Quality Control Systems",
        "Automation Tools",
      ],
      count: "25+ Machines",
      area: "2000 sq ft",
      value: "₹15Cr+",
    },
    {
      title: "Electronics & Computing",
      description: "Cutting-edge electronics and computing infrastructure",
      icon: Cpu,
      items: [
        "VLSI Design Tools",
        "Embedded Systems",
        "High-Performance Computing",
        "Testing Equipment",
      ],
      count: "40+ Workstations",
      area: "1500 sq ft",
      value: "₹12Cr+",
    },
    {
      title: "Research & Development",
      description: "Comprehensive R&D facilities for innovation",
      icon: Microscope,
      items: [
        "Material Testing",
        "Prototype Development",
        "Simulation Software",
        "Analysis Tools",
      ],
      count: "15+ Labs",
      area: "3000 sq ft",
      value: "₹18Cr+",
    },
    {
      title: "Specialized Equipment",
      description: "Industry-specific specialized machinery and tools",
      icon: Wrench,
      items: [
        "Welding Systems",
        "3D Printers",
        "IoT Devices",
        "Measurement Instruments",
      ],
      count: "30+ Tools",
      area: "1800 sq ft",
      value: "₹10Cr+",
    },
  ];

  const labStats = [
    { label: "Total Labs", value: "32", icon: "🏭" },
    { label: "Equipment Worth", value: "₹50Cr+", icon: "💰" },
    { label: "Students Trained", value: "5000+", icon: "🎓" },
    { label: "Research Projects", value: "200+", icon: "🔬" },
    { label: "Industry Partners", value: "25+", icon: "🤝" },
    { label: "Patents Filed", value: "150+", icon: "📋" },
  ];

  const nextReportSlide = () => {
    setCurrentReportSlide((prev) => (prev + 1) % annualReports.length);
  };

  const prevReportSlide = () => {
    setCurrentReportSlide(
      (prev) => (prev - 1 + annualReports.length) % annualReports.length
    );
  };

  type ImageItem = {
    id: number;
    title: string;
    category: string;
    type: "image";
    date: string;
    participants: string;
    description: string;
    image: string;
    tags: string[];
  };

  type VideoItem = {
    id: number;
    title: string;
    category: string;
    type: "video";
    date: string;
    participants: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    tags: string[];
  };

  type GalleryItem = ImageItem | VideoItem;

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Smart Industry 4.0 Hackathon",
      category: "Hackathons",
      type: "image",
      date: "2024-01-15",
      participants: "5000+ Teams",
      description:
        "Largest hackathon with 5000 team registrations and 2.5 lakh online impressions",
      image: "/gallery/hackathon-industry40.jpg",
      tags: ["Innovation", "Technology", "Competition"],
    },
    {
      id: 2,
      title: "CITIL SDG Hackathon 2025",
      category: "Hackathons",
      type: "image",
      date: "2024-02-10",
      participants: "231 Applications",
      description:
        "Focused on Sustainable Development Goals with 28 finalists and ₹75,000 grants awarded",
      image: "/gallery/sdg-hackathon.jpg",
      tags: ["SDG", "Sustainability", "Innovation"],
    },
    {
      id: 3,
      title: "Launch Pad Hackathon 2025",
      category: "Hackathons",
      type: "image",
      date: "2024-03-05",
      participants: "2500 Registrations",
      description:
        "250 students participated in the finale with 25 teams selected",
      image: "/gallery/launchpad-hackathon.jpg",
      tags: ["Startup", "Launch", "Competition"],
    },
    {
      id: 4,
      title: "Idea Generation Bootcamp",
      category: "Workshops",
      type: "image",
      date: "2024-01-20",
      participants: "150+ Students",
      description:
        "Comprehensive bootcamp covering design thinking, ideation, and pitch development",
      image: "/gallery/idea-bootcamp.jpg",
      tags: ["Ideation", "Design Thinking", "Bootcamp"],
    },
    {
      id: 5,
      title: "Minor Degree in Innovation & Entrepreneurship",
      category: "Events",
      type: "image",
      date: "2024-02-01",
      participants: "300+ Students",
      description:
        "18-credit program launch with industry experts and successful entrepreneurs",
      image: "/gallery/minor-degree.jpg",
      tags: ["Education", "Entrepreneurship", "Program"],
    },
    {
      id: 6,
      title: "KUKA Robotics Center Inauguration",
      category: "Infrastructure",
      type: "image",
      date: "2023-12-15",
      participants: "Industry Leaders",
      description:
        "State-of-the-art robotics center with industrial automation systems",
      image: "/gallery/kuka-center.jpg",
      tags: ["Robotics", "Infrastructure", "Technology"],
    },
    {
      id: 7,
      title: "Best Incubator Award 2023",
      category: "Awards",
      type: "image",
      date: "2023-12-20",
      participants: "CITBIF Team",
      description:
        "Recognition from Startup India for outstanding contribution to startup ecosystem",
      image: "/gallery/best-incubator-award.jpg",
      tags: ["Award", "Recognition", "Achievement"],
    },
    {
      id: 8,
      title: "Fronius Welding Research Center",
      category: "Infrastructure",
      type: "image",
      date: "2023-11-10",
      participants: "Research Team",
      description:
        "Advanced welding technology research center with cutting-edge equipment",
      image: "/gallery/fronius-center.jpg",
      tags: ["Research", "Welding", "Technology"],
    },
    {
      id: 9,
      title: "Startup Demo Day 2024",
      category: "Events",
      type: "video",
      date: "2024-03-15",
      participants: "50+ Startups",
      description:
        "Annual showcase of incubated startups presenting to investors and industry leaders",
      thumbnail: "/gallery/demo-day-thumb.jpg",
      videoUrl: "/videos/demo-day-2024.mp4",
      tags: ["Demo", "Startups", "Investors"],
    },
    {
      id: 10,
      title: "Innovation Festival Highlights",
      category: "Videos",
      type: "video",
      date: "2024-02-25",
      participants: "1000+ Attendees",
      description:
        "Three-day innovation festival featuring workshops, masterclasses, and startup showcase",
      thumbnail: "/gallery/innovation-festival-thumb.jpg",
      videoUrl: "/videos/innovation-festival.mp4",
      tags: ["Festival", "Innovation", "Workshop"],
    },
    {
      id: 11,
      title: "Semiconductor Design Hub",
      category: "Infrastructure",
      type: "image",
      date: "2024-01-05",
      participants: "Engineering Students",
      description:
        "India's premier semiconductor design hub with industry-standard tools",
      image: "/gallery/semiconductor-hub.jpg",
      tags: ["Semiconductor", "Design", "Technology"],
    },
    {
      id: 12,
      title: "Mentorship Session with Industry Experts",
      category: "Workshops",
      type: "image",
      date: "2024-02-20",
      participants: "100+ Entrepreneurs",
      description:
        "Interactive session with successful entrepreneurs and industry veterans",
      image: "/gallery/mentorship-session.jpg",
      tags: ["Mentorship", "Guidance", "Experts"],
    },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredItems.length;
    setCurrentImageIndex(nextIndex);
    const nextItem = filteredItems[nextIndex];
    const src = nextItem.type === "image" ? nextItem.image : nextItem.thumbnail;
    setLightboxImage(src);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentImageIndex(prevIndex);
    const prevItem = filteredItems[prevIndex];
    const src = prevItem.type === "image" ? prevItem.image : prevItem.thumbnail;
    setLightboxImage(src);
  };

  const handleCategoryChange = (category: string) => {
    setFilterAnimation(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setFilterAnimation(false);
    }, 300);
  };

  // Define keyframes for animations
  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  
  const slideUpKeyframes = `
    @keyframes slideUp {
      from { transform: translateY(30px); }
      to { transform: translateY(0); }
    }
  `;
  
  const fadeInOutKeyframes = `
    @keyframes fadeInOut {
      0% { opacity: 0; }
      50% { opacity: 0.8; }
      100% { opacity: 0; }
    }
  `;
  
  const responsiveGridStyles = `
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800 overflow-x-hidden ${
        isLoaded ? "page-load-animation" : "opacity-0"
      }`}
    >
      <style jsx>{`
        ${fadeInKeyframes}
        ${slideUpKeyframes}
        ${fadeInOutKeyframes}
        ${responsiveGridStyles}
        
        .gallery-overlay {
          animation: fadeInOut 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .dashboard-card {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fadeInMove {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scroll-animation.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-0 { transition-delay: 0ms; }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
      `}</style>
      <Navbar />
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-4 h-4 bg-[#FF6B35]/20 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-6 h-6 bg-[#FFB347]/15 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#af363c]/5 via-transparent to-[#8b2635]/5 overflow-hidden py-32 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 animate-pulse-glow"></div>
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="text-center animate-fade-in max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Labs & Machineries
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto mb-8 animate-scale-in"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              World-class laboratories and cutting-edge machinery for innovation
              and research
            </p>
          </div>
        </div>
      </section>

      {/* Lab Statistics - FLOATING CARDS LAYOUT */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {labStats.map((stat, index) => (
              <div
                key={index}
                id={`lab-stat-${index}`}
                className={`floating-stat-card bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6 rounded-2xl border border-[#af363c]/50 hover:border-[#af363c] transition-all duration-500 group shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 text-center relative overflow-hidden scroll-animation`}
                style={{
                  opacity: animatedSections.has(`lab-stat-${index}`) ? 1 : 0,
                  transform: animatedSections.has(`lab-stat-${index}`) ? "none" : "translateY(20px)",
                  transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div 
                  id={`gradient-bg-${index}`}
                  className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#FFB347]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scroll-animation"
                  style={{
                    opacity: animatedSections.has(`gradient-bg-${index}`) ? 1 : 0,
                    transform: "none"
                  }}
                ></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-[#af363c] mb-2 group-hover:text-[#8b2635] transition-colors duration-300">
                    {stat.value}
                  </div>
                  <p className="text-slate-700 text-sm group-hover:text-slate-900 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Overview - MORPHING CARDS LAYOUT */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Our Facilities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
          </div>

          <div 
            id="morphing-grid"
            className="morphing-cards-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center"
            style={{
              opacity: animatedSections.has("morphing-grid") ? 0 : 1,
              transform: animatedSections.has("morphing-grid") ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out"
            }}
          >
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`
                  morphing-card
                  bg-gradient-to-br from-slate-50 via-white to-gray-50
                  p-8
                  rounded-3xl
                  border-2
                  border-[#af363c]/30
                  shadow-xl
                  relative
                  overflow-hidden
                  w-full
                  max-w-xl
                  scroll-animation
                `}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#af363c]/10 to-transparent rounded-bl-full"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="facility-icon-container">
                      <facility.icon className="h-12 w-12 text-[#af363c]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#af363c]">
                        {facility.title}
                      </h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[#af363c] text-sm font-medium">
                          {facility.count}
                        </span>
                        <span className="text-slate-600 text-sm">
                          {facility.area}
                        </span>
                        <span className="text-[#af363c] text-sm font-medium">
                          {facility.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-6 flex-1 font-medium">
                    {facility.description}
                  </p>
                  <div className="facility-items-grid">
                    {facility.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="facility-item bg-[#af363c]/10 border border-[#af363c]/30 rounded-lg p-3 text-center"
                        style={{ transitionDelay: `${itemIndex * 0.1}s` }}
                      >
                        <span className="text-slate-800 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-4 h-4 bg-[#FF6B35]/20 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-6 h-6 bg-[#FFB347]/15 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#af363c]/5 via-transparent to-[#8b2635]/5 overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 animate-pulse-glow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Reports & Achievements
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto mb-8 animate-scale-in hover:w-48 transition-all duration-500"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
              Comprehensive insights into our journey, achievements, and
              strategic initiatives
            </p>
          </div>
        </div>
      </section>

      {/* Annual Reports - ENHANCED PREMIUM CAROUSEL */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Annual Reports
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
          </div>

          {/* Premium Carousel */}
          <div
            className="premium-carousel relative max-w-6xl mx-auto h-[650px] mb-12"
            ref={carouselRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {annualReports.map((report, index) => {
              // Calculate position based on current slide
              let position = "inactive";
              if (index === currentReportSlide) position = "active";
              else if (
                index ===
                (currentReportSlide + 1) % annualReports.length
              )
                position = "next";
              else if (
                index ===
                (currentReportSlide - 1 + annualReports.length) %
                  annualReports.length
              )
                position = "prev";

              return (
                <div
                  key={index}
                  className={`premium-card ${position}`}
                  style={{
                    zIndex:
                      position === "active"
                        ? 30
                        : position === "next" || position === "prev"
                        ? 20
                        : 10,
                  }}
                >
                  <div className="premium-card-inner">
                    {/* Front of card */}
                    <div className="premium-card-front">
                      <div className="premium-card-content bg-gradient-to-br from-slate-50 via-white to-gray-50 border border-[#af363c]/30 rounded-[2rem] p-8 h-full flex flex-col relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#af363c]/10 to-transparent rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#8b2635]/10 to-transparent rounded-tr-full"></div>

                        {/* Card header */}
                        <div className="flex items-start gap-6 mb-8 relative z-10">
                          <div className="report-icon-container">
                            <div className="text-5xl animate-float-slow">
                              {report.icon}
                            </div>
                            <div className="report-icon-glow"></div>
                          </div>
                          <div>
                            <div className="inline-block px-4 py-1 bg-[#af363c]/20 text-[#af363c] rounded-full text-sm font-medium mb-2">
                              {report.year}
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-2">
                              {report.title}
                            </h3>
                          </div>
                        </div>

                        {/* Card body */}
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed flex-1">
                          {report.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-3 mb-8">
                          <h4 className="text-[#af363c] font-semibold">
                            Key Highlights
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {report.highlights.map(
                              (highlight, highlightIndex) => (
                                <div
                                  key={highlightIndex}
                                  className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors duration-300"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 bg-[#af363c]/20 rounded-full flex items-center justify-center">
                                    <Check className="h-3 w-3 text-[#af363c]" />
                                  </div>
                                  <span className="text-slate-700 text-sm">
                                    {highlight}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Card footer */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#af363c] rounded-full"></div>
                              <span>{report.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#8b2635] rounded-full"></div>
                              <span>{report.size}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white rounded-xl py-6 font-bold transition-all duration-300 hover:scale-105 group">
                            <span className="flex items-center justify-center gap-2">
                              Download Report
                              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`premium-card-back bg-gradient-to-br from-[#af363c] to-[#8b2635]`}
                    >
                      <div className="p-8 h-full flex flex-col justify-center items-center text-center">
                        <div className="text-7xl mb-6 animate-float">
                          {report.icon}
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">
                          {report.year}
                        </h3>
                        <div className="w-16 h-1 bg-white/50 mx-auto mb-6"></div>
                        <p className="text-xl mb-8 text-white/90 max-w-xs">
                          Ready to download our comprehensive report for{" "}
                          {report.year}?
                        </p>

                        <div className="space-y-6 w-full max-w-xs">
                          <div className="bg-white/20 rounded-2xl p-5">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <p className="text-sm text-white/70 mb-1">
                                  File Size
                                </p>
                                <p className="text-lg font-semibold text-white">
                                  {report.size}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-white/70 mb-1">
                                  Pages
                                </p>
                                <p className="text-lg font-semibold text-white">
                                  {report.pages}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl py-6 font-bold transition-all duration-300 hover:scale-105 group">
                            <span className="flex items-center justify-center gap-2">
                              Download PDF
                              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Controls */}
            <button
              onClick={prevReportSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-slate-50/90 text-[#af363c] p-4 rounded-full hover:bg-[#af363c] hover:text-white transition-all duration-300 z-40 shadow-lg backdrop-blur-sm border border-[#af363c]/30"
              aria-label="Previous report"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextReportSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-slate-50/90 text-[#af363c] p-4 rounded-full hover:bg-[#af363c] hover:text-white transition-all duration-300 z-40 shadow-lg backdrop-blur-sm border border-[#af363c]/30"
              aria-label="Next report"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {annualReports.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReportSlide(index)}
                className={`transition-all duration-500 ${
                  currentReportSlide === index
                    ? "w-10 h-3 bg-[#af363c] rounded-full"
                    : "w-3 h-3 bg-[#af363c]/50 rounded-full hover:bg-[#af363c]/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics - ANIMATED COUNTER CARDS */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Key Performance Metrics
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {keyMetrics.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                id={`counter-card-${categoryIndex}`}
                className={`counter-card bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-3xl border border-[#af363c]/50 hover:border-[#af363c] transition-all duration-500 group shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 animate-bounce-in stagger-${
                  categoryIndex + 1
                } relative overflow-hidden scroll-animation`}
                style={{
                  opacity: animatedSections.has(`counter-card-${categoryIndex}`) ? 1 : 0,
                  transform: animatedSections.has(`counter-card-${categoryIndex}`) ? "none" : "translateY(20px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.8s",
                  transitionTimingFunction: "ease-in-out",
                  transitionDelay: `${categoryIndex * 0.1}s`
                }}
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-[#af363c]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#af363c] mb-6 group-hover:text-[#8b2635] transition-colors duration-300">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="metric-item p-4 bg-slate-100 rounded-xl border border-[#af363c]/20 hover:border-[#af363c]/40 transition-all duration-300 group-hover:scale-105"
                        style={{ transitionDelay: `${metricIndex * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-slate-800 font-semibold">
                            {metric.label}
                          </p>
                          <p className="text-green-400 text-sm flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {metric.growth}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="counter-display">
                            <span className="text-2xl font-bold text-[#af363c]">
                              {metric.key.includes("revenue") ||
                              metric.key.includes("equipment")
                                ? `₹${counters[metric.key] || 0}${
                                    metric.value.includes("Cr") ? "Cr+" : ""
                                  }`
                                : metric.key === "countries"
                                ? `${counters[metric.key] || 0} Countries`
                                : metric.key === "area"
                                ? `${counters[metric.key] || 0}K Sq.ft`
                                : `${counters[metric.key] || 0}+`}
                            </span>
                          </div>
                          <div className="progress-ring">
                            <svg className="w-12 h-12 transform -rotate-90">
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-slate-400"
                              />
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  20 *
                                  (1 -
                                    (counters[metric.key] || 0) /
                                      Number.parseInt(metric.value))
                                }`}
                                className="text-[#af363c] transition-all duration-1000"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements - TIMELINE LAYOUT */}
      <section className="bg-[#E8E4C9]/30 py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
      Our Achievements
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {achievements.map((category, index) => (
        <div
          key={category.category}
          id={`achievement-${index}`}
          className={`bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-3xl border border-[#af363c]/50 hover:border-[#af363c] transition-all duration-500 group shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 scroll-animation`}
          style={{
            opacity: 1,
            transform: "none",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.8s",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          <h3 className="text-2xl font-bold text-[#af363c] mb-6 group-hover:text-[#8b2635] transition-colors duration-300">
            {category.category}
          </h3>
          <div className="space-y-4">
            {category.items.map((item, i) => (
              <div
                key={item.title}
                className="p-4 bg-slate-100 rounded-xl border border-[#af363c]/20 hover:border-[#af363c]/40 transition-all duration-300 group-hover:scale-105"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl text-[#af363c]">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.organization}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* New Initiatives - INTERACTIVE DASHBOARD CARDS */}
      <section 
        className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24 scroll-animation"
        id="initiatives-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              New Initiatives
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mt-6">
              Explore our latest strategic initiatives and ongoing projects
            </p>
          </div>
          <div 
            className="dashboard-grid max-w-4xl mx-auto" 
            id="dashboard-grid"
            style={{
              animation: "fadeIn 1.2s ease-out forwards, slideUp 1.2s ease-out forwards",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2.5rem",
              opacity: 0, // Start invisible for the fadeIn animation
              transform: "translateY(30px)", // Start below for the slideUp animation
              margin: "0 auto"
            }}>
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                id={`dashboard-card-${index}`}
                className={`dashboard-card bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-3xl border border-[#af363c]/50 hover:border-[#af363c] transition-all duration-500 group shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 animate-slide-up stagger-${
                  index + 1
                } relative overflow-hidden interactive-card scroll-animation`}
                style={{
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                  transitionDelay: `${index * 0.15}s`
                }}
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-[#af363c]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="dashboard-header flex items-start gap-4 mb-6">
                    <div className="initiative-icon text-4xl group-hover:scale-110 transition-transform duration-300">
                      {initiative.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#af363c] mb-2 group-hover:text-[#8b2635] transition-colors duration-300">
                        {initiative.title}
                      </h3>
                      <div className="status-indicators flex items-center gap-3 mb-3">
                        <span
                          className={`status-badge px-3 py-1 rounded-full text-xs font-semibold ${
                            initiative.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : initiative.status === "Ongoing"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {initiative.status}
                        </span>
                        <span
                          className={`impact-badge px-3 py-1 rounded-full text-xs font-semibold ${
                            initiative.impact === "High"
                              ? "bg-[#FF6B35]/20 text-[#FF6B35]"
                              : "bg-[#FFB347]/20 text-[#FFB347]"
                          }`}
                        >
                          {initiative.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-6 group-hover:text-slate-900 transition-colors duration-300">
                    {initiative.description}
                  </p>
                  <div className="progress-section mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#FFB347] text-sm font-semibold">
                        Progress
                      </span>
                      <span className="text-white text-sm">
                        {initiative.progress}%
                      </span>
                    </div>
                    <div className="progress-bar bg-slate-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="progress-fill bg-gradient-to-r from-[#af363c] to-[#8b2635] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="dashboard-footer flex items-center justify-between">
                    <div className="participants flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#FFB347]" />
                      <span className="text-[#FFB347] text-sm">
                        {initiative.participants}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FF6B35] hover:text-white hover:bg-[#FF6B35]/20 group-hover:scale-105 transition-all duration-300"
                    >
                      Learn More
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#af363c]/5 via-transparent to-[#8b2635]/5 overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 animate-pulse-glow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Gallery
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto mb-8 animate-scale-in hover:w-48 transition-all duration-500"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
              Capturing moments of innovation, collaboration, and achievement at
              CITBIF
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - ANIMATED TAB SYSTEM */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-12">
        <div className="container mx-auto px-4">
          <div className="filter-tabs-container max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Filter className="h-5 w-5 text-[#af363c]" />
              <span className="text-slate-800 font-semibold">
                Filter by Category
              </span>
            </div>
            <div className="filter-tabs relative bg-slate-800 p-2 rounded-2xl">
              <div
                className="tab-indicator absolute top-2 bottom-2 bg-gradient-to-r from-[#af363c] to-[#8b2635] rounded-xl transition-all duration-500 ease-out"
                style={{
                  left: `${
                    (categories.indexOf(selectedCategory) * 100) /
                    categories.length
                  }%`,
                  width: `${100 / categories.length}%`,
                }}
              ></div>
              <div className="flex relative z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-full">
              <span className="text-[#af363c] font-bold text-lg">
                {filteredItems.length}
              </span>
              <span className="text-white">
                {filteredItems.length === 1 ? "item" : "items"} found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - MASONRY LAYOUT WITH ISOTOPE FILTERING */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24">
        <div className="container mx-auto px-4">
          <div
            id="gallery-grid"
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-500 scroll-animation ${
              filterAnimation ? "opacity-50 scale-95" : ""
            }`}
            style={{
              transition: "opacity 0.8s ease, transform 0.8s ease"
            }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-3xl border border-[#af363c]/50 hover:border-[#af363c] transition-all duration-500 group shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 animate-slide-up stagger-${
                  (index % 6) + 1
                } relative overflow-hidden cursor-pointer interactive-card h-full flex flex-col`}
                onClick={() =>
                  item.type === "image"
                    ? openLightbox(item.image, index)
                    : openLightbox(item.thumbnail, index)
                }
              >
                <div className="gallery-image-container relative overflow-hidden rounded-t-3xl h-64">
                  <div className="aspect-w-16 aspect-h-12">
                    <Image
                      src={item.type === "image" ? item.image : item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=300&width=400";
                      }}
                    />
                  </div>

                  {/* Image Overlay */}
                  <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-white" />
                        <span className="text-white text-sm">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white" />
                        <span className="text-white text-sm">
                          {item.participants}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Video Play Button */}
                  {item.type === "video" && (
                    <div className="video-play-overlay absolute inset-0 flex items-center justify-center">
                      <div className="play-button w-16 h-16 bg-[#FF6B35]/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="category-badge absolute top-4 left-4 bg-[#af363c]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold">
                      {item.category}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="type-badge absolute top-4 right-4">
                    {item.type === "video" ? (
                      <div className="bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-white text-xs font-semibold">
                          VIDEO
                        </span>
                      </div>
                    ) : (
                      <div className="bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-white text-xs font-semibold">
                          IMAGE
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="gallery-card-content p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#af363c] mb-2 group-hover:text-[#8b2635] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 mb-4 group-hover:text-slate-900 transition-colors duration-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="tags-container">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="tag bg-[#af363c]/20 text-[#af363c] px-2 py-1 rounded-full text-xs flex items-center gap-1 group-hover:scale-105 transition-transform duration-300"
                          style={{ transitionDelay: `${tagIndex * 0.1}s` }}
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="tag bg-[#8b2635]/20 text-[#8b2635] px-2 py-1 rounded-full text-xs">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="lightbox-container relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="lightbox-close absolute top-4 right-4 z-60 bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="lightbox-nav-prev absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-[#1B120A]/80 hover:bg-[#1B120A] text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="lightbox-nav-next absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-[#1B120A]/80 hover:bg-[#1B120A] text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Image */}
            <div className="lightbox-image-container relative">
              <Image
                src={lightboxImage || "/placeholder.svg"}
                alt="Gallery Image"
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder.svg?height=800&width=1200";
                }}
              />
            </div>

            {/* Image Info */}
            <div className="lightbox-info absolute bottom-4 left-4 right-4 bg-[#1B120A]/90 backdrop-blur-sm p-6 rounded-2xl border border-[#FFB347]/30">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {filteredItems[currentImageIndex]?.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {filteredItems[currentImageIndex]?.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#FFB347]" />
                    <span className="text-gray-300">
                      {filteredItems[currentImageIndex]?.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#FFB347]" />
                    <span className="text-gray-300">
                      {filteredItems[currentImageIndex]?.participants}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filteredItems[currentImageIndex]?.tags.map(
                      (tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#FF6B35]/20 text-[#FFB347] px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="lightbox-counter absolute top-4 left-4 bg-[#1B120A]/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm">
                {currentImageIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
              Stay Updated with Our Progress
            </h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed transform hover:scale-105 transition-transform duration-300">
              Subscribe to our newsletter for the latest reports, achievements,
              and initiatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white rounded-2xl px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Subscribe Newsletter
                <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#af363c] text-[#af363c] hover:bg-[#af363c] hover:text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Download All Reports
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
