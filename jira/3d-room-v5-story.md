# 3D Room Roaming System - V5.0 Jira Stories

## Epic: THREE-V5 - Two Story House With Yard Integration

**Epic Summary**: Integrate a realistic two-story house with yard model from Sketchfab, enabling multi-floor exploration and outdoor navigation.

**Business Value**: Provide users with a realistic architectural exploration experience featuring multiple floors, stairs, and outdoor yard area.

**Model Info**:

- Source: Sketchfab - "Угловая лестница"
- Author: witaliodz
- License: CC Attribution
- File: `two-story-house.glb` (20.79 MB)

**Timeline**: 1-2 days
**Priority**: High
**Labels**: `v5.0`, `3d-model`, `architecture`, `multi-floor`, `enhancement`

---

## Stories

### THREE-501: Prepare and Move Model File

**Story**: As a developer, I need to prepare the downloaded GLB model file so that it can be properly loaded by the application.

**Description**:
Move the downloaded model file to the correct location and ensure it follows naming conventions.

**Acceptance Criteria**:

- [ ] File moved from `model/TwoStory_House_WithYard.glb` to `public/models/two-story-house.glb`
- [ ] File size verified (~20MB)
- [ ] File accessible via browser at `/models/two-story-house.glb`
- [ ] Old placeholder model files cleaned up

**Technical Notes**:

```bash
# Move and rename file
Move-Item model/TwoStory_House_WithYard.glb public/models/two-story-house.glb
```

**Priority**: Highest
**Story Points**: 1
**Labels**: `setup`, `assets`
**Assignee**: Development Team
**Reporter**: Product Owner

---

### THREE-502: Generate React Component from GLB

**Story**: As a developer, I need to convert the GLB model into a typed React component so that it can be used in the Three.js scene.

**Description**:
Use gltfjsx to automatically generate a TypeScript React component from the GLB file.

**Acceptance Criteria**:

- [ ] `gltfjsx` command executed successfully
- [ ] `TwoStoryHouse.tsx` component generated in `src/components/3d/models/`
- [ ] Component includes TypeScript types
- [ ] Component follows AI_CODING_RULES (no comments)
- [ ] Component can be imported without errors
- [ ] All meshes and materials properly exposed

**Technical Notes**:

```bash
npx gltfjsx public/models/two-story-house.glb -o src/components/3d/models/TwoStoryHouse.tsx --types
```

Post-generation cleanup:

- Remove all comments
- Ensure English-only code
- Verify TypeScript types

**Dependencies**: THREE-501

**Priority**: Highest
**Story Points**: 2
**Labels**: `codegen`, `tooling`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-503: Create Physics Wrapper for House Model

**Story**: As a developer, I need to wrap the house model with physics colliders so that players cannot walk through walls and can navigate stairs.

**Description**:
Create a physics-enabled version of the TwoStoryHouse component using Rapier's RigidBody with trimesh collider for accurate collision detection.

**Acceptance Criteria**:

- [ ] `TwoStoryHouseWithPhysics.tsx` created
- [ ] Collision type set to `trimesh` for accurate collision
- [ ] Component renders without errors
- [ ] Model displays correctly in scene
- [ ] Shadows enabled (`castShadow` and `receiveShadow`)
- [ ] Stair collision works properly

**Technical Notes**:

```typescript
<RigidBody type="fixed" colliders="trimesh">
  <TwoStoryHouse castShadow receiveShadow />
</RigidBody>
```

**Dependencies**: THREE-502

**Priority**: Highest
**Story Points**: 3
**Labels**: `physics`, `collision`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-504: Replace Placeholder House in Scene

**Story**: As a user, I want to see the realistic two-story house instead of the placeholder so that I can explore a real building.

**Description**:
Update the Experience component to use TwoStoryHouseWithPhysics instead of the placeholder ClassicHouseWithPhysics.

**Acceptance Criteria**:

- [ ] `ClassicHouseWithPhysics` import removed from `Experience.tsx`
- [ ] `TwoStoryHouseWithPhysics` component imported and rendered
- [ ] Old placeholder code commented out for reference
- [ ] Application runs without errors
- [ ] House model visible in scene
- [ ] No console warnings or errors

