import React from 'react';
import { PlainBrushColorKey } from '../types/portfolio';
import { Paintbrush } from 'lucide-react';

interface PlainColorBarProps {
  currentColor: PlainBrushColorKey;
  onColorChange: (color: PlainBrushColorKey) => void;
  scrollVelocity?: number;
}

export const PlainColorBar: React.FC<PlainColorBarProps> = ({
  currentColor,
  onColorChange,
}) => {
  const colors: { id: PlainBrushColorKey; label: string; swatch: string }[] = [
    { id: 'sunlight', label: 'Sunlight', swatch: '#fef08a' },
    { id: 'peach', label: 'Peach', swatch: '#fed7aa' },
    { id: 'mint', label: 'Mint', swatch: '#d1fae5' },
    { id: 'lavender', label: 'Lavender', swatch: '#e0e7ff' },
    { id: 'sand', label: 'Sand', swatch: '#e4e4e7' },
  ];

  return (
    <aside aria-label="Brush Color Controls" className="fixed bottom-6 right-6 z-30">
      <div className="flex items-center gap-2 p-1.5 bg-white/95 border border-zinc-200/90 rounded-full shadow-lg backdrop-blur-md text-zinc-700">
        <div className="flex items-center gap-2 pl-2.5 pr-1 text-[11px] font-mono text-zinc-500">
          <Paintbrush className="w-3.5 h-3.5 text-zinc-700" />
          <span
            className="w-3 h-3 rounded-full transition-all duration-300 border border-black/10 ring-2 ring-zinc-900/10"
            style={{
              backgroundColor: colors.find((c) => c.id === currentColor)?.swatch,
            }}
          />
          <span className="hidden sm:inline font-medium text-zinc-700">Brush</span>
        </div>

        <div className="flex items-center gap-0.5">
          {colors.map((c) => {
            const isActive = currentColor === c.id;
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => onColorChange(c.id)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
                title={`Switch brush color to ${c.label}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
