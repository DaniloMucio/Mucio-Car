export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string;
  details: {
    description: string;
    benefits: string[];
    process: string[];
    recommendations: string[];
  };
}

export const services: Service[] = [
  {
    id: 'lavagem-detalhada',
    title: 'Lavagem Detalhada',
    description: 'Limpeza completa interna e externa com produtos premium.',
    icon: '/images/icons/lavagem.svg',
    price: 'A partir de R$ 120',
    image: '/images/services/lavagem.jpg',
    details: {
      description: 'Nossa lavagem detalhada vai muito além de uma simples lavagem. Utilizamos produtos de alta qualidade e técnicas específicas para garantir que cada parte do seu veículo receba o cuidado adequado.',
      benefits: [
        'Remoção completa de sujeira sem danificar a pintura',
        'Limpeza de rodas e pneus com produtos específicos',
        'Limpeza detalhada de todos os cantos internos',
        'Hidratação de plásticos e borrachas',
        'Acabamento com cera de carnaúba para proteção'
      ],
      process: [
        'Pré-lavagem com espuma ativa para amolecer a sujeira',
        'Lavagem manual com luva de microfibra',
        'Limpeza de rodas e caixa de roda',
        'Aspiração completa do interior',
        'Limpeza de painéis, console e porta-objetos',
        'Limpeza de vidros internos e externos',
        'Aplicação de cera de proteção',
        'Hidratação de plásticos e borrachas'
      ],
      recommendations: [
        'Recomendamos a lavagem detalhada a cada 15 dias',
        'Para veículos expostos a ambientes com muita poeira ou poluição, a frequência pode ser semanal',
        'Combine com a higienização interna para resultados ainda melhores'
      ]
    }
  },
  {
    id: 'polimento-profissional',
    title: 'Polimento Profissional',
    description: 'Remoção de riscos e marcas, devolvendo o brilho original à pintura.',
    icon: '/images/icons/polimento.svg',
    price: 'A partir de R$ 350',
    image: '/images/services/polimento.jpg',
    details: {
      description: 'O polimento profissional remove riscos, marcas de redemoinho e oxidação da pintura, restaurando o brilho original do veículo e preparando a superfície para proteção.',
      benefits: [
        'Remoção de riscos superficiais e marcas de redemoinho',
        'Restauração do brilho original da pintura',
        'Remoção de oxidação e manchas',
        'Preparação da superfície para aplicação de proteção',
        'Aumento da profundidade de cor e reflexo'
      ],
      process: [
        'Lavagem técnica para remoção de contaminantes',
        'Descontaminação química e física da pintura',
        'Análise da espessura da pintura com medidor específico',
        'Polimento em múltiplas etapas com politrizes profissionais',
        'Refinamento da superfície para máximo brilho',
        'Limpeza dos resíduos de polimento',
        'Aplicação de proteção final'
      ],
      recommendations: [
        'Recomendado a cada 6-12 meses dependendo da exposição do veículo',
        'Ideal para veículos com pintura opaca ou com muitos riscos superficiais',
        'Após o polimento, recomendamos a aplicação de um selante ou ceramic coating'
      ]
    }
  },
  {
    id: 'cristalizacao-vidros',
    title: 'Cristalização de Vidros',
    description: 'Tratamento que melhora a visibilidade e repele água e sujeira dos vidros.',
    icon: '/images/icons/cristalizacao.svg',
    price: 'A partir de R$ 180',
    image: '/images/services/cristalizacao.jpg',
    details: {
      description: 'A cristalização de vidros é um tratamento que cria uma camada hidrofóbica na superfície dos vidros, repelindo água, sujeira e facilitando a limpeza, além de melhorar a visibilidade em dias de chuva.',
      benefits: [
        'Repelência à água (efeito hidrofóbico)',
        'Melhor visibilidade em dias de chuva',
        'Facilidade na remoção de insetos e sujeira',
        'Redução do acúmulo de poeira',
        'Proteção contra manchas de água dura'
      ],
      process: [
        'Limpeza profunda dos vidros para remoção de contaminantes',
        'Descontaminação com argila específica para vidros',
        'Polimento dos vidros para remoção de manchas e imperfeições',
        'Aplicação do produto cristalizador em múltiplas camadas',
        'Cura e polimento final para ativação do efeito hidrofóbico'
      ],
      recommendations: [
        'Recomendamos reaplicação a cada 6 meses para manter o efeito',
        'Evite o uso de limpadores de vidro com amônia após o tratamento',
        'Para maior durabilidade, evite o uso excessivo do limpador de para-brisas'
      ]
    }
  },
  {
    id: 'higienizacao-interna',
    title: 'Higienização Interna',
    description: 'Limpeza profunda de estofados, carpetes e superfícies internas.',
    icon: '/images/icons/higienizacao.svg',
    price: 'A partir de R$ 250',
    image: '/images/services/higienizacao.jpg',
    details: {
      description: 'Nossa higienização interna vai além da limpeza convencional, removendo ácaros, bactérias e odores, deixando o interior do seu veículo completamente limpo e saudável.',
      benefits: [
        'Eliminação de ácaros e bactérias',
        'Remoção de manchas em estofados e carpetes',
        'Eliminação de odores desagradáveis',
        'Limpeza profunda de todas as superfícies internas',
        'Ambiente mais saudável e agradável'
      ],
      process: [
        'Aspiração profunda de todos os estofados e carpetes',
        'Aplicação de produtos específicos para cada tipo de superfície',
        'Extração de sujeira com equipamentos profissionais',
        'Limpeza detalhada de painéis, console e porta-objetos',
        'Higienização do sistema de ar-condicionado',
        'Aplicação de protetor solar em superfícies plásticas',
        'Hidratação de couro (quando aplicável)'
      ],
      recommendations: [
        'Recomendamos a higienização completa a cada 3-4 meses',
        'Para veículos com crianças ou animais de estimação, a frequência pode ser maior',
        'Combine com a lavagem detalhada para resultados completos'
      ]
    }
  },
  {
    id: 'restauracao-farois',
    title: 'Restauração de Faróis',
    description: 'Recuperação da transparência e brilho dos faróis amarelados.',
    icon: '/images/icons/farois.svg',
    price: 'A partir de R$ 150',
    image: '/images/services/farois.jpg',
    details: {
      description: 'A restauração de faróis remove a camada amarelada e opaca causada pela oxidação, devolvendo a transparência original e melhorando significativamente a iluminação noturna.',
      benefits: [
        'Melhora na iluminação noturna',
        'Recuperação da transparência original',
        'Remoção da camada amarelada e opaca',
        'Aumento da segurança ao dirigir à noite',
        'Melhora na estética do veículo'
      ],
      process: [
        'Limpeza inicial dos faróis',
        'Lixamento progressivo com diferentes granulações',
        'Polimento com compostos específicos',
        'Aplicação de proteção UV para evitar nova oxidação',
        'Selamento da superfície'
      ],
      recommendations: [
        'Recomendamos a reaplicação da proteção UV a cada 6 meses',
        'Evite lavar os faróis com produtos abrasivos',
        'Para maior durabilidade, estacione o veículo na sombra sempre que possível'
      ]
    }
  },
  {
    id: 'protecao-ceramica',
    title: 'Proteção Cerâmica',
    description: 'Proteção avançada que forma uma camada protetora sobre a pintura.',
    icon: '/images/icons/protecao.svg',
    price: 'A partir de R$ 800',
    image: '/images/services/protecao.jpg',
    details: {
      description: 'A proteção cerâmica cria uma camada protetora sobre a pintura do veículo, oferecendo proteção contra raios UV, chuva ácida, poluição e pequenos riscos, além de facilitar a limpeza e manter o brilho por muito mais tempo.',
      benefits: [
        'Proteção duradoura contra raios UV e intempéries',
        'Resistência a riscos superficiais',
        'Efeito hidrofóbico que facilita a limpeza',
        'Brilho intenso e profundo',
        'Proteção contra poluição e chuva ácida'
      ],
      process: [
        'Lavagem técnica para remoção de contaminantes',
        'Descontaminação química e física da pintura',
        'Polimento completo para remoção de imperfeições',
        'Limpeza com álcool isopropílico para remoção de óleos e resíduos',
        'Aplicação da proteção cerâmica em ambiente controlado',
        'Tempo de cura conforme especificação do produto'
      ],
      recommendations: [
        'Evite lavar o veículo nas primeiras 72 horas após a aplicação',
        'Utilize apenas shampoos pH neutros para a lavagem',
        'Recomendamos a manutenção a cada 3-4 meses para maximizar a durabilidade'
      ]
    }
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
}; 