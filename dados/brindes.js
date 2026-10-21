/* =====================================================================
   AZARTE — BRINDES PERSONALIZADOS (configuração)
   - BRINDES_API: endereço do servidor que gera o mockup com IA.
     Vazio = modo demonstração (prévia local + pedido ao Comercial).
     No servidor fica a chave do motor de imagem (Magnific / Nano Banana Pro) —
     NUNCA colocar chave de API neste arquivo, ele é público.
   - BRINDES_PRODUTOS: produtos que aceitam mockup/gravação (regra do Alisson, 21/10/2026:
     só copos, cuias, garrafinhas, garrafas e kits; bombas e garrafões NÃO), com a posição inicial
     da logo na foto (x, y = centro em fração da foto; esc = largura da logo).
   - Condições (mínimo de peças, prazo, preço): a combinar com o Comercial.
     Quando o Alisson definir, preencher BRINDES_CONDICOES.
   ===================================================================== */
const BRINDES_API = '';
const BRINDES_LIMITE_DIA = 5; /* gerações com IA por CNPJ por dia (controle de custo) */
const BRINDES_CONDICOES = { minimo: null, prazo: null }; /* null = "a combinar com o Comercial" */

const BRINDES_PRODUTOS = {
  g800:  { x: .50, y: .60, esc: .16 },
  g25a:  { x: .44, y: .66, esc: .24 },
  g25l:  { x: .44, y: .62, esc: .26 },
  kitaz: { x: .40, y: .64, esc: .20 },
  kitli: { x: .40, y: .62, esc: .22 },
  quad:  { x: .38, y: .52, esc: .16 },
  red:   { x: .36, y: .52, esc: .18 },
  c300:  { x: .38, y: .50, esc: .18 },
  c269:  { x: .50, y: .60, esc: .28 }
};

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
   Referência 1 = foto do produto na cor escolhida; referência 2 = logo do cliente.
   Gravação a laser: em produto pintado aparece o inox prateado; em inox aparece marca grafite. */
function promptMockupBrinde(p, cor, pos) {
  const corEn = COR_EN[cor] || cor;
  const inox = COR_INOX.includes(cor);
  const kit = KIT_IDS.includes(p.id), copo = COPO_IDS.includes(p.id);
  const nome = PRODUTO_EN[p.id] || 'product';
  const lado = pos.x < .42 ? "slightly to the viewer's left of center" : pos.x > .58 ? "slightly to the viewer's right of center" : 'horizontally centered';
  const altura = Math.round(pos.y * 100), largura = Math.round(pos.esc * 100);
  const gravacao = inox
    ? 'laser etching: the logo appears as a fine dark matte graphite mark etched into the stainless steel surface, no paint, no sticker'
    : `laser engraving: inside the logo shapes the ${corEn} coating is removed and bright brushed stainless steel shows through, flush with the surface, no paint, no sticker`;
  const onde = kit ? 'on the front body of the jug (not on the cup)' : 'on the front body';
  const detalhes = p.id === 'g800'
    ? (cor === 'Azul Petróleo' ? ' Keep the exact cap: black top, navy blue ring at the base of the cap, black handle.' : ' Keep the exact cap and handle exactly as in reference 1.')
    : kit ? ' Keep every part of the kit exactly as in reference 1: the jug, its lever lid, the side cup holder, the cup and the bombilla straw.'
    : copo ? ' Keep the exact rim, walls and base exactly as in reference 1.'
    : ' Keep the exact lever lid and handle exactly as in reference 1.';
  return [
    `Commercial product mockup photograph on a clean neutral light-gray studio background with a soft natural floor shadow.`,
    `Use reference image 1 as the exact product: a ${nome} in ${corEn}, same shape, proportions, materials, finish and any existing factory markings.${detalhes}`,
    `Apply the logo from reference image 2 ${onde} as ${gravacao}.`,
    `Placement: ${lado}, logo center at about ${altura}% of the image height from the top, logo width about ${largura}% of the image width, following the curvature and perspective of the surface.`,
    `Do not redraw the logo: preserve exact letterforms, shapes and proportions, single color only, crisp edges.`,
    `— TECHNICAL — Subject: ${kit ? 'the complete kit as one group' : 'single product'}, same camera angle and framing as reference 1. Lighting: large softbox key from viewer's left, gentle fill, realistic metal reflections. Lens: 85mm, f/8, tack-sharp on the engraving. Color: true-to-life, neutral white balance. Sharpness: crisp edges, high microcontrast, no AI artifacts. Realism: real photograph, not CGI. Aspect ratio 1:1.`,
    `Fidelity Lock: product geometry, color, ${kit ? 'all kit parts' : copo ? 'rim and walls' : 'lid and handle'} and the logo design must stay unchanged; no extra text, no extra objects.`
  ].join(' ');
}