**Technical Notes**:

- Keep ClassicHouse files for reference
- Update any tests that reference the old component

**Dependencies**: THREE-503

**Priority**: High
**Story Points**: 2
**Labels**: `integration`, `refactor`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-505: Adjust Player Spawn Position for Yard View

**Story**: As a user, I want to start in front of the house yard so that I can see the entire building and yard area.

**Description**:
Adjust player's initial spawn position and camera settings to provide the best first impression of the house and yard.

**Acceptance Criteria**:

- [ ] Player spawns in front of yard (not inside walls)
- [ ] Camera faces the house entrance
- [ ] Player height appropriate for house scale
- [ ] Initial view showcases house and yard
- [ ] No collision issues at spawn point
- [ ] Can see both floors from spawn position

**Technical Notes**:

```typescript
// Player.tsx
position={[0, 1.7, 20]}  // In front of yard
```

May need to:

- Adjust based on actual model dimensions
- Test different spawn positions
- Ensure yard is visible

**Dependencies**: THREE-504

**Priority**: High
**Story Points**: 2
**Labels**: `ux`, `camera`
**Assignee**: Development Team
**Reporter**: Product Owner

---

### THREE-506: Expand Ground Component for Yard Area

**Story**: As a user, I want the ground to extend across the entire yard area so that the scene feels complete.

**Description**:
Expand the Ground component to cover the house, yard, and surrounding area without visual gaps.

**Acceptance Criteria**:

- [ ] Ground extends beyond yard boundaries
- [ ] No visual gaps between ground and house
- [ ] Ground color/texture coordinates with scene
- [ ] Physics collision works across entire ground
- [ ] Performance remains stable

**Technical Notes**:

```typescript
// Ground.tsx
<mesh position={[0, -0.5, 0]}>
  <boxGeometry args={[100, 1, 100]} /> // Expanded
</mesh>
```

**Dependencies**: THREE-504

**Priority**: Medium
**Story Points**: 2
**Labels**: `environment`, `visual`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-507: Implement Stair Navigation

**Story**: As a user, I want to walk up and down stairs smoothly so that I can explore both floors of the house.

**Description**:
Test and optimize player movement on stairs, ensuring smooth navigation between floors.

**Acceptance Criteria**:

- [ ] Player can walk up stairs without getting stuck
- [ ] Player can walk down stairs safely
- [ ] No clipping through stairs
- [ ] Movement feels natural on slopes
- [ ] No sudden jumps or falls
- [ ] Can reach second floor successfully

**Technical Notes**:
May need to adjust:

- Player capsule collider size
- Gravity settings
- Step height tolerance
- Slope angle limits

Test scenarios:

- Walking up slowly
- Walking up quickly
- Walking down
- Jumping on stairs

**Dependencies**: THREE-503

**Priority**: High
**Story Points**: 5
**Labels**: `physics`, `ux`, `navigation`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-508: Configure Indoor-Outdoor Transitions

**Story**: As a user, I want to smoothly enter and exit the house so that I can explore both indoor and outdoor areas.

**Description**:
Ensure doorways are properly configured for smooth player transitions between yard and house interior.

**Acceptance Criteria**:

- [ ] Can enter house through doors
- [ ] Can exit house to yard
- [ ] No getting stuck in doorways
- [ ] Door frames have adequate width
- [ ] Transitions feel smooth
- [ ] No collision conflicts at thresholds

**Technical Notes**:

- Verify door width > player capsule diameter
- Check for overlapping collision meshes
- May need to adjust player size

**Dependencies**: THREE-503

**Priority**: High
**Story Points**: 3
**Labels**: `physics`, `ux`, `navigation`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-509: Integrate Yard with Garden System

**Story**: As a user, I want to see trees and garden elements around the yard so that the outdoor area feels natural.

**Description**:
Adjust the existing Garden component (trees, fence) to work harmoniously with the house yard.

**Acceptance Criteria**:

- [ ] Trees do not overlap with house or yard
- [ ] Tree distribution looks natural
- [ ] Fence positioning makes sense
- [ ] Overall scene composition is balanced
- [ ] No z-fighting or visual glitches
- [ ] Garden enhances yard area

