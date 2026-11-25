# REQ-005 — Dashboard administrativa do League Scout

**Projeto:** League Scout  
**Tipo:** Especificação de front-end — primeira versão visual com dados simulados  
**Situação:** Aguardando planejamento, revisão e aprovação (OpenCode — modo Plan)  
**Documentos de referência:** `AGENTS.md`, REQ-001 (navbar), REQ-002 (tipografia), REQ-003 (footer), REQ-004 (carrossel de líderes).  
**Referência visual:** `docs/referencias/dashboard-conceito.png` (**caminho obrigatório dentro do repositório**).

> **Preparação obrigatória:** o responsável deverá colocar a imagem conceitual fornecida junto com esta requisição exatamente em `docs/referencias/dashboard-conceito.png`. O OpenCode deverá abrir/consultar esse arquivo durante o planejamento. Se o arquivo não existir, registrar a pendência; não criar, substituir, baixar ou inventar outra referência.

## 1. Contexto

O League Scout é uma plataforma acadêmica voltada à administração dos líderes de ginásio e seus Pokémon na região de Unova, tendo **Pokémon Black 2 / White 2** como referência de personagens. A Home já conta com navbar compartilhada, identidade tipográfica, footer interativo e carrossel de líderes. Esta requisição aborda a **Dashboard administrativa**, destinada ao administrador da Liga Pokémon.

O protótipo original possui um menu lateral à esquerda, quatro KPIs na faixa superior e, abaixo, **uma tabela de líderes à esquerda e um gráfico à direita**. A imagem conceitual `docs/referencias/dashboard-conceito.png` deve orientar o estilo e a distribuição geral desses elementos, mas **não é uma fonte de dados confiável**: contém números fictícios, nomes repetidos e a personagem Roxie, que ainda não foi cadastrada. Em caso de conflito, **as regras desta requisição prevalecem sobre a imagem**.

A referência visual é ilustrativa, não uma ordem para copiar literalmente seus números, datas, nomes, insígnias ou quantidades.

## 2. Objetivo

Criar a primeira versão de interface da Dashboard administrativa, utilizando **HTML, CSS e JavaScript puro**, dados simulados e um **gráfico de barras horizontais agrupadas** para comparar vitórias e derrotas dos líderes. A tela deverá privilegiar a visualização da tabela e do gráfico **lado a lado**, com prioridade para o desktop em **1920 × 1080 (zoom 100%)**.

A integração com API, o cadastro de Roxie, as alterações de banco e a autenticação definitiva não fazem parte desta requisição e serão realizados posteriormente pelo responsável pelo projeto.

## 3. Escopo

### 3.1 — Dentro do escopo

- Criar ou adaptar **somente o front-end da Dashboard** em sua localização real no repositório, a ser identificada no Plan. Há uma página em `public/dashboard/dashboard.html` no ZIP anteriormente analisado; **verificar o estado atual do projeto antes de alterar qualquer arquivo**.
- Reproduzir a organização geral da referência: sidebar, título, quatro KPIs, tabela de líderes e gráfico de desempenho.
- Manter **tabela e gráfico lado a lado**, mesmo com sete líderes inicialmente; avaliar proporções legíveis sem exigir rolagem vertical na resolução de referência, se possível.
- Exibir sete líderes iniciais, deixando Roxie para uma futura simulação de cadastro.
- Preparar os componentes visuais para que um oitavo líder apareça posteriormente por meio de dados, **sem codificar um card ou uma barra de Roxie antecipadamente**.
- Construir os dados simulados em um único local e evitar duplicação manual de valores entre KPIs, tabela e gráfico.
- Utilizar Montserrat e Inter, a identidade branco/cinza-escuro/vermelho e os recursos locais existentes quando aplicáveis.
- Manter código simples, explicável e comentado apenas quando necessário.
- Incluir estados simples para lista vazia e dados ausentes, sem quebrar a página.

### 3.2 — Fora do escopo

- Alterar SQL, tabelas, colunas, modelos, controllers, rotas, API, backend, sessão ou autenticação.
- Cadastrar Roxie, implementar CRUD de líderes ou Pokémon, upload, edição ou exclusão nesta etapa.
- Criar histórico individual de batalhas, sistema de resultados por partida ou telas de batalhas.
- Instalar frameworks, bibliotecas novas ou dependências sem autorização.
- Modificar a Home, o carrossel, o footer, os formulários de login/cadastro ou a navbar compartilhada sem autorização.
- Tornar obrigatória a responsividade completa para celulares.
- Copiar dados ilustrativos da imagem como se fossem registros reais.

## 4. Funcionalidades e regras de negócio

### 4.1 — Sidebar e estrutura

