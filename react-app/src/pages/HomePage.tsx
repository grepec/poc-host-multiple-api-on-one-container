import React, { useState } from 'react';
import { ApiCard } from '../components/ApiCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { PageHeader } from '../components/PageHeader';
import { apiSpecs } from '../config/apiSpecs';
import { ApiCategory } from '../types/api';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null);

  const filteredSpecs = selectedCategory
    ? apiSpecs.filter(spec => spec.category === selectedCategory)
    : apiSpecs;

  return (
    <div className="space-y-8">
      <PageHeader
        title="API Documentation"
        description="Browse and explore API documentation for popular services and platforms."
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSpecs.map((spec) => (
          <ApiCard key={spec.id} spec={spec} />
        ))}
      </div>
    </div>
  );
}