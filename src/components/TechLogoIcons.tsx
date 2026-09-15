import React from 'react';

export const FlutterIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#ffffff" d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6.002 15.7L2.3 12l3.702-3.7 3.7 3.7-3.7 3.7zm8.312 8.3L8.63 18.314l3.684-3.7 9.37 9.386h-7.37z" />
  </svg>
);

export const ReactIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const JavaScriptIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#000000" d="M3 3h18v18H3V3z" opacity="0.05"/>
    <text x="5" y="18" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="13">JS</text>
  </svg>
);

export const RiverpodIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="7" r="3.2" fill="#ffffff" />
    <circle cx="6.5" cy="16.5" r="3.2" fill="#ffffff" />
    <circle cx="17.5" cy="16.5" r="3.2" fill="#ffffff" />
    <path d="M12 10.2v3.6m-3.5 1.5l2-1.5m3 0l2 1.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const NodeJsIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
    <path d="M12 12v10" />
    <path d="M12 12l8.5-5" />
    <path d="M12 12L3.5 7" />
  </svg>
);

export const NextJsIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M8 8v8m8-8l-7.5 8" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16 11v5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const GitIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20.5 10.5L13.5 3.5a2 2 0 00-2.8 0L9 5.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 9.7l7 7a2 2 0 002.8 0l6.2-6.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="12" r="2" fill="#ffffff" />
    <circle cx="15.5" cy="8.5" r="2" fill="#ffffff" />
    <circle cx="12" cy="15.5" r="2" fill="#ffffff" />
    <path d="M8 12l4 3.5m0 0v-5m0 0l3.5-2" stroke="#ffffff" strokeWidth="1.8" />
  </svg>
);

export const FigmaIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="7" y="3" width="5" height="5" rx="2.5" fill="#F24E1E" />
    <rect x="12" y="3" width="5" height="5" rx="2.5" fill="#FF7262" />
    <rect x="7" y="8" width="5" height="5" rx="2.5" fill="#A259FF" />
    <circle cx="14.5" cy="10.5" r="2.5" fill="#1ABCFE" />
    <rect x="7" y="13" width="5" height="5" rx="2.5" fill="#0ACF83" />
  </svg>
);

export const FirebaseIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 18l5-12 2.5 5.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 18L15 4l-4 8" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 18l6 3 6-3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MongoDbIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C12 2 6 7.5 6 13c0 3.5 2.5 6.5 6 8.5 3.5-2 6-5 6-8.5 0-5.5-6-11-6-11z" fill="#ffffff" />
    <path d="M12 3v17.5" stroke="#10aa50" strokeWidth="1.5" />
  </svg>
);
