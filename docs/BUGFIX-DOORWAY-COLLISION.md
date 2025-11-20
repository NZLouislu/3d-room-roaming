# 🐛 Bug Fix: Stuck at Doorway When Re-entering

## ❌ Problem Description

After exiting the room to the garden, players were unable to walk back inside. They would get "stuck" at the doorway threshold or collide with an invisible barrier.

### Symptoms

- Can walk out of the room easily
- Cannot walk back in through the same doorway
- Player stops abruptly at the room boundary
- Physics collision glitching at the threshold

### Root Cause

**Overlapping Physics Colliders**:

1. The **Room** component had a `RigidBody` that included the floor (at Y=-0.5).
2. The **Ground** component also has a `RigidBody` for the outdoor grass (at Y=-0.5).
3. At the doorway/room boundary, these two physics bodies overlapped or created a "seam" that the physics engine treated as a collision edge, blocking movement.

---

## ✅ Solution

Separated the Room's floor from its physics body.

### Code Changes

**File**: `src/components/3d/Room.tsx`

**Before**:

```typescript
<RigidBody type="fixed" colliders="cuboid">
  {/* Floor included in collision */}
  <mesh position={[0, -0.5, 0]}>...</mesh>
  {/* Walls... */}
</RigidBody>
```

**After**:

```typescript
<>
  {/* Floor is now VISUAL ONLY (no collision) */}
  <mesh position={[0, -0.5, 0]}>...</mesh>

  {/* Only Walls have collision */}
  <RigidBody type="fixed" colliders="cuboid">
    {/* Walls... */}
  </RigidBody>
</>
```

### Why This Works

- The **Ground** component (fixed in previous step) now provides the physics floor for the **entire scene** (infinite plane).
- The **Room** floor is now just a visual layer on top of the Ground physics.
- There is no longer a collision "seam" or overlap at the doorway.
- The player glides smoothly on the Ground physics collider from outside to inside.

---

## 🎮 Verification

### Manual Testing Steps

1. **Start Application**

   ```bash
   npm run dev
   ```

2. **Exit Room**

   - Walk through the doorway to the garden.
   - Confirm you are outside.

3. **Re-enter Room**
   - Turn around 180 degrees.
   - Walk forward through the doorway.
   - **Expected**: Smooth transition, no blocking.

---

**Status**: ✅ FIXED
**Version**: 2.0.2
**Date**: 2025-11-20
