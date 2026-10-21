/* =====================================================================
   AZARTE — BRINDES PERSONALIZADOS (configuração)
   - BRINDES_API: endereço do servidor que gera o mockup com IA.
     Vazio = modo demonstração (prévia local + pedido ao Comercial).
     No servidor fica a chave do motor de imagem (Magnific / Nano Banana Pro) —
     NUNCA colocar chave de API neste arquivo, ele é público.
   - BRINDES_PRODUTOS: produtos que aceitam mockup/gravação (regra do Alisson, 21/10/2026:
     só copos, cuias, garrafinhas, garrafas e kits, e SÓ nas versões limpas, sem a marca AZARTE impressa; bombas e garrafões NÃO), com a posição inicial
     da logo na foto (x, y = centro em fração da foto; esc = largura da logo; hmax = altura máxima, para logo vertical caber no corpo).
   - Condições (mínimo de peças, prazo, preço): a combinar com o Comercial.
     Quando o Alisson definir, preencher BRINDES_CONDICOES.
   ===================================================================== */
const BRINDES_API = '';
const BRINDES_LIMITE_DIA = 5;  /* e no máximo 5 tentativas por CNPJ por dia (regra do Alisson, 21/10/2026) */
const BRINDES_LIMITE_HORA = 3; /* tentativas de geração com IA por CNPJ por hora (regra do Alisson, 21/10/2026).
   Cada tentativa gera as 3 opções. O servidor TEM que aplicar o mesmo limite. */
/* minimo: peças por pedido de brinde (Alisson, 21/10/2026: 25 por ora, pode mudar). prazo: null = "a combinar com o Comercial" */
const BRINDES_CONDICOES = { minimo: 25, prazo: null };

/* Só versões LIMPAS (sem a marca AZARTE impressa) — regra do Alisson, 21/10/2026.
   Copos e cuias voltam quando houver foto limpa deles (hoje todas têm a marca AZARTE). */
const BRINDES_PRODUTOS = {
  g800:  { x: .50, y: .60, esc: .16, hmax: .40 },
  g25l:  { x: .47, y: .70, esc: .26, hmax: .28 },
  kitli: { x: .40, y: .66, esc: .22, hmax: .26 }
};
/* para quando houver fotos limpas: quad { x:.38, y:.52, esc:.16 }, red { x:.36, y:.52, esc:.18 },
   c300 { x:.38, y:.50, esc:.18 }, c269 { x:.50, y:.60, esc:.28 } */

/* nome das cores em inglês para o prompt do motor de imagem */
const COR_EN = {
  'Preto': 'matte black', 'Branco': 'matte white', 'Inox Escovado': 'brushed stainless steel',
  'Cromado': 'polished chrome stainless steel', 'Verde Militar': 'military green', 'Rosa Claro': 'light pink',
  'Rosa Pink': 'hot pink', 'Rosé': 'rose gold', 'Bege Nude': 'nude beige', 'Bege': 'beige',
  'Azul Escuro': 'dark royal blue', 'Azul Petróleo': 'deep petrol navy blue', 'Vermelho': 'red',
  'Cinza': 'graphite gray', 'Violeta': 'lilac violet', 'Roxo': 'purple'
};
const COR_INOX = ['Inox Escovado', 'Cromado'];

/* nome do produto em inglês para o prompt */
const PRODUTO_EN = {
  g800: '800 mL insulated stainless steel water bottle with carry handle and screw cap',
  g25a: '2.5 L insulated pump-lever jug with carry handle',
  g25l: '2.5 L insulated pump-lever jug with carry handle, plain body',
  kitaz: 'tereré kit: a 2.5 L insulated pump-lever jug with a side cup holder holding a thermal cup with a bombilla straw',
  kitli: 'tereré kit: a 2.5 L insulated pump-lever jug with a plain body and a side cup holder holding a thermal cup with a bombilla straw',
  quad: 'square 250 mL stainless steel tereré cup',
  red: 'round 330 mL aluminum tereré cup',
  c300: 'round 300 mL insulated stainless steel tumbler cup',
  c269: 'round 269 mL insulated stainless steel cuia cup with flared stainless rim'
};
const KIT_IDS = ['kitaz', 'kitli'];
const COPO_IDS = ['quad', 'red', 'c300', 'c269'];

/* Prompt no padrão do agente de imagens da Hum (inglês, logo pixel-fiel, ≤ 2400 caracteres, Fidelity Lock).
   Referência 1 = foto do produto na cor escolhida; referência 2 = imagem que o cliente enviou
   (pode ser foto, print ou JPG com fundo: o prompt manda isolar só a logo).
   Sempre 3 opções em 16:9, nesta ordem (regra do Alisson, 21/10/2026):
   1 horizontal · 2 vertical · 3 logo completa. */
