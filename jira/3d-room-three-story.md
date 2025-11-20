## Backlog

- Story: THREE-101 Initialize Project and Dependencies
  Description: Initialize the 3D Room Roaming project using Vite, React, and TypeScript. Install and configure core Three.js and R3F dependencies along with TailwindCSS for UI.
  Acceptance_Criteria:

  - [ ] Create new Vite project with React and TypeScript template
  - [ ] Install `three`, `@react-three/fiber`, `@react-three/drei`
  - [ ] Install `@react-three/rapier` for physics
  - [ ] Install `zustand` for state management
  - [ ] Install and configure `tailwindcss`
  - [ ] Verify `npm install` runs without errors
  - [ ] Create basic `App.tsx` with a simple 3D scene (Canvas + Box) to verify rendering
  - [ ] Ensure `npm run dev` starts the server successfully
  - [ ] Write a basic unit test to verify the App component renders
        Priority: High
        Labels: [setup, infrastructure, threejs]
        Assignees: Frontend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: App.test.tsx - Verify Canvas initialization
  - Build: Verify `npm run build` creates dist folder

- Story: THREE-102 Implement Player Controller and Physics
  Description: Develop the first-person player controller using Rapier physics. Implement WASD movement and mouse look functionality with collision detection to prevent walking through walls.
  Acceptance_Criteria:

  - [ ] Create `src/components/3d/Player.tsx`
  - [ ] Implement `RigidBody` with `CapsuleCollider` for the player
  - [ ] Add `PointerLockControls` for camera rotation
  - [ ] Implement `useKeyboard` hook for WASD input
  - [ ] Apply velocity-based movement in `useFrame` loop
  - [ ] Ensure player cannot walk through static objects (walls)
  - [ ] Write unit tests for `useKeyboard` hook (>80% coverage)
  - [ ] Write integration test for Player component mounting
        Priority: High
        Labels: [feature, 3d, physics, controls]
        Assignees: Frontend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: useKeyboard.test.ts - Test key press/release state changes
  - Integration: Player.test.tsx - Verify RigidBody and Controls instantiation

- Story: THREE-103 Load Room Model and Environment
  Description: Import the 3D room model (GLB/GLTF), generate React components using gltfjsx, and set up the physical boundaries (walls/floor) for collision.
  Acceptance_Criteria:

  - [ ] Place room model in `public/models/`
  - [ ] Generate `Room.tsx` using `npx gltfjsx`
  - [ ] Add `RigidBody` (type="fixed") to floor and walls in `Room.tsx`
  - [ ] Configure `ContactShadows` and `Environment` (Sky/HDRI)
  - [ ] Optimize model loading with `useGLTF` and Draco compression if needed
  - [ ] Verify model renders correctly in the scene
  - [ ] Write unit tests ensuring model component loads without crashing
        Priority: High
        Labels: [feature, 3d, assets]
        Assignees: 3D Artist, Frontend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: Room.test.tsx - Verify mesh and material properties
  - Integration: Verify collision bodies are active in physics debugger

- Story: THREE-104 Implement Interactive Furniture System
  Description: Create a system for interactive furniture elements. Users should be able to hover over and click furniture to trigger selection events.
  Acceptance_Criteria:
  - [ ] Create `src/store/useStore.ts` with Zustand for selection state
  - [ ] Create `Furniture.tsx` component wrapper
  - [ ] Implement `onPointerOver` and `onPointerOut` for hover effects
  - [ ] Implement `onClick` to update global selection state
  - [ ] Prevent click propagation to scene background
  - [ ] Write unit tests for Zustand store actions (>90% coverage)
  - [ ] Write component tests for click interactions
        Priority: Medium
        Labels: [feature, interaction, state-management]
        Assignees: Frontend Team
        Reporter: UX Designer
        Test_Coverage:
  - Unit: useStore.test.ts - Test select/deselect actions
  - Unit: Furniture.test.tsx - Simulate click events and verify handler calls

## Ready

