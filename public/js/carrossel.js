/* ============================================================
   CARROSSEL DE LÍDERES — HOME (REQ-004)
   Dados simulados, montagem dos cards e navegação circular.
   Não acessa banco de dados nem rotas: a lista abaixo poderá
   ser substituída futuramente pelo retorno da API.
   ============================================================ */

// Fonte única dos dados dos cards. Roxie não faz parte desta
// etapa: ela será incluída depois pela simulação de cadastro.
var lideres = [
  { nome: "Cheren",  tipo: "Normal",   cidade: "Aspertia",   imagem: "./assets/imgs/lideres/Cheren.webp" },
  { nome: "Burgh",   tipo: "Inseto",   cidade: "Castelia",   imagem: "./assets/imgs/lideres/Burgh.webp" },
  { nome: "Elesa",   tipo: "Elétrico", cidade: "Nimbasa",    imagem: "./assets/imgs/lideres/Elesa.webp" },
  { nome: "Clay",    tipo: "Terra",    cidade: "Driftveil",  imagem: "./assets/imgs/lideres/Clay.webp" },
  { nome: "Skyla",   tipo: "Voador",   cidade: "Mistralton", imagem: "./assets/imgs/lideres/Skyla.webp" },
  { nome: "Drayden", tipo: "Dragão",   cidade: "Opelucid",   imagem: "./assets/imgs/lideres/Drayden.webp" },
  { nome: "Marlon",  tipo: "Água",     cidade: "Humilau",    imagem: "./assets/imgs/lideres/Marlon.webp" }
];

// Cor temática discreta de cada tipo, usada apenas no círculo
// ao lado do valor "Tipo". O texto continua branco para manter
// o contraste sobre o fundo cinza-escuro do card.
var coresTipo = {
  "Normal":    "#A8A878",
  "Inseto":    "#A8B820",
  "Elétrico":  "#F8D030",
  "Terra":     "#E0C068",
  "Voador":    "#A890F0",
  "Dragão":    "#7038F8",
  "Água":      "#6890F0"
};

// Estado do carrossel: lista em uso e posição do card central.
var listaAtual = [];
var indiceAtual = 0;

// Elementos da página preenchidos durante a inicialização.
var palco;
var statusCarrossel;

/* Guarda a lista recebida, prepara os elementos e inicia no
   primeiro líder do array (Cheren). */
function iniciarCarrossel(lista) {
  palco = document.getElementById("carrossel-palco");
  statusCarrossel = document.getElementById("carrossel-status");

  // Proteção simples caso o script seja carregado em outra página
  // ou a lista recebida esteja vazia.
  if (!palco || !lista || lista.length === 0) {
    return;
  }

  listaAtual = lista;
  indiceAtual = 0;

  var botaoAnterior = document.querySelector(".carrossel-anterior");
  var botaoProximo = document.querySelector(".carrossel-proximo");

  botaoAnterior.addEventListener("click", mostrarAnterior);
  botaoProximo.addEventListener("click", mostrarProximo);

  renderizarCarrossel();
}

/* Retrocede uma posição. O módulo faz a volta do primeiro
   para o último card (navegação circular). */
function mostrarAnterior() {
  var total = listaAtual.length;

  indiceAtual = (indiceAtual - 1 + total) % total;

  // A classe troca a direção da animação de entrada dos cards.
  palco.classList.add("retrocedendo");
  renderizarCarrossel();
}

/* Avança uma posição. O módulo faz a volta do último para
   o primeiro card (navegação circular). */
function mostrarProximo() {
  var total = listaAtual.length;

  indiceAtual = (indiceAtual + 1) % total;

  palco.classList.remove("retrocedendo");
  renderizarCarrossel();
}

/* Monta os três cards visíveis: anterior, central e próximo.
   Os cards são recriados a cada navegação, o que reinicia
   naturalmente a animação CSS de entrada. */
function renderizarCarrossel() {
  var total = listaAtual.length;
  var indiceAnterior = (indiceAtual - 1 + total) % total;
  var indiceProximo = (indiceAtual + 1) % total;

  palco.innerHTML = "";

  palco.appendChild(criarCard(listaAtual[indiceAnterior], "anterior"));
  palco.appendChild(criarCard(listaAtual[indiceAtual], "central"));
  palco.appendChild(criarCard(listaAtual[indiceProximo], "proximo"));

  // Anúncio para leitores de tela: informa qual líder está no centro.
  var liderCentral = listaAtual[indiceAtual];
  statusCarrossel.textContent = "Líder em destaque: " + liderCentral.nome +
    ", tipo " + liderCentral.tipo +
    ", cidade de " + liderCentral.cidade + ".";
}

/* Cria um card completo (imagem + informações).
   "posicao" pode ser "anterior", "central" ou "proximo". */
function criarCard(lider, posicao) {
  var card = document.createElement("article");

  if (posicao === "central") {
    card.className = "card-lider card-central";
  } else {
    card.className = "card-lider card-lateral card-" + posicao;
  }

  // Área superior: retrato do líder.
  var areaImagem = document.createElement("div");
  areaImagem.className = "card-imagem";

  var imagem = document.createElement("img");
  imagem.alt = "Retrato de " + lider.nome;

  // Se o arquivo local não existir, a imagem quebrada é escondida
  // e o placeholder com o nome do líder ocupa a área.
  imagem.addEventListener("error", function () {
    areaImagem.classList.add("sem-imagem");
    imagem.style.display = "none";
    console.warn("Imagem não encontrada: " + lider.imagem);
  });

  imagem.src = lider.imagem;

  var imagemAusente = document.createElement("span");
  imagemAusente.className = "card-imagem-ausente";
  imagemAusente.textContent = lider.nome;

  areaImagem.appendChild(imagem);
  areaImagem.appendChild(imagemAusente);

  // Área inferior: nome, tipo e cidade.
  var info = document.createElement("div");
  info.className = "card-info";

  var nome = document.createElement("h3");
  nome.className = "card-nome";
  nome.textContent = lider.nome;

  info.appendChild(nome);
  info.appendChild(criarLinhaDado("Tipo", lider.tipo, coresTipo[lider.tipo]));
  info.appendChild(criarLinhaDado("Cidade", lider.cidade));

  card.appendChild(areaImagem);
  card.appendChild(info);

  return card;
}

/* Cria uma linha "rótulo + valor". O parâmetro "cor" é opcional
   e, quando informado, adiciona o círculo do tipo. */
function criarLinhaDado(rotulo, valor, cor) {
  var linha = document.createElement("p");
  linha.className = "card-dado";

  var rotuloElemento = document.createElement("span");
  rotuloElemento.className = "card-rotulo";
  rotuloElemento.textContent = rotulo;

  var valorElemento = document.createElement("span");
  valorElemento.className = "card-valor";

  if (cor) {
    var ponto = document.createElement("span");
    ponto.className = "card-tipo-ponto";
    ponto.style.backgroundColor = cor;
    valorElemento.appendChild(ponto);
  }

  valorElemento.appendChild(document.createTextNode(valor));

  linha.appendChild(rotuloElemento);
  linha.appendChild(valorElemento);

  return linha;
}

// Inicia o carrossel com os dados simulados.
iniciarCarrossel(lideres);
