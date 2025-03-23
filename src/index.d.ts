import { ReactNode } from "react";

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
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  color?: TooltipColor;
  className?: string;
  width?: number | string;
}

declare function Tooltip(props: TooltipProps): JSX.Element;

export default Tooltip;
