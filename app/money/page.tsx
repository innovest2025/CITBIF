"use client"

import Image from "next/image"
import { DollarSign, TrendingUp, Target, ChevronRight, ExternalLink, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"

export default function MoneyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fundingSchemes = [
    {
      title: "CITIL Innovation Grant",
      amount: "₹10 Lakhs",
      description: "Seed funding for innovative startups with high potential",
      eligibility: "Early-stage startups with MVP",
      duration: "12 months",
      icon: "💡",
      color: "from-[#af363c] to-[#8b2635]",
      details:
        "Comprehensive support including mentorship, workspace, and technical guidance for early-stage startups.",
    },
    {
      title: "IVP Grants",
      amount: "₹7 Lakhs",
      description: "Industry Validation Program grants for market-ready products",
      eligibility: "Startups with validated business model",
      duration: "18 months",
      icon: "🚀",
      color: "from-[#8b2635] to-[#af363c]",
      details: "Focused on market validation and industry partnerships for scaling your validated business model.",
    },
    {
      title: "Pre-Incubation Support",
      amount: "₹2-5 Lakhs",
      description: "Early-stage support for idea development and prototyping",
      eligibility: "Students and faculty with innovative ideas",
      duration: "6 months",
      icon: "🌱",
      color: "from-[#af363c] to-[#8b2635]",
      details: "Perfect for transforming innovative ideas into viable prototypes with expert guidance.",
    },
    {
      title: "Acceleration Program",
      amount: "₹15-25 Lakhs",
      description: "Advanced funding for scaling and market expansion",
      eligibility: "Growth-stage startups",
      duration: "24 months",
      icon: "📈",
      color: "from-[#8b2635] to-[#af363c]",
      details: "Comprehensive acceleration program for startups ready to scale and expand to new markets.",
    },
  ]

  const benefitedCompanies = [
    {
      name: "Mechimed Technologies",
      sector: "Medical Technology",
      funding: "₹7 Lakhs",
      description: "Revolutionary medical device for patient monitoring",
      status: "Successfully Launched",
      image: "/company-mechimed.jpg",
      achievements: ["50+ Hospitals", "FDA Approved", "₹2Cr Revenue"],
      founded: "2022",
    },
    {
      name: "Quazr Motors",
      sector: "Electric Vehicles",
      funding: "₹7 Lakhs",
      description: "Innovative electric vehicle solutions for urban mobility",
      status: "Market Ready",
      image: "/company-quazr.jpg",
      achievements: ["100+ Pre-orders", "Patent Filed", "Series A Ready"],
      founded: "2021",
    },
    {
      name: "Mam Industries",
      sector: "Manufacturing",
      funding: "₹7 Lakhs",
      description: "Advanced manufacturing solutions using Industry 4.0",
      status: "Scaling",
      image: "/company-mam.jpg",
      achievements: ["25+ Clients", "IoT Integration", "AI-Powered"],
      founded: "2023",
    },
    {
      name: "Fuinn Tech",
      sector: "AI/ML",
      funding: "₹7 Lakhs",
      description: "AI-powered solutions for business automation",
      status: "Growing",
      image: "/company-fuinn.jpg",
      achievements: ["Enterprise Clients", "Cloud Platform", "API Ready"],
      founded: "2022",
    },
  ]

  const fundingProcess = [
    {
      step: "01",
      title: "Application Submission",
      description: "Submit your business plan and pitch deck through our online portal",
      icon: "📝",
      timeline: "Week 1",
    },
    {
      step: "02",
      title: "Initial Screening",
      description: "Our expert panel reviews applications for feasibility and innovation",
      icon: "🔍",
      timeline: "Week 2-3",
    },
    {
      step: "03",
      title: "Pitch Presentation",
      description: "Selected candidates present their ideas to our investment committee",
      icon: "🎯",
      timeline: "Week 4",
    },
    {
      step: "04",
      title: "Due Diligence",
      description: "Comprehensive evaluation of business model and market potential",
      icon: "📊",
      timeline: "Week 5-6",
    },
    {
      step: "05",
      title: "Funding Decision",
      description: "Final approval and funding disbursement with mentorship support",
      icon: "✅",
      timeline: "Week 7-8",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % fundingSchemes.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + fundingSchemes.length) % fundingSchemes.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800 overflow-x-hidden pt-20">
      <Navbar />

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-4 h-4 bg-[#af363c]/20 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-6 h-6 bg-[#8b2635]/15 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-3 h-3 bg-[#2a1a1d]/10 rounded-full animate-float"
          style={{
            left: `${mousePosition.x * 0.015}px`,
            top: `${mousePosition.y * 0.015}px`,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#af363c]/5 via-transparent to-[#8b2635]/5 overflow-hidden py-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#af363c]/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#8b2635]/8 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent animate-slide-in-up">
              Funding & Investment
            </h1>
            <div className="w-40 h-1.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto mb-10 animate-scale-in hover:w-56 transition-all duration-500 rounded-full"></div>
            <p className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300 font-medium">
              Empowering startups with comprehensive funding schemes and investment opportunities through our innovative ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Funding Schemes Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">Our Funding Schemes</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in rounded-full"></div>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto mt-8 font-medium">Comprehensive funding solutions tailored for every stage of your startup journey</p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            <div className="carousel-container">
              <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {fundingSchemes.map((scheme, index) => (
                  <div key={index} className="carousel-item w-full flex-shrink-0">
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl border border-[#af363c]/20 hover:border-[#af363c]/40 transition-all duration-500 group shadow-2xl hover:shadow-[#af363c]/15 hover:scale-105 mx-4 relative overflow-hidden">
                      <div
                        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${scheme.color} opacity-15 rounded-bl-full group-hover:opacity-25 transition-opacity duration-500`}
                      ></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#af363c]/10 to-transparent rounded-tr-full"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#af363c]/20 to-[#8b2635]/20 rounded-3xl flex items-center justify-center text-6xl transition-transform duration-300 transform group-hover:scale-110 shadow-lg border border-[#af363c]/20">
                            {scheme.icon}
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-[#af363c] group-hover:text-[#8b2635] transition-colors duration-300">
                              {scheme.title}
                            </h3>
                            <p className="text-4xl font-black text-slate-800 group-hover:scale-110 transition-transform duration-300">
                              {scheme.amount}
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-700 mb-8 group-hover:text-slate-900 transition-colors duration-300 leading-relaxed text-xl font-medium">
                          {scheme.description}
                        </p>
                        <p className="text-slate-600 mb-8 leading-relaxed text-lg">{scheme.details}</p>
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3">
                            <Target className="h-6 w-6 text-[#af363c]" />
                            <span className="text-slate-700 font-medium">Eligibility: {scheme.eligibility}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-6 w-6 text-[#af363c]" />
                            <span className="text-slate-700 font-medium">Duration: {scheme.duration}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white rounded-2xl font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                          Apply Now
                          <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#af363c] p-4 rounded-full hover:bg-[#af363c] hover:text-white transition-all duration-300 z-10 shadow-xl border border-[#af363c]/40 hover:scale-110"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#af363c] p-4 rounded-full hover:bg-[#af363c] hover:text-white transition-all duration-300 z-10 shadow-xl border border-[#af363c]/40 hover:scale-110"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {fundingSchemes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-[#af363c] scale-125" : "bg-[#af363c]/50 hover:bg-[#af363c]/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#af363c]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#8b2635]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">Success Stories</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in rounded-full"></div>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto mt-8 font-medium">
              Companies that have successfully leveraged our funding programs to achieve remarkable growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {benefitedCompanies.map((company, index) => (
              <div key={index} className={`flip-card animate-bounce-in stagger-${index + 1}`}>
                <div className="flip-card-inner">
                  {/* Enhanced Front of card */}
                  <div className="flip-card-front bg-gradient-to-br from-slate-50 via-white to-gray-50 backdrop-blur-xl border border-[#af363c]/40 shadow-2xl hover:shadow-[#af363c]/25">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#af363c]/30 to-[#8b2635]/30 overflow-hidden shadow-lg border-2 border-[#af363c]/40">
                        <Image
                          src={company.image || "/placeholder.svg"}
                          alt={company.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-[#af363c] mb-2">{company.name}</h3>
                        <p className="text-slate-600 text-base mb-3 font-semibold">{company.sector}</p>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#af363c]/20 to-[#8b2635]/20 px-4 py-2 rounded-2xl border border-[#af363c]/30">
                          <DollarSign className="h-4 w-4 text-[#af363c]" />
                          <span className="text-slate-800 text-sm font-bold">{company.funding}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-6 leading-relaxed text-lg font-medium">{company.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-sm font-bold bg-green-400/20 px-4 py-2 rounded-2xl border border-green-400/30">
                        {company.status}
                      </span>
                      <span className="text-slate-500 text-sm font-medium">Founded: {company.founded}</span>
                    </div>
                    <div className="absolute bottom-6 right-6 text-[#af363c]/80 text-sm font-medium">Hover to see more →</div>
                  </div>

                  {/* Enhanced Back of card */}
                  <div className="flip-card-back bg-gradient-to-br from-[#af363c] to-[#8b2635] text-white">
                    <h3 className="text-3xl font-black mb-6">{company.name}</h3>
                    <h4 className="text-xl font-bold mb-6">Key Achievements</h4>
                    <div className="space-y-4 mb-8">
                      {company.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                          <span className="text-lg font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-[#af363c] w-full py-3 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      Learn More
                      <ExternalLink className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Funding Process Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#af363c]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#8b2635]/8 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">Funding Process</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] mx-auto animate-scale-in rounded-full"></div>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto mt-8 font-medium">A streamlined 5-step process to secure funding for your innovative startup</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="timeline">
              {fundingProcess.map((process, index) => (
                <div key={index} className={`timeline-item animate-slide-in-left stagger-${index + 1}`}>
                  <div className="timeline-marker animate-timeline-pulse"></div>
                  <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 backdrop-blur-xl p-8 rounded-3xl border border-[#af363c]/40 hover:border-[#af363c]/60 transition-all duration-500 group hover:scale-105 shadow-2xl hover:shadow-[#af363c]/25 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#af363c]/10 to-transparent rounded-bl-full group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#af363c] to-[#8b2635] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {process.step}
                        </div>
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {process.icon}
                        </span>
                        <div>
                          <h3 className="text-2xl font-black text-[#af363c] group-hover:text-[#8b2635] transition-colors duration-300">
                            {process.title}
                          </h3>
                          <span className="text-slate-600 text-base font-medium">{process.timeline}</span>
                        </div>
                      </div>
                      <p className="text-slate-700 group-hover:text-slate-900 transition-colors duration-300 leading-relaxed text-lg font-medium">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - SPLIT SCREEN LAYOUT */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-slate-100 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="split-screen max-w-6xl mx-auto">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Ready to Secure Funding?
              </h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Take the first step towards transforming your innovative idea into a successful business
              </p>
              <div className="space-y-4">
                <Button className="bg-gradient-to-r from-[#af363c] to-[#8b2635] hover:from-[#af363c]/90 hover:to-[#8b2635]/90 text-white rounded-2xl px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto">
                  Apply for Funding
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#af363c] text-[#af363c] hover:bg-[#af363c] hover:text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#af363c]/20 to-[#8b2635]/20 rounded-3xl blur-xl animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-8 rounded-3xl border border-[#af363c]/50 text-center">
                  <div className="text-6xl mb-4 animate-float">🚀</div>
                  <h3 className="text-2xl font-bold text-[#af363c] mb-4">Join 60+ Successful Startups</h3>
                  <p className="text-white leading-relaxed">
                    Be part of our thriving ecosystem of innovators and entrepreneurs who have successfully secured
                    funding and scaled their businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
