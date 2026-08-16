import type { Product } from './types';

interface ShopeeProductSeed {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  sales: string;
  commission: string;
  score: number;
  growth: string;
  affiliateLink: string;
  recommendation: string;
}

const catalog: ShopeeProductSeed[] = [
  {
    id: 'shopee-chaleira-inox',
    name: 'Chaleira Elétrica Inox com Desligamento Automático',
    category: 'Cozinha',
    image: '/chaleira-eletrica-inox.webp',
    price: 'Ver na Shopee', sales: 'Novo', commission: 'A consultar', score: 97, growth: 'Em destaque',
    affiliateLink: 'https://shopee.com.br/product/1404131634/58257750273',
    recommendation: 'Demonstre a rapidez para ferver água, o corpo em aço inox, a base elétrica e o desligamento automático. Mostre o uso no preparo de café e chá.'
  },
  {
    id: 'shopee-01',
    name: 'Jaqueta Jogger Masculina com Capuz e Detalhe Refletivo',
    category: 'Moda Masculina',
    image: 'https://i.imgur.com/ss2CpU8.png',
    price: 'R$ 30,97', sales: '80mil+', commission: 'R$ 7,43', score: 98, growth: '+42%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/20799757649?',
    recommendation: 'Produto de alto volume com forte apelo visual. Demonstre o detalhe refletivo e o caimento em vídeos curtos.'
  },
  {
    id: 'shopee-02',
    name: 'Tênis Feminino Esportivo Leve para Academia e Corrida',
    category: 'Calçados',
    image: 'https://i.imgur.com/HPKsYdv.png',
    price: 'R$ 35,50', sales: '10mil+', commission: 'R$ 8,52', score: 96, growth: '+37%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/22793684140?',
    recommendation: 'Explore conforto, leveza e teste de flexibilidade. Conteúdos de provador e rotina fitness tendem a converter melhor.'
  },
  {
    id: 'shopee-03',
    name: 'Bicicleta Ergométrica Spinning Profissional até 120 kg',
    category: 'Fitness',
    image: 'https://i.imgur.com/NPsEqiX.png',
    price: 'R$ 639,99', sales: '80mil+', commission: 'R$ 76,80', score: 95, growth: '+31%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/19199648882?',
    recommendation: 'Ticket alto e demonstração clara de uso. Mostre estabilidade, regulagens e economia comparada à academia.'
  },
  {
    id: 'shopee-04',
    name: 'Areia Catbio Biodegradável Max Clean 4 kg',
    category: 'Pet',
    image: 'https://i.imgur.com/olwlLW3.png',
    price: 'R$ 46,90', sales: '200mil+', commission: 'R$ 7,04', score: 97, growth: '+48%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/22996121313?',
    recommendation: 'A prova visual de absorção e controle de odor é o principal argumento. Use comparação lado a lado.'
  },
  {
    id: 'shopee-05',
    name: 'Caixa de Som Portátil Bluetooth com LED, Rádio FM e USB',
    category: 'Eletrônicos',
    image: 'https://i.imgur.com/FEDbLY1.png',
    price: 'R$ 26,56', sales: '10mil+', commission: 'R$ 6,37', score: 94, growth: '+35%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/23898040058?',
    recommendation: 'Grave testes rápidos de volume, luzes e conectividade. O preço baixo favorece compra por impulso.'
  },
  {
    id: 'shopee-06',
    name: 'Cadeira Presidente Executiva Ergonômica para Escritório',
    category: 'Casa e Escritório',
    image: 'https://i.imgur.com/cJEdFwR.png',
    price: 'R$ 137,99', sales: '10mil+', commission: 'R$ 22,08', score: 91, growth: '+24%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/20999300383?',
    recommendation: 'Mostre montagem, reclinação e apoio lombar. Conteúdo de transformação do escritório funciona bem.'
  },
  {
    id: 'shopee-07',
    name: 'Bermuda Esportiva Masculina para Corrida e Academia',
    category: 'Moda Fitness',
    image: 'https://i.imgur.com/cUmsafs.png',
    price: 'R$ 16,99', sales: '3mil+', commission: 'R$ 4,08', score: 89, growth: '+28%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/23993793187?',
    recommendation: 'Destaque mobilidade, tecido leve e secagem rápida em demonstrações de treino.'
  },
  {
    id: 'shopee-08',
    name: 'Fogão Elétrico Portátil Cooktop de Mesa 1 ou 2 Bocas',
    category: 'Cozinha',
    image: 'https://i.imgur.com/0FC9VpH.png',
    price: 'R$ 49,99', sales: '30mil+', commission: 'R$ 10,00', score: 96, growth: '+39%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/20699665137?',
    recommendation: 'Produto ideal para demonstrações rápidas. Mostre tempo de aquecimento, controle e facilidade de limpeza.'
  },
  {
    id: 'shopee-09',
    name: 'Air Fryer Digital Elgin Visio Fry 5L 1700W',
    category: 'Cozinha',
    image: 'https://i.imgur.com/YCmMhdC.png',
    price: 'R$ 229,99', sales: '10mil+', commission: 'R$ 27,60', score: 93, growth: '+26%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/45001759899?',
    recommendation: 'Receitas rápidas e comparação antes/depois são os formatos mais fortes para este produto.'
  },
  {
    id: 'shopee-10',
    name: 'Processador Compacto Britânia Turbo 5 em 1',
    category: 'Cozinha',
    image: 'https://i.imgur.com/gKpPHMc.png',
    price: 'R$ 119,90', sales: '50mil+', commission: 'R$ 19,18', score: 95, growth: '+33%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/21997092513?',
    recommendation: 'Demonstre as cinco funções em cortes rápidos, reforçando praticidade e economia de espaço.'
  },
  {
    id: 'shopee-11',
    name: 'Mesa de Cabeceira Retrô com Nicho para Quarto',
    category: 'Casa e Decoração',
    image: 'https://i.imgur.com/KYVySXa.png',
    price: 'R$ 34,90', sales: '400mil+', commission: 'R$ 6,98', score: 99, growth: '+53%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/21599248399?',
    recommendation: 'Use transformação de ambiente, montagem acelerada e organização do quarto como argumentos principais.'
  },
  {
    id: 'shopee-12',
    name: 'Ventilador de Mesa Prime Air Maxx Force 6 Pás 60W',
    category: 'Casa',
    image: 'https://i.imgur.com/ACl2ON6.png',
    price: 'R$ 109,90', sales: '20mil+', commission: 'R$ 17,58', score: 92, growth: '+30%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/22197514607?',
    recommendation: 'Compare potência e ruído em um teste simples. Reforce alcance do vento e consumo.'
  },
  {
    id: 'shopee-13',
    name: 'Chinelo Slide Nuvem Tradicional Confortável',
    category: 'Calçados',
    image: 'https://i.imgur.com/QqTYCZr.png',
    price: 'R$ 19,89', sales: '50mil+', commission: 'R$ 4,77', score: 94, growth: '+41%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/20597690715?',
    recommendation: 'Teste de maciez, dobra e uso no dia a dia. O preço favorece vídeos de achadinhos.'
  },
  {
    id: 'shopee-14',
    name: 'Copo Térmico Inox com Tampa e Canudo 1200 ml',
    category: 'Cozinha',
    image: 'https://i.imgur.com/W988LB8.png',
    price: 'R$ 38,90', sales: '60mil+', commission: 'R$ 7,78', score: 96, growth: '+45%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/26980788215?',
    recommendation: 'Mostre capacidade, vedação e conservação de gelo. O formato de teste por horas gera confiança.'
  },
  {
    id: 'shopee-15',
    name: 'Escova Secadora e Alisadora Elétrica 3 em 1',
    category: 'Beleza',
    image: 'https://i.imgur.com/9PKp6Kf.png',
    price: 'R$ 38,60', sales: '10mil+', commission: 'R$ 9,26', score: 95, growth: '+38%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/20597976076?',
    recommendation: 'Antes e depois dividido na tela é o melhor formato. Mostre tempo total e acabamento do cabelo.'
  },
  {
    id: 'shopee-16',
    name: 'Óleo Nutritivo Ox Nutre 3 em 1 120 ml',
    category: 'Beleza',
    image: 'https://i.imgur.com/TOUDUi0.png',
    price: 'R$ 28,99', sales: '30mil+', commission: 'R$ 5,80', score: 90, growth: '+29%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/22293523193?',
    recommendation: 'Close no brilho, textura e aplicação. Conteúdo de rotina capilar aumenta percepção de resultado.'
  },
  {
    id: 'shopee-17',
    name: 'Cadeira Gamer TGT Heron Reclinável até 120 kg',
    category: 'Gamer',
    image: 'https://i.imgur.com/4uJ2MUy.png',
    price: 'R$ 383,19', sales: '7mil+', commission: 'R$ 45,98', score: 88, growth: '+22%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/22393661739?',
    recommendation: 'Explore montagem, reclinação e transformação do setup. Excelente para conteúdo gamer aspiracional.'
  },
  {
    id: 'shopee-18',
    name: 'Espelho Redondo Adnet Decorativo com Alça e Suporte',
    category: 'Casa e Decoração',
    image: 'https://i.imgur.com/dg08f4n.png',
    price: 'R$ 24,90', sales: '3mil+', commission: 'R$ 5,98', score: 87, growth: '+19%',
    affiliateLink: 'https://affiliate.shopee.com.br/offer/product_offer/47305656878?',
    recommendation: 'Transformações de banheiro, quarto ou hall valorizam o produto e deixam clara a escala.'
  }
];

export const shopeeProducts: Product[] = catalog.map((product, index) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  image: product.image,
  commission: product.commission,
  variation: product.growth,
  viralVideos: Math.max(24, 148 - index * 5),
  aiScore: product.score,
  price: product.price,
  shop: 'Shopee Brasil',
  sales: product.sales,
  trend: product.score >= 92 ? 'High' : 'Medium',
  recommendation: product.recommendation,
  revenue: 'Dados públicos Shopee',
  priceRange: product.price,
  affiliatePotential: product.score,
  creatorConversion: `${Math.max(1.8, 4.2 - index * 0.11).toFixed(1)}%`,
  videoRevenuePercent: 72,
  cardRevenuePercent: 'Cupom disponível',
  concentration: product.score >= 94 ? 'Alta' : 'Média',
  ugcSourcePercent: 72,
  liveSourcePercent: 28,
  affiliateLink: product.affiliateLink,
}));
