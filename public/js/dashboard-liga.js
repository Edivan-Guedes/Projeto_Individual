/* ==========================================================================
   LEAGUE SCOUT — DASHBOARD ADMINISTRATIVA (REQ-005)
   Dados simulados e renderização das KPIs, da tabela e do gráfico.

   Este arquivo é a ÚNICA fonte de dados da Dashboard. As KPIs, a tabela e o
   gráfico são montados a partir do mesmo objeto, evitando listas duplicadas.

   IMPORTANTE: todos os valores abaixo são SIMULADOS para demonstração
   acadêmica. Datas, ordem de cadastro, insígnias, vitórias, derrotas e a
   quantidade de Pokémon não representam registros reais do banco.
   ========================================================================== */

var dadosDashboard = {
  limiteLideres: 8,

  // Regra de negócio definida para a Dashboard: 8 líderes × 6 Pokémon = 48.
  limitePokemon: 48,
  pokemonCadastrados: 18, // valor simulado

  lideres: [
    {
      id: 1,
      nome: "Cheren",
      cidade: "Aspertia",
      tipo: "Normal",
      insignia: "Básica",
      dataCadastro: "2026-01-05", // data simulada
      ordemCadastro: 1,           // ordem simulada de cadastro
      vitorias: 8,                // valor simulado
      derrotas: 5,                // valor simulado
      sprite: "../assets/imgs/lideres/Cheren_sprite.jpg"
    },
    {
      id: 2,
      nome: "Burgh",
      cidade: "Castelia",
      tipo: "Inseto",
      insignia: "Inseto",
      dataCadastro: "2026-01-19",
      ordemCadastro: 2,
      vitorias: 9,
      derrotas: 4,
      sprite: "../assets/imgs/lideres/Burgh_sprite.jpg"
    },
    {
      id: 3,
      nome: "Elesa",
      cidade: "Nimbasa",
      tipo: "Elétrico",
      insignia: "Raio",
      dataCadastro: "2026-02-02",
      ordemCadastro: 3,
      vitorias: 7,
      derrotas: 6,
      sprite: "../assets/imgs/lideres/Elesa_sprite.webp"
    },
    {
      id: 4,
      nome: "Clay",
      cidade: "Driftveil",
      tipo: "Terra",
      insignia: "Tremor",
      dataCadastro: "2026-02-16",
      ordemCadastro: 4,
      vitorias: 5,
      derrotas: 8,
      sprite: "../assets/imgs/lideres/Clay_sprite.jpg"
    },
    {
      id: 5,
      nome: "Skyla",
      cidade: "Mistralton",
      tipo: "Voador",
      insignia: "Jato",
      dataCadastro: "2026-03-02",
      ordemCadastro: 5,
      vitorias: 8,
      derrotas: 5,
      sprite: "../assets/imgs/lideres/Skyla_sprite.jpg"
    },
    {
      id: 6,
      nome: "Drayden",
      cidade: "Opelucid",
      tipo: "Dragão",
      insignia: "Lenda",
      dataCadastro: "2026-03-16",
      ordemCadastro: 6,
      vitorias: 11,
      derrotas: 3,
      sprite: "../assets/imgs/lideres/Drayden_sprite.png"
    },
    {
      id: 7,
      nome: "Marlon",
      cidade: "Humilau",
      tipo: "Água",
      insignia: "Onda",
      dataCadastro: "2026-03-30",
      ordemCadastro: 7,
      vitorias: 6,
      derrotas: 7,
      sprite: "../assets/imgs/lideres/Marlon_sprite.png"
    }
  ]
};

// Guarda a instância do gráfico para permitir uma futura atualização dos dados
// sem criar dois gráficos no mesmo canvas.
var graficoLideres = null;

// Relaciona o nome do tipo à classe CSS que colore a "pill" da tabela.
var classesTipo = {
  "Normal": "tipo-normal",
  "Inseto": "tipo-inseto",
  "Elétrico": "tipo-eletrico",
  "Terra": "tipo-terra",
  "Voador": "tipo-voador",
  "Dragão": "tipo-dragao",
  "Água": "tipo-agua"
};

