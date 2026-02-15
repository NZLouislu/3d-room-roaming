import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { PlayerImproved } from './PlayerImproved';
import { PropertyModelManager } from './models/PropertyModelManager';

interface ExperienceImprovedProps {
  viewMode?: 'first-person' | 'third-person';
  enablePlayer?: boolean;
}

export const ExperienceImproved = ({ viewMode = 'third-person', enablePlayer = true }: ExperienceImprovedProps) => {
  return (
    <>
      <Lighting />
      <Environment />
      <Ground position={[0, 0, 0]} scale={[500, 1, 500]} />
      <PropertyModelManager />
      {enablePlayer && <PlayerImproved viewMode={viewMode} />}
    </>
  );
};
