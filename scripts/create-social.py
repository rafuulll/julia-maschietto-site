"""Social card composed from the final original-photo artwork and local fonts."""
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'.tools'))
from PIL import Image,ImageDraw,ImageFont
im=Image.open(ROOT/'dist/assets/hero-desktop-final.webp').convert('RGB').resize((1200,625),Image.Resampling.LANCZOS)
canvas=Image.new('RGB',(1200,630),(210,207,201));canvas.paste(im,(0,0));shade=Image.new('RGBA',canvas.size);d=ImageDraw.Draw(shade)
for y in range(630):d.line((0,y,1200,y),fill=(14,10,12,round(240*max(0,(y/630-.35)/.65))))
canvas=Image.alpha_composite(canvas.convert('RGBA'),shade);d=ImageDraw.Draw(canvas)
font=lambda name,size:ImageFont.truetype(str(ROOT/'assets-source/fonts'/name),size)
d.text((42,470),'Estratégia para posicionar.',font=font('manrope.ttf',39),fill='white')
d.text((42,521),'Criatividade para comunicar.',font=font('instrument-serif-italic.ttf',52),fill='white')
d.text((42,590),'Julia Maschietto',font=font('manrope.ttf',19),fill='white')
canvas.convert('RGB').save(ROOT/'dist/assets/social-preview-final.jpg',quality=90,optimize=True)
