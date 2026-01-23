import React, { useEffect, useRef, useState } from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/company2.png";
import logo3 from "../assets/logo.jpg";
import Ella from "../assets/clients/Ella.png"

/* FadeUp  */
function FadeUp({ children, delay = 0, className = "" }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsVisible(true);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function Clients() {
    const row1 = [
        { id: 1, img: logo1, name: "Client 1" },
        { id: 2, img: Ella, name: "Client 2" },
        { id: 3, img: logo3, name: "Client 3" },
        { id: 4, img: logo1, name: "Client 4" },
        { id: 5, img: logo2, name: "Client 5" },
        { id: 6, img: logo3, name: "Client 6" },
    ];

    const row2 = [
        { id: 7, img: logo2, name: "Client 7" },
        { id: 8, img: logo1, name: "Client 8" },
        { id: 9, img: logo3, name: "Client 9" },
        { id: 10, img: logo2, name: "Client 10" },
        { id: 11, img: logo1, name: "Client 11" },
    ];

    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Particle Network Background Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
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
                this.baseColor = "rgba(0, 184, 255,";
            }

            update(mouse) {
                this.x += this.vx;
                this.y += this.vy;

                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouseInfluenceRadius) {
                    const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
                    this.x += (dx / dist) * force * 0.5;
                    this.y += (dy / dist) * force * 0.5;
                }

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

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "rgba(1, 0, 47, 0.98)");
            gradient.addColorStop(1, "rgba(10, 14, 58, 0.96)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(0, 184, 255, 0.03)";
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

            particles.forEach((p) => {
                p.update(mousePos);
                p.draw();
            });
            drawLines();

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        resize();
        init();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    return (
        <section className="w-full bg-[#01002F] overflow-hidden relative">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00B8FF]/10 blur-[120px] rounded-full animate-drift-slow pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FFD5]/5 blur-[150px] rounded-full animate-drift-reverse pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 lg:px-14 py-20 lg:py-24 relative z-10">
                {/* Heading*/}
                <FadeUp delay={100} className="mx-auto text-center max-w-2xl md:max-w-4xl mb-16">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
                        TRUSTED PARTNERS
                    </p>

                    <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
                        Trusted by Leading Brands
                    </h2>

                    <p className="text-gray-300">
                        We've proudly partnered with 100+ innovative companies worldwide, delivering
                        exceptional results through cutting-edge solutions.
                    </p>
                </FadeUp>


                <div className="space-y-10 lg:space-y-12">
                    {/* Row 1  */}
                    <FadeUp delay={250}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
                            {row1.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative group"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2f0983] via-[#00B8FF] to-[#00FFD5] rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient-x" />

                                    <div
                                        className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-white/10 via-transparent to-white/5
                                        backdrop-blur-sm border border-white/10
                                        transition-all duration-500 group-hover:scale-105
                                        hover:shadow-[0_0_60px_rgba(255,0,128,0.3)]
                                        animate-float"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />

                                        <div
                                            className="rounded-3xl bg-gradient-to-b from-[#0a1233] to-[#070a22]
                      h-[140px] flex items-center justify-center p-6
                      transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[#1a1f40] group-hover:to-[#0a0f2a]"
                                        >
                                            <div
                                                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF0080]/0 via-[#00B8FF]/0 to-[#00FFD5]/0 
                        group-hover:from-[#FF0080]/10 group-hover:via-[#00B8FF]/10 group-hover:to-[#00FFD5]/10 
                        transition-all duration-700 blur-xl"
                                            />

                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="relative z-10 max-w-[160px] max-h-[80px] object-contain
                        opacity-90 group-hover:opacity-100
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:brightness-125
                        group-hover:saturate-150
                        group-hover:drop-shadow-[0_0_20px_rgba(0,184,255,0.6)]"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF0080]/0 via-[#00B8FF]/0 to-[#00FFD5]/0 
                    group-hover:from-[#FF0080]/20 group-hover:via-[#00B8FF]/15 group-hover:to-[#00FFD5]/20 
                    transition-all duration-700 blur-2xl -z-10"
                                    />

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-gradient-to-r from-[#2f0983] to-[#00B8FF] rounded-full"
                                                style={{
                                                    top: `${Math.random() * 100}%`,
                                                    left: `${Math.random() * 100}%`,
                                                    animation: `float-particle ${2 + Math.random() * 2}s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.3}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeUp>

                    {/* Row 2*/}
                    <FadeUp delay={350}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 lg:px-16">
                            {row2.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative group"
                                    style={{
                                        animationDelay: `${index * 100 + 300}ms`,
                                    }}
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD5] via-[#2f0983] to-[#00B8FF] rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient-x" />

                                    <div
                                        className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-white/10 via-transparent to-white/5
                    backdrop-blur-sm border border-white/10
                    transition-all duration-500 group-hover:scale-105
                    hover:shadow-[0_0_60px_rgba(0,255,213,0.3)]
                    animate-float"
                                        style={{
                                            animationDelay: `${index * 100 + 300}ms`,
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />

                                        <div
                                            className="rounded-3xl bg-gradient-to-b from-[#0a1233] to-[#070a22]
                      h-[140px] flex items-center justify-center p-6
                      transition-all duration-500
                      group-hover:bg-gradient-to-b group-hover:from-[#1a1f40] group-hover:to-[#0a0f2a]"
                                        >
                                            <div
                                                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00FFD5]/0 via-[#FF0080]/0 to-[#00B8FF]/0 
                        group-hover:from-[#00FFD5]/10 group-hover:via-[#FF0080]/10 group-hover:to-[#00B8FF]/10 
                        transition-all duration-700 blur-xl"
                                            />

                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="relative z-10 max-w-[160px] max-h-[80px] object-contain
                        opacity-90 group-hover:opacity-100
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:brightness-125
                        group-hover:saturate-150
                        group-hover:drop-shadow-[0_0_20px_rgba(0,255,213,0.6)]"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00FFD5]/0 via-[#FF0080]/0 to-[#00B8FF]/0 
                    group-hover:from-[#00FFD5]/20 group-hover:via-[#FF0080]/15 group-hover:to-[#00B8FF]/20 
                    transition-all duration-700 blur-2xl -z-10"
                                    />

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-gradient-to-r from-[#00FFD5] to-[#2f0983] rounded-full"
                                                style={{
                                                    top: `${Math.random() * 100}%`,
                                                    left: `${Math.random() * 100}%`,
                                                    animation: `float-particle ${2 + Math.random() * 2}s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.3}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes drift-slow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10%, 10%) scale(1.1);
          }
          66% {
            transform: translate(-5%, 15%) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes drift-reverse {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-15%, -10%) scale(0.95);
          }
          66% {
            transform: translate(10%, -20%) scale(1.05);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(10px, -10px) scale(1.2);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-shine {
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: shine 1.5s ease-out 1;
        }
      `}</style>
        </section>
    );
}

export default Clients;
