"""Final production exports. Original portrait pixels are never synthesized.

Repositions layers in the existing editable composition recipe. Requires the
user's original PNG at its documented local path, Pillow, numpy and fontTools.
"""
from pathlib import Path
import sys, json, hashlib

ROOT = Path(__file__).resolve().parents[1]
sys.path[:0] = [str(ROOT / '.tools'), str(ROOT / '.tools/font-deps')]
from PIL import Image, ImageDraw
from fontTools.ttLib import TTFont

import runpy
scope=runpy.run_path(str(ROOT/'scripts/compose-hero.py'))
layouts = [
    ('desktop', (1920, 1000), 940, 90, [(0,600,245,178),(1,1060,120,174),(2,1190,470,154)]),
    ('tablet', (1400, 1100), 990, 100, [(0,335,285,168),(1,810,145,166),(2,960,440,142)]),
    ('mobile', (900, 1050), 900, 105, [(0,108,310,148),(1,550,165,142),(2,660,515,128)]),
]
records = []
for label,size,height,top,layout in layouts:
    filename = f'hero-{label}-final.webp'
    scope['composition'](filename,size,height,top,layout)
    records.append({'asset': filename, 'size':size, 'layout':layout, 'bytes':(ROOT/'dist/assets'/filename).stat().st_size})
source_rgb = scope['rgb']
(ROOT/'docs/hero-final-source.json').write_text(json.dumps({
    'source':scope['source'].name, 'crop':[160,600,3880,4209],
    'originalRGBHash':hashlib.sha256(source_rgb.tobytes()).hexdigest(),
    'faceGeneration':False, 'faceRetouching':False,
    'change':'Only the two rear card coordinates changed. Front card, portrait and background preserved.',
    'exports':records},indent=2),encoding='utf-8')
for name in ['manrope', 'instrument-serif-italic']:
    font = TTFont(ROOT/f'assets-source/fonts/{name}.ttf')
    font.flavor = 'woff2'
    font.save(ROOT/f'dist/assets/fonts/{name}.woff2')

# Own vector mark, rasterized deterministically for small legacy/browser icons.
# The mark combines the J hook with the shared left stem of the M.
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#721919"/><g fill="none" stroke="#eff0eb" stroke-width="3.8" stroke-linecap="square" stroke-linejoin="round"><path d="M12 17H31V39C31 50 18 52 14 42"/><path d="M31 47V17L42 32L53 17V47"/></g></svg>'''
(ROOT/'dist/favicon.svg').write_text(svg,encoding='utf-8')
im = Image.new('RGBA',(1024,1024))
d = ImageDraw.Draw(im)
d.rounded_rectangle((0,0,1023,1023),radius=240,fill='#721919')
scale = 16
points = [(12,17),(31,17),(31,39)]
# Cubic J hook, sampled for consistent raster/vector geometry.
for i in range(1,81):
    t=i/80; a=(1-t)**3; b=3*(1-t)**2*t; c=3*(1-t)*t*t; e=t**3
    points.append((a*31+b*31+c*18+e*14, a*39+b*50+c*52+e*42))
d.line([(round(x*scale),round(y*scale)) for x,y in points],fill='#eff0eb',width=61,joint='curve')
d.line([(x*scale,y*scale) for x,y in [(31,47),(31,17),(42,32),(53,17),(53,47)]],fill='#eff0eb',width=61,joint='curve')
im.save(ROOT/'dist/favicon.ico',format='ICO',sizes=[(16,16),(32,32),(48,48),(64,64)])
im.resize((180,180),Image.Resampling.LANCZOS).save(ROOT/'dist/apple-touch-icon.png')
print(json.dumps({'hero':records,'fonts':[{p.name:p.stat().st_size} for p in (ROOT/'dist/assets/fonts').glob('*.woff2')]}))