const BRINDE_FORMATO = '16:9';
const BRINDE_OPCOES = [
  { tipo: 'horizontal', nome: 'Horizontal',
    texto: 'LAYOUT 1, HORIZONTAL: arrange the logo elements from reference 2 in one horizontal line, symbol on the left and brand name to its right, reusing the exact artwork of each element' },
  { tipo: 'vertical', nome: 'Vertical',
    texto: 'LAYOUT 2, VERTICAL: symbol on top and the brand name below it written vertically along the body, reading from bottom to top, reusing the exact artwork of each element' },
  { tipo: 'completa', nome: 'Logo completa',
    texto: 'LAYOUT 3, COMPLETE LOGO: the entire logo exactly as provided in reference 2, every element including any tagline, in its original arrangement' }
];
function promptMockupBrinde(p, cor, pos, opcao) {
  opcao = opcao || BRINDE_OPCOES[2];
  const corEn = COR_EN[cor] || cor;
  const inox = COR_INOX.includes(cor);
  const kit = KIT_IDS.includes(p.id), copo = COPO_IDS.includes(p.id);
  const nome = PRODUTO_EN[p.id] || 'product';
  const d = BRINDES_PRODUTOS[p.id] || { y: .6 };
  const faixa = pos.y < d.y - .06 ? 'upper part of the front body' : pos.y > d.y + .06 ? 'lower part of the front body' : 'middle of the front body';
  const gravacao = inox
    ? 'laser etching: a fine dark matte graphite mark etched into the stainless steel, no paint, no sticker'
    : `laser engraving: inside the logo shapes the ${corEn} coating is removed and bright brushed stainless steel shows through, flush with the surface, no paint, no sticker`;
  const onde = kit ? `${faixa} of the jug (not on the cup)` : faixa;
  const detalhes = p.id === 'g800'
    ? (cor === 'Azul Petróleo' ? ' Keep the exact cap: black top, navy blue ring at the base of the cap, black handle.' : ' Keep the exact cap and handle as in reference 1.')
    : kit ? ' Keep every kit part exactly as in reference 1: jug, lever lid, side cup holder, cup and bombilla straw.'
    : copo ? ' Keep the exact rim, walls and base as in reference 1.'
    : ' Keep the exact lever lid and handle as in reference 1.';
  const rot = Math.round(pos.rot || 0);
  const giro = opcao.tipo === 'completa' && Math.abs(rot) >= 5
    ? ` Rotate the complete logo ${Math.abs(rot)} degrees ${rot > 0 ? 'clockwise' : 'counterclockwise'}, exactly as the customer positioned it on the body.` : '';
  return [
    `Commercial product mockup photograph, clean neutral light-gray studio background, soft natural floor shadow.`,
    `Reference 1 is the exact product: a ${nome} in ${corEn}, same shape, proportions, materials, finish and factory markings.${detalhes}`,
    `Reference 2 is the customer's brand image; it may be a photo, screenshot, print or file with a background or other objects: isolate only the logo artwork (symbol and lettering), discard backgrounds, paper, borders, mockups and anything else.`,
    `${opcao.texto}.${giro} Place it on the ${onde}, sized to fit comfortably inside the body, following the curvature and perspective of the surface, as ${gravacao}.`,
    `Ignore the original colors of the logo: the whole mark becomes only the engraved metal tone, no ink, no print, no color fill. Do not redraw or invent letters: keep the exact letterforms, shapes and proportions of every element, crisp edges.`,
    `— TECHNICAL — Subject: ${kit ? 'the complete kit as one group' : 'single product'}, same camera angle as reference 1, centered with generous side space. Lighting: large softbox key from viewer's left, gentle fill, realistic metal reflections. Lens: 85mm, f/8, tack-sharp on the engraving. Color: true-to-life, neutral white balance. Sharpness: crisp edges, high microcontrast, no AI artifacts. Realism: real photograph, not CGI. Aspect ratio ${BRINDE_FORMATO}.`,
    `Fidelity Lock: product geometry, color, ${kit ? 'all kit parts' : copo ? 'rim and walls' : 'lid and handle'} and the logo artwork unchanged; no extra text, no extra objects.`
  ].join(' ');
}
/* as 3 opções na ordem fixa */
function promptsMockupBrinde(p, cor, pos) {
  return BRINDE_OPCOES.map((o, i) => ({ ordem: i + 1, tipo: o.tipo, nome: o.nome, formato: BRINDE_FORMATO, prompt: promptMockupBrinde(p, cor, pos, o) }));
}
