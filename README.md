
  # 29eme essaie

  This is a code bundle for 29eme essaie. The original project is available at https://www.figma.com/design/te4A1inMP5oNdt4YN01MP1/29eme-essaie.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Export a downloadable GIF

  Run `npm run export:gif` to generate a GIF recording of the animation.

  Output file: `exports/animation.gif`

  Optional environment variables:
  - `GIF_SECONDS` (default: 6)
  - `GIF_FPS` (default: 20)
  - `GIF_WIDTH` (default: 960)
  - `GIF_PORT` (default: 4173)

  ## Export a WhatsApp-friendly MP4

  Run `npm run export:mp4` to generate a video file you can share easily.

  Output file: `exports/animation.mp4`

  Optional environment variables:
  - `MP4_SECONDS` (default: 6)
  - `MP4_WIDTH` (default: 960)
  - `MP4_CRF` (default: 23)
  - `MP4_PORT` (default: 4173)
  