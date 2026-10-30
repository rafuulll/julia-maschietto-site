from pathlib import Path
from PIL import Image
from pypdf import PdfReader
import urllib.request,re,json,concurrent.futures,shutil,subprocess
root=Path(__file__).resolve().parents[1]
assets=root/'dist'/'assets'; (assets/'fonts').mkdir(exist_ok=True); (assets/'icons').mkdir(exist_ok=True)
source=assets/'hero-julia-source.png'
im=Image.open(source).convert('RGB'); im.save(assets/'hero-julia.webp',quality=91,method=6)
(root/'docs'/'hero-julia-source.png').write_bytes(source.read_bytes());source.unlink()
im.thumbnail((1200,750));im.save(assets/'social-preview.jpg',quality=88)
pdf=next(Path('C:/Users/WIN11/Downloads').glob('PORTFO*compressed.pdf'));r=PdfReader(str(pdf))
for name,page,index in [('bahari-proof',9,5),('bruna-proof',9,1),('bruna-feed',8,2),('sepulveda-proof',10,1),('positioning-proof',10,2)]:
 im=r.pages[page].images[index].image.convert('RGB');im.save(assets/(name+'.webp'),quality=94,method=6)
for page,index,name in [(3,1,'revista-work')]:
 r.pages[page].images[index].image.convert('RGB').save(assets/(name+'.webp'),quality=92)
old=Path('C:/Users/WIN11/.codex/visualizations/2026/10/30/01a18a7a-2eb3-74c2-8df7-8977514138e1/tmp/direction')
for src,name in [('book1-01.png','leticia-book'),('book1-24.png','leticia-visual'),('book1-35.png','leticia-content'),('book2-01.png','nathalia-book'),('book2-26.png','nathalia-content'),('book0-1.png','novo-cover'),('book0-5.png','novo-flow')]:
 p=old/src
 if p.exists(): Image.open(p).convert('RGB').save(assets/(name+'.webp'),quality=92)
shutil.copyfile('C:/Users/WIN11/Desktop/Julia - Landing Page/mockup-notebook_2x.webp',assets/'notebook-frame.webp')
shutil.copyfile('C:/Users/WIN11/Desktop/Julia - Landing Page/grdr 2025-08-01 170147.522.jpg',root/'docs'/'julia-smile-original.jpg')
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
 return urllib.request.urlopen(req,timeout=40).read()
def font(family,file):
 css=get('https://fonts.googleapis.com/css2?family='+family+'&display=swap').decode()
 url=re.findall(r'url\((https[^)]+)\)',css)[-1]
 data=get(url);suffix='.woff2' if data[:4]==b'wOF2' else '.ttf'
 (assets/'fonts'/(file+suffix)).write_bytes(data)
 return file+suffix
def icon(name):
 data=get('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/regular/'+name+'.svg')
 (assets/'icons'/(name+'.svg')).write_bytes(data)
jobs=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for family,file in [('Manrope:wght@400..800','manrope'),('Instrument+Serif:ital@1','instrument-serif-italic')]:jobs.append(pool.submit(font,family,file))
 for name in ['arrow-right','arrow-up-right','arrow-left','target','pen-nib','aperture','chat-circle','whatsapp-logo','play','pause','plus','x','check','copy','caret-down']:jobs.append(pool.submit(icon,name))
 jobs.append(pool.submit(lambda:(assets/'lenis.min.js').write_bytes(get('https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js'))))
 for j in jobs:
  try: print('Asset ready',j.result())
  except Exception as e: print('ASSET ERROR',e)
print('Assets',len(list(assets.rglob('*'))))
