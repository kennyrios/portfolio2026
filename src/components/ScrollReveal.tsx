import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type RevealVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';

export interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  as?: ElementType;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  distance = 28,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  as: Component = 'div',
  className = '',
  style,
  ...rest
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({
    threshold,
    rootMargin,
    once,
    delay,
  });

  // Calculate transform according to variant
  const getInitialTransform = () => {
    switch (variant) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'scale-up':
        return 'scale3d(0.96, 0.96, 1)';
      case 'fade-in':
      default:
        return 'none';
    }
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={dynamicStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
