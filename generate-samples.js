#!/usr/bin/env node

/**
 * Sample STL Generator for Utopia 3D Studio
 * Creates sample STL files for testing the application
 */

import fs from 'fs';
import path from 'path';

// Ensure samples directory exists
const samplesDir = path.join(process.cwd(), 'public', 'samples');
if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
}

/**
 * Generate ASCII STL content for a cube
 */
function generateCubeSTL(size = 20) {
    const s = size / 2;

    const stlContent = `solid Cube
    facet normal 0.0 0.0 1.0
        outer loop
            vertex -${s} -${s} ${s}
            vertex ${s} -${s} ${s}
            vertex ${s} ${s} ${s}
        endloop
    endfacet
    facet normal 0.0 0.0 1.0
        outer loop
            vertex -${s} -${s} ${s}
            vertex ${s} ${s} ${s}
            vertex -${s} ${s} ${s}
        endloop
    endfacet
    facet normal 0.0 0.0 -1.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex -${s} ${s} -${s}
            vertex ${s} ${s} -${s}
        endloop
    endfacet
    facet normal 0.0 0.0 -1.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex ${s} ${s} -${s}
            vertex ${s} -${s} -${s}
        endloop
    endfacet
    facet normal 0.0 1.0 0.0
        outer loop
            vertex -${s} ${s} -${s}
            vertex -${s} ${s} ${s}
            vertex ${s} ${s} ${s}
        endloop
    endfacet
    facet normal 0.0 1.0 0.0
        outer loop
            vertex -${s} ${s} -${s}
            vertex ${s} ${s} ${s}
            vertex ${s} ${s} -${s}
        endloop
    endfacet
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex ${s} -${s} -${s}
            vertex ${s} -${s} ${s}
        endloop
    endfacet
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex ${s} -${s} ${s}
            vertex -${s} -${s} ${s}
        endloop
    endfacet
    facet normal 1.0 0.0 0.0
        outer loop
            vertex ${s} -${s} -${s}
            vertex ${s} ${s} -${s}
            vertex ${s} ${s} ${s}
        endloop
    endfacet
    facet normal 1.0 0.0 0.0
        outer loop
            vertex ${s} -${s} -${s}
            vertex ${s} ${s} ${s}
            vertex ${s} -${s} ${s}
        endloop
    endfacet
    facet normal -1.0 0.0 0.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex -${s} -${s} ${s}
            vertex -${s} ${s} ${s}
        endloop
    endfacet
    facet normal -1.0 0.0 0.0
        outer loop
            vertex -${s} -${s} -${s}
            vertex -${s} ${s} ${s}
            vertex -${s} ${s} -${s}
        endloop
    endfacet
endsolid Cube`;

    return stlContent;
}

/**
 * Generate ASCII STL content for a pyramid
 */
function generatePyramidSTL(baseSize = 20, height = 15) {
    const s = baseSize / 2;
    const h = height;

    const stlContent = `solid Pyramid
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -${s} 0.0 ${s}
            vertex ${s} 0.0 ${s}
            vertex ${s} 0.0 -${s}
        endloop
    endfacet
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -${s} 0.0 ${s}
            vertex ${s} 0.0 -${s}
            vertex -${s} 0.0 -${s}
        endloop
    endfacet
    facet normal 0.0 0.8944 0.4472
        outer loop
            vertex -${s} 0.0 ${s}
            vertex 0.0 ${h} 0.0
            vertex ${s} 0.0 ${s}
        endloop
    endfacet
    facet normal 0.8944 0.4472 0.0
        outer loop
            vertex ${s} 0.0 ${s}
            vertex 0.0 ${h} 0.0
            vertex ${s} 0.0 -${s}
        endloop
    endfacet
    facet normal 0.0 0.8944 -0.4472
        outer loop
            vertex ${s} 0.0 -${s}
            vertex 0.0 ${h} 0.0
            vertex -${s} 0.0 -${s}
        endloop
    endfacet
    facet normal -0.8944 0.4472 0.0
        outer loop
            vertex -${s} 0.0 -${s}
            vertex 0.0 ${h} 0.0
            vertex -${s} 0.0 ${s}
        endloop
    endfacet
endsolid Pyramid`;

    return stlContent;
}

/**
 * Generate ASCII STL content for a tetrahedron
 */
function generateTetrahedronSTL(size = 20) {
    const s = size;
    const h = s * Math.sqrt(2/3);

    const stlContent = `solid Tetrahedron
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex 0.0 0.0 ${s * Math.sqrt(3)/3}
            vertex -${s/2} 0.0 -${s * Math.sqrt(3)/6}
            vertex ${s/2} 0.0 -${s * Math.sqrt(3)/6}
        endloop
    endfacet
    facet normal -0.8660 0.5 0.0
        outer loop
            vertex 0.0 0.0 ${s * Math.sqrt(3)/3}
            vertex 0.0 ${h} 0.0
            vertex -${s/2} 0.0 -${s * Math.sqrt(3)/6}
        endloop
    endfacet
    facet normal 0.8660 0.5 0.0
        outer loop
            vertex -${s/2} 0.0 -${s * Math.sqrt(3)/6}
            vertex 0.0 ${h} 0.0
            vertex ${s/2} 0.0 -${s * Math.sqrt(3)/6}
        endloop
    endfacet
    facet normal 0.0 0.5 -0.8660
        outer loop
            vertex ${s/2} 0.0 -${s * Math.sqrt(3)/6}
            vertex 0.0 ${h} 0.0
            vertex 0.0 0.0 ${s * Math.sqrt(3)/3}
        endloop
    endfacet
endsolid Tetrahedron`;

    return stlContent;
}

