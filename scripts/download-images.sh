#!/bin/bash

# Criando diretório se não existir
mkdir -p public/images/cars

# URLs das imagens de carros clássicos
declare -a IMAGES=(
    "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=1200" # Classic Mustang
    "https://images.unsplash.com/photo-1544454944-23b845a2a266?q=80&w=1200" # Classic Beetle
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200" # Classic Mercedes
    "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1200" # Classic Porsche
    "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200" # Classic Car Detail
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200" # Classic Car Interior
    "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=1200" # Classic Car Front
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200" # Classic Car Show
)

# Download das imagens
for i in "${!IMAGES[@]}"; do
    wget -O "public/images/cars/classic-car-$((i+1)).jpg" "${IMAGES[$i]}"
done

echo "Imagens baixadas com sucesso!" 