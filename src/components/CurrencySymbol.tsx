import React from 'react';

interface CurrencySymbolProps {
  className?: string;
}

export const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ className }) => {
  return (
    <span className={className}>
      <img 
        src="/MAD_Symbol.png" 
        alt="MAD" 
        className="inline-block h-[1em] w-auto align-middle"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement!.innerText = ' MAD';
        }}
      />
    </span>
  );
};
