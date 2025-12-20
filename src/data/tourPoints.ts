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
    position: [3, 28, -35],
    lookAt: [0, 0, 0],
    duration: 3,
    title: "Welcome - Backyard Overview",
    description: "Stunning aerial view of the backyard with deck, stairs, and garage"
  },
  {
    id: 2,
    position: [11.25, 13.62, -12.55],
    lookAt: [0, 12, 0],
    duration: 4,
    title: "Backyard Deck & Patio",
    description: "Spacious wooden deck perfect for outdoor entertaining"
  },
  {
    id: 3,
    position: [7.51, 14.27, -1.49],
    lookAt: [0, 12, -12],
    duration: 3,
    title: "Outdoor Stairs",
    description: "Elegant stairs connecting the yard to the deck area"
  },
  {
    id: 4,
    position: [-10, 12, -20],
    lookAt: [0, 12, -10],
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
    position: [6.26, 16.00, 4.43],
    lookAt: [0, 16, 5],
    duration: 5,
    title: "Living Room",
    description: "Open-concept living area with floor-to-ceiling windows"
  },
  {
    id: 8,
    position: [-5, 16, 6],
    lookAt: [0, 16, 5],
    duration: 4,
    title: "Dining Area",
    description: "Elegant dining space adjacent to the kitchen"
  },
  {
    id: 9,
    position: [8, 16, 3],
    lookAt: [0, 16, 3],
    duration: 5,
    title: "Modern Kitchen",
    description: "State-of-the-art kitchen with premium appliances and island"
  },

  // ========== Staircase (10) ==========
  {
    id: 10,
    position: [0, 18, 0],
    lookAt: [0, 20, 0],
    duration: 3,
    title: "Staircase to Second Floor",
    description: "Elegant staircase with modern railing design"
  },

  // ========== Second Floor Interior (11-17) - Bedrooms & Bathrooms ==========
  {
    id: 11,
    position: [0, 20, 5],
    lookAt: [8, 20, 5],
    duration: 3,
    title: "Second Floor Hallway",
    description: "Spacious hallway connecting all second floor rooms"
  },
  {
    id: 12,
    position: [10, 20, 5],
    lookAt: [5, 20, 5],
    duration: 5,
    title: "Master Bedroom",
    description: "Luxurious master suite with walk-in closet and en-suite bathroom"
  },
  {
    id: 13,
    position: [8, 20, 8],
    lookAt: [5, 20, 8],
    duration: 4,
    title: "Master Bathroom",
    description: "Spa-like master bathroom with premium finishes"
  },
  {
    id: 14,
    position: [-8, 20, 8],
    lookAt: [-3, 20, 8],
    duration: 4,
    title: "Bedroom #2",
    description: "Spacious second bedroom with great views"
  },
  {
    id: 15,
    position: [-8, 20, 3],
    lookAt: [-3, 20, 3],
    duration: 4,
    title: "Bedroom #3",
    description: "Comfortable third bedroom perfect for family or guests"
  },
  {
    id: 16,
    position: [8, 20, -3],
    lookAt: [3, 20, -3],
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
    position: [40, 30, 40],
    lookAt: [0, 0, 0],
    duration: 4,
    title: "Final Overview",
    description: "Complete view of your dream home. Tour complete - explore freely!"
  }
];