- Sidebar vertical à esquerda com a identidade visual do League Scout e navegação **Líderes** e **Pokémon**, como no protótipo do responsável.
- A sidebar da Dashboard **não deve substituir nem modificar automaticamente** a navbar compartilhada da Home.
- O OpenCode deverá verificar se existem páginas de destino reais. Se ainda não existirem, indicar que a navegação está pendente, sem inventar rotas nem funcionalidades de cadastro.
- Título principal: **Dashboard**.

### 4.2 — Quatro KPIs superiores

| KPI | Regra de exibição |
|---|---|
| Primeiro líder cadastrado | Nome do registro **mais antigo na ordem de cadastro**; pode mostrar a data apenas se ela existir nos dados utilizados. |
| Último líder cadastrado | Nome do registro **mais recente na ordem de cadastro**; pode mostrar a data apenas se ela existir nos dados utilizados. |
| Líderes cadastrados | Quantidade atual de registros de líderes, exibida junto ao **limite de 8**. Inicialmente, no cenário simulado previsto, **7 de 8**. |
| Pokémon cadastrados | Quantidade de Pokémon registrados, exibida junto ao **limite que for confirmado pelo responsável**. Não presumir que o valor ilustrativo `42 de 48` da imagem seja real ou que 48 já esteja definido no banco. |

**Atenção à ordenação:** a primeira e a segunda KPI **não representam** “primeiro líder da Pokédex”, ordem alfabética, líder destacado ou jogador com mais vitórias. Representam o **primeiro e o último que foram efetivamente cadastrados**. Para a simulação, usar uma ordem de cadastro explicitamente documentada; futuramente o responsável escolherá como buscá-la no banco (por exemplo, `data_cadastro` e/ou ID em ordem de inserção).

Não fixar o nome **Roxie** na KPI de último líder. Roxie **ainda não está cadastrada** nesta versão e, portanto, **não pode aparecer em nenhuma KPI, linha da tabela ou barra do gráfico**. A imagem conceitual mostra Roxie unicamente como parte de uma ilustração anterior, sem validade para os dados iniciais.

Caso não existam líderes, as KPIs de primeiro e último devem ter um estado legível, como `Nenhum líder cadastrado`, sem erro de JavaScript.

### 4.3 — Tabela de líderes (coluna esquerda)

Exibir os líderes cadastrados em uma tabela ou listagem semântica com, inicialmente, estas informações:

- **Nome**;
- **Cidade**;
- **Tipo**;
- **Insígnia** (nome ou representação visual, usando somente informação/arquivo disponível; não inventar assets nem depender de links externos).

Se o retrato local estiver disponível, o OpenCode poderá propor uma miniatura junto do nome, desde que isso não comprometa o espaço nem exija copiar recursos não existentes.

A tabela deve permitir visualizar os **sete líderes iniciais** com boa legibilidade. Deixar possível acrescentar um oitavo registro sem reescrever todo o HTML. Para campos ainda não definidos, usar um marcador neutro e informar a pendência, em vez de atribuir dados fictícios como se fossem definitivos.

### 4.4 — Gráfico de vitórias e derrotas (coluna direita)

- Gráfico com **barras HORIZONTAIS agrupadas**, com duas barras por líder: **vitórias em verde** e **derrotas em vermelho**.
- Cada líder cadastrado deverá aparecer em uma linha do eixo vertical; o eixo horizontal mostrará quantidades inteiras de resultados.
- Inicialmente, mostrar **sete grupos de barras**, pois somente sete líderes estarão cadastrados. Depois do cadastro de Roxie, deverão ser possíveis **oito grupos** a partir dos dados atualizados.
- Usar a **mesma fonte de dados da tabela**; não duplicar manualmente a lista de líderes em outra estrutura inconsistente.
- Como os valores de vitórias/derrotas ainda não existem no banco, usar **números simulados claramente identificados**, sem alegar que representam batalhas reais.
- Prever valores zero e o caso de todos os resultados iguais a zero; o gráfico não deverá falhar nem gerar escalas inválidas.
- Permitir comparar os sete (e futuramente oito) líderes sem precisar selecionar um líder na tabela.
- Manter a **tabela e o gráfico lado a lado**. Não trocar automaticamente o gráfico por colunas verticais e não colocar o gráfico em uma nova linha no layout desktop de referência.
- O uso de **Chart.js** só poderá ocorrer se já estiver disponível no projeto e compatível com o `AGENTS.md`; no Plan, verificar e justificar. Não instalar dependências novas sem autorização. Se não for viável, apresentar uma alternativa simples para aprovação **antes** da implementação.

### 4.5 — Dados simulados iniciais

A seleção inicial deve ser composta exclusivamente por estes sete líderes da campanha de *Pokémon Black 2 / White 2*:

