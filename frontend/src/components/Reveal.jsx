import React from "react";
import useInView from "../hooks/useInView";

/**
 * Smoothly reveals children when scrolled into view.
 *   - variant: "up" | "down" | "left" | "right" | "fade" | "scale"
 *   - delay: ms before the animation starts
 *   - as: wrapper element (default "div")
 */
const variantClass = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  fade: "reveal-fade",
  scale: "reveal-scale"
};

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  once = true
}) => {
  const [ref, inView] = useInView({ once });
  const base = variantClass[variant] || variantClass.up;

  return (
    <Tag
      ref={ref}
      className={`${base} ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
