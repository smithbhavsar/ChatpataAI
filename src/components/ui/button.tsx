import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-spice-600 to-curry-500 text-white hover:from-spice-700 hover:to-curry-600 shadow-md',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-500/90',
        outline: 'border border-primary-200 bg-white shadow-sm hover:bg-primary-50',
        secondary: 'bg-curry-100 text-curry-900 shadow-sm hover:bg-curry-200',
        ghost: 'hover:bg-primary-50 hover:text-primary-900',
        link: 'text-primary-900 underline-offset-4 hover:underline',
        spice: 'bg-spice-600 text-white hover:bg-spice-700',
        curry: 'bg-curry-500 text-white hover:bg-curry-600',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };