# REQ-004 — Carrossel de líderes de ginásio do League Scout

**Projeto:** League Scout  
**Tipo:** Especificação de front-end  
**Estado:** Aguardando planejamento e aprovação no OpenCode (modo Plan)  
**Documentos de referência:** `AGENTS.md`, REQ-001 (navbar), REQ-002 (tipografia), REQ-003 (footer).  
**Referência visual obrigatória:** `docs/referencias/carrossel-lideres-conceito.png` (fornecida pelo responsável; adicionar ao repositório antes do planejamento).

## 1. Contexto

O League Scout é uma plataforma acadêmica destinada à administração dos líderes de ginásio da região de Unova. A Home já conta com identidade visual própria, navbar compartilhada, tipografia padronizada e footer interativo. Falta implementar a seção de apresentação dos líderes em formato de carrossel.

O design foi inspirado nos cards de personagens do site oficial de Pokémon. A referência conceitual foi produzida com personagens de *Black/White 1* e possui dados ilustrativos **não válidos para esta requisição**. Ela serve apenas para ilustrar o **card central maior e em destaque, os cards laterais parcialmente visíveis, a divisão entre imagem e dados e as setas de navegação**. A referência NÃO autoriza alterar a navbar, o cabeçalho, os textos gerais da Home ou a paleta existente; tampouco deve ser reproduzida literalmente, pois contém nomes, textos e contagens ilustrativos que não correspondem integralmente a esta especificação.

**Referência oficial:** os oito líderes de ginásio da campanha de *Pokémon Black 2/White 2*: Cheren, Roxie, Burgh, Elesa, Clay, Skyla, Drayden e Marlon. **Roxie faz parte dos oito**, mas será adicionada apenas na futura simulação de cadastro. Por isso, **o carrossel começará com sete líderes** e passará a oito quando Roxie for cadastrada. Cilan, Lenora e Brycen não integram essa lista principal de oito ginásios.

## 2. Objetivo

Implementar, exclusivamente na Home do League Scout, um carrossel navegável manualmente, com um líder central em destaque e prévias parciais dos cards vizinhos, mostrando imagem local, nome, tipo e cidade de cada líder. Inicialmente, os dados serão simulados em JavaScript simples para posterior substituição por dados reais da API desenvolvida pelo responsável.

## 3. Escopo

### Dentro do escopo

- Criar ou finalizar a seção de líderes da Home, aproveitando a estrutura e os estilos existentes quando possível.
- Exibir card central maior e cards vizinhos parcialmente visíveis nas laterais, seguindo a referência conceitual.
- Navegar para frente e para trás por setas, de forma **manual**, com transição visual suave e simples.
- Apresentar inicialmente **sete líderes** de *Black 2/White 2*, conforme a seção 5, deixando Roxie reservada para o cadastro posterior.
- Carregar retratos **locais** a partir de `public/assets/imgs/lideres/`, sem imagens remotas.
- Organizar os dados simulados em estrutura simples, que permita futura integração com API sem alterar o desenho dos cards.
- Preservar a identidade tipográfica Montserrat/Inter e as cores institucionais do League Scout.
- Validar prioritariamente na resolução **1920 × 1080**, zoom do navegador em 100%.
- Implementar estados visuais simples para setas e imagem ausente, sem quebrar a página.

### Fora do escopo

- Inclusão antecipada de Roxie nos dados simulados iniciais, simulação do cadastro, CRUD, upload ou alteração de imagens pelo administrador.
- Integração com banco de dados ou API; modificação de models, controllers, rotas, SQL, sessão e autenticação.
- Alteração da navbar, formulários, dashboard, footer e páginas legadas da Web Data Viz.
- Bibliotecas ou frameworks de carrossel, React, Vue, animações complexas ou tecnologias não autorizadas no `AGENTS.md`.
- Responsividade completa para dispositivos móveis.
- Geração automática de imagens ou substituição por links externos caso algum arquivo local esteja faltando.

## 4. Funcionalidades

### 4.1 — Exibição inicial

Ao acessar a Home, apresentar o carrossel com um dos **sete líderes inicialmente cadastrados** no centro e partes dos seus vizinhos aparecendo nas bordas. Mostrar os dados do líder central com boa legibilidade. A ordem inicial deverá ser a ordem do array definido no código, e a escolha do primeiro card central deverá ser explicada no planejamento.

### 4.2 — Navegação manual

