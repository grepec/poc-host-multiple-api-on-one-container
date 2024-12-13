import React from 'react';
import { Link } from 'react-router-dom';
import { ApiSpec } from '../types/api';
import { CategoryBadge } from './CategoryBadge';

interface ApiCardProps {
  spec: ApiSpec;
}

export function ApiCard({ spec }: ApiCardProps) {
  return (
    <Link
      to={`/docs/${spec.id}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {spec.name}
          </h3>
          {spec.version && (
            <span className="text-sm px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {spec.version}
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {spec.description}
        </p>
        <CategoryBadge category={spec.category} />
      </div>
    </Link>
  );
}