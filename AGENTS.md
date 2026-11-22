# AGENTS.md — League Scout

## Visão geral

O League Scout é um projeto individual acadêmico inspirado em Pokémon Black e White, ambientado na região de Unova. A aplicação simula uma plataforma da Liga Pokémon para registro, consulta e administração de líderes de ginásio e dos Pokémon que compõem suas equipes.

A Home apresenta o projeto. A área administrativa é separada e possui acesso por autenticação, exclusivo dos administradores da Liga Pokémon. Os líderes de ginásio não acessam o sistema. As decisões atuais prevalecem sobre a documentação acadêmica inicial: dados de batalha estão fora do escopo desta versão e a revogação do título ocorre pela exclusão do registro do líder.

### Estado atual e escopo planejado

- Home, login e cadastro de usuários: interfaces existentes em HTML/CSS/JavaScript.
- Autenticação e cadastro: rotas existentes da Web Data Viz ainda dependem da estrutura AquaTech; adaptar mediante requisição específica.
- Dashboard: protótipo inicial no Figma, com indicadores de cadastro e listagem de líderes. Não confundir com o dashboard legado AquaTech.
- Três telas planejadas: cadastro/gerenciamento de líderes, cadastro/gerenciamento de Pokémon e visualização dos líderes e suas equipes.
- CRUD planejado: cadastrar, consultar, atualizar e excluir líderes e Pokémon de suas equipes. A revogação do título ocorre pela exclusão do líder.
- O DER do League Scout já existe, mas o script SQL da aplicação ainda é o da AquaTech.
- Fora do escopo: acesso administrativo pelos líderes, dados e estatísticas de batalha e múltiplas equipes por líder.

## Tecnologias

- HTML, CSS e JavaScript para o frontend, sem framework adicional definido.
- Node.js e Express para o backend, utilizando a base Web Data Viz da SPTech.
- MySQL e mysql2 para persistência e acesso ao banco.
- dotenv para configuração de ambiente, cors para CORS e nodemon para desenvolvimento.
- Figma para prototipação e MySQL Workbench para modelagem DER.
- Git e GitHub para versionamento.

Chart.js aparece no dashboard legado; seu uso no League Scout não está confirmado.

## Comandos

Executar no diretório `Projeto_Individual`, onde está o `package.json`:

```bash
npm install
npm start
npm run dev
```

`npm start` executa `node app.js`; `npm run dev` utiliza nodemon. O servidor utiliza `APP_HOST` e `APP_PORT` das configurações de ambiente. O `app.js` está configurado para desenvolvimento e carrega `.env.dev`; a configuração de produção utiliza `.env`.

Não existe script de testes automatizados declarado no `package.json` atual. Validar manualmente os fluxos afetados e registrar o que foi ou não testado. Não executar scripts destrutivos nem alterar o ambiente sem autorização.

## Arquitetura

```text
Projeto_Individual/
├── public/
│   ├── assets/          # imagens e ícones
│   ├── css/             # estilos das interfaces
│   ├── js/              # sessão e alertas
│   ├── dashboard/       # páginas legadas AquaTech
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   └── simulador.html  # arquivo existente da base
├── src/
│   ├── routes/          # definição das rotas
│   ├── controllers/     # tratamento das requisições
│   ├── models/          # operações de persistência
│   └── database/        # conexão e script SQL
├── app.js
├── package.json
├── .env
├── .env.dev
├── .gitignore
└── README.md
```

Preservar o fluxo frontend → rota → controller → model → banco de dados. O `app.js` serve os arquivos estáticos de `public` e registra as rotas da API. As rotas `/avisos`, `/medidas`, `/aquarios` e `/empresas` fazem parte da base legada; não assumir que pertencem ao escopo do League Scout nem removê-las sem analisar dependências e obter autorização.

O ZIP também contém, fora da raiz da aplicação, `DER_LeagueScout.mwb`, `Documentação/Documentação_V1.docx` e materiais de apoio da Web Data Viz.

### Modelagem atual (DER)

- `lider_ginasio`: id, nome, sexo, cidade, tipo, insignia, data_registro.
- `pokemon`: id, nome, nivel, tipo_primario, tipo_secundario, data_registro, lider_ginasio_id.
- `usuario_liga`: id, nome, email, senha.

