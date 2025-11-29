# Classic House Model - Download Instructions

## Model Information

- **Source**: Sketchfab
- **URL**: https://sketchfab.com/3d-models/classic-style-porch-house-without-furniture-df0c68a5e3d74c8393d9a2cd73044a22
- **Name**: Classic Style Porch House (Without Furniture)
- **Format**: .glb (preferred) or .gltf

## Download Steps

1. **Visit Sketchfab**

   - Go to the model URL above
   - You may need to create a free Sketchfab account

2. **Download the Model**

   - Click the "Download 3D Model" button
   - Select "glTF" format
   - Choose "Binary (.glb)" option
   - Download the file

3. **Place the File**

   - Rename the downloaded file to `classic-house.glb`
   - Place it in: `public/models/classic-house.glb`

4. **Verify**
   - File size should be between 5MB - 50MB
   - You can preview it using online viewers like:
     - https://gltf-viewer.donmccurdy.com/
     - https://sandbox.babylonjs.com/

## Expected File Structure

```
public/
└── models/
    └── classic-house.glb  ← Place downloaded file here
```

## Next Steps

After downloading, run:

```bash
npx gltfjsx public/models/classic-house.glb -o src/components/3d/models/ClassicHouse.tsx --types
```

This will automatically generate the React component.