/* ==========================================================================
   FUNÇÕES AUXILIARES
   ========================================================================== */

// Converte uma data ISO ("2026-01-05") para o formato brasileiro ("05/01/2026").
function formatarData(dataISO) {
  if (!dataISO) {
    return "Data não informada";
  }

  var partes = dataISO.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Retorna o primeiro e o último líder pela ORDEM DE CADASTRO,
// e não pela posição de exibição, ordem alfabética ou resultados de batalha.
function obterPrimeiroEUltimo(lideres) {
  if (lideres.length === 0) {
    return { primeiro: null, ultimo: null };
  }

  // slice() cria uma cópia para não alterar a ordem usada na tabela e no gráfico.
  var ordenados = lideres.slice().sort(function (a, b) {
    return a.ordemCadastro - b.ordemCadastro;
  });

  return {
    primeiro: ordenados[0],
    ultimo: ordenados[ordenados.length - 1]
  };
}

/* ==========================================================================
   KPIs
   ========================================================================== */

function preencherKpis() {
  var lideres = dadosDashboard.lideres;
  var extremos = obterPrimeiroEUltimo(lideres);

  var kpiPrimeiro = document.getElementById("kpi-primeiro");
  var kpiPrimeiroExtra = document.getElementById("kpi-primeiro-extra");
  var kpiUltimo = document.getElementById("kpi-ultimo");
  var kpiUltimoExtra = document.getElementById("kpi-ultimo-extra");

  // Estado sem líderes: mantém as KPIs legíveis, sem erro de JavaScript.
  if (extremos.primeiro === null) {
    kpiPrimeiro.textContent = "Nenhum";
    kpiPrimeiroExtra.textContent = "líder cadastrado";
    kpiUltimo.textContent = "Nenhum";
    kpiUltimoExtra.textContent = "líder cadastrado";
  } else {
    kpiPrimeiro.textContent = extremos.primeiro.nome;
    kpiPrimeiroExtra.textContent = formatarData(extremos.primeiro.dataCadastro) + " · simulado";

    kpiUltimo.textContent = extremos.ultimo.nome;
    kpiUltimoExtra.textContent = formatarData(extremos.ultimo.dataCadastro) + " · simulado";
  }

  // KPI de líderes: quantidade atual e limite máximo.
  document.getElementById("kpi-lideres").textContent = lideres.length;
  document.getElementById("kpi-lideres-extra").textContent =
    lideres.length + " de " + dadosDashboard.limiteLideres;

  // KPI de Pokémon: quantidade simulada e limite da regra de negócio.
  document.getElementById("kpi-pokemon").textContent = dadosDashboard.pokemonCadastrados;
  document.getElementById("kpi-pokemon-extra").textContent =
    dadosDashboard.pokemonCadastrados + " de " + dadosDashboard.limitePokemon;
}

/* ==========================================================================
   TABELA DE LÍDERES
   ========================================================================== */

// Monta o HTML de uma linha da tabela a partir de um líder.
function montarLinhaTabela(lider) {
  var classeTipo = classesTipo[lider.tipo] || "tipo-normal";

  return (
    "<tr>" +
      "<td>" +
        '<div class="lider-nome">' +
          '<span class="lider-foto">' +
            '<span class="lider-inicial" aria-hidden="true">' + lider.nome.charAt(0) + "</span>" +
            '<img class="lider-sprite" src="' + lider.sprite + '" alt="Sprite de ' + lider.nome + '">' +
          "</span>" +
          "<strong>" + lider.nome + "</strong>" +
        "</div>" +
      "</td>" +
      "<td>" + lider.cidade + "</td>" +
      '<td><span class="tipo-pill ' + classeTipo + '">' + lider.tipo + "</span></td>" +
      "<td>" + lider.insignia + "</td>" +
    "</tr>"
  );
}

function renderizarTabela() {
  var corpo = document.getElementById("tabela-lideres-corpo");
  var lideres = dadosDashboard.lideres;

  // Estado vazio: uma única linha informando que não há registros.
  if (lideres.length === 0) {
    corpo.innerHTML =
      '<tr><td class="tabela-vazia" colspan="4">Nenhum líder cadastrado.</td></tr>';
    return;
  }

  corpo.innerHTML = lideres.map(montarLinhaTabela).join("");

  // Fallback: se uma sprite falhar, mostra a inicial do líder no lugar.
  var imagens = corpo.querySelectorAll(".lider-sprite");

  imagens.forEach(function (imagem) {
    imagem.addEventListener("error", function () {
      imagem.style.display = "none";
      imagem.parentElement.classList.add("sem-imagem");
    });
  });
}

/* ==========================================================================
   GRÁFICO DE BARRAS HORIZONTAIS (CHART.JS)
   ========================================================================== */

function renderizarGrafico() {
  var canvas = document.getElementById("grafico-lideres");
  var area = document.getElementById("grafico-area");
  var mensagemVazio = document.getElementById("grafico-vazio");
  var lideres = dadosDashboard.lideres;

  // Remove o gráfico anterior, se existir, antes de desenhar um novo.
  if (graficoLideres !== null) {
    graficoLideres.destroy();
    graficoLideres = null;
  }

  // Sem líderes: esconde o canvas e mostra uma mensagem legível.
  if (lideres.length === 0) {
    area.hidden = true;
    mensagemVazio.hidden = false;
    mensagemVazio.textContent = "Nenhum líder cadastrado para exibir no gráfico.";
    return;
  }

  // Se o CDN do Chart.js não carregar, a página continua utilizável.
  if (typeof Chart === "undefined") {
    area.hidden = true;
    mensagemVazio.hidden = false;
    mensagemVazio.textContent =
      "Não foi possível carregar o Chart.js. Verifique a conexão com a internet e recarregue a página.";
    return;
  }

  var nomes = lideres.map(function (lider) {
    return lider.nome;
  });

  var vitorias = lideres.map(function (lider) {
    return lider.vitorias;
  });

  var derrotas = lideres.map(function (lider) {
    return lider.derrotas;
  });

  // Maior valor das duas séries, usado para tratar o caso de todos os zeros.
  var maiorValor = Math.max.apply(null, vitorias.concat(derrotas));

  // Fontes oficiais do projeto aplicadas aos textos internos do Chart.js.
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = "#5c5c5c";

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Configuração do eixo horizontal de quantidades.
  var eixoX = {
    beginAtZero: true,
    grid: {
      color: "#ececec"
    },
    border: {
      display: false
    },
    ticks: {
      precision: 0,       // exibe apenas números inteiros
      maxTicksLimit: 8,
      color: "#6b6b6b",
      font: {
        size: 12
      }
    },
    title: {
      display: true,
      text: "Quantidade de batalhas",
      color: "#6b6b6b",
      font: {
        size: 12,
        weight: "400"
      }
    }
  };

  // Com todos os valores zerados, fixa uma escala mínima válida (0 a 1).
  if (maiorValor === 0) {
    eixoX.suggestedMax = 1;
  }

  graficoLideres = new Chart(canvas, {
    type: "bar",
    data: {
      labels: nomes,
      datasets: [
        {
          label: "Vitórias",
          data: vitorias,
          backgroundColor: "#2f9e5b",
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.65
        },
        {
          label: "Derrotas",
          data: derrotas,
          backgroundColor: "#e33535",
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.65
        }
      ]
    },
    options: {
      // indexAxis: "y" transforma as barras em HORIZONTAIS.
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: reduzirMovimento ? false : { duration: 500 },
      scales: {
        x: eixoX,
        y: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks: {
            color: "#404040",
            font: {
              size: 13,
              weight: "600"
            }
          }
        }
      },
      plugins: {
        // A legenda é exibida em HTML no cabeçalho do painel.
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#2e2e2e",
          padding: 10,
          cornerRadius: 6,
          titleFont: {
            family: "'Montserrat', sans-serif",
            size: 13
          },
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    }
  });
}

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */

function iniciarDashboard() {
  preencherKpis();
  renderizarTabela();
  renderizarGrafico();
}

document.addEventListener("DOMContentLoaded", iniciarDashboard);
