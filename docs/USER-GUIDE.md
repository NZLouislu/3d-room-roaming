# 🎮 3D Room Roaming System V2.0 - User Guide

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The application will open at: **http://localhost:5173**

---

## 🎯 How to Use

### 🖱️ **Controls**

#### **Movement (First-Person)**

- **W** - Move forward
- **A** - Move left
- **S** - Move backward
- **D** - Move right
- **Mouse** - Look around (click on canvas first to lock pointer)
- **ESC** - Release mouse pointer

#### **Interaction**

- **Click** on furniture to see information
- **Hover** over furniture to see name labels
- **Toggle Day/Night** button in the UI (if available)

---

## 🌟 What You'll See

### 🏡 **The Scene**

When you start the application, you'll experience:

#### **1. Environment**

- **Sky**: Realistic sky with sun/moon
  - **Day Mode**: Blue sky with bright sun
  - **Night Mode**: Dark sky with stars
- **Ground**: Large grass field (100x100 units)
  - Green grass texture
  - Realistic contact shadows

#### **2. The House**

- **Room**: Indoor space with walls
  - Currently using basic geometry
  - Ready for 3D model replacement
- **Collision**: You cannot walk through walls

#### **3. Garden (Outdoor)**

- **Trees**: 30 trees scattered around
  - Random positions (avoiding house area)
  - Random sizes and rotations
  - GPU-optimized (renders fast!)
- **Fence**: Wooden fence around the perimeter
  - Brown wooden posts
  - Surrounds the entire area
- **Pathway**: Stone walkway
  - Leads to the house entrance

#### **4. Furniture (Interactive)**

Inside the living room, you'll find:

- **🛋️ Modern Sofa** (purple/blue)
  - Position: Left side of room
  - Price: $599
  - Click to see details
- **☕ Coffee Table** (orange)

  - Position: Right side of room
  - Price: $199
  - Click to see details

- **💡 Floor Lamp** (yellow)
  - Position: Near entrance
  - Price: $89
  - Click to see details

---

## 🎨 Visual Features

### **Lighting System**

#### **Day Mode** (Default)

- Bright directional sunlight
- Blue sky background
- Green grass ground
- Clear shadows

#### **Night Mode** (Toggle button)

- Dark sky with stars
- Warm indoor lights (orange glow)
- Cool accent lights (blue)
- Atmospheric shadows

### **Shadows**

- **Contact Shadows**: Soft shadows on the ground
- **Real-time Shadows**: From furniture and trees
- **Optimized**: Maintains 60 FPS

---

## 📍 Navigation Tips

### **Exploring the Scene**

1. **Start Position**: You spawn inside the room
2. **Look Around**: Move your mouse to see the entire room
3. **Find the Doorway**: Look for the opening in the front wall (center of the room)
   - The doorway is **8 units wide** in the center of the front wall
   - You'll see a white lintel (top beam) above the doorway
4. **Walk Outside**:
   - Face the doorway (you should see the opening)
   - Press **W** to move forward through the doorway
   - You'll exit into the garden area
5. **Explore Garden**: Walk around to see trees and fence
6. **Return Inside**: Turn around and walk back through the doorway

### **Finding Things**

- **Doorway**: Center of the front wall (8 units wide opening)
- **Furniture**: Inside the main room (left and right sides)
- **Trees**: Outside, scattered around the house
- **Fence**: Walk to the edges of the scene
- **Pathway**: Stone path near the house entrance

---

## 🎮 Interactive Features

### **Furniture Interaction**

1. **Hover Effect**:

   - Move cursor over furniture
   - Cursor changes to pointer
   - Furniture name appears above it

2. **Click to Select**:

   - Click on any furniture
   - Info card appears showing:
     - Name
     - Price
     - Description

3. **Deselect**:
   - Click on empty space
   - Info card disappears

---

## 🌓 Day/Night Toggle

### **How to Toggle** (if UI button is visible)

1. Look for "Toggle Day/Night" button
2. Click to switch modes
3. Watch the environment transform:
   - Sky color changes
   - Lighting adjusts
   - Shadows update

### **Visual Changes**

- **Day → Night**:

  - Sky darkens
  - Sun disappears
  - Indoor lights turn on
  - Ambient light dims

- **Night → Day**:
  - Sky brightens to blue
  - Sun appears
  - Indoor lights turn off
  - Full brightness returns

---

## 🎯 What to Look For

### **Performance Features**

1. **Smooth Movement**: Should maintain 60 FPS
2. **GPU Instancing**: 30 trees render as efficiently as 1
3. **Optimized Shadows**: Soft shadows without performance hit
4. **Fast Loading**: Scene loads in under 10 seconds

