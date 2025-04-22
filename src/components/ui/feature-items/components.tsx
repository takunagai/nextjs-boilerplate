import { cn } from "@/lib/utils";
import React from "react";

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const DynamicHeading = ({ 
  level = 'h3', 
  className = '', 
  children 
}: { 
  level?: HeadingLevel; 
  className?: string; 
  children: React.ReactNode 
}) => {
  const Component = level;
  return React.createElement(Component, { className: cn(className) }, children);
};
