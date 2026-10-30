"""Deterministic 10 s seamless motion derived from original GPT Images silk.
No external footage. Spatially varying fabric displacement, periodic in time.
Run: py docs/render_footer.py
"""
from pathlib import Path
import json, math, subprocess
import numpy as np
from PIL import Image, ImageOps
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/assets'
W,H,FPS,FRAMES = 1280,720,24,240
base = np.asarray(ImageOps.fit(Image.open(ROOT/'docs/footer-silk-generated.png').convert('RGB'),(W+128,H+128)),dtype=np.uint8)
yy,xx = np.mgrid[0:H,0:W].astype(np.float32)

def frame(index):
    phase = np.float32(2*math.pi*index/FRAMES)
    # Broad, gentle traveling elastic waves; integer temporal frequencies ensure
    # endpoint identity in both position and velocity rather than a crossfade.
    sx = xx+64 + 12*np.sin(phase+yy/210+xx/700) + 4*np.sin(2*phase-xx/330+yy/450)
    sy = yy+64 + 8*np.sin(phase+xx/280-yy/500) + 3*np.cos(2*phase+yy/170)
    x0,y0=np.floor(sx).astype(np.int32),np.floor(sy).astype(np.int32)
    fx,fy=(sx-x0)[...,None],(sy-y0)[...,None]
    result=(base[y0,x0]*(1-fx)*(1-fy)+base[y0,x0+1]*fx*(1-fy)+base[y0+1,x0]*(1-fx)*fy+base[y0+1,x0+1]*fx*fy)
    # Soft periodic illumination is part of the fabric motion, not a fade.
    light=1+0.018*np.sin(phase+xx/600+yy/850)
    return np.clip(result*light[...,None],0,255).astype(np.uint8)

exe=imageio_ffmpeg.get_ffmpeg_exe()
command=[exe,'-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'footer-silk.mp4')]
p=subprocess.Popen(command,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
for n in range(FRAMES):
    result=frame(n)
    if n==0: Image.fromarray(result).save(OUT/'footer-silk-poster.webp',quality=88,method=6)
    if n in (0,60,120,180): Image.fromarray(result).resize((640,360)).save(ROOT/f'docs/footer-frame-{n:03}.jpg',quality=92)
    p.stdin.write(result.tobytes())
p.stdin.close()
error=p.stderr.read().decode(errors='replace')
code=p.wait()
if code: raise RuntimeError(error)
Image.fromarray(frame(239)).save(ROOT/'docs/footer-frame-last.jpg',quality=92)
loop_error=np.abs(frame(0).astype(float)-frame(FRAMES).astype(float))
adjacent_error=np.abs(frame(0).astype(float)-frame(FRAMES-1).astype(float))
metrics={'width':W,'height':H,'fps':FPS,'duration_seconds':FRAMES/FPS,'frames':FRAMES,'seam_mathematical_mean_absolute_error':float(loop_error.mean()),'seam_mathematical_max_error':float(loop_error.max()),'last_to_first_mean_absolute_change':float(adjacent_error.mean()),'bytes':(OUT/'footer-silk.mp4').stat().st_size,'encoding':'H.264/yuv420p, silent, faststart','method':'periodic spatial displacement plus soft periodic illumination; no slideshow or crossfade'}
(ROOT/'docs/footer-video-validation.json').write_text(json.dumps(metrics,indent=2),encoding='utf-8')
print(json.dumps(metrics))