A FK `pokemon.lider_ginasio_id` referencia `lider_ginasio`. Cada líder pode ter vários Pokémon em uma única equipe, e cada Pokémon cadastrado pertence a um líder. A equipe é representada pelos Pokémon associados diretamente ao líder, sem tabela intermediária. Não definir automaticamente limites de equipe ou unicidade. Não tratar o DER como banco já implantado. A atualização do arquivo DER e a implementação do SQL deverão ocorrer em requisição específica.

## Padrões de desenvolvimento

- Manter a arquitetura e tecnologias existentes, priorizando soluções simples adequadas ao contexto acadêmico.
- Utilizar nomes claros e concisos para funções e variáveis, mantendo a convenção do código relacionado.
- Comentar funções e trechos relevantes, explicando sua finalidade e separando áreas do código quando necessário.
- Preservar a identidade visual: branco, cinza-escuro e vermelho; referências à quinta geração de Pokémon.
- Preservar a composição da Home, as artes existentes, o mapa de Unova no login e Castelia City no cadastro, salvo solicitação explícita.
- Reutilizar estilos e estruturas existentes quando apropriado; evitar refatorações não relacionadas à tarefa.
- Na adaptação da persistência, utilizar consultas parametrizadas e não registrar senhas ou credenciais em logs. Não armazenar ou retornar senhas em texto puro. Qualquer mudança de dependência necessária deverá ser aprovada.

### Identidade tipográfica

O League Scout utiliza Montserrat e Inter como suas fontes oficiais.

- Montserrat: títulos, botões, links de navegação e indicadores.
- Inter: parágrafos, descrições, identificações de campos, inputs, placeholders e mensagens.

As fontes são importadas por meio do Google Fonts e centralizadas no arquivo `public/css/estilo.css`.

As novas interfaces deverão reutilizar as variáveis CSS `--fonte-titulo` e `--fonte-texto`, respeitando a hierarquia tipográfica estabelecida na REQ-002.

Não deverão ser adicionadas novas famílias tipográficas sem autorização do responsável pelo projeto.

A fonte Barlow permanece disponível exclusivamente para as páginas legadas da Web Data Viz que ainda dependem dela.

## Cuidados e restrições

- Não adicionar funcionalidades, bibliotecas ou tecnologias fora do escopo autorizado.
- Não alterar identidade visual, arquitetura, banco de dados ou regras de negócio sem autorização específica.
- Não inventar decisões para as três telas planejadas. Registrar dúvidas e aguardar a definição do responsável.
- Não apagar arquivos legados automaticamente; verificar dependências antes de propor sua remoção.
- Não expor nem versionar credenciais reais. Não executar comandos destrutivos, realizar commits ou enviar alterações ao repositório sem autorização.
- O código legado contém consultas SQL interpoladas e logs de credenciais; não reproduzir essas práticas em novas funcionalidades. Propor correções específicas sem alterar áreas não solicitadas.

## Limites de atuação da inteligência artificial

O OpenCode será utilizado prioritariamente para auxiliar no desenvolvimento do front-end da aplicação League Scout.

### Alterações permitidas

- Criação e estilização de páginas utilizando HTML e CSS.
- Implementação de interações visuais utilizando JavaScript.
- Criação de componentes reutilizáveis.
- Correção de problemas de layout e responsividade.
- Implementação das interfaces descritas nos documentos de especificação.
- Utilização temporária de dados simulados para validação visual.

### Alterações restritas

O desenvolvimento do back-end será realizado pelo responsável pelo projeto, com finalidade de aprendizado acadêmico.

Portanto, a inteligência artificial não deverá, sem autorização explícita:

- Criar ou modificar rotas da API.
- Implementar ou modificar controllers e models.
- Alterar scripts SQL ou a modelagem do banco de dados.
- Modificar a lógica de autenticação.
- Alterar configurações do servidor ou variáveis de ambiente.
- Implementar regras de negócio no back-end.

Caso uma implementação de front-end dependa de uma funcionalidade de back-end ainda inexistente, a inteligência artificial deverá informar essa dependência ao responsável pelo projeto, em vez de implementá-la automaticamente.

## Restrições de complexidade e finalidade acadêmica

O League Scout é um projeto individual acadêmico cujo objetivo também envolve o aprendizado e a aplicação dos conhecimentos adquiridos durante a graduação.

Toda implementação realizada pela inteligência artificial deverá respeitar o nível de conhecimento do responsável pelo projeto.

### Diretrizes obrigatórias

