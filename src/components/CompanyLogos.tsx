import React from 'react';

export const OptimusIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Geometric 4-pointed kinetic pinwheel in white on dark rounded tile */}
    <path d="M12 2L15.5 8.5L22 12L15.5 15.5L12 22L8.5 15.5L2 12L8.5 8.5L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 5.5L14.2 9.8L18.5 12L14.2 14.2L12 18.5L9.8 14.2L5.5 12L9.8 9.8L12 5.5Z" fill="currentColor" />
  </svg>
);

export const PaydestalIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    {/* Stylized P with yellow/green fintech circuitry accents */}
    <rect x="5" y="4" width="4" height="16" rx="1.5" fill="#FACC15" />
    <rect x="8" y="4" width="8" height="7" rx="3.5" fill="#FACC15" />
    <circle cx="12" cy="7.5" r="1.8" fill="#166534" />
    <rect x="14" y="6" width="5" height="3" rx="1" fill="#22C55E" />
    <rect x="5" y="14" width="3" height="3" rx="0.5" fill="#166534" />
  </svg>
);

export const EducativeIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    {/* Terminal prompt icon >_ */}
    <path d="M6 7L12 12L6 17" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="14" y1="17" x2="19" y2="17" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

export const FreeCodeCampIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Flame icon enclosed in parentheses ( ) */}
    <path d="M4 6C2.5 9.5 2.5 14.5 4 18M20 6C21.5 9.5 21.5 14.5 20 18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M12 4C12 7.5 10 9 10 11.5C10 13.5 11.5 14.5 11.5 16C11.5 16.5 11.2 17.2 10.5 17.5C12.5 18 14.5 16.5 14.5 14C14.5 11.5 13 10.5 13.5 8C14.2 9.5 15.5 10.8 15.5 13C15.5 16 13.5 19 10.5 19C7.5 19 6.5 16.5 6.5 14C6.5 10.5 9.5 7.5 12 4Z" fill="#ffffff" />
  </svg>
);

export const WinRealtyIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    {/* Orange hexagon with stylized W */}
    <path d="M6 8L8.5 16L12 10L15.5 16L18 8" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AgproIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Blue tile with "Ag" over "pro" */}
    <text x="3" y="11" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="10">Ag</text>
    <text x="3" y="20" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="9">pro</text>
  </svg>
);
