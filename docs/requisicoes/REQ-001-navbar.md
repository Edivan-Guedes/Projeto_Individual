# REQ-001 — Componentização da navbar e controle de exibição por sessão

## 1. Contexto

Atualmente, as páginas Home (`index.html`), Login (`login.html`) e Cadastro (`cadastro.html`) do League Scout possuem suas próprias estruturas HTML de navegação. A estilização está dividida entre `css/navbar.css` e `css/navbar-login-cadastro.css`.

Essa organização gera repetição de código e dificulta a manutenção. Além disso, a Home deverá apresentar elementos diferentes dependendo do estado de autenticação do administrador.

## 2. Objetivo

Centralizar a estrutura HTML da navbar em um único arquivo reutilizável, permitindo que as páginas compartilhem o mesmo componente e que os elementos exibidos sejam controlados conforme a página atual e o estado da sessão do usuário.

Preservar a identidade visual e utilizar soluções simples, compatíveis com o AGENTS.md e os conhecimentos do responsável pelo projeto.

## 3. Escopo

### Dentro do escopo

- Criar o componente `public/components/navbar.html`.
- Centralizar a estilização da navbar em `public/css/navbar.css`, preservando as diferenças visuais necessárias entre as páginas.
- Criar `public/js/navbar.js` para carregar o componente e controlar sua exibição.
- Substituir as estruturas repetidas da navbar nas páginas Home, Login e Cadastro pelo componente compartilhado.
- Exibir o botão Login ou o ícone de perfil na Home de acordo com o estado da sessão.
- Direcionar o administrador ao dashboard ao clicar no ícone de perfil.
- Testar os estados da interface utilizando uma sessão simulada, se necessário.

### Fora do escopo

- Implementação ou alteração da autenticação, cadastro de usuários ou logout.
- Alteração de rotas, controllers, models, banco de dados, servidor ou variáveis de ambiente.
- Implementação do dashboard administrativo e sua sidebar.
- Criação de página de perfil, menu suspenso ou novos níveis de acesso.
- Alterações no carrossel, footer, tipografia geral ou outras áreas da aplicação.

## 4. Funcionalidades

- Carregar o mesmo arquivo HTML da navbar nas três páginas, utilizando JavaScript puro.
- Na Home, exibir a logo, os links Sobre mim e Líderes, o separador e o botão Login quando não houver sessão.
- Na Home, substituir exclusivamente o botão Login pelo ícone de perfil quando houver sessão. O ícone deverá direcionar ao dashboard administrativo.
- Nas páginas Login e Cadastro, exibir somente a logo e o ícone de Home, independentemente da sessão. O ícone deverá direcionar a `index.html`.
- O botão Login deverá direcionar a `login.html`.
- Preservar os links existentes de Sobre mim e Líderes; seus destinos definitivos poderão ser tratados em outras requisições.

## 5. Regras de negócio

- Somente administradores da Liga Pokémon utilizam a área autenticada.
- Na Home, a ausência de uma sessão reconhecida deverá resultar na exibição do botão Login.
- A exibição do ícone de perfil deverá seguir o padrão de sessão existente na Web Data Viz. No código atual, `sessao.js` consulta `EMAIL_USUARIO` e `NOME_USUARIO`; a navbar deverá apenas ler essas informações, sem alterar a autenticação.
- O botão Login e o ícone de perfil não deverão ser exibidos simultaneamente.
- A navbar de Login e Cadastro terá prioridade sobre a condição de sessão: nessas páginas, deverá ser exibido o ícone de Home.
- Não utilizar `validarSessao()` diretamente na Home para controlar a navbar, pois a função existente redireciona usuários deslogados e depende do elemento `b_usuario`.
- O controle visual por `sessionStorage` não representa uma proteção de acesso. A autenticação e a autorização efetivas serão tratadas pelo responsável pelo back-end.
- Não adicionar dados de sessão fictícios permanentemente ao código. A simulação deverá ocorrer apenas durante os testes.
- Respeitar integralmente as restrições do AGENTS.md. Priorizar HTML, CSS e JavaScript puro, utilizando `fetch()`, `innerHTML`, `if`, `else` e manipulação simples do DOM, desde que os recursos sejam conhecidos ou aprovados pelo responsável.
- Antes de implementar, apresentar o planejamento, os arquivos que serão alterados e a solução proposta. Aguardar aprovação para iniciar as alterações.

## 6. Interface

Preservar o estilo das três navbars apresentadas pelo responsável: fundo branco, logo League Scout à esquerda, borda inferior vermelha, elementos alinhados à direita e utilização das imagens já existentes no projeto.

| Página / estado | Elementos exibidos |
| --- | --- |
| Home — deslogado | Logo, Sobre mim, Líderes, separador e botão Login |
| Home — logado | Logo, Sobre mim, Líderes, separador e ícone de perfil |
| Login e Cadastro | Logo e ícone de Home |

Manter as proporções, espaçamentos, cores e comportamento visual atuais, sem redesenhar a navbar. Utilizar os recursos de imagem existentes, verificando os caminhos após o carregamento do componente.

Estrutura proposta:

```text
public/
├── components/
│   └── navbar.html
├── css/
│   └── navbar.css
├── js/
│   └── navbar.js
├── index.html
├── login.html
└── cadastro.html
```

**Pendência:** o dashboard definitivo do League Scout ainda não foi implementado. O caminho de redirecionamento deverá ser identificado no planejamento e confirmado pelo responsável; não criar uma nova página de dashboard nem assumir que o dashboard legado do AquaTech é o destino definitivo. O comportamento poderá ser testado com um destino provisório aprovado.

## 7. Critérios de aceitação

- [ ] Existe um único arquivo `navbar.html` contendo a estrutura compartilhada da navbar.
- [ ] Home, Login e Cadastro carregam o mesmo componente sem repetir sua estrutura HTML.
- [ ] Os estilos da navbar estão centralizados, sem conflitos ou alterações visuais nas demais áreas das páginas.
- [ ] A Home sem sessão exibe o botão Login e não exibe o ícone de perfil.
- [ ] O botão Login direciona corretamente a `login.html`.
- [ ] A Home com sessão de teste exibe o ícone de perfil e não exibe o botão Login.
- [ ] O ícone de perfil aponta para o destino do dashboard confirmado pelo responsável. A navegação definitiva será validada quando essa página estiver disponível.
- [ ] Login e Cadastro exibem somente a logo e o ícone de Home, com ou sem sessão.
- [ ] O ícone de Home direciona corretamente a `index.html` nas duas páginas.
- [ ] Logo, ícones, estilos e links são carregados corretamente ao executar a aplicação pelo servidor existente.
- [ ] Não há erros no console relacionados ao carregamento ou à exibição da navbar.
- [ ] Os formulários e scripts existentes permanecem com seu comportamento anterior.
- [ ] Nenhum arquivo do back-end, script SQL ou configuração do servidor foi alterado e nenhuma dependência foi adicionada.
- [ ] O código é simples e explicável, com comentários quando necessário, e o responsável recebe um resumo das alterações e instruções de teste.
