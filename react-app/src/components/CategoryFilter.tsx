import React from 'react';
import { ApiCategory } from '../types/api';
import { useCategories } from '../hooks/useCategories';
import { apiSpecs } from '../config/apiSpecs';

interface CategoryFilterProps {
  selectedCategory: ApiCategory | null;
  onSelectCategory: (category: ApiCategory | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories = useCategories(apiSpecs);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${!selectedCategory 
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
      >
        All APIs
      </button>
      {categories.map(({ category, label, icon: Icon, count }) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
            ${selectedCategory === category
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          <Icon size={16} />
          {label}
          <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}