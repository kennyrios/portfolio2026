import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useMagneticProximity } from '../hooks/useMagneticProximity';

export interface MagneticElementProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
  innerStrength?: number;
  active?: boolean;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  as: Component = 'div',
  children,
  radius = 70,
  strength = 0.35,
  innerStrength = 0.15,
  className = '',
  active = true,
  style,
  ...rest
}) => {
  const { elementRef, innerRef } = useMagneticProximity<HTMLElement>({
    radius,
    strength,
    innerStrength,
    active,
  });

  return (
    <Component
      ref={elementRef}
      className={`relative inline-block transition-transform duration-75 will-change-transform ${className}`}
      style={style}
      {...rest}
    >
      {innerStrength > 0 ? (
        <span
          ref={innerRef}
          className="inline-block transition-transform duration-100 will-change-transform"
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
};
