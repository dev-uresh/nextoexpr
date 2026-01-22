import React, { useEffect, useRef, useState } from "react";

import img1 from "../assets/techstack/1.png";
import img2 from "../assets/techstack/2.png";
import img3 from "../assets/techstack/3.png";
import img4 from "../assets/techstack/4.png";
import img5 from "../assets/techstack/5.png";
import img6 from "../assets/techstack/6.png";
import img7 from "../assets/techstack/7.png";
import img8 from "../assets/techstack/8.png";
import img9 from "../assets/techstack/9.png";
import img10 from "../assets/techstack/10.png";
import img11 from "../assets/techstack/11.png";
import img12 from "../assets/techstack/12.png";
import img13 from "../assets/techstack/13.png";
import img14 from "../assets/techstack/14.png";
import img15 from "../assets/techstack/15.png";

const logos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const Product = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollAnimationRef = useRef(null);
  const autoScrollPositionRef = useRef(0);
  const lastAutoScrollTimeRef = useRef(0);

  // Background Animation Canvas Ref
  const canvasRef = useRef(null);

  // Particle Network Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseInfluenceRadius = 200;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = 'rgba(0, 184, 255,';
      }

      update(mouse) {
        // Normal movement
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction (repulsion) - very subtle
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          this.x += (dx / dist) * force * 0.5;
          this.y += (dy / dist) * force * 0.5;
        }

        // Boundary wrap
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} 0.3)`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 184, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 11, 35, 0.98)');
      gradient.addColorStop(1, 'rgba(10, 14, 58, 0.96)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw extremely subtle grid
      ctx.strokeStyle = 'rgba(0, 184, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach(p => {
        p.update(mousePos);
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [isDragging]);

  const startAutoScroll = () => {
    const animate = (currentTime) => {
      if (!isDragging && scrollRef.current) {
        const deltaTime = currentTime - lastAutoScrollTimeRef.current;
        const speed = 0.05; // auto scroll speed
        autoScrollPositionRef.current += speed * deltaTime;

        const maxScroll = scrollRef.current.scrollWidth / 2;
        if (autoScrollPositionRef.current >= maxScroll) {
          autoScrollPositionRef.current -= maxScroll;
        }

        scrollRef.current.scrollLeft = autoScrollPositionRef.current;
      }

      lastAutoScrollTimeRef.current = currentTime;
      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  return (
    <section className="w-full bg-[#050b23] flex flex-col items-center px-4 py-16 sm:px-6 relative overflow-hidden">
      {/* Particle Network Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00B8FF]/10 blur-[120px] rounded-full animate-drift-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FFD5]/5 blur-[150px] rounded-full animate-drift-reverse pointer-events-none" />

      <div className="relative z-10 w-full">
        <h2 className="text-2xl font-bold text-center text-white sm:text-3xl lg:text-4xl">
          Techstack we work with
        </h2>

        <p className="mt-3 mb-8 text-sm text-center text-gray-300 lg:text-base">
          Harnessing the power of the latest technologies, we deliver exceptional
          results
        </p>

        <div className="relative w-full my-4 overflow-hidden">
          {/* Fading Effect */}
          <div className="absolute top-0 left-0 z-10 w-20 h-full pointer-events-none bg-gradient-to-r from-[#050b23] to-transparent"></div>
          <div className="absolute top-0 right-0 z-10 w-20 h-full pointer-events-none bg-gradient-to-l from-[#050b23] to-transparent"></div>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className={`flex items-center select-none overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
          >
            {[...logos, ...logos].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tech stack logo ${index}`}
                className="object-contain w-14 mx-4 pointer-events-none sm:w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes drift-slow {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 10%) scale(1.1); }
          66% { transform: translate(-5%, 15%) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15%, -10%) scale(0.95); }
          66% { transform: translate(10%, -20%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }
        
        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Product;