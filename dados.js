/* ACERVO — Brasil, 70 marcos.
   -------------------------------------------------------------------------
   Critério editorial: nomenclatura e interpretação correntes na historiografia
   acadêmica brasileira. Quando a leitura de um episódio é genuinamente
   disputada entre historiadores, o campo `disputa` diz o que está em jogo —
   não se usa esse campo para dar peso igual a revisionismo sem lastro.

   Fontes: verbete de entrada na Wikipédia em português (que expõe as próprias
   referências) e, sempre que existir, o documento primário no Planalto ou em
   acervo público. Não se usa material de produtoras com linha editorial
   revisionista.

   O modelo é multi-país; por ora só o Brasil está preenchido.
   ------------------------------------------------------------------------- */

const PAISES = [
  {
    id: "br",
    nome: "Brasil",
    eras: [
      { nome: "Colônia",           inicio: 1500, fim: 1822 },
      { nome: "Império",           inicio: 1822, fim: 1889 },
      { nome: "República Velha",   inicio: 1889, fim: 1930 },
      { nome: "Era Vargas",        inicio: 1930, fim: 1945 },
      { nome: "República de 1946", inicio: 1945, fim: 1964 },
      { nome: "Ditadura Militar",  inicio: 1964, fim: 1985 },
      { nome: "Nova República",    inicio: 1985, fim: 2030 }
    ]
  }
];

/* Apoiadores financeiros do projeto, na ordem em que entraram. Vazia por
   enquanto: a página de apoiadores mostra a chamada do Apoia-se até o
   primeiro nome chegar aqui.
     { nome: "Nome que a pessoa quer ver", desde: 2026 }   — desde é opcional */
const APOIADORES = [];

const TEMAS = [
  { id: "politica",   nome: "Política" },
  { id: "sociedade",  nome: "Sociedade" },
  { id: "economia",   nome: "Economia" },
  { id: "cultura",    nome: "Cultura" },
  { id: "territorio", nome: "Território" },
  { id: "conflito",   nome: "Conflito" }
];

/* Campos de um marco
   ------------------
   pais      obrigatório — id em PAISES
   ano       obrigatório
   anoFim    opcional — vira período (barra sobre a linha) em vez de ponto
   titulo    curto; é o que aparece na linha
   temas     1–3 ids de TEMAS
   resumo    uma frase; dica de hover e topo do painel
   detalhe   dois a quatro períodos; corpo do painel
   disputa   opcional — o que a historiografia disputa neste marco
   imagem    opcional — SÓ domínio público ou uso livre, sempre com crédito
             { url, legenda, credito, licenca }
   fontes    1–3 itens; a primeira é a principal
             { tipo: "verbete" | "documento" | "acervo", titulo, url } */

