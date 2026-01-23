import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineChatAlt2,
} from "react-icons/hi";

/*  FadeUp  */
function FadeUp({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Hcontact() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://embed.typeform.com/next/embed.js";
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        setTimeout(() => setFormReady(true), 300);
      };
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) document.head.removeChild(script);
      };
    }
  }, [isScriptLoaded]);

  const contactItems = [
    {
      icon: <HiOutlineLocationMarker className="w-5 h-5" />,
      title: "Location",
      content: "Malabe, Sri Lanka",
      description: "Our Location",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: "100ms",
    },
    {
      icon: <HiOutlineMail className="w-5 h-5" />,
      title: "Email Us",
      content: "work.nextoex@gmail.com",
      description: "24-hour response time",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: "200ms",
      link: "mailto:work.nextoex@gmail.com",
    },
    {
      icon: <HiOutlinePhone className="w-5 h-5" />,
      title: "Call Us",
      content: "+94 71 331 1593",
      description: "Call us anytime",
      gradient: "from-emerald-500 via-emerald-600 to-green-500",
      delay: "300ms",
      link: "tel:+94713311593",
    },
  ];

  return (
    <section
      className="relative w-full bg-gradient-to-b from-gray-950 via-[#0A1128] to-gray-950 px-6 sm:px-12 py-24 mx-auto overflow-hidden"
      id="contact"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>

      {/* Animated gradient orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/*  Heading */}
        <FadeUp
          delay={80}
          className="mx-auto text-center max-w-2xl md:max-w-4xl mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
             Connect Us
          </p>

          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
            Get in Touch
          </h2>

          <p className="text-gray-300 text-base md:text-lg">
            Have a project in mind or need expert consultation? Reach out to our
            team.
          </p>
        </FadeUp>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/*  Left Column - Contact Information */}
          <FadeUp delay={120} className="space-y-8">
            <div
              className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl
              rounded-2xl border border-white/[0.08]
              p-5 sm:p-7 lg:p-10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-7 sm:mb-10">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20">
                  <HiOutlineChatAlt2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Contact Details
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Multiple ways to connect with us
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactItems.map((item, index) => (
                  <FadeUp key={index} delay={200 + index * 120}>
                    <div
                      className="group relative overflow-hidden rounded-xl border border-white/[0.05]
                      bg-gradient-to-br from-white/[0.02] to-transparent
                      p-4 sm:p-6 transition-all duration-500
                      hover:border-white/[0.15] hover:shadow-2xl hover:shadow-blue-500/5"
                    >
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative flex items-center gap-3 sm:gap-5">
                        <div
                          className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${item.gradient}
                          shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <div className="text-white">{item.icon}</div>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1">
                            {item.title}
                          </p>

                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-white text-base sm:text-lg font-semibold
                              hover:text-blue-300 transition-colors duration-300
                              block mb-1 group-hover:translate-x-1 transition-transform"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-white text-base sm:text-lg font-semibold mb-1">
                              {item.content}
                            </p>
                          )}

                          <p className="text-xs sm:text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>

          {/*  Right Column - Contact Form  */}
          <FadeUp delay={160} className="relative w-full">
            <div className="sticky top-8">
              <div
                className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl 
                h-[460px] sm:h-[520px] lg:h-[550px]"
              >
                <div className="border-b border-white/[0.08] bg-gradient-to-r from-white/[0.05] to-white/[0.02] p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          Let’s Talk 👋
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Tell us what you need — we’ll reply fast.
                        </p>
                      </div>
                    </div>

                    {!isScriptLoaded && (
                      <div className="px-3 py-1.5 bg-blue-500/10 rounded-full">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-blue-400 text-xs font-medium">
                            Loading
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative h-[400px] sm:h-[460px] lg:h-[520px]">
                  {!formReady ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center max-w-sm px-8">
                        <div className="relative mb-8">
                          <div className="w-20 h-20 mx-auto">
                            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                            <div
                              className="absolute inset-2 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"
                              style={{ animationDirection: "reverse" }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-white font-medium">
                            Preparing form
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Loading our contact interface...
                          </p>
                          <div className="pt-4">
                            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden w-48 mx-auto">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-1/2 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div
                    className={`h-full w-full transition-opacity duration-500 ${
                      formReady ? "opacity-100" : "opacity-0"
                    }`}
                    data-tf-live="01HM8G88Y72Y70Q2SW4940DP5G"
                    data-tf-opacity="100"
                    data-tf-button-text="Start Conversation"
                    data-tf-medium="snippet"
                    data-tf-hide-headers="true"
                    data-tf-hide-footer="true"
                    data-tf-chat="true"
                  ></div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  All inquiries are confidential. We'll respond within 24 hours.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default Hcontact;