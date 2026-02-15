import { Suspense, useEffect } from 'react';
import { useStore } from '../../../hooks/useStore';
import { DoubleFloorHouseWithSuspense } from './DoubleFloorHouse';
import { AucklandHouse } from './AucklandHouse';

export function PropertyModelManager(props: JSX.IntrinsicElements['group']) {
    const currentPropertyId = useStore((state) => state.currentPropertyId);

    useEffect(() => {
        console.log('[PropertyModelManager] Current ID:', currentPropertyId);
    }, [currentPropertyId]);

    return (
        <Suspense fallback={null}>
            {currentPropertyId === 'demo-house' && <DoubleFloorHouseWithSuspense {...props} />}
            {currentPropertyId === 'auckland-northcross' && <AucklandHouse {...props} position={[0, 0, 0]} />}
        </Suspense>
    );
}
