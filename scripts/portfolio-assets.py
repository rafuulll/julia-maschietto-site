"""Export supplied portfolio photography without retouching or synthesis."""
from pathlib import Path
import sys, os, runpy, json, subprocess
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools'))
os.add_dll_directory(str(ROOT/'.tools'))
import pillow_heif
pillow_heif.register_heif_opener()
from PIL import Image,ImageOps
media=Path('C:/Users/WIN11/Desktop/Julia - Landing Page/arquivos de midia')
downloads=Path('C:/Users/WIN11/Downloads')
selection=[
 (downloads/'IMG_3392.JPG.jpeg','portfolio-bahari-team.webp',1600),
 (downloads/'IMG_3375.PNG','portfolio-bahari-feed.webp',1000),
 (downloads/'IMG_3393.PNG','portfolio-bahari-production.webp',1300),
 (downloads/'IMG_3394.HEIC','portfolio-julia-team.webp',1600),
 (media/'IMG_3370.PNG','portfolio-julia-reel.webp',1000),
 (media/'IMG_3365.PNG','portfolio-julia-followers.webp',1000),
 (media/'IMG_3360.PNG','portfolio-bahari-story.webp',1000),
 (ROOT/'assets-source/portfolio-bruna-results.png','portfolio-bruna-results.webp',1600),
]
records=[]
for src,name,width in selection:
 im=ImageOps.exif_transpose(Image.open(src)).convert('RGB')
 im.thumbnail((width,width*3))
 im.save(ROOT/'dist/assets'/name,'WEBP',quality=88,method=6)
 records.append({'source':src.name,'asset':name,'size':im.size})
import imageio_ffmpeg
ff=imageio_ffmpeg.get_ffmpeg_exe()
for src,kind in [('IMG_3380.MOV','esporte'),('IMG_1512.MOV','mulher')]:
 output=ROOT/f'dist/assets/portfolio-julia-{kind}.mp4'
 subprocess.run([ff,'-hide_banner','-loglevel','error','-i',str(media/src),'-vf','scale=540:-2','-r','24','-c:v','libx264','-preset','fast','-crf','27','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart','-y',str(output)],check=True)
 poster=ROOT/'.tools'/f'portfolio-julia-{kind}-poster.jpg'
 subprocess.run([ff,'-hide_banner','-loglevel','error','-ss','4','-i',str(media/src),'-frames:v','1','-vf','scale=210:-2','-y',str(poster)],check=True)
 Image.open(poster).save(ROOT/f'dist/assets/portfolio-julia-{kind}-poster.webp','WEBP',quality=88)
 records.append({'source':src,'asset':output.name,'behavior':'native controls, no autoplay, audio retained'})
scope=runpy.run_path(str(ROOT/'scripts/compose-hero.py'))
for label,size,height,top,layout in [
 ('tablet',(1400,1100),990,100,[(0,335,285,168),(1,810,145,166),(2,960,440,142)]),
 ('mobile',(900,1050),900,105,[(0,108,310,148),(1,550,165,142),(2,660,515,128)])]:
 scope['composition'](f'hero-{label}-clean.webp',size,height,top,layout,fade_portrait=False)
(ROOT/'docs/portfolio-assets.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(records))
