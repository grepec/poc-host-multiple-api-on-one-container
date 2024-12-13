import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">
        {title}
      </h1>
      {description && (
        <p className="text-green-700 dark:text-green-300">
          {description}
        </p>
      )}
    </div>
  );
}