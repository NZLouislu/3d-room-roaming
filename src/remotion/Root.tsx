import { Composition } from 'remotion';
import { TourVideo } from './TourVideo';
import { DOUBLE_FLOOR_HOUSE_TOUR } from '../data/tourPoints';

export const RemotionRoot: React.FC = () => {
    const totalDurationSeconds = DOUBLE_FLOOR_HOUSE_TOUR.reduce((acc, point) => acc + point.duration, 0);
    const fps = 30;

    return (
        <>
            <Composition
                id="GuidedTour"
                component={TourVideo}
                durationInFrames={Math.floor(totalDurationSeconds * fps)}
                fps={fps}
                width={1920}
                height={1080}
            />
        </>
    );
};
