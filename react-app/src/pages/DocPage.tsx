import React, { useState } from 'react';
import { RedocStandalone } from 'redoc';
import { useParams, Navigate } from 'react-router-dom';
import { apiSpecs } from '../config/apiSpecs';
import { useTheme } from '../context/ThemeContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

export function DocPage() {
  const { specId } = useParams();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const spec = apiSpecs.find((s) => s.id === specId);

  if (!spec) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      )}
      <ErrorBoundary>
        <RedocStandalone
          specUrl={spec.url}
          options={{
            hideLoading: true,
            theme: {
              typography: {
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '16px',
                lineHeight: '1.5',
                fontWeightRegular: '400',
                fontWeightBold: '600',
                // headingsFont: 'Inter, system-ui, sans-serif',
              },
              colors: {
                primary: {
                  main: '#10B981'
                },
                text: {
                  primary: theme === 'dark' ? '#F3F4F6' : '#111827',
                  secondary: theme === 'dark' ? '#D1D5DB' : '#4B5563'
                },
                gray: {
                  50: theme === 'dark' ? '#374151' : '#F9FAFB',
                  100: theme === 'dark' ? '#1F2937' : '#F3F4F6'
                }
              },
              sidebar: {
                backgroundColor: theme === 'dark' ? '#111827' : '#FFFFFF',
                textColor: theme === 'dark' ? '#F3F4F6' : '#111827',
              },
              schema: {
                nestedBackground: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                typeNameColor: theme === 'dark' ? '#E5E7EB' : '#111827',
                typeTitleColor: theme === 'dark' ? '#F3F4F6' : '#111827',
              },
            },

            scrollYOffset: 64,
            hideDownloadButton: true,
            expandResponses: "200,201",
            jsonSampleExpandLevel: 3,
            hideSingleRequestSampleTab: false,
            showExtensions: false,
            sortPropsAlphabetically: true,
            requiredPropsFirst: true,
            pathInMiddlePanel: true,
            
          }}
          onLoaded={() => setIsLoading(false)}
        />
      </ErrorBoundary>
    </div>
  );
}