- Botão/seta **Anterior** e botão/seta **Próximo**.
- Cada acionamento muda o líder central em uma posição.
- Ao chegar ao último líder, o próximo avanço retorna ao primeiro; ao retroceder a partir do primeiro, retorna ao último (**navegação circular**).
- Não há avanço automático nem temporizador.
- Evitar saltos bruscos ou deslocamento de toda a página; fazer uma transição CSS simples e compreensível.
- O usuário também deve conseguir usar as setas por teclado, por serem botões HTML reais.

### 4.3 — Dados simulados

Manter um array JavaScript claro, com propriedades `nome`, `tipo`, `cidade` e `imagem`. A renderização deverá usar esse array como fonte única dos dados, sem duplicar manualmente o HTML de todos os cards.

### 4.4 — Imagens locais

Mostrar os retratos usando `<img>` com `alt` descritivo, `object-fit: contain` quando apropriado e preservação da proporção. Se faltar um arquivo, registrar a pendência e evitar que a imagem quebrada desorganize a interface. Não buscar automaticamente imagens externas.

## 5. Regras de negócio e dados iniciais

### 5.1 — Líderes a exibir

| Nome | Tipo | Cidade | Arquivo de imagem esperado |
|---|---|---|---|
| Cheren | Normal | Aspertia | `cheren.png` |
| Burgh | Inseto | Castelia | `burgh.png` |
| Elesa | Elétrico | Nimbasa | `elesa.png` |
| Clay | Terra | Driftveil | `clay.png` |
| Skyla | Voador | Mistralton | `skyla.png` |
| Drayden | Dragão | Opelucid | `drayden.png` |
| Marlon | Água | Humilau | `marlon.png` |

**Nota de contexto:** esta é a seleção inicial de sete dos oito líderes da campanha de *Pokémon Black 2/White 2*. **Roxie — Veneno — Virbank (`roxie.png`)** é a oitava líder oficial e será introduzida posteriormente pela simulação de cadastro e integração com a API. Não incluir Cilan, Lenora ou Brycen como líderes iniciais.

### 5.2 — Cadastro posterior de Roxie

Roxie, líder do tipo **Veneno** da cidade de **Virbank**, completa o conjunto de oito líderes de *Black 2/White 2*. Ela **não** deve constar no array inicial nem ser renderizada como card nesta REQ-004. Seu arquivo previsto para a etapa posterior é `public/assets/imgs/lideres/roxie.png`. A futura inserção será realizada pelo responsável pelo projeto durante a simulação do cadastro, sem implementação de CRUD agora.

### 5.3 — Regras para os dados

1. Mostrar exatamente os **sete líderes da tabela acima** inicialmente, sem inventar cadastros adicionais. Roxie é a oitava líder oficial e não deve ser pré-cadastrada.
2. Cada card deve mostrar somente **nome, tipo e cidade**, além da imagem. Não incluir estatísticas de batalha, insígnias ou equipes nesta requisição.
3. O indicador visual de tipo pode usar uma cor temática discreta, desde que mantenha contraste e não descaracterize a paleta do League Scout.
4. Imagens são arquivos locais, não URLs externas; o OpenCode deve verificar quais existem antes de implementar.
5. A Home não deve exigir autenticação para visualizar o carrossel.
6. Dados simulados são provisórios; a lógica do backend e sua integração serão desenvolvidas posteriormente pelo responsável.
7. Não modificar o modelo de banco de dados para acomodar esta funcionalidade agora.

## 6. Interface

### 6.1 — Referência conceitual

**Imagem de referência:** `docs/referencias/carrossel-lideres-conceito.png` (**referência apenas de layout; os personagens, nomes e contagens nela não correspondem necessariamente à seleção de Black 2/White 2**).

O OpenCode deverá **abrir e analisar a imagem** durante o planejamento. Reproduzir somente a composição do carrossel: imagem grande do líder na área cinza superior, faixa inferior cinza-escura com nome e dados, um card central maior e cards adjacentes parcialmente visíveis, setas nas laterais e transição entre cards.

**Atenção:** a imagem contém um cabeçalho e elementos gráficos ilustrativos, além de uma legenda de quantidade/lista de líderes que não deve ser copiada. O número correto para o carrossel inicial nesta requisição é **sete**; a campanha de *Black 2/White 2* possui **oito líderes**, incluindo Roxie, que será cadastrada posteriormente. A navbar e o restante da Home devem permanecer como no projeto real.

### 6.2 — Aparência dos cards

- Área superior: fundo cinza médio, imagem do líder com destaque, sem distorção.
- Área inferior: fundo cinza-escuro; nome bem visível; linhas para **Tipo** e **Cidade**.
- Fonte **Montserrat** para nomes/títulos e **Inter** para descrições e dados.
- Card central claramente maior ou mais destacado do que os vizinhos.
- Laterais visíveis parcialmente, indicando continuidade horizontal; evitar cortes desagradáveis de texto no card central.
- Botões de navegação com boa área clicável, sem cobrir o conteúdo do card central.
- Não adicionar elementos extras (barra de busca, navegação superior adicional, botões de perfil, detalhes do Pokémon, estatísticas ou badges não especificados) que apareçam apenas na arte conceitual.

