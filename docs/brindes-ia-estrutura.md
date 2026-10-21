# Azarte — Brindes personalizados com IA (estrutura)
Pedido do Alisson (21/10/2026): página de brindes dentro do atacado, com uma aba em que o cliente escolhe o produto, sobe a marca dele e gera a imagem com os agentes de IA da Hum.
Regra dele: aceitam mockup só **copos, cuias, garrafinhas, garrafas e kits**. Bombas não (garrafões também ficaram de fora).

## O que já está no protótipo (ramo `uso-v15`, registro v1.7)
- Página `#brindes` (Como funciona) e `#brindes/monte` (Monte seu brinde), ligadas pelas abas do atacado, pelo rodapé e pelo quadro de login.
- Prévia na hora e grátis, no navegador: foto do produto na cor escolhida + logo em uma cor só, imitando a gravação a laser (sempre automática: prata nos coloridos, grafite no inox, igual à IA). Logo arrastável, tamanho ajustável, baixar a prévia em PNG.
- "Pedir orçamento": WhatsApp do Comercial com produto, cor, REF, quantidade e CNPJ.
- "Gerar 3 opções com IA": só para CNPJ logado, **3 tentativas por hora e 5 por dia por CNPJ** (`BRINDES_LIMITE_HORA`, `BRINDES_LIMITE_DIA`). Cada tentativa gera **3 opções em 16:9, sempre nesta ordem: 1 horizontal, 2 vertical, 3 logo completa** (regra do Alisson). Hoje roda em modo demonstração porque `BRINDES_API` está vazio.
- O cliente pode mandar **qualquer imagem** (foto, print, JPG com fundo). Na prévia ela entra sobreposta como veio (PNG transparente vira prévia gravada); na geração o prompt manda a IA isolar só a logo, ignorar fundo e cores e aplicar como gravação a laser sem cor.
- Configuração em `dados/brindes.js`: produtos aceitos e posição inicial da logo, limite por dia, condições (mínimo e prazo = "a combinar com o Comercial" até o Alisson definir), cores em inglês e o prompt-base.

## Como fica quando ligar a IA de verdade
```
Navegador (site)                      Servidor da Azarte (WordPress ou função na nuvem)          Motor de imagem
───────────────────                   ───────────────────────────────────────────────           ───────────────
cliente monta a prévia  ──POST──▶     /api/brindes/mockup                                        Magnific
pedido = {cnpj, produto, cor, ref,    1. confere login CNPJ, 3/hora e 5/dia                           (Nano Banana Pro 2K 1:1,
 quantidade, posicao, tinta,          2. guarda a logo (arquivo do cliente)                       75 créditos por mockup)
 fotoProduto, logo, previa, prompt}   3. chama o motor com referências [foto do produto, logo]  ◀──── imagem
                        ◀──JSON──     4. salva a imagem, registra custo e devolve {imagem: URL}
```
- A **chave do motor fica só no servidor**. Nunca no site (o site é público).
- O prompt já vem montado pelo site (`promptMockupBrinde`), no padrão do agente de imagens da Hum: inglês, logo pixel-fiel ("do not redraw the logo"), até 2400 caracteres, bloco TECHNICAL e Fidelity Lock. O servidor pode reforçar ou trocar o texto sem mexer no site.
- Manha do agente de imagens (mockup de 20/10/2026): tampa da 800 mL azul = topo preto + anel azul-marinho + alça preta; cinza = tudo preto. Já está no prompt. Escrita de logo pequena NÃO deve ser redesenhada pela IA: mandar a logo original em boa resolução.

## Controle de custo (regra fixa: geração paga com OK do Alisson)
- Só CNPJ aprovado gera; **3 tentativas por hora e 5 por dia por CNPJ**, cada uma com 3 imagens. No protótipo o limite fica só no navegador; na versão real ele TEM que ser controlado no servidor.
- Sugestão: fila aprovada pelo Comercial para clientes novos, e relatório semanal de créditos gastos.
- Estimativa: 75 créditos por imagem (Nano Banana Pro 2K) → **225 créditos por tentativa** (3 opções) → no máximo 1.125 créditos por dia por CNPJ (5 tentativas). Antes de ligar, o Alisson decide o orçamento mensal.

## Para o Alisson decidir antes de ligar
1. Quantidade mínima de peças e prazo de produção dos brindes (hoje "a combinar").
2. Onde hospedar o servidor (WordPress com função própria ou função na nuvem) e qual conta do Magnific usar.
3. Limite de mockups por cliente e orçamento mensal de créditos.
4. Se outras técnicas além da gravação a laser entram (cor, posição dupla, nome individual).
5. Garrafa Black Erva 4L ficou fora dos brindes (marca Black Erva e vai sair do site). Confirmar.
6. Fotos de linha já têm a marca AZARTE impressa em alguns modelos: o brinde sai com as duas marcas ou só a do cliente (versões Lisa)?
