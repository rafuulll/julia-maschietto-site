from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
output=root/'output'
output.mkdir(exist_ok=True)
target=output/'julia-maschietto-v1.zip'
files=list((root/'dist').rglob('*'))+[root/'README.md',root/'PRODUCT.md',root/'DESIGN.md']
files+=list(root.glob('DESIGN*.json'))
files+=[root/'.impeccable/design.json']
files+=[p for p in (root/'docs').glob('*.md')]
files+=[root/'docs/image-prompts.json',root/'docs/supporting-asset-prompts.json',root/'docs/qa/report.json',root/'docs/qa/finish-review.md']
files+=[root/'docs/qa/refinements/report.json']
files+=[root/'docs/qa/round-two/report.json',root/'docs/qa/round-two/finish-review.md']
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as archive:
    for p in files:
        if p.is_file(): archive.write(p,p.relative_to(root).as_posix())
with zipfile.ZipFile(target) as archive:
    assert archive.testzip() is None
    names=archive.namelist()
    assert 'dist/index.html' in names and 'dist/app.js' in names and 'DESIGN.md' in names
    assert not any('.openai' in name or '.git/' in name for name in names)
print(f'{target} ({target.stat().st_size:,} bytes; {len(names)} files; integrity verified)')