**Technical Notes**:

```typescript
// Trees.tsx
exclusionZone: { x: 25, z: 25 }  // Expanded
distribution: { x: 100, z: 100 }  // Wider area
```

**Dependencies**: THREE-506

**Priority**: Medium
**Story Points**: 3
**Labels**: `integration`, `garden`, `visual`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-510: Optimize Lighting for Two-Story House

**Story**: As a user, I want the house to be well-lit and visually appealing so that I can appreciate architectural details on both floors.

**Description**:
Adjust lighting system to properly illuminate a two-story structure with yard.

**Acceptance Criteria**:

- [ ] Both floors are clearly visible
- [ ] Yard area is well-lit
- [ ] Shadows enhance architecture (not obscure it)
- [ ] Day and night modes both look good
- [ ] No overly dark corners
- [ ] Performance remains at 60 FPS

**Technical Notes**:

```typescript
// Lighting.tsx
directionalLight position: [40, 50, 30]
intensity: 2.0
shadow-camera-range: 40x40
```

Consider:

- Additional fill lights for second floor
- Ambient light for indoor areas
- Shadow bias adjustments

**Dependencies**: THREE-504

**Priority**: Medium
**Story Points**: 3
**Labels**: `lighting`, `visual`, `optimization`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-511: Verify and Optimize Material Loading

**Story**: As a user, I want the house textures to load correctly so that the building looks realistic.

**Description**:
Verify all textures and materials from the GLB file load properly and optimize if needed.

**Acceptance Criteria**:

- [ ] All textures display correctly
- [ ] No missing or broken materials
- [ ] Colors appear as intended
- [ ] Normal maps work (if present)
- [ ] PBR materials render properly
- [ ] No texture streaming issues

**Technical Notes**:

- Check GLB file integrity
- Verify embedded textures
- Test on different devices
- Monitor VRAM usage

**Dependencies**: THREE-502

**Priority**: Medium
**Story Points**: 2
**Labels**: `visual`, `materials`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-512: Implement Model Preloading

**Story**: As a user, I want the house model to load quickly so that I don't have to wait long to start exploring.

**Description**:
Implement preloading and optimize loading performance for the 20MB model file.

**Acceptance Criteria**:

- [ ] Model preloading implemented
- [ ] Loading progress indicator shows accurate percentage
- [ ] Load time < 15 seconds on average connection
- [ ] Draco compression enabled (if beneficial)
- [ ] Frame rate stable during and after loading

**Technical Notes**:

```typescript
// TwoStoryHouse.tsx
useGLTF.preload("/models/two-story-house.glb");
```

**Dependencies**: THREE-502

**Priority**: Medium
**Story Points**: 2
**Labels**: `performance`, `loading`, `optimization`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-513: Monitor and Optimize Runtime Performance

**Story**: As a developer, I need to ensure the application maintains 60 FPS with the new model so that users have a smooth experience.

**Description**:
Monitor and optimize runtime performance with the larger, more complex house model.

**Acceptance Criteria**:

- [ ] FPS ≥ 60 on target hardware
- [ ] Memory usage < 800MB
- [ ] No frame drops during navigation
- [ ] Shadow rendering optimized
- [ ] Collision detection efficient

**Performance Targets**:

- FPS: ≥ 60
- Memory: < 800MB
- Load time: < 15s

**Optimization Options**:

- Reduce shadow map resolution if needed
- Optimize collision mesh complexity
- Implement LOD if necessary

**Dependencies**: THREE-512

**Priority**: High
**Story Points**: 3
**Labels**: `performance`, `optimization`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-514: Create Unit Tests for TwoStoryHouse

**Story**: As a developer, I need to ensure the TwoStoryHouse component is properly tested so that future changes don't break functionality.

**Description**:
Create comprehensive unit tests for the new house component.

**Acceptance Criteria**:

- [ ] Unit test created: `TwoStoryHouse.test.tsx`
- [ ] Test verifies component renders without crashing
- [ ] Test verifies physics collider is present
- [ ] Integration test verifies house appears in Experience
- [ ] All tests pass
- [ ] Code coverage remains > 85%

