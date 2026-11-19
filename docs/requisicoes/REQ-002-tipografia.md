# REQ-002 — Padronização da tipografia do League Scout

## 1. Contexto

Atualmente, a Home (`index.html`), o Login (`login.html`) e o Cadastro (`cadastro.html`) utilizam a fonte Barlow, herdada da Web Data Viz. O arquivo `public/css/estilo.css` importa essa fonte e contém declarações tipográficas com tamanhos e pesos distintos para banners, formulários e botões. O arquivo `public/css/navbar.css`, consolidado na REQ-001, também declara Barlow no botão Login.

A ausência de um padrão tipográfico centralizado dificulta a consistência visual entre as páginas atuais e as futuras interfaces administrativas do League Scout.

## 2. Objetivo

Estabelecer uma identidade tipográfica institucional, moderna e inspirada em interfaces de jogos, utilizando Montserrat para títulos e elementos de destaque e Inter para textos de leitura.

Centralizar a configuração das fontes, padronizar tamanhos e pesos e facilitar a reutilização desse padrão nas futuras telas, preservando a identidade visual e respeitando as restrições acadêmicas do `AGENTS.md`.

## 3. Escopo

### Dentro do escopo

- Substituir a Barlow por Montserrat e Inter na Home, Login, Cadastro e navbar compartilhada.
- Centralizar a importação das fontes e suas variáveis CSS.
- Padronizar famílias, tamanhos, pesos e alturas de linha dos textos conforme a seção 6.
- Ajustar os seletores tipográficos existentes em `public/css/estilo.css` e `public/css/navbar.css`, evitando regras redundantes ou conflitantes.
- Aplicar a tipografia a títulos, descrições, navegação, botões, campos, placeholders, links auxiliares e mensagens existentes.
- Realizar ajustes mínimos de espaçamento estritamente necessários para evitar cortes ou sobreposições causados pela mudança de fonte.

### Fora do escopo

- Alterar a estrutura visual, cores, logotipo, imagens de fundo, ícones ou conteúdo textual das páginas.
- Alterar a lógica, os links ou os estados da navbar implementada na REQ-001.
- Implementar o footer interativo, carrossel, dashboard ou novas páginas.
- Modernizar ou remover páginas e recursos legados do AquaTech, incluindo `simulador.html` e `public/dashboard/`.
- Alterar autenticação, formulários em seu comportamento, JavaScript, servidor, rotas, controllers, models, banco de dados ou variáveis de ambiente.
- Adicionar frameworks, bibliotecas, pacotes npm ou ferramentas de build.

## 4. Funcionalidades

### 4.1. Configuração centralizada

Utilizar uma única importação das fontes Montserrat e Inter, preferencialmente no início de `public/css/estilo.css`, por meio do Google Fonts (recurso já utilizado para Barlow no projeto). A utilização dessas duas fontes externas está autorizada nesta requisição, sem instalação de dependências.

Carregar somente os pesos necessários à hierarquia definida e utilizar `display=swap`. Definir as famílias em variáveis CSS no `:root`, seguindo o padrão existente:

```css
:root {
    --fonte-titulo: 'Montserrat', sans-serif;
    --fonte-texto: 'Inter', sans-serif;
}
```

As três páginas já carregam `estilo.css` antes de `navbar.css`. Reutilizar as variáveis no CSS da navbar, sem repetir a importação. Se futuramente a navbar for usada em outra página, essa página deverá carregar a configuração tipográfica compartilhada.

### 4.2. Aplicação nas páginas

- **Home:** aplicar Montserrat aos títulos do banner e aos títulos de seções existentes; aplicar Inter à descrição do banner e ao texto da seção Sobre mim (`.social`).
- **Login e Cadastro:** aplicar Montserrat aos títulos de apresentação e dos cards e aos botões; aplicar Inter aos textos explicativos, identificações dos campos, inputs, placeholders e mensagens. Distinguir os subtítulos dos cards dos spans internos dos formulários para evitar conflitos.
- **Navbar:** aplicar Montserrat aos links e ao botão Login, mantendo a estrutura, imagens, separador e estados de exibição definidos na REQ-001.

### 4.3. Consistência e reutilização

Utilizar as variáveis de fonte e os seletores existentes sempre que possível. Eliminar declarações tipográficas redundantes no escopo da requisição, sem excluir arquivos ou regras legadas que ainda sejam necessárias.

## 5. Regras de negócio

- A alteração é exclusivamente visual e não cria novas regras de negócio.
- Montserrat e Inter são as fontes oficiais adotadas para as interfaces do League Scout nesta requisição.
- O texto deve permanecer legível caso as fontes externas não carreguem, utilizando a fonte alternativa `sans-serif`.
- Não alterar identificadores de campos, eventos, funções, links, validações ou dados de sessão.
- Preservar o funcionamento da navbar para administradores logados e deslogados e para páginas internas.
- Utilizar CSS convencional, variáveis CSS e seletores simples. Não introduzir técnicas desconhecidas sem explicar e obter autorização, conforme o `AGENTS.md`.
- Como `estilo.css` é compartilhado com código legado, verificar os efeitos de mudanças globais. Restringir as alterações de família e tamanho às páginas `pagina-home` e `pagina-interna` quando necessário. Se Barlow ainda for necessária para páginas legadas, preservar seu carregamento e suas regras nesses contextos; não removê-la globalmente sem verificar o impacto.
- Caso seja necessário alterar a estrutura HTML para resolver problemas de tipografia, apresentar a necessidade no planejamento e aguardar autorização. Não realizar redesign.

