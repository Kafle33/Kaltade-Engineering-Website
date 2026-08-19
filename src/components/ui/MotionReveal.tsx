'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  staggerChildren?: number;
  as?: React.ElementType;
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  direction = 'up',
  staggerChildren,
  as: Component = 'div',
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: yOffset, x: 0 };
      case 'down':
        return { y: -yOffset, x: 0 };
      case 'left':
        return { x: yOffset, y: 0 };
      case 'right':
        return { x: -yOffset, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        ...(staggerChildren && {
          staggerChildren,
          delayChildren: delay,
        }),
      },
    },
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function MotionItem({
  children,
  className,
  yOffset = 12,
}: MotionItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
