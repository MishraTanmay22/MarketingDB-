import React from 'react';
import { useProduct } from '../context/ProductContext';
import { Crown, ArrowUp } from 'lucide-react';

export const LiveStatsBar: React.FC = () => {
  const { totalProductsCount, totalVotesCount, activities } = useProduct();

  // If no campaigns or activities exist, hide the bar completely
  if (totalProductsCount === 0 && activities.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: 'var(--bg-nav)',
      padding: '0.45rem 0',
      transition: 'background-color 0.25s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Real Stats */}
        {totalProductsCount > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Crown size={13} color="var(--accent-primary)" />
              <strong style={{ color: 'var(--text-primary)' }}>{totalProductsCount}</strong> active campaigns
            </div>

            {totalVotesCount > 0 && (
              <>
                <span style={{ color: 'var(--border-subtle)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ArrowUp size={13} color="var(--accent-primary)" />
                  <strong style={{ color: 'var(--text-primary)' }}>{totalVotesCount}</strong> ranking push ups
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