- Priorizar soluções simples, legíveis e de fácil manutenção.
- Utilizar estruturas de programação compatíveis com os conhecimentos e padrões já presentes no projeto.
- Não adicionar frameworks, bibliotecas ou dependências sem autorização explícita.
- Não utilizar técnicas avançadas de programação sem consultar previamente o responsável pelo projeto.
- Evitar abstrações desnecessárias, estruturas excessivamente complexas e soluções que dificultem a compreensão do código.
- Manter os nomes de variáveis e funções claros e coerentes com os padrões existentes.
- Adicionar comentários explicando o funcionamento das implementações quando necessário.
- Preservar a estrutura e os padrões de desenvolvimento da Web Data Viz quando aplicáveis.

### Validação de novos conceitos

Caso uma implementação necessite de um conceito, recurso ou técnica ainda não utilizada no projeto, a inteligência artificial deverá:

1. Apresentar o conceito ao responsável pelo projeto.
2. Explicar sua finalidade e funcionamento.
3. Informar por que sua utilização seria necessária.
4. Apresentar uma alternativa mais simples, quando possível.
5. Aguardar a autorização antes de implementar.

### Regra fundamental

O responsável pelo projeto deverá ser capaz de compreender, explicar, modificar e reproduzir todo código implementado pela inteligência artificial.

A simplicidade e a compreensão do código devem ser priorizadas em relação à sofisticação técnica da solução.

## Regra geral

Antes de implementar, ler este documento e a especificação da requisição. Inspecionar os arquivos envolvidos e distinguir o estado atual do estado desejado. Apresentar um plano de implementação, identificando arquivos, dependências e possíveis impactos. Solicitar aprovação para mudanças significativas, novas dependências ou decisões não especificadas. Implementar somente o escopo aprovado, validar os critérios de aceitação e informar os arquivos alterados, testes realizados e pendências. Atualizar esta documentação apenas quando autorizado.

## Regras de exclusão e integridade referencial

Cada líder de ginásio possui uma única equipe, composta pelos Pokémon vinculados ao seu registro no banco de dados.

A associação entre líderes e Pokémon será realizada por meio de um relacionamento de um para muitos (1:N), utilizando uma chave estrangeira na tabela `pokemon`.

### Exclusão de líderes

- A exclusão de um líder representa a revogação de seu título perante a Liga Pokémon.
- Ao excluir um líder, todos os Pokémon vinculados à sua equipe deverão ser excluídos automaticamente.
- A exclusão em cascata será garantida pelo banco de dados MySQL, utilizando a cláusula `ON DELETE CASCADE` na definição da chave estrangeira.
- Não deverão permanecer Pokémon sem um líder associado após a exclusão.

### Exclusão de Pokémon

- Um Pokémon poderá ser removido individualmente da equipe de um líder.
- A exclusão de um Pokémon não deverá afetar o registro do líder nem os demais Pokémon de sua equipe.

### Comportamento da interface

- Antes de excluir um líder, a interface deverá solicitar a confirmação do administrador.
- A mensagem de confirmação deverá informar que todos os Pokémon vinculados ao líder também serão excluídos.
- A exclusão individual de um Pokémon também deverá solicitar confirmação.

### Restrições de implementação

A implementação da integridade referencial e da exclusão em cascata no banco de dados será de responsabilidade do desenvolvedor do projeto.

A inteligência artificial deverá respeitar essa regra de negócio durante o desenvolvimento do front-end, sem modificar os scripts SQL ou implementar a lógica de exclusão no back-end sem autorização explícita.

### Prioridade de resolução e responsividade

O League Scout é um projeto acadêmico que será apresentado presencialmente à banca avaliadora, utilizando o computador do responsável pelo desenvolvimento.

Por esse motivo, o desenvolvimento das interfaces deverá priorizar a experiência em computadores desktop, especialmente na resolução utilizada para a apresentação.

Diretrizes:

- Priorizar a organização, a legibilidade e a aparência visual na resolução de referência.
- Não implementar adaptações para dispositivos móveis sem necessidade ou solicitação explícita.
- Evitar media queries e regras de responsividade excessivas.
- Garantir que os elementos principais permaneçam visíveis, sem cortes ou sobreposições na resolução de referência.
- Preservar os ajustes visuais realizados manualmente pelo responsável pelo projeto.
- Não comprometer a simplicidade do código para atender a resoluções que não fazem parte do objetivo da apresentação.

A responsividade completa não constitui um requisito obrigatório para a versão acadêmica atual do League Scout.