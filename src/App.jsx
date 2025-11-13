import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, Mail, Phone, Code2, Rocket, Award, Users, Dumbbell, ShoppingCart, Sparkles, ArrowRight, Database, Layers, Palette, Terminal, Cpu, Globe, FileText, BookOpen, Zap } from 'lucide-react';

// ==================== STARFIELD COMPONENT ====================
const Starfield = ({ speed = 1, density = 70 }) => {
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
    <div className="fixed right-4 sm:right-6 md:right-8 top-0 h-full w-10 z-50 pointer-events-none flex flex-col items-center">
      {/* Hilt at the top */}
      <div className="mt-4">
        <svg width="40" height="70" viewBox="0 0 40 70">
          <defs>
            <linearGradient id="hiltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="30%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#2a2a2a" />
              <stop offset="70%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="gripGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#3a3a3a" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            <radialGradient id="buttonGlow">
              <stop offset="0%" stopColor="#4169E1" stopOpacity="1"/>
              <stop offset="100%" stopColor="#4169E1" stopOpacity="0"/>
            </radialGradient>
          </defs>
          
          {/* Main hilt body with more detail */}
          <rect x="6" y="0" width="28" height="60" fill="url(#hiltGradient)" stroke="#000" strokeWidth="1.5" rx="4"/>
          
          {/* Inner body detail */}
          <rect x="9" y="3" width="22" height="54" fill="#1a1a1a" rx="3"/>
          
          {/* Grip sections with improved detail */}
          <rect x="8" y="15" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          <rect x="8" y="20" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          <rect x="8" y="25" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          <rect x="8" y="30" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          <rect x="8" y="35" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          <rect x="8" y="40" width="24" height="3" fill="url(#gripGradient)" rx="1"/>
          
          {/* Activation button with glow */}
          <circle cx="20" cy="10" r="4" fill="#2a2a2a" stroke="#4a4a4a" strokeWidth="1.5"/>
          <circle cx="20" cy="10" r="2.5" fill="#4169E1" opacity="0.9" filter="url(#buttonGlow)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          
          {/* Control panel details */}
          <rect x="12" y="48" width="4" height="2" fill="#4169E1" opacity="0.5" rx="0.5"/>
          <rect x="18" y="48" width="4" height="2" fill="#DC143C" opacity="0.5" rx="0.5"/>
          <rect x="24" y="48" width="4" height="2" fill="#32CD32" opacity="0.5" rx="0.5"/>
          
          {/* Emitter section */}
          <rect x="8" y="58" width="24" height="10" fill="#0a0a0a" stroke="#000" strokeWidth="1.5" rx="2"/>
          <rect x="10" y="60" width="20" height="6" fill="#1a1a1a" rx="1"/>
          
          {/* Emitter aperture */}
          <ellipse cx="20" cy="66" rx="8" ry="2" fill="#0a0a0a" stroke="#4169E1" strokeWidth="0.5" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Blade - grows as you scroll - Enhanced Blue color */}
      <div 
        className="relative w-4 transition-all duration-100"
        style={{ height: `calc(${bladeHeight}% - 90px)`, maxHeight: 'calc(100vh - 110px)' }}
      >
        {bladeHeight > 0 && (
          <svg width="16" height="100%" viewBox="0 0 16 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <filter id="saberGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4169E1" stopOpacity="0.2"/>
                <stop offset="3%" stopColor="#4169E1" stopOpacity="1"/>
                <stop offset="97%" stopColor="#4169E1" stopOpacity="1"/>
                <stop offset="100%" stopColor="#87CEEB" stopOpacity="1"/>
              </linearGradient>
              <linearGradient id="coreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3"/>
                <stop offset="5%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                <stop offset="95%" stopColor="#87CEEB" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#4169E1" stopOpacity="1"/>
              </linearGradient>
            </defs>
            
            {/* Outer glow layer */}
            <rect x="0" y="0" width="16" height="100" fill="url(#bladeGradient)" filter="url(#saberGlow)" opacity="0.95" rx="8"/>
            
            {/* Middle bright layer */}
            <rect x="3" y="0" width="10" height="100" fill="url(#bladeGradient)" opacity="0.8" rx="5"/>
            
            {/* Core layer */}
            <rect x="5" y="0" width="6" height="100" fill="url(#coreGradient)" opacity="0.9" rx="3"/>
            
            {/* Ultra-bright center line */}
            <rect x="7" y="0" width="2" height="100" fill="#FFFFFF" opacity="0.95" rx="1"/>
            
            {/* Tip enhancement */}
            <ellipse cx="8" cy="100" rx="6" ry="3" fill="#87CEEB" opacity="0.8" filter="url(#saberGlow)"/>
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
  const [showIntroText, setShowIntroText] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      // Intro text exits smoothly at 3 seconds
      const introTimer = setTimeout(() => {
        setShowIntroText(false);
      }, 3000);
      
      // Start fade out at 17 seconds (crawl fades while still moving)
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 17000);
      
      // Complete at 19 seconds
      const completeTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 19000);
      
      return () => {
        clearTimeout(introTimer);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
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
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Intro Text - "A long time ago..." */}
      {!prefersReducedMotion && (
        <div className={`absolute inset-0 flex items-center justify-center intro-text-container ${!showIntroText ? 'intro-exit' : ''}`}>
          <p className="intro-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center px-8">
            A long time ago in a galaxy far,<br/>far away....
          </p>
        </div>
      )}
      
      {/* Crawl */}
      <div className={`starwars-container ${showIntroText && !prefersReducedMotion ? 'opacity-0' : 'opacity-100 crawl-enter'}`}>
        <div className={`crawl-perspective ${prefersReducedMotion ? '' : 'crawl-animation'}`}>
          <div className="crawl-content">
            <div className="episode-title">
              <p className="episode-number">EPISODE IV</p>
              <h1 className="episode-name">A NEW CODE</h1>
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
        .intro-text-container {
          animation: introFadeIn 1.5s ease-in-out forwards;
        }
        
        .intro-text-container.intro-exit {
          animation: introMoveUp 1s ease-in-out forwards;
        }
        
        @keyframes introFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes introMoveUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-120vh);
          }
        }
        
        .crawl-enter {
          animation: crawlFadeIn 0.8s ease-in forwards;
        }
        
        @keyframes crawlFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .intro-text {
          color: #4DA8DA;
          font-family: 'Courier New', monospace;
          font-weight: 400;
          letter-spacing: 0.1em;
          line-height: 1.6;
          text-shadow: 0 0 20px rgba(77, 168, 218, 0.8),
                       0 0 40px rgba(77, 168, 218, 0.6),
                       0 0 60px rgba(77, 168, 218, 0.4);
        }
        
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
          animation: crawl 16s linear forwards;
        }
        
        @keyframes crawl {
          0% {
            transform: rotateX(20deg) translateY(100vh);
            opacity: 1;
          }
          90% {
            transform: rotateX(20deg) translateY(-100%);
            opacity: 1;
          }
          100% {
            transform: rotateX(20deg) translateY(-120%);
            opacity: 0;
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
const ConsoleBadge = ({ label, value, icon: Icon, status = 'Active' }) => {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-cyan-500/50 rounded-lg px-3 py-2 flex items-center gap-2 holographic-border">
      <div className="relative">
        <Icon className="text-cyan-400" size={16} />
        {status === 'Active' && (
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
  
  const toggleHyperspace = () => {
    setStarfieldSpeed(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCrawlComplete = () => {
    setShowCrawl(false);
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

      <Starfield speed={starfieldSpeed} density={90} />
      <Spaceships />

      {/* Enhanced Nebula Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {/* Purple Nebula - Top Right */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] opacity-25">
          <div className="w-full h-full bg-gradient-radial from-purple-600/50 via-purple-500/25 to-transparent blur-3xl animate-nebula-pulse"></div>
        </div>
        
        {/* Cyan Nebula - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-30">
          <div className="w-full h-full bg-gradient-radial from-cyan-500/50 via-cyan-400/25 to-transparent blur-3xl animate-nebula-pulse-delayed"></div>
        </div>
        
        {/* Pink Nebula - Middle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-20">
          <div className="w-full h-full bg-gradient-radial from-pink-500/40 via-pink-400/20 to-transparent blur-3xl animate-nebula-pulse-slow"></div>
        </div>
        
        {/* Blue Nebula - Top Left */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20">
          <div className="w-full h-full bg-gradient-radial from-blue-500/40 via-blue-400/20 to-transparent blur-3xl animate-nebula-pulse"></div>
        </div>
        
        {/* Shooting stars */}
        <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '2s' }}></div>
        <div className="shooting-star" style={{ top: '60%', left: '80%', animationDelay: '5s' }}></div>
        <div className="shooting-star" style={{ top: '40%', left: '50%', animationDelay: '8s' }}></div>
        <div className="shooting-star" style={{ top: '80%', left: '20%', animationDelay: '11s' }}></div>
      </div>

      {/* Hyperspace Toggle Button - Fixed position */}
      <button
        onClick={toggleHyperspace}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-3 sm:p-4 rounded-full transition-all holographic-btn shadow-2xl"
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
        <section className="min-h-screen flex items-center justify-center px-16 sm:px-20 md:px-24 lg:px-8 py-12 sm:py-20">
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
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                    <span className="block mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                      SOURABH
                    </span>
                    <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                      SHRIVASTAVA
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
                    <ConsoleBadge label="STATUS" value="Active" icon={Cpu} status="Active" />
                    <ConsoleBadge label="MISSIONS" value="10+" icon={Rocket} />
                    <ConsoleBadge label="SECTOR" value="EARTH" icon={Globe} />
                  </div>

                  <div className="flex gap-3 justify-center lg:justify-start flex-wrap pt-4">
                    <a 
                      href="#contact" 
                      className="group flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn"
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
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn-purple"
                      aria-label="View resume"
                    >
                      <FileText size={16} /> 
                      <span>View Resume</span>
                    </a>
                    <a 
                      href="#projects" 
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-4 sm:px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-white holographic-btn-green"
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
        <section className="py-12 sm:py-16 md:py-20 px-16 sm:px-20 md:px-24 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent starwars-title">
                Mission Brief
              </h2>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            
            <HoloCard className="group">
              <div className="relative bg-zinc-900/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all duration-500 holographic-border">
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

                <div className="bg-zinc-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-purple-500/40 mt-6 sm:mt-8 holographic-border-purple">
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
        <section className="py-12 sm:py-16 md:py-20 px-16 sm:px-20 md:px-24 lg:px-6">
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
                    <div className="relative bg-zinc-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all duration-500 h-full holographic-border">
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
        <section id="projects" className="py-12 sm:py-16 md:py-20 px-16 sm:px-20 md:px-24 lg:px-6">
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
                    <div className="relative bg-zinc-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-purple-500/50 hover:border-purple-500/80 transition-all duration-500 h-full holographic-border-purple">
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
        <section className="py-12 sm:py-16 md:py-20 px-16 sm:px-20 md:px-24 lg:px-6">
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
                    <div className="relative bg-zinc-900/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all duration-500 holographic-border">
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
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-16 sm:px-20 md:px-24 lg:px-6">
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
                className="flex items-center gap-3 bg-zinc-900/70 backdrop-blur-md px-4 sm:px-5 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all group holographic-border"
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
                className="flex items-center gap-3 bg-zinc-900/70 backdrop-blur-md px-4 sm:px-5 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all group holographic-border"
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
                className="bg-zinc-900/70 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all group holographic-border"
                aria-label="Visit GitHub profile"
              >
                <Github className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/sourabh-shrivastava-742b64329" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/70 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all group holographic-border"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
              
              <a 
                href="https://www.instagram.com/sourabh_shrivastava7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/70 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-500/80 transition-all group holographic-border"
                aria-label="Visit Instagram profile"
              >
                <Instagram className="text-gray-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={22} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer with Star Wars Constellation */}
        <footer className="py-6 sm:py-8 px-16 sm:px-20 md:px-24 lg:px-6 border-t border-cyan-500/40 text-center relative">
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
        /* Hide default scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
        
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
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
          box-shadow: 0 0 15px rgba(100, 200, 255, 0.4), 0 0 30px rgba(100, 200, 255, 0.3);
          transition: all 0.3s ease;
        }

        .holographic-border:hover {
          box-shadow: 0 0 25px rgba(100, 200, 255, 0.6), 0 0 50px rgba(100, 200, 255, 0.4), 0 0 75px rgba(100, 200, 255, 0.3);
        }

        .holographic-border-purple {
          box-shadow: 0 0 15px rgba(147, 112, 219, 0.4), 0 0 30px rgba(147, 112, 219, 0.3);
          transition: all 0.3s ease;
        }

        .holographic-border-purple:hover {
          box-shadow: 0 0 25px rgba(147, 112, 219, 0.6), 0 0 50px rgba(147, 112, 219, 0.4), 0 0 75px rgba(147, 112, 219, 0.3);
        }

        .holographic-border-pink {
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.4), 0 0 30px rgba(255, 105, 180, 0.3);
          transition: all 0.3s ease;
        }

        .holographic-border-pink:hover {
          box-shadow: 0 0 25px rgba(255, 105, 180, 0.6), 0 0 50px rgba(255, 105, 180, 0.4), 0 0 75px rgba(255, 105, 180, 0.3);
        }

        .holographic-border-green {
          box-shadow: 0 0 15px rgba(50, 205, 50, 0.4), 0 0 30px rgba(50, 205, 50, 0.3);
        }

        .holographic-btn {
          box-shadow: 0 0 25px rgba(100, 200, 255, 0.7), 0 0 50px rgba(100, 200, 255, 0.4);
          transition: all 0.3s ease;
        }

        .holographic-btn:hover {
          box-shadow: 0 0 35px rgba(100, 200, 255, 0.9), 0 0 70px rgba(100, 200, 255, 0.6), 0 0 100px rgba(100, 200, 255, 0.4);
          transform: translateY(-2px);
        }

        .holographic-btn-purple {
          box-shadow: 0 0 25px rgba(147, 112, 219, 0.7), 0 0 50px rgba(147, 112, 219, 0.4);
          transition: all 0.3s ease;
        }

        .holographic-btn-purple:hover {
          box-shadow: 0 0 35px rgba(147, 112, 219, 0.9), 0 0 70px rgba(147, 112, 219, 0.6), 0 0 100px rgba(147, 112, 219, 0.4);
          transform: translateY(-2px);
        }

        .holographic-btn-green {
          box-shadow: 0 0 25px rgba(50, 205, 50, 0.7), 0 0 50px rgba(50, 205, 50, 0.4);
          transition: all 0.3s ease;
        }

        .holographic-btn-green:hover {
          box-shadow: 0 0 35px rgba(50, 205, 50, 0.9), 0 0 70px rgba(50, 205, 50, 0.6), 0 0 100px rgba(50, 205, 50, 0.4);
          transform: translateY(-2px);
        }

        /* Star Wars Logo Style Name - Main titles */
        .starwars-logo-name {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: 900;
          letter-spacing: 0.03em;
          display: inline-block;
          position: relative;
          
          /* Black fill inside */
          color: #000000;
          
          /* Thick golden/yellow outline - Star Wars official yellow */
          -webkit-text-stroke: 6px #FFC500;
          text-stroke: 6px #FFC500;
          paint-order: stroke fill;
          
          /* Wide, compressed look like Star Wars logo */
          transform: scaleY(1.15) scaleX(1.05);
          
          /* Multiple shadow layers for 3D depth and glow */
          text-shadow: 
            /* Bright golden glow around the outline */
            0 0 30px rgba(255, 197, 0, 0.9),
            0 0 60px rgba(255, 197, 0, 0.7),
            0 0 90px rgba(255, 197, 0, 0.5),
            
            /* Inner golden shine for depth */
            inset 0 0 10px rgba(255, 215, 0, 0.8),
            
            /* 3D effect - darker golden layers */
            3px 3px 0 #DAA520,
            4px 4px 0 #B8860B,
            5px 5px 0 #9B7500,
            6px 6px 0 #8B6914,
            
            /* Deep shadow for dramatic effect */
            8px 8px 15px rgba(0, 0, 0, 0.9),
            10px 10px 20px rgba(0, 0, 0, 0.7),
            12px 12px 30px rgba(0, 0, 0, 0.5);
          
          /* Slight vertical spacing */
          line-height: 0.9;
        }

        /* Star Wars Logo Style for Section Titles */
        .starwars-logo-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: 900;
          letter-spacing: 0.05em;
          display: inline-block;
          position: relative;
          
          /* Black fill inside */
          color: #000000;
          
          /* Thick golden/yellow outline */
          -webkit-text-stroke: 4px #FFC500;
          text-stroke: 4px #FFC500;
          paint-order: stroke fill;
          
          /* Wide look */
          transform: scaleY(1.12) scaleX(1.03);
          
          /* Glowing shadow effects */
          text-shadow: 
            /* Golden glow */
            0 0 25px rgba(255, 197, 0, 0.9),
            0 0 50px rgba(255, 197, 0, 0.6),
            0 0 75px rgba(255, 197, 0, 0.4),
            
            /* 3D depth */
            2px 2px 0 #DAA520,
            3px 3px 0 #B8860B,
            4px 4px 0 #9B7500,
            
            /* Shadow */
            6px 6px 12px rgba(0, 0, 0, 0.8),
            8px 8px 18px rgba(0, 0, 0, 0.6);
          
          line-height: 1;
        }

        /* Star Wars Logo Style for Subtitle Text */
        .starwars-logo-text {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: 800;
          letter-spacing: 0.08em;
          display: inline-block;
          position: relative;
          
          /* Black fill */
          color: #000000;
          
          /* Medium golden outline */
          -webkit-text-stroke: 2px #FFC500;
          text-stroke: 2px #FFC500;
          paint-order: stroke fill;
          
          /* Subtle transformation */
          transform: scaleY(1.08) scaleX(1.02);
          
          /* Lighter glow effect */
          text-shadow: 
            0 0 20px rgba(255, 197, 0, 0.8),
            0 0 40px rgba(255, 197, 0, 0.5),
            1px 1px 0 #DAA520,
            2px 2px 0 #B8860B,
            4px 4px 10px rgba(0, 0, 0, 0.7);
        }

        /* Adjust for medium screens */
        @media (max-width: 1024px) {
          .starwars-logo-name {
            -webkit-text-stroke: 5px #FFC500;
            text-stroke: 5px #FFC500;
            letter-spacing: 0.025em;
          }
          
          .starwars-logo-title {
            -webkit-text-stroke: 3px #FFC500;
            text-stroke: 3px #FFC500;
          }
          
          .starwars-logo-text {
            -webkit-text-stroke: 1.5px #FFC500;
            text-stroke: 1.5px #FFC500;
          }
        }

        /* Adjust for tablets */
        @media (max-width: 768px) {
          .starwars-logo-name {
            -webkit-text-stroke: 4px #FFC500;
            text-stroke: 4px #FFC500;
            letter-spacing: 0.02em;
          }
          
          .starwars-logo-title {
            -webkit-text-stroke: 2.5px #FFC500;
            text-stroke: 2.5px #FFC500;
          }
          
          .starwars-logo-text {
            -webkit-text-stroke: 1.2px #FFC500;
            text-stroke: 1.2px #FFC500;
          }
        }
        
        /* Adjust for mobile */
        @media (max-width: 480px) {
          .starwars-logo-name {
            -webkit-text-stroke: 3px #FFC500;
            text-stroke: 3px #FFC500;
            letter-spacing: 0.015em;
            transform: scaleY(1.1) scaleX(1.03);
          }
          
          .starwars-logo-title {
            -webkit-text-stroke: 2px #FFC500;
            text-stroke: 2px #FFC500;
          }
          
          .starwars-logo-text {
            -webkit-text-stroke: 1px #FFC500;
            text-stroke: 1px #FFC500;
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes nebula-pulse {
          0%, 100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.1);
          }
        }

        @keyframes nebula-pulse-delayed {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15) rotate(5deg);
          }
        }

        @keyframes nebula-pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
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