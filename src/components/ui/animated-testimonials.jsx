"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const AnimatedTestimonials = ({ images, autoplay = false }) => {
  const [active, setActive] = useState(0);

  console.log("img: ", images);

  // Funktioner för att navigera mellan bilder
  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length); // Cirkulera genom bilderna
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length); // Cirkulera genom bilderna
  };

  // Memoize randomRotateY för animationen
  const randomRotateY = useMemo(() => {
    return images.map(() => Math.floor(Math.random() * 21) - 10);
  }, [images]);

  // Autoplay logik
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-2">
      <div className="relative grid grid-cols-1 md:grid-cols-1 gap-0">
        <div>
          <div className="relative h-96 w-50">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY[index],
                  }}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    z: index === active ? 0 : -100,
                    rotate: index === active ? 0 : randomRotateY[index],
                    zIndex: index === active ? 999 : images.length + 2 - index,
                    y: index === active ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY[index],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={image}
                    alt="Testimonial Image"
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center py-4">
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
