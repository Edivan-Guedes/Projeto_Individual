# REQ-003 — Footer interativo do League Scout

**Projeto:** League Scout  
**Tipo:** Requisição de front-end  
**Situação:** Especificação para análise no modo Plan do OpenCode  
**Referências:** `AGENTS.md`, REQ-001 (navbar), REQ-002 (tipografia), vídeo demonstrativo do footer do site Pokémon, arte já presente no projeto.

## 1. Contexto

O League Scout utiliza uma identidade visual inspirada em Pokémon Black & White e no site oficial de Pokémon. A Home já possui um footer visual, atualmente implementado como uma `div.footer` vazia em `public/index.html`, com a imagem `public/assets/imgs/image_footer.png` aplicada como `background-image` em `public/css/estilo.css`.

A animação desejada é inspirada no footer do site Pokémon observado no vídeo fornecido pelo responsável do projeto, mas foi definida uma adaptação própria: **Munna e Musharna devem se mover apenas enquanto o cursor estiver sobre cada personagem** (opção B), e não flutuar continuamente.

**Atenção — situação real dos arquivos:** a imagem `image_footer.png` atual **já contém desenhados Munna, Musharna, grama, a seta e o texto “Voltar ao início”**. Portanto, simplesmente sobrepor duas imagens de personagens e um botão HTML à arte existente causará duplicação de elementos. Esse problema visual deve ser identificado e solucionado no planejamento, sem alterar a arte sem aprovação.

## 2. Objetivo

Transformar o footer da Home em uma seção interativa e visualmente fiel à identidade do League Scout, com personagens independentes que respondam ao hover e um controle funcional para retornar ao topo da página.

## 3. Escopo

### Dentro do escopo

- Implementar o footer interativo **na Home (`public/index.html`)** nesta requisição; avaliar reutilização futura sem expandir automaticamente para Login, Cadastro ou dashboard.
- Incorporar **exatamente os dois novos arquivos de imagem de personagens** listados na seção 6.
- Exibir Munna à esquerda e Musharna à direita, próximos à grama na base do footer.
- Animar **somente o personagem sob o mouse** por meio de uma transição suave de posição vertical.
- Fazer os personagens retornarem à posição original quando o mouse sair.
- Implementar o controle central “Voltar ao início” (texto e seta) como um único elemento HTML interativo.
- Retornar suavemente ao topo da página ao ativar o controle.
- Preservar a paleta, o estilo das ilustrações e a tipografia Montserrat/Inter definidos no projeto.
- Fazer ajustes mínimos necessários em HTML/CSS e, se realmente necessário, JavaScript puro.

### Fora do escopo

- Back-end, banco de dados, sessão, autenticação, rotas e configurações do servidor.
- Modificações da navbar e das funções introduzidas na REQ-001.
- Mudanças da identidade tipográfica introduzida na REQ-002.
- Implementação automática nas páginas de Login, Cadastro, dashboard e páginas legadas.
- Bibliotecas de animação, frameworks, efeitos 3D, canvas ou soluções complexas.
- Substituição das ilustrações fornecidas por imagens externas.
- Edição ou recriação automática de imagens de fundo sem autorização do responsável pelo projeto.

## 4. Funcionalidades

### 4.1 — Exibição visual

O footer deve exibir o fundo lilás `#EEECFA`, elementos decorativos de grama alta, Munna do lado esquerdo, Musharna do lado direito e um botão/seta central “Voltar ao início”. A composição deve se integrar ao final da Home sem cobrir seus conteúdos anteriores.

### 4.2 — Hover individual dos Pokémon

- Munna se desloca sutilmente para cima enquanto o cursor estiver sobre sua imagem e retorna ao ponto de origem ao sair.
- Musharna possui comportamento equivalente, independentemente de Munna.
- Usar CSS simples, preferencialmente `transition` e `transform: translateY(...)`, com uma movimentação inicial sugerida de `-10px` e transição aproximada de `0.3s` (ajustável após validação visual).
- Não aplicar animação automática permanente.
- O efeito não deverá deslocar os demais elementos do layout.
- Em dispositivos sem hover, os personagens devem permanecer visíveis e estáticos; o controle “Voltar ao início” deve continuar utilizável.
- Respeitar `prefers-reduced-motion: reduce`, desabilitando ou reduzindo as transições quando solicitado pelo usuário.

### 4.3 — Voltar ao início

- A seta e o texto devem formar uma área clicável única, preferencialmente um link `<a href="#topo">` com alvo existente no topo da Home, aproveitando o `scroll-behavior: smooth` já presente; ou outra solução simples justificada no Plan.
- A interação deve funcionar por mouse e teclado, com foco visível.
- O controle deve ser texto e ícone reais no HTML, **não apenas parte da imagem de fundo**.
- A seta poderá ter um pequeno deslocamento visual no hover, sem efeito contínuo.

### 4.4 — Estado visual e legibilidade

- Preservar os tons pastel e manter o texto central legível sobre o fundo.
- Não sobrepor os personagens ao botão central.
- Manter o layout coerente em larguras aproximadas de 1366px e 1024px, verificando também telas menores se possível.

