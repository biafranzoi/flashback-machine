/* Linha do Tempo — protótipo de validação.
   Sem dependências, sem build.

   Eixos:
     X        = ano, proporcional puro (1 ano = N px, N vem da escala)
     raia     = país (uma faixa horizontal por país visível)
     tema     = filtro subtrativo; nunca cria raia
*/

/* ---------- abertura ----------
   A tela de abertura é removida aqui, e não por CSS, porque o tempo em que
   ela fica depende de duas coisas que só o JavaScript sabe: se a fonte já
   chegou e se quem está lendo pediu menos movimento. */
(function () {
  "use strict";

  var abertura = document.getElementById("abertura");
  if (!abertura) return;

  var raiz = document.documentElement;
  var titulo = abertura.querySelector(".abertura-titulo");
  var cabecalho = document.querySelector(".barra h1");

  var curto = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ESPERA = curto ? 240 : 1750;   // tempo em tela, contado do início do movimento
  var TEXTO  = 500;                  // a marca entra primeiro; o nome vem atrás
  var BATIDA = 52;                   // milissegundos por letra
  var VOO    = 460;                  // o trajeto até o topo, espelhado no estilo.css
  var SECO   = 300;                  // a saída sem voo

  raiz.classList.add("abertura-ativa");   // o título do topo espera escondido

  /* ---- a máquina de escrever ----
     O nome é partido em letras e cada uma entra no seu tempo. Todas já ocupam
     o seu lugar desde o começo, invisíveis, e o cursor tem largura zero: assim
     a linha não se desloca a cada batida, e a medida para o voo é a mesma do
     começo ao fim. */
  var letras = [];
  var cursor = null;
  var relogio = null;

  function montarTexto() {
    if (!titulo) return;
    var texto = titulo.textContent;
    titulo.textContent = "";

    cursor = document.createElement("span");
    cursor.className = "abertura-cursor";

    for (var i = 0; i < texto.length; i++) {
      var letra = document.createElement("span");
      letra.className = "abertura-letra";
      letra.textContent = texto.charAt(i);
      titulo.appendChild(letra);
      letras.push(letra);
    }
    titulo.insertBefore(cursor, letras[0] || null);
  }

  function escrever() {
    var i = 0;
    relogio = setInterval(function () {
      if (i >= letras.length) { parar(); return; }   // escrito: o cursor fica piscando
      letras[i].className = "abertura-letra abertura-letra--vista";
      i++;
      titulo.insertBefore(cursor, letras[i] || null);
    }, BATIDA);
  }

  function parar() {
    if (relogio) { clearInterval(relogio); relogio = null; }
  }

  /* escreve de uma vez o que faltava, e recolhe o cursor: ou a saída chegou
     antes, ou a aba estava em segundo plano e ninguém viu as letras caírem */
  function terminarTexto() {
    parar();
    for (var i = 0; i < letras.length; i++) {
      letras[i].className = "abertura-letra abertura-letra--vista";
    }
    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
  }

  montarTexto();

  /* O voo é um FLIP: mede onde o nome está e onde o título do topo vai estar, e
     leva um ao outro com um transform só. A escala sai da razão entre as
     larguras — mesmo texto e mesma fonte, então ela equivale à razão entre os
     corpos. Devolve false quando não há voo possível. */
  function medir() {
    if (curto || !titulo || !cabecalho) return false;

    /* em tela estreita o título do topo quebra em duas linhas: não há um
       destino único para onde voar */
    var linhas = document.createRange();
    linhas.selectNodeContents(cabecalho);
    if (linhas.getClientRects().length > 1) return false;

    var de = titulo.getBoundingClientRect();
    var para = cabecalho.getBoundingClientRect();
    if (!de.width || !para.width) return false;

    titulo.style.setProperty("--dx", (para.left + para.width / 2 - de.left - de.width / 2).toFixed(2) + "px");
    titulo.style.setProperty("--dy", (para.top + para.height / 2 - de.top - de.height / 2).toFixed(2) + "px");
    titulo.style.setProperty("--esc", (para.width / de.width).toFixed(4));
    return true;
  }

  function encerrar() {
    raiz.classList.remove("abertura-ativa");
    abertura.remove();
  }

  var saindo = false;
  function sair() {
    if (saindo) return;
    saindo = true;

    /* quem pula a abertura no primeiro instante não vê o voo: o nome ainda
       está chegando, e partir dali seria um salto */
    var assentado = iniciado && (Date.now() - inicioEm) > 1400;

    /* Encerra a entrada antes de medir: o nome vai inteiro para o topo. O
       relógio e as animações não andam juntos — numa aba em segundo plano as
       animações param e os temporizadores seguem —, e medir um nome ainda a
       meio caminho daria uma escala errada para o voo. */
    if (assentado) {
      terminarTexto();
      if (abertura.getAnimations) {
        abertura.getAnimations({ subtree: true }).forEach(function (a) {
          try { a.finish(); } catch (e) {}
        });
      }
    }

    if (assentado && medir()) {
      abertura.classList.add("abertura--fim");

      /* no pouso, encerrar() acende o título do topo e tira a abertura no
         mesmo quadro — um no lugar do outro, sem piscar */
      setTimeout(encerrar, VOO);
      return;
    }

    parar();
    abertura.classList.add("abertura--seco");
    raiz.classList.remove("abertura-ativa");
    setTimeout(encerrar, SECO);
  }

  /* O movimento espera a Newsreader: começar antes faria o título trocar de
     fonte no meio da animação. O prazo evita ficar preso numa fonte que não
     carrega — e, se a fonte já estiver em cache, a promessa resolve antes. */
  var iniciado = false;
  var inicioEm = 0;
  function iniciar() {
    if (iniciado) return;
    iniciado = true;
    inicioEm = Date.now();
    abertura.classList.add("abertura--pronto");

    /* quem pediu menos movimento recebe o nome pronto, sem as batidas */
    if (curto) { terminarTexto(); } else { setTimeout(escrever, TEXTO); }

    setTimeout(sair, ESPERA);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(iniciar);
    setTimeout(iniciar, 900);
  } else {
    iniciar();
  }

  // quem já conhece a abertura pula: um clique, uma tecla ou um toque encerra
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach(function (ev) {
    window.addEventListener(ev, sair, { once: true, passive: true });
  });
})();

