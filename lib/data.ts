// Dados mockados para a plataforma InBoat
// Em produção, esses dados viriam do banco de dados

export interface Boat {
  id: string
  name: string
  model: string
  manufacturer: string
  year: number
  length_meters: number
  capacity: number
  location: string
  description: string
  specifications: {
    engine?: string
    fuel?: string
    cruising_speed?: string
    max_speed?: string
    fuel_capacity?: string
    water_capacity?: string
    motors?: string
  }
  available_shares: number
  total_shares: number
  price_per_share: number
  total_price: number
  monthly_maintenance_fee: number
  images: string[]
  status: "active" | "inactive"
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  message: string
  boat_interest?: string
  created_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export const boats: Boat[] = [
  {
    id: "1",
    name: "Triton 380 HT",
    model: "380 HT",
    manufacturer: "Triton",
    year: 2023,
    length_meters: 11.6,
    capacity: 12,
    location: "Marina da Glória, Rio de Janeiro",
    description: "A Triton 380 HT é uma lancha de alto padrão, perfeita para passeios em família e pesca esportiva. Com design moderno e acabamento premium, oferece conforto e desempenho excepcionais. Equipada com dois motores Mercury Verado 300HP, proporciona navegação suave e potente.",
    specifications: {
      engine: "2x Mercury Verado 300HP",
      fuel: "Gasolina",
      cruising_speed: "28 nós",
      max_speed: "45 nós",
      fuel_capacity: "600 litros",
      water_capacity: "100 litros",
      motors: "2 motores"
    },
    available_shares: 2,
    total_shares: 4,
    price_per_share: 275000,
    total_price: 1100000,
    monthly_maintenance_fee: 2500,
    images: [
      "/boats/triton-380-1.jpg",
      "/boats/triton-380-2.jpg",
      "/boats/triton-380-3.jpg",
      "/boats/triton-380-4.jpg"
    ],
    status: "active"
  },
  {
    id: "2",
    name: "Fishing 39 Raptor",
    model: "39 Raptor",
    manufacturer: "Fishing",
    year: 2022,
    length_meters: 12,
    capacity: 10,
    location: "Marina Itanhangá, Guarujá",
    description: "Lancha de pesca esportiva equipada com três motores Yamaha 300HP. Ideal para pescadores exigentes que buscam performance e autonomia. Possui torre de pesca, cadeiras de combate e viveiro para iscas.",
    specifications: {
      engine: "3x Yamaha 300HP",
      fuel: "Gasolina",
      cruising_speed: "32 nós",
      max_speed: "52 nós",
      fuel_capacity: "800 litros",
      water_capacity: "80 litros",
      motors: "3 motores"
    },
    available_shares: 3,
    total_shares: 4,
    price_per_share: 320000,
    total_price: 1280000,
    monthly_maintenance_fee: 3200,
    images: [
      "/boats/fishing-39-1.jpg",
      "/boats/fishing-39-2.jpg",
      "/boats/fishing-39-3.jpg",
      "/boats/fishing-39-4.jpg"
    ],
    status: "active"
  },
  {
    id: "3",
    name: "NX 340 Americana",
    model: "340 Americana",
    manufacturer: "NX Boats",
    year: 2024,
    length_meters: 10.4,
    capacity: 14,
    location: "Yacht Club Ilhabela",
    description: "A NX 340 Americana combina elegância e versatilidade. Perfeita para day cruises e entretenimento, possui amplo solário, área gourmet com churrasqueira e som premium. Equipada com dois motores Mercury 250HP.",
    specifications: {
      engine: "2x Mercury 250HP",
      fuel: "Gasolina",
      cruising_speed: "25 nós",
      max_speed: "40 nós",
      fuel_capacity: "500 litros",
      water_capacity: "120 litros",
      motors: "2 motores"
    },
    available_shares: 1,
    total_shares: 4,
    price_per_share: 245000,
    total_price: 980000,
    monthly_maintenance_fee: 2200,
    images: [
      "/boats/nx-340-1.jpg",
      "/boats/nx-340-2.jpg",
      "/boats/nx-340-3.jpg",
      "/boats/nx-340-4.jpg"
    ],
    status: "active"
  },
  {
    id: "4",
    name: "Mares 38 Fishing",
    model: "38 Fishing",
    manufacturer: "Mares",
    year: 2023,
    length_meters: 11.5,
    capacity: 8,
    location: "Marina Astúrias, Guarujá",
    description: "Embarcação de pesca esportiva de alta performance. Com três motores Suzuki 350HP, oferece velocidade e estabilidade para expedições de pesca. Equipada com equipamentos de última geração para pescadores profissionais.",
    specifications: {
      engine: "3x Suzuki 350HP",
      fuel: "Gasolina",
      cruising_speed: "35 nós",
      max_speed: "58 nós",
      fuel_capacity: "900 litros",
      water_capacity: "60 litros",
      motors: "3 motores"
    },
    available_shares: 4,
    total_shares: 4,
    price_per_share: 380000,
    total_price: 1520000,
    monthly_maintenance_fee: 3800,
    images: [
      "/boats/mares-38-1.jpg",
      "/boats/mares-38-2.jpg",
      "/boats/mares-38-3.jpg",
      "/boats/mares-38-4.jpg"
    ],
    status: "active"
  }
]

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "O que é a InBoat e qual seu papel?",
    answer: "A InBoat atua como administradora do sistema de cotas náuticas. Nossa função é cuidar de toda a gestão da embarcação: reservas via aplicativo próprio, manutenção preventiva e corretiva, limpeza, documentação, seguro, equipe de apoio e acompanhamento financeiro. O objetivo é que o cotista apenas aproveite o tempo a bordo, sem preocupações operacionais.",
    order: 1
  },
  {
    id: "2",
    question: "Como funciona a compra compartilhada?",
    answer: "O modelo de multipropriedade divide a embarcação em quatro cotas. Cada cotista é dono de 25% do bem, com direito real sobre a sua fração. Esse formato reduz em até 85% o custo de aquisição e em até 90% as despesas de manutenção, já que os gastos são divididos entre todos.",
    order: 2
  },
  {
    id: "3",
    question: "Por que adquirir uma embarcação neste formato?",
    answer: "Barcos, assim como aviões, carros de luxo e casas de veraneio, costumam ter uso eventual e custos de manutenção elevados. Ao optar pela propriedade compartilhada, o cotista usufrui do bem de forma inteligente, com economia, praticidade e total suporte, sem precisar arcar sozinho com despesas que muitas vezes inviabilizam a posse individual.",
    order: 3
  },
  {
    id: "4",
    question: "Quem é, de fato, o dono da embarcação?",
    answer: "A propriedade é dividida entre os cotistas. Cada um possui 25% da embarcação e pode vender, transferir ou ceder sua cota quando desejar.",
    order: 4
  },
  {
    id: "5",
    question: "Como funciona a reserva de uso?",
    answer: "O agendamento é feito em um sistema online disponível 24 horas. Basta selecionar a data desejada e o sistema notifica os demais cotistas. Conflito de datas: caso dois cotistas reservem o mesmo dia, a prioridade é do que estiver há mais tempo sem utilizar o barco. Consecutivos (sexta a domingo): é possível reservar blocos de dias, desde que o pedido seja feito com 7 dias de antecedência. Uso imediato: se não houver reserva já confirmada, é possível solicitar para o mesmo dia; o barco é entregue em até 1 hora, pronto para saída.",
    order: 5
  },
  {
    id: "6",
    question: "Existe limite de utilização?",
    answer: "Não. O uso é ilimitado, desde que respeitado o sistema de agendamento e disponibilidade.",
    order: 6
  },
  {
    id: "7",
    question: "Quais são os custos fixos do cotista?",
    answer: "As despesas incluem: Estadia na marina, Limpeza e higienização, Documentação, Seguro total da embarcação, Rastreador, Marinheiro de apoio e Taxa de administração InBoat. Tudo é dividido de forma justa entre os cotistas, em mensalidades transparentes.",
    order: 7
  },
  {
    id: "8",
    question: "Como funciona a manutenção e quem paga?",
    answer: "As manutenções seguem o manual do fabricante e são acompanhadas por equipe credenciada. Os custos são rateados entre os cotistas, de acordo com a proporção de uso. Se algum problema for causado por mau uso, o responsável arca com os custos. Quando não é possível identificar o causador, o valor é dividido entre todos.",
    order: 8
  },
  {
    id: "9",
    question: "E se um cotista não pagar sua parte?",
    answer: "A InBoat antecipa os valores e assume a cobrança do inadimplente. Isso significa que os demais cotistas não são impactados por eventuais atrasos.",
    order: 9
  },
  {
    id: "10",
    question: "Posso vender minha cota a qualquer momento?",
    answer: "Sim. Como proprietário da fração, o cotista tem liberdade para comercializar sua parte quando desejar.",
    order: 10
  },
  {
    id: "11",
    question: "Preciso de habilitação para usar o barco?",
    answer: "Sim, a habilitação náutica é necessária. Porém, caso o cotista não possua, pode contratar marinheiros credenciados da InBoat para conduzir a embarcação e oferecer serviço de bordo.",
    order: 11
  }
]

