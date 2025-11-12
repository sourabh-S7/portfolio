import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, Mail, Phone, Code2, Rocket, Award, Users, Dumbbell, ShoppingCart, Sparkles, ArrowRight, Database, Layers, Palette, Terminal, Cpu, Globe, FileText, BookOpen, Zap } from 'lucide-react';

// ==================== STARFIELD COMPONENT ====================
const Starfield = ({ speed = 1, density = 150 }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < density; i++) {
        const size = Math.random();
        const color = size > 0.7 ? [100, 200, 255] : size > 0.4 ? [200, 150, 255] : [255, 255, 255];
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.5,
          speed: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.6 + 0.4,
          color: color,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        const twinkleOpacity = star.opacity * (0.7 + Math.sin(star.twinkle) * 0.3);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${twinkleOpacity})`;
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, 0.8)`;
        ctx.fill();

        if (!prefersReducedMotion) {
          star.y += star.speed * speed;
          star.twinkle += 0.02;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        }
      });

      animationRef.current = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, density, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

// ==================== LIGHTSABER SCROLLBAR COMPONENT ====================
const LightsaberScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bladeHeight = scrollProgress;

  return (
    <div className="fixed right-2 top-0 h-full w-8 z-50 pointer-events-none flex flex-col items-center">
      {/* Hilt at the top */}
      <div className="mt-4">
        <svg width="32" height="60" viewBox="0 0 32 60">
          <defs>
            <linearGradient id="hiltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
          </defs>
          {/* Main hilt body */}
          <rect x="8" y="0" width="16" height="50" fill="url(#hiltGradient)" stroke="#000" strokeWidth="1" rx="3"/>
          <rect x="10" y="5" width="12" height="40" fill="#2a2a2a" rx="2"/>
          {/* Grip lines */}
          <line x1="10" y1="15" x2="22" y2="15" stroke="#3a3a3a" strokeWidth="1"/>
          <line x1="10" y1="20" x2="22" y2="20" stroke="#3a3a3a" strokeWidth="1"/>
          <line x1="10" y1="25" x2="22" y2="25" stroke="#3a3a3a" strokeWidth="1"/>
          <line x1="10" y1="30" x2="22" y2="30" stroke="#3a3a3a" strokeWidth="1"/>
          <line x1="10" y1="35" x2="22" y2="35" stroke="#3a3a3a" strokeWidth="1"/>
          {/* Button */}
          <circle cx="16" cy="10" r="3" fill="#4a4a4a" stroke="#5a5a5a" strokeWidth="1"/>
          <circle cx="16" cy="10" r="1.5" fill="#DC143C" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          {/* Emitter */}
          <rect x="10" y="48" width="12" height="8" fill="#1a1a1a" stroke="#000" strokeWidth="1" rx="1"/>
        </svg>
      </div>
      
      {/* Blade - grows as you scroll */}
      <div 
        className="relative w-3 transition-all duration-100"
        style={{ height: `calc(${bladeHeight}% - 80px)`, maxHeight: 'calc(100vh - 100px)' }}
      >
        {bladeHeight > 0 && (
          <svg width="12" height="100%" viewBox="0 0 12 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <filter id="saberGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DC143C" stopOpacity="0.3"/>
                <stop offset="5%" stopColor="#DC143C" stopOpacity="1"/>
                <stop offset="95%" stopColor="#DC143C" stopOpacity="1"/>
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="1"/>
              </linearGradient>
            </defs>
            {/* Outer glow */}
            <rect x="0" y="0" width="12" height="100" fill="url(#bladeGradient)" filter="url(#saberGlow)" opacity="0.9" rx="6"/>
            {/* Bright core */}
            <rect x="3" y="0" width="6" height="100" fill="#FF4444" opacity="0.7" rx="3"/>
            {/* Inner bright line */}
            <rect x="5" y="0" width="2" height="100" fill="#FF6B6B" opacity="0.9" rx="1"/>
          </svg>
        )}
      </div>
    </div>
  );
};

