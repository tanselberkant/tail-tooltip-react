"use client";

import { useState } from "react";

import { cn } from "../../lib/cn";

export type TooltipPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left"
  | "left";

export type TooltipColor = "dark" | "white";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  color?: TooltipColor;
  className?: string;
  width?: number | string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top-center",
  color = "dark",
  className,
  width,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Base classes for tooltip
  const tooltipBaseClasses = cn(
    "absolute z-50 py-1 px-2 rounded-md text-sm shadow-md transition-opacity duration-200 whitespace-nowrap",
    isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
    color === "dark"
      ? "bg-black text-white border border-black"
      : "bg-white text-black border border-gray-200",
    {
      "origin-top-left":
        position === "top-right" || position === "bottom-right",
      "origin-top-right": position === "top-left" || position === "bottom-left",
      "origin-center":
        position === "top-center" ||
        position === "bottom-center" ||
        position === "left" ||
        position === "right",
    },
    className
  );

  // Position classes
  const positionClasses = {
    "top-left": "bottom-full left-0 mb-2",
    "top-center": "bottom-full left-1/2 -translate-x-1/2 mb-2",
    "top-right": "bottom-full right-0 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    "bottom-right": "top-full right-0 mt-2",
    "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-2",
    "bottom-left": "top-full left-0 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  const getArrowSvg = () => {
    const fillColor = color === "dark" ? "#000000" : "#FFFFFF";
    const strokeColor = color === "dark" ? "#000000" : "#e5e7eb";

    const arrowPositionClasses = {
      "top-left": "absolute top-full left-3 -mt-[2px] ",
      "top-right": "absolute top-full right-3 -mt-[2px]",
      "top-center": "absolute top-full left-1/2 -translate-x-1/2 -mt-[2px]",
      "bottom-left": "absolute bottom-full left-3 -mb-[2px]",
      "bottom-right": "absolute bottom-full right-3 -mb-[2px]",
      "bottom-center":
        "absolute bottom-full left-1/2 -translate-x-1/2 -mb-[2px]",
      right: "absolute right-full top-1/2 -translate-y-1/2 -mr-[2px]",
      left: "absolute left-full top-1/2 -translate-y-1/2 -ml-[2px]",
    };

    if (position.startsWith("top")) {
      return (
        <div className={arrowPositionClasses[position]}>
          {tooltipDownArrow(fillColor, strokeColor)}
        </div>
      );
    } else if (position.startsWith("bottom")) {
      return (
        <div className={arrowPositionClasses[position]}>
          {tooltipUpArrow(fillColor, strokeColor)}
        </div>
      );
    } else if (position === "right") {
      return (
        <div className={arrowPositionClasses.right}>
          {tooltipLeftArrow(fillColor, strokeColor)}
        </div>
      );
    } else if (position === "left") {
      return (
        <div className={arrowPositionClasses.left}>
          {tooltipRightArrow(fillColor, strokeColor)}
        </div>
      );
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      <div
        className={cn(
          "shadow-xsmall ",
          tooltipBaseClasses,
          positionClasses[position]
        )}
        style={width ? { width } : undefined}
      >
        {content}
        {getArrowSvg()}
      </div>
    </div>
  );
};

export default Tooltip;

const tooltipUpArrow = (fill: string, stroke: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="7"
    viewBox="0 0 14 7"
    fill="none"
  >
    <path
      d="M11 5.5L12.2071 5.5L11.3536 4.64645L8.41421 1.70711C7.63317 0.926059 6.36684 0.926057 5.58579 1.70711L2.64645 4.64645L1.79289 5.5L3 5.5L11 5.5Z"
      fill={fill}
      stroke={stroke}
    />
    <rect
      x="14"
      y="7"
      width="14"
      height="2"
      rx="1"
      transform="rotate(-180 14 7)"
      fill={fill}
    />
  </svg>
);

const tooltipRightArrow = (fill: string, stroke: string) => (
  <svg
    width="7"
    height="24"
    viewBox="0 0 7 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 8L1.5 6.79289L2.35355 7.64645L5.29289 10.5858C6.07394 11.3668 6.07394 12.6332 5.29289 13.4142L2.35355 16.3536L1.5 17.2071L1.5 16L1.5 8Z"
      fill={fill}
      stroke={stroke}
    />
    <rect
      y="19"
      width="14"
      height="2"
      rx="1"
      transform="rotate(-90 0 19)"
      fill={fill}
    />
  </svg>
);

const tooltipLeftArrow = (fill: string, stroke: string) => (
  <svg
    width="7"
    height="24"
    viewBox="0 0 7 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 8L5.5 6.79289L4.64645 7.64645L1.70711 10.5858C0.926059 11.3668 0.926057 12.6332 1.70711 13.4142L4.64645 16.3536L5.5 17.2071L5.5 16L5.5 8Z"
      fill={fill}
      stroke={stroke}
    />
    <rect
      x="5"
      y="19"
      width="14"
      height="2"
      rx="1"
      transform="rotate(-90 5 19)"
      fill={fill}
    />
  </svg>
);

const tooltipDownArrow = (fill: string, stroke: string) => (
  <svg
    width="14"
    height="7"
    viewBox="0 0 14 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1.5L12.2071 1.5L11.3536 2.35355L8.41421 5.29289C7.63317 6.07394 6.36684 6.07394 5.58579 5.29289L2.64645 2.35355L1.79289 1.5L3 1.5L11 1.5Z"
      fill={fill}
      stroke={stroke}
    />
    <rect
      x="14"
      y="2"
      width="14"
      height="2"
      rx="1"
      transform="rotate(-180 14 2)"
      fill={fill}
    />
  </svg>
);