const MARCOS = [

  /* ---------------------------------------------------------------- COLÔNIA */

  {
    pais: "br", ano: 1500,
    titulo: "Chegada da frota de Cabral",
    temas: ["territorio", "sociedade"],
    resumo: "A esquadra portuguesa alcança o litoral do atual sul da Bahia.",
    detalhe: "Em 22 de abril de 1500 a frota de Pedro Álvares Cabral avista o Monte Pascoal e, nos dias seguintes, ancora em Porto Seguro. O território já era habitado por algo entre dois e cinco milhões de pessoas, de centenas de povos e línguas distintas. Nos cem anos seguintes, guerras, escravização e sobretudo epidemias de doenças trazidas da Europa reduziriam drasticamente essa população.",
    disputa: "O termo tradicional “descobrimento” adota o ponto de vista europeu e supõe uma terra vazia; a historiografia atual fala em chegada, encontro ou conquista.",
    fontes: [
      { tipo: "verbete", titulo: "Descobrimento do Brasil", url: "https://pt.wikipedia.org/wiki/Descobrimento_do_Brasil" },
      { tipo: "documento", titulo: "Carta de Pero Vaz de Caminha", url: "https://pt.wikisource.org/wiki/Carta_a_El_Rei_D._Manuel" }
    ]
  },
  {
    pais: "br", ano: 1534, anoFim: 1549,
    titulo: "Capitanias hereditárias",
    temas: ["politica", "territorio"],
    resumo: "A Coroa divide o território em faixas doadas a donatários particulares.",
    detalhe: "Sem recursos para ocupar a colônia diretamente, D. João III reparte o litoral em quinze lotes entregues a nobres e comerciantes, que assumem a obrigação de povoar, defender e explorar em troca de amplos poderes. Só São Vicente e Pernambuco prosperam. O fracasso do modelo leva à criação do Governo-geral em 1549.",
    fontes: [
      { tipo: "verbete", titulo: "Capitanias hereditárias", url: "https://pt.wikipedia.org/wiki/Capitanias_hereditárias" }
    ]
  },
  {
    pais: "br", ano: 1549,
    titulo: "Governo-geral e Salvador",
    temas: ["politica", "territorio"],
    resumo: "Tomé de Sousa funda Salvador, primeira capital, e centraliza a administração.",
    detalhe: "A Coroa cria um governo-geral para unificar defesa, justiça e arrecadação, e envia Tomé de Sousa com militares, funcionários e os primeiros jesuítas, liderados por Manuel da Nóbrega. Salvador permaneceria capital por 214 anos, até 1763.",
    fontes: [
      { tipo: "verbete", titulo: "Tomé de Sousa", url: "https://pt.wikipedia.org/wiki/Tomé_de_Sousa" }
    ]
  },
  {
    pais: "br", ano: 1550, anoFim: 1850,
    titulo: "Tráfico atlântico de africanos",
    temas: ["sociedade", "economia"],
    resumo: "Cerca de 4,9 milhões de africanos escravizados desembarcam no Brasil — quase metade de todo o tráfico atlântico.",
    detalhe: "Do século XVI ao XIX, o Brasil recebe o maior contingente de africanos escravizados de todo o continente americano, segundo os registros reunidos pelo projeto SlaveVoyages. A escravidão sustenta o açúcar, o ouro e o café, e estrutura a sociedade colonial e imperial inteira. É o processo mais longo e mais determinante da história brasileira.",
    fontes: [
      { tipo: "verbete", titulo: "Escravidão no Brasil", url: "https://pt.wikipedia.org/wiki/Escravidão_no_Brasil" },
      { tipo: "acervo", titulo: "SlaveVoyages — base de dados do tráfico transatlântico", url: "https://www.slavevoyages.org/" }
    ]
  },
  {
    pais: "br", ano: 1580, anoFim: 1640,
    titulo: "União Ibérica",
    temas: ["politica", "territorio"],
    resumo: "Portugal e suas colônias passam sessenta anos sob a coroa espanhola.",
    detalhe: "Com a morte de D. Sebastião e a crise sucessória, Filipe II da Espanha assume também o trono português. Para o Brasil, o período afrouxa na prática os limites de Tordesilhas e favorece a expansão para o interior — mas também arrasta a colônia para as guerras da Espanha, atraindo os ataques holandeses.",
    fontes: [
      { tipo: "verbete", titulo: "União Ibérica", url: "https://pt.wikipedia.org/wiki/União_Ibérica" }
    ]
  },
  {
    pais: "br", ano: 1600, anoFim: 1720,
    titulo: "Bandeiras paulistas",
    temas: ["territorio", "conflito"],
    resumo: "Expedições partem de São Paulo em busca de indígenas para escravizar e, depois, de metais.",
    detalhe: "As bandeiras destroem as missões jesuíticas do Guairá e de Itatim, capturando dezenas de milhares de indígenas guaranis, e depois se voltam para a prospecção de ouro, que encontram em Minas no fim do século. Ampliaram enormemente o território efetivamente ocupado.",
    disputa: "A imagem do bandeirante como herói desbravador, construída no século XIX e consagrada no XX, foi revista: a historiografia trata as bandeiras primeiro como empresas de apresamento de indígenas.",
    fontes: [
      { tipo: "verbete", titulo: "Bandeirantes", url: "https://pt.wikipedia.org/wiki/Bandeirantes" }
    ]
  },
  {
    pais: "br", ano: 1630, anoFim: 1654,
    titulo: "Brasil holandês",
    temas: ["conflito", "territorio"],
    resumo: "A Companhia das Índias Ocidentais ocupa Pernambuco e o Nordeste açucareiro.",
    detalhe: "Depois de uma tentativa frustrada na Bahia, os holandeses tomam Recife e Olinda em 1630. O governo de Maurício de Nassau (1637-1644) traz urbanização, tolerância religiosa relativa e expedições científicas e artísticas. A Insurreição Pernambucana e as duas batalhas dos Guararapes encerram a ocupação em 1654.",
    fontes: [
      { tipo: "verbete", titulo: "Invasões holandesas no Brasil", url: "https://pt.wikipedia.org/wiki/Invasões_holandesas_no_Brasil" }
    ]
  },
  {
    pais: "br", ano: 1695,
    titulo: "Queda de Palmares",
    temas: ["sociedade", "conflito"],
    resumo: "O maior quilombo das Américas é destruído e Zumbi é morto.",
    detalhe: "Palmares, na serra da Barriga, atual Alagoas, resistiu por quase um século e chegou a reunir milhares de pessoas em vários povoados. Cercado por tropas comandadas pelo bandeirante Domingos Jorge Velho, o núcleo central cai em 1694; Zumbi é capturado e morto em 20 de novembro de 1695 — data que hoje marca o Dia da Consciência Negra.",
    fontes: [
      { tipo: "verbete", titulo: "Quilombo dos Palmares", url: "https://pt.wikipedia.org/wiki/Quilombo_dos_Palmares" },
      { tipo: "verbete", titulo: "Zumbi dos Palmares", url: "https://pt.wikipedia.org/wiki/Zumbi_dos_Palmares" }
    ]
  },
  {
    pais: "br", ano: 1695, anoFim: 1780,
    titulo: "Ciclo do ouro",
    temas: ["economia", "territorio"],
    resumo: "A descoberta de ouro em Minas desloca o eixo econômico para o Centro-Sul.",
    detalhe: "O achado de ouro de aluvião desencadeia a primeira grande corrida migratória da América portuguesa: em poucas décadas surgem Vila Rica, Mariana e Sabará, e a população da colônia se multiplica. A cobrança do quinto e as tentativas de conter o contrabando alimentariam as revoltas do fim do século.",
    fontes: [
      { tipo: "verbete", titulo: "Ciclo do ouro", url: "https://pt.wikipedia.org/wiki/Ciclo_do_ouro" }
    ]
  },
  {
    pais: "br", ano: 1750,
    titulo: "Tratado de Madri",
    temas: ["territorio", "politica"],
    resumo: "Portugal e Espanha abandonam Tordesilhas e desenham o contorno do Brasil.",
    detalhe: "Negociado por Alexandre de Gusmão, o tratado adota o princípio do uti possidetis — quem ocupa, possui — reconhecendo a expansão portuguesa muito além da linha de 1494. É a base do território brasileiro atual, apesar de revisões posteriores. Sua aplicação desencadeia a Guerra Guaranítica contra as missões jesuíticas do Sul.",
    fontes: [
      { tipo: "verbete", titulo: "Tratado de Madri (1750)", url: "https://pt.wikipedia.org/wiki/Tratado_de_Madri_(1750)" }
    ]
  },
  {
    pais: "br", ano: 1789,
    titulo: "Inconfidência Mineira",
    temas: ["politica"],
    resumo: "Conspiração de elites de Minas contra o domínio português é delatada e desmontada.",
    detalhe: "Pressionados pela ameaça da derrama sobre uma produção de ouro em declínio, e influenciados pelas independências americana e francesa, letrados, militares e padres planejam uma república em Minas. O movimento é denunciado antes de qualquer ação. Tiradentes, o de menor posição social entre os líderes, é o único executado, em 1792.",
    disputa: "A transformação de Tiradentes em herói nacional foi obra deliberada da Primeira República, que precisava de um mártir republicano; o movimento em si não propunha abolir a escravidão.",
    fontes: [
      { tipo: "verbete", titulo: "Inconfidência Mineira", url: "https://pt.wikipedia.org/wiki/Inconfidência_Mineira" }
    ]
  },
  {
    pais: "br", ano: 1798,
    titulo: "Conjuração Baiana",
    temas: ["sociedade", "politica"],
    resumo: "Alfaiates, soldados e escravizados de Salvador pregam república, igualdade racial e fim da escravidão.",
    detalhe: "Também chamada Revolta dos Alfaiates, foi o movimento mais radical do período colonial: seus panfletos, afixados pela cidade, defendiam o fim da escravidão e a igualdade entre as pessoas independentemente da cor. Diferente da Inconfidência, teve base popular e majoritariamente negra. Quatro líderes foram enforcados e esquartejados.",
    fontes: [
      { tipo: "verbete", titulo: "Conjuração Baiana", url: "https://pt.wikipedia.org/wiki/Conjuração_Baiana" }
    ]
  },
  {
    pais: "br", ano: 1808,
    titulo: "A corte portuguesa no Rio",
    temas: ["politica", "economia"],
    resumo: "Fugindo de Napoleão, D. João transfere a sede do império para o Brasil e abre os portos.",
    detalhe: "Cerca de dez mil pessoas desembarcam no Rio de Janeiro, que vira capital de um império europeu — caso único na história colonial. Ainda em 1808 a abertura dos portos às nações amigas encerra o monopólio comercial português. Seguem-se o Banco do Brasil, a Imprensa Régia, a Biblioteca Real e as primeiras escolas superiores.",
    fontes: [
      { tipo: "verbete", titulo: "Transferência da corte portuguesa para o Brasil", url: "https://pt.wikipedia.org/wiki/Transferência_da_corte_portuguesa_para_o_Brasil" }
    ]
  },
  {
    pais: "br", ano: 1817,
    titulo: "Revolução Pernambucana",
    temas: ["politica", "conflito"],
    resumo: "Pernambuco proclama uma república e resiste por 75 dias.",
    detalhe: "Padres, militares, comerciantes e senhores de engenho depõem o governador e instalam um governo provisório republicano, com uma lei orgânica que previa liberdade de imprensa e de culto — mas mantinha a escravidão. O movimento se espalha pela Paraíba e pelo Rio Grande do Norte antes de ser esmagado pelas tropas reais.",
    fontes: [
      { tipo: "verbete", titulo: "Revolução Pernambucana", url: "https://pt.wikipedia.org/wiki/Revolução_Pernambucana" }
    ]
  },

  /* ---------------------------------------------------------------- IMPÉRIO */

  {
    pais: "br", ano: 1822,
    titulo: "Independência",
    temas: ["politica"],
    resumo: "D. Pedro rompe com Lisboa e é aclamado imperador de um Brasil unitário e monárquico.",
    detalhe: "Pressionado pelas Cortes portuguesas a retornar e a recolonizar o Brasil, o príncipe regente decide ficar e, em 7 de setembro, declara a separação. A independência não foi pacífica: guerras na Bahia, no Maranhão, no Pará e na Cisplatina se estendem até 1824. Portugal reconhece o país em 1825, mediante indenização paga com empréstimo inglês.",
    disputa: "A cena do grito às margens do Ipiranga é uma construção posterior, consolidada pelo quadro de Pedro Américo em 1888; o processo foi longo, negociado entre elites e militarmente disputado.",
    fontes: [
      { tipo: "verbete", titulo: "Independência do Brasil", url: "https://pt.wikipedia.org/wiki/Independência_do_Brasil" }
    ]
  },
  {
    pais: "br", ano: 1824,
    titulo: "Constituição de 1824",
    temas: ["politica"],
    resumo: "Outorgada por D. Pedro I, cria o Poder Moderador e o voto censitário.",
    detalhe: "Depois de dissolver a Assembleia Constituinte à força, o imperador impõe uma carta redigida por um conselho de sua confiança. Além dos três poderes clássicos, institui o Moderador, exercido pelo monarca. O voto é censitário — exige renda mínima — e exclui mulheres e escravizados. A reação no Nordeste produz a Confederação do Equador, esmagada no mesmo ano.",
    fontes: [
      { tipo: "verbete", titulo: "Constituição brasileira de 1824", url: "https://pt.wikipedia.org/wiki/Constituição_brasileira_de_1824" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1824", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao24.htm" }
    ]
  },
  {
    pais: "br", ano: 1831, anoFim: 1840,
    titulo: "Período Regencial",
    temas: ["politica", "conflito"],
    resumo: "D. Pedro I abdica e o país é governado por regentes durante a menoridade do herdeiro.",
    detalhe: "Nove anos de disputa entre projetos centralizadores e federalistas, com revoltas em quase todas as províncias: Cabanagem, Sabinada, Balaiada, Malês e Farroupilha. O Ato Adicional de 1834 descentraliza, e a Lei de Interpretação de 1840 recentraliza. O impasse se encerra com o golpe da maioridade, que coroa Pedro II aos 14 anos.",
    fontes: [
      { tipo: "verbete", titulo: "Período regencial", url: "https://pt.wikipedia.org/wiki/Período_regencial" }
    ]
  },
  {
    pais: "br", ano: 1835,
    titulo: "Revolta dos Malês",
    temas: ["sociedade", "conflito"],
    resumo: "Africanos muçulmanos escravizados e libertos se levantam em Salvador.",
    detalhe: "A maior revolta urbana de escravizados da história das Américas foi organizada por africanos letrados em árabe, sobretudo nagôs e hauçás de religião islâmica. Delatada na véspera, foi contida em uma noite de combates. A repressão incluiu execuções, açoites e deportações em massa para a África, e provocou leis de controle sobre africanos libertos em todo o país.",
    fontes: [
      { tipo: "verbete", titulo: "Revolta dos Malês", url: "https://pt.wikipedia.org/wiki/Revolta_dos_Malês" }
    ]
  },
  {
    pais: "br", ano: 1835, anoFim: 1840,
    titulo: "Cabanagem",
    temas: ["conflito", "sociedade"],
    resumo: "No Pará, indígenas, negros e mestiços pobres tomam o poder da província.",
    detalhe: "A mais popular das revoltas regenciais: os cabanos chegam a tomar Belém e a governar o Grão-Pará. A repressão foi excepcionalmente violenta — as estimativas mais aceitas falam em cerca de 30 a 40 mil mortos, algo em torno de um quinto da população da província.",
    fontes: [
      { tipo: "verbete", titulo: "Cabanagem", url: "https://pt.wikipedia.org/wiki/Cabanagem" }
    ]
  },
  {
    pais: "br", ano: 1835, anoFim: 1845,
    titulo: "Revolução Farroupilha",
    temas: ["conflito", "politica"],
    resumo: "A mais longa guerra civil do país opõe estancieiros gaúchos ao governo central.",
    detalhe: "Insatisfeitos com os impostos sobre o charque e com a centralização imperial, os farrapos proclamam a República Rio-Grandense e chegam a se aliar à Catarinense. O conflito dura dez anos e termina com a Paz de Ponche Verde. A promessa de alforria aos lanceiros negros que lutaram pelos farrapos não foi cumprida.",
    fontes: [
      { tipo: "verbete", titulo: "Revolução Farroupilha", url: "https://pt.wikipedia.org/wiki/Revolução_Farroupilha" }
    ]
  },
  {
    pais: "br", ano: 1850,
    titulo: "Fim do tráfico negreiro",
    temas: ["sociedade", "politica"],
    resumo: "A Lei Eusébio de Queirós torna efetiva a proibição de importar africanos escravizados.",
    detalhe: "Sob forte pressão britânica — inclusive o Bill Aberdeen, que autorizava a marinha inglesa a apreender navios negreiros em qualquer mar —, o Império finalmente faz cumprir uma proibição que existia no papel desde 1831. O tráfico interno se intensifica, deslocando pessoas escravizadas do Nordeste para as lavouras de café do Sudeste.",
    fontes: [
      { tipo: "verbete", titulo: "Lei Eusébio de Queirós", url: "https://pt.wikipedia.org/wiki/Lei_Eusébio_de_Queirós" },
      { tipo: "documento", titulo: "Texto da Lei n.º 581, de 1850", url: "https://www.planalto.gov.br/ccivil_03/leis/lim/lim581.htm" }
    ]
  },
  {
    pais: "br", ano: 1850,
    titulo: "Lei de Terras",
    temas: ["economia", "territorio"],
    resumo: "A terra passa a ser adquirida só por compra, fechando o acesso a quem não tem dinheiro.",
    detalhe: "Promulgada duas semanas depois do fim do tráfico, a lei extingue a posse como forma de aquisição e determina que terras devolutas só sejam vendidas pelo Estado. Com o fim da escravidão a caminho, o efeito é bloquear o acesso à terra justamente para libertos e imigrantes pobres, mantendo-os como mão de obra. É uma das raízes da concentração fundiária brasileira.",
    fontes: [
      { tipo: "verbete", titulo: "Lei de Terras", url: "https://pt.wikipedia.org/wiki/Lei_de_Terras" },
      { tipo: "documento", titulo: "Texto da Lei n.º 601, de 1850", url: "https://www.planalto.gov.br/ccivil_03/leis/lim/lim601.htm" }
    ]
  },
  {
    pais: "br", ano: 1864, anoFim: 1870,
    titulo: "Guerra do Paraguai",
    temas: ["conflito", "politica"],
    resumo: "O maior conflito armado da América do Sul devasta o Paraguai e transforma o Exército brasileiro.",
    detalhe: "A Tríplice Aliança entre Brasil, Argentina e Uruguai enfrenta o Paraguai de Solano López em seis anos de guerra. O Paraguai perde parte substancial de sua população e território. No Brasil, o conflito custa caro, fortalece o Exército como ator político autônomo e expõe a contradição de enviar escravizados alforriados para lutar — dois fatores no desgaste da monarquia.",
    disputa: "A tese de que a guerra teria sido orquestrada pela Inglaterra, popular nos anos 1960-70, foi descartada pela pesquisa posterior, que aponta disputas regionais pela navegação do Prata.",
    fontes: [
      { tipo: "verbete", titulo: "Guerra do Paraguai", url: "https://pt.wikipedia.org/wiki/Guerra_do_Paraguai" }
    ]
  },
  {
    pais: "br", ano: 1871,
    titulo: "Lei do Ventre Livre",
    temas: ["sociedade"],
    resumo: "Filhos de escravizadas nascem livres — mas podem servir ao senhor até os 21 anos.",
    detalhe: "Primeira lei abolicionista de alcance nacional, declara livres os nascidos a partir dali, permitindo porém que o proprietário usufrua do trabalho da criança até os 21 anos como compensação. Na prática a maioria dos senhores escolheu essa via. A lei alimenta o debate público e as ações de liberdade na justiça, mas não desmonta o sistema.",
    fontes: [
      { tipo: "verbete", titulo: "Lei do Ventre Livre", url: "https://pt.wikipedia.org/wiki/Lei_do_Ventre_Livre" },
      { tipo: "documento", titulo: "Texto da Lei n.º 2.040, de 1871", url: "https://www.planalto.gov.br/ccivil_03/leis/lim/lim2040.htm" }
    ]
  },
  {
    pais: "br", ano: 1870, anoFim: 1930,
    titulo: "Imigração em massa",
    temas: ["sociedade", "economia"],
    resumo: "Milhões de europeus e japoneses chegam para substituir a mão de obra escravizada.",
    detalhe: "Italianos, portugueses, espanhóis, alemães e, a partir de 1908, japoneses chegam sobretudo para as lavouras de café de São Paulo e para as colônias do Sul. A política foi explicitamente associada a projetos de branqueamento da população, defendidos por parte das elites da época. Transformou a demografia, a cultura e a formação da classe operária urbana.",
    fontes: [
      { tipo: "verbete", titulo: "Imigração no Brasil", url: "https://pt.wikipedia.org/wiki/Imigração_no_Brasil" }
    ]
  },
  {
    pais: "br", ano: 1888,
    titulo: "Lei Áurea",
    temas: ["sociedade", "politica"],
    resumo: "A abolição formal encerra quase quatro séculos de escravidão — sem reparação alguma.",
    detalhe: "Assinada em 13 de maio pela princesa Isabel, a lei de dois artigos chega depois de décadas de resistência negra, fugas em massa, quilombos, ações judiciais e campanha abolicionista. Nos últimos anos, a desobediência generalizada já tornara o sistema insustentável. Não houve nenhuma política de terra, educação ou indenização para os libertos.",
    disputa: "A narrativa da abolição como dádiva da princesa foi substituída pela ênfase no protagonismo das próprias pessoas escravizadas e do movimento abolicionista negro.",
    fontes: [
      { tipo: "verbete", titulo: "Lei Áurea", url: "https://pt.wikipedia.org/wiki/Lei_Áurea" },
      { tipo: "documento", titulo: "Texto da Lei n.º 3.353, de 1888", url: "https://www.planalto.gov.br/ccivil_03/leis/lim/lim3353.htm" }
    ]
  },
  {
    pais: "br", ano: 1889,
    titulo: "Proclamação da República",
    temas: ["politica"],
    resumo: "Um golpe militar depõe D. Pedro II e instaura a República sem participação popular.",
    detalhe: "Em 15 de novembro, tropas lideradas por Deodoro da Fonseca depõem o gabinete e o regime monárquico, com apoio de republicanos civis e de setores cafeicultores descontentes com a abolição. A família imperial é exilada. O novo regime manteve o país sob controle de oligarquias regionais e reduziu ainda mais o eleitorado ao excluir analfabetos.",
    fontes: [
      { tipo: "verbete", titulo: "Proclamação da República", url: "https://pt.wikipedia.org/wiki/Proclamação_da_República_do_Brasil" }
    ]
  },

  /* -------------------------------------------------------- REPÚBLICA VELHA */

  {
    pais: "br", ano: 1891,
    titulo: "Constituição de 1891",
    temas: ["politica"],
    resumo: "A primeira carta republicana cria o federalismo, o presidencialismo e o Estado laico.",
    detalhe: "Inspirada no modelo norte-americano, separa Igreja e Estado, institui o habeas corpus e dá ampla autonomia aos estados. Mantém o voto aberto e exclui analfabetos, mulheres, soldados e religiosos — o eleitorado fica em torno de 2% da população. A autonomia estadual consolidaria o domínio de São Paulo e Minas sobre a política nacional.",
    fontes: [
      { tipo: "verbete", titulo: "Constituição brasileira de 1891", url: "https://pt.wikipedia.org/wiki/Constituição_brasileira_de_1891" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1891", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao91.htm" }
    ]
  },
  {
    pais: "br", ano: 1896, anoFim: 1897,
    titulo: "Guerra de Canudos",
    temas: ["conflito", "sociedade"],
    resumo: "O Exército arrasa o povoado sertanejo de Antônio Conselheiro depois de quatro expedições.",
    detalhe: "Comunidade de milhares de sertanejos pobres no interior da Bahia, Canudos foi apresentada pela imprensa e pelo governo como conspiração monarquista contra a República — acusação sem base. Três expedições fracassam antes do cerco final, que destrói o arraial e mata quase todos os seus habitantes. Euclides da Cunha, que cobriu a guerra como repórter, publicaria Os Sertões em 1902.",
    disputa: "A tese monarquista foi desmontada ainda por Euclides da Cunha; a historiografia trata Canudos como conflito agrário e religioso, não político-dinástico.",
    fontes: [
      { tipo: "verbete", titulo: "Guerra de Canudos", url: "https://pt.wikipedia.org/wiki/Guerra_de_Canudos" }
    ]
  },
  {
    pais: "br", ano: 1904,
    titulo: "Revolta da Vacina",
    temas: ["sociedade", "conflito"],
    resumo: "A vacinação obrigatória contra a varíola e as reformas urbanas provocam uma semana de combates no Rio.",
    detalhe: "A campanha de Oswaldo Cruz é imposta sem informação adequada e junto com a reforma de Pereira Passos, que demolia cortiços e expulsava a população pobre do centro — o chamado bota-abaixo. A revolta mistura resistência à truculência sanitária, à remoção forçada e ao recrutamento. Dezenas de mortos, centenas de presos e deportados para o Acre.",
    fontes: [
      { tipo: "verbete", titulo: "Revolta da Vacina", url: "https://pt.wikipedia.org/wiki/Revolta_da_Vacina" }
    ]
  },
  {
    pais: "br", ano: 1910,
    titulo: "Revolta da Chibata",
    temas: ["sociedade", "conflito"],
    resumo: "Marinheiros negros se amotinam contra os castigos corporais na Marinha.",
    detalhe: "Liderados por João Cândido, marinheiros tomam os encouraçados mais modernos da esquadra e apontam os canhões para o Rio de Janeiro, exigindo o fim da chibata — abolida na sociedade havia 22 anos, mas mantida na Marinha. O governo cede e anistia os revoltosos, depois volta atrás: muitos são presos, expulsos ou mortos.",
    fontes: [
      { tipo: "verbete", titulo: "Revolta da Chibata", url: "https://pt.wikipedia.org/wiki/Revolta_da_Chibata" }
    ]
  },
  {
    pais: "br", ano: 1917,
    titulo: "Greve geral de 1917",
    temas: ["sociedade", "economia"],
    resumo: "A primeira greve geral do país paralisa São Paulo e põe a classe operária na cena política.",
    detalhe: "Puxada por trabalhadores têxteis e organizada em grande parte por anarcossindicalistas, a greve reúne dezenas de milhares de pessoas contra a carestia, a jornada excessiva e o trabalho infantil. A morte do sapateiro José Martinez pela polícia transforma o enterro em manifestação de massa. O movimento arranca aumentos e abre o ciclo de agitação operária de 1917-1920.",
    fontes: [
      { tipo: "verbete", titulo: "Greve geral de 1917 no Brasil", url: "https://pt.wikipedia.org/wiki/Greve_geral_de_1917" }
    ]
  },
  {
    pais: "br", ano: 1922,
    titulo: "Semana de Arte Moderna",
    temas: ["cultura"],
    resumo: "No centenário da independência, o modernismo se apresenta no Theatro Municipal de São Paulo.",
    detalhe: "Entre 13 e 17 de fevereiro, Mário e Oswald de Andrade, Villa-Lobos, Anita Malfatti, Di Cavalcanti e Menotti del Picchia provocam a plateia com uma ruptura estética que buscava uma linguagem brasileira moderna. O impacto imediato foi restrito a São Paulo; a importância fundadora se consolidou nas décadas seguintes.",
    disputa: "A leitura da Semana como marco absoluto do modernismo foi relativizada: havia modernismo antes dela e fora do eixo São Paulo–Rio, e parte do peso simbólico foi construída retrospectivamente.",
    fontes: [
      { tipo: "verbete", titulo: "Semana de Arte Moderna", url: "https://pt.wikipedia.org/wiki/Semana_de_Arte_Moderna" }
    ]
  },
  {
    pais: "br", ano: 1922,
    titulo: "Tenentismo",
    temas: ["politica", "conflito"],
    resumo: "A Revolta do Forte de Copacabana abre uma década de levantes militares contra as oligarquias.",
    detalhe: "Em 5 de julho, oficiais jovens se sublevam no Rio; dezoito deles saem a caminhar pela praia contra as tropas legalistas. Militarmente irrelevante, o episódio inaugura o tenentismo, movimento de jovens oficiais contra o voto fraudulento e o domínio das oligarquias estaduais. No mesmo ano é fundado o Partido Comunista do Brasil.",
    fontes: [
      { tipo: "verbete", titulo: "Revolta do Forte de Copacabana", url: "https://pt.wikipedia.org/wiki/Revolta_do_Forte_de_Copacabana" }
    ]
  },
  {
    pais: "br", ano: 1924, anoFim: 1927,
    titulo: "Coluna Prestes",
    temas: ["politica", "conflito"],
    resumo: "Uma coluna rebelde percorre 25 mil quilômetros pelo interior sem ser derrotada.",
    detalhe: "Formada pela junção dos levantes tenentistas de São Paulo e do Rio Grande do Sul, a coluna comandada por Luís Carlos Prestes e Miguel Costa atravessa treze estados pregando voto secreto e ensino público. Nunca conseguiu mobilizar a população rural, mas expôs a fragilidade do governo e projetou Prestes como figura nacional.",
    fontes: [
      { tipo: "verbete", titulo: "Coluna Prestes", url: "https://pt.wikipedia.org/wiki/Coluna_Prestes" }
    ]
  },
  /* ------------------------------------------------------------- ERA VARGAS */

  {
    pais: "br", ano: 1930,
    titulo: "Revolução de 1930",
    temas: ["politica"],
    resumo: "Getúlio Vargas chega ao poder e encerra a política dos governadores.",
    detalhe: "Após a derrota eleitoral da Aliança Liberal e o assassinato de João Pessoa, um movimento civil-militar depõe Washington Luís e impede a posse de Júlio Prestes. Vargas assume como chefe do Governo Provisório, dissolve o Congresso e nomeia interventores nos estados. Começa a centralização do poder, da legislação trabalhista e da política industrial.",
    fontes: [
      { tipo: "verbete", titulo: "Revolução de 1930", url: "https://pt.wikipedia.org/wiki/Revolução_de_1930" }
    ]
  },
  {
    pais: "br", ano: 1932,
    titulo: "Revolução Constitucionalista",
    temas: ["conflito", "politica"],
    resumo: "São Paulo pega em armas exigindo uma nova Constituição e perde militarmente.",
    detalhe: "Em julho, forças paulistas enfrentam o governo provisório reivindicando constitucionalização e autonomia estadual, sem o apoio esperado de Minas e do Rio Grande do Sul. Derrotadas em três meses, obtêm politicamente o que pediam: a Constituinte é convocada e produz a Constituição de 1934.",
    fontes: [
      { tipo: "verbete", titulo: "Revolução Constitucionalista de 1932", url: "https://pt.wikipedia.org/wiki/Revolução_Constitucionalista_de_1932" }
    ]
  },
  {
    pais: "br", ano: 1932,
    titulo: "Voto feminino",
    temas: ["sociedade", "politica"],
    resumo: "O novo Código Eleitoral garante às mulheres o direito de votar e ser votadas.",
    detalhe: "Resultado de décadas de campanha sufragista, sobretudo da Federação Brasileira pelo Progresso Feminino, liderada pela bióloga Bertha Lutz. O mesmo código cria a Justiça Eleitoral e o voto secreto, respostas diretas à fraude sistemática da República Velha. Em 1933 são eleitas as primeiras constituintes mulheres.",
    fontes: [
      { tipo: "verbete", titulo: "Direito de voto das mulheres no Brasil", url: "https://pt.wikipedia.org/wiki/Sufrágio_feminino_no_Brasil" }
    ]
  },
  {
    pais: "br", ano: 1934,
    titulo: "Constituição de 1934",
    temas: ["politica", "sociedade"],
    resumo: "Primeira carta brasileira a tratar de direitos sociais e trabalhistas.",
    detalhe: "Inspirada na Constituição alemã de Weimar, institui o salário mínimo, a jornada de oito horas, o repouso semanal e a Justiça do Trabalho, além de confirmar o voto feminino e secreto. Durou três anos: foi varrida pelo golpe de 1937.",
    fontes: [
      { tipo: "verbete", titulo: "Constituição brasileira de 1934", url: "https://pt.wikipedia.org/wiki/Constituição_brasileira_de_1934" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1934", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao34.htm" }
    ]
  },
  {
    pais: "br", ano: 1935,
    titulo: "Levante comunista e repressão",
    temas: ["politica", "conflito"],
    resumo: "Uma insurreição militar fracassada dá a Vargas o pretexto para a repressão em escala.",
    detalhe: "Levantes de militares ligados ao PCB e à Aliança Nacional Libertadora são debelados em Natal, Recife e Rio em poucos dias. O governo decreta estado de sítio, prende milhares, e usa o episódio para justificar poderes excepcionais. Olga Benário, grávida e judia, é deportada para a Alemanha nazista, onde seria morta.",
    disputa: "A designação “Intentona Comunista”, adotada oficialmente pelo regime, é termo da propaganda da época; a historiografia usa levante ou insurreição de 1935.",
    fontes: [
      { tipo: "verbete", titulo: "Intentona Comunista", url: "https://pt.wikipedia.org/wiki/Intentona_Comunista" }
    ]
  },
  {
    pais: "br", ano: 1937, anoFim: 1945,
    titulo: "Estado Novo",
    temas: ["politica"],
    resumo: "Vargas dá um golpe, fecha o Congresso e governa sob ditadura por oito anos.",
    detalhe: "Com o pretexto do Plano Cohen, documento forjado que simulava um golpe comunista, Vargas cancela as eleições de 1938 e outorga a Constituição apelidada de polaca, de inspiração autoritária. O período combina censura, polícia política e tortura — o DIP e o DOPS de Filinto Müller — com a CLT, a Companhia Siderúrgica Nacional e uma política cultural nacionalista.",
    fontes: [
      { tipo: "verbete", titulo: "Estado Novo", url: "https://pt.wikipedia.org/wiki/Estado_Novo_(Brasil)" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1937", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao37.htm" }
    ]
  },
  {
    pais: "br", ano: 1943,
    titulo: "CLT",
    temas: ["sociedade", "economia"],
    resumo: "A Consolidação das Leis do Trabalho reúne e amplia os direitos trabalhistas.",
    detalhe: "Organiza em um só texto a legislação esparsa dos anos 1930: jornada, férias, carteira de trabalho, proteção ao trabalho da mulher e do menor, justiça do trabalho. Vem acompanhada de uma estrutura sindical atrelada ao Estado, com imposto sindical obrigatório e unicidade — controle que duraria décadas. Trabalhadores rurais e domésticos ficaram de fora.",
    fontes: [
      { tipo: "verbete", titulo: "Consolidação das Leis do Trabalho", url: "https://pt.wikipedia.org/wiki/Consolidação_das_Leis_do_Trabalho" },
      { tipo: "documento", titulo: "Decreto-Lei n.º 5.452, de 1943", url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" }
    ]
  },
  {
    pais: "br", ano: 1942, anoFim: 1945,
    titulo: "O Brasil na Segunda Guerra",
    temas: ["conflito", "politica"],
    resumo: "Submarinos alemães afundam navios brasileiros; a FEB vai combater na Itália.",
    detalhe: "Depois do torpedeamento de navios mercantes com centenas de mortos civis, o Brasil declara guerra ao Eixo em agosto de 1942. Cerca de 25 mil homens da Força Expedicionária Brasileira atuam na Itália entre 1944 e 1945, com destaque para Monte Castello. O contraste entre combater o fascismo fora e viver sob ditadura dentro acelera a queda de Vargas.",
    fontes: [
      { tipo: "verbete", titulo: "Força Expedicionária Brasileira", url: "https://pt.wikipedia.org/wiki/Força_Expedicionária_Brasileira" }
    ]
  },
  {
    pais: "br", ano: 1945,
    titulo: "Fim do Estado Novo",
    temas: ["politica"],
    resumo: "Vargas é deposto pelos militares e o país volta a ter eleições.",
    detalhe: "Pressionado pelo Manifesto dos Mineiros, pela imprensa e pela contradição da guerra, Vargas anistia presos políticos e marca eleições — mas é deposto em outubro pelos próprios generais que o haviam sustentado. Em dezembro, Eurico Gaspar Dutra é eleito presidente no primeiro pleito com partidos nacionais e voto secreto.",
    fontes: [
      { tipo: "verbete", titulo: "Era Vargas", url: "https://pt.wikipedia.org/wiki/Era_Vargas" }
    ]
  },

  /* ------------------------------------------------------- REPÚBLICA DE 1946 */

  {
    pais: "br", ano: 1946,
    titulo: "Constituição de 1946",
    temas: ["politica"],
    resumo: "A carta da redemocratização restaura direitos e equilíbrio entre os poderes.",
    detalhe: "Restabelece a independência do Legislativo e do Judiciário, as eleições diretas, a liberdade de imprensa e o direito de greve, mantendo os avanços sociais de 1934. Teve vida relativamente longa — 21 anos — mas conviveu com crises recorrentes, inclusive a cassação do PCB em 1947.",
    fontes: [
      { tipo: "verbete", titulo: "Constituição brasileira de 1946", url: "https://pt.wikipedia.org/wiki/Constituição_brasileira_de_1946" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1946", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao46.htm" }
    ]
  },
  {
    pais: "br", ano: 1953,
    titulo: "Criação da Petrobras",
    temas: ["economia", "politica"],
    resumo: "A campanha “o petróleo é nosso” resulta no monopólio estatal da exploração.",
    detalhe: "A Lei 2.004, assinada por Vargas em 3 de outubro, cria a Petróleo Brasileiro S.A. depois de uma das maiores mobilizações públicas do período democrático, que reuniu estudantes, militares nacionalistas, sindicatos e intelectuais. A empresa se torna símbolo do nacionalismo desenvolvimentista e eixo de disputas políticas por décadas.",
    fontes: [
      { tipo: "verbete", titulo: "Petrobras", url: "https://pt.wikipedia.org/wiki/Petrobras" },
      { tipo: "documento", titulo: "Lei n.º 2.004, de 1953", url: "https://www.planalto.gov.br/ccivil_03/leis/l2004.htm" }
    ]
  },
  {
    pais: "br", ano: 1954,
    titulo: "Suicídio de Vargas",
    temas: ["politica"],
    resumo: "Cercado por uma crise militar, o presidente se mata e deixa uma carta-testamento.",
    detalhe: "Depois do atentado da rua Tonelero, que matou um major da Aeronáutica e envolveu a guarda pessoal do presidente, militares exigem sua renúncia. Vargas se suicida no Palácio do Catete em 24 de agosto. A carta-testamento, lida no rádio, provoca comoção popular, inverte o clima político e adia por uma década a tomada do poder pelos militares.",
    fontes: [
      { tipo: "verbete", titulo: "Getúlio Vargas", url: "https://pt.wikipedia.org/wiki/Getúlio_Vargas" }
    ]
  },
  {
    pais: "br", ano: 1956, anoFim: 1961,
    titulo: "Plano de Metas",
    temas: ["economia"],
    resumo: "Juscelino promete cinquenta anos em cinco e acelera a industrialização.",
    detalhe: "Trinta metas em energia, transporte, indústria de base, alimentação e educação, com destaque para a implantação da indústria automobilística. O PIB cresce fortemente, mas o financiamento por emissão e dívida externa deixa inflação alta como herança. A construção de Brasília era a meta-síntese.",
    fontes: [
      { tipo: "verbete", titulo: "Plano de Metas", url: "https://pt.wikipedia.org/wiki/Plano_de_Metas" }
    ]
  },
  {
    pais: "br", ano: 1958,
    titulo: "Bossa nova e a primeira Copa",
    temas: ["cultura"],
    resumo: "O Brasil ganha seu primeiro mundial e inventa uma linguagem musical que correria o mundo.",
    detalhe: "Em junho a seleção vence a Copa na Suécia, com Pelé aos 17 anos e Garrincha. No mesmo ano, Chega de Saudade, de João Gilberto, Tom Jobim e Vinicius de Moraes, fixa a batida da bossa nova. Os dois eventos consolidaram uma imagem de modernidade e otimismo associada ao período JK.",
    fontes: [
      { tipo: "verbete", titulo: "Bossa nova", url: "https://pt.wikipedia.org/wiki/Bossa_nova" }
    ]
  },
  {
    pais: "br", ano: 1960,
    titulo: "Inauguração de Brasília",
    temas: ["territorio", "politica"],
    resumo: "A nova capital nasce no Planalto Central em menos de quatro anos de obras.",
    detalhe: "Projetada por Lúcio Costa, com arquitetura de Oscar Niemeyer e paisagismo de Burle Marx, Brasília é inaugurada em 21 de abril. A interiorização reorganiza o território e a malha rodoviária. Os operários que a construíram, os candangos, não tinham lugar no plano piloto e formaram as cidades satélites. Tornou-se Patrimônio da Humanidade em 1987.",
    fontes: [
      { tipo: "verbete", titulo: "Brasília", url: "https://pt.wikipedia.org/wiki/Brasília" }
    ]
  },
  {
    pais: "br", ano: 1961,
    titulo: "Renúncia de Jânio e a Campanha da Legalidade",
    temas: ["politica"],
    resumo: "Jânio Quadros renuncia em sete meses e militares tentam impedir a posse de Jango.",
    detalhe: "Ministros militares vetam a posse do vice João Goulart, em viagem à China. Leonel Brizola organiza no Rio Grande do Sul a Campanha da Legalidade, com uma rede de rádios mobilizando o país. A solução de compromisso é a adoção do parlamentarismo, que esvazia os poderes de Jango — revertida por plebiscito em 1963.",
    fontes: [
      { tipo: "verbete", titulo: "Campanha da Legalidade", url: "https://pt.wikipedia.org/wiki/Campanha_da_Legalidade" }
    ]
  },
  /* ------------------------------------------------------- DITADURA MILITAR */

  {
    pais: "br", ano: 1964,
    titulo: "Golpe militar",
    temas: ["politica", "conflito"],
    resumo: "Militares depõem João Goulart e inauguram 21 anos de regime autoritário.",
    detalhe: "Em 31 de março e 1º de abril, tropas marcham sobre o Rio e Brasília com apoio de setores empresariais, da grande imprensa, de governadores e do governo dos Estados Unidos, que preparou a Operação Brother Sam para dar suporte caso necessário. Goulart se exila. O Ato Institucional n.º 1 cassa mandatos e suspende direitos políticos.",
    disputa: "Setores que apoiaram o movimento o chamam de “revolução”; a historiografia acadêmica e o relatório da Comissão Nacional da Verdade o classificam como golpe de Estado seguido de ditadura.",
    fontes: [
      { tipo: "verbete", titulo: "Golpe de Estado no Brasil em 1964", url: "https://pt.wikipedia.org/wiki/Golpe_de_Estado_no_Brasil_em_1964" },
      { tipo: "documento", titulo: "Ato Institucional n.º 1, de 1964", url: "https://www.planalto.gov.br/ccivil_03/ait/ait-01-64.htm" }
    ]
  },
  {
    pais: "br", ano: 1968,
    titulo: "AI-5",
    temas: ["politica"],
    resumo: "O ato mais duro da ditadura suspende garantias e inaugura os anos de chumbo.",
    detalhe: "Editado em 13 de dezembro, o AI-5 fecha o Congresso por tempo indeterminado, suspende o habeas corpus para crimes políticos, autoriza cassações e confiscos sem recurso judicial e institucionaliza a censura prévia. A partir dali a tortura se torna prática sistemática e centralizada nos órgãos de repressão, como o DOI-Codi.",
    fontes: [
      { tipo: "verbete", titulo: "Ato Institucional Número Cinco", url: "https://pt.wikipedia.org/wiki/Ato_Institucional_Número_Cinco" },
      { tipo: "documento", titulo: "Ato Institucional n.º 5, de 1968", url: "https://www.planalto.gov.br/ccivil_03/ait/ait-05-68.htm" }
    ]
  },
  {
    pais: "br", ano: 1969, anoFim: 1973,
    titulo: "“Milagre econômico”",
    temas: ["economia"],
    resumo: "O PIB cresce a taxas chinesas enquanto a concentração de renda aumenta.",
    detalhe: "Crescimento médio em torno de 10% ao ano, puxado por crédito, obras faraônicas — Transamazônica, Itaipu, ponte Rio-Niterói — e arrocho salarial. A desigualdade se agrava, a dívida externa dispara e o modelo desaba com o choque do petróleo de 1973. É o período de maior popularidade do regime.",
    fontes: [
      { tipo: "verbete", titulo: "Milagre econômico brasileiro", url: "https://pt.wikipedia.org/wiki/Milagre_econômico_brasileiro" }
    ]
  },
  {
    pais: "br", ano: 1972, anoFim: 1975,
    titulo: "Guerrilha do Araguaia",
    temas: ["conflito", "politica"],
    resumo: "O Exército destrói um foco guerrilheiro do PCdoB e oculta o episódio por décadas.",
    detalhe: "Cerca de setenta militantes instalados no sul do Pará são cercados por milhares de militares em campanhas sucessivas. Quase todos foram mortos ou desapareceram, e os corpos, na maioria, nunca foram localizados. O caso levou à condenação do Brasil pela Corte Interamericana de Direitos Humanos em 2010, no caso Gomes Lund.",
    fontes: [
      { tipo: "verbete", titulo: "Guerrilha do Araguaia", url: "https://pt.wikipedia.org/wiki/Guerrilha_do_Araguaia" },
      { tipo: "documento", titulo: "Sentença da Corte Interamericana, caso Gomes Lund", url: "https://www.corteidh.or.cr/docs/casos/articulos/seriec_219_por.pdf" }
    ]
  },
  {
    pais: "br", ano: 1975,
    titulo: "Morte de Vladimir Herzog",
    temas: ["politica", "sociedade"],
    resumo: "O assassinato do jornalista no DOI-Codi vira ponto de virada contra o regime.",
    detalhe: "Herzog, diretor de jornalismo da TV Cultura, apresenta-se para depor e morre sob tortura. A versão oficial de suicídio é desmentida pela foto forjada e rejeitada publicamente. O culto ecumênico na Catedral da Sé, com oito mil pessoas, marca a reaproximação entre Igreja, imprensa e oposição, e acelera o desgaste da linha dura.",
    fontes: [
      { tipo: "verbete", titulo: "Vladimir Herzog", url: "https://pt.wikipedia.org/wiki/Vladimir_Herzog" }
    ]
  },
  {
    pais: "br", ano: 1978, anoFim: 1980,
    titulo: "Greves do ABC",
    temas: ["sociedade", "economia"],
    resumo: "Metalúrgicos paralisam a indústria automobilística e refundam o sindicalismo brasileiro.",
    detalhe: "Depois de uma década sem greves relevantes, operários de São Bernardo do Campo cruzam os braços em 1978 e voltam em 1979 e 1980 em paralisações de centenas de milhares. O movimento, liderado por Luiz Inácio Lula da Silva, desafia a estrutura sindical atrelada ao Estado e dá origem ao PT, em 1980, e à CUT, em 1983.",
    fontes: [
      { tipo: "verbete", titulo: "Greves do ABC Paulista", url: "https://pt.wikipedia.org/wiki/Greves_de_1978-1980_no_ABC_Paulista" }
    ]
  },
  {
    pais: "br", ano: 1979,
    titulo: "Lei da Anistia",
    temas: ["politica"],
    resumo: "Presos e exilados voltam, mas agentes do Estado também escapam de punição.",
    detalhe: "A lei assinada por João Figueiredo responde à campanha por anistia ampla, geral e irrestrita, movida sobretudo por familiares de mortos e desaparecidos. Sua interpretação como recíproca blindou torturadores — leitura mantida pelo STF em 2010 e contestada no mesmo ano pela Corte Interamericana de Direitos Humanos.",
    fontes: [
      { tipo: "verbete", titulo: "Lei da Anistia", url: "https://pt.wikipedia.org/wiki/Lei_da_Anistia" },
      { tipo: "documento", titulo: "Lei n.º 6.683, de 1979", url: "https://www.planalto.gov.br/ccivil_03/leis/l6683.htm" }
    ]
  },
  {
    pais: "br", ano: 1984,
    titulo: "Diretas Já",
    temas: ["politica", "sociedade"],
    resumo: "Comícios de milhões pedem eleição direta para presidente — e a emenda é derrotada.",
    detalhe: "A campanha reúne as maiores manifestações da história do país até então, com mais de um milhão de pessoas em São Paulo e no Rio. A emenda Dante de Oliveira não alcança os dois terços necessários na Câmara em 25 de abril. A transição acaba se dando pelo Colégio Eleitoral, com a eleição indireta de Tancredo Neves em janeiro de 1985.",
    fontes: [
      { tipo: "verbete", titulo: "Diretas Já", url: "https://pt.wikipedia.org/wiki/Diretas_Já" }
    ]
  },
  {
    pais: "br", ano: 1985,
    titulo: "Fim da ditadura",
    temas: ["politica"],
    resumo: "Tancredo é eleito, adoece e morre; Sarney assume e começa a Nova República.",
    detalhe: "Eleito pelo Colégio Eleitoral com apoio de dissidentes do próprio regime, Tancredo Neves é internado na véspera da posse e morre em 21 de abril. Assume o vice José Sarney, que vinha da Arena. O desfecho simboliza a natureza negociada da transição brasileira, feita por acordo entre elites e sem ruptura com os responsáveis pela repressão.",
    fontes: [
      { tipo: "verbete", titulo: "Nova República", url: "https://pt.wikipedia.org/wiki/Nova_República" }
    ]
  },

  /* ---------------------------------------------------------- NOVA REPÚBLICA */

  {
    pais: "br", ano: 1988,
    titulo: "Constituição Cidadã",
    temas: ["politica", "sociedade"],
    resumo: "A Constituinte promulga a carta que funda o SUS e amplia direitos sociais.",
    detalhe: "Promulgada em 5 de outubro após vinte meses de trabalho e forte participação popular por emendas, cria o SUS e a seguridade social universal, reconhece direitos territoriais indígenas e quilombolas, torna o racismo crime inafiançável, proíbe a censura e amplia direitos trabalhistas. É a constituição brasileira mais duradoura depois da de 1824.",
    fontes: [
      { tipo: "verbete", titulo: "Constituição brasileira de 1988", url: "https://pt.wikipedia.org/wiki/Constituição_da_República_Federativa_do_Brasil_de_1988" },
      { tipo: "documento", titulo: "Texto integral da Constituição de 1988", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" }
    ]
  },
  {
    pais: "br", ano: 1988,
    titulo: "Assassinato de Chico Mendes",
    temas: ["sociedade", "territorio"],
    resumo: "A morte do seringueiro acreano projeta a questão ambiental amazônica no mundo.",
    detalhe: "Líder sindical e criador da proposta de reservas extrativistas, Chico Mendes organizava os empates — mobilizações pacíficas para impedir derrubadas. Foi morto a mando de fazendeiros em Xapuri, em dezembro. A repercussão internacional acelerou a criação das reservas extrativistas e ligou de vez a pauta ambiental à luta por direitos de populações tradicionais.",
    fontes: [
      { tipo: "verbete", titulo: "Chico Mendes", url: "https://pt.wikipedia.org/wiki/Chico_Mendes" }
    ]
  },
  {
    pais: "br", ano: 1989,
    titulo: "Volta das eleições diretas",
    temas: ["politica"],
    resumo: "Depois de 29 anos, os brasileiros voltam a eleger um presidente pelo voto direto.",
    detalhe: "Vinte e dois candidatos disputam o primeiro turno; o segundo opõe Fernando Collor a Luiz Inácio Lula da Silva, numa campanha marcada pela cobertura desequilibrada da TV e pela edição do último debate. Collor vence com cerca de 53% dos votos válidos e assume em março de 1990.",
    fontes: [
      { tipo: "verbete", titulo: "Eleição presidencial no Brasil em 1989", url: "https://pt.wikipedia.org/wiki/Eleição_presidencial_no_Brasil_em_1989" }
    ]
  },
  {
    pais: "br", ano: 1992,
    titulo: "Impeachment de Collor",
    temas: ["politica", "sociedade"],
    resumo: "Pressionado pelos caras-pintadas e por denúncias de corrupção, o presidente é cassado.",
    detalhe: "Depois das denúncias do irmão Pedro Collor e da CPI do esquema de PC Farias, estudantes com o rosto pintado lideram protestos pelo país. A Câmara autoriza o processo em setembro por 441 a 38. Collor renuncia em 29 de dezembro para tentar evitar a perda de direitos políticos, mas o Senado o inabilita por oito anos. Itamar Franco assume.",
    fontes: [
      { tipo: "verbete", titulo: "Impeachment de Fernando Collor", url: "https://pt.wikipedia.org/wiki/Impeachment_de_Fernando_Collor" }
    ]
  },
  {
    pais: "br", ano: 1994,
    titulo: "Plano Real",
    temas: ["economia"],
    resumo: "A nova moeda derruba a hiperinflação que corroía salários havia mais de uma década.",
    detalhe: "Formulado pela equipe de Fernando Henrique Cardoso no Ministério da Fazenda, o plano usa a URV como etapa de transição antes do real, lançado em 1º de julho. A inflação cai de mais de 2.000% ao ano para um dígito. A estabilidade reorganizou o consumo, o crédito e a política brasileira, e elegeu FHC ainda em 1994.",
    fontes: [
      { tipo: "verbete", titulo: "Plano Real", url: "https://pt.wikipedia.org/wiki/Plano_Real" },
      { tipo: "documento", titulo: "Lei n.º 9.069, de 1995", url: "https://www.planalto.gov.br/ccivil_03/leis/l9069.htm" }
    ]
  },
  {
    pais: "br", ano: 1996,
    titulo: "Massacre de Eldorado do Carajás",
    temas: ["conflito", "sociedade"],
    resumo: "A Polícia Militar mata 19 sem-terra no Pará e o caso vira o Dia da Luta pela Terra.",
    detalhe: "Cerca de 1.500 trabalhadores do MST bloqueavam a rodovia PA-150 quando a PM abriu fogo em 17 de abril. Dezenove morreram, muitos com tiros à queima-roupa e marcas de execução. A repercussão internacional pressionou pela criação do Ministério do Desenvolvimento Agrário. A data é hoje o Dia Internacional da Luta Camponesa.",
    fontes: [
      { tipo: "verbete", titulo: "Massacre de Eldorado do Carajás", url: "https://pt.wikipedia.org/wiki/Massacre_de_Eldorado_do_Carajás" }
    ]
  },
  {
    pais: "br", ano: 1995, anoFim: 2002,
    titulo: "Privatizações e estabilização",
    temas: ["economia", "politica"],
    resumo: "O Estado vende telecomunicações, siderurgia e mineração e adota metas fiscais.",
    detalhe: "Os governos FHC concluem o Programa Nacional de Desestatização, com destaque para a venda da Vale e do sistema Telebrás, e respondem às crises cambiais de 1998-99 com câmbio flutuante, metas de inflação e Lei de Responsabilidade Fiscal. O tripé macroeconômico resultante foi mantido pelos governos seguintes.",
    disputa: "O balanço das privatizações segue disputado entre economistas: divergem sobre preços de venda, ganhos de eficiência e os efeitos de longo prazo sobre tarifas e investimento.",
    fontes: [
      { tipo: "verbete", titulo: "Programa Nacional de Desestatização", url: "https://pt.wikipedia.org/wiki/Privatização_no_Brasil" }
    ]
  },
  {
    pais: "br", ano: 2002,
    titulo: "Eleição de Lula",
    temas: ["politica"],
    resumo: "Na quarta tentativa, um ex-operário metalúrgico é eleito presidente.",
    detalhe: "Lula vence o segundo turno com cerca de 61% dos votos válidos, o maior volume absoluto registrado até então. É a primeira vez que um trabalhador manual sem diploma superior chega à Presidência. O governo manteve o tripé macroeconômico herdado e ampliou programas sociais, num ciclo favorecido pela alta das commodities.",
    fontes: [
      { tipo: "verbete", titulo: "Eleição presidencial no Brasil em 2002", url: "https://pt.wikipedia.org/wiki/Eleição_presidencial_no_Brasil_em_2002" }
    ]
  },
  {
    pais: "br", ano: 2003,
    titulo: "Bolsa Família e políticas sociais",
    temas: ["sociedade", "economia"],
    resumo: "A unificação dos programas de transferência de renda alcança milhões de famílias.",
    detalhe: "O Bolsa Família unifica benefícios anteriores e condiciona o repasse à frequência escolar e ao acompanhamento de saúde das crianças. Combinado à valorização real do salário mínimo e à expansão do crédito, contribuiu para a redução expressiva da pobreza extrema na década — o Brasil saiu do Mapa da Fome da FAO em 2014, antes de voltar a ele em 2022.",
    fontes: [
      { tipo: "verbete", titulo: "Bolsa Família", url: "https://pt.wikipedia.org/wiki/Bolsa_Família" }
    ]
  },
  {
    pais: "br", ano: 2005,
    titulo: "Mensalão",
    temas: ["politica"],
    resumo: "O escândalo de compra de apoio parlamentar abala o primeiro governo Lula.",
    detalhe: "A denúncia do deputado Roberto Jefferson expõe um esquema de pagamentos mensais a parlamentares em troca de votos. O caso levou à queda de ministros e à condenação de dirigentes do PT e de aliados pelo STF em 2012, no julgamento da Ação Penal 470. Lula não foi denunciado e se reelegeu em 2006.",
    fontes: [
      { tipo: "verbete", titulo: "Escândalo do Mensalão", url: "https://pt.wikipedia.org/wiki/Escândalo_do_mensalão" }
    ]
  },
  {
    pais: "br", ano: 2010,
    titulo: "Primeira presidenta eleita",
    temas: ["politica", "sociedade"],
    resumo: "Dilma Rousseff vence o segundo turno e se torna a primeira mulher a presidir o Brasil.",
    detalhe: "Ex-ministra da Casa Civil e ex-presa política torturada durante a ditadura, Dilma derrota José Serra com cerca de 56% dos votos válidos e assume em janeiro de 2011. Foi reeleita em 2014 na disputa presidencial mais apertada desde a redemocratização, com pouco mais de três pontos de diferença.",
    fontes: [
      { tipo: "verbete", titulo: "Dilma Rousseff", url: "https://pt.wikipedia.org/wiki/Dilma_Rousseff" }
    ]
  },
  {
    pais: "br", ano: 2012,
    titulo: "Cotas raciais nas universidades",
    temas: ["sociedade", "politica"],
    resumo: "O STF valida as cotas e a lei as torna obrigatórias nas instituições federais.",
    detalhe: "Em abril o Supremo declara constitucionais, por unanimidade, as políticas de ação afirmativa com recorte racial. Em agosto a Lei de Cotas reserva metade das vagas das federais a egressos da escola pública, com subcotas para pretos, pardos e indígenas. O perfil racial e social do ensino superior brasileiro mudou significativamente na década seguinte.",
    fontes: [
      { tipo: "verbete", titulo: "Lei de Cotas", url: "https://pt.wikipedia.org/wiki/Lei_de_Cotas" }
    ]
  },
  {
    pais: "br", ano: 2013,
    titulo: "Jornadas de Junho",
    temas: ["sociedade", "politica"],
    resumo: "Protestos contra o aumento da tarifa viram a maior onda de manifestações em décadas.",
    detalhe: "Começam em São Paulo pelo Movimento Passe Livre e, após repressão policial amplamente filmada e transmitida, se espalham por centenas de cidades com pautas cada vez mais difusas: transporte, saúde, educação, gastos da Copa e corrupção. Reconfiguraram a relação entre ruas, redes sociais e instituições.",
    disputa: "O significado político das Jornadas segue em disputa entre analistas, que divergem sobre seu caráter, sua composição e seus efeitos nos anos seguintes.",
    fontes: [
      { tipo: "verbete", titulo: "Manifestações no Brasil em 2013", url: "https://pt.wikipedia.org/wiki/Manifestações_no_Brasil_em_2013" }
    ]
  },
  {
    pais: "br", ano: 2014, anoFim: 2021,
    titulo: "Operação Lava Jato",
    temas: ["politica", "economia"],
    resumo: "A maior investigação de corrupção da história do país termina sob contestação judicial.",
    detalhe: "Iniciada em Curitiba, revelou um esquema de desvios e propinas envolvendo Petrobras, grandes empreiteiras e partidos, com centenas de condenações e bilhões recuperados. A partir de 2019 as mensagens divulgadas pela Vaza Jato expuseram a colaboração indevida entre juiz e acusação: o STF anulou as condenações de Lula em 2021 e declarou Sergio Moro parcial.",
    disputa: "O balanço da operação é objeto de disputa aberta: entre o combate efetivo à corrupção sistêmica e a violação de garantias processuais com efeitos políticos e econômicos, as duas leituras têm defensores no meio jurídico e acadêmico.",
    fontes: [
      { tipo: "verbete", titulo: "Operação Lava Jato", url: "https://pt.wikipedia.org/wiki/Operação_Lava_Jato" }
    ]
  },
  {
    pais: "br", ano: 2015,
    titulo: "Rompimento da barragem de Mariana",
    temas: ["territorio", "economia"],
    resumo: "O maior desastre ambiental do país destrói o rio Doce e mata 19 pessoas.",
    detalhe: "A barragem de rejeitos de Fundão, da Samarco — controlada por Vale e BHP —, rompe em 5 de novembro e despeja cerca de 40 milhões de metros cúbicos de lama, destruindo o distrito de Bento Rodrigues e contaminando o rio Doce até o mar. Em 2019 o rompimento da barragem de Brumadinho mataria 272 pessoas.",
    fontes: [
      { tipo: "verbete", titulo: "Rompimento de barragem em Mariana", url: "https://pt.wikipedia.org/wiki/Rompimento_de_barragem_em_Mariana" }
    ]
  },
  {
    pais: "br", ano: 2016,
    titulo: "Impeachment de Dilma",
    temas: ["politica"],
    resumo: "O Senado cassa o mandato da presidenta por pedaladas fiscais; Michel Temer assume.",
    detalhe: "O processo, aberto em dezembro de 2015, corre em meio à recessão, à Lava Jato e a forte polarização. Em 31 de agosto o Senado aprova o afastamento definitivo por 61 a 20, numa votação que preservou seus direitos políticos. O governo Temer aprovaria o teto de gastos e a reforma trabalhista.",
    disputa: "Juristas e cientistas políticos dividem-se sobre se as pedaladas configuravam crime de responsabilidade; a leitura do episódio como golpe parlamentar ou como processo constitucional regular segue aberta.",
    fontes: [
      { tipo: "verbete", titulo: "Impeachment de Dilma Rousseff", url: "https://pt.wikipedia.org/wiki/Impeachment_de_Dilma_Rousseff" }
    ]
  },
  {
    pais: "br", ano: 2018,
    titulo: "Eleição de Bolsonaro",
    temas: ["politica"],
    resumo: "Um deputado de extrema direita vence com campanha digital e Lula preso.",
    detalhe: "A disputa ocorre com Lula, líder nas pesquisas, preso e impedido de concorrer pela Lei da Ficha Limpa, e com Jair Bolsonaro esfaqueado em campanha. Ele derrota Fernando Haddad com cerca de 55% dos votos válidos. A eleição consolidou o uso massivo de redes sociais e aplicativos de mensagem na disputa política brasileira.",
    fontes: [
      { tipo: "verbete", titulo: "Eleição presidencial no Brasil em 2018", url: "https://pt.wikipedia.org/wiki/Eleição_presidencial_no_Brasil_em_2018" }
    ]
  },
  {
    pais: "br", ano: 2018,
    titulo: "Assassinato de Marielle Franco",
    temas: ["sociedade", "politica"],
    resumo: "A execução da vereadora carioca expõe a atuação de milícias na política do Rio.",
    detalhe: "Marielle Franco, vereadora negra, favelada e crítica da violência policial, é morta a tiros com o motorista Anderson Gomes em 14 de março. As investigações, que levaram anos, apontaram em 2024 a acusação contra mandantes ligados a milícias e à política fluminense. O caso tornou-se símbolo internacional da violência política no Brasil.",
    fontes: [
      { tipo: "verbete", titulo: "Marielle Franco", url: "https://pt.wikipedia.org/wiki/Marielle_Franco" }
    ]
  },
  {
    pais: "br", ano: 2020, anoFim: 2022,
    titulo: "Pandemia de Covid-19",
    temas: ["sociedade"],
    resumo: "A maior crise sanitária em um século mata mais de 700 mil pessoas no país.",
    detalhe: "O primeiro caso é confirmado em 26 de fevereiro de 2020. A resposta brasileira foi marcada por conflito entre níveis de governo e por controvérsias sobre medidas de contenção e tratamentos sem eficácia comprovada, apuradas pela CPI da Pandemia em 2021. A partir de 2021 a campanha de vacinação em massa, conduzida pelo SUS, alterou o curso da epidemia.",
    fontes: [
      { tipo: "verbete", titulo: "Pandemia de COVID-19 no Brasil", url: "https://pt.wikipedia.org/wiki/Pandemia_de_COVID-19_no_Brasil" }
    ]
  },
  {
    pais: "br", ano: 2023,
    titulo: "8 de Janeiro",
    temas: ["politica", "conflito"],
    resumo: "Uma semana após a posse de Lula, apoiadores derrotados invadem as sedes dos três poderes.",
    detalhe: "Milhares de pessoas que contestavam o resultado eleitoral de 2022 invadem e depredam o Congresso, o Palácio do Planalto e o Supremo Tribunal Federal em Brasília. O episódio levou à intervenção federal na segurança do Distrito Federal, a centenas de prisões e a julgamentos sobre tentativa de abolição violenta do Estado democrático de direito.",
    fontes: [
      { tipo: "verbete", titulo: "Atos golpistas de 8 de janeiro de 2023", url: "https://pt.wikipedia.org/wiki/Ataques_de_8_de_janeiro_em_Brasília" }
    ]
  }
];
