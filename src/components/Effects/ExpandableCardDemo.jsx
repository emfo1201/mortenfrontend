"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

export function ExpandableCardDemo({ cards }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const { i18n } = useTranslation();
  const ref = useRef(null);
  const randomStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className={`relative p-1 rounded-3xl w-full max-w-[900px] h-auto md:h-[500px] flex flex-row dark:bg-neutral-900 overflow-hidden ${randomStyle}`}
            >
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="w-2/5 h-full overflow-hidden pt-4"
              >
                <AnimatedTestimonials images={active.images} />
              </motion.div>

              <div className="w-3/5 p-4 flex flex-col justify-between">
                <div className="">
                  <motion.h3
                    layoutId={`title-${active.name}-${id}`}
                    className="font-medium text-neutral-700 dark:text-neutral-200 text-[20px] pt-5"
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${
                      i18n.language === "no"
                        ? active.infoNorwegian
                        : active.infoEnglish
                    }-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base pt-5"
                  >
                    {i18n.language === "no"
                      ? active.infoNorwegian
                      : active.infoEnglish}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-start gap-6">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={card.name}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col bg-gradient-to-br from-slate-400 to-slate-500 border border-slate-500 hover:border-slate-600 hover:shadow-xl hover:scale-105 transition duration-300 dark:border-neutral-700 dark:hover:border-neutral-600 rounded-xl cursor-pointer"
          >
            <div className="flex gap-2 flex-col  w-full">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.images[0]}
                  alt={card.name}
                  className="h-60 w-full  rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col relative">
                <div className="absolute top-0 left-4">
                  <p
                    layoutId={`club-${card.club}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    {card.club}
                  </p>
                </div>

                <div className="absolute top-0 right-4">
                  <p
                    layoutId={`category-${card.category[0].sub}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    {card.category[0].sub}
                  </p>
                </div>

                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="w-full font-medium text-neutral-800 dark:text-neutral-200 pl-4 text-left text-xl mt-5"
                >
                  {card.name}
                </motion.h3>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cardStyles = [
  "bg-gradient-to-br from-blue-500 via-sky-300 to-blue-700 border-4 border-blue-800 shadow-[0_0_25px_rgba(173,216,230,0.6)]",
  "bg-gradient-to-br from-green-500 via-emerald-300 to-green-700 border-4 border-green-800 shadow-[0_0_25px_rgba(144,238,144,0.6)]",
  "bg-gradient-to-br from-purple-500 via-pink-300 to-purple-700 border-4 border-purple-800 shadow-[0_0_25px_rgba(255,105,180,0.6)]",
  "bg-gradient-to-br from-cyan-400 via-teal-300 to-cyan-600 border-4 border-teal-700 shadow-[0_0_25px_rgba(0,255,255,0.6)]",
];