// ==================== SPACESHIPS COMPONENT ====================
const Spaceships = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const createShip = () => {
      const isXWing = Math.random() > 0.5;
      const newShip = {
        id: Date.now() + Math.random(),
        type: isXWing ? 'xwing' : 'tie',
        top: Math.random() * 80 + 10,
        duration: Math.random() * 8 + 6
      };
      
      setShips(prev => [...prev, newShip]);
      
      setTimeout(() => {
        setShips(prev => prev.filter(s => s.id !== newShip.id));
      }, newShip.duration * 1000);
    };

    const interval = setInterval(createShip, 4000);
    createShip();
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {ships.map(ship => (
        <div
          key={ship.id}
          className="absolute"
          style={{
            top: `${ship.top}%`,
            left: '-100px',
            animation: `flyAcross ${ship.duration}s linear forwards`
          }}
        >
          {ship.type === 'xwing' ? (
            <div className="relative">
              <svg width="60" height="40" viewBox="0 0 60 40">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M 30 20 L 50 20 L 55 15 L 60 20 L 55 25 L 50 20 Z" fill="#8B9DC3" stroke="#4169E1" strokeWidth="0.5"/>
                <line x1="30" y1="20" x2="20" y2="5" stroke="#8B9DC3" strokeWidth="3"/>
                <line x1="30" y1="20" x2="20" y2="35" stroke="#8B9DC3" strokeWidth="3"/>
                <line x1="30" y1="20" x2="20" y2="15" stroke="#8B9DC3" strokeWidth="3"/>
                <line x1="30" y1="20" x2="20" y2="25" stroke="#8B9DC3" strokeWidth="3"/>
                <circle cx="18" cy="5" r="2" fill="#4169E1" filter="url(#glow)" opacity="0.8"/>
                <circle cx="18" cy="15" r="2" fill="#4169E1" filter="url(#glow)" opacity="0.8"/>
                <circle cx="18" cy="25" r="2" fill="#4169E1" filter="url(#glow)" opacity="0.8"/>
                <circle cx="18" cy="35" r="2" fill="#4169E1" filter="url(#glow)" opacity="0.8"/>
              </svg>
            </div>
          ) : (
            <div className="relative">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <defs>
                  <filter id="glowTie">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="25" cy="25" r="8" fill="#2C3E50" stroke="#555" strokeWidth="1"/>
                <rect x="10" y="10" width="5" height="30" fill="#444" stroke="#666" strokeWidth="0.5"/>
                <rect x="35" y="10" width="5" height="30" fill="#444" stroke="#666" strokeWidth="0.5"/>
                <circle cx="25" cy="25" r="4" fill="#1a1a2e" stroke="#DC143C" strokeWidth="0.5" opacity="0.6"/>
                <circle cx="25" cy="25" r="3" fill="#DC143C" filter="url(#glowTie)" opacity="0.4"/>
              </svg>
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes flyAcross {
          from {
            transform: translateX(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateX(calc(100vw + 200px)) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// ==================== STAR WARS CRAWL COMPONENT ====================
const StarWarsCrawl = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 12000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <div className="starwars-container">
        <div className={`crawl-perspective ${prefersReducedMotion ? '' : 'crawl-animation'}`}>
          <div className="crawl-content">
            <div className="episode-title">
              <p className="episode-number">EPISODE IV</p>
              <h1 className="episode-name">THE DEVELOPER'S JOURNEY</h1>
            </div>
            
            <div className="crawl-text">
              <p>It is a period of digital innovation. A young developer, striking from his hidden base, has won his first victory against the bugs of the Empire.</p>
              
              <p>During the battle, he managed to deploy AMIVERSE, the ultimate mobile platform with enough power to connect an entire student universe.</p>
              
              <p>Pursued by the Empire's sinister agents of procrastination, our hero races home aboard his keyboard, custodian of the code that can save his projects and restore freedom to the galaxy....</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .starwars-container {
          perspective: 400px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .crawl-perspective {
          transform-origin: 50% 100%;
          transform: rotateX(20deg);
          width: 100%;
        }
        
        .crawl-animation {
          animation: crawl 12s linear forwards;
        }
        
        @keyframes crawl {
          0% {
            transform: rotateX(20deg) translateY(100vh);
          }
          100% {
            transform: rotateX(20deg) translateY(-150vh);
          }
        }
        
        .crawl-content {
          color: #FFD700;
          text-align: center;
          padding: 0 20%;
        }
        
        .episode-title {
          margin-bottom: 60px;
        }
        
        .episode-number {
          font-size: 1.8rem;
          letter-spacing: 0.5em;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }
        
        .episode-name {
          font-size: 3.5rem;
          font-weight: bold;
          letter-spacing: 0.1em;
          margin: 0;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.9);
        }
        
        .crawl-text {
          font-size: 2rem;
          line-height: 1.8;
          text-align: justify;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
        }
        
        .crawl-text p {
          margin-bottom: 40px;
        }
        
        @media (max-width: 768px) {
          .crawl-content {
            padding: 0 10%;
          }
          .episode-number {
            font-size: 1.2rem;
          }
          .episode-name {
            font-size: 2rem;
          }
          .crawl-text {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

// ==================== HOLOGRAPHIC CARD COMPONENT ====================
const HoloCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ${className}`}
      style={{ transform }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );
};

// ==================== CONSOLE BADGE COMPONENT ====================
const ConsoleBadge = ({ label, value, icon: Icon, status = 'operational' }) => {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-cyan-500/50 rounded-lg px-3 py-2 flex items-center gap-2 holographic-border">
      <div className="relative">
        <Icon className="text-cyan-400" size={16} />
        {status === 'operational' && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 leading-tight">{label}</span>
        <span className="text-xs font-mono text-cyan-300 leading-tight">{value}</span>
      </div>
    </div>
  );
};

// ==================== MAIN PORTFOLIO COMPONENT ====================
export default function Portfolio() {
  const [showCrawl, setShowCrawl] = useState(true);
  const [starfieldSpeed, setStarfieldSpeed] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toggleHyperspace = () => {
    setStarfieldSpeed(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCrawlComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowCrawl(false);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 's') {
        toggleHyperspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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
      title: 'E-commerce & Digital Marketing',
      description: 'Successfully operated a dropshipping business, gaining hands-on experience in digital marketing, customer acquisition, inventory management, and online sales strategies. Built and scaled an online store from scratch.',
      icon: ShoppingCart
    },
    {
      title: 'Open Source & Side Projects',
      description: 'Active contributor to open-source projects and passionate about building innovative side projects. Love experimenting with new technologies and frameworks to solve real-world problems.',
      icon: BookOpen
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
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {showCrawl && !prefersReducedMotion && (
        <StarWarsCrawl onComplete={handleCrawlComplete} />
      )}

      {isTransitioning && (
        <div className="fixed inset-0 bg-black z-40 animate-fade-in" />
      )}

      <Starfield speed={starfieldSpeed} density={200} />
      <Spaceships />

      {/* Nebula Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {/* Purple Nebula - Top Right */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20">
          <div className="w-full h-full bg-gradient-radial from-purple-600/40 via-purple-500/20 to-transparent blur-3xl animate-nebula-pulse"></div>
        </div>
        
        {/* Cyan Nebula - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] opacity-25">
          <div className="w-full h-full bg-gradient-radial from-cyan-500/40 via-cyan-400/20 to-transparent blur-3xl animate-nebula-pulse-delayed"></div>
        </div>
        
        {/* Pink Nebula - Middle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-15">
          <div className="w-full h-full bg-gradient-radial from-pink-500/30 via-pink-400/15 to-transparent blur-3xl animate-nebula-pulse-slow"></div>
        </div>
        
        {/* Shooting stars */}
        <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '2s' }}></div>
        <div className="shooting-star" style={{ top: '60%', left: '80%', animationDelay: '5s' }}></div>
        <div className="shooting-star" style={{ top: '40%', left: '50%', animationDelay: '8s' }}></div>
      </div>

      {/* Hyperspace Toggle Button - Fixed position */}
      <button
        onClick={toggleHyperspace}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 p-3 sm:p-4 rounded-full transition-all holographic-btn shadow-lg"
        aria-label="Toggle hyperspace speed"
        title={`Hyperspace: ${starfieldSpeed === 2 ? 'Fast' : starfieldSpeed === 0.5 ? 'Slow' : 'Normal'}`}
      >
        <Zap className="text-white" size={20} />
      </button>

      {/* Lightsaber Scrollbar */}
      <LightsaberScrollbar />

      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(100, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 112, 219, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        zIndex: 1
      }} />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full holographic-pulse" />
                  <div className="absolute inset-0 rounded-full" />
                  
                  <img 
                    src="https://image2url.com/images/1762963819225-937cd812-92ae-4ce2-b13f-983da8520551.jpg"
                    alt="Sourabh Shrivastava - Jedi Master of Code"
                    loading="lazy"
                    className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] rounded-full object-cover opacity-90 shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-400 text-xs sm:text-sm font-semibold">
                    <span className="tracking-widest starwars-text">JEDI MASTER OF CODE</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight starwars-title">
                    Sourabh
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{
                      textShadow: '0 0 20px rgba(100, 200, 255, 0.8), 0 0 40px rgba(100, 200, 255, 0.5)'
                    }}>
                      Shrivastava
                    </span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 starwars-text">
                    Mobile App Developer • Founder @ Amiverse
                  </p>
                  
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Using the Force of technology to architect the future. 
                    Specialized in React Native and full-stack technologies that transcend the ordinary.
                  </p>

                  <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
                    <ConsoleBadge label="STATUS" value="OPERATIONAL" icon={Cpu} status="operational" />
                    <ConsoleBadge label="MISSIONS" value="10+" icon={Rocket} />
                    <ConsoleBadge label="SECTOR" value="EARTH" icon={Globe} />
                  </div>

                  <div className="flex gap-3 justify-center lg:justify-start flex-wrap pt-4">
                    <a 
                      href="#contact" 
                      className="group flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn"
                      aria-label="Navigate to contact section"
                    >
                      <Mail size={16} /> 
                      <span>Initiate Contact</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="https://drive.google.com/file/d/1fv1wliEP6k_jKZAu7g_ZtD4-RVPLBEF6/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn"
                      aria-label="View resume"
                    >
                      <FileText size={16} /> 
                      <span>View Resume</span>
                    </a>
                    <a 
                      href="#projects" 
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn"
                      aria-label="Navigate to projects section"
                    >
                      <Rocket size={16} /> 
                      <span>View Missions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Mission Brief
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <HoloCard className="group">
              <div className="relative bg-zinc-900/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all duration-500 holographic-border">
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                  <div className="bg-cyan-500/20 p-3 rounded-xl border border-cyan-500/40 holographic-border">
                    <Code2 className="text-cyan-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      I'm a passionate Full-Stack Developer and the Founder of <span className="text-cyan-400 font-semibold">Amiverse</span>, 
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

                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-purple-500/30 mt-6 sm:mt-8 holographic-border-purple">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/40">
                      <Award className="text-purple-400" size={20} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-400">Training & Credentials</h3>
                  </div>
                  <div className="sm:ml-12">
                    <p className="text-gray-300 text-sm sm:text-base">
                      <span className="font-semibold text-white">B.Tech in Computer Science & Engineering</span><br/>
                      <span className="text-gray-400">SRM University</span> • <span className="text-cyan-400 font-semibold">CGPA: 8.8</span>
                    </p>
                  </div>
                </div>
              </div>
            </HoloCard>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Arsenal
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Object.entries(techStack).map(([category, items], idx) => {
                const categoryIcon = category === 'languages' ? Terminal : category === 'frameworks' ? Layers : category === 'databases' ? Database : Palette;
                const Icon = categoryIcon;
                
                return (
                  <HoloCard key={category} className="group">
                    <div className="relative bg-zinc-900/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all duration-500 h-full holographic-border">
                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/40 holographic-border">
                          <Icon className="text-cyan-400" size={20} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-cyan-400 capitalize">{category}</h3>
                      </div>
                      <div className="space-y-3">
                        {items.map(item => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={item.name} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group/item">
                              <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                              <ItemIcon size={16} className="text-cyan-400/50" />
                              <span className="text-sm sm:text-base">{item.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </HoloCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Missions Completed
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {projects.map((project, idx) => {
                const Icon = project.icon;
                return (
                  <HoloCard key={idx} className="group">
                    <div className="relative bg-zinc-900/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-purple-500/40 hover:border-purple-500/70 transition-all duration-500 h-full holographic-border-purple">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-500/20 p-2.5 sm:p-3 rounded-xl border border-purple-500/40 group-hover:bg-purple-500/30 transition-colors holographic-border-purple">
                            <Icon className="text-purple-400" size={20} />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        {project.status && (
                          <span className="bg-green-500/20 text-green-400 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30 flex items-center gap-1.5 holographic-border-green whitespace-nowrap">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="hidden sm:inline">{project.status}</span>
                            <span className="sm:hidden">Live</span>
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                          <span key={tech} className="bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors holographic-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </HoloCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Beyond the Code
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {interests.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <HoloCard key={idx} className="group">
                    <div className="relative bg-zinc-900/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all duration-500 holographic-border">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="bg-cyan-500/20 p-2.5 sm:p-3 rounded-xl border border-cyan-500/40 group-hover:bg-cyan-500/30 transition-colors shrink-0 holographic-border">
                          <Icon className="text-cyan-400" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {interest.title}
                          </h3>
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{interest.description}</p>
                        </div>
                      </div>
                    </div>
                  </HoloCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Millennium Falcon */}
            <div className="absolute -top-20 -right-10 sm:-right-20 opacity-60 animate-float hidden sm:block">
              <svg width="180" height="120" viewBox="0 0 180 120" className="drop-shadow-2xl">
                <defs>
                  <filter id="falconGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <radialGradient id="engineGlow">
                    <stop offset="0%" stopColor="#4169E1" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#4169E1" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                
                {/* Main body - circular */}
                <ellipse cx="90" cy="60" rx="45" ry="35" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                <ellipse cx="90" cy="60" rx="38" ry="28" fill="#9CA3AF" opacity="0.3"/>
                
                {/* Cockpit */}
                <ellipse cx="95" cy="55" rx="12" ry="10" fill="#1F2937" stroke="#374151" strokeWidth="1"/>
                <ellipse cx="95" cy="55" rx="8" ry="6" fill="#4169E1" opacity="0.6" filter="url(#falconGlow)"/>
                
                {/* Left mandible */}
                <path d="M 50 60 Q 30 50 20 55 L 15 60 L 20 65 Q 30 70 50 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                <path d="M 45 60 L 25 58 L 25 62 L 45 60 Z" fill="#9CA3AF" opacity="0.4"/>
                
                {/* Right mandible */}
                <path d="M 130 60 Q 150 50 160 55 L 165 60 L 160 65 Q 150 70 130 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                <path d="M 135 60 L 155 58 L 155 62 L 135 60 Z" fill="#9CA3AF" opacity="0.4"/>
                
                {/* Radar dish */}
                <ellipse cx="110" cy="45" rx="8" ry="3" fill="#4B5563" stroke="#374151" strokeWidth="1"/>
                <line x1="110" y1="48" x2="110" y2="55" stroke="#4B5563" strokeWidth="2"/>
                
                {/* Engine glow */}
                <ellipse cx="55" cy="75" rx="8" ry="6" fill="url(#engineGlow)" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="75" cy="80" rx="7" ry="5" fill="url(#engineGlow)" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.2s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="105" cy="80" rx="7" ry="5" fill="url(#engineGlow)" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="0.9s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="125" cy="75" rx="8" ry="6" fill="url(#engineGlow)" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1.1s" repeatCount="indefinite"/>
                </ellipse>
                
                {/* Panel details */}
                <line x1="70" y1="50" x2="110" y2="50" stroke="#4B5563" strokeWidth="1" opacity="0.5"/>
                <line x1="70" y1="70" x2="110" y2="70" stroke="#4B5563" strokeWidth="1" opacity="0.5"/>
                <circle cx="80" cy="60" r="3" fill="#374151" opacity="0.6"/>
                <circle cx="100" cy="60" r="3" fill="#374151" opacity="0.6"/>
              </svg>
            </div>
            
            {/* Mobile Falcon - smaller version */}
            <div className="absolute -top-12 -right-5 opacity-50 animate-float sm:hidden">
              <svg width="90" height="60" viewBox="0 0 180 120" className="drop-shadow-xl">
                <defs>
                  <filter id="falconGlowMobile">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <radialGradient id="engineGlowMobile">
                    <stop offset="0%" stopColor="#4169E1" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#4169E1" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                
                <ellipse cx="90" cy="60" rx="45" ry="35" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                <ellipse cx="90" cy="60" rx="38" ry="28" fill="#9CA3AF" opacity="0.3"/>
                <ellipse cx="95" cy="55" rx="12" ry="10" fill="#1F2937" stroke="#374151" strokeWidth="1"/>
                <ellipse cx="95" cy="55" rx="8" ry="6" fill="#4169E1" opacity="0.6" filter="url(#falconGlowMobile)"/>
                <path d="M 50 60 Q 30 50 20 55 L 15 60 L 20 65 Q 30 70 50 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                <path d="M 130 60 Q 150 50 160 55 L 165 60 L 160 65 Q 150 70 130 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                
                <ellipse cx="55" cy="75" rx="8" ry="6" fill="url(#engineGlowMobile)" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="125" cy="75" rx="8" ry="6" fill="url(#engineGlowMobile)" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1.1s" repeatCount="indefinite"/>
                </ellipse>
              </svg>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Establish Contact
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Open to collaborations, exciting projects, and meaningful conversations. 
              Let's build something extraordinary together across the digital galaxy!
            </p>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <a 
                href="mailto:shrivastavasourabh03@gmail.com" 
                className="flex items-center gap-3 bg-zinc-900/60 backdrop-blur-md px-4 sm:px-5 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all group holographic-border"
                aria-label="Send email to shrivastavasourabh03@gmail.com"
              >
                <div className="bg-cyan-500/20 p-2.5 sm:p-3 rounded-xl border border-cyan-500/40 group-hover:bg-cyan-500/30 transition-colors holographic-border">
                  <Mail className="text-cyan-400 group-hover:scale-110 transition-transform" size={18} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-1">Email Transmission</div>
                  <span className="text-gray-300 text-xs sm:text-sm block truncate">shrivastavasourabh03@gmail.com</span>
                </div>
              </a>
              
              <a 
                href="tel:+918269693742" 
                className="flex items-center gap-3 bg-zinc-900/60 backdrop-blur-md px-4 sm:px-5 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all group holographic-border"
                aria-label="Call +91 8269693742"
              >
                <div className="bg-cyan-500/20 p-2.5 sm:p-3 rounded-xl border border-cyan-500/40 group-hover:bg-cyan-500/30 transition-colors holographic-border">
                  <Phone className="text-cyan-400 group-hover:scale-110 transition-transform" size={18} />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-1">Voice Channel</div>
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
                className="bg-zinc-900/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all group holographic-border"
                aria-label="Visit GitHub profile"
              >
                <Github className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/sourabh-shrivastava-742b64329" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all group holographic-border"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
              
              <a 
                href="https://www.instagram.com/sourabh_shrivastava7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all group holographic-border"
                aria-label="Visit Instagram profile"
              >
                <Instagram className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer with Star Wars Constellation */}
        <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-cyan-500/40 text-center relative">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <radialGradient id="star-gradient-cyan">
                  <stop offset="0%" stopColor="#00CED1" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="star-gradient-purple">
                  <stop offset="0%" stopColor="#9370DB" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9370DB" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="20%" cy="50%" r="2" fill="url(#star-gradient-cyan)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="40%" cy="30%" r="1.5" fill="url(#star-gradient-purple)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="60%" cy="70%" r="2" fill="url(#star-gradient-cyan)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="80%" cy="40%" r="1.5" fill="url(#star-gradient-purple)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <line x1="20%" y1="50%" x2="40%" y2="30%" stroke="#00CED1" strokeWidth="0.5" opacity="0.3" />
              <line x1="40%" y1="30%" x2="60%" y2="70%" stroke="#9370DB" strokeWidth="0.5" opacity="0.3" />
              <line x1="60%" y1="70%" x2="80%" y2="40%" stroke="#00CED1" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm mb-2">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-cyan-400" />
                <p>© 2025 Sourabh Shrivastava</p>
              </div>
              <span className="hidden sm:inline">•</span>
              <p>Crafted with the Force of React & Tailwind CSS</p>
            </div>
            <p className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-sm mb-2 starwars-text font-bold">
              May the Force be with you
            </p>
            <p className="text-gray-600 text-xs">
              Press <kbd className="px-2 py-1 bg-zinc-800 border border-cyan-500/40 rounded text-cyan-400">S</kbd> or tap the <Zap className="inline w-3 h-3 text-cyan-400" /> button to toggle hyperspace
            </p>
          </div>
        </footer>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes holographicPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }

        .holographic-pulse {
          animation: holographicPulse 2s ease-in-out infinite;
        }

        .holographic-border {
          box-shadow: 0 0 10px rgba(100, 200, 255, 0.3), 0 0 20px rgba(100, 200, 255, 0.2);
          transition: all 0.3s ease;
        }

        .holographic-border:hover {
          box-shadow: 0 0 20px rgba(100, 200, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3), 0 0 60px rgba(100, 200, 255, 0.2);
        }

        .holographic-border-purple {
          box-shadow: 0 0 10px rgba(147, 112, 219, 0.3), 0 0 20px rgba(147, 112, 219, 0.2);
          transition: all 0.3s ease;
        }

        .holographic-border-purple:hover {
          box-shadow: 0 0 20px rgba(147, 112, 219, 0.5), 0 0 40px rgba(147, 112, 219, 0.3), 0 0 60px rgba(147, 112, 219, 0.2);
        }

        .holographic-border-pink {
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.3), 0 0 20px rgba(255, 105, 180, 0.2);
          transition: all 0.3s ease;
        }

        .holographic-border-pink:hover {
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.5), 0 0 40px rgba(255, 105, 180, 0.3), 0 0 60px rgba(255, 105, 180, 0.2);
        }

        .holographic-border-green {
          box-shadow: 0 0 10px rgba(50, 205, 50, 0.3), 0 0 20px rgba(50, 205, 50, 0.2);
        }

        .holographic-btn {
          box-shadow: 0 0 20px rgba(100, 200, 255, 0.6), 0 0 40px rgba(100, 200, 255, 0.3);
          transition: all 0.3s ease;
        }

        .holographic-btn:hover {
          box-shadow: 0 0 30px rgba(100, 200, 255, 0.8), 0 0 60px rgba(100, 200, 255, 0.5), 0 0 90px rgba(100, 200, 255, 0.3);
          transform: translateY(-2px);
        }

        .starwars-text {
          font-family: 'Courier New', monospace;
          letter-spacing: 0.05em;
        }

        .starwars-title {
          text-shadow: 0 0 20px rgba(100, 200, 255, 0.6), 0 0 40px rgba(147, 112, 219, 0.4);
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes nebula-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes nebula-pulse-delayed {
          0%, 100% {
            opacity: 0.25;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.15) rotate(5deg);
          }
        }

        @keyframes nebula-pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
        }

        .animate-nebula-pulse {
          animation: nebula-pulse 8s ease-in-out infinite;
        }

        .animate-nebula-pulse-delayed {
          animation: nebula-pulse-delayed 10s ease-in-out infinite;
        }

        .animate-nebula-pulse-slow {
          animation: nebula-pulse-slow 12s ease-in-out infinite;
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
          animation: shooting-star 3s ease-out infinite;
          opacity: 0;
        }

        .shooting-star::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
          transform: translateX(-100%);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}