| Líder | Tipo | Cidade |
|---|---|---|
| Cheren | Normal | Aspertia |
| Burgh | Inseto | Castelia |
| Elesa | Elétrico | Nimbasa |
| Clay | Terra | Driftveil |
| Skyla | Voador | Mistralton |
| Drayden | Dragão | Opelucid |
| Marlon | Água | Humilau |

**Roxie — Veneno — Virbank é a oitava líder oficial da campanha, mas está RESERVADA à futura simulação de cadastro do responsável. NÃO incluí-la nos dados simulados iniciais, na tabela, no gráfico, nas KPIs ou em qualquer resultado contado como registro ativo.**

Os dados de `vitorias`, `derrotas`, `insignia`, `dataCadastro` e os dados de Pokémon que ainda não estiverem presentes no repositório precisam ser tratados como **provisórios** ou como pendências. Não inventar datas reais de cadastro nem uma ordem histórica sem informar explicitamente que são demonstrativas. Não assumir que Roxie foi cadastrada apenas porque a arte conceitual a mostra.

## 5. Interface e referência conceitual

### 5.1 — Caminho exato da imagem

**Arquivo a adicionar pelo responsável:**

```text
docs/referencias/dashboard-conceito.png
```

**Arquivo da requisição:**

```text
docs/requisicoes/REQ-005-dashboard-administrativa.md
```

O OpenCode deverá consultar essa referência durante o planejamento. A figura orienta **composição, hierarquia e identidade visual**, mas contém inconsistências deliberadamente desconsideradas pela especificação: Roxie, registros de exemplo, eventual repetição de líderes, datas e totais de demonstração. O protótipo do responsável prevalece quanto ao desejo de **manter tabela e gráfico lado a lado**; esta especificação prevalece quanto aos dados e regras.

### 5.2 — Distribuição desejada

1. **À esquerda:** barra lateral escura, com logo e navegação de Líderes/Pokémon.
2. **Parte superior da área principal:** título Dashboard e uma fileira com **quatro KPIs**.
3. **Parte inferior esquerda:** tabela de líderes.
4. **Parte inferior direita:** gráfico de barras **horizontais** de vitórias/derrotas.
5. Utilizar cartões claros, texto cinza-escuro, destaques vermelhos e indicação verde/vermelha das duas séries do gráfico.

**Resolução de prioridade:** 1920 × 1080, zoom 100%, desktop. Priorizar o encaixe dos painéis visíveis na tela, mas **não sacrificar legibilidade nem cortar linhas da tabela ou barras** só para eliminar a rolagem vertical. Se for impossível acomodar tudo corretamente sem rolagem, explicar no Plan as medidas propostas e o compromisso adotado.

### 5.3 — Estilo e acessibilidade

- Priorizar estilos específicos da Dashboard e preservar CSS da Home.
- Reutilizar variáveis e fontes existentes sempre que possível.
- Mostrar títulos de KPIs, nomes e números com contraste suficiente.
- Não depender **somente das cores** do gráfico: manter legenda textual “Vitórias”/“Derrotas” e identificação dos líderes.
- Usar elementos HTML semânticos e foco visível para controles de navegação reais.
- Caso sejam acrescentadas animações discretas, respeitar `prefers-reduced-motion`.

## 6. Preparação para integração futura (SEM implementar nesta REQ)

O responsável pelo projeto desenvolverá posteriormente o back-end em Node.js/Express e as consultas MySQL. No futuro, a tabela de líderes poderá conter campos inteiros **`vitorias`** e **`derrotas`**, com padrão zero e valores não negativos, caso essa modelagem seja aprovada. **Não executar `ALTER TABLE`, migrações ou alterações SQL agora.**

Os dados usados pela Dashboard deverão ser organizados para futura substituição por uma resposta da API sem refazer os componentes visuais. O formato exato de endpoint e resposta JSON deverá ser definido pelo responsável; não presumir que já exista `/lideres`.

Ao cadastrar Roxie futuramente, a contagem de líderes deverá passar de sete para oito, ela deverá aparecer na tabela e no gráfico, e as KPIs de primeiro/último deverão refletir a ordem real de cadastro. A quantidade de Pokémon e seu limite serão definidos/validados separadamente.

## 7. Critérios de aceitação

