from pathlib import Path
import json, subprocess, urllib.request
root=Path(__file__).resolve().parents[1]
main=json.loads((root/'docs/image-prompts.json').read_text(encoding='utf-8'))
support=json.loads((root/'docs/supporting-asset-prompts.json').read_text(encoding='utf-8'))
node='C:/Users/WIN11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
embed='C:/Users/WIN11/.agents/skills/impeccable/scripts/embed-prompt.mjs'
for name,prompt in [('hero-julia.webp',main.get('hero')),('bahari-cover.webp',main.get('bahari')),('about-julia.webp',support['about']),('footer-silk.webp',support['silk']),('footer-silk-poster.webp',support['silk'])]:
    if not prompt: raise ValueError(f'Missing exact prompt: {name}')
    file=root/'docs'/f'{name}.prompt.txt'
    file.write_text(prompt,encoding='utf-8')
    subprocess.run([node,embed,str(root/'dist/assets'/name),'--prompt-file',str(file)],check=True,stdout=subprocess.DEVNULL)
    file.unlink()
for i,comp in enumerate(main['compositions']):
    file=root/'docs'/f'comp-{i}.prompt.txt'
    file.write_text(comp['prompt'],encoding='utf-8')
    subprocess.run([node,embed,str(root/'.impeccable/mocks'/f'comp-{chr(97+i)}.png'),'--prompt-file',str(file)],check=True,stdout=subprocess.DEVNULL)
    file.unlink()
    (root/'.impeccable/mocks'/f'comp-{chr(97+i)}.png.json').write_text(json.dumps(comp,ensure_ascii=False,indent=2),encoding='utf-8')
licenses=root/'dist/assets/licenses'
licenses.mkdir(exist_ok=True)
urls={
 'Manrope-OFL.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt',
 'Instrument-Serif-OFL.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt',
 'Phosphor-MIT.txt':'https://raw.githubusercontent.com/phosphor-icons/core/main/LICENSE',
 'Lenis-MIT.txt':'https://raw.githubusercontent.com/darkroomengineering/lenis/v1.3.17/LICENSE'
}
for name,url in urls.items():
    try: urllib.request.urlretrieve(url,licenses/name)
    except Exception as exc: print(f'License download issue: {name}: {exc}')
print('Prompt provenance and licenses recorded.')
