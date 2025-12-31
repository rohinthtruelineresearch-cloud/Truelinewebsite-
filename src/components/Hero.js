import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Hero = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Create smooth scroll
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,
      speed: 3,
      effects: true,
    });

    // Random speed effects for each image container
    smoother.effects(".hero__image-cont", {
      speed: () => gsap.utils.random(0.55, 0.85, 0.05),
    });

    // Swipe animation
    gsap.to(".anim-swipe", {
      yPercent: 300,
      delay: 0.2,
      duration: 3,
      stagger: {
        from: "random",
        each: 0.1,
      },
      ease: "sine.out",
    });

    // Parallax + scale scroll effect
    gsap.to(".hero__image-cont > img", {
      scale: 1.5,
      xPercent: 20,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=3000px",
        scrub: true,
      },
    });

    return () => smoother.kill(); // Cleanup
  }, []);

  const imageSrc =
    "https://assets.codepen.io/756881/dawid-zawila-TN8inGqMH7k-unsplash.jpg";

  return (
    <div id="wrapper" ref={wrapperRef}>
      <div id="content" ref={contentRef}>
        {/* Hero Section */}
        <section className="hero h-screen">
          <div className="hero__inner grid grid-cols-6 h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="hero__image-cont relative overflow-hidden"
              >
                <img
                  src={imageSrc}
                  alt={`hero-${i}`}
                  className="absolute top-0 left-0 w-[700%] h-full object-cover"
                  style={{ left: `-${(i + 1) * 100}%` }}
                />
                <div className="anim-swipe absolute top-0 left-0 w-full h-full bg-[#111111]"></div>
                {i !== 5 && (
                  <div className="absolute right-0 top-0 w-[2.5px] h-full bg-[#111111] z-[999]"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Spacer Section */}
        <section className="spacer h-[300vh]"></section>

        {/* Scroll Indicator */}
        <img
          className="scroll fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] w-12 h-12"
          src="https://img.icons8.com/glyph-neue/128/ffffff/circled-down-2.png"
          alt="scroll down"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Hero;
