import React from 'react';
import { VideoCharacterRig } from './VideoCharacterRig';

interface CharacterStageProps {
  className?: string;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center pt-8 sm:pt-12 overflow-visible ${className}`}>
      {/* Editorial Soft Aura Background */}
      <div className="absolute inset-0 max-w-md max-h-[460px] mx-auto rounded-full bg-accent-yellow/20 filter blur-3xl pointer-events-none -z-10" />

      {/* Official Continuous Video Character */}
      <div className="relative z-10 overflow-visible">
        <VideoCharacterRig />
      </div>
    </div>
  );
};
