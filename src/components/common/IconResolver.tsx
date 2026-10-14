import React from 'react';
import * as Icons from 'lucide-react';

interface IconResolverProps {
  name?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name = 'HelpCircle', className = 'w-5 h-5', size, strokeWidth }) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>>)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
};
