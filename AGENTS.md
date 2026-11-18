# AGENTS.md — League Scout

## Visão geral

O League Scout é um projeto individual acadêmico inspirado em Pokémon Black e White, ambientado na região de Unova. A aplicação simula uma plataforma da Liga Pokémon para registro, consulta e administração de líderes de ginásio e dos Pokémon que compõem suas equipes.

A Home apresenta o projeto. A área administrativa é separada e possui acesso por autenticação, exclusivo dos administradores da Liga Pokémon. Os líderes de ginásio não acessam o sistema. As decisões atuais prevalecem sobre a documentação acadêmica inicial: dados de batalha estão fora do escopo desta versão e a revogação do título ocorre pela exclusão do registro do líder.

### Estado atual e escopo planejado

- Home, login e cadastro de usuários: interfaces existentes em HTML/CSS/JavaScript.
- Autenticação e cadastro: rotas existentes da Web Data Viz ainda dependem da estrutura AquaTech; adaptar mediante requisição específica.
- Dashboard: protótipo inicial no Figma, com indicadores de cadastro e listagem de líderes. Não confundir com o dashboard legado AquaTech.
- Três telas planejadas: cadastro/gerenciamento de líderes, cadastro/gerenciamento de Pokémon e visualização dos líderes e suas equipes.
- CRUD planejado: cadastrar, consultar, atualizar e excluir líderes e Pokémon de suas equipes. A revogação do título ocorre pela exclusão do líder. O comportamento da exclusão em relação aos Pokémon vinculados, as validações, os campos e os detalhes das interfaces serão definidos em especificações posteriores.
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
- `time_lider`: entidade presente no DER preliminar, originalmente pensada para múltiplas equipes por líder. A proposta foi descartada; a tabela não integra a modelagem pretendida e não deverá ser criada no novo script SQL.

A FK `pokemon.lider_ginasio_id` referencia `lider_ginasio`. Cada líder pode ter vários Pokémon em uma única equipe, e cada Pokémon cadastrado pertence a um líder. A equipe é representada pelos Pokémon associados diretamente ao líder, sem tabela intermediária. Não definir automaticamente limites de equipe, unicidade ou comportamento de exclusão dos Pokémon vinculados. Não tratar o DER como banco já implantado. A atualização do arquivo DER e a implementação do SQL deverão ocorrer em requisição específica.

## Padrões de desenvolvimento

- Manter a arquitetura e tecnologias existentes, priorizando soluções simples adequadas ao contexto acadêmico.
- Utilizar nomes claros e concisos para funções e variáveis, mantendo a convenção do código relacionado.
- Comentar funções e trechos relevantes, explicando sua finalidade e separando áreas do código quando necessário.
- Preservar a identidade visual: branco, cinza-escuro e vermelho; referências à quinta geração de Pokémon.
- Preservar a composição da Home, as artes existentes, o mapa de Unova no login e Castelia City no cadastro, salvo solicitação explícita.
- Reutilizar estilos e estruturas existentes quando apropriado; evitar refatorações não relacionadas à tarefa.
- Na adaptação da persistência, utilizar consultas parametrizadas e não registrar senhas ou credenciais em logs. Não armazenar ou retornar senhas em texto puro. Qualquer mudança de dependência necessária deverá ser aprovada.

## Cuidados e restrições

- Não adicionar funcionalidades, bibliotecas ou tecnologias fora do escopo autorizado.
- Não alterar identidade visual, arquitetura, banco de dados ou regras de negócio sem autorização específica.
- Não inventar decisões para as três telas planejadas. Registrar dúvidas e aguardar a definição do responsável.
- Não apagar arquivos legados automaticamente; verificar dependências antes de propor sua remoção.
- Não expor nem versionar credenciais reais. Não executar comandos destrutivos, realizar commits ou enviar alterações ao repositório sem autorização.
- O código legado contém consultas SQL interpoladas e logs de credenciais; não reproduzir essas práticas em novas funcionalidades. Propor correções específicas sem alterar áreas não solicitadas.

## Regra geral

Antes de implementar, ler este documento e a especificação da requisição. Inspecionar os arquivos envolvidos e distinguir o estado atual do estado desejado. Apresentar um plano de implementação, identificando arquivos, dependências e possíveis impactos. Solicitar aprovação para mudanças significativas, novas dependências ou decisões não especificadas. Implementar somente o escopo aprovado, validar os critérios de aceitação e informar os arquivos alterados, testes realizados e pendências. Atualizar esta documentação apenas quando autorizado.

> Versão 1.1 preliminar baseada no ZIP, no protótipo e nas decisões de escopo confirmadas pelo responsável. Requisitos acadêmicos obrigatórios, comportamento de exclusão dos Pokémon vinculados e detalhes das novas telas ainda aguardam confirmação.
