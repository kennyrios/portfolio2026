import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useVelocitySkew } from '../hooks/useVelocitySkew';

export interface VelocitySkewContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  maxSkew?: number;
  intensity?: number;
  scaleEffect?: boolean;
  className?: string;
}

export const VelocitySkewContainer: React.FC<VelocitySkewContainerProps> = ({
  as: Component = 'div',
  children,
  maxSkew = 3.0,
  intensity = 0.12,
  scaleEffect = false,
  className = '',
  style,
  ...rest
}) => {
  const { skewY, scaleY } = useVelocitySkew({ maxSkew, intensity, scaleEffect });

  return (
    <Component
      className={`will-change-transform transition-transform duration-150 ease-out ${className}`}
      style={{
        ...style,
        transform: `skewY(${skewY}deg) scaleY(${scaleY})`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
