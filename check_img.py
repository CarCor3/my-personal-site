from PIL import Image
import os

path = r'd:\my-website\public\backgrounds\TALES.png'
if os.path.exists(path):
    with Image.open(path) as img:
        print(f"Dimensions: {img.size}")
else:
    print("File not found")
