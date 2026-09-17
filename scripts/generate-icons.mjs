import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create SVG Icon for A Cola da Gil
// Brand color: #ff28b4 (Vibrant Pink), Dark Navy: #111827, Gold/Orange: #f59e0b
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff28b4"/>
      <stop offset="100%" stop-color="#db1096"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#db1096" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <!-- Background with slight rounded squircle -->
  <rect width="512" height="512" rx="100" fill="url(#pinkGrad)"/>
  
  <!-- White paper "colinha" sheet -->
  <g filter="url(#shadow)">
    <rect x="96" y="80" width="320" height="352" rx="24" fill="#ffffff"/>
    
    <!-- Top banner on colinha -->
    <path d="M 96 104 C 96 90.7 106.7 80 120 80 L 392 80 C 405.3 80 416 90.7 416 104 L 416 136 L 96 136 Z" fill="#ff28b4"/>
    
    <!-- Checklist / ballot check marks -->
    <rect x="136" y="166" width="36" height="36" rx="8" fill="#ff28b4" fill-opacity="0.15"/>
    <path d="M144 184 L 152 192 L 164 176" stroke="#ff28b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="188" y="174" width="188" height="20" rx="6" fill="#1e293b"/>

    <rect x="136" y="222" width="36" height="36" rx="8" fill="#ff28b4" fill-opacity="0.15"/>
    <path d="M144 240 L 152 248 L 164 232" stroke="#ff28b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="188" y="230" width="150" height="20" rx="6" fill="#64748b"/>

    <rect x="136" y="278" width="36" height="36" rx="8" fill="#ff28b4" fill-opacity="0.15"/>
    <path d="M144 296 L 152 304 L 164 288" stroke="#ff28b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="188" y="286" width="168" height="20" rx="6" fill="#64748b"/>
    
    <!-- Urna number highlight: 4478 Cibele -->
    <rect x="132" y="336" width="248" height="60" rx="14" fill="#ff28b4"/>
    <text x="256" y="378" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="middle" letter-spacing="3">4478</text>
  </g>
  
  <!-- Heart badge -->
  <circle cx="390" cy="116" r="32" fill="#ffffff"/>
  <path d="M390 128 C390 128 372 118 372 107 C372 100.4 377.4 95 384 95 C387.8 95 390 98 390 98 C390 98 392.2 95 396 95 C402.6 95 408 100.4 408 107 C408 118 390 128 390 128 Z" fill="#ff28b4"/>
</svg>`;

// Maskable icon with 15% safe padding
const svgMaskableIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#ff28b4"/>
  <!-- Centered content within safe circle -->
  <g transform="translate(56, 56) scale(0.78)">
    <rect x="96" y="80" width="320" height="352" rx="24" fill="#ffffff"/>
    <path d="M 96 104 C 96 90.7 106.7 80 120 80 L 392 80 C 405.3 80 416 90.7 416 104 L 416 136 L 96 136 Z" fill="#ff28b4"/>
    <rect x="136" y="166" width="36" height="36" rx="8" fill="#ff28b4" fill-opacity="0.15"/>
    <path d="M144 184 L 152 192 L 164 176" stroke="#ff28b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="188" y="174" width="188" height="20" rx="6" fill="#1e293b"/>
    <rect x="136" y="222" width="36" height="36" rx="8" fill="#ff28b4" fill-opacity="0.15"/>
    <path d="M144 240 L 152 248 L 164 232" stroke="#ff28b4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="188" y="230" width="150" height="20" rx="6" fill="#64748b"/>
    <rect x="132" y="336" width="248" height="60" rx="14" fill="#ff28b4"/>
    <text x="256" y="378" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="middle" letter-spacing="3">4478</text>
  </g>
</svg>`;

async function generate() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
  console.log('Saved icon.svg');

  const svgBuffer = Buffer.from(svgIcon);
  const maskableBuffer = Buffer.from(svgMaskableIcon);

  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');
}

generate().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
