import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { PlayerImproved } from './PlayerImproved';
import { DoubleFloorHouseWithSuspense } from './models/DoubleFloorHouse';

interface ExperienceImprovedProps {
  viewMode?: 'first-person' | 'third-person';
  enablePlayer?: boolean;
}

export const ExperienceImproved = ({ viewMode = 'third-person', enablePlayer = true }: ExperienceImprovedProps) => {
  return (
    <>
      <Lighting />
      <Environment />
      <Ground position={[0, 0, 0]} scale={[100, 1, 100]} />
      <DoubleFloorHouseWithSuspense />
      {enablePlayer && <PlayerImproved viewMode={viewMode} />}
    </>
  );
};
