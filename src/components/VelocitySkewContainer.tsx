import React, { ElementType, HTMLAttributes, ReactNode } from 'react';

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
  className = '',
  style,
  ...rest
}) => {

  return (
    <Component
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};
