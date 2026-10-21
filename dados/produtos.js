/* =====================================================================
   AZARTE — DADOS DO SITE  (gerado em 2026-10-21 a partir do Catálogo Térmicos 2026 v1)
   Tudo que muda com frequência fica aqui: produtos, cores, códigos REF, fotos, preços.
   - preco.varejo: hoje provisório (anúncios do Mercado Livre, jul/2026). Na versão final vem do Bling.
   - atacado: área CNPJ (login). Preço tabelado pelo Alisson em 21/10/2026, alimentado à mão (não vem do Bling).
     vende=false: mostra "Tenho interesse no atacado" (WhatsApp). porCor: preço diferente por cor.
   - ATACADO_MINIMO: pedido mínimo do atacado, pode misturar produtos.
   - cores[].fotos: fotos originais do catálogo (Illustrator). Trocar uma foto = trocar o caminho.
   - produto com preco.varejo = null mostra "Preço em breve" + botão "Tenho interesse" (WhatsApp).
   ===================================================================== */
const WHATS='5544991832018';
const ATACADO_MINIMO=500;
const PIX_DESCONTO=0.05; /* 5% de desconto no Pix (varejo) */
const CATALOGO_PDF='https://drive.google.com/file/d/10w4QfCUntm82I-lIwRd35vAmS0mBHIpJ/view?usp=sharing';
var ATACADO=false; /* true quando entra como CNPJ */
const FAMILIAS=[
 {
  "id": "bombas",
  "nome": "Bombas",
  "rotulo": "BOMBAS",
  "volume": ""
 },
 {
  "id": "cuias",
  "nome": "Cuias",
  "rotulo": "CUIAS",
  "volume": ""
 },
 {
  "id": "copos",
  "nome": "Copos",
  "rotulo": "COPOS",
  "volume": ""
 },
 {
  "id": "garrafinhas",
  "nome": "Garrafinhas Térmicas",
  "rotulo": "GARRAFINHAS TÉRMICAS",
  "volume": "800mL"
 },
 {
  "id": "garrafas25",
  "nome": "Garrafas Térmicas 2,5L",
  "rotulo": "GARRAFAS TÉRMICAS",
  "volume": "2,5L"
 },
 {
  "id": "garrafas4",
  "nome": "Garrafas Térmicas 4L",
  "rotulo": "GARRAFAS TÉRMICAS",
  "volume": "4L"
 },
 {
  "id": "garrafao6",
  "nome": "Garrafão Térmico 6L",
  "rotulo": "GARRAFÃO TÉRMICO",
  "volume": "6L"
 },
 {
  "id": "garrafao95",
  "nome": "Garrafão Térmico 9,5L",
  "rotulo": "GARRAFÃO TÉRMICO",
  "volume": "9,5L"
 },
 {
  "id": "kits",
  "nome": "Kits Térmicos de Tereré",
  "rotulo": "KITS TERERÉ",
  "volume": ""
 }
];
/* banners: versão computador e versão celular (no WordPress: dois campos de imagem por banner). Celular = mesma foto até chegar a arte vertical. */
const BANNERS={
 "hero": {
  "desktop": "img/banners/hero.webp",
  "mobile": "img/banners/hero.webp"
 },
 "bombas": {
  "desktop": "img/banners/bombas.webp",
  "mobile": "img/banners/bombas.webp"
 },
 "cuias": {
  "desktop": "img/banners/cuias.webp",
  "mobile": "img/banners/cuias.webp"
 },
 "copos": {
  "desktop": "img/banners/copos.webp",
  "mobile": "img/banners/copos.webp"
 },
 "garrafinhas": {
  "desktop": "img/banners/garrafinhas.webp",
  "mobile": "img/banners/garrafinhas.webp"
 },
 "garrafas25": {
  "desktop": "img/banners/garrafas25.webp",
  "mobile": "img/banners/garrafas25.webp"
 },
 "garrafas4": {
  "desktop": "img/banners/garrafas4.webp",
  "mobile": "img/banners/garrafas4.webp"
 },
 "garrafao6": {
  "desktop": "img/banners/garrafao6.webp",
  "mobile": "img/banners/garrafao6.webp"
 },
 "garrafao95": {
  "desktop": "img/banners/garrafao95.webp",
  "mobile": "img/banners/garrafao95.webp"
 },
 "kits": {
  "desktop": "img/banners/kits.webp",
  "mobile": "img/banners/kits.webp"
 }
};
const ICONES={
 "bombas": "img/icones/bombas.png",
 "cuias": "img/icones/cuias.png",
 "copos": "img/icones/copos.png",
 "garrafinhas": "img/icones/garrafinhas.png",
 "garrafas25": "img/icones/garrafas25.png",
 "garrafas4": "img/icones/garrafas4.png",
 "garrafao6": "img/icones/garrafao6.png",
 "garrafao95": "img/icones/garrafao95.png",
 "kits": "img/icones/kits.svg"
};
const HEX={
 "Azul Petróleo": "#16324F",
 "Vermelho": "#C22B26",
 "Cinza": "#6E7276",
 "Preto": "#141414",
 "Branco": "#F4F4F2",
 "Inox Escovado": "#B9BDBF",
 "Rosa Claro": "#F2B8C6",
 "Violeta": "#B69FD6",
 "Azul Escuro": "#1B2E8F",
 "Verde Militar": "#3E5C47",
 "Bege Nude": "#D6C6A8",
 "Rosé": "#C99A88",
 "Rosa Pink": "#E4479B",
 "Cromado": "#D9DCDE",
 "Roxo": "#7B3FA8",
 "Bege": "#E3D3A6"
};
const PRODUTOS=[
 {
  "id": "g800",
  "familias": [
   "garrafinhas"
  ],
  "nome": "Garrafa Térmica Lisa 800mL — com Alça",
  "titulo": "Garrafa Térmica <b>Lisa 800mL</b><br>com Alça",
  "selo": "Best-seller",
  "preco": {
   "varejo": 33.99,
   "de": 59.99,
   "off": "43% OFF",
   "parcela": "ou 6 un. por R$ 29/un"
  },
  "atacado": {
   "vende": true,
   "preco": 29,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 495,
   "vendidos": "+1000 vendidos"
  },
  "specs": {
   "material": "Inox SUS 316",
   "volume": "800 mL",
   "ret": "Até 8h00",
   "alt": "27 cm",
   "larg": "8 cm"
  },
  "tags": [
   "Inox SUS 316"
  ],
  "cores": [
   {
    "nome": "Azul Petróleo",
    "ref": "vacuuma",
    "fotos": [
     "img/produtos/g800-azul-petroleo-1.webp",
     "img/produtos/g800-azul-petroleo-2.webp"
    ]
   },
   {
    "nome": "Vermelho",
    "ref": "vacuumv",
    "fotos": [
     "img/produtos/g800-vermelho-1.webp",
     "img/produtos/g800-vermelho-2.webp"
    ]
   },
   {
    "nome": "Cinza",
    "ref": "vacuumci",
    "fotos": [
     "img/produtos/g800-cinza-1.webp",
     "img/produtos/g800-cinza-2.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "vacuump",
    "fotos": [
     "img/produtos/g800-preto-1.webp",
     "img/produtos/g800-preto-2.webp"
    ]
   },
   {
    "nome": "Branco",
    "ref": "vacuumb",
    "fotos": [
     "img/produtos/g800-branco-1.webp",
     "img/produtos/g800-branco-2.webp"
    ]
   },
   {
    "nome": "Inox Escovado",
    "ref": "vacuumc",
    "fotos": [
     "img/produtos/g800-inox-escovado-1.webp",
     "img/produtos/g800-inox-escovado-2.webp"
    ]
   },
   {
    "nome": "Rosa Claro",
    "ref": "vacuumrs",
    "fotos": [
     "img/produtos/g800-rosa-claro-1.webp",
     "img/produtos/g800-rosa-claro-2.webp"
    ]
   },
   {
    "nome": "Violeta",
    "ref": "vacuumro",
    "fotos": [
     "img/produtos/g800-violeta-1.webp",
     "img/produtos/g800-violeta-2.webp"
    ]
   }
  ],
  "curto": "Isolamento a vácuo com parede dupla em Inox 316 Premium, tampa rosqueável antivazamento e peneira interna removível. Gelada por horas — do treino à trilha.",
  "descricao": "<h2>Desenvolvida para o <b>seu ritmo</b></h2><p>Fabricada em <b>Aço Inox 316 Premium</b>, oferece elevada resistência à corrosão, maior durabilidade e segurança para bebidas quentes ou geladas. A parede dupla com isolamento a vácuo reduz a troca térmica com o ambiente, conservando a temperatura por mais tempo — e minimizando a condensação externa.</p><div class=\"hl\"><h3>Peneira interna removível</h3><p style=\"margin:0\">Retém resíduos sólidos — frutas, sementes, polpas e fibras — ideal para água saborizada, sucos, shakes, chás e, claro, o tereré. Remove fácil para limpeza.</p></div><p>Tampa rosqueável com vedação antivazamento, boca larga para higienização e alça integrada. Academia, escritório, viagens, trilhas e camping — 800mL de autonomia para o dia inteiro.</p><p style=\"font-weight:500;color:var(--ink)\">Altura 27 cm · Largura 8 cm · Bico 2,2 cm · Livre de BPA · 8 cores</p>",
  "relacionados": [
   "mola",
   "quad",
   "c269",
   "red"
  ]
 },
 {
  "id": "kitaz",
  "familias": [
   "kits"
  ],
  "nome": "Kit Térmico Tereré AZARTE — Garrafa 2,5L + Copo + Bomba",
  "titulo": "Kit Térmico <b>Tereré AZARTE</b><br>garrafa, copo e bomba",
  "selo": "Lançamento",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": true,
   "preco": 125,
   "porCor": {}
  },
  "avaliacao": {
   "nota": null,
   "qtd": 0,
   "vendidos": ""
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "2,5 L",
   "ret": "Até 12h00",
   "alt": "30 cm",
   "larg": "17 cm"
  },
  "tags": [
   "Garrafa térmica 2,5L",
   "Copo térmico 300mL",
   "Bomba lisa corte base"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "5548",
    "fotos": [
     "img/produtos/kitaz-preto-1.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "5549",
    "fotos": [
     "img/produtos/kitaz-verde-militar-1.webp"
    ]
   },
   {
    "nome": "Rosa Claro",
    "ref": "5550",
    "fotos": [
     "img/produtos/kitaz-rosa-claro-1.webp"
    ]
   },
   {
    "nome": "Inox Escovado",
    "ref": "5547",
    "fotos": [
     "img/produtos/kitaz-inox-escovado-1.webp"
    ]
   }
  ],
  "curto": "Lançamento 2026: garrafa térmica AZARTE 2,5L com alavanca, copo térmico 300mL e bomba lisa com corte na base, prontos para a roda. Até 12h de conservação.",
  "descricao": "",
  "relacionados": [
   "kitli",
   "g25a",
   "c300",
   "corte"
  ]
 },
 {
  "id": "kitli",
  "familias": [
   "kits"
  ],
  "nome": "Kit Térmico Tereré LISA — Garrafa 2,5L + Copo + Bomba",
  "titulo": "Kit Térmico <b>Tereré LISA</b><br>garrafa, copo e bomba",
  "selo": "Lançamento",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": true,
   "preco": 125,
   "porCor": {}
  },
  "avaliacao": {
   "nota": null,
   "qtd": 0,
   "vendidos": ""
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "2,5 L",
   "ret": "Até 12h00",
   "alt": "30 cm",
   "larg": "17 cm"
  },
  "tags": [
   "Garrafa térmica 2,5L",
   "Copo térmico 300mL",
   "Bomba lisa corte base"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "10708",
    "fotos": [
     "img/produtos/kitli-preto-1.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "10709",
    "fotos": [
     "img/produtos/kitli-verde-militar-1.webp"
    ]
   },
   {
    "nome": "Rosa Claro",
    "ref": "10710",
    "fotos": [
     "img/produtos/kitli-rosa-claro-1.webp"
    ]
   },
   {
    "nome": "Inox Escovado",
    "ref": "10707",
    "fotos": [
     "img/produtos/kitli-inox-escovado-1.webp"
    ]
   }
  ],
  "curto": "Lançamento 2026: garrafa térmica Lisa 2,5L com alavanca, copo térmico 300mL e bomba lisa com corte na base, prontos para a roda. Até 12h de conservação.",
  "descricao": "",
  "relacionados": [
   "kitaz",
   "g25l",
   "c300",
   "corte"
  ]
 },
 {
  "id": "g25a",
  "familias": [
   "garrafas25"
  ],
  "nome": "Garrafa Térmica AZARTE 2,5L — com Alavanca",
  "titulo": "Garrafa Térmica <b>AZARTE 2,5L</b><br>com Alavanca",
  "selo": "",
  "preco": {
   "varejo": 91,
   "de": 199.99,
   "off": "54% OFF",
   "parcela": "12x R$ 8,96"
  },
  "atacado": {
   "vende": true,
   "preco": 95,
   "porCor": {
    "Inox Escovado": 80
   }
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 205,
   "vendidos": "+500 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "2,5 L",
   "ret": "Até 12h00",
   "alt": "30 cm",
   "larg": "17 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Azul Escuro",
    "ref": "5540",
    "fotos": [
     "img/produtos/g25a-azul-escuro-1.webp",
     "img/produtos/g25a-azul-escuro-2.webp"
    ]
   },
   {
    "nome": "Inox Escovado",
    "ref": "5537",
    "fotos": [
     "img/produtos/g25a-inox-escovado-1.webp",
     "img/produtos/g25a-inox-escovado-2.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "5538",
    "fotos": [
     "img/produtos/g25a-preto-1.webp",
     "img/produtos/g25a-preto-2.webp"
    ]
   },
   {
    "nome": "Branco",
    "ref": "5541",
    "fotos": [
     "img/produtos/g25a-branco-1.webp",
     "img/produtos/g25a-branco-2.webp"
    ]
   },
   {
    "nome": "Rosa Claro",
    "ref": "5542",
    "fotos": [
     "img/produtos/g25a-rosa-claro-1.webp",
     "img/produtos/g25a-rosa-claro-2.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "5539",
    "fotos": [
     "img/produtos/g25a-verde-militar-1.webp",
     "img/produtos/g25a-verde-militar-2.webp"
    ]
   }
  ],
  "curto": "A melhor retenção de temperatura da linha: até 12h de conservação, alça confortável e alavanca prática. Por fora, sempre à temperatura ambiente.",
  "descricao": "<h2>Retenção que <b>impressiona</b></h2><p>Aço inoxidável com a melhor retenção de temperatura — frio ou calor — por até 12 horas. Alça confortável para transportar, alavanca para servir sem esforço e design leve e compacto. Por fora, mantém-se à temperatura ambiente: não sobreaquece nem resfria.</p><div class=\"hl\"><h3>Primeiro uso perfeito</h3><p style=\"margin:0\">Para bebidas geladas, resfrie o interior com água fria antes de usar (gelo liberado a partir do segundo uso). Para quentes, escalde com água aquecida. Pequenos cuidados que prolongam a performance térmica por anos.</p></div><p>Prefira usar a capacidade máxima, evite bebidas gaseificadas, mantenha na vertical e nunca higienize com cloro.</p><p style=\"font-weight:500;color:var(--ink)\">Altura 30 cm · Base 17 cm · Tampa 21 cm · Peso 1,57 kg · 6 cores</p>",
  "relacionados": [
   "kitaz",
   "quad",
   "mola",
   "c300"
  ]
 },
 {
  "id": "g25l",
  "familias": [
   "garrafas25"
  ],
  "nome": "Garrafa Térmica Lisa 2,5L — com Alavanca",
  "titulo": "Garrafa Térmica <b>Lisa 2,5L</b><br>com Alavanca",
  "selo": "",
  "preco": {
   "varejo": 91,
   "de": 199.99,
   "off": "54% OFF",
   "parcela": "12x R$ 8,96"
  },
  "atacado": {
   "vende": true,
   "preco": 95,
   "porCor": {
    "Inox Escovado": 80
   }
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 205,
   "vendidos": "+500 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "2,5 L",
   "ret": "Até 12h00",
   "alt": "30 cm",
   "larg": "17 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Azul Escuro",
    "ref": "10610",
    "fotos": [
     "img/produtos/g25l-azul-escuro-1.webp",
     "img/produtos/g25l-azul-escuro-2.webp"
    ]
   },
   {
    "nome": "Inox Escovado",
    "ref": "10609",
    "fotos": [
     "img/produtos/g25l-inox-escovado-1.webp",
     "img/produtos/g25l-inox-escovado-2.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "10612",
    "fotos": [
     "img/produtos/g25l-preto-1.webp",
     "img/produtos/g25l-preto-2.webp"
    ]
   },
   {
    "nome": "Branco",
    "ref": "10611",
    "fotos": [
     "img/produtos/g25l-branco-1.webp",
     "img/produtos/g25l-branco-2.webp"
    ]
   },
   {
    "nome": "Rosa Claro",
    "ref": "10607",
    "fotos": [
     "img/produtos/g25l-rosa-claro-1.webp",
     "img/produtos/g25l-rosa-claro-2.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "10608",
    "fotos": [
     "img/produtos/g25l-verde-militar-1.webp",
     "img/produtos/g25l-verde-militar-2.webp"
    ]
   }
  ],
  "curto": "Corpo liso minimalista, mesma engenharia térmica: até 12h de conservação com alavanca de servir e alça de transporte.",
  "descricao": "<h2>Minimalista por fora, <b>potente</b> por dentro</h2><p>A versão de corpo liso da 2,5L: mesma engenharia térmica em aço inoxidável, com retenção de até 12 horas para bebidas frias ou quentes. Alavanca de servir, alça confortável e exterior sempre à temperatura ambiente.</p><div class=\"hl\"><h3>Primeiro uso perfeito</h3><p style=\"margin:0\">Resfrie o interior com água fria antes do primeiro uso gelado (gelo liberado depois) ou escalde para bebidas quentes — a temperatura interna se estabiliza e a conservação rende muito mais.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 30 cm · Base 17 cm · Tampa 21 cm · Peso 1,57 kg · 6 cores</p>",
  "relacionados": [
   "kitli",
   "quad",
   "grossa",
   "red"
  ]
 },
 {
  "id": "be4",
  "familias": [
   "garrafas4"
  ],
  "nome": "Garrafa Térmica Black Erva 4L — com Alavanca",
  "titulo": "Garrafa Térmica <b>Black Erva 4L</b><br>com Alavanca",
  "selo": "Black Erva",
  "preco": {
   "varejo": 139.67,
   "de": 199.99,
   "off": "30% OFF",
   "parcela": "12x R$ 13,80"
  },
  "atacado": {
   "vende": false,
   "preco": null,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 5,
   "qtd": 2,
   "vendidos": "+25 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "4 L",
   "ret": "Até 12h00",
   "alt": "30 cm",
   "larg": "17 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Preto",
    "ref": "",
    "fotos": [
     "img/produtos/be4-preto-1.webp",
     "img/produtos/be4-preto-2.webp",
     "img/produtos/be4-preto-3.webp"
    ]
   }
  ],
  "curto": "A linha Black Erva em 4 litros: aço inox dupla camada, sistema anti-gotejamento e visual todo preto para quem leva o tereré a sério.",
  "descricao": "<h2>Black Erva. <b>Atitude térmica.</b></h2><p>4 litros para compartilhar — acampamento, escritório ou piquenique — com isolamento em aço inox de dupla camada que mantém bebidas frias por até 12 horas e quentes por até 4 horas. Exterior polido, resistente a arranhões e ao desgaste diário.</p><div class=\"hl\"><h3>Sistema anti-gotejamento</h3><p style=\"margin:0\">Servir sem pingar: acionamento preciso com alça de transporte ergonômica para levar a roda para qualquer lugar.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 30 cm · Base 17 cm · Tampa 21 cm · Peso 1,57 kg · Preto · Garantia de fábrica 1 mês</p>",
  "relacionados": [
   "slim",
   "c269",
   "quad",
   "c300"
  ],
  "obs": "Fora do catálogo 2026 v1: sai do site depois (decisão do Alisson, 21/10/2026)."
 },
 {
  "id": "g6",
  "familias": [
   "garrafao6"
  ],
  "nome": "Garrafão Botijão Térmico AZARTE 6L — com Alavanca",
  "titulo": "Garrafão Botijão <b>Térmico 6L</b><br>com Alavanca",
  "selo": "",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": false,
   "preco": null,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.7,
   "qtd": 38,
   "vendidos": "+100 vendidos"
  },
  "specs": {
   "material": "Inox 18/8",
   "volume": "6 L",
   "ret": "Até 16h00",
   "alt": "31,5 cm",
   "larg": "30 cm"
  },
  "tags": [
   "Com alça e pé retrátil",
   "Livre de BPA, ecológica",
   "Ideal para restaurantes e hotéis"
  ],
  "cores": [
   {
    "nome": "Inox Escovado",
    "ref": "5536",
    "fotos": [
     "img/produtos/g6-inox-escovado-1.webp",
     "img/produtos/g6-inox-escovado-2.webp",
     "img/produtos/g6-inox-escovado-3.webp"
    ]
   }
  ],
  "curto": "Botijão inox 18/8 com torneira, pé retrátil e até 16h de conservação. O parceiro oficial de restaurantes, hotéis e grandes rodas.",
  "descricao": "<h2>Feito para <b>grupos grandes</b></h2><p>Botijão térmico de 6 litros em inox 18/8, livre de BPA e ecologicamente correto. Até 16 horas de conservação para bebidas frias e 8 horas para quentes, com exterior em aço inoxidável e polipropileno que une resistência e design.</p><div class=\"hl\"><h3>Torneira com bico de válvula</h3><p style=\"margin:0\">Acesso simples e funcional que evita desperdício e mantém a temperatura ideal — com alça e pé retrátil. Ideal para restaurantes e hotéis.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 31,5 cm · Largura 30 cm · Inox Escovado</p>",
  "relacionados": [
   "g95",
   "red",
   "mola",
   "quad"
  ]
 },
 {
  "id": "g95",
  "familias": [
   "garrafao95"
  ],
  "nome": "Garrafão Térmico AZARTE 9,5L — com Alavanca",
  "titulo": "Garrafão Térmico <b>AZARTE 9,5L</b><br>com Alavanca",
  "selo": "Pro",
  "preco": {
   "varejo": 229.9,
   "de": 349.9,
   "off": "34% OFF",
   "parcela": "12x R$ 22,76"
  },
  "atacado": {
   "vende": false,
   "preco": null,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.6,
   "qtd": 63,
   "vendidos": "+100 vendidos"
  },
  "specs": {
   "material": "Inox 18/8",
   "volume": "9,5 L",
   "ret": "Até 12h00",
   "alt": "42 cm",
   "larg": "25 cm"
  },
  "tags": [
   "Com alça e pé retrátil",
   "Livre de BPA, ecológica",
   "Ideal para restaurantes e hotéis"
  ],
  "cores": [
   {
    "nome": "Inox Escovado",
    "ref": "5535",
    "fotos": [
     "img/produtos/g95-inox-escovado-1.webp",
     "img/produtos/g95-inox-escovado-2.webp",
     "img/produtos/g95-inox-escovado-3.webp"
    ]
   }
  ],
  "curto": "9,5 litros de autonomia com torneira anti-desperdício e corpo inox 18/8 — feito para eventos, hotéis e o dia inteiro de tereré gelado.",
  "descricao": "<h2>Capacidade <b>profissional</b></h2><p>9,5 litros para eventos, hotéis, restaurantes e ambientes industriais. Fabricado em inox 18/8, livre de BPA, com capacidade generosa para grupos grandes e design sofisticado que se adapta a qualquer ambiente.</p><div class=\"hl\"><h3>Torneira anti-desperdício</h3><p style=\"margin:0\">Sistema de abertura com bico de válvula: acesso à bebida simples e funcional, mantendo a temperatura ideal gole após gole.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 42 cm · Largura 25 cm · Retenção até 12h · Inox Escovado</p>",
  "relacionados": [
   "g6",
   "red",
   "mola",
   "quad"
  ]
 },
 {
  "id": "quad",
  "familias": [
   "cuias",
   "copos"
  ],
  "nome": "Copo Cuia Quadrado 250mL — AZARTE",
  "titulo": "Copo Cuia <b>Quadrado 250mL</b>",
  "selo": "",
  "preco": {
   "varejo": 42.9,
   "de": 49.9,
   "off": "14% OFF",
   "parcela": "5 un. por R$ 30/un"
  },
  "atacado": {
   "vende": true,
   "preco": 35,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 5,
   "qtd": 6,
   "vendidos": "+5 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "250 mL",
   "ret": "Não retém",
   "alt": "11 cm",
   "larg": "5 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Bege Nude",
    "ref": "0000004490128",
    "fotos": [
     "img/produtos/quad-bege-nude-1.webp",
     "img/produtos/quad-bege-nude-2.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "0000004490135",
    "fotos": [
     "img/produtos/quad-verde-militar-1.webp",
     "img/produtos/quad-verde-militar-2.webp"
    ]
   },
   {
    "nome": "Rosé",
    "ref": "1030933",
    "fotos": [
     "img/produtos/quad-rose-1.webp",
     "img/produtos/quad-rose-2.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "0000004490104",
    "fotos": [
     "img/produtos/quad-preto-1.webp",
     "img/produtos/quad-preto-2.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "0000004490111",
    "fotos": [
     "img/produtos/quad-cromado-1.webp",
     "img/produtos/quad-cromado-2.webp"
    ]
   },
   {
    "nome": "Rosa Pink",
    "ref": "100338",
    "fotos": [
     "img/produtos/quad-rosa-pink-1.webp",
     "img/produtos/quad-rosa-pink-2.webp"
    ]
   }
  ],
  "curto": "Design quadrado exclusivo em aço inox polido: a cuia que virou assinatura da AZARTE, em 6 cores.",
  "descricao": "<h2>A cuia que virou <b>assinatura</b></h2><p>Design quadrado exclusivo em aço inoxidável — a peça mais icônica da linha AZARTE. Interior polido, bordas precisas e 250mL na medida certa para o tereré tradicional.</p><p>Leve, resistente e disponível em 6 acabamentos, do Bege Nude ao Rosa Pink. Combine com a bomba da mesma cor e monte um set completo.</p><p style=\"font-weight:500;color:var(--ink)\">Altura 11 cm · Bocal 5×5 cm · Aço inox · 6 cores</p>",
  "relacionados": [
   "mola",
   "g25a",
   "c269",
   "g800"
  ]
 },
 {
  "id": "red",
  "familias": [
   "cuias",
   "copos"
  ],
  "nome": "Copo Cuia Redondo 330mL — AZARTE",
  "titulo": "Copo Cuia <b>Redondo 330mL</b>",
  "selo": "",
  "preco": {
   "varejo": 25,
   "de": 29.9,
   "off": "16% OFF",
   "parcela": "10 un. por R$ 21/un"
  },
  "atacado": {
   "vende": true,
   "preco": 28,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.7,
   "qtd": 7,
   "vendidos": "+5 vendidos"
  },
  "specs": {
   "material": "Alumínio",
   "volume": "330 mL",
   "ret": "Não retém",
   "alt": "15 cm",
   "larg": "8 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Bege Nude",
    "ref": "0000004490166",
    "fotos": [
     "img/produtos/red-bege-nude-1.webp",
     "img/produtos/red-bege-nude-2.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "0000004490159",
    "fotos": [
     "img/produtos/red-verde-militar-1.webp",
     "img/produtos/red-verde-militar-2.webp"
    ]
   },
   {
    "nome": "Rosé",
    "ref": "1031037",
    "fotos": [
     "img/produtos/red-rose-1.webp",
     "img/produtos/red-rose-2.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "0000004490142",
    "fotos": [
     "img/produtos/red-preto-1.webp",
     "img/produtos/red-preto-2.webp"
    ]
   },
   {
    "nome": "Rosa Pink",
    "ref": "100355",
    "fotos": [
     "img/produtos/red-rosa-pink-1.webp",
     "img/produtos/red-rosa-pink-2.webp"
    ]
   }
  ],
  "curto": "Cuia redonda em alumínio leve e durável, com 330mL de capacidade generosa para rodadas mais longas.",
  "descricao": "<h2>Clássica, leve, <b>durável</b></h2><p>A cuia redonda em alumínio é durável e resistente, ideal para quem busca um produto de qualidade para muitos anos de uso. Com capacidade generosa de 330mL, é perfeita para desfrutar do tereré sem repor o líquido a cada rodada.</p><p>Design e cores exclusivas da AZARTE para uma experiência completa — uma novidade para o mundo dos amantes do mate.</p><p style=\"font-weight:500;color:var(--ink)\">Altura 15 cm · Bocal 8×8 cm · Alumínio · 5 cores</p>",
  "relacionados": [
   "corte",
   "g800",
   "c300",
   "mola"
  ]
 },
 {
  "id": "c300",
  "familias": [
   "copos"
  ],
  "nome": "Copo Térmico Redondo 300mL — AZARTE",
  "titulo": "Copo Térmico <b>Redondo 300mL</b>",
  "selo": "",
  "preco": {
   "varejo": 18.44,
   "de": 29.9,
   "off": "38% OFF",
   "parcela": "5 un. por R$ 18/un"
  },
  "atacado": {
   "vende": true,
   "preco": 22,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.3,
   "qtd": 9,
   "vendidos": "+100 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "300 mL",
   "ret": "Até 3h",
   "alt": "11,5 cm",
   "larg": "8 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1031053",
    "fotos": [
     "img/produtos/c300-preto-1.webp",
     "img/produtos/c300-preto-2.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "1031055",
    "fotos": [
     "img/produtos/c300-verde-militar-1.webp",
     "img/produtos/c300-verde-militar-2.webp"
    ]
   },
   {
    "nome": "Rosa Pink",
    "ref": "1031060",
    "fotos": [
     "img/produtos/c300-rosa-pink-1.webp",
     "img/produtos/c300-rosa-pink-2.webp"
    ]
   }
  ],
  "curto": "Copo térmico em inox com retenção de até 3h: compacto, resistente, em Preto, Verde Militar e Rosa Pink.",
  "descricao": "<h2>Compacto e <b>térmico</b></h2><p>Copo térmico em aço inoxidável com retenção de até 3 horas, no formato redondo clássico da AZARTE. Borda em inox polido e corpo texturizado resistente.</p><p style=\"font-weight:500;color:var(--ink)\">Altura 11,5 cm · Largura 8 cm · 300 mL · Aço inox · Preto, Verde Militar e Rosa Pink</p>",
  "relacionados": [
   "kitaz",
   "mola",
   "red",
   "g25l"
  ]
 },
 {
  "id": "c269",
  "familias": [
   "cuias"
  ],
  "nome": "Copo Térmico Cuia Redondo 269mL — AZARTE",
  "titulo": "Copo Térmico Cuia <b>Redondo 269mL</b><br>AZARTE",
  "selo": "",
  "preco": {
   "varejo": 48.4,
   "de": 69.9,
   "off": "30% OFF",
   "parcela": "10 un. por R$ 39,98/un"
  },
  "atacado": {
   "vende": false,
   "preco": null,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 5,
   "qtd": 6,
   "vendidos": "+25 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "volume": "269 mL",
   "ret": "Até 3h",
   "alt": "11,3 cm",
   "larg": "8 cm"
  },
  "tags": [],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1032001",
    "fotos": [
     "img/produtos/c269-preto-1.webp"
    ]
   },
   {
    "nome": "Branco",
    "ref": "1032002",
    "fotos": [
     "img/produtos/c269-branco-1.webp"
    ]
   }
  ],
  "curto": "Parede dupla a vácuo, inox 18/8 e design à prova de vazamentos: tereré frio por até 3h.",
  "descricao": "<h2>Temperatura <b>sob controle</b></h2><p>Desenvolvida para oferecer sofisticação e qualidade: tereré frio por até 3 horas, chimarrão quente por até 30 minutos e gelo conservado por até 6 horas. Construção em parede dupla com isolamento a vácuo.</p><div class=\"hl\"><h3>Inox 18/8 livre de BPA</h3><p style=\"margin:0\">Resistente à ferrugem e ao contato direto com a erva. Design à prova de vazamentos, estável em bases de apoio.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 11,3 cm · Largura 8 cm · 269 mL · Peso 0,28 kg · Preto e Branco</p>",
  "relacionados": [
   "kitaz",
   "slim",
   "g800",
   "quad"
  ]
 },
 {
  "id": "mola",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré Mola Externa Regulável — AZARTE",
  "titulo": "Bomba de Tereré <b>Mola Externa</b> Regulável",
  "selo": "Mais amada",
  "preco": {
   "varejo": 29.99,
   "de": 39.9,
   "off": "24% OFF",
   "parcela": "15 un. por R$ 22,90/un"
  },
  "atacado": {
   "vende": true,
   "preco": 25,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 257,
   "vendidos": "+100 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "17,5 cm"
  },
  "tags": [
   "Com filtro removível, ótimo fluxo",
   "Formato: arredondado"
  ],
  "cores": [
   {
    "nome": "Rosa Pink",
    "ref": "100341",
    "fotos": [
     "img/produtos/mola-rosa-pink-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Roxo",
    "ref": "0000004490234",
    "fotos": [
     "img/produtos/mola-roxo-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "0000004490029",
    "fotos": [
     "img/produtos/mola-preto-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "0000004490043",
    "fotos": [
     "img/produtos/mola-verde-militar-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Bege Nude",
    "ref": "0000004490050",
    "fotos": [
     "img/produtos/mola-bege-nude-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Rosé",
    "ref": "0000004490241",
    "fotos": [
     "img/produtos/mola-rose-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "0000004490036",
    "fotos": [
     "img/produtos/mola-cromado-1.webp",
     "img/produtos/mola-detalhe.webp"
    ]
   }
  ],
  "curto": "Mola externa para segurança e controle, com fluxo regulável e filtro removível. A bomba mais amada da linha.",
  "descricao": "<h2>Controle total do <b>fluxo</b></h2><p>Aço inoxidável com durabilidade e resistência à corrosão. A mola externa proporciona maior segurança e controle na operação, e o fluxo regulável permite ajustar a sucção do seu jeito — versatilidade e precisão em cada gole.</p><div class=\"hl\"><h3>Filtro removível + limpador incluso</h3><p style=\"margin:0\">Manutenção simples: desmonta, limpa com a escovinha inclusa e volta pra roda.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 17,5 cm · Formato arredondado · Aço inox · 7 cores</p>",
  "relacionados": [
   "conica",
   "quad",
   "g25a",
   "red"
  ]
 },
 {
  "id": "conica",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré Mola Externa Cônica Regulável — AZARTE",
  "titulo": "Bomba de Tereré <b>Mola Externa Cônica</b><br>Regulável",
  "selo": "",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": true,
   "preco": 22,
   "porCor": {}
  },
  "avaliacao": {
   "nota": null,
   "qtd": 0,
   "vendidos": ""
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "17,5 cm"
  },
  "tags": [
   "Com filtro removível, ótimo fluxo",
   "Formato: arredondado ponta cônica"
  ],
  "cores": [
   {
    "nome": "Rosa Pink",
    "ref": "1030915",
    "fotos": [
     "img/produtos/conica-rosa-pink-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "0000004490074",
    "fotos": [
     "img/produtos/conica-preto-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "0000004490098",
    "fotos": [
     "img/produtos/conica-verde-militar-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   },
   {
    "nome": "Bege Nude",
    "ref": "0000004490081",
    "fotos": [
     "img/produtos/conica-bege-nude-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   },
   {
    "nome": "Rosé",
    "ref": "1030987",
    "fotos": [
     "img/produtos/conica-rose-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "0000004490067",
    "fotos": [
     "img/produtos/conica-cromado-1.webp",
     "img/produtos/conica-detalhe.webp"
    ]
   }
  ],
  "curto": "Mola externa regulável com ponta cônica e filtro removível: ótimo fluxo, em aço inoxidável.",
  "descricao": "",
  "relacionados": [
   "mola",
   "quad",
   "kitaz",
   "red"
  ]
 },
 {
  "id": "corte",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré Lisa com Corte na Base — AZARTE",
  "titulo": "Bomba de Tereré Lisa <b>Corte na Base</b>",
  "selo": "",
  "preco": {
   "varejo": 28.9,
   "de": 54.9,
   "off": "47% OFF",
   "parcela": "10 un. por R$ 26/un"
  },
  "atacado": {
   "vende": true,
   "preco": 24,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 5,
   "qtd": 3,
   "vendidos": "+5 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "18,5 cm"
  },
  "tags": [
   "Não entope, ótimo fluxo",
   "Formato: curva achatada"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1031219",
    "fotos": [
     "img/produtos/corte-preto-1.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "1031218",
    "fotos": [
     "img/produtos/corte-verde-militar-1.webp"
    ]
   },
   {
    "nome": "Bege",
    "ref": "1031220",
    "fotos": [
     "img/produtos/corte-bege-1.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "1031216",
    "fotos": [
     "img/produtos/corte-cromado-1.webp",
     "img/produtos/corte-detalhe.webp"
    ]
   }
  ],
  "curto": "Corte na base que não entope e garante ótimo fluxo. Curva achatada, inox puro, simples e eficiente.",
  "descricao": "<h2>Simples. Eficiente. <b>Não entope.</b></h2><p>O corte na base garante excelente fluxo de líquido sem entupimentos — perfeita para momentos de descontração. Fabricada em aço inoxidável, resistente e durável, com composição livre de BPA.</p><div class=\"hl\"><h3>Limpeza sem esforço</h3><p style=\"margin:0\">Limpador integrado, apta para lava-louças e leve para transportar em todas as suas aventuras.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 18,5 cm · Curva achatada · Aço inox · 4 cores</p>",
  "relacionados": [
   "kitaz",
   "red",
   "c300",
   "quad"
  ]
 },
 {
  "id": "grossa",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré com Telinha V6 Grossa — AZARTE",
  "titulo": "Bomba de Tereré <b>Telinha V6 Grossa</b>",
  "selo": "",
  "preco": {
   "varejo": 38.7,
   "de": 54.9,
   "off": "29% OFF",
   "parcela": "10 un. por R$ 26/un"
  },
  "atacado": {
   "vende": true,
   "preco": 38,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 55,
   "vendidos": "+5 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "18,5 cm"
  },
  "tags": [
   "6 telas anti-entupimento, ótimo fluxo",
   "Formato: curva achatada larga"
  ],
  "cores": [
   {
    "nome": "Rosé",
    "ref": "1031073",
    "fotos": [
     "img/produtos/grossa-rose-1.webp"
    ]
   },
   {
    "nome": "Preto",
    "ref": "100249",
    "fotos": [
     "img/produtos/grossa-preto-1.webp"
    ]
   },
   {
    "nome": "Verde Militar",
    "ref": "1003042",
    "fotos": [
     "img/produtos/grossa-verde-militar-1.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "100247",
    "fotos": [
     "img/produtos/grossa-cromado-1.webp"
    ]
   },
   {
    "nome": "Bege Nude",
    "ref": "1031032",
    "fotos": [
     "img/produtos/grossa-bege-nude-1.webp",
     "img/produtos/grossa-detalhe.webp"
    ]
   }
  ],
  "curto": "6 telinhas anti-entupimento em curva achatada larga: máxima proteção com ótimo fluxo.",
  "descricao": "<h2>6 telinhas de <b>proteção</b></h2><p>A V6 Grossa protege contra partículas e impurezas, prolongando a vida útil e garantindo bebida sempre limpa. Curva achatada larga com ótimo fluxo, construída em inox para suportar uso intenso e resistir à corrosão.</p><div class=\"hl\"><h3>Escovinha inclusa</h3><p style=\"margin:0\">Design de fácil acesso com escovinha de limpeza prática para manter o equipamento sempre em ótimo estado. Livre de BPA, apta para lava-louças.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 18,5 cm · Curva achatada larga · Aço inox · 5 cores</p>",
  "relacionados": [
   "g25l",
   "quad",
   "red",
   "g800"
  ]
 },
 {
  "id": "slim",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré com Telinha V6 Slim — AZARTE",
  "titulo": "Bomba de Tereré <b>Telinha V6 Slim</b>",
  "selo": "",
  "preco": {
   "varejo": 35.68,
   "de": 54.9,
   "off": "35% OFF",
   "parcela": "10 un. por R$ 32/un"
  },
  "atacado": {
   "vende": true,
   "preco": 35,
   "porCor": {}
  },
  "avaliacao": {
   "nota": 4.8,
   "qtd": 55,
   "vendidos": "+50 vendidos"
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "18,5 cm"
  },
  "tags": [
   "6 telas anti-entupimento, maior fluxo",
   "Formato: curva achatada slim"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1031173",
    "fotos": [
     "img/produtos/slim-preto-1.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "1030943",
    "fotos": [
     "img/produtos/slim-cromado-1.webp",
     "img/produtos/slim-detalhe.webp"
    ]
   }
  ],
  "curto": "6 telas anti-entupimento em perfil slim para o maior fluxo da linha. Acompanha escovinha de limpeza.",
  "descricao": "<h2>Maior fluxo, perfil <b>slim</b></h2><p>Filtro em telinha V6 com 6 telas anti-entupimento no formato curva achatada slim: o maior fluxo da linha com proteção total. 18,5 cm em aço inoxidável, resistente e durável, livre de BPA.</p><div class=\"hl\"><h3>Manutenção descomplicada</h3><p style=\"margin:0\">Limpador integrado e compatível com lava-louças — praticidade e estilo para elevar sua experiência.</p></div><p style=\"font-weight:500;color:var(--ink)\">Altura 18,5 cm · Curva achatada slim · Aço inox · Preto e Cromado</p>",
  "relacionados": [
   "quadt",
   "c269",
   "g800",
   "quad"
  ]
 },
 {
  "id": "quadt",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré Quadrada com Telinha — AZARTE",
  "titulo": "Bomba de Tereré <b>Quadrada</b><br>com Telinha",
  "selo": "",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": true,
   "preco": 40,
   "porCor": {}
  },
  "avaliacao": {
   "nota": null,
   "qtd": 0,
   "vendidos": ""
  },
  "specs": {
   "material": "Aço inoxidável",
   "alt": "18 cm"
  },
  "tags": [
   "Telinha anti-entupimento, maior fluxo",
   "Formato: quadrada"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1031240",
    "fotos": [
     "img/produtos/quadt-preto-1.webp",
     "img/produtos/quadt-detalhe.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "1031239",
    "fotos": [
     "img/produtos/quadt-cromado-1.webp"
    ]
   }
  ],
  "curto": "Formato quadrado com telinha anti-entupimento para o maior fluxo. Aço inoxidável, 18 cm.",
  "descricao": "",
  "relacionados": [
   "slim",
   "quad",
   "g25a",
   "c300"
  ]
 },
 {
  "id": "perf",
  "familias": [
   "bombas"
  ],
  "nome": "Bomba de Tereré Lisa com Perfuração na Base",
  "titulo": "Bomba de Tereré <b>Lisa</b><br>com Perfuração na Base",
  "selo": "",
  "preco": {
   "varejo": null,
   "de": null,
   "off": "",
   "parcela": ""
  },
  "atacado": {
   "vende": true,
   "preco": 25,
   "porCor": {}
  },
  "avaliacao": {
   "nota": null,
   "qtd": 0,
   "vendidos": ""
  },
  "specs": {
   "material": "Ferro",
   "alt": "17,5 cm"
  },
  "tags": [
   "Não entope, ótimo fluxo",
   "Formato: arredondada"
  ],
  "cores": [
   {
    "nome": "Preto",
    "ref": "1031017",
    "fotos": [
     "img/produtos/perf-preto-1.webp"
    ]
   },
   {
    "nome": "Rosa Pink",
    "ref": "1031018",
    "fotos": [
     "img/produtos/perf-rosa-pink-1.webp"
    ]
   },
   {
    "nome": "Cromado",
    "ref": "1031019",
    "fotos": [
     "img/produtos/perf-cromado-1.webp",
     "img/produtos/perf-detalhe.webp"
    ]
   }
  ],
  "curto": "Perfuração na base que não entope e garante ótimo fluxo. Formato arredondado, 17,5 cm.",
  "descricao": "",
  "relacionados": [
   "corte",
   "red",
   "g800",
   "quad"
  ]
 }
];

/* ---------- adaptador: converte os dados acima para o formato que a página usa ---------- */
const CATS=FAMILIAS.map(f=>({id:f.id,n:f.nome,n2:f.rotulo,vol:f.volume}));
const IMGS={hero:BANNERS.hero.desktop,bn:{},cat:ICONES};
FAMILIAS.forEach(f=>IMGS.bn[f.id]=BANNERS[f.id].desktop);
/* <picture> com a versão certa para cada tela */
function bannerPic(k,alt,lazy){const b=BANNERS[k];return `<picture><source media="(max-width:760px)" srcset="${b.mobile}"><img src="${b.desktop}" alt="${alt}"${lazy?' loading="lazy"':''}></picture>`;}
const VARS={},GALS={},FOTOS={},TT={},SHORTS={},DESCS={},RELATED={};
const P=PRODUTOS.map(p=>{
  VARS[p.id]={};FOTOS[p.id]={};
  p.cores.forEach(c=>{VARS[p.id][c.nome]=c.fotos[0];FOTOS[p.id][c.nome]=c.fotos;});
  if(p.titulo)TT[p.id]=p.titulo; if(p.curto)SHORTS[p.id]=p.curto; if(p.descricao)DESCS[p.id]=p.descricao; RELATED[p.id]=p.relacionados;
  const n=p.cores.length;
  const item={id:p.id,cats:p.familias,name:p.nome,varejo:p.preco.varejo,
    atac:p.atacado.vende?p.atacado.preco:null,atacCor:p.atacado.porCor,
    stars:p.avaliacao.nota,rev:p.avaliacao.qtd,sold:p.avaliacao.vendidos,badge:p.selo,img:p.cores[0].fotos[0],
    colors:p.cores.map(c=>c.nome),refs:Object.fromEntries(p.cores.map(c=>[c.nome,c.ref])),tags:p.tags,
    specs:{...p.specs,cores:n+(n===1?' cor':' cores')}};
  /* preço muda sozinho conforme o modo (Pessoa Física = varejo, CNPJ = atacado) */
  Object.defineProperty(item,'price',{get(){return ATACADO?item.atac:item.varejo;}});
  Object.defineProperty(item,'old',{get(){return ATACADO?null:p.preco.de;}});
  Object.defineProperty(item,'off',{get(){return ATACADO?'':p.preco.off;}});
  Object.defineProperty(item,'parc',{get(){return ATACADO?'':p.preco.parcela;}});
  return item;
});
/* preço de uma cor específica (no atacado a garrafa 2,5L inox tem preço próprio) */
function precoDe(p,cor){if(!ATACADO)return p.varejo; if(p.atac==null)return null; return (p.atacCor&&p.atacCor[cor]!=null)?p.atacCor[cor]:p.atac;}
function precoMin(p){if(!ATACADO||!p.atacCor)return p.price; const v=[p.atac,...Object.values(p.atacCor)].filter(x=>x!=null); return v.length?Math.min(...v):null;}
