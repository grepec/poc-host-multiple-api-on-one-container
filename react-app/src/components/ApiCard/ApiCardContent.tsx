import React from 'react';
import { ApiSpec } from '../../types/api';
import { CategoryBadge } from '../CategoryBadge';

interface ApiCardContentProps {
  spec: ApiSpec;
}

export function ApiCardContent({ spec }: ApiCardContentProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {spec.name}
        </h3>
        {spec.version && (
          <span className="text-sm px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
            {spec.version}
          </span>
        )}
      </div>
      <p className="text-green-700 dark:text-green-300 text-sm line-clamp-2">
        {spec.description}
      </p>
      <CategoryBadge category={spec.category} />
    </div>
  );
}