1. Dashboard acessível na localização real proposta e aprovada, preservando a Home e outras páginas.
2. Sidebar, título e **quatro KPIs** conforme descrito.
3. Primeira e última KPI correspondem à ordem de cadastro simulada — **não** à posição no array de exibição por tipo/cidade nem aos resultados de batalha.
4. Contagem inicial de líderes **7 de 8**; a quantidade de Pokémon e o limite não são assumidos como reais a partir da arte.
5. Tabela à esquerda e gráfico **horizontal** à direita em 1920 × 1080.
6. Exatamente **sete líderes** iniciais nos dados, tabela e gráfico: Cheren, Burgh, Elesa, Clay, Skyla, Drayden e Marlon.
7. **Roxie ausente** do conjunto de dados inicial, da tabela, do gráfico e das KPIs, mesmo que apareça na imagem conceitual.
8. Gráfico com duas séries diferenciadas por cor e legenda: vitórias (verde) e derrotas (vermelho), uma dupla por líder.
9. Valores simulados claramente diferenciados de dados reais; sem inventar datas/insígnias obrigatórias inexistentes.
10. Sem barras cortadas, informações sobrepostas ou rolagem horizontal indesejada no desktop de referência.
11. Nenhum backend, SQL, rota, autenticação, navbar compartilhada, Home ou dependência alterada sem aprovação.
12. Código legível, organizado, com explicação dos arquivos e lógica para revisão acadêmica.
13. Tela lida e operada com mouse/teclado onde houver controles; contraste e legendas adequados.
14. Existência da imagem em `docs/referencias/dashboard-conceito.png` conferida; se faltar, pendência declarada no Plan.
15. Sem commits automáticos e sem implementação antes da aprovação do planejamento.

## 8. Entrega esperada do planejamento (modo Plan)

Antes de modificar os arquivos, apresentar:

1. Verificação do estado atual do repositório: página de Dashboard existente, seus CSS/JS, links, assets, bibliotecas e limites do `AGENTS.md`.
2. Lista exata dos arquivos a criar ou modificar e motivo de cada alteração.
3. Estrutura HTML da sidebar, KPIs, tabela e gráfico.
4. Estratégia CSS para manter **tabela e gráfico lado a lado**, com dimensões propostas para 1920 × 1080.
5. Escolha da implementação do gráfico horizontal (verificando se Chart.js já está disponível), sem instalar bibliotecas sem autorização.
6. Formato do conjunto único de dados simulados, incluindo tratamento da ordem de cadastro, quantidades de Pokémon e vitórias/derrotas.
7. Confirmação explícita de que serão **sete líderes inicialmente e Roxie ficará excluída**.
8. Itens que dependem de assets, modelos de banco ou regras ainda não definidas, sem inventá-los.
9. Riscos de legibilidade e scroll, com alternativas simples.
10. Plano de testes de layout, contagens, KPIs, tabela e gráfico.

**Não implementar neste momento. Aguardar o responsável revisar e aprovar o Plan.**

## 9. Prompt para o OpenCode — modo Plan

> Leia `AGENTS.md` e `docs/requisicoes/REQ-005-dashboard-administrativa.md`. Consulte obrigatoriamente a imagem de referência em `docs/referencias/dashboard-conceito.png`; se ela não estiver presente, informe a pendência e não invente uma substituição.
>
> Planeje a implementação da Dashboard administrativa do League Scout, em **HTML, CSS e JavaScript puro**, respeitando as limitações acadêmicas e os arquivos atuais do projeto. A composição obrigatória é: sidebar à esquerda, quatro KPIs no topo e, abaixo, **tabela de líderes à esquerda com gráfico de barras HORIZONTAIS à direita**. A resolução principal é 1920 × 1080.
>
> **Regra essencial:** os oito líderes oficiais de *Black 2 / White 2* incluem Roxie, mas **Roxie ainda não foi cadastrada** e só entrará na simulação posterior. Portanto, esta etapa deve usar **sete líderes** — Cheren, Burgh, Elesa, Clay, Skyla, Drayden e Marlon — na tabela, no gráfico e nas contagens. **Não copie Roxie, datas, totais ou nomes repetidos da imagem conceitual.**
>
> As KPIs são: (1) primeiro líder cadastrado (mais antigo); (2) último líder cadastrado (mais recente); (3) líderes cadastrados/limite 8; (4) Pokémon cadastrados/limite ainda a validar. O gráfico terá vitórias em verde e derrotas em vermelho, com valores inicialmente simulados. Use a mesma fonte de dados para KPIs, tabela e gráfico sempre que aplicável.
>
> **Não altere** backend, rotas, models, banco, autenticação, Home, navbar compartilhada nem dependências. A futura inclusão dos campos `vitorias` e `derrotas`, as consultas SQL e a integração da API serão feitas por mim. Verifique se Chart.js já existe antes de recomendá-lo, sem adicionar bibliotecas automaticamente.
>
> Apresente os arquivos a criar/alterar, a estrutura HTML, o layout CSS, a lógica do gráfico e os dados simulados, os riscos e os testes. **Permaneça no modo Plan, sem escrever código, editar arquivos ou fazer commits.**
