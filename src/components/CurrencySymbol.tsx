import React from 'react';

interface CurrencySymbolProps {
  className?: string;
}

export const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ className }) => {
  return (
    <span className={className}>
      {/* 
        Using the Saudi Riyal Symbol image as requested. 
        If the image is missing, it will fallback to showing "SAR" text.
      */}
      <img 
        src="/Saudi_Riyal_Symbol.png" 
        alt="SAR" 
        className="inline-block h-[1em] w-auto align-middle"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement!.innerText = ' SAR';
        }}
      />
    </span>
  );
};
