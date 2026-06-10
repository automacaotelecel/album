import React, { useState, useEffect } from 'react';
import {
  Book,
  PackageOpen,
  Gift,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Sparkles,
  Maximize2,
  Menu,
  Download,
  Trophy,
  CalendarHeart,
  Smartphone
} from 'lucide-react';
import './App.css';

const STORAGE_KEYS = {
  inventario: 'copa_final_inventario_v7',
  pacotes: 'copa_final_pacotes_v7',
  ultimoDiario: 'copa_final_ultimo_diario_v7',
  codigos: 'copa_final_codigos_v7',
  bonusInstalacao: 'copa_final_bonus_instalacao_v7',
  primeiraVisita: 'copa_final_primeira_visita_v7'
};

const getHojeBR = () => new Date().toLocaleDateString('pt-BR');

const isStandaloneApp = () => {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
};

// TENTA CARREGAR PNG, JPEG, JPG E WEBP AUTOMATICAMENTE
const gerarCandidatosImagem = (imgUrl) => {
  if (!imgUrl) return [];

  const caminho = imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`;
  const caminhoSemExtensao = caminho.replace(/\.(png|jpg|jpeg|webp)$/i, '');

  const candidatos = [
    caminho,
    `${caminhoSemExtensao}.png`,
    `${caminhoSemExtensao}.jpeg`,
    `${caminhoSemExtensao}.jpg`,
    `${caminhoSemExtensao}.webp`,
  ];

  return [...new Set(candidatos)];
};

const ImagemComFallback = ({ src, alt, className }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [falhouTudo, setFalhouTudo] = useState(false);

  const candidatos = gerarCandidatosImagem(src);

  useEffect(() => {
    setIndiceAtual(0);
    setFalhouTudo(false);
  }, [src]);

  const tentarProximaImagem = () => {
    if (indiceAtual < candidatos.length - 1) {
      setIndiceAtual((atual) => atual + 1);
    } else {
      setFalhouTudo(true);
    }
  };

  if (!candidatos.length || falhouTudo) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-center px-2">
        <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase leading-tight">
          Imagem não encontrada
        </span>
      </div>
    );
  }

  return (
    <img
      src={candidatos[indiceAtual]}
      alt={alt}
      className={className}
      onError={tentarProximaImagem}
      draggable={false}
    />
  );
};

// BANCO DE FIGURINHAS
const TODAS_FIGURINHAS = [
  {
    id: "01",
    pagina: 1,
    titulo: "A MUSA DOS MULTIVERSOS",
    categoria: "RAISSA",
    descricao: "A beleza que faz qualquer lugar parecer mais bonito só por ela estar ali.",
    imgUrl: "/rai1.png",
    shiny: true,
    raridade: "Especial",
    sigla: "RAI"
  },
  {
    id: "02",
    pagina: 1,
    titulo: "O OLHAR QUE GANHA TUDO",
    categoria: "RAISSA",
    descricao: "O olhar que muda meu dia inteiro e deixa qualquer momento mais leve.",
    imgUrl: "/rai2.png",
    shiny: false,
    raridade: "Ultra Rara",
    sigla: "RAI"
  },
  {
    id: "03",
    pagina: 1,
    titulo: "LUZ NATURAL",
    categoria: "RAISSA",
    descricao: "Ela nem precisa tentar. A beleza dela aparece no detalhe, no jeito e na presença.",
    imgUrl: "/rai3.png",
    shiny: false,
    raridade: "Ultra Rara",
    sigla: "RAI"
  },
  {
    id: "04",
    pagina: 1,
    titulo: "A GRANDE GOSTOSA",
    categoria: "RAISSA",
    descricao: "Linda de um jeito que não cabe em foto, mas essa figurinha tentou registrar.",
    imgUrl: "/rai4.png",
    shiny: true,
    raridade: "Especial",
    sigla: "RAI"
  },
  {
    id: "05",
    pagina: 1,
    titulo: "OLHAR QUE ME DESARMA",
    categoria: "RAISSA",
    descricao: "Esse olhar tem um poder absurdo: me acalma, me prende e me faz sorrir sem perceber.",
    imgUrl: "/rai5.png",
    shiny: false,
    raridade: "Ultra Rara",
    sigla: "RAI"
  },
  {
    id: "06",
    pagina: 1,
    titulo: "MEU DETALHE FAVORITO",
    categoria: "RAISSA",
    descricao: "O jeito dela, a expressão dela, a presença dela. Tudo nela vira memória bonita.",
    imgUrl: "/rai6.png",
    shiny: false,
    raridade: "Ultra Rara",
    sigla: "RAI"
  },
  {
    id: "07",
    pagina: 1,
    titulo: "BELEZA RARA",
    categoria: "RAISSA",
    descricao: "Rara não só por ser linda, mas por ser ela. E isso nenhuma figurinha consegue repetir.",
    imgUrl: "/rai7.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RAI"
  },
  {
    id: "08",
    pagina: 1,
    titulo: "CROMO PRINCIPAL",
    categoria: "RAISSA",
    descricao: "A mais especial do álbum inteiro. A figurinha que dá sentido a todas as outras.",
    imgUrl: "/rai8.png",
    shiny: true,
    raridade: "Lendária",
    sigla: "S2"
  },

  {
    id: "09",
    pagina: 2,
    titulo: "NOSSO CANTINHO",
    categoria: "NÓS DOIS",
    descricao: "Qualquer lugar fica com cara de lar quando é com ela.",
    imgUrl: "/foto9.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "10",
    pagina: 2,
    titulo: "RISADA COMPARTILHADA",
    categoria: "NÓS DOIS",
    descricao: "Aqueles momentos simples que viram história porque a gente estava junto.",
    imgUrl: "/foto10.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "11",
    pagina: 2,
    titulo: "MUNDO PARTICULAR",
    categoria: "RARO",
    descricao: "Quando somos só nós dois, o resto do mundo fica pequeno.",
    imgUrl: "/foto11.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RARE"
  },
  {
    id: "12",
    pagina: 2,
    titulo: "JEITO DE NÓS DOIS",
    categoria: "MEMÓRIA",
    descricao: "Nosso jeito meio bobo, meio sério, meio caos, mas sempre nosso.",
    imgUrl: "/foto12.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "13",
    pagina: 2,
    titulo: "PAZ EM FORMA DE PESSOA",
    categoria: "MEMÓRIA",
    descricao: "Ela tem esse dom de deixar tudo mais tranquilo só por estar perto.",
    imgUrl: "/foto13.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "14",
    pagina: 2,
    titulo: "PARCERIA LEVE",
    categoria: "NÓS DOIS",
    descricao: "A melhor parte dos dias é dividir a rotina, os planos e as besteiras com ela.",
    imgUrl: "/foto14.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "15",
    pagina: 2,
    titulo: "DETALHES DELA",
    categoria: "RARO",
    descricao: "Tem beleza no sorriso, no olhar, no jeito de falar e até no silêncio dela.",
    imgUrl: "/foto15.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RARE"
  },
  {
    id: "16",
    pagina: 2,
    titulo: "NOSSA MELHOR FASE",
    categoria: "LENDÁRIA",
    descricao: "A fase mais bonita é essa: eu, ela e tudo que a gente ainda vai viver.",
    imgUrl: "/foto16.png",
    shiny: true,
    raridade: "Lendária",
    sigla: "S2"
  },

  {
    id: "17",
    pagina: 3,
    titulo: "PEQUENOS MOMENTOS",
    categoria: "NÓS DOIS",
    descricao: "Às vezes o momento nem parece grande, mas com ela vira lembrança importante.",
    imgUrl: "/foto17.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "18",
    pagina: 3,
    titulo: "O LUGAR É ELA",
    categoria: "NÓS DOIS",
    descricao: "Não importa tanto onde estamos. O que importa é estar com ela.",
    imgUrl: "/foto18.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "19",
    pagina: 3,
    titulo: "BRILHO DISCRETO",
    categoria: "RARO",
    descricao: "Ela tem uma beleza que não grita. Ela simplesmente aparece e ilumina tudo.",
    imgUrl: "/foto19.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RARE"
  },
  {
    id: "20",
    pagina: 3,
    titulo: "NOSSA ROTINA",
    categoria: "MEMÓRIA",
    descricao: "O amor mora nesses detalhes pequenos que só a gente entende.",
    imgUrl: "/foto20.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "21",
    pagina: 3,
    titulo: "ELA E EU",
    categoria: "MEMÓRIA",
    descricao: "Dois mundos diferentes que, juntos, fizeram um mundo só nosso.",
    imgUrl: "/foto21.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "22",
    pagina: 3,
    titulo: "MEU LUGAR FAVORITO",
    categoria: "RARO",
    descricao: "Meu lugar favorito não é um endereço. É perto dela.",
    imgUrl: "/foto22.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RARE"
  },
  {
    id: "23",
    pagina: 3,
    titulo: "MEMÓRIA BOA",
    categoria: "MEMÓRIA",
    descricao: "Uma lembrança daquelas que dá vontade de guardar em uma caixinha.",
    imgUrl: "/foto23.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "24",
    pagina: 3,
    titulo: "NOSSO MUNDO",
    categoria: "LENDÁRIA",
    descricao: "Um mundo feito de carinho, risada, parceria e tudo que só a gente sabe.",
    imgUrl: "/foto24.png",
    shiny: true,
    raridade: "Lendária",
    sigla: "S2"
  },

  {
    id: "25",
    pagina: 4,
    titulo: "DIA ESPECIAL",
    categoria: "MOMENTO",
    descricao: "Um daqueles dias que a gente sabe que vai lembrar por muito tempo.",
    imgUrl: "/foto25.png",
    shiny: false,
    raridade: "Comum",
    sigla: "MEM"
  },
  {
    id: "26",
    pagina: 4,
    titulo: "REGISTRO BONITO",
    categoria: "MOMENTO",
    descricao: "Uma foto, um detalhe e uma lembrança que ganhou espaço no álbum.",
    imgUrl: "/foto26.png",
    shiny: true,
    raridade: "Especial",
    sigla: "MEM"
  },
  {
    id: "27",
    pagina: 4,
    titulo: "PRIMEIRO PLANO",
    categoria: "MOMENTO",
    descricao: "A vida fica mais bonita quando ela aparece como personagem principal.",
    imgUrl: "/foto27.png",
    shiny: false,
    raridade: "Comum",
    sigla: "MEM"
  },
  {
    id: "28",
    pagina: 4,
    titulo: "LEMBRANÇA GUARDADA",
    categoria: "RARO",
    descricao: "Tem momento que a gente vive uma vez, mas guarda para sempre.",
    imgUrl: "/foto28.png",
    shiny: true,
    raridade: "Rara",
    sigla: "RARE"
  },
  {
    id: "29",
    pagina: 4,
    titulo: "PARTE DA HISTÓRIA",
    categoria: "MOMENTO",
    descricao: "Mais uma página da nossa história, escrita do nosso jeito.",
    imgUrl: "/foto29.png",
    shiny: false,
    raridade: "Comum",
    sigla: "MEM"
  },
  {
    id: "30",
    pagina: 4,
    titulo: "DETALHE IMPORTANTE",
    categoria: "MEMÓRIA",
    descricao: "O detalhe que talvez passasse despercebido, mas com ela vira especial.",
    imgUrl: "/foto30.png",
    shiny: false,
    raridade: "Comum",
    sigla: "MEM"
  },
  {
    id: "31",
    pagina: 4,
    titulo: "GUARDADO NO PEITO",
    categoria: "MEMÓRIA",
    descricao: "Uma daquelas lembranças que não precisa de explicação. Só precisa existir.",
    imgUrl: "/foto29.png",
    shiny: false,
    raridade: "Comum",
    sigla: "S2"
  },
  {
    id: "32",
    pagina: 4,
    titulo: "CAPÍTULO DE OURO",
    categoria: "LENDÁRIA",
    descricao: "Um capítulo bonito demais para ser esquecido. Nosso, importante e único.",
    imgUrl: "/foto30.png",
    shiny: true,
    raridade: "Lendária",
    sigla: "S2"
  },

  {
    id: "33",
    pagina: 5,
    titulo: "VALE-MASSAGEM VIP",
    categoria: "PRÊMIO",
    descricao: "Sessão anti-estresse completa para cuidar dela do jeito que ela merece.",
    imgUrl: "/premi1.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "34",
    pagina: 5,
    titulo: "VALE-JANTAR ESPECIAL",
    categoria: "PRÊMIO",
    descricao: "Um jantar feito com carinho, atenção e zero desculpas do desenvolvedor.",
    imgUrl: "/premi2.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "35",
    pagina: 5,
    titulo: "GARRAFA DE MOSCATO",
    categoria: "PRÊMIO",
    descricao: "Uma garrafa bem gelada para brindar ela, nós dois e as próximas memórias.",
    imgUrl: "/premi3.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "36",
    pagina: 5,
    titulo: "EU LAVO A LOUÇA",
    categoria: "PRÊMIO",
    descricao: "Vale oficial de descanso. Ela relaxa e eu assumo a pia sem reclamar.",
    imgUrl: "/premi4.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "37",
    pagina: 5,
    titulo: "CINEMA PREMIUM",
    categoria: "PRÊMIO",
    descricao: "Sessão escolhida por ela, com pipoca, carinho e companhia garantida.",
    imgUrl: "/premi5.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "38",
    pagina: 5,
    titulo: "FINAL DE SEMANA SURPRESA",
    categoria: "PRÊMIO",
    descricao: "Um plano especial para sair da rotina e criar mais uma memória nossa.",
    imgUrl: "/premi6.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "39",
    pagina: 5,
    titulo: "VALE-MIMO SURPRESA",
    categoria: "PRÊMIO",
    descricao: "Um presente fora de hora, porque ela merece ser lembrada nos detalhes.",
    imgUrl: "/premi7.png",
    shiny: true,
    raridade: "Prêmio Especial",
    sigla: "GIFT"
  },
  {
    id: "40",
    pagina: 5,
    titulo: "O TROFÉU ABSOLUTO",
    categoria: "PRÊMIO",
    descricao: "Meu amor, minha escolha e minha pessoa favorita para a vida inteira.",
    imgUrl: "/premi8.png",
    shiny: true,
    raridade: "Prêmio Supremo",
    sigla: "S2"
  }
];

const PAGINAS_INFO = {
  1: {
    nome: "RAISSA",
    sub: "A craque mais linda do meu mundial 💖"
  },
  2: {
    nome: "NÓS DOIS, NOSSO MUNDO",
    sub: "Nosso estádio particular, onde o amor joga em casa 💑"
  },
  3: {
    nome: "NÓS DOIS, NOSSO MUNDO",
    sub: "Nossas memórias, nossa torcida, nossa história ✨"
  },
  4: {
    nome: "MOMENTOS IMPORTANTES",
    sub: "Os gols mais bonitos da nossa caminhada 📸"
  },
  5: {
    nome: "PRÊMIOS",
    sub: "Vales especiais para minha campeã resgatar 🎁"
  }
};

const ehRaraOuLendaria = (sticker) => {
  return (
    sticker.categoria === "RARO" ||
    sticker.categoria === "LENDÁRIA" ||
    sticker.raridade === "Rara" ||
    sticker.raridade === "Lendária" ||
    sticker.raridade === "Ultra Rara"
  );
};

const CromoPanini = ({ sticker, isRevealed = true, onOpen }) => {
  if (!isRevealed) {
    return (
      <div className="w-full aspect-[3/4] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center shadow-inner relative backdrop-blur-sm">
        <span className="text-white/20 font-black text-xl md:text-3xl tracking-tighter">
          N° {sticker.id}
        </span>
      </div>
    );
  }

  const isRaissa = sticker.categoria === "RAISSA";
  const isPremio = sticker.categoria === "PRÊMIO";
  const isLendaria = sticker.categoria === "LENDÁRIA" || sticker.raridade === "Lendária";
  const isRara = ehRaraOuLendaria(sticker);
  const isPremioSupremo = sticker.raridade === "Prêmio Supremo";

  const cardClasses = `w-full h-full relative flex flex-col border-[3px] overflow-hidden ${
    isRaissa
      ? 'border-pink-500 princesa-frame'
      : isPremio
        ? 'border-green-500 bg-emerald-50 premio-frame'
        : isLendaria
          ? 'border-yellow-300 lendaria-frame'
          : isRara
            ? 'border-yellow-300 rara-frame'
            : 'border-blue-900'
  }`;

  const labelClasses = `text-[8px] md:text-[10px] font-black px-1.5 border border-white rounded-sm ${
    isRaissa
      ? 'bg-pink-500 text-black'
      : isPremio
        ? 'bg-green-500 text-black'
        : isLendaria
          ? 'bg-yellow-300 text-black'
          : isRara
            ? 'bg-yellow-300 text-black'
            : 'bg-blue-600 text-white'
  }`;

  return (
    <div
      onClick={() => onOpen && onOpen(sticker)}
      className={`w-full aspect-[3/4] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.55)] flex flex-col p-1 md:p-1.5 rounded-sm transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer group ${
        isRara ? 'rare-card-glow' : ''
      } ${isPremio ? 'prize-card-glow' : ''}`}
    >
      <div className={cardClasses}>
        {sticker.shiny && <div className="soft-shine-layer"></div>}
        {isRara && <div className="rare-shine-layer"></div>}
        {isPremio && <div className="prize-shine-layer"></div>}
        {isPremioSupremo && <div className="supreme-prize-layer"></div>}

        <button
          type="button"
          className="absolute bottom-1 right-1 z-40 w-6 h-6 rounded-full bg-black/70 border border-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Abrir figurinha"
          onClick={(e) => {
            e.stopPropagation();
            onOpen && onOpen(sticker);
          }}
        >
          <Maximize2 size={12} />
        </button>

        {isRaissa && (
          <Heart
            size={12}
            className="absolute bottom-2 left-2 text-pink-500 animate-pulse z-20"
          />
        )}

        <div className="absolute top-0 left-0 w-full p-1 md:p-1.5 flex justify-between items-start z-20">
          <div className="bg-black text-white font-black text-[9px] md:text-xs px-1.5 border border-white transform -skew-x-12">
            {sticker.id}
          </div>

          <div className={labelClasses}>
            {sticker.sigla}
          </div>
        </div>

        <div className={`h-[62%] w-full relative overflow-hidden flex items-center justify-center border-b-2 ${
          isRaissa
            ? 'border-pink-500'
            : isPremio
              ? 'border-green-600'
              : isRara
                ? 'border-yellow-400'
                : 'border-blue-900'
        } bg-gray-200`}>
          <ImagemComFallback
            src={sticker.imgUrl}
            alt={sticker.titulo}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className={`flex-1 flex flex-col justify-center items-center text-center px-1 py-0.5 ${
          isRaissa
            ? 'bg-gradient-to-b from-pink-50 to-white'
            : isPremio
              ? 'bg-gradient-to-b from-emerald-50 to-white'
              : isLendaria
                ? 'bg-gradient-to-b from-yellow-50 to-gray-100'
                : 'bg-gradient-to-b from-gray-50 to-gray-200'
        }`}>
          <h2 className="text-[9px] md:text-[11px] font-black uppercase text-blue-950 leading-none tracking-tight line-clamp-1">
            {sticker.titulo}
          </h2>

          <span className={`text-[6px] md:text-[8px] font-black px-1 mt-0.5 rounded-sm ${
            isRaissa
              ? 'bg-pink-400 text-white'
              : isPremio
                ? 'bg-green-600 text-white'
                : isRara
                  ? 'bg-yellow-400 text-black'
                  : 'bg-blue-900 text-white'
          }`}>
            {sticker.categoria}
          </span>

          <p className="text-[6.5px] md:text-[8px] text-gray-700 font-bold leading-tight uppercase mt-1 px-1 line-clamp-2">
            "{sticker.descricao}"
          </p>
        </div>
      </div>
    </div>
  );
};

const ConfettiGenerator = ({ premium = false }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: premium ? 38 : 22 }).map((_, idx) => (
        <div
          key={idx}
          className={`confetti ${
            idx % 5 === 0
              ? 'bg-pink-400'
              : idx % 4 === 0
                ? 'bg-green-400'
                : idx % 3 === 0
                  ? 'bg-blue-300'
                  : 'bg-yellow-400'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.4}s`,
            animationDuration: `${2.2 + Math.random() * 1.8}s`
          }}
        />
      ))}
    </div>
  );
};

const ModalFigurinha = ({ sticker, onClose }) => {
  if (!sticker) return null;

  const isRaissa = sticker.categoria === "RAISSA";
  const isPremio = sticker.categoria === "PRÊMIO";
  const isRara = ehRaraOuLendaria(sticker);

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-modal-fade">
      <div className={`relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border shadow-[0_30px_100px_rgba(0,0,0,0.85)] ${
        isPremio
          ? 'border-green-400 bg-gradient-to-br from-emerald-950 via-slate-950 to-black'
          : isRaissa
            ? 'border-pink-400 bg-gradient-to-br from-pink-950 via-slate-950 to-black'
            : isRara
              ? 'border-yellow-300 bg-gradient-to-br from-yellow-950 via-slate-950 to-black'
              : 'border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-black'
      }`}>
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_35%)]"></div>

        {isPremio && <div className="modal-prize-aura"></div>}
        {isRara && <div className="modal-rare-aura"></div>}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-0 relative z-10">
          <div className="relative min-h-[380px] md:min-h-[620px] bg-black">
            <ImagemComFallback
              src={sticker.imgUrl}
              alt={sticker.titulo}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-black text-white border border-white/30 font-black px-3 py-1 rounded-full text-xs">
                  N° {sticker.id}
                </span>

                <span className={`font-black px-3 py-1 rounded-full text-xs ${
                  isPremio
                    ? 'bg-green-400 text-black'
                    : isRaissa
                      ? 'bg-pink-400 text-white'
                      : isRara
                        ? 'bg-yellow-300 text-black'
                        : 'bg-blue-500 text-white'
                }`}>
                  {sticker.categoria}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-white drop-shadow-lg">
                {sticker.titulo}
              </h2>

              <p className="mt-5 text-white/80 text-sm md:text-base font-bold leading-relaxed uppercase">
                "{sticker.descricao}"
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black">
                    Raridade
                  </p>
                  <p className="text-lg font-black text-yellow-300 mt-1">
                    {sticker.raridade || 'Comum'}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black">
                    Álbum
                  </p>
                  <p className="text-lg font-black text-green-300 mt-1">
                    Página {sticker.pagina}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-yellow-300 font-black text-xs uppercase tracking-widest">
                <Sparkles size={16} />
                Figurinha aberta
              </div>
              <p className="text-white/60 text-xs mt-2 font-bold">
                A cada figura aberta você fica mais linda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('album');
  const [currentPage, setCurrentPage] = useState(1);
  const [menuAberto, setMenuAberto] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [appInstalado, setAppInstalado] = useState(isStandaloneApp());
  const [toast, setToast] = useState('');

  const [inventario, setInventario] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.inventario) || '[]')
  );

  const [pacotes, setPacotes] = useState(() =>
  parseInt(localStorage.getItem(STORAGE_KEYS.pacotes) || '0', 10)
);

  const [ultimoDiario, setUltimoDiario] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.ultimoDiario) || ''
  );

  const [codigosUsados, setCodigosUsados] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.codigos) || '[]')
  );

  const [codigoInput, setCodigoInput] = useState('');
  const [msgCodigo, setMsgCodigo] = useState('');
  const [packStatus, setPackStatus] = useState('idle');
  const [packMensagem, setPackMensagem] = useState('');
  const [drawnStickers, setDrawnStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const mostrarToast = (mensagem) => {
    setToast(mensagem);
    setTimeout(() => setToast(''), 5200);
  };

  const concederBonusInstalacao = () => {
    const jaGanhou = localStorage.getItem(STORAGE_KEYS.bonusInstalacao) === 'sim';

    if (!jaGanhou) {
      setPacotes((p) => p + 2);
      localStorage.setItem(STORAGE_KEYS.bonusInstalacao, 'sim');
      mostrarToast('🏆 App instalado! Ela ganhou +2 pacotinhos especiais da Copa do Amor.');
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.inventario, JSON.stringify(inventario));
    localStorage.setItem(STORAGE_KEYS.pacotes, pacotes.toString());
    localStorage.setItem(STORAGE_KEYS.codigos, JSON.stringify(codigosUsados));
  }, [inventario, pacotes, codigosUsados]);

  useEffect(() => {
    const hoje = getHojeBR();

    if (ultimoDiario !== hoje) {
      setPacotes((p) => p + 1);
      setUltimoDiario(hoje);
      localStorage.setItem(STORAGE_KEYS.ultimoDiario, hoje);

      const primeiraVisita = localStorage.getItem(STORAGE_KEYS.primeiraVisita);

      if (!primeiraVisita) {
        localStorage.setItem(STORAGE_KEYS.primeiraVisita, hoje);
        mostrarToast('💖 Bem-vinda ao nosso álbum. Hoje ela ganhou +1 pacotinho para começar a coleção.');
      } else {
        mostrarToast('🌞 Presença confirmada no estádio do amor: +1 pacotinho diário liberado.');
      }
    }
  }, []);

  useEffect(() => {
    if (isStandaloneApp()) {
      setAppInstalado(true);
      concederBonusInstalacao();
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setAppInstalado(true);
      setInstallPrompt(null);
      concederBonusInstalacao();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.warn('Service Worker não registrado.');
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const instalarApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const escolha = await installPrompt.userChoice;

      if (escolha.outcome === 'accepted') {
        setAppInstalado(true);
        concederBonusInstalacao();
      }

      setInstallPrompt(null);
      return;
    }

    if (isStandaloneApp()) {
      setAppInstalado(true);
      concederBonusInstalacao();
      mostrarToast('📱 O app já está instalado. O álbum da Raissa já está pronto para jogar em casa.');
      return;
    }

    mostrarToast('📱 No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”. No Android: use “Instalar app” no menu do navegador.');
  };

  const abrirPacote = () => {
    if (pacotes <= 0 || packStatus !== 'idle') return;

    setPackStatus('opening');
    setPackMensagem('A torcida está cantando...');
    setPacotes((p) => p - 1);
    setDrawnStickers([]);

    setTimeout(() => setPackMensagem('Rasgando o pacotinho da Copa do Amor...'), 900);
    setTimeout(() => setPackMensagem('Procurando uma memória rara da Raissa...'), 1800);
    setTimeout(() => setPackMensagem('O VAR do coração está validando...'), 2700);

    setTimeout(() => {
      const novosCromos = [];
      const inventarioTemporario = [...inventario];

      for (let i = 0; i < 3; i++) {
        const faltantes = TODAS_FIGURINHAS.filter((f) => !inventarioTemporario.includes(f.id));
        let sorteada;

        if (faltantes.length > 0 && Math.random() > 0.22) {
          sorteada = faltantes[Math.floor(Math.random() * faltantes.length)];
        } else {
          sorteada = TODAS_FIGURINHAS[Math.floor(Math.random() * TODAS_FIGURINHAS.length)];
        }

        novosCromos.push(sorteada);

        if (!inventarioTemporario.includes(sorteada.id)) {
          inventarioTemporario.push(sorteada.id);
        }
      }

      setInventario(inventarioTemporario);
      setDrawnStickers(novosCromos);
      setPackStatus('revealed');
      setPackMensagem('');
    }, 3700);
  };

  const resgatarCodigo = () => {
    const codigosValidos = {
      BEIJO: 1,
      MOSCATO: 2,
      TEAMO: 3,
      RAISSA: 3,
      NOSSOAMOR: 4,
      MOMENTOS: 2,
      CAMPEA: 3,
      COPADOAMOR: 5,
      MINHACRAQUE: 4
    };

    const code = codigoInput.toUpperCase().trim();

    if (codigosUsados.includes(code)) {
      setMsgCodigo("Esse código já entrou em campo uma vez! 💻");
    } else if (codigosValidos[code]) {
      setPacotes((p) => p + codigosValidos[code]);
      setCodigosUsados([...codigosUsados, code]);
      setMsgCodigo(`✨ Gol de placa! Código válido: +${codigosValidos[code]} pacotinhos!`);
      setCodigoInput('');
    } else {
      setMsgCodigo("Código incorreto. O juiz mandou consultar o Desenvolvedor!");
    }

    setTimeout(() => setMsgCodigo(''), 4000);
  };

  const fecharFigurinha = () => {
    setDrawnStickers([]);
    setPackStatus('idle');
    setActiveTab('album');
  };

  const trocarAba = (aba) => {
    setActiveTab(aba);
    setMenuAberto(false);

    if (aba === 'pacotes') {
      setDrawnStickers([]);
      setPackStatus('idle');
    }
  };

  const figurinhasDaPagina = TODAS_FIGURINHAS.filter((f) => f.pagina === currentPage);

  const premiosDesbloqueados = TODAS_FIGURINHAS.filter(
    (f) => f.pagina === 5 && inventario.includes(f.id)
  );

  const pacoteTemPremio = drawnStickers.some((sticker) => sticker.categoria === 'PRÊMIO');
  const pacoteTemRara = drawnStickers.some((sticker) => ehRaraOuLendaria(sticker));

  return (
    <div
      className="min-h-screen text-white font-sans pb-8 md:pb-10 relative overflow-x-hidden bg-center bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/fundo2.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-black/60 to-blue-950/90 pointer-events-none z-0"></div>

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[120] w-[92%] max-w-md rounded-2xl border border-yellow-300/40 bg-black/80 backdrop-blur-xl px-4 py-3 text-center shadow-[0_20px_70px_rgba(0,0,0,0.75)]">
          <p className="text-xs md:text-sm font-black text-yellow-200 uppercase leading-snug">
            {toast}
          </p>
        </div>
      )}

      <header className="hero-copa-header">
        <div className="hero-copa-lights"></div>

        <div className="hero-copa-badge">
          <Trophy size={13} />
          Copa do Amor
        </div>

        <h1 className="hero-copa-title">
          WE ARE <span>S2</span>
        </h1>

        <p className="hero-copa-subtitle">
          O álbum oficial da nossa história, estrelando a minha campeã.
        </p>

        <div className="hero-copa-ribbon">
          Álbum de memórias oficial
        </div>
      </header>

      <button
        type="button"
        onClick={() => setMenuAberto((v) => !v)}
        className="mobile-menu-toggle"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      <aside className={`side-nav ${menuAberto ? 'side-nav-open' : ''}`}>
        <button
          onClick={() => trocarAba('album')}
          className={`side-nav-item ${activeTab === 'album' ? 'side-nav-active' : ''}`}
        >
          <Book size={20} />
          <span>Álbum</span>
        </button>

        <button
          onClick={() => trocarAba('pacotes')}
          className={`side-nav-item ${activeTab === 'pacotes' ? 'side-nav-active' : ''}`}
        >
          <div className="relative">
            <PackageOpen size={20} />
            {pacotes > 0 && (
              <span className="side-nav-count">{pacotes}</span>
            )}
          </div>
          <span>Pacotes</span>
        </button>

        <button
          onClick={() => trocarAba('resgate')}
          className={`side-nav-item ${activeTab === 'resgate' ? 'side-nav-active' : ''}`}
        >
          <div className="relative">
            <Gift size={20} />
            {premiosDesbloqueados.length > 0 && (
              <span className="side-nav-count side-nav-count-green">
                {premiosDesbloqueados.length}
              </span>
            )}
          </div>
          <span>Prêmios</span>
        </button>

        <button
          onClick={instalarApp}
          className={`side-nav-item side-nav-install ${appInstalado ? 'side-nav-installed' : ''}`}
        >
          {appInstalado ? <Smartphone size={20} /> : <Download size={20} />}
          <span>{appInstalado ? 'Instalado' : 'Instalar'}</span>
        </button>
      </aside>

      {menuAberto && (
        <button
          className="mobile-menu-backdrop"
          onClick={() => setMenuAberto(false)}
          aria-label="Fechar menu"
        />
      )}

      <main className="max-w-4xl mx-auto p-4 relative z-10 md:pl-24">
        {activeTab === 'album' && (
          <div className="animate-fade-in">
            <div className="album-page-header">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="album-page-arrow"
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="album-page-center">
                <span className="album-page-counter">
                  Página {currentPage} de 5
                </span>

                <h2 className="album-page-title">
                  {PAGINAS_INFO[currentPage].nome}
                </h2>

                <p className="album-page-subtitle">
                  {PAGINAS_INFO[currentPage].sub}
                </p>
              </div>

              <button
                disabled={currentPage === 5}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="album-page-arrow"
                aria-label="Próxima página"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 bg-blue-900/40 rounded-2xl border border-blue-400/30 shadow-2xl backdrop-blur-md">
              {figurinhasDaPagina.map((sticker) => {
                const possui = inventario.includes(sticker.id);

                return (
                  <CromoPanini
                    key={sticker.id}
                    sticker={sticker}
                    isRevealed={possui}
                    onOpen={setSelectedSticker}
                  />
                );
              })}
            </div>

            <p className="text-center text-white/50 text-[11px] font-bold mt-4">
              No campeonato do meu coração só da você.
            </p>
          </div>
        )}

        {activeTab === 'pacotes' && (
          <div className="flex flex-col items-center justify-center min-h-[55vh] animate-fade-in px-4 relative">
            {(packStatus === 'idle' || packStatus === 'opening') && (
              <div className="text-center bg-black/40 p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl relative z-10 w-full max-w-sm">
                <h2 className="text-xl font-black mb-2 text-white">
                  PACOTINHOS DISPONÍVEIS: <span className="text-yellow-400">{pacotes}</span>
                </h2>

                <p className="text-[11px] text-white/60 font-bold uppercase tracking-wider">
                  Cada pacote vem com 3 figurinhas do nosso mundial.
                </p>

                <div
                  onClick={abrirPacote}
                  className={`w-56 h-72 mx-auto mt-4 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-green-600 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-4 border-yellow-400 flex flex-col justify-between overflow-hidden cursor-pointer relative pack-texture ${
                    pacotes > 0 && packStatus === 'idle'
                      ? 'hover:scale-105 active:scale-95'
                      : 'grayscale pointer-events-none'
                  } ${packStatus === 'opening' ? 'animate-premium-pack-opening' : 'transition-all'}`}
                >
                  {packStatus === 'opening' && (
                    <>
                      <div className="pack-light-beam"></div>
                      <div className="pack-sparkles"></div>
                    </>
                  )}

                  <div className="h-3 w-full border-b-2 border-dashed border-black/30 bg-yellow-400"></div>

                  <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                    <span className="text-[10px] font-black text-yellow-300 tracking-widest block uppercase mb-1">
                      Pacote oficial
                    </span>

                    <h2 className="text-white font-black text-5xl tracking-tighter italic transform -skew-x-12 drop-shadow-md leading-none">
                      AMOR
                    </h2>

                    <h3 className="text-green-300 font-black text-xl italic tracking-widest mt-1">
                      2026
                    </h3>

                    <div
                      className={`mt-6 text-black text-[9px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider ${
                        packStatus === 'opening'
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-yellow-400'
                      }`}
                    >
                      {packStatus === 'opening' ? 'ABRINDO...' : 'RASGAR PACOTE'}
                    </div>
                  </div>
                </div>

                {packStatus === 'opening' && (
                  <div className="mt-5">
                    <p className="text-yellow-300 text-xs font-black uppercase tracking-widest animate-pulse">
                      {packMensagem}
                    </p>

                    <div className="mt-3 w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-pink-400 animate-pack-progress"></div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h3 className="text-[10px] font-black text-green-400 tracking-widest uppercase mb-2">
                    Conseguir mais pacotinhos
                  </h3>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={codigoInput}
                      onChange={(e) => setCodigoInput(e.target.value)}
                      placeholder="Código secreto..."
                      className="flex-1 bg-black/50 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-green-400 uppercase font-bold tracking-wider"
                    />

                    <button
                      onClick={resgatarCodigo}
                      className="bg-green-500 text-black font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-green-400 transition-all"
                    >
                      Resgatar
                    </button>
                  </div>

                  {msgCodigo && (
                    <p
                      className={`text-[10px] font-bold mt-2.5 ${
                        msgCodigo.includes('✨') ? 'text-yellow-400' : 'text-red-400'
                      }`}
                    >
                      {msgCodigo}
                    </p>
                  )}

                  <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-3 text-left">
                    <div className="flex items-center gap-2 text-yellow-300 font-black text-[10px] uppercase tracking-widest">
                      <CalendarHeart size={14} />
                      Bônus diário
                    </div>
                    <p className="text-white/60 text-[10px] font-bold mt-1 leading-snug">
                      Ganha 1 pacotinho por dia ao entrar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {packStatus === 'revealed' && (
              <div className={`w-full text-center p-4 md:p-6 rounded-3xl backdrop-blur-md border shadow-2xl relative z-20 overflow-hidden ${
                pacoteTemPremio
                  ? 'bg-emerald-950/70 border-green-300/70 prize-reveal-stage'
                  : pacoteTemRara
                    ? 'bg-yellow-950/50 border-yellow-300/60 rare-reveal-stage'
                    : 'bg-black/50 border-white/20'
              }`}>
                <ConfettiGenerator premium={pacoteTemPremio || pacoteTemRara} />

                {pacoteTemPremio && (
                  <div className="absolute inset-0 pointer-events-none z-0 prize-stage-aura"></div>
                )}

                <h2 className={`text-2xl md:text-3xl font-black mb-2 tracking-tight drop-shadow-md flex items-center justify-center gap-2 relative z-10 ${
                  pacoteTemPremio ? 'text-green-300' : pacoteTemRara ? 'text-yellow-300' : 'text-yellow-400'
                }`}>
                  {pacoteTemPremio ? 'PRÊMIO ENCONTRADO!' : pacoteTemRara ? 'FIGURINHA RARA!' : 'CONTRATADOS!'}
                </h2>

                <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-6 relative z-10">
                  AMOR MAIOR QUE EU.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto mb-8 justify-items-center relative z-10">
                  {drawnStickers.map((sticker, idx) => (
                    <div
                      key={`${sticker.id}-${idx}`}
                      className={`w-full max-w-[190px] ${
                        sticker.categoria === 'PRÊMIO'
                          ? 'animate-super-prize-reveal'
                          : ehRaraOuLendaria(sticker)
                            ? 'animate-rare-reveal-sticker'
                            : 'animate-reveal-sticker'
                      }`}
                      style={{ animationDelay: `${idx * 0.55}s` }}
                    >
                      <CromoPanini
                        sticker={sticker}
                        isRevealed={true}
                        onOpen={setSelectedSticker}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={fecharFigurinha}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all relative z-30"
                >
                  Guardar no Álbum
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'resgate' && (
          <div className="max-w-md mx-auto animate-fade-in bg-black/50 p-6 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black tracking-tight text-white uppercase italic transform -skew-x-6 drop-shadow-md">
                MEUS PRÊMIOS
              </h2>
            </div>

            {premiosDesbloqueados.length === 0 ? (
              <div className="text-center text-gray-400 py-8 border-2 border-dashed border-gray-600 rounded-xl">
                <Gift size={40} className="mx-auto mb-3 opacity-50" />

                <p className="font-bold text-sm">
                  Nenhum prêmio sorteado ainda.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {premiosDesbloqueados.map((premio, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedSticker(premio)}
                    className="p-4 rounded-xl border bg-gradient-to-r from-green-950/90 to-blue-950/90 border-green-500/50 shadow-md cursor-pointer hover:scale-[1.02] transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-black text-sm text-white">
                          {premio.titulo}
                        </h3>

                        <p className="text-[10px] text-green-300 font-bold mt-0.5">
                          PRONTO PARA RESGATE
                        </p>
                      </div>

                      <span className="text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-yellow-400 text-black shadow-sm transform rotate-2">
                        ABRIR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <ModalFigurinha
        sticker={selectedSticker}
        onClose={() => setSelectedSticker(null)}
      />
    </div>
  );
}