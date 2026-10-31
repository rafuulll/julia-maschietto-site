"""Editable photograph composition; uses supplied pixels, never synthesizes a face."""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont,ImageFilter
import numpy as np,sys,json,hashlib
root=Path(__file__).resolve().parents[1];assets=root/'dist/assets';out=root/'output/imagegen';out.mkdir(exist_ok=True)
source_assets=root/'assets-source'
source=Path('C:/Users/WIN11/Downloads/grdr 2025-08-01 163616.323 1.png')
original=Image.open(source).convert('RGBA');portrait=original.crop((160,600,3880,4209));rgb=np.asarray(portrait)[:,:,:3].copy()
assert np.array_equal(np.asarray(portrait)[:,:,:3],np.asarray(original)[600:4209,160:3880,:3])
cards=[None,None,None]
# Clean upper story rebuilt from its original photograph, without the main hair crop.
cw,ch=420,747
c=ImageOps.fit(Image.open(source_assets/'hero-story-lipstick.webp').convert('RGB'),(cw,ch),centering=(.5,.46));c=ImageOps.grayscale(c).convert('RGBA')
overlay=Image.new('RGBA',c.size);d=ImageDraw.Draw(overlay)
for y in range(ch):
 a=int(60*max(0,1-y/150)+80*max(0,(y-(ch-140))/140));d.line((0,y,cw,y),fill=(0,0,0,a))
c=Image.alpha_composite(c,overlay);d=ImageDraw.Draw(c);font=ImageFont.truetype(str(source_assets/'fonts/manrope.ttf'),15)
for x in [18,146,274]:d.rounded_rectangle((x,16,x+119,19),radius=1,fill=(255,255,255,220))
avatar=ImageOps.fit(Image.open(source_assets/'hero-story-julia.webp').convert('RGBA'),(27,27));avmask=Image.new('L',(27,27));ImageDraw.Draw(avmask).ellipse((0,0,26,26),fill=255);c.paste(avatar,(18,35),avmask)
d.text((54,38),'Julia Maschietto',font=font,fill='white');d.text((367,35),'···',font=font,fill='white')
d.rounded_rectangle((18,ch-51,307,ch-20),radius=15,outline=(255,255,255,205),width=2);d.text((33,ch-45),'Enviar mensagem',font=font,fill=(255,255,255,230))
d.line([(326,ch-41),(333,ch-47),(341,ch-40),(350,ch-47),(357,ch-41),(341,ch-25),(326,ch-41)],fill='white',width=2)
d.line([(375,ch-45),(401,ch-49),(385,ch-24),(382,ch-38),(375,ch-45),(401,ch-49),(382,ch-38)],fill='white',width=2)
mask=Image.new('L',c.size);ImageDraw.Draw(mask).rounded_rectangle((0,0,cw-1,ch-1),radius=16,fill=255);c.putalpha(mask);cards[1]=c
# Keep the approved frame proportions, replacing only contaminated photo pixels.
for index,photo,center in [(0,'hero-story-julia.webp',(.5,.4)),(2,'hero-story-profile.webp',(.53,.42))]:
 clean=ImageOps.fit(Image.open(source_assets/photo).convert('RGB'),(cw,ch),centering=center);clean=ImageOps.grayscale(clean).convert('RGBA');clean=Image.alpha_composite(clean,overlay)
 ui=Image.new('RGBA',(cw,ch));ud=ImageDraw.Draw(ui)
 for x in [18,146,274]:ud.rounded_rectangle((x,16,x+119,19),radius=1,fill=(255,255,255,220))
 ui.paste(avatar,(18,35),avmask);ud.text((54,38),'Julia Maschietto',font=font,fill='white');ud.text((367,35),'···',font=font,fill='white')
 ud.rounded_rectangle((18,ch-51,307,ch-20),radius=15,outline=(255,255,255,205),width=2);ud.text((33,ch-45),'Enviar mensagem',font=font,fill=(255,255,255,230))
 ud.line([(326,ch-41),(333,ch-47),(341,ch-40),(350,ch-47),(357,ch-41),(341,ch-25),(326,ch-41)],fill='white',width=2)
 ud.line([(375,ch-45),(401,ch-49),(385,ch-24),(382,ch-38),(375,ch-45),(401,ch-49),(382,ch-38)],fill='white',width=2)
 clean=Image.alpha_composite(clean,ui);clean.putalpha(mask);cards[index]=clean
def paste_card(im,index,x,y,w):
 c=cards[index];c=c.resize((w,round(w*c.height/c.width)),Image.Resampling.LANCZOS)
 sm=Image.new('L',im.size);sm.paste(c.getchannel('A'),(x+3,y+8));sm=sm.filter(ImageFilter.GaussianBlur(12));sh=Image.new('RGBA',im.size);sh.putalpha(sm.point(lambda a:int(a*.13)));im.alpha_composite(sh);im.alpha_composite(c,(x,y))
def composition(name,size,ph,py,layout,texture=None):
 w,h=size
 if texture:im=ImageOps.fit(Image.open(texture).convert('RGBA'),size)
 else:im=Image.new('RGBA',size,(210,207,201,255))
 for i,x,y,cw in layout[:2]:paste_card(im,i,x,y,cw)
 p=portrait.resize((round(portrait.width*ph/portrait.height),ph),Image.Resampling.LANCZOS)
 a=np.asarray(p.getchannel('A')).astype(float);fade=np.clip((ph*.995-np.arange(ph))/(ph*.19),0,1);p.putalpha(Image.fromarray((a*fade[:,None]).astype('uint8')))
 im.alpha_composite(p,((w-p.width)//2,py));i,x,y,cw=layout[2];paste_card(im,i,x,y,cw)
 if texture:
  shade=Image.new('RGBA',size);a=np.zeros((h,w),np.uint8)
  for y in range(h):a[y,:]=round(235*max(0,(y/h-.58)/.42))
  shade.putalpha(Image.fromarray(a));im=Image.alpha_composite(im,shade);im.convert('RGB').save(out/name)
 else:im.convert('RGB').save(assets/name,'WEBP',quality=95,method=6)
 im.thumbnail((1200,900));im.save(root/'.tools'/f'{name}.png')
