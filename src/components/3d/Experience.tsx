import { Player } from './Player';
import { Furniture } from './Furniture';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Ground } from './Ground';
import { ModelManager } from './models/ModelManager';
import { Garden } from './garden/Garden';
import { TwoStoryHouseWithPhysics } from './models/TwoStoryHouseWithPhysics';
import { roomLayout } from '../../data/roomLayout';
import { useStore } from '../../hooks/useStore';

export const Experience = () => {
  const setSelectedObject = useStore((state) => state.setSelectedObject);

  return (
    <>
      <Environment />
      <Lighting />
      <Ground />
      <ModelManager>
        <Player />
        <TwoStoryHouseWithPhysics />
        <Garden />
        {roomLayout.livingRoom.furniture.map((item) => (
          <Furniture
            key={item.id}
            position={item.position}
            name={item.name}
            price={item.price || ''}
            description={item.description || ''}
            color={item.color || '#888888'}
            onClick={() => setSelectedObject({
              name: item.name,
              price: item.price || '',
              description: item.description || ''
            })}
          />
        ))}
      </ModelManager>
    </>
  );
};
