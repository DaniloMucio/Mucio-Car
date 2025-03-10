// Interface para as imagens da galeria
export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  fromAppointment?: boolean;
  appointmentId?: string;
}

// Chave para armazenar as imagens no localStorage
const GALLERY_STORAGE_KEY = 'mucio_car_gallery';

// Função para gerar um ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Função para obter todas as imagens
export const getAllImages = (): GalleryImage[] => {
  if (typeof window === 'undefined') {
    return getDefaultImages();
  }
  
  const storedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
  if (!storedImages) {
    const defaultImages = getDefaultImages();
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(defaultImages));
    return defaultImages;
  }
  
  try {
    return JSON.parse(storedImages);
  } catch (error) {
    console.error('Erro ao carregar imagens:', error);
    return getDefaultImages();
  }
};

// Função para obter as imagens mais recentes (limitado a 6)
export const getRecentImages = (count: number = 6): GalleryImage[] => {
  const images = getAllImages();
  
  // Ordenar por data (mais recentes primeiro)
  images.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Retornar apenas as 'count' imagens mais recentes
  return images.slice(0, count);
};

// Função para adicionar uma nova imagem
export const addImage = (imageData: Omit<GalleryImage, 'id' | 'date'>): GalleryImage => {
  const images = getAllImages();
  
  const newImage: GalleryImage = {
    ...imageData,
    id: generateId(),
    date: new Date().toISOString()
  };
  
  const updatedImages = [...images, newImage];
  
  // Salvar no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
  }
  
  return newImage;
};

// Função para remover uma imagem
export const removeImage = (id: string): boolean => {
  const images = getAllImages();
  const imageIndex = images.findIndex(image => image.id === id);
  
  if (imageIndex === -1) {
    return false;
  }
  
  images.splice(imageIndex, 1);
  
  // Salvar no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images));
  }
  
  return true;
};

// Função para obter imagens por serviço
export const getImagesByService = (serviceId: string): GalleryImage[] => {
  const images = getAllImages();
  return images.filter(image => image.appointmentId === serviceId);
};

// Função para converter um arquivo em base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Função para obter imagens padrão
const getDefaultImages = (): GalleryImage[] => {
  return [
    {
      id: 'gallery-1',
      url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop',
      title: 'Polimento Ferrari',
      description: 'Polimento completo em Ferrari 458 Italia vermelha',
      date: new Date(2023, 11, 15).toISOString(),
      tags: ['Polimento', 'Ferrari', 'Carro Esportivo']
    },
    {
      id: 'gallery-2',
      url: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1374&auto=format&fit=crop',
      title: 'Detalhamento Porsche',
      description: 'Detalhamento completo em Porsche 911 Carrera S',
      date: new Date(2023, 10, 20).toISOString(),
      tags: ['Detalhamento', 'Porsche', 'Carro Esportivo']
    },
    {
      id: 'gallery-3',
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop',
      title: 'Proteção Cerâmica Mercedes',
      description: 'Aplicação de proteção cerâmica em Mercedes-Benz Classe S',
      date: new Date(2023, 9, 5).toISOString(),
      tags: ['Proteção Cerâmica', 'Mercedes', 'Carro de Luxo']
    },
    {
      id: 'gallery-4',
      url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1469&auto=format&fit=crop',
      title: 'Higienização de Interior BMW',
      description: 'Higienização completa do interior de BMW Série 5',
      date: new Date(2023, 8, 12).toISOString(),
      tags: ['Higienização', 'BMW', 'Interior']
    },
    {
      id: 'gallery-5',
      url: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=1471&auto=format&fit=crop',
      title: 'Lavagem Técnica Mustang',
      description: 'Lavagem técnica em Ford Mustang GT',
      date: new Date(2023, 7, 25).toISOString(),
      tags: ['Lavagem', 'Mustang', 'Carro Esportivo']
    },
    {
      id: 'gallery-6',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop',
      title: 'Restauração de Faróis Audi',
      description: 'Restauração completa dos faróis de Audi A6',
      date: new Date(2023, 6, 30).toISOString(),
      tags: ['Restauração', 'Faróis', 'Audi']
    }
  ];
}; 