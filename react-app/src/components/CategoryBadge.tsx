import React from 'react';
import { categoryConfig } from '../config/categories';
import { ApiCategory } from '../types/api';

interface CategoryBadgeProps {
  category: ApiCategory;
  showIcon?: boolean;
}

export function CategoryBadge({ category, showIcon = true }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm bg-green-50 dark:bg-green-800/50">
      {showIcon && <Icon size={14} className="text-green-600 dark:text-green-400" />}
      <span className="text-green-700 dark:text-green-300">{config.label}</span>
    </span>
  );
}