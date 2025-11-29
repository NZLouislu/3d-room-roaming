# 3D Room Roaming System - V4.0 Jira Stories

## Epic: THREE-V4 - Classic House Model Integration

**Epic Summary**: Replace the basic room structure with a high-quality Classic Style Porch House model from Sketchfab, enabling realistic architectural exploration.

**Business Value**: Significantly enhance visual quality and user experience by transitioning from code-generated geometry to professional 3D assets.

**Timeline**: 1-2 weeks
**Priority**: High
**Labels**: `v4.0`, `3d-model`, `architecture`, `enhancement`

---

## Stories

### THREE-401: Download and Prepare Classic House Model

**Story**: As a developer, I need to download and prepare the Classic Style Porch House model so that it can be integrated into the React application.

**Description**:
Download the model from Sketchfab and prepare it for web use.

**Acceptance Criteria**:

- [ ] Model downloaded from Sketchfab in `.glb` format
- [ ] File size verified (should be < 50MB for optimal performance)
- [ ] Model placed in `public/models/classic-house.glb`
- [ ] Model inspected in a 3D viewer to verify structure
- [ ] Documentation created listing model specifications (poly count, texture count, file size)

**Technical Notes**:

- Model URL: https://sketchfab.com/3d-models/classic-style-porch-house-without-furniture-df0c68a5e3d74c8393d9a2cd73044a22
- Preferred format: `.glb` (binary glTF)
- If file is too large, consider Draco compression

**Priority**: Highest
**Story Points**: 2
**Labels**: `setup`, `assets`
**Assignee**: Development Team
**Reporter**: Product Owner

---

### THREE-402: Generate React Component from GLB Model

**Story**: As a developer, I need to convert the GLB model into a React component so that it can be used in the Three.js scene.

**Description**:
Use the `gltfjsx` tool to automatically generate a typed React component from the GLB file.

**Acceptance Criteria**:

- [ ] `gltfjsx` command executed successfully
- [ ] `ClassicHouse.tsx` component generated in `src/components/3d/models/`
- [ ] Component includes TypeScript types
- [ ] Component can be imported without errors
- [ ] All meshes and materials are properly exposed

**Technical Notes**:

```bash
npx gltfjsx public/models/classic-house.glb -o src/components/3d/models/ClassicHouse.tsx --types
```

**Dependencies**: THREE-401

**Priority**: Highest
**Story Points**: 1
**Labels**: `codegen`, `tooling`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-403: Implement ClassicHouse Component with Physics

**Story**: As a developer, I need to wrap the ClassicHouse model with physics colliders so that players cannot walk through walls.

**Description**:
Create a physics-enabled version of the ClassicHouse component using Rapier's RigidBody.

**Acceptance Criteria**:

- [ ] `ClassicHouse.tsx` wrapped in `<RigidBody>` component
- [ ] Collision type set to `trimesh` for accurate collision detection
- [ ] Component renders without errors
- [ ] Model displays correctly in the scene
- [ ] Shadows enabled (`castShadow` and `receiveShadow`)

**Technical Notes**:

```typescript
<RigidBody type="fixed" colliders="trimesh">
  <ClassicHouse />
</RigidBody>
```

**Dependencies**: THREE-402

**Priority**: High
**Story Points**: 3
**Labels**: `physics`, `collision`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-404: Replace Room Component with ClassicHouse

**Story**: As a user, I want to see the Classic House model instead of the basic room so that I can explore a realistic building.

**Description**:
Update the Experience component to use ClassicHouse instead of the old Room component.

**Acceptance Criteria**:

- [ ] `Room.tsx` import removed from `Experience.tsx`
- [ ] `ClassicHouse` component imported and rendered
- [ ] Old room-related code cleaned up
- [ ] Application runs without errors
- [ ] House model visible in the scene

**Technical Notes**:

- Keep the `Room.tsx` file for reference but don't render it
- Update any tests that reference the Room component

**Dependencies**: THREE-403

**Priority**: High
**Story Points**: 2
**Labels**: `integration`, `refactor`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-405: Adjust Player Spawn Position and Camera

**Story**: As a user, I want to start in front of the house so that I can see the porch and entrance.

**Description**:
Adjust the player's initial spawn position and camera settings to provide the best first impression of the house.

**Acceptance Criteria**:

- [ ] Player spawns in front of the house (not inside walls)
- [ ] Camera faces the house entrance/porch
- [ ] Player height appropriate for the house scale
- [ ] Initial view showcases the house architecture
- [ ] No collision issues at spawn point

**Technical Notes**:

- Adjust `position` prop in `Player.tsx`
- May need to scale the house model if proportions are off
- Test different spawn positions for best visual impact

**Dependencies**: THREE-404

**Priority**: High
**Story Points**: 2
**Labels**: `ux`, `camera`
**Assignee**: Development Team
**Reporter**: Product Owner

---

### THREE-406: Configure Collision Boundaries for House Interior

**Story**: As a user, I want to walk around and potentially enter the house without getting stuck or falling through the floor.

**Description**:
Fine-tune collision detection to ensure smooth navigation around the house, especially in doorways and narrow spaces.

**Acceptance Criteria**:

- [ ] Player can walk around the entire house perimeter
- [ ] Player does not get stuck in corners or doorways
- [ ] Player does not fall through the ground
- [ ] Collision detection feels natural (no sudden stops)
- [ ] If house has interior, player can enter through doors

**Technical Notes**:

- May need to adjust player capsule collider size
- Consider adding manual collision boxes for problematic areas
- Test with different movement speeds

**Dependencies**: THREE-405

**Priority**: High
**Story Points**: 5
**Labels**: `physics`, `ux`, `collision`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-407: Optimize Lighting for House Model