## 5. Regras de negócio e restrições

1. O footer é uma funcionalidade de interface e não depende do login do administrador.
2. O hover de um Pokémon deve afetar apenas a sua própria imagem.
3. Não utilizar efeitos de flutuação contínua, conforme decisão expressa do responsável.
4. A arte original serve como referência, mas não pode permanecer exibindo cópias estáticas dos Pokémon atrás das novas imagens móveis.
5. A seta e o texto existentes dentro da imagem original também não podem permanecer visíveis como duplicatas do novo controle HTML.
6. **Não apagar, recortar, alterar nem sobrescrever** `image_footer.png` sem autorização explícita.
7. Se não existir uma imagem de fundo contendo apenas o cenário, o OpenCode deverá **apresentar alternativas no modo Plan** (por exemplo, solicitar um fundo separado) e aguardar uma decisão, em vez de improvisar mascaramentos que prejudiquem o visual.
8. Não instalar dependências nem modificar arquivos fora do escopo aprovado.
9. Respeitar as regras de legibilidade, simplicidade e finalidade acadêmica do `AGENTS.md`.

## 6. Interface e arquivos de imagem obrigatórios

Os **arquivos PNG separados** devem ser colocados pelo responsável do projeto nesta pasta:

```text
public/assets/imgs/
├── munna_fofa_em_tons_pastel.png
└── musharna_envolta_em_sonhos_pastel.png
```

**Utilização obrigatória:**

- **Munna (esquerda):** `/assets/imgs/munna_fofa_em_tons_pastel.png`
- **Musharna (direita):** `/assets/imgs/musharna_envolta_em_sonhos_pastel.png`

Ambas as imagens possuem fundo transparente. O OpenCode deverá usar estes arquivos exatos, sem gerar novas imagens ou trocar seus nomes, e controlar suas dimensões por CSS, preservando a proporção com `height: auto`.

### Estrutura existente a considerar

- `public/index.html`: atualmente contém `<div class="footer"></div>`.
- `public/css/estilo.css`: atualmente contém `.footer { height: 100px; background-image: url("../assets/imgs/image_footer.png"); background-color: #EEECFA; background-size: 100% auto; background-position: center calc(100% + 190px); }`.
- `public/assets/imgs/image_footer.png`: imagem existente com o cenário **e** os personagens e o texto já incorporados.

### Estratégia técnica esperada

Antes de propor alterações, inspecionar os arquivos reais e explicar como o fundo existente será tratado sem duplicação. Caso exista ou seja fornecido um fundo limpo (sem personagens e sem texto), o OpenCode poderá propor a nova estrutura do footer usando esse cenário, duas tags `<img>` e um link central. Decidir no Plan se um arquivo `footer.css` separado é útil ou se é mais simples manter estilos em `estilo.css`. Utilizar JavaScript **somente se CSS/HTML não forem suficientes**.

## 7. Critérios de aceitação

1. O footer aparece ao final da Home e preserva o estilo visual do League Scout.
2. As duas imagens PNG com os **nomes definidos acima** são carregadas sem erro 404.
3. Munna fica à esquerda, Musharna à direita e ambos mantêm suas proporções.
4. Cada personagem se move suavemente para cima **apenas durante seu próprio hover**, retornando ao sair.
5. Não existe flutuação contínua.
6. Não há Pokémon duplicados, texto duplicado ou seta duplicada devido à imagem de fundo antiga.
7. O controle central “Voltar ao início” funciona por clique e teclado e leva ao topo de forma suave quando as preferências do usuário permitem animação.
8. O footer não apresenta cortes ou sobreposições indesejadas nas larguras testadas.
9. A navbar e os estilos das requisições anteriores continuam funcionando.
10. Nenhuma modificação de back-end ou inclusão de bibliotecas foi realizada.
11. O código é simples, comentado quando necessário e explicável pelo desenvolvedor.
12. Caso o cenário limpo necessário não esteja disponível, o OpenCode deverá registrar o impedimento e solicitar aprovação da solução visual **antes da implementação**.

---

## Prompt para o OpenCode — modo Plan

```text
Leia @AGENTS.md e @docs/requisicoes/REQ-003-footer-interativo.md.

Analise o footer existente no League Scout e elabore o planejamento da REQ-003, sem modificar arquivos.

Use obrigatoriamente estas imagens que serão colocadas em public/assets/imgs/:
- munna_fofa_em_tons_pastel.png (esquerda)
- musharna_envolta_em_sonhos_pastel.png (direita)

A animação dos personagens deve ocorrer SOMENTE no hover individual, por CSS simples. O botão central deve retornar suavemente ao topo.

Atenção: image_footer.png já contém personagens, seta e texto incorporados. Identifique como evitar a duplicação desses elementos. Não edite nem substitua a imagem sem minha autorização. Se for necessário um fundo limpo, apresente alternativas e aguarde minha decisão.

Informe os arquivos a criar/modificar, a estratégia visual, os recursos HTML/CSS/JS, riscos e testes. Preserve navbar, tipografia e back-end. Não implemente ainda; aguarde minha aprovação.
```