**Technical Notes**:

```typescript
// Mock useGLTF properly
const mockUseGLTF: any = vi.fn(() => ({
  nodes: {
    /* mock nodes */
  },
  materials: {
    /* mock materials */
  },
}));
mockUseGLTF.preload = vi.fn();
```

**Dependencies**: THREE-503

**Priority**: Medium
**Story Points**: 3
**Labels**: `testing`, `quality`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-515: Create E2E Tests for Multi-Floor Exploration

**Story**: As a QA engineer, I need automated tests to verify users can explore both floors so that we catch navigation issues early.

**Description**:
Create Playwright E2E tests that simulate exploring the house, yard, and both floors.

**Acceptance Criteria**:

- [ ] E2E test created: `v5-house-exploration.spec.ts`
- [ ] Test verifies house model loads
- [ ] Test simulates yard exploration
- [ ] Test simulates entering house
- [ ] Test simulates stair navigation
- [ ] Test verifies no console errors
- [ ] Test checks performance metrics
- [ ] Test passes consistently

**Test Scenarios**:

1. Spawn in yard
2. Walk around yard
3. Enter house
4. Navigate to stairs
5. Go up to second floor
6. Return to first floor
7. Exit house

**Dependencies**: THREE-507, THREE-508

**Priority**: Medium
**Story Points**: 5
**Labels**: `testing`, `e2e`, `quality`
**Assignee**: QA Team
**Reporter**: Development Team

---

### THREE-516: Update Documentation and Add Attribution

**Story**: As a new developer or user, I need updated documentation so that I understand how to use the new house model and comply with licensing.

**Description**:
Update all relevant documentation to reflect V5.0 changes and add proper attribution for the model.

**Acceptance Criteria**:

- [ ] `USER-GUIDE.md` updated with new house information
- [ ] `V5-IMPLEMENTATION-SUMMARY.md` created
- [ ] `README.md` updated with new screenshots/description
- [ ] Model attribution added (CC Attribution requirement)
- [ ] Architecture diagram updated
- [ ] Known limitations documented

**Attribution Requirements**:

```
Model: "Угловая лестница" (Two Story House With Yard)
Author: witaliodz
Source: Sketchfab
License: CC Attribution
Link: [Sketchfab URL]
```

**Documentation Sections**:

- How to navigate stairs
- Yard exploration tips
- Multi-floor navigation
- Performance considerations

**Dependencies**: THREE-513

**Priority**: High
**Story Points**: 3
**Labels**: `documentation`
**Assignee**: Development Team
**Reporter**: Product Owner

---

## Summary

**Total Stories**: 16
**Total Story Points**: 44
**Estimated Timeline**: 1-2 days (assuming 1 developer)

**Sprint Breakdown**:

- **Sprint 1 (Day 1 Morning)**: THREE-501 to THREE-504 (Model Integration)
- **Sprint 1 (Day 1 Afternoon)**: THREE-505 to THREE-509 (Navigation & Scene)
- **Sprint 2 (Day 2 Morning)**: THREE-510 to THREE-513 (Optimization)
- **Sprint 2 (Day 2 Afternoon)**: THREE-514 to THREE-516 (Testing & Docs)

**Success Metrics**:

- Model loads successfully
- 60 FPS maintained
- Users can explore yard, first floor, and second floor
- Visual quality significantly improved over V4.0
- All tests pass

**Critical Path**:
THREE-501 → THREE-502 → THREE-503 → THREE-504 → THREE-507 → THREE-508

---

## Risk Assessment

| Risk                    | Impact | Probability | Mitigation                        |
| ----------------------- | ------ | ----------- | --------------------------------- |
| Stair collision issues  | High   | High        | Use trimesh, add helper colliders |
| Performance degradation | High   | Medium      | Optimize shadows, monitor FPS     |
| Texture loading issues  | Medium | Low         | Verify GLB integrity              |
| Model too large         | Medium | Low         | Implement progressive loading     |

---

**Epic Status**: Ready for Development
**Created**: 2025-11-21
**Last Updated**: 2025-11-21
**Model File**: `model/TwoStory_House_WithYard.glb` (20.79 MB)