- Story: THREE-105 Develop UI Overlay and Information Panel
  Description: Build the 2D User Interface (HUD) using TailwindCSS to display information about selected furniture and provide controls. **All UI text must be in English.**
  Acceptance_Criteria:

  - [ ] Create `src/components/ui/Interface.tsx`
  - [ ] Implement `InfoCard` component to show name, price, and description
  - [ ] Show/Hide `InfoCard` based on Zustand selection state
  - [ ] Add a central crosshair for aiming
  - [ ] Ensure all labels and text are in English (e.g., "Price", "Material")
  - [ ] Write unit tests for UI components (>80% coverage)
  - [ ] Verify accessibility (contrast, font size)
        Priority: Medium
        Labels: [frontend, ui, tailwind]
        Assignees: Frontend Team
        Reporter: UX Designer
        Test_Coverage:
  - Unit: InfoCard.test.tsx - Verify content rendering based on props
  - Unit: Interface.test.tsx - Verify visibility logic

- Story: THREE-106 Implement Dynamic Lighting System
  Description: Add functionality to switch between Day and Night modes, changing the environment lighting and window views.
  Acceptance_Criteria:
  - [ ] Add lighting mode state (Day/Night) to Zustand store
  - [ ] Create `Lighting.tsx` component
  - [ ] Implement Day mode: AmbientLight + DirectionalLight + Blue Sky
  - [ ] Implement Night mode: Low AmbientLight + PointLights (Lamps) + Dark Sky
  - [ ] Add UI toggle button to switch modes
  - [ ] Use `react-spring` or similar for smooth transition (optional)
  - [ ] Write unit tests for lighting state toggling
        Priority: Low
        Labels: [feature, 3d, graphics]
        Assignees: Frontend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: Lighting.test.tsx - Verify light intensity changes based on props
  - E2E: Verify visual change in screenshot tests (optional)

## Testing

- Story: THREE-107 Comprehensive Unit and Integration Testing
  Description: Establish a robust testing suite to ensure code reliability. Verify all components and hooks meet the coverage threshold.
  Acceptance_Criteria:

  - [ ] Configure Jest and React Testing Library (or Vitest)
  - [ ] Write tests for all utility functions in `src/lib`
  - [ ] Ensure global code coverage is >80%
  - [ ] Verify `npm t` runs all tests successfully
  - [ ] Fix any linting errors (`npm run lint`)
  - [ ] Mock `ResizeObserver` and `WebGL` context for headless testing
        Priority: High
        Labels: [testing, quality]
        Assignees: QA Team
        Reporter: Tech Lead
        Test_Coverage:
  - Coverage Report: >80% Statements, Branches, Functions, Lines

- Story: THREE-108 End-to-End Test Suite
  Description: Implement E2E tests using Playwright to validate the full user journey from loading the page to interacting with the 3D world.
  Acceptance_Criteria:

  - [ ] Install and configure Playwright
  - [ ] Create `e2e/roaming.spec.ts`
  - [ ] Test Scenario: Page load and 3D canvas rendering
  - [ ] Test Scenario: UI elements (Crosshair, Help text) visibility
  - [ ] Test Scenario: Interaction flow (Click object -> Info card appears)
  - [ ] Test Scenario: Lighting toggle (Day -> Night)
  - [ ] Verify `npm run build` produces a deployable artifact
  - [ ] Ensure no console errors during E2E runs
        Priority: High
        Labels: [testing, e2e, playwright]
        Assignees: QA Team
        Reporter: QA Lead
        Test_Coverage:
  - E2E: roaming.spec.ts - Cover critical user paths

- Story: THREE-109 Performance Optimization and Build Verification
  Description: Optimize the application for performance and ensure the production build is stable.
  Acceptance_Criteria:
  - [ ] Verify `npm run build` succeeds without warnings
  - [ ] Check bundle size and implement code splitting if necessary
  - [ ] Optimize 3D assets (texture compression, draco)
  - [ ] Ensure application runs at 60 FPS on reference hardware
  - [ ] Verify Lighthouse performance score > 90
  - [ ] Document build and deployment instructions
        Priority: Medium
        Labels: [performance, devops]
        Assignees: DevOps Team
        Reporter: Tech Lead
        Test_Coverage:
  - Build: Successful production build
  - Performance: FPS monitoring during E2E tests
