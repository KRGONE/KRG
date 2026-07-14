/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  iconName?: keyof typeof Icons;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  iconName = 'Inbox',
}) => {
  const IconComponent = (Icons[iconName] as React.ComponentType<{ className?: string }>) || Icons.Inbox;

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-slate-200 rounded-lg max-w-lg mx-auto shadow-premium-sm">
      <div className="p-4 rounded-full bg-slate-50 border border-slate-100 text-slate-400 mb-5">
        <IconComponent className="h-6 w-6 stroke-[1.5]" />
      </div>

      <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