export const siteContent = {
  hero: {
    headline: "Propriedade compartilhada de embarcações de alto padrão",
    subheadline: "Tenha acesso a lanchas premium com gestão profissional completa. Investimento inteligente com até 85% de economia na aquisição.",
    cta: "Conheça as embarcações disponíveis"
  },
  howItWorks: {
    title: "O que é multipropriedade náutica",
    description: "Um modelo inteligente de propriedade compartilhada que permite acesso a embarcações de alto padrão com custos reduzidos e zero preocupação operacional.",
    benefits: [
      {
        title: "Economia",
        description: "Reduza em até 85% o custo de aquisição e até 90% as despesas de manutenção ao dividir com outros cotistas."
      },
      {
        title: "Uso Inteligente",
        description: "Aproveite sua embarcação quando quiser através do sistema de reservas online, disponível 24 horas."
      },
      {
        title: "Gestão Profissional",
        description: "Manutenção preventiva, limpeza, documentação, seguro e equipe de apoio - tudo gerenciado pela InBoat."
      },
      {
        title: "Zero Dor de Cabeça",
        description: "Você só precisa aproveitar. Toda a parte operacional e burocrática fica por nossa conta."
      }
    ]
  },
  contact: {
    whatsapp: "5511999999999",
    email: "contato@inboat.com.br",
    address: "São Paulo, SP - Brasil"
  }
}

// Função para obter embarcação por ID
export function getBoatById(id: string): Boat | undefined {
  return boats.find(boat => boat.id === id)
}

// Função para obter embarcações ativas
export function getActiveBoats(): Boat[] {
  return boats.filter(boat => boat.status === "active")
}