### 6.3 — Tecnologias e arquivos

- Preferir HTML, CSS e JavaScript puro, com funções, condicionais, arrays e manipulação do DOM simples.
- Antes de escolher arquivos novos, inspecionar `public/index.html`, `public/css/estilo.css` e os scripts existentes; priorizar a estrutura atual do projeto e evitar duplicação.
- A pasta esperada de imagens é `public/assets/imgs/lideres/`.
- Caso algum dos sete PNGs iniciais não exista, listar exatamente os arquivos faltantes no plano e solicitar que sejam fornecidos; **não gerar imagens nem usar assets inventados sem autorização**.
- Evitar lógica sofisticada de transformação 3D, bibliotecas de terceiros, automação de movimentos ou abstrações desnecessárias.

### 6.4 — Resolução de apresentação

Priorizar **1920 × 1080**, navegador em 100%. Garantir que a seção seja bem proporcionada, sem rolagem horizontal inesperada, cortes no card central ou sobreposição com outras seções. Não é necessário criar suporte completo a dispositivos móveis; ajustes mínimos para não quebrar o layout são aceitáveis.

## 7. Critérios de aceitação

1. O carrossel aparece na Home sem modificar indevidamente navbar, footer, login, cadastro ou páginas legadas.
2. Há **exatamente sete líderes** nos dados simulados iniciais: Cheren, Burgh, Elesa, Clay, Skyla, Drayden e Marlon.
3. **Roxie, oitava líder de Black 2/White 2, não aparece** entre os cards iniciais; sua inclusão acontecerá na simulação futura de cadastro.
4. Card central com maior destaque visual e cards vizinhos parcialmente visíveis.
5. Cada card apresenta imagem local, nome, tipo e cidade corretos.
6. Setas avançam e retrocedem uma posição por acionamento, incluindo retorno circular entre primeiro e último.
7. Não existe avanço automático.
8. Transições são suaves, curtas e implementadas sem bibliotecas externas.
9. O carrossel pode ser operado por mouse e teclado.
10. A apresentação em 1920 × 1080 e zoom 100% não apresenta sobreposições, cortes no card central ou rolagem horizontal indevida.
11. A identidade visual original do League Scout e o padrão Montserrat/Inter são preservados.
12. Imagens faltantes são identificadas como pendência, sem download/substituição automática por imagens remotas.
13. Nenhum código do back-end, SQL, sessão, autenticação ou dependências é modificado.
14. O código fica comentado e compreensível para explicação acadêmica.
15. Antes do Build, o OpenCode apresenta a lista de arquivos a modificar, a solução técnica de transição, os assets existentes/ausentes e os testes propostos, aguardando aprovação.

---

## Prompt para o OpenCode — modo Plan

> Leia `@AGENTS.md` e `@docs/requisicoes/REQ-004-carrossel-lideres.md`. Abra também a referência visual `@docs/referencias/carrossel-lideres-conceito.png`.
>
> Analise os arquivos reais da Home e elabore o planejamento para a REQ-004, sem alterar código.
>
> O carrossel utilizará **sete líderes iniciais de Pokémon Black 2/White 2: Cheren, Burgh, Elesa, Clay, Skyla, Drayden e Marlon**. **Roxie é a oitava líder oficial**, porém ficará reservada para uma futura simulação de cadastro. Deve possuir **card central destacado, cards adjacentes parcialmente visíveis e navegação manual circular por setas**, usando HTML/CSS/JavaScript puro e imagens locais.
>
> Apresente: (1) arquivos a criar/alterar; (2) estrutura do HTML/CSS; (3) funções e estado de navegação; (4) lista dos sete arquivos de imagem iniciais com indicação do que realmente existe no projeto; (5) como os dados simulados serão substituídos futuramente por dados de API sem alterar o back-end agora; (6) riscos de layout em 1920×1080; (7) testes para os critérios de aceitação.
>
> Preserve REQ-001, REQ-002, REQ-003 e todas as restrições do `AGENTS.md`. A referência visual orienta somente o design do carrossel; **não autoriza recriar a navbar, copiar sua legenda ou utilizar a lista de líderes de Black/White 1 mostrada na imagem**. Não invente imagens e não acrescente dependências. **Permaneça em Plan e aguarde minha aprovação antes de editar qualquer arquivo.**
