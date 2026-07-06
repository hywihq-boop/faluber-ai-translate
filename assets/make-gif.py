from PIL import Image
import glob, os

assets = os.path.dirname(os.path.abspath(__file__))

def make_gif(pattern, out_name, duration=100, size=None):
    frames = sorted(glob.glob(pattern))
    if not frames:
        print(f"ERROR: no frames matching {pattern}")
        return
    imgs = []
    for f in frames:
        img = Image.open(f).convert('RGB')
        if size:
            img = img.resize(size, Image.LANCZOS)
        imgs.append(img)
    out = os.path.join(assets, out_name)
    imgs[0].save(out, save_all=True, append_images=imgs[1:], duration=duration, loop=0, optimize=True)
    print(f"{out_name}: {len(imgs)} frames, {os.path.getsize(out)} bytes")

# GIF 1: Translation — full page, resize to 780px wide
make_gif(os.path.join(assets, 'translate_frames', 'f_*.png'), 'translate-demo.gif', 100, (780, 450))

# GIF 2: Ctrl+Explain — full page, resize to 780px wide
make_gif(os.path.join(assets, 'explain_frames', 'f_*.png'), 'explain-demo.gif', 100, (780, 375))

# GIF 3: Translation Panel — full page, resize to 780px wide
make_gif(os.path.join(assets, 'panel_frames', 'f_*.png'), 'panel-demo.gif', 100, (780, 325))