(function () {
  "use strict";

  // ---------- configuração ----------

  var ANO_MIN = 1480;
  var ANO_MAX = 2035;
  var MARGEM = 90;
  var GAP_ROTULO = 18;
  var ALTURA_FAIXA = 34;
  var ALTURA_FAIXA_COMPACTA = 19;   // escala "tudo": só o ano aparece
  var DESLOC_BASE = 22;
  var LIMITE_COMPACTO = 4;   // abaixo disso em px/ano, só os anos aparecem

  // a escala 0 é calculada para caber a extensão inteira na tela
  var ESCALAS = [
    { px: null, nome: "tudo" },
    { px: 5,    nome: "século" },
    { px: 9,    nome: "ampla" },
    { px: 16,   nome: "média" },
    { px: 30,   nome: "detalhe" }
  ];
  var escalaIdx = 0;

  // ---------- estado ----------

  // um país por vez, enquanto o seletor for de escolha única
  var paisesVisiveis = [PAISES[0].id];

  /* Lista vazia = nenhum filtro = mostra tudo. Selecionar chips estreita
     para os temas escolhidos, em vez de desligar os não escolhidos. */
  var temasSelecionados = [];

  var visiveis = [];        // marcos atualmente na tela, em ordem cronológica
  var elementos = [];       // .marco correspondente a cada item de `visiveis`
  var indiceAtivo = -1;

  // ---------- elementos ----------

  var rolagem = document.getElementById("rolagem");
  var trilha  = document.getElementById("trilha");
  var navEras = document.getElementById("nav-eras");
  var filtros = document.getElementById("filtros");
  var dica    = document.getElementById("dica");
  var painel  = document.getElementById("painel");
  var veu     = document.getElementById("veu");

  // ---------- utilidades ----------

  function px() {
    var e = ESCALAS[escalaIdx];
    if (e.px) return e.px;
    var util = Math.max(320, rolagem.clientWidth) - MARGEM * 2;
    return util / (ANO_MAX - ANO_MIN);
  }

  function posX(ano) { return MARGEM + (ano - ANO_MIN) * px(); }

  function pais(id) {
    return PAISES.filter(function (p) { return p.id === id; })[0];
  }

  function nomeTema(id) {
    var t = TEMAS.filter(function (x) { return x.id === id; })[0];
    return t ? t.nome : id;
  }

  function eraDe(m) {
    var p = pais(m.pais);
    if (!p || !p.eras) return "";
    for (var i = 0; i < p.eras.length; i++) {
      if (m.ano >= p.eras[i].inicio && m.ano < p.eras[i].fim) return p.eras[i].nome;
    }
    return "";
  }

  function rotuloAno(m) { return m.anoFim ? m.ano + "–" + m.anoFim : String(m.ano); }

  function identificador(m) {
    var base = m.titulo
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return m.pais + "-" + m.ano + "-" + base;
  }

  function passaNoFiltro(m) {
    if (paisesVisiveis.indexOf(m.pais) === -1) return false;
    if (!temasSelecionados.length) return true;
    return (m.temas || []).some(function (t) { return temasSelecionados.indexOf(t) !== -1; });
  }

  /* Largura que a gaveta rouba da área visível. Só no layout de desktop,
     onde ela entra pela lateral; em tela estreita ela sobe por baixo.
     Como a gaveta flutua afastada da borda, conta-se também essa folga. */
  var INSET_GAVETA = 14;   // espelha --gaveta-folga, no estilo.css

  function larguraGaveta() {
    if (!painel.classList.contains("aberto")) return 0;
    if (window.matchMedia("(max-width: 760px)").matches) return 0;
    return painel.offsetWidth + INSET_GAVETA * 2;
  }

  // ---------- construção ----------

  /* Reconstrói a linha mantendo um ano ancorado num ponto da tela.
       anoFoco  — o ano que não deve se mexer; o do centro, se omitido
       posTela  — onde ele deve ficar, em px da borda esquerda da área
                  visível; o centro, se omitido. É isso que permite dar
                  zoom sob o cursor sem o conteúdo escapar debaixo dele. */
  function construir(anoFoco, posTela) {
    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    if (posTela == null) posTela = faixaUtil / 2;
    if (anoFoco == null) {
      anoFoco = ANO_MIN + (rolagem.scrollLeft + posTela - MARGEM) / px();
    }

    visiveis = MARCOS.filter(passaNoFiltro).sort(function (a, b) { return a.ano - b.ano; });
    elementos = [];
    trilha.innerHTML = "";

    var compacto = px() < LIMITE_COMPACTO;
    trilha.classList.toggle("compacto", compacto);
    trilha.style.width = (posX(ANO_MAX) + MARGEM) + "px";

    var ativos = PAISES.filter(function (p) { return paisesVisiveis.indexOf(p.id) !== -1; });
    var umPaisSo = ativos.length === 1;

    ativos.forEach(function (p, ip) {
      var raia = document.createElement("div");
      raia.className = "raia";
      raia.dataset.pais = p.id;
      raia.innerHTML = '<div class="linha" aria-hidden="true"></div>';

      // régua de décadas — rótulos só na última raia, para não repetir
      var ultima = ip === ativos.length - 1;
      // em escalas apertadas as décadas viram uma barra sólida: só séculos
      var passo = px() < 3 ? 100 : 10;
      for (var ano = 1500; ano <= 2030; ano += passo) {
        var secular = ano % 100 === 0;
        var t = document.createElement("div");
        t.className = "tique" + (secular ? " secular" : "");
        t.style.left = posX(ano) + "px";
        raia.appendChild(t);

        if (ultima && (secular || (px() >= 16 && ano % 50 === 0))) {
          var r = document.createElement("div");
          r.className = "tique-rotulo";
          r.textContent = ano;
          r.style.left = posX(ano) + "px";
          raia.appendChild(r);
        }
      }

      // eras do país
      if (!compacto && p.eras) {
        p.eras.forEach(function (era) {
          var f = document.createElement("div");
          f.className = "faixa-era";
          f.textContent = era.nome;
          f.style.left = posX(era.inicio) + "px";
          f.style.width = ((era.fim - era.inicio) * px()) + "px";
          raia.appendChild(f);
        });
      }

      // nome do país, só quando há mais de um
      if (!umPaisSo) {
        var etiqueta = document.createElement("div");
        etiqueta.className = "rotulo-pais";
        etiqueta.textContent = p.nome;
        raia.appendChild(etiqueta);
      }

      // marcos deste país
      visiveis.forEach(function (m, i) {
        if (m.pais !== p.id) return;

        var el = document.createElement("div");
        el.className = "marco";
        // com várias raias o espaço vertical é escasso: tudo para cima
        el.dataset.lado = umPaisSo ? (i % 2 === 0 ? "acima" : "abaixo") : "acima";
        el.dataset.i = i;
        el.style.setProperty("--x", posX(m.ano) + "px");
        el.style.setProperty("--desloc", DESLOC_BASE + "px");
        // entrada escalonada, limitada para não virar espera
        el.style.setProperty("--atraso", Math.min(i * 22, 260) + "ms");

        if (m.anoFim) {
          var barra = document.createElement("div");
          barra.className = "intervalo";
          barra.style.setProperty("--span", Math.max(3, (m.anoFim - m.ano) * px()) + "px");
          el.appendChild(barra);
        }

        el.insertAdjacentHTML("beforeend", '<div class="haste"></div>');

        var rot = document.createElement("div");
        rot.className = "rotulo";
        rot.innerHTML = '<span class="ano"></span><span class="titulo"></span>';
        rot.querySelector(".ano").textContent = rotuloAno(m);
        rot.querySelector(".titulo").textContent = m.titulo;
        el.appendChild(rot);

        var alvo = document.createElement("button");
        alvo.type = "button";
        alvo.className = "alvo";
        alvo.setAttribute("aria-label", rotuloAno(m) + " — " + m.titulo);
        el.appendChild(alvo);
        el.insertAdjacentHTML("beforeend", '<span class="ponto" aria-hidden="true"></span>');

        raia.appendChild(el);
        elementos[i] = el;
      });

      trilha.appendChild(raia);
    });

    distribuirRotulos();
    atualizarSegmentos();
    rolagem.scrollLeft = Math.max(0, posX(anoFoco) - posTela);
    atualizarLeitura();
    atualizarVizinhos();
    if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.add("ativo");
  }

  /* Empilha rótulos em faixas, por raia e por lado, para que nunca colidam.
     Quando a raia é baixa demais para a pilha (caso comum com vários países),
     o rótulo que não cabe é omitido — o ponto continua lá, clicável e com
     dica no hover. Melhor sumir do que ser cortado pela borda. */
  function distribuirRotulos() {
    // na escala "tudo" o rótulo é só o ano: as faixas podem ser bem mais baixas
    var altura = trilha.classList.contains("compacto") ? ALTURA_FAIXA_COMPACTA : ALTURA_FAIXA;

    [].forEach.call(trilha.querySelectorAll(".raia"), function (raia) {
      var faixas = { acima: [], abaixo: [] };
      var maxFaixas = Math.max(1,
        Math.floor((raia.clientHeight / 2 - DESLOC_BASE - 26) / altura) + 1);

      [].forEach.call(raia.querySelectorAll(".marco"), function (el) {
        var rot = el.querySelector(".rotulo");
        var cx = parseFloat(el.style.getPropertyValue("--x"));
        var meia = rot.offsetWidth / 2;
        var lista = faixas[el.dataset.lado];

        var faixa = -1;
        for (var k = 0; k < lista.length; k++) {
          if (cx - meia > lista[k] + GAP_ROTULO) { faixa = k; break; }
        }
        if (faixa === -1) { lista.push(cx + meia); faixa = lista.length - 1; }
        else { lista[faixa] = cx + meia; }

        el.classList.toggle("sem-rotulo", faixa >= maxFaixas);
        el.style.setProperty("--desloc", (DESLOC_BASE + faixa * altura) + "px");
      });
    });
  }

  // ---------- painel ----------

  var painelMarco = document.getElementById("painel-marco");
  var painelSobre = document.getElementById("painel-sobre");
  var painelApoiadores = document.getElementById("painel-apoiadores");

  /* A gaveta serve a três conteúdos: um marco, a página Sobre ou a de
     apoiadores. Reusar o mesmo painel evita criar páginas separadas só para
     alguns parágrafos. */
  function abrirPagina(conteudo, hash, trocarHash) {
    if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.remove("ativo");
    indiceAtivo = -1;

    painelMarco.hidden = true;
    painelSobre.hidden = conteudo !== painelSobre;
    painelApoiadores.hidden = conteudo !== painelApoiadores;

    painel.classList.add("aberto");
    painel.setAttribute("aria-hidden", "false");
    painel.scrollTop = 0;
    veu.hidden = false;
    esconderDica();

    if (trocarHash !== false) history.replaceState(null, "", "#" + hash);
  }

  function abrirSobre(trocarHash) { abrirPagina(painelSobre, "sobre", trocarHash); }
  function abrirApoiadores(trocarHash) { abrirPagina(painelApoiadores, "apoiadores", trocarHash); }

  /* A lista nasce vazia: enquanto não houver nome em APOIADORES, a página
     mostra só a chamada para apoiar. */
  function montarApoiadores() {
    var ul = document.getElementById("apoiadores-lista");
    var vazio = document.getElementById("apoiadores-vazio");
    var lista = typeof APOIADORES !== "undefined" ? APOIADORES : [];

    ul.innerHTML = "";
    ul.hidden = lista.length === 0;
    vazio.hidden = lista.length > 0;

    lista.forEach(function (a) {
      var li = document.createElement("li");
      li.textContent = a.nome;
      if (a.desde) {
        var s = document.createElement("span");
        s.className = "apoiador-desde";
        s.textContent = "desde " + a.desde;
        li.appendChild(s);
      }
      ul.appendChild(li);
    });
  }

  function abrir(i, trocarHash) {
    var m = visiveis[i];
    if (!m) return;

    painelMarco.hidden = false;
    painelSobre.hidden = true;
    painelApoiadores.hidden = true;

    if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.remove("ativo");
    indiceAtivo = i;
    if (elementos[i]) elementos[i].classList.add("ativo");

    document.getElementById("painel-ano").textContent = rotuloAno(m);
    document.getElementById("painel-era").textContent = eraDe(m);
    document.getElementById("painel-pais").textContent = PAISES.length > 1 ? pais(m.pais).nome : "";
    document.getElementById("painel-titulo").textContent = m.titulo;
    document.getElementById("painel-resumo").textContent = m.resumo;
    document.getElementById("painel-detalhe").textContent = m.detalhe;

    var fig = document.getElementById("painel-figura");
    if (m.imagem) {
      document.getElementById("painel-img").src = m.imagem.url;
      document.getElementById("painel-img").alt = m.imagem.legenda || m.titulo;
      document.getElementById("painel-legenda").textContent =
        [m.imagem.legenda, m.imagem.credito, m.imagem.licenca].filter(Boolean).join(" · ");
      fig.hidden = false;
    } else {
      fig.hidden = true;
      document.getElementById("painel-img").removeAttribute("src");
    }

    var disputa = document.getElementById("painel-disputa");
    if (m.disputa) {
      document.getElementById("painel-disputa-texto").textContent = m.disputa;
      disputa.hidden = false;
    } else {
      disputa.hidden = true;
    }

    var ulTemas = document.getElementById("painel-temas");
    ulTemas.innerHTML = "";
    (m.temas || []).forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = nomeTema(t);
      ulTemas.appendChild(li);
    });

    var ulFontes = document.getElementById("painel-fontes");
    ulFontes.innerHTML = "";
    (m.fontes || []).forEach(function (f) {
      var li = document.createElement("li");
      if (f.tipo) {
        var tipo = document.createElement("span");
        tipo.className = "tipo";
        tipo.textContent = f.tipo;
        li.appendChild(tipo);
      }
      var a = document.createElement("a");
      a.href = f.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = f.titulo;
      li.appendChild(a);
      ulFontes.appendChild(li);
    });

    painel.classList.add("aberto");
    painel.setAttribute("aria-hidden", "false");
    painel.scrollTop = 0;
    veu.hidden = false;
    esconderDica();

    if (trocarHash !== false) {
      history.replaceState(null, "", "#" + identificador(m));
    }
    centralizar(i);
  }

  function fechar() {
    painel.classList.remove("aberto");
    painel.setAttribute("aria-hidden", "true");
    veu.hidden = true;
    if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.remove("ativo");
    indiceAtivo = -1;
    history.replaceState(null, "", location.pathname + location.search);
  }

  /* Rolagem animada própria. `scrollTo({behavior:"smooth"})` é silenciosamente
     ignorado quando o sistema pede movimento reduzido, e aí o marco nunca
     aparece — aqui o destino é sempre alcançado, animado ou não. */
  var animScroll = null;
  function rolarPara(destino) {
    destino = Math.max(0, Math.min(destino, rolagem.scrollWidth - rolagem.clientWidth));
    if (animScroll) cancelAnimationFrame(animScroll);

    // sem animação quando o movimento é indesejado ou a aba está oculta
    // (nesse caso requestAnimationFrame não dispara e o destino nunca chegaria)
    if (document.visibilityState !== "visible" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rolagem.scrollLeft = destino;
      aoRolar();
      return;
    }
    var inicio = rolagem.scrollLeft;
    var delta = destino - inicio;
    var t0 = performance.now();
    var dur = Math.min(620, 200 + Math.abs(delta) * 0.22);

    (function passo(t) {
      var k = Math.min(1, (t - t0) / dur);
      var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      rolagem.scrollLeft = inicio + delta * e;
      if (k < 1) { animScroll = requestAnimationFrame(passo); }
      else { animScroll = null; aoRolar(); }
    })(t0);
  }

  /* Tudo que precisa acompanhar a posição da linha. Chamado pelo evento de
     rolagem e também ao fim de `rolarPara` — rolagem programática nem sempre
     dispara `scroll` (aba oculta, ou destino igual à posição atual), e sem isso
     a leitura de intervalo fica mostrando onde a linha estava antes. */
  function aoRolar() {
    esconderDica();
    marcarEraVisivel();
    atualizarLeitura();
    atualizarVizinhos();
  }

  /* Centraliza o marco na faixa que sobra à esquerda da gaveta,
     não no centro da janela — senão a gaveta cobre o que foi clicado. */
  function centralizar(i) {
    var m = visiveis[i];
    if (!m) return;
    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    rolarPara(posX(m.ano) - faixaUtil / 2);
  }

  // ---------- dica ----------

  function mostrarDica(i) {
    var m = visiveis[i];
    var el = elementos[i];
    if (!m || !el) return;

    dica.innerHTML = "";
    var forte = document.createElement("strong");
    forte.textContent = rotuloAno(m) + " · " + m.titulo;
    dica.appendChild(forte);
    dica.appendChild(document.createTextNode(m.resumo));
    dica.hidden = false;

    var caixaPalco = rolagem.getBoundingClientRect();
    var caixaPonto = el.querySelector(".alvo").getBoundingClientRect();
    var x = caixaPonto.left - caixaPalco.left + caixaPonto.width / 2;
    var meia = dica.offsetWidth / 2;
    x = Math.max(meia + 8, Math.min(caixaPalco.width - meia - 8, x));

    var centroPonto = caixaPonto.top - caixaPalco.top + caixaPonto.height / 2;
    dica.style.left = x + "px";
    dica.style.top = "";
    dica.style.bottom = "";
    if (el.dataset.lado === "acima") dica.style.top = (centroPonto + 16) + "px";
    else dica.style.bottom = (caixaPalco.height - centroPonto + 16) + "px";
  }

  function esconderDica() { dica.hidden = true; }

  // ---------- eventos ----------

  trilha.addEventListener("pointerover", function (e) {
    var el = e.target.closest(".marco");
    if (!el) return;
    el.classList.add("realce");
    if (window.matchMedia("(hover: hover)").matches) mostrarDica(+el.dataset.i);
  });

  trilha.addEventListener("pointerout", function (e) {
    var el = e.target.closest(".marco");
    if (!el) return;
    el.classList.remove("realce");
    esconderDica();
  });

  trilha.addEventListener("click", function (e) {
    var el = e.target.closest(".marco");
    if (!el || arrastou) return;
    abrir(+el.dataset.i);
  });

  document.getElementById("abrir-sobre").addEventListener("click", function () { abrirSobre(); });
  document.getElementById("abrir-apoiadores").addEventListener("click", function () { abrirApoiadores(); });
  document.getElementById("painel-fechar").addEventListener("click", fechar);
  veu.addEventListener("click", fechar);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { fechar(); return; }

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (!visiveis.length) return;
      var passo = e.key === "ArrowRight" ? 1 : -1;
      var prox = indiceAtivo < 0
        ? (passo > 0 ? 0 : visiveis.length - 1)
        : Math.min(visiveis.length - 1, Math.max(0, indiceAtivo + passo));

      if (painel.classList.contains("aberto")) {
        abrir(prox);
      } else {
        if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.remove("ativo");
        indiceAtivo = prox;
        if (elementos[prox]) elementos[prox].classList.add("ativo");
        centralizar(prox);
      }
      e.preventDefault();
    }

    if (e.key === "Enter" && indiceAtivo >= 0 && !painel.classList.contains("aberto")) {
      abrir(indiceAtivo);
      e.preventDefault();
    }

    if (e.key === "+" || e.key === "=") { mudarEscala(1); e.preventDefault(); }
    if (e.key === "-" || e.key === "_") { mudarEscala(-1); e.preventDefault(); }

    if (e.key === "Home") { rolarPara(0); e.preventDefault(); }
    if (e.key === "End") { rolarPara(rolagem.scrollWidth); e.preventDefault(); }
  });

  rolagem.addEventListener("wheel", function (e) {
    // Ctrl/⌘ + roda — e a pinça do trackpad, que o navegador entrega assim —
    // dá zoom ancorado no cursor, em vez de rolar.
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      var sob = anoEm(e.clientX);
      mudarEscala(e.deltaY < 0 ? 1 : -1, sob.ano, sob.posTela);
      return;
    }
    // roda vertical move na horizontal; horizontal nativa passa direto
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    rolagem.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });

  // duplo clique numa área vazia da linha aproxima naquele ponto
  rolagem.addEventListener("dblclick", function (e) {
    if (e.target.closest(".marco")) return;
    var sob = anoEm(e.clientX);
    mudarEscala(1, sob.ano, sob.posTela);
  });

  var arrastando = false, arrastou = false, x0 = 0, scroll0 = 0;
  rolagem.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    arrastando = true; arrastou = false;
    x0 = e.clientX; scroll0 = rolagem.scrollLeft;
    rolagem.classList.add("arrastando");
  });
  window.addEventListener("pointermove", function (e) {
    if (!arrastando) return;
    var d = e.clientX - x0;
    if (Math.abs(d) > 4) arrastou = true;
    rolagem.scrollLeft = scroll0 - d;
  });
  window.addEventListener("pointerup", function () {
    arrastando = false;
    rolagem.classList.remove("arrastando");
    setTimeout(function () { arrastou = false; }, 0);
  });

  // ---------- escala ----------

  var niveis = document.getElementById("escala-niveis");
  var leitura = document.getElementById("escala-leitura");

  /* Controle segmentado: mostra todos os níveis de uma vez, qual está em
     uso e quantos faltam — coisas que um par de botões −/+ esconde. */
  function montarEscalas() {
    niveis.innerHTML = "";
    ESCALAS.forEach(function (e, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "escala-nivel";
      b.style.setProperty("--h", (5 + i * 3.2) + "px");
      b.title = e.nome;
      b.setAttribute("aria-label", "Escala: " + e.nome);
      b.addEventListener("click", function () { definirEscala(i); });
      niveis.appendChild(b);
    });
    atualizarSegmentos();
  }

  function atualizarSegmentos() {
    [].forEach.call(niveis.children, function (b, i) {
      b.setAttribute("aria-pressed", String(i === escalaIdx));
    });
  }

  /* Leitura concreta do que está na tela. Vale mais que o nome da escala:
     "1884 – 1954" diz a extensão e a posição ao mesmo tempo. */
  function atualizarLeitura() {
    // sem largura medível não há intervalo visível: manter a leitura anterior
    // em vez de escrever algo impossível, como um fim menor que o início
    if (rolagem.clientWidth === 0) return;
    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    var de = ANO_MIN + (rolagem.scrollLeft - MARGEM) / px();
    var ate = de + faixaUtil / px();
    de = Math.max(ANO_MIN, Math.round(de));
    ate = Math.min(ANO_MAX, Math.round(ate));
    leitura.textContent = de + " – " + ate;
  }

  /* Atalhos de borda para o marco mais próximo fora da tela.
     Sem eles, aproximar num século vazio deixa a tela em branco e o leitor
     sem saber para que lado existe conteúdo. */
  var vizEsq = document.getElementById("vizinho-esq");
  var vizDir = document.getElementById("vizinho-dir");

  function atualizarVizinhos() {
    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    var de = ANO_MIN + (rolagem.scrollLeft - MARGEM) / px();
    var ate = de + faixaUtil / px();

    var antes = -1, depois = -1;
    for (var i = 0; i < visiveis.length; i++) {
      if (visiveis[i].ano < de) antes = i;
      if (visiveis[i].ano > ate && depois === -1) depois = i;
    }

    pintarVizinho(vizEsq, antes, "‹ ");
    pintarVizinho(vizDir, depois, "", " ›");
  }

  function pintarVizinho(el, i, antesTexto, depoisTexto) {
    if (i < 0) { el.hidden = true; el.onclick = null; return; }
    var m = visiveis[i];
    el.hidden = false;
    el.textContent = (antesTexto || "") + rotuloAno(m) + " · " + m.titulo + (depoisTexto || "");
    el.setAttribute("aria-label", "Ir para " + rotuloAno(m) + ", " + m.titulo);
    el.onclick = function () {
      if (indiceAtivo >= 0 && elementos[indiceAtivo]) elementos[indiceAtivo].classList.remove("ativo");
      indiceAtivo = i;
      if (elementos[i]) elementos[i].classList.add("ativo");
      centralizar(i);
    };
  }

  function definirEscala(i, anoFoco, posTela) {
    i = Math.min(ESCALAS.length - 1, Math.max(0, i));
    if (i === escalaIdx) return;

    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    if (posTela == null) posTela = faixaUtil / 2;
    if (anoFoco == null) anoFoco = ANO_MIN + (rolagem.scrollLeft + posTela - MARGEM) / px();

    escalaIdx = i;
    construir(anoFoco, posTela);
    marcarEraVisivel();
    marcarTransbordo();
  }

  function mudarEscala(delta, anoFoco, posTela) {
    definirEscala(escalaIdx + delta, anoFoco, posTela);
  }

  /* Ano sob um ponto da tela — a âncora do zoom no cursor. */
  function anoEm(clientX) {
    var caixa = rolagem.getBoundingClientRect();
    var posTela = clientX - caixa.left;
    return {
      ano: ANO_MIN + (rolagem.scrollLeft + posTela - MARGEM) / px(),
      posTela: posTela
    };
  }

  // ---------- navegação por era ----------

  function montarEras() {
    navEras.innerHTML = "";
    var p = pais(paisesVisiveis[0]);
    var grupo = document.getElementById("grupo-eras");

    // eras são específicas de cada país: com vários visíveis, não há índice único
    if (!p || !p.eras || paisesVisiveis.length !== 1) { grupo.hidden = true; return; }
    grupo.hidden = false;

    p.eras.forEach(function (era) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = era.nome;
      b.addEventListener("click", function () { irParaEra(era); });
      navEras.appendChild(b);
    });
  }

  /* Clicar num período enquadra esse período: ajusta a escala para que ele
     ocupe a tela e o centraliza. Só rolar não bastaria — na escala "tudo",
     que é a de abertura, a linha inteira já cabe e não há para onde rolar. */
  function irParaEra(era) {
    var faixaUtil = Math.max(1, rolagem.clientWidth - larguraGaveta());
    var meio = (era.inicio + era.fim) / 2;
    var idealPx = (faixaUtil * 0.82) / Math.max(1, era.fim - era.inicio);

    // maior escala fixa que ainda caiba; nunca volta para "tudo"
    var alvo = 1;
    for (var i = 1; i < ESCALAS.length; i++) {
      if (ESCALAS[i].px <= idealPx) alvo = i;
    }

    if (alvo !== escalaIdx) {
      escalaIdx = alvo;
      construir(meio);
    } else {
      rolarPara(posX(meio) - faixaUtil / 2);
    }
    marcarEraVisivel();
    marcarTransbordo();
  }

  function marcarEraVisivel() {
    if (!navEras.children.length) return;
    var p = pais(paisesVisiveis[0]);
    var faixaUtil = rolagem.clientWidth - larguraGaveta();
    var anoCentro = ANO_MIN + (rolagem.scrollLeft + faixaUtil / 2 - MARGEM) / px();
    var atual = "";
    p.eras.forEach(function (e) { if (anoCentro >= e.inicio && anoCentro < e.fim) atual = e.nome; });

    [].forEach.call(navEras.children, function (b) {
      if (b.textContent === atual) {
        b.setAttribute("aria-current", "true");
        trazerParaVista(navEras, b);
      } else {
        b.removeAttribute("aria-current");
      }
    });
  }

  /* Mantém o período ativo dentro da faixa rolável, sem mexer na página.
     scrollIntoView serviria, mas arrasta junto a linha do tempo. */
  function trazerParaVista(caixa, item) {
    var esq = item.offsetLeft;
    var dir = esq + item.offsetWidth;
    if (esq < caixa.scrollLeft) caixa.scrollLeft = esq - 10;
    else if (dir > caixa.scrollLeft + caixa.clientWidth) caixa.scrollLeft = dir - caixa.clientWidth + 10;
  }

  /* Marca quais faixas de controle têm conteúdo fora da vista, para o CSS
     esmaecer a ponta correspondente. */
  function marcarTransbordo() {
    [].forEach.call(document.querySelectorAll(".grupo-itens"), function (g) {
      g.classList.toggle("transborda-esq", g.scrollLeft > 2);
      g.classList.toggle("transborda-dir", g.scrollWidth - g.scrollLeft - g.clientWidth > 2);
    });
  }

  [].forEach.call(document.querySelectorAll(".grupo-itens"), function (g) {
    g.addEventListener("scroll", marcarTransbordo, { passive: true });
  });

  // ---------- filtros de tema ----------

  /* Refaz a linha depois de mexer no filtro, mantendo aberto o marco que
     estava aberto — a menos que ele próprio tenha saído de cena. */
  function aplicarFiltro() {
    var ancora = indiceAtivo >= 0 ? visiveis[indiceAtivo] : null;
    construir();
    if (ancora) {
      var novo = visiveis.indexOf(ancora);
      if (novo >= 0) { indiceAtivo = novo; elementos[novo].classList.add("ativo"); }
      else fechar();
    }
    marcarEraVisivel();
  }

  function montarFiltros() {
    filtros.innerHTML = "";

    TEMAS.forEach(function (t) {
      // só mostra temas que existem no acervo dos países visíveis
      var existe = MARCOS.some(function (m) {
        return paisesVisiveis.indexOf(m.pais) !== -1 && (m.temas || []).indexOf(t.id) !== -1;
      });
      if (!existe) return;

      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = t.nome;
      b.dataset.tema = t.id;
      b.setAttribute("aria-pressed", "false");

      b.addEventListener("click", function () {
        var i = temasSelecionados.indexOf(t.id);
        if (i === -1) temasSelecionados.push(t.id);
        else temasSelecionados.splice(i, 1);
        b.setAttribute("aria-pressed", String(i === -1));
        atualizarLimpar();
        aplicarFiltro();
      });

      filtros.appendChild(b);
    });

    var limpar = document.createElement("button");
    limpar.type = "button";
    limpar.className = "chip chip-limpar";
    limpar.id = "chip-limpar";
    limpar.textContent = "mostrar tudo";
    limpar.hidden = true;
    limpar.addEventListener("click", function () {
      temasSelecionados = [];
      [].forEach.call(filtros.querySelectorAll("[data-tema]"), function (c) {
        c.setAttribute("aria-pressed", "false");
      });
      atualizarLimpar();
      aplicarFiltro();
    });
    filtros.appendChild(limpar);
  }

  function atualizarLimpar() {
    var limpar = document.getElementById("chip-limpar");
    if (limpar) limpar.hidden = temasSelecionados.length === 0;
    marcarTransbordo();
  }

  rolagem.addEventListener("scroll", aoRolar, { passive: true });

  var redimensionando;
  function refazerLayout() {
    construir();                // a escala "tudo" depende da largura disponível
    if (painel.classList.contains("aberto") && indiceAtivo >= 0) centralizar(indiceAtivo);
    marcarEraVisivel();
    marcarTransbordo();
  }

  window.addEventListener("resize", function () {
    clearTimeout(redimensionando);
    redimensionando = setTimeout(refazerLayout, 150);
  });

  /* O `resize` da janela não cobre tudo: se a página carrega dentro de um
     contêiner ainda sem largura — aba oculta, painel recolhido, iframe que
     ainda não foi exibido — a escala inteira é calculada contra zero e só se
     corrigiria num redimensionamento que talvez nunca venha. O observador
     pega o momento em que a área de rolagem ganha largura de verdade. */
  if (window.ResizeObserver) {
    var larguraConhecida = rolagem.clientWidth;
    var observador = new ResizeObserver(function () {
      var agora = rolagem.clientWidth;
      if (agora === 0 || Math.abs(agora - larguraConhecida) < 2) return;
      larguraConhecida = agora;
      clearTimeout(redimensionando);
      redimensionando = setTimeout(refazerLayout, 150);
    });
    observador.observe(rolagem);
  }

  // ---------- seletor de país ----------

  /* Hoje escolhe um país por vez. A renderização em raias já aceita vários
     ao mesmo tempo — o que falta é um controle de seleção múltipla, que só
     faz sentido quando houver um segundo país no acervo. */
  function montarSeletorPais() {
    var sel = document.getElementById("pais-seletor");
    sel.innerHTML = "";

    PAISES.forEach(function (p) {
      var o = document.createElement("option");
      o.value = p.id;
      o.textContent = p.nome;
      sel.appendChild(o);
    });

    sel.value = paisesVisiveis[0];

    sel.addEventListener("change", function () {
      paisesVisiveis = [sel.value];
      temasSelecionados = [];
      fechar();
      montarEras();
      montarFiltros();
      construir(ANO_MIN);
      marcarEraVisivel();
      marcarTransbordo();
    });
  }

  // ---------- tema claro / escuro ----------

  /* O tema inicial já foi aplicado por um script no <head>, antes da
     primeira pintura. Aqui só tratamos a troca manual. */
  document.getElementById("tema-troca").addEventListener("click", function () {
    var atual = document.documentElement.getAttribute("data-tema");
    var novo = atual === "escuro" ? "claro" : "escuro";
    document.documentElement.setAttribute("data-tema", novo);
    try { localStorage.setItem("tema", novo); } catch (e) {}
  });

  // ---------- início ----------

  montarSeletorPais();
  montarApoiadores();
  montarEscalas();
  montarEras();
  montarFiltros();
  construir();
  marcarEraVisivel();
  marcarTransbordo();

  /* Abre o que a URL pedir. Roda na carga e a cada troca de hash — sem o
     `hashchange`, colar um endereço diferente na barra com a página já aberta
     não faria nada, porque o documento não recarrega. Os `false` evitam
     reescrever o hash que acabou de ser lido. */
  function rotear() {
    var h = location.hash;

    if (h === "#sobre")      { abrirSobre(false); return; }
    if (h === "#apoiadores") { abrirApoiadores(false); return; }
    if (!h)                  { fechar(); return; }

    var alvo = h.slice(1);
    for (var i = 0; i < visiveis.length; i++) {
      if (identificador(visiveis[i]) === alvo) { abrir(i, false); return; }
    }

    /* Endereço que não corresponde a marco nenhum — link antigo de um marco
       renomeado, ou um marco escondido pelo filtro. Fecha e limpa o hash: é
       melhor cair na linha do tempo do que ver um conteúdo que a URL não
       promete. `fechar()` usa replaceState, que não dispara hashchange. */
    fechar();
  }

  window.addEventListener("hashchange", rotear);
  rotear();

  // as larguras dos rótulos mudam quando a fonte termina de carregar
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(distribuirRotulos);
  }
})();
