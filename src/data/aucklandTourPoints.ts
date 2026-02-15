import { TourPoint } from './tourPoints';

export const AUCKLAND_NORTHCROSS_TOUR: TourPoint[] = [
    {
        id: 1,
        position: [-5, 3, 5],
        lookAt: [0, 1.5, 0],
        duration: 5,
        title: "Living Room",
        description: "Welcome to the spacious living area of the Auckland Northcross property."
    },
    {
        id: 2,
        position: [5, 3, -2],
        lookAt: [-5, 2, 5],
        duration: 5,
        title: "Interior Overview",
        description: "Viewing the layout from the adjacent space."
    },
    {
        id: 3,
        position: [0, 15, 0],
        lookAt: [0, 0, 0],
        duration: 5,
        title: "Birds Eye View",
        description: "Aerial perspective of the interior scan."
    }
];
