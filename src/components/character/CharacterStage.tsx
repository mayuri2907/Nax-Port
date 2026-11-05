import React from 'react';
import { OfficialCharacterRig } from './OfficialCharacterRig';

interface CharacterStageProps {
  className?: string;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Editorial Soft Aura Background */}
      <div className="absolute inset-0 max-w-md max-h-[460px] mx-auto rounded-full bg-accent-yellow/20 filter blur-3xl pointer-events-none -z-10" />

      {/* Official Rigged Character */}
      <div className="relative z-10">
        <OfficialCharacterRig />
      </div>
    </div>
  );
};
