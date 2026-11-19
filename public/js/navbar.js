// Navbar compartilhada do League Scout.
// Este arquivo carrega o componente components/navbar.html e decide quais
// itens aparecem conforme a página atual e a sessão do administrador.

// Exibe ou esconde um item da navbar pelo id.
// Usa style.display para seguir o padrão de manipulação já usado no projeto.
function exibirItemNavbar(id, exibir) {
    var item = document.getElementById(id);

    if (item) {
        item.style.display = exibir ? "" : "none";
    }
}

// Define os itens visíveis da navbar.
// - Login e Cadastro (body com classe "pagina-interna"): logo + ícone de Home.
// - Home: links fixos + botão Login (sem sessão) ou ícone de perfil (com sessão).
function configurarNavbar() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    // Sessão reconhecida apenas quando e-mail e nome existem e não estão vazios.
    var logado = email != null && nome != null && email !== "" && nome !== "";

    var paginaInterna = document.body.classList.contains("pagina-interna");

    if (paginaInterna) {
        // A regra da página tem prioridade: independente da sessão,
        // Login e Cadastro mostram somente a logo e o ícone de Home.
        exibirItemNavbar("nav-sobre-mim", false);
        exibirItemNavbar("nav-lideres", false);
        exibirItemNavbar("nav-separador", false);
        exibirItemNavbar("nav-login", false);
        exibirItemNavbar("nav-perfil", false);
        exibirItemNavbar("nav-home", true);
        return;
    }

    // Home: o ícone de Home não é utilizado.
    exibirItemNavbar("nav-home", false);
    exibirItemNavbar("nav-sobre-mim", true);
    exibirItemNavbar("nav-lideres", true);
    exibirItemNavbar("nav-separador", true);

    // Botão Login e ícone de perfil nunca aparecem juntos.
    exibirItemNavbar("nav-login", !logado);
    exibirItemNavbar("nav-perfil", logado);
}

// Busca o HTML do componente e injeta no container da página.
function carregarNavbar() {
    fetch("/components/navbar.html")
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Falha ao carregar a navbar: " + resposta.status);
            }
            return resposta.text();
        })
        .then(function (html) {
            var container = document.getElementById("navbar-container");

            if (!container) {
                return;
            }

            container.innerHTML = html;
            configurarNavbar();
        })
        .catch(function (erro) {
            console.error("Erro na navbar:", erro);
        });
}
