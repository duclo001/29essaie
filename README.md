
  # ProjetFigma8

    Ceci est un bundle de code pour « ProjetFigma8 ». 
    ## Lancer le projet

    Exécute `npm i` pour installer les dépendances.

    Exécute `npm run dev` pour démarrer le serveur de développement.

    ## Exporter un GIF téléchargeable

    Exécute `npm run export:gif` pour générer un enregistrement GIF de l’animation.

    Fichier de sortie : `exports/animation.gif`

    Variables d’environnement optionnelles :
    - `GIF_SECONDS` (défaut : 6)
    - `GIF_FPS` (défaut : 20)
    - `GIF_WIDTH` (défaut : 960)
    - `GIF_PORT` (défaut : 4173)

    ## Exporter un MP4 compatible WhatsApp

    Exécute `npm run export:mp4` pour générer un fichier vidéo facile à partager.

    Fichier de sortie : `exports/animation.mp4`

    Variables d’environnement optionnelles :
    - `MP4_SECONDS` (défaut : 6)
    - `MP4_WIDTH` (défaut : 960)
    - `MP4_CRF` (défaut : 23)
    - `MP4_PORT` (défaut : 4173)
  