/**
 * Generate a complex geometry (French themed - Eiffel Tower base)
 */
function generateEiffelTowerBaseSTL() {
    const stlContent = `solid EiffelTowerBase
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -25.0 0.0 25.0
            vertex 25.0 0.0 25.0
            vertex 25.0 0.0 -25.0
        endloop
    endfacet
    facet normal 0.0 -1.0 0.0
        outer loop
            vertex -25.0 0.0 25.0
            vertex 25.0 0.0 -25.0
            vertex -25.0 0.0 -25.0
        endloop
    endfacet
    facet normal 0.7071 0.7071 0.0
        outer loop
            vertex 25.0 0.0 25.0
            vertex 15.0 20.0 15.0
            vertex 25.0 0.0 -25.0
        endloop
    endfacet
    facet normal 0.7071 0.7071 0.0
        outer loop
            vertex 25.0 0.0 -25.0
            vertex 15.0 20.0 15.0
            vertex 15.0 20.0 -15.0
        endloop
    endfacet
    facet normal 0.0 0.7071 -0.7071
        outer loop
            vertex 25.0 0.0 -25.0
            vertex 15.0 20.0 -15.0
            vertex -25.0 0.0 -25.0
        endloop
    endfacet
    facet normal 0.0 0.7071 -0.7071
        outer loop
            vertex -25.0 0.0 -25.0
            vertex 15.0 20.0 -15.0
            vertex -15.0 20.0 -15.0
        endloop
    endfacet
    facet normal -0.7071 0.7071 0.0
        outer loop
            vertex -25.0 0.0 -25.0
            vertex -15.0 20.0 -15.0
            vertex -25.0 0.0 25.0
        endloop
    endfacet
    facet normal -0.7071 0.7071 0.0
        outer loop
            vertex -25.0 0.0 25.0
            vertex -15.0 20.0 -15.0
            vertex -15.0 20.0 15.0
        endloop
    endfacet
    facet normal 0.0 0.7071 0.7071
        outer loop
            vertex -25.0 0.0 25.0
            vertex -15.0 20.0 15.0
            vertex 25.0 0.0 25.0
        endloop
    endfacet
    facet normal 0.0 0.7071 0.7071
        outer loop
            vertex 25.0 0.0 25.0
            vertex -15.0 20.0 15.0
            vertex 15.0 20.0 15.0
        endloop
    endfacet
    facet normal 0.0 1.0 0.0
        outer loop
            vertex -15.0 20.0 15.0
            vertex -15.0 20.0 -15.0
            vertex 15.0 20.0 -15.0
        endloop
    endfacet
    facet normal 0.0 1.0 0.0
        outer loop
            vertex -15.0 20.0 15.0
            vertex 15.0 20.0 -15.0
            vertex 15.0 20.0 15.0
        endloop
    endfacet
endsolid EiffelTowerBase`;

    return stlContent;
}

// Generate sample files
const samples = [
    { name: 'cube_sample.stl', content: generateCubeSTL(20), description: 'Simple cube - perfect for testing basic functionality' },
    { name: 'pyramid_sample.stl', content: generatePyramidSTL(25, 18), description: 'Pyramid shape - good for volume calculation tests' },
    { name: 'tetrahedron_sample.stl', content: generateTetrahedronSTL(15), description: 'Tetrahedron - minimal triangular mesh' },
    { name: 'eiffel_base_sample.stl', content: generateEiffelTowerBaseSTL(), description: 'Eiffel Tower base - complex geometry with French theme' }
];

console.log('🔧 Generating sample STL files for Utopia 3D Studio...\n');

samples.forEach(sample => {
    const filePath = path.join(samplesDir, sample.name);
    fs.writeFileSync(filePath, sample.content);

    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✅ Generated ${sample.name} (${sizeKB} KB)`);
    console.log(`   ${sample.description}\n`);
});

// Generate README for samples
const readmeContent = `# Sample STL Files

This directory contains sample STL files for testing Utopia 3D Studio.

## Files:

- **cube_sample.stl** - Simple cube geometry (12 triangles)
- **pyramid_sample.stl** - Pyramid with square base (8 triangles)
- **tetrahedron_sample.stl** - Basic tetrahedron (4 triangles)
- **eiffel_base_sample.stl** - Eiffel Tower base structure (12 triangles)

## Usage:

1. Drag and drop these files into the Utopia 3D Studio interface
2. Use them to test volume calculations, dimension measurements
3. Practice manipulation tools (rotation, scaling, coloring)
4. Export modified versions as new STL files

## Features to Test:

- ✅ File upload (drag & drop or file picker)
- ✅ 3D visualization and navigation
- ✅ Volume calculation accuracy
- ✅ Dimension measurements
- ✅ Object manipulation
- ✅ Color customization
- ✅ STL export functionality

Generated by Utopia 3D Studio sample generator.
`;

fs.writeFileSync(path.join(samplesDir, 'README.md'), readmeContent);

console.log('📁 Sample files generated successfully!');
console.log(`📍 Location: ${samplesDir}`);
console.log('\n🎯 Ready for testing Utopia 3D Studio!');
console.log('   Start the dev server: npm run dev');
console.log('   Then drag & drop the sample files to test all features.');