### **Visual Quality**

1. **Realistic Sky**: Dynamic sky with atmospheric scattering
2. **Grass Ground**: Textured ground with proper color
3. **Tree Variety**: Each tree slightly different (rotation/scale)
4. **Proper Shadows**: Objects cast realistic shadows

---

## 🗺️ Scene Layout

```
        [Fence]
    ┌─────────────────┐
    │   🌳    🌳   🌳 │
    │                 │
    │  🌳  [House] 🌳 │
    │      ┌─────┐    │
    │  🌳  │Room │ 🌳 │
    │      │🛋️ ☕│    │
    │  🌳  │  💡 │ 🌳 │
    │      └─────┘    │
    │   🌳    🌳   🌳 │
    └─────────────────┘
        [Fence]
```

**Legend**:

- 🌳 = Trees (30 total, randomly placed)
- 🛋️ = Sofa
- ☕ = Coffee Table
- 💡 = Lamp
- [Fence] = Wooden fence perimeter

---

## 🐛 Troubleshooting

### **Can't Move**

- **Solution**: Click on the canvas to lock the pointer
- **Check**: Make sure you're using W/A/S/D keys

### **Can't See Anything**

- **Solution**: Move your mouse to look around
- **Check**: Wait for scene to fully load (loading indicator)

### **Performance Issues**

- **Check**: Open browser console (F12) for errors
- **Solution**: Close other browser tabs
- **Verify**: Your GPU supports WebGL 2.0

### **Furniture Not Clickable**

- **Solution**: Make sure pointer is locked (click canvas first)
- **Check**: Hover over furniture - cursor should change

---

## 🎓 Advanced Features

### **For Developers**

#### **Modify Furniture Layout**

Edit `src/data/roomLayout.ts`:

```typescript
export const roomLayout = {
  livingRoom: {
    furniture: [
      {
        id: "sofa-1",
        position: [-2, 0.5, -2], // Change position
        name: "Modern Sofa",
        price: "$599",
        color: "#4f46e5", // Change color
      },
    ],
  },
};
```

#### **Add More Trees**

Edit `src/components/3d/Experience.tsx`:

```typescript
<Garden />  // Default: 30 trees
// Change to:
<Trees count={50} />  // 50 trees
```

#### **Change Sky Settings**

Edit `src/components/3d/Environment.tsx`:

```typescript
<Sky
  sunPosition={[100, 20, 100]} // Adjust sun position
  turbidity={8} // Atmospheric thickness
/>
```

---

## 📊 Performance Metrics

### **Expected Performance**

- **FPS**: 60 (stable)
- **Load Time**: < 10 seconds
- **Memory**: < 500 MB
- **Draw Calls**: ~10-15 (optimized with instancing)

### **Check Performance**

1. Open browser DevTools (F12)
2. Go to Performance tab
3. Record while moving around
4. Check FPS counter

---

## 🎨 Customization Ideas

### **Easy Changes**

1. **Furniture Colors**: Edit `color` in `roomLayout.ts`
2. **Tree Count**: Change `count` prop in `<Trees />`
3. **Ground Color**: Edit `color` in `Ground.tsx`
4. **Fence Material**: Edit `color` in `Fence.tsx`

### **Advanced Changes**

1. **Add New Rooms**: Extend `roomLayout.ts`
2. **Import 3D Models**: Use `useGLTF` hook
3. **Custom Materials**: Add PBR textures
4. **Weather Effects**: Add particle systems

---

## 🚀 Next Steps

### **To Enhance Your Scene**

1. **Download 3D Models**:

   - Visit [Sketchfab](https://sketchfab.com)
   - Search for "low poly house" or "furniture"
   - Download GLB format

2. **Convert to React**:

   ```bash
   npx gltfjsx model.glb
   ```

3. **Import and Use**:
   ```typescript
   import { House } from "./models/House";
   <House position={[0, 0, 0]} />;
   ```

---

## 📞 Need Help?

### **Common Questions**

**Q: How do I exit pointer lock?**
A: Press ESC key

**Q: Can I add more furniture?**
A: Yes! Edit `src/data/roomLayout.ts`

**Q: How do I change colors?**
A: Edit the `color` property in component props or roomLayout config

**Q: Can I export this as a standalone app?**
A: Yes! Run `npm run build` and deploy the `dist/` folder

---

## 🎉 Enjoy Your 3D Room!

Explore, interact, and customize your virtual space. The V2.0 system is fully functional and ready for expansion!

**Have fun! 🏡🌳✨**