## 6. Interface

### 6.1. Hierarquia tipográfica

| Elemento | Fonte | Tamanho | Peso |
|---|---|---:|---:|
| Título do banner da Home | Montserrat | 48px | 800 |
| Títulos de seções | Montserrat | 32px | 700 |
| Títulos dos formulários | Montserrat | 32px | 700 |
| Subtítulos | Montserrat | 20px | 600 |
| Links da navbar | Montserrat | 16px | 600 |
| Botões, incluindo Login | Montserrat | 16px | 600 |
| Descrição do banner | Inter | 20px | 400 |
| Textos comuns | Inter | 16px | 400 |
| Identificação dos campos | Inter | 16px | 600 |
| Inputs | Inter | 16px | 400 |
| Placeholders | Inter | 14px | 400 |

### 6.2. Aplicação e ajustes

- Títulos de apresentação à esquerda dos formulários: Montserrat, 32px, peso 700; descrições abaixo: Inter, 20px, peso 400.
- Subtítulos de apresentação de seção ou card com função de destaque: Montserrat, 20px, peso 600. Textos meramente explicativos dos cards e links auxiliares: Inter, 16px, peso 400.
- Mensagens de erro: Inter, mantendo destaque e legibilidade, sem alterar conteúdo ou comportamento.
- Usar altura de linha de referência de 1.2 para títulos e 1.5 para textos comuns e descrições, respeitando o espaço disponível.
- Preservar o separador vertical da navbar e as dimensões dos elementos gráficos; ele não é um link textual e não deve receber o tamanho de 16px da navegação.
- Não criar títulos, indicadores, tabelas ou campos que ainda não existem. A hierarquia de seções poderá ser reaproveitada em requisições futuras.
- Preservar os fundos, paleta existente, posicionamento geral dos elementos, tamanhos de imagens, bordas e estilo dos cards. Ajustes mínimos decorrentes da nova tipografia devem ser registrados.
- Conferir especialmente o cadastro, que possui quatro campos, evitando que textos ou botões ultrapassem os limites do card.

## 7. Critérios de aceitação

- [ ] Home, Login e Cadastro utilizam Montserrat e Inter conforme a hierarquia da seção 6, incluindo os elementos da navbar compartilhada.
- [ ] A configuração de Montserrat e Inter encontra-se centralizada, sem importações duplicadas dessas fontes nas folhas de estilo.
- [ ] As variáveis `--fonte-titulo` e `--fonte-texto` são reutilizadas nos seletores correspondentes.
- [ ] A inspeção dos estilos computados no navegador confirma as famílias, tamanhos e pesos especificados para os elementos existentes; eventuais exceções necessárias são apresentadas e aprovadas antes da implementação.
- [ ] As fontes estão efetivamente carregadas quando há conexão; sem acesso ao Google Fonts, os textos permanecem legíveis com a fonte alternativa.
- [ ] Os inputs, placeholders, botões, labels e links auxiliares apresentam a tipografia prevista, sem depender das fontes padrão do navegador.
- [ ] Não existem declarações conflitantes de Barlow nas três páginas do League Scout. Eventuais regras mantidas para o legado estão justificadas.
- [ ] A Home, Login e Cadastro preservam a identidade visual original e não apresentam cortes, sobreposições ou extravasamento de textos decorrentes da mudança tipográfica nas dimensões de tela testadas.
- [ ] A navbar mantém o comportamento da REQ-001 nos estados Home logada/deslogada e Login/Cadastro, sem mudança de links ou eventos.
- [ ] Não há mudanças no dashboard legado, JavaScript, autenticação, back-end, banco, dependências ou funcionalidades de outras requisições.
- [ ] O código permanece simples, comentado quando necessário e compatível com o `AGENTS.md`.

### Validação e entrega

Antes da implementação, apresentar o plano com os seletores e arquivos envolvidos, a estratégia para preservar as páginas legadas e eventuais impactos visuais. Aguardar aprovação do responsável.

Após a implementação, testar pelo servidor existente as três páginas, conferindo estilos computados, carregamento das fontes, comportamento da navbar e comparação visual antes/depois. Registrar as dimensões de tela usadas, os testes efetivamente realizados e suas limitações. Caso o problema preexistente de conexão ao banco no Cadastro impeça um teste, informar a limitação sem corrigir o back-end nesta requisição.

Apresentar ao responsável os arquivos modificados, a explicação das variáveis e seletores, os resultados dos testes, eventuais pendências e instruções de validação manual. Não atualizar `AGENTS.md` sem autorização explícita.