**Story**: As a user, I want the house to be well-lit and visually appealing so that I can appreciate its architectural details.

**Description**:
Adjust the lighting system to complement the house model's materials and structure.

**Acceptance Criteria**:

- [ ] House is clearly visible in both day and night modes
- [ ] Shadows enhance the architectural details (not obscure them)
- [ ] Porch area has appropriate lighting
- [ ] No overly dark or overly bright areas
- [ ] Performance remains at 60 FPS

**Technical Notes**:

- Adjust `directionalLight` position and intensity
- May need to add additional lights for the porch
- Consider using `spotLight` for accent lighting
- Adjust shadow map resolution if needed

**Dependencies**: THREE-404

**Priority**: Medium
**Story Points**: 3
**Labels**: `lighting`, `visual`, `optimization`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-408: Performance Optimization for Model Loading

**Story**: As a user, I want the house model to load quickly so that I don't have to wait long to start exploring.

**Description**:
Implement loading optimizations to minimize wait time and provide feedback during model loading.

**Acceptance Criteria**:

- [ ] Model loads in < 15 seconds on average connection
- [ ] Loading progress indicator shows accurate percentage
- [ ] Draco compression enabled (if model supports it)
- [ ] Model preloading implemented
- [ ] Frame rate remains stable during and after loading

**Technical Notes**:

- Use `useGLTF.preload()` in `ModelManager.tsx`
- Enable Draco decoder in Three.js
- Consider lazy loading for non-critical parts

**Dependencies**: THREE-403

**Priority**: Medium
**Story Points**: 3
**Labels**: `performance`, `loading`, `optimization`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-409: Integrate House with Existing Garden System

**Story**: As a user, I want to see the house surrounded by the existing garden (trees, fence) so that it feels like a complete property.

**Description**:
Ensure the existing Garden component (trees, fence) works harmoniously with the new house model.

**Acceptance Criteria**:

- [ ] Trees do not overlap with the house structure
- [ ] Fence positioning makes sense relative to the house
- [ ] Ground/grass extends under and around the house
- [ ] Overall scene composition is visually balanced
- [ ] No z-fighting or visual glitches

**Technical Notes**:

- May need to adjust tree spawn positions to avoid house
- Consider removing the old fence if the model has its own
- Adjust ground plane size if needed

**Dependencies**: THREE-404

**Priority**: Medium
**Story Points**: 3
**Labels**: `integration`, `garden`, `visual`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-410: Update Tests for ClassicHouse Component

**Story**: As a developer, I need to ensure the ClassicHouse component is properly tested so that future changes don't break functionality.

**Description**:
Create unit and integration tests for the new ClassicHouse component.

**Acceptance Criteria**:

- [ ] Unit test created: `ClassicHouse.test.tsx`
- [ ] Test verifies component renders without crashing
- [ ] Test verifies physics collider is present
- [ ] Integration test verifies house appears in Experience
- [ ] All tests pass
- [ ] Code coverage remains > 85%

**Technical Notes**:

- Follow existing test patterns from `Room.test.tsx`
- Mock the GLB model loading in tests
- Test both with and without Physics wrapper

**Dependencies**: THREE-403

**Priority**: Medium
**Story Points**: 3
**Labels**: `testing`, `quality`
**Assignee**: Development Team
**Reporter**: Development Team

---

### THREE-411: Create E2E Test for House Exploration

**Story**: As a QA engineer, I need automated tests to verify users can explore the house so that we catch navigation issues early.

**Description**:
Create Playwright E2E tests that simulate a user walking around the house.

**Acceptance Criteria**:

- [ ] E2E test created: `v4-house-exploration.spec.ts`
- [ ] Test verifies house model loads
- [ ] Test simulates walking around the house perimeter
- [ ] Test verifies no console errors during exploration
- [ ] Test checks performance metrics (FPS)
- [ ] Test passes consistently

**Technical Notes**:

- Extend existing Playwright setup
- Use keyboard simulation (W/A/S/D keys)
- Add visual regression testing if possible

**Dependencies**: THREE-406

**Priority**: Low
**Story Points**: 5
**Labels**: `testing`, `e2e`, `quality`
**Assignee**: QA Team
**Reporter**: Development Team

---

### THREE-412: Update Documentation for V4.0

**Story**: As a new developer or user, I need updated documentation so that I understand how to use and modify the new house model.

**Description**:
Update all relevant documentation to reflect the V4.0 changes.

**Acceptance Criteria**:

- [ ] `USER-GUIDE.md` updated with new house information
- [ ] `V4-IMPLEMENTATION-SUMMARY.md` created
- [ ] `README.md` updated with new screenshots/description
- [ ] Code comments added to ClassicHouse component
- [ ] Architecture diagram updated (if exists)

**Technical Notes**:

- Include information about model source and licensing
- Document any known limitations or issues
- Provide guidance for replacing the model in the future

**Dependencies**: THREE-409

**Priority**: Medium
**Story Points**: 3
**Labels**: `documentation`
**Assignee**: Development Team
**Reporter**: Product Owner

---

## Summary

**Total Stories**: 12
**Total Story Points**: 35
**Estimated Timeline**: 2 weeks (assuming 1 developer)

**Sprint Breakdown**:

- **Sprint 1 (Week 1)**: THREE-401 to THREE-406 (Core Integration)
- **Sprint 2 (Week 2)**: THREE-407 to THREE-412 (Optimization & Quality)

**Success Metrics**:

- Model loads successfully
- 60 FPS maintained
- Users can explore the house without issues
- Visual quality significantly improved over V2.0

---

**Epic Status**: Ready for Development
**Created**: 2025-11-21
**Last Updated**: 2025-11-21
