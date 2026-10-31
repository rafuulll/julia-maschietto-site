"""Export silent notebook loops from the original recordings, not GIFs."""
from pathlib import Path
import sys, subprocess, json
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools'))
import imageio_ffmpeg
SOURCE=Path('C:/Users/WIN11/Desktop/Julia - Landing Page/arquivos de midia/videos mockup')
records=[]
for filename,name in [('IMG_3385.MOV','leticia'),('IMG_3387.MOV','nathalia'),('IMG_3388.MOV','novo')]:
    target=ROOT/f'dist/assets/{name}-book-video-final.mp4'
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-i',str(SOURCE/filename),'-an','-vf','fps=20,scale=1280:720,setsar=1','-c:v','libx264','-preset','slow','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart','-y',str(target)],check=True)
    previous=(ROOT/f'dist/assets/{name}-book-video-v10.mp4').stat().st_size
    records.append({'asset':target.name,'previousBytes':previous,'bytes':target.stat().st_size,'dimensions':[1280,720],'fps':20,'audio':False})
    print(json.dumps(records[-1]),flush=True)
(ROOT/'docs/video-optimization-final.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
