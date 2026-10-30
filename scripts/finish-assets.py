from pathlib import Path
import json, struct, subprocess, urllib.request
from PIL import Image
root = Path(__file__).resolve().parents[1]
assets = root / 'dist' / 'assets'
generated = Path('C:/Users/WIN11/.codex/generated_images/01a18a7a-2eb3-74c2-8df7-8977514138e1')
Image.open(generated / 'exec-26cf85a8-f6d5-4964-bcac-fb6591f0ccb3.png').convert('RGB').save(assets/'bahari-cover.webp', quality=90, method=6)
font = assets/'fonts/manrope.ttf'
data = font.read_bytes()
count = struct.unpack('>H', data[4:6])[0]
tags = [data[12+i*16:16+i*16].decode('ascii') for i in range(count)]
if 'fvar' not in tags:
    urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf', font)
    print('Downloaded variable Manrope.')
direction = Path('C:/Users/WIN11/.codex/visualizations/2026/10/30/01a18a7a-2eb3-74c2-8df7-8977514138e1/tmp/direction')
poppler = 'C:/Users/WIN11/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'
for index, page, name in [(1,1,'leticia-book'),(2,1,'nathalia-book'),(0,1,'novo-cover'),(0,5,'novo-flow')]:
    meta=json.loads((direction/f'pdf-{index}.json').read_text(encoding='utf-8'))
    pdf=meta.get('path') or meta.get('file')
    if not pdf:
        print('No PDF path', list(meta)); continue
    output=root/'docs'/f'{name}-render'
    subprocess.run([poppler,'-f',str(page),'-l',str(page),'-singlefile','-scale-to','2000','-png',str(pdf),str(output)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    Image.open(str(output)+'.png').convert('RGB').save(assets/f'{name}.webp',quality=90,method=6)
    Path(str(output)+'.png').unlink()
    print(name)
css=root/'dist/styles.css'
text=css.read_text(encoding='utf-8').replace('height:65.5%;z-index:1;', 'height:65.5%;z-index:3;')
css.write_text(text,encoding='utf-8')
print('Assets ready.')
