import React from 'react';
import { RiggedCharacter } from './RiggedCharacter';

interface CharacterStageProps {
  className?: string;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Editorial Soft Aura Background */}
      <div className="absolute inset-0 max-w-sm max-h-96 mx-auto rounded-full bg-accent-yellow/25 filter blur-3xl pointer-events-none -z-10" />

      {/* Handcrafted Rigged Character */}
      <div className="relative z-10">
        <RiggedCharacter />
      </div>
    </div>
  );
};
