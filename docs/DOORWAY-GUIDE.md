# 🚪 Room Layout with Doorway

## 📐 Room Structure

The room now has a **doorway** in the center of the front wall, allowing you to walk outside to the garden.

### Top View (Bird's Eye)

```
        Back Wall (Solid)
    ┌─────────────────────┐
    │                     │
    │   🛋️              ☕ │  Left Wall
    │                     │  (Solid)
    │         💡          │
    │                     │  Right Wall
    │                     │  (Solid)
    └──┬────────────┬─────┘
       │  DOORWAY   │         Front Wall (Split)
       │  (8 units) │
       └────────────┘
           ↓ Exit
        [Garden]
```

### Front View (Looking at Doorway)

```
    ┌─────────────────────────────┐
    │      White Lintel (Top)     │
    ├──────┐              ┌───────┤
    │      │              │       │
    │ Left │   DOORWAY    │ Right │
    │ Wall │   (8 units)  │ Wall  │
    │      │              │       │
    │      │              │       │
    └──────┴──────────────┴───────┘
           └──────────────┘
              You can walk
              through here!
```

## 🎯 Doorway Specifications

### Dimensions

- **Width**: 8 units (wide enough for easy passage)
- **Height**: 4 units (from floor to lintel)
- **Location**: Center of front wall

### Components

1. **Left Wall Section**: 6 units wide
2. **Doorway Opening**: 8 units wide (center)
3. **Right Wall Section**: 6 units wide
4. **Lintel (Top Beam)**: 8 units wide, 1 unit tall

### Position Details

- **Left Wall Part**: Position X = -7
- **Doorway Center**: Position X = 0
- **Right Wall Part**: Position X = +7
- **Lintel**: Position Y = 4.5 (above doorway)

## 🚶 How to Exit

### Step-by-Step Guide

1. **Start Inside**

   - You spawn in the center of the room
   - Look around to orient yourself

2. **Locate the Doorway**

   - Look for the opening in the wall
   - You'll see:
     - Two wall sections on either side
     - A white beam (lintel) at the top
     - Clear space in the middle

3. **Face the Doorway**

   - Move your mouse to face the opening
   - The doorway should be directly in front of you

4. **Walk Through**

   - Press and hold **W** key
   - Walk straight through the opening
   - You'll exit into the garden area

5. **Explore Outside**

   - Once outside, you'll see:
     - Trees scattered around
     - Wooden fence perimeter
     - Stone pathway
     - Grass ground

6. **Return Inside**
   - Turn around (move mouse 180°)
   - Walk back through the same doorway
   - Press **W** to re-enter the room

## 🎨 Visual Cues

### Inside the Room

- **White walls** on all sides
- **Gray floor** (lighter than outside)
- **Furniture** (sofa, table, lamp)
- **Doorway opening** clearly visible

### At the Doorway

- **Lintel beam** above (white, horizontal)
- **Clear opening** in the center
- **No collision** - you can walk through freely

### Outside the Garden

- **Green grass** ground
- **Blue sky** above
- **Trees** in various positions
- **Brown fence** around perimeter

## 🔧 Technical Details

### Collision Detection

- **Walls**: Solid, cannot walk through
- **Doorway**: No collision, free passage
- **Lintel**: Above head height, won't block you

### Measurements

```typescript
// Front wall configuration
Left Wall:  { width: 6,  position: [-7, 2.5, 10] }
Doorway:    { width: 8,  position: [0, -, 10] }  // No mesh = opening
Right Wall: { width: 6,  position: [7, 2.5, 10] }
Lintel:     { width: 8,  position: [0, 4.5, 10] }

Total width: 6 + 8 + 6 = 20 units ✓
```

## 🎮 Controls Reminder

- **W** - Move forward (toward doorway)
- **S** - Move backward (away from doorway)
- **A** - Strafe left
- **D** - Strafe right
- **Mouse** - Look around (find the doorway)
- **ESC** - Release mouse pointer

## 💡 Tips

### If You Can't Find the Doorway

1. Move your mouse slowly in a circle
2. Look for the opening with the white lintel
3. The doorway is always in the **front wall** (opposite from back wall)

### If You're Stuck

1. Press **S** to move backward
2. Use **A** and **D** to move sideways
3. Look around with mouse to reorient

### Best Viewing Angle

- Stand in the center of the room
- Look straight ahead at the front wall
- The doorway should be clearly visible

## 🌟 What's Outside

Once you exit through the doorway, you'll discover:

### Immediate Area

- **Stone pathway** leading from the door
- **Open grass field** surrounding the house

### Further Out

- **30 trees** scattered around
- **Wooden fence** marking boundaries
- **Sky environment** with sun/moon

### Navigation Outside

- Walk freely in any direction
- Trees have collision (can't walk through)
- Fence marks the scene boundaries
- Return to doorway to go back inside

## 📊 Room Layout Summary

```
Total Room Size: 20 x 20 units
Floor Height: -0.5
Wall Height: 5 units
Doorway Width: 8 units (40% of wall width)
Doorway Height: 4 units (80% of wall height)

Furniture Positions:
- Sofa: [-2, 0.5, -2]
- Table: [2, 0.5, -2]
- Lamp: [3, 0, 2]

Doorway: Center of front wall (Z = 10)
```

---

**Now you can freely explore both indoor and outdoor areas! Enjoy your 3D room! 🏡✨**
