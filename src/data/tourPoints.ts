export interface TourPoint {
  id: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  duration: number;
  title: string;
  description: string;
}

export const DOUBLE_FLOOR_HOUSE_TOUR: TourPoint[] = [
  // ========== Exterior Views (1-5) ==========
  {
    id: 1,
    position: [8.95, 27.74, -26.75],
    lookAt: [9.98, 22.52, -18.29],
    duration: 3,
    title: "Welcome - Backyard Overview",
    description: "Stunning aerial view of the backyard with deck, stairs, and garage"
  },
  {
    id: 2,
    position: [5.07, 13.47, -14.25],
    lookAt: [9.11, 11.96, -5.23],
    duration: 4,
    title: "Backyard Deck & Patio",
    description: "Spacious wooden deck perfect for outdoor entertaining"
  },
  {
    id: 3,
    position: [13.99, 12.95, -2.24],
    lookAt: [23.79, 11.24, -1.24],
    duration: 3,
    title: "Outdoor Stairs",
    description: "Elegant stairs connecting the yard to the deck area"
  },
  {
    id: 4,
    position: [6.25, 12.26, -5.86],
    lookAt: [7.15, 11.60, 4.07],
    duration: 3,
    title: "Garage Entrance",
    description: "Convenient garage access with modern door design"
  },
  {
    id: 5,
    position: [22.98, 15.00, 2.52],
    lookAt: [0, 12, -5],
    duration: 4,
    title: "Main Entrance Door",
    description: "Welcoming entrance with glass panels and modern design"
  },

  // ========== First Floor Interior (6-9) - Main Living Areas ==========
  {
    id: 6,
    position: [0, 16, -5],
    lookAt: [0, 16, 5],
    duration: 4,
    title: "Foyer & Entry Hall",
    description: "Bright and spacious entrance hall with natural light"
  },
  {
    id: 7,
    position: [3.42, 14.98, 8.63],
    lookAt: [11.86, 13.35, 3.52],
    duration: 5,
    title: "Living Room",
    description: "Open-concept living area with floor-to-ceiling windows"
  },
  {
    id: 8,
    position: [3.64, 15.84, 9.45],
    lookAt: [9.17, 13.02, 17.29],
    duration: 4,
    title: "Dining Area",
    description: "Elegant dining space adjacent to the kitchen"
  },
  {
    id: 9,
    position: [3.15, 15.69, 11.79],
    lookAt: [9.73, 14.07, 19.14],
    duration: 5,
    title: "Modern Kitchen",
    description: "State-of-the-art kitchen with premium appliances and island"
  },

  // ========== Staircase (10) ==========
  {
    id: 10,
    position: [9.92, 11.68, 11.20],
    lookAt: [19.22, 9.33, 14.02],
    duration: 3,
    title: "Staircase to Second Floor",
    description: "Elegant staircase with modern railing design"
  },

  // ========== Second Floor Interior (11-17) - Bedrooms & Bathrooms ==========
  {
    id: 11,
    position: [5.02, 15.90, 10.30],
    lookAt: [14.83, 14.31, 11.41],
    duration: 3,
    title: "Second Floor Hallway",
    description: "Spacious hallway connecting all second floor rooms"
  },
  {
    id: 12,
    position: [13.00, 15.46, 8.12],
    lookAt: [3.97, 12.30, 5.20],
    duration: 5,
    title: "Master Bedroom",
    description: "Luxurious master suite with walk-in closet and en-suite bathroom"
  },
  {
    id: 13,
    position: [20.17, 15.08, 11.84],
    lookAt: [28.87, 14.22, 16.71],
    duration: 4,
    title: "Master Bathroom",
    description: "Spa-like master bathroom with premium finishes"
  },
  {
    id: 14,
    position: [12.78, 14.97, 7.99],
    lookAt: [4.34, 11.62, 3.81],
    duration: 4,
    title: "Bedroom #2",
    description: "Spacious second bedroom with great views"
  },
  {
    id: 15,
    position: [12.97, 15.09, 8.12],
    lookAt: [3.89, 11.79, 5.53],
    duration: 4,
    title: "Bedroom #3",
    description: "Comfortable third bedroom perfect for family or guests"
  },
  {
    id: 16,
    position: [20.39, 15.05, 8.99],
    lookAt: [24.96, 11.89, 0.67],
    duration: 4,
    title: "Bedroom #4",
    description: "Fourth bedroom with ample closet space"
  },
  {
    id: 17,
    position: [-8, 20, -3],
    lookAt: [-3, 20, -3],
    duration: 3,
    title: "Second Floor Bathroom",
    description: "Full bathroom serving bedrooms 2, 3, and 4"
  },

  // ========== Final View (18) ==========
  {
    id: 18,
    position: [30.01, 21.09, 20.53],
    lookAt: [22.89, 17.37, 16.03],
    duration: 4,
    title: "Final Overview",
    description: "Complete view of your dream home. Tour complete - explore freely!"
  }
];
