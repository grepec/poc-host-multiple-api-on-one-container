import React from 'react';
import { Link } from 'react-router-dom';
import { ApiSpec } from '../../types/api';
import { ApiCardImage } from './ApiCardImage';
import { ApiCardContent } from './ApiCardContent';

interface ApiCardProps {
  spec: ApiSpec;
}

export function ApiCard({ spec }: ApiCardProps) {
  return (
    <Link
      to={`/docs/${spec.id}`}
      className="group block bg-white dark:bg-green-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden hover:scale-[1.02] border border-green-100 dark:border-green-800"
    >
      <ApiCardImage image={spec.image} name={spec.name} />
      <ApiCardContent spec={spec} />
    </Link>
  );
}