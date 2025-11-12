import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Mail, Phone, Code2, Rocket, Award, Users, Dumbbell, ShoppingCart, Sparkles, ArrowRight, ExternalLink, Database, Layers, Palette, Terminal } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = {
    languages: [
      { name: 'JavaScript', icon: Terminal },
      { name: 'Python', icon: Code2 },
      { name: 'C++', icon: Terminal },
      { name: 'SQL', icon: Database }
    ],
    frameworks: [
      { name: 'React', icon: Layers },
      { name: 'React Native', icon: Layers },
      { name: 'Node.js', icon: Code2 },
      { name: 'Express.js', icon: Code2 }
    ],
    databases: [
      { name: 'Firebase', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database }
    ],
    styling: [
      { name: 'Tailwind CSS', icon: Palette }
    ]
  };

  const projects = [
    {
      name: 'Amiverse',
      description: 'A comprehensive mobile platform connecting students across campus. Features include real-time messaging, event discovery, resource sharing, and community building tools. Successfully published on Google Play Store with growing user engagement.',
      tech: ['React Native', 'Firebase', 'Real-time Database'],
      status: 'Live on Play Store',
      icon: Rocket
    },
    {
      name: 'Tenten-2',
      description: 'Advanced web communication platform featuring seamless real-time voice and video calling capabilities. Built with modern web technologies to deliver high-quality, low-latency peer-to-peer connections.',
      tech: ['React', 'Node.js', 'WebRTC'],
      icon: Code2
    },
    {
      name: 'Forex Trading Tracker',
      description: 'Professional forex trading journal application that helps traders log trades, analyze performance metrics, and track profit/loss over time. Includes detailed analytics and visualization tools.',
      tech: ['React Native', 'Firebase', 'Analytics'],
      icon: Sparkles
    },
    {
      name: 'Line - Quote Collector',
      description: 'Elegant mobile application for capturing and organizing meaningful quotes. Features include custom categories, search functionality, and beautiful typography-focused design.',
      tech: ['React Native', 'SQLite'],
      icon: Sparkles
    }
  ];

  const interests = [
    {
      title: 'Technical Community Leadership',
      description: 'Active member of campus tech clubs, contributing to collaborative projects and organizing technical workshops. Passionate about knowledge sharing and mentoring fellow developers.',
      icon: Users
    },
    {
      title: 'Competitive Programming & Events',
      description: 'Regular participant in hackathons, coding competitions, and technical symposiums. Enjoy solving complex algorithmic challenges and building innovative solutions under pressure.',
      icon: Award
    },
    {
      title: 'Fitness & Athletics',
      description: 'Committed to maintaining a healthy lifestyle through swimming and cycling. Believe in the importance of physical fitness for mental clarity and sustained productivity.',
      icon: Dumbbell
    },
    {
      title: 'E-commerce & Digital Marketing',
      description: 'Successfully operated a dropshipping business, gaining hands-on experience in digital marketing, customer acquisition, inventory management, and online sales strategies.',
      icon: ShoppingCart
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
        <div className="max-w-7xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Side - Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img 
                  src="https://image2url.com/images/1759003492922-cf87ebd5-a6e7-4551-bc40-f6cc60aa0647.jpg" 
                  alt="Sourabh Shrivastava"
                  className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-blue-500 shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Right Side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-400 text-xs sm:text-sm font-semibold">
                  <Sparkles size={14} className="sm:w-4 sm:h-4" />
                  <span>FULL-STACK DEVELOPER</span>
                  <Sparkles size={14} className="sm:w-4 sm:h-4" />
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                  Sourabh
                  <span className="block text-blue-500">
                    Shrivastava
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
                  Mobile App Developer • Founder @ Amiverse
                </p>
                
                <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Building innovative mobile and web experiences that bridge technology and user needs. 
                  Specialized in creating scalable applications using React Native and modern full-stack technologies.
                </p>

                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap pt-4">
                  <a href="#contact" className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold text-sm sm:text-base">
                    <Mail size={18} className="sm:w-5 sm:h-5" /> 
                    <span>Get in Touch</span>
                    <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#projects" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold border border-zinc-700 text-sm sm:text-base">
                    <Rocket size={18} className="sm:w-5 sm:h-5" /> 
                    <span>View Projects</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-500">
              About Me
            </h2>
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                  <Code2 className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                    I'm a passionate Full-Stack Developer and the Founder of <span className="text-blue-400 font-semibold">Amiverse</span>, 
                    a mobile platform designed to revolutionize how students connect, collaborate, and navigate campus life. 
                    Currently pursuing B.Tech in Computer Science at SRM University with a CGPA of 8.8, I combine academic 
                    excellence with practical development experience.
                  </p>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    My technical expertise spans building scalable mobile applications with React Native, developing robust 
                    backend systems with Node.js, and designing intuitive user interfaces. I thrive on transforming complex 
                    ideas into elegant, functional solutions that deliver real value to users.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-700/50 mt-6 sm:mt-8">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Award className="text-blue-400" size={20} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Education</h3>
                </div>
                <div className="sm:ml-12">
                  <p className="text-gray-300 text-sm sm:text-base">
                    <span className="font-semibold text-white">B.Tech in Computer Science & Engineering</span><br/>
                    <span className="text-gray-400">SRM University</span> • <span className="text-blue-400 font-semibold">CGPA: 8.8</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-500">
              Tech Stack
            </h2>
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Languages */}
            <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                  <Terminal className="text-blue-400" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Languages</h3>
              </div>
              <div className="space-y-3">
                {techStack.languages.map(lang => {
                  const Icon = lang.icon;
                  return (
                    <div key={lang.name} className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <Icon size={16} className="text-blue-400/50" />
                      <span className="text-sm sm:text-base">{lang.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Frameworks */}
            <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                  <Layers className="text-blue-400" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Frameworks</h3>
              </div>
              <div className="space-y-3">
                {techStack.frameworks.map(fw => {
                  const Icon = fw.icon;
                  return (
                    <div key={fw.name} className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <Icon size={16} className="text-blue-400/50" />
                      <span className="text-sm sm:text-base">{fw.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Databases */}
            <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                  <Database className="text-blue-400" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Databases</h3>
              </div>
              <div className="space-y-3">
                {techStack.databases.map(db => {
                  const Icon = db.icon;
                  return (
                    <div key={db.name} className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <Icon size={16} className="text-blue-400/50" />
                      <span className="text-sm sm:text-base">{db.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Styling */}
            <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                  <Palette className="text-blue-400" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Styling</h3>
              </div>
              <div className="space-y-3">
                {techStack.styling.map(style => {
                  const Icon = style.icon;
                  return (
                    <div key={style.name} className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <Icon size={16} className="text-blue-400/50" />
                      <span className="text-sm sm:text-base">{style.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-500">
              Projects
            </h2>
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <div key={idx} className="bg-zinc-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2.5 sm:p-3 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="text-blue-400" size={20} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    {project.status && (
                      <span className="bg-green-500/10 text-green-400 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span className="hidden sm:inline">{project.status}</span>
                        <span className="sm:hidden">Live</span>
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Interests */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-500">
              Beyond Code
            </h2>
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {interests.map((interest, idx) => {
              const Icon = interest.icon;
              return (
                <div key={idx} className="bg-zinc-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-blue-500/10 p-2.5 sm:p-3 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shrink-0">
                      <Icon className="text-blue-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {interest.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{interest.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500">
              Let's Connect
            </h2>
            <div className="h-px w-8 sm:w-12 bg-blue-500"></div>
          </div>
          
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Open to collaborations, exciting projects, and meaningful conversations. 
            Let's build something amazing together!
          </p>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a href="mailto:shrivastavasourabh03@gmail.com" className="flex items-center gap-3 bg-zinc-900 px-5 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group">
              <div className="bg-blue-500/10 p-2.5 sm:p-3 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="text-blue-400 group-hover:scale-110 transition-transform" size={18} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <span className="text-gray-300 text-xs sm:text-sm block truncate">shrivastavasourabh03@gmail.com</span>
              </div>
            </a>
            
            <a href="tel:+918269693742" className="flex items-center gap-3 bg-zinc-900 px-5 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group">
              <div className="bg-blue-500/10 p-2.5 sm:p-3 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Phone className="text-blue-400 group-hover:scale-110 transition-transform" size={18} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <span className="text-gray-300 text-xs sm:text-sm">+91 8269693742</span>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4 justify-center">
            <a 
              href="https://github.com/sourabh-S7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group"
            >
              <Github className="text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all" size={22} />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/sourabh-shrivastava-742b64329" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group"
            >
              <Linkedin className="text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all" size={22} />
            </a>
            
            <a 
              href="https://www.instagram.com/sourabh_shrivastava7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group"
            >
              <Instagram className="text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all" size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-zinc-800 text-center relative">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-blue-400" />
            <p>© 2025 Sourabh Shrivastava</p>
          </div>
          <span className="hidden sm:inline">•</span>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}