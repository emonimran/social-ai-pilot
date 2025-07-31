'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  asChild = false, 
  children 
}) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const { isOpen, setIsOpen } = context;

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setIsOpen(!isOpen)
    });
  }

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  align = 'start', 
  children 
}) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');

  const { isOpen, setIsOpen } = context;

  if (!isOpen) return null;

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setIsOpen(false)}
      />
      <div className={cn(
        'absolute top-full z-50 mt-1 min-w-[8rem] rounded-md border border-gray-200 bg-white shadow-lg',
        alignClasses[align]
      )}>
        <div className="p-1">
          {children}
        </div>
      </div>
    </>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  className, 
  children, 
  onClick,
  ...props 
}) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuItem must be used within DropdownMenu');

  const { setIsOpen } = context;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        'cursor-pointer rounded-sm px-2 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 flex items-center',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};