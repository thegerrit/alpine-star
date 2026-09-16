from pathlib import Path
from PIL import Image
import json, subprocess
root=Path('/mnt/c/myrepos/website-factory/summit-star')
parts=['# Step 3 — Alpine Star imagery','Generated using the Higgsfield CLI through WSL with Nano Banana Pro (`nano_banana_2`), 2K resolution. Images reviewed visually. Local WebP assets retain natural lighting with no darkening overlays.']
for name,job in [('hero','17f58655-788c-4010-99c4-3a8ca3e65d06'),('expedition','1a43f2e3-93db-4c52-900d-cef23a0c8a27')]:
    data=json.loads(subprocess.check_output(['higgsfield','generate','get',job,'--json']))
    p=root/'public'/'images'/f'{name}.png'
    im=Image.open(p).convert('RGB')
    im.save(p.with_suffix('.webp'),'WEBP',quality=88,method=6)
    parts.extend([f'## {name.title()}',f'Asset: `public/images/{name}.webp`',f'Dimensions: {im.width} × {im.height}. Aspect: {data["params"]["aspect_ratio"]}.',f'Job: `{job}`',f'Source: {data["result_url"]}','Prompt:',data['params']['prompt']])
    print(name,im.size,p.with_suffix('.webp').stat().st_size)
(root/'step-3-images.md').write_text('\n\n'.join(parts)+'\n')
