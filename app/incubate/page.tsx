"use client";

import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import PageTransition from "@/components/page-transition";

export default function Incubate() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800 overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#af363c]/5 via-transparent to-[#8b2635]/5 overflow-hidden py-32 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent animate-slide-in-left mb-8">
              START YOUR{" "}
              <span className="bg-gradient-to-r from-[#af363c] to-[#8b2635] bg-clip-text text-transparent">
                INCUBATION
              </span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto animate-slide-in-right mb-8">
              Transform your innovative ideas into successful businesses with
              our comprehensive incubation program
            </p>
            <Button className="bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              Apply Now
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Incubation Process */}
        <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Incubation Journey
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
              <p className="text-slate-700 mt-4 max-w-2xl mx-auto text-lg">
                From idea to market-ready business in 12-18 months
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#af363c]/20 via-[#af363c]/40 to-[#8b2635]/20 transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Application & Screening",
                    desc: "Submit your innovative idea and business plan through our online portal",
                    duration: "2 weeks",
                    details:
                      "Initial screening, documentation review, eligibility check",
                    icon: "📝",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "from-blue-50 to-blue-100",
                  },
                  {
                    step: "02",
                    title: "Evaluation & Pitch",
                    desc: "Present your idea to our expert panel and investment committee",
                    duration: "3 weeks",
                    details:
                      "Pitch presentation, technical evaluation, market assessment",
                    icon: "🎯",
                    color: "from-purple-500 to-purple-600",
                    bgColor: "from-purple-50 to-purple-100",
                  },
                  {
                    step: "03",
                    title: "Incubation Program",
                    desc: "12-month intensive program with mentorship and resources",
                    duration: "12 months",
                    details:
                      "Mentorship, funding, workspace, technical support",
                    icon: "🚀",
                    color: "from-[#af363c] to-[#8b2635]",
                    bgColor: "from-red-50 to-red-100",
                  },
                  {
                    step: "04",
                    title: "Market Launch",
                    desc: "Graduate as a market-ready business with ongoing support",
                    duration: "Ongoing",
                    details:
                      "Market entry, scaling support, alumni network access",
                    icon: "🏆",
                    color: "from-green-500 to-green-600",
                    bgColor: "from-green-50 to-green-100",
                  },
                ].map((process, index) => (
                  <div key={index} className="text-center group">
                    {/* Step Circle */}
                    <div className="relative mb-6">
                      <div
                        className={`bg-gradient-to-br ${process.bgColor} w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10`}
                      >
                        <div
                          className={`bg-gradient-to-br ${process.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <span className="text-white font-bold text-xl">
                            {process.step}
                          </span>
                        </div>
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
                        <span className="text-2xl">{process.icon}</span>
                      </div>

                      {/* Connecting Arrow (for desktop) */}
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] relative">
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#8b2635] border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#af363c]/30">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#af363c] transition-colors duration-300">
                        {process.title}
                      </h3>
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        {process.desc}
                      </p>

                      {/* Duration Badge */}
                      <div className="inline-block bg-gradient-to-r from-[#af363c] to-[#8b2635] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
                        Duration: {process.duration}
                      </div>

                      {/* Details */}
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {process.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Progress Bar */}
              <div className="md:hidden mt-8">
                <div className="flex justify-center items-center space-x-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className="w-3 h-3 bg-[#af363c] rounded-full"></div>
                      {step < 4 && (
                        <div className="w-8 h-0.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Program Benefits
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
              <p className="text-slate-700 mt-4 max-w-2xl mx-auto text-lg">
                Comprehensive support to accelerate your startup's growth and
                success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Seed Funding",
                  icon: "💰",
                  desc: "Up to ₹50 lakhs in seed funding for promising startups",
                  details:
                    "Equity-based investment, milestone-based disbursement",
                  category: "Financial",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                },
                {
                  name: "Expert Mentorship",
                  icon: "🧠",
                  desc: "One-on-one guidance from industry experts and successful entrepreneurs",
                  details:
                    "Weekly sessions, domain expertise, strategic guidance",
                  category: "Support",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                },
                {
                  name: "State-of-art Infrastructure",
                  icon: "🏢",
                  desc: "Access to modern workspace, labs, and cutting-edge equipment",
                  details:
                    "Co-working space, meeting rooms, high-speed internet",
                  category: "Infrastructure",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                },
                {
                  name: "Technical Support",
                  icon: "⚙️",
                  desc: "Access to advanced technology, R&D facilities, and technical expertise",
                  details:
                    "Lab access, prototyping support, technical consultancy",
                  category: "Technical",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "from-orange-50 to-orange-100",
                },
                {
                  name: "Market Access",
                  icon: "🌐",
                  desc: "Connect with potential customers, partners, and global markets",
                  details:
                    "Customer introductions, partnership facilitation, export support",
                  category: "Business",
                  color: "from-indigo-500 to-indigo-600",
                  bgColor: "from-indigo-50 to-indigo-100",
                },
                {
                  name: "Legal & Compliance",
                  icon: "⚖️",
                  desc: "Complete legal support including IP protection and compliance",
                  details:
                    "Patent filing, legal documentation, regulatory compliance",
                  category: "Legal",
                  color: "from-red-500 to-red-600",
                  bgColor: "from-red-50 to-red-100",
                },
                {
                  name: "Business Development",
                  icon: "📈",
                  desc: "Strategic business planning and growth acceleration support",
                  details: "Business model refinement, go-to-market strategy",
                  category: "Strategy",
                  color: "from-teal-500 to-teal-600",
                  bgColor: "from-teal-50 to-teal-100",
                },
                {
                  name: "Networking Opportunities",
                  icon: "🤝",
                  desc: "Access to extensive network of investors, partners, and alumni",
                  details: "Investor meetups, industry events, peer networking",
                  category: "Network",
                  color: "from-pink-500 to-pink-600",
                  bgColor: "from-pink-50 to-pink-100",
                },
                {
                  name: "Follow-on Funding",
                  icon: "🚀",
                  desc: "Support in raising subsequent funding rounds from VCs and angels",
                  details:
                    "Investor introductions, pitch deck preparation, due diligence",
                  category: "Financial",
                  color: "from-[#af363c] to-[#8b2635]",
                  bgColor: "from-red-50 to-red-100",
                },
              ].map((offer, index) => (
                <div key={index} className="group relative overflow-hidden">
                  {/* Main Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#af363c]/30 relative z-10 h-full">
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`bg-gradient-to-r ${offer.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}
                      >
                        {offer.category}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`bg-gradient-to-br ${offer.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
                        {offer.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#af363c] transition-colors duration-300 leading-tight">
                        {offer.name}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {offer.desc}
                      </p>

                      {/* Details Box */}
                      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border-l-4 border-[#af363c]">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {offer.details}
                        </p>
                      </div>

                      {/* Learn More Button */}
                      <div className="pt-2">
                        <button className="text-[#af363c] font-semibold text-sm hover:text-[#8b2635] transition-colors duration-300 flex items-center group/btn">
                          Learn More
                          <svg
                            className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#af363c]/5 to-[#8b2635]/5 rounded-2xl transform scale-95 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-[#af363c] to-[#8b2635] rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Join our incubation program and transform your innovative idea
                  into a successful business
                </p>
                <Button className="bg-white text-[#af363c] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Eligibility Criteria
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-xl border border-[#af363c]/50 shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-[#af363c] mb-6">
                  Who Can Apply?
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">✓</span>
                    Early-stage startups with innovative technology solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">✓</span>
                    Students and faculty with entrepreneurial ideas
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">✓</span>
                    Entrepreneurs with scalable business models
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">✓</span>
                    Deep-tech focused innovations (AI/ML, IoT, Biotech, etc.)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">✓</span>
                    Sustainable and socially impactful ventures
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-xl border border-[#af363c]/50 shadow-xl hover:shadow-[#af363c]/25 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-[#af363c] mb-6">
                  Required Documents
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">•</span>
                    Detailed business plan and executive summary
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">•</span>
                    Proof of concept or prototype demonstration
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">•</span>
                    Team member profiles and resumes
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">•</span>
                    Market research and competitive analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af363c] mr-2">•</span>
                    Financial projections and funding requirements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Application Form */}
        <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-xl border border-[#af363c]/50 shadow-xl">
              <h3 className="text-3xl font-bold mb-8 text-[#af363c] text-center">
                Apply for Incubation Program
              </h3>

              <form className="space-y-8">
                {/* Startup Information */}
                <div className="border-b border-[#af363c]/30 pb-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-4">
                    Startup Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Startup Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                        placeholder="Your Startup Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Industry Sector *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                      >
                        <option value="">Select Sector</option>
                        <option>
                          Artificial Intelligence/Machine Learning
                        </option>
                        <option>Internet of Things (IoT)</option>
                        <option>Biotechnology</option>
                        <option>Clean Energy & Sustainability</option>
                        <option>Healthcare Technology</option>
                        <option>Fintech</option>
                        <option>Edtech</option>
                        <option>Agritech</option>
                        <option>Manufacturing Technology</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Stage of Development *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                      >
                        <option value="">Select Stage</option>
                        <option>Idea Stage</option>
                        <option>Prototype Development</option>
                        <option>MVP Ready</option>
                        <option>Early Revenue</option>
                        <option>Scaling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Funding Required
                      </label>
                      <select className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300">
                        <option value="">Select Range</option>
                        <option>₹5L - ₹15L</option>
                        <option>₹15L - ₹30L</option>
                        <option>₹30L - ₹50L</option>
                        <option>₹50L+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Founder Information */}
                <div className="border-b border-[#af363c]/30 pb-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-4">
                    Founder Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Founder Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                        placeholder="Primary Founder Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                        placeholder="founder@startup.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Educational Background
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                        placeholder="Degree, Institution"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-4">
                    Business Details
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Business Description *
                      </label>
                      <textarea
                        rows={4}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 resize-none transition-all duration-300"
                        placeholder="Describe your business idea, innovation, and value proposition in detail..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        rows={3}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 resize-none transition-all duration-300"
                        placeholder="What problem are you solving? Who is your target market?"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Unique Solution *
                      </label>
                      <textarea
                        rows={3}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 resize-none transition-all duration-300"
                        placeholder="How is your solution different from existing alternatives?"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Team Size
                        </label>
                        <select className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300">
                          <option value="">Select Team Size</option>
                          <option>1-2 members</option>
                          <option>3-5 members</option>
                          <option>6-10 members</option>
                          <option>10+ members</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Expected Timeline
                        </label>
                        <select className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300">
                          <option value="">Select Timeline</option>
                          <option>6 months</option>
                          <option>12 months</option>
                          <option>18 months</option>
                          <option>24 months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div className="border-t border-[#af363c]/30 pt-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-4">
                    Supporting Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Business Plan (PDF)
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Pitch Deck (PDF/PPT)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.ppt,.pptx"
                        className="w-full px-4 py-3 bg-white border border-[#af363c]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af363c] text-slate-800 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="border-t border-[#af363c]/30 pt-6">
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mr-3 mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the terms and conditions of the CITIL
                      incubation program and consent to the processing of my
                      personal data for evaluation purposes. I understand that
                      this application does not guarantee acceptance into the
                      program.
                    </label>
                  </div>

                  <div className="flex items-center mb-6">
                    <input type="checkbox" id="updates" className="mr-3" />
                    <label htmlFor="updates" className="text-sm text-slate-600">
                      I would like to receive updates about CITIL programs and
                      opportunities
                    </label>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    Submit Application
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
