# Site AZARTE — guia para o desenvolvedor

Protótipo navegável da loja AZARTE (garrafas térmicas, copos, cuias, bombas e kits de tereré), feito pela **Hum Solução** para servir de referência visual e funcional da versão final.
**Versão final prevista:** WordPress + WooCommerce + integração com o **Bling**.

- Ver online: GitHub Pages deste repositório (link no "About").
- Rodar local: qualquer servidor estático na raiz (ex.: `python3 -m http.server 8000`) e abrir `http://localhost:8000`. Abrir o `index.html` direto pelo arquivo (`file://`) não funciona por causa das fotos e dos dados em arquivo separado.

## Estrutura
| Caminho | O que é |
|---|---|
| `index.html` | A página inteira (HTML + CSS + JavaScript, rotas por `#`). |
| `dados/produtos.js` | Produtos, famílias, cores com **código REF**, fotos por cor, preço de varejo (provisório), preço de atacado, banners (desktop e mobile), ícones. |
| `dados/brindes.js` | Configuração dos brindes personalizados: produtos aceitos, limites, condições, **prompt da IA**. |
| `img/produtos`, `img/banners`, `img/icones` | Fotos originais do catálogo (WebP), capas e ícones (o de Kits é SVG). |
| `fontes/` | Fonte HN (Helvetica Neue) nos pesos 100, 300, 500 e 800. |
| `docs/` | Catálogo 2026 (produtos, medidas, REF), regras e tabela de atacado, estrutura da IA dos brindes. |

Rotas: `#home`, `#cat/<familia>`, `#produto/<id>`, `#kit` (Monte seu Kit), `#atacado`, `#brindes` (vitrine) e `#brindes/monte` (personalizador).

## O que o protótipo simula e precisa virar real
- **Modo demonstração (`MODO_DEMO` em `dados/produtos.js`)**: hoje está `true` para o link público. O botão "Entrar no atacado" entra sem CNPJ e sem senha, para os donos verem a galeria e os preços de atacado. No site final, mudar para `false` e ligar o login de verdade.
1. **Preço e estoque (Bling).** Sem login o site mostra sempre o preço B2C (varejo) vindo do Bling. Os preços de varejo no `produtos.js` são provisórios. "Indisponível" deve sair automático pelo estoque do Bling. Fotos: hoje as do catálogo, com opção de trocar pelas do Bling.
2. **Atacado B2B (CNPJ).**
   - Cadastro com CNPJ, razão social, responsável e WhatsApp; o Comercial aprova.
   - Logado e aprovado, o site libera a tabela de atacado. Ela é **própria, editável no painel e não vem do Bling** (ver `docs/atacado-regras-e-precos.md`). A garrafa 2,5L tem preço por cor (inox x colorida).
   - Pedido mínimo de **R$ 500,00 em produtos**, misturando quantos itens quiser; **frete à parte, não conta no mínimo**.
   - Pedido de atacado hoje vai para o WhatsApp do Comercial com CNPJ, REF, quantidades e total.
3. **Pessoa Física x CNPJ** no login (duas abas). Login com Google para PF (versão final).
4. **Monte seu Kit**: vagas Garrafa / Copo ou cuia / Bomba com montagem visual. A família "Kits" (prontos) é separada do Monte seu Kit.
5. **Brindes corporativos** (`#brindes`): ver `docs/brindes-ia-estrutura.md`.
   - Montar a arte é livre. **Gerar o mockup com IA e salvar a arte só com cadastro (CNPJ)**.
   - Só versões **limpas** (sem marca AZARTE): Garrafinha Lisa 800 mL, Garrafa Lisa 2,5 L e Kit LISA.
   - A IA gera sempre **3 opções em 16:9, nesta ordem: 1 horizontal, 2 vertical, 3 logo completa**. O cliente pode girar a logo (o ângulo vai para a opção 3).
   - Limite: **3 tentativas por hora e 5 por dia por CNPJ**, aplicado no servidor.
   - Quantidade mínima: **25 peças** (por ora, editável). Prazo e preço: combinados pelo WhatsApp do Comercial.
   - A chave do motor de imagem fica **só no servidor**. O site manda o pedido para `BRINDES_API`, que hoje está vazio, por isso o protótipo roda em demonstração.
6. **Banners**: cada banner com dois campos de imagem, desktop e mobile.
7. **Pix com 5% de desconto** (varejo). Parcelamento e frete grátis: a definir pela Azarte.
8. **LGPD**: aviso de cookies na versão final.
9. Carrinho, favoritos, kit, login e artes salvas hoje ficam só na memória do navegador. Na versão final ficam na conta.

## Dados da empresa (rodapé)
AZARTE E-COMMERCE LTDA · CNPJ 26.174.911/0001-29 · Loc. Celso Garcia Cid, 130, Barracão 03, Box 69 · Jardim Sabará · Londrina-PR · CEP 86.066-230.
WhatsApp do Comercial: +55 44 99183-2018 · Instagram: @azarte.oficial.

## Identidade
Bege `#97936D`, bege claro `#F5F4EF`, linha `#E7E5DA`, preto `#0B0B0A`, cinza `#6B6B66`. Fonte HN.
Títulos de produto sempre em 3 linhas: tipo (fino) / modelo (negrito) / complemento (fino). Fino e negrito só trocam entre palavras inteiras.

Contato do projeto: Hum Solução (Maringá-PR).
