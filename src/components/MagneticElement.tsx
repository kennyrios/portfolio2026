import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useMagneticProximity } from '../hooks/useMagneticProximity';

export interface MagneticElementProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
  innerStrength?: number; // Optional secondary parallax factor for inner children
  active?: boolean;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  as: Component = 'div',
  children,
  radius = 80,
  strength = 0.35,
  innerStrength = 0.15,
  className = '',
  active = true,
  style,
  ...rest
}) => {
  const { elementRef, position, isNear } = useMagneticProximity<HTMLElement>({
    radius,
    strength,
    active,
  });

  return (
    <Component
      ref={elementRef}
      className={`relative inline-block transition-transform duration-75 will-change-transform ${className}`}
      style={{
        ...style,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      data-magnetic-near={isNear ? 'true' : 'false'}
      {...rest}
    >
      {innerStrength > 0 ? (
        <span
          className="inline-block transition-transform duration-100 will-change-transform"
          style={{
            transform: `translate3d(${position.x * innerStrength}px, ${position.y * innerStrength}px, 0)`,
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
};
