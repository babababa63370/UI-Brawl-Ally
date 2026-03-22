import { useState } from "react";
import BlobBackground from "@/components/BlobBackground";
import Navbar from "@/components/Navbar";
import { Trophy, ChevronLeft, ChevronRight, Star, Clock, Swords, BarChart2, Shield } from "lucide-react";

/* ── Types ── */
interface BrawlerPlayer { n: string; t: string; b: string | null; bi: string | null; tr: number; }
interface BattleEntry {
  battleTime: string;
  event: { id: number; mode: string; map: string; mapImage: string };
  result: "victory" | "defeat" | "draw" | null;
  teamIndex: number | null;
  isStarPlayer: boolean;
  trophyChange: number | null;
  avgTrophies: number;
  teams: BrawlerPlayer[][];
  battle: { mode: string | null; type: string | null; duration: number | null };
}

/* ── Player data ── */
const PLAYER = {
  name: "I\u0338\u0351\u034a\u034c\u035d\u0350\u0314\u030a\u0350\u035d\u035b\u0353\u0349\u0331",
  nameColor: "f05637",
  tag: "80R0CVJ8J",
  icon: "http://cdn.meonix.me/cdn/profile-icons/regular/28000868.png",
  trophies: 33721,
  highestTrophies: 33723,
  expLevel: 135,
  club: { name: "SKAN|E-SPORT V2" },
};

const MY_TAG = "#80R0CVJ8J";

/* ── Battle log ── */
const BATTLE_LOG: BattleEntry[] = [
  {"battleTime":"20260322T082549.000Z","event":{"id":15000024,"mode":"brawlBall","map":"Backyard Bowl","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000024.png"},"result":"defeat","teamIndex":0,"isStarPlayer":false,"trophyChange":-2,"avgTrophies":0,"teams":[[{"n":"꧁༺ ₦Ї₦ℑ₳ ƤℜɆĐ₳₮","t":"#2Y2CR0JQQP","b":"BARLEY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000006.png","tr":203},{"n":"Hero Itachi","t":"#2JPL2JURRR","b":"BUZZ","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000049.png","tr":304},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":472}],[{"n":"Juen☢️","t":"#RQ9VJV","b":"GLOWBERT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000101.png","tr":319},{"n":"TTM|greg🤫💀🤫","t":"#PUUQ8JPJY","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":964},{"n":"ayaz kocabey","t":"#2UL2R8L99J","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":251}]],"battle":{"mode":"brawlBall","type":"ranked","duration":150}},
  {"battleTime":"20260321T211532.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":14,"avgTrophies":0,"teams":[[{"n":"🐺🤘","t":"#JGLL0VJYQ","b":"DOUG","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000071.png","tr":499},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":458},{"n":"7azmaa","t":"#2JQJ00LJ0U","b":"FRANK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000020.png","tr":928}],[{"n":"Bs|kıller$¥~","t":"#U2RPGP98Y","b":"PENNY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000019.png","tr":664},{"n":"mal","t":"#U90RLY0UV","b":"FRANK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000020.png","tr":681},{"n":"Miel.","t":"#U9VGUC0CC","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":689}]],"battle":{"mode":"brawlBall","type":"ranked","duration":37}},
  {"battleTime":"20260321T155817.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":13,"avgTrophies":0,"teams":[[{"n":"Ekain","t":"#8J92C8YQU","b":"NAJIA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000103.png","tr":390},{"n":"Il King","t":"#2J2P9UV9JV","b":"KENJI","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000085.png","tr":252},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":445}],[{"n":"A®️9","t":"#28U0C8288","b":"FRANK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000020.png","tr":423},{"n":"KARNAGE ™","t":"#28CU92J9G","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":388},{"n":"pachymc","t":"#28UJJPJ2U","b":"KENJI","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000085.png","tr":419}]],"battle":{"mode":"brawlBall","type":"ranked","duration":86}},
  {"battleTime":"20260321T155211.000Z","event":{"id":15001122,"mode":"soloShowdown","map":"Makeshift Scaffolding","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001122.png"},"result":"victory","teamIndex":null,"isStarPlayer":false,"trophyChange":15,"avgTrophies":0,"teams":[],"battle":{"mode":"soloShowdown","type":"ranked","duration":null}},
  {"battleTime":"20260321T155008.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":11,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":419},{"n":"cheluccia","t":"#QJVJ0002G","b":"GALE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000035.png","tr":216},{"n":"үͥαтͣσͫσᵍᵒᵈ","t":"#CUQJ2P0L","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":551}],[{"n":"Next_one","t":"#292JVR2RU","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":324},{"n":"vct__cthr","t":"#290LP98QP","b":"8-BIT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000027.png","tr":352},{"n":"Lito75armeni92","t":"#290QGRPQU","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":480}]],"battle":{"mode":"brawlBall","type":"ranked","duration":45}},
  {"battleTime":"20260321T154645.000Z","event":{"id":15001145,"mode":"trioShowdown","map":"Makeshift Scaffolding","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001145.png"},"result":null,"teamIndex":3,"isStarPlayer":false,"trophyChange":-2,"avgTrophies":0,"teams":[[{"n":"Ilias og 🇲🇦","t":"#GGU9C9C9G","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":263},{"n":"TOKITO","t":"#RY0UPVC2R","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":898},{"n":"mavi","t":"#2Y9YUYY8L9","b":"8-BIT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000027.png","tr":246}],[{"n":"сырок","t":"#9J2GLU8YL","b":"WILLOW","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000067.png","tr":221},{"n":"yalda","t":"#20YULRJUYJ","b":"LILY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000081.png","tr":560},{"n":"julkaa","t":"#RL2VGP8J0","b":"AMBER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000040.png","tr":580}],[{"n":"dargroy","t":"#2UGGJPYVRG","b":"MORTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000011.png","tr":304},{"n":"naz","t":"#2ULC8JY90L","b":"GLOWBERT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000101.png","tr":350},{"n":"💐Ylia_dod232💐","t":"#RYJP9JYLR","b":"CROW","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000012.png","tr":473}],[{"n":"EL PEPE","t":"#QJJUQ8CVL","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":292},{"n":"polineessa","t":"#2UV0VY0J9L","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":486},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":411}]],"battle":{"mode":"duoShowdown","type":"ranked","duration":null}},
  {"battleTime":"20260321T154634.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":10,"avgTrophies":0,"teams":[[{"n":"|Gnzlx_013|2","t":"#2JJQY88929","b":"DYNAMIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000009.png","tr":483},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":409},{"n":"|N4ch0•B|","t":"#9QPLQLUL8","b":"KAZE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000094.png","tr":225}],[{"n":"Yito Polvora","t":"#PU8LQ09JY","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":444},{"n":"psychogotchi","t":"#PU9YVRRVC","b":"SURGE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000038.png","tr":415},{"n":"Pepe💙❤️godeik","t":"#PUP20UPGV","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":419}]],"battle":{"mode":"brawlBall","type":"ranked","duration":22}},
  {"battleTime":"20260321T114647.000Z","event":{"id":15001145,"mode":"trioShowdown","map":"Makeshift Scaffolding","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001145.png"},"result":null,"teamIndex":0,"isStarPlayer":false,"trophyChange":20,"avgTrophies":0,"teams":[[{"n":"@....","t":"#8C9Y8V28J","b":"BONNIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000058.png","tr":280},{"n":"xkssl","t":"#V8QVJJG0J","b":"GENE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000021.png","tr":835},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":391}],[{"n":"Ice_Piper🧊🧊","t":"#89C99RQ9Y","b":"JUJU","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000087.png","tr":333},{"n":"Ami","t":"#RJ2J9J89J","b":"BONNIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000058.png","tr":892},{"n":"na.nowakk","t":"#GY0V299CQ","b":"ANGELO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000079.png","tr":231}],[{"n":"Eva","t":"#PUYLU208G","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":725},{"n":"NL|Djevian🇳🇱⚽","t":"#G2UUVPVGG","b":"OTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000059.png","tr":713},{"n":"лплоилр","t":"#RQ9JQLJCV","b":"CROW","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000012.png","tr":278}],[{"n":"амир","t":"#2CJYL2Q0GU","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":309},{"n":"трамп","t":"#9Q0GGUYCG","b":"BIBI","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000026.png","tr":317},{"n":"Miraç","t":"#JR0CRPQ88","b":"TRUNK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000096.png","tr":1000}]],"battle":{"mode":"duoShowdown","type":"ranked","duration":null}},
  {"battleTime":"20260321T114158.000Z","event":{"id":15001145,"mode":"trioShowdown","map":"Makeshift Scaffolding","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001145.png"},"result":null,"teamIndex":0,"isStarPlayer":false,"trophyChange":19,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":372},{"n":"Stay_Love","t":"#2URQCGGY2Q","b":"MORTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000011.png","tr":924},{"n":"@hxl_zs07","t":"#2QY8U0VG0C","b":"MAISIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000068.png","tr":415}],[{"n":"Bulbizizi","t":"#2CPQPGG0JC","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":404},{"n":"ŞANSLI BUZZyasi","t":"#2CJL20R8UU","b":"LEON","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000023.png","tr":277},{"n":"Messi Ronaldo 1","t":"#2RCRJ08YPP","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":962}],[{"n":"ватафа","t":"#282G8J22CU","b":"GUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000061.png","tr":296},{"n":"Elina","t":"#QRG0GL208","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":320},{"n":"Exm |potok","t":"#PR8PV22YJ","b":"SANDY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000028.png","tr":966}],[{"n":"sigma","t":"#2Q2U9PLRQV","b":"GALE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000035.png","tr":207},{"n":"kordelius push","t":"#2L2UVJCPC2","b":"EL PRIMO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000010.png","tr":918},{"n":"run1x_v1","t":"#2CJYJJCYV2","b":"BERRY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000082.png","tr":526}]],"battle":{"mode":"duoShowdown","type":"ranked","duration":null}},
  {"battleTime":"20260321T113921.000Z","event":{"id":15001145,"mode":"trioShowdown","map":"Makeshift Scaffolding","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001145.png"},"result":null,"teamIndex":0,"isStarPlayer":false,"trophyChange":18,"avgTrophies":0,"teams":[[{"n":"timéo","t":"#2R0CLR0C29","b":"SPIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000005.png","tr":215},{"n":"шакал","t":"#RG00LYLR9","b":"CROW","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000012.png","tr":618},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":354}],[{"n":"Spartam25","t":"#LLYLP88L2","b":"BYRON","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000042.png","tr":440},{"n":"hvksam","t":"#LLQP09L0V","b":"ROSA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000024.png","tr":457},{"n":"Theo","t":"#LLYC9VUGY","b":"DARRYL","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000018.png","tr":454}],[{"n":"DINOCO","t":"#LLLU9G082","b":"BUSTER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000062.png","tr":459},{"n":"chinois","t":"#LLYJV22VC","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":481},{"n":"nani","t":"#LLL9PU2Y9","b":"EMZ","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000030.png","tr":474}],[{"n":"RB|MAGICX🎭","t":"#LLLV9YRR9","b":"EMZ","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000030.png","tr":414},{"n":"45566h","t":"#LLYJCCQ2C","b":"SQUEAK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000047.png","tr":395},{"n":"jaja","t":"#LLQY2UYQQ","b":"DYNAMIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000009.png","tr":424}]],"battle":{"mode":"duoShowdown","type":"ranked","duration":null}},
  {"battleTime":"20260321T113559.000Z","event":{"id":15000011,"mode":"gemGrab","map":"Undermine","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000011.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"MANDY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000065.png","tr":5},{"n":"Sarah","t":"#2UGC0GVC0G","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":5},{"n":"67","t":"#GJVRUQQVR","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":6}],[{"n":"⛩️|𝖏𝖆𝖏𝖆|🥢","t":"#292RU8U2G","b":"LOU","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000041.png","tr":5},{"n":"Anto 42","t":"#2902809YP","b":"NITA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000008.png","tr":5},{"n":"🍭N4tomy_78🍭","t":"#292QC2L9U","b":"LARRY & LAWRIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000077.png","tr":5}]],"battle":{"mode":"gemGrab","type":"soloRanked","duration":143}},
  {"battleTime":"20260321T113248.000Z","event":{"id":15000050,"mode":"brawlBall","map":"Sneaky Fields","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000050.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"Skorpion polska","t":"#LQRJGJ8YY","b":"DOUG","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000071.png","tr":5},{"n":"Szymon123","t":"#2UL28CLR8U","b":"CORDELIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000070.png","tr":5},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"MORTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000011.png","tr":5}],[{"n":"無名小淬","t":"#2R8GJPVV","b":"DYNAMIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000009.png","tr":5},{"n":"Mossay","t":"#2RYR2L09","b":"GROM","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000048.png","tr":5},{"n":"[GK]VandrSey","t":"#2R9YL8GC","b":"CROW","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000012.png","tr":5}]],"battle":{"mode":"brawlBall","type":"soloRanked","duration":74}},
  {"battleTime":"20260321T113010.000Z","event":{"id":15000010,"mode":"gemGrab","map":"Gem Fort","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000010.png"},"result":"defeat","teamIndex":0,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":5},{"n":"pelayognz","t":"#PLG9GGGG","b":"MR. P","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000031.png","tr":5},{"n":"NE|Ilieș","t":"#UY2JJVP0","b":"EMZ","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000030.png","tr":5}],[{"n":"moha","t":"#2CGC9CUU99","b":"CORDELIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000070.png","tr":5},{"n":"[#~_~#]","t":"#2UUL28GP2","b":"BULL","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000002.png","tr":5},{"n":"killed | you","t":"#GR09GQQ22","b":"JESSIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000007.png","tr":5}]],"battle":{"mode":"gemGrab","type":"soloRanked","duration":115}},
  {"battleTime":"20260321T112704.000Z","event":{"id":15000010,"mode":"gemGrab","map":"Gem Fort","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000010.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"suki aleksa","t":"#QLUCC28GQ","b":"CORDELIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000070.png","tr":4},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":4},{"n":"Didi aac","t":"#GCLGY088V","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":4}],[{"n":"rxy_zd ;)","t":"#9VLP0U8LC","b":"BROCK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000003.png","tr":4},{"n":"back to lobby;)","t":"#9VL288VCR","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":4},{"n":"BallerHT","t":"#9VYPLG889","b":"NITA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000008.png","tr":4}]],"battle":{"mode":"gemGrab","type":"soloRanked","duration":106}},
  {"battleTime":"20260321T112427.000Z","event":{"id":15000082,"mode":"bounty","map":"Layer Cake","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":4},{"n":"TTM|¥@nniz¥","t":"#8J92JQPVJ","b":"LEON","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000023.png","tr":4},{"n":"HMB|Ale🦈","t":"#2JY2YGRV22","b":"CORDELIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000070.png","tr":4}],[{"n":"VDT|🏯Sand🍁","t":"#28VV0Y22U","b":"FRANK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000020.png","tr":4},{"n":"epzoo","t":"#2900RG0Y0","b":"EVE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000056.png","tr":4},{"n":"ninine","t":"#292Y2GP2G","b":"BROCK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000003.png","tr":4}]],"battle":{"mode":"bounty","type":"soloRanked","duration":43}},
  {"battleTime":"20260321T111111.000Z","event":{"id":15000118,"mode":"brawlBall","map":"Pinball Dreams","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000118.png"},"result":"victory","teamIndex":0,"isStarPlayer":true,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":4},{"n":"Wet 🥶 and jass","t":"#L9J999Y9J","b":"MORTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000011.png","tr":4},{"n":"MY|Shanks™","t":"#2PP8VCPGC","b":"SPIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000005.png","tr":4}],[{"n":"Perline11","t":"#290JUPVPJ","b":"ASH","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000051.png","tr":4},{"n":"doums","t":"#28VJCR8QP","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":4},{"n":"🇵🇸🇲🇦🇵🇸","t":"#290RJGU8J","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":4}]],"battle":{"mode":"brawlBall","type":"soloRanked","duration":50}},
  {"battleTime":"20260321T110857.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":16,"avgTrophies":0,"teams":[[{"n":"Onurᴷⁱˡˡᵧₒᵤツ","t":"#2CL00QGJ8V","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":854},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":338},{"n":"FLACO","t":"#9LCL0Y9G","b":"JUJU","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000087.png","tr":383}],[{"n":"posti1003","t":"#2R228GRYVP","b":"BO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000014.png","tr":280},{"n":"sama_pol04","t":"#V2VVU0G8","b":"SIRIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000102.png","tr":283},{"n":"シーズ","t":"#PY8YG22CU","b":"GENE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000021.png","tr":923}]],"battle":{"mode":"brawlBall","type":"ranked","duration":75}},
  {"battleTime":"20260321T110714.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":15,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":323},{"n":"nassim 🇹🇳","t":"#2CLCRU92V2","b":"OLLIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000090.png","tr":299},{"n":"elKingMacius","t":"#8QV0VP0JJ","b":"CARL","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000025.png","tr":609}],[{"n":"loulouquad69","t":"#292QY2YLL","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":465},{"n":"epzoo","t":"#2900RG0Y0","b":"PIPER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000015.png","tr":510},{"n":"Mathé","t":"#2902UV0CP","b":"EL PRIMO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000010.png","tr":469}]],"battle":{"mode":"brawlBall","type":"ranked","duration":61}},
  {"battleTime":"20260321T110541.000Z","event":{"id":15000115,"mode":"gemGrab","map":"Double Swoosh","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15000115.png"},"result":"defeat","teamIndex":1,"isStarPlayer":false,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"царский немощь","t":"#2RUR0JQP0U","b":"BIBI","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000026.png","tr":81},{"n":"CCCP MATO","t":"#LV92RCYJC","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":1187},{"n":"Я ГРАЖДАНСКИЙ","t":"#Y2QYRJQLC","b":"NAJIA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000103.png","tr":0}],[{"n":"THICK LILY","t":"#2UY09CLLQ8","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":1005},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":323},{"n":"Honigbrot","t":"#RGUR9UJUQ","b":"MAISIE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000068.png","tr":1000}]],"battle":{"mode":"gemGrab","type":"ranked","duration":100}},
  {"battleTime":"20260321T095450.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":true,"trophyChange":14,"avgTrophies":0,"teams":[[{"n":"BimBimBamBam","t":"#2CLLYQJGQ2","b":"COLETTE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000039.png","tr":205},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":309},{"n":"nba","t":"#2UJJR9LP2Y","b":"MORTIS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000011.png","tr":539}],[{"n":"Kawasaki🏍️","t":"#RRQ0JGVQV","b":"BROCK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000003.png","tr":423},{"n":"Snxpez_DE","t":"#RRLJ2VJ9R","b":"SPIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000005.png","tr":370},{"n":"Reh Rudolph","t":"#RRQ08LU8Q","b":"PIPER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000015.png","tr":387}]],"battle":{"mode":"brawlBall","type":"ranked","duration":98}},
  {"battleTime":"20260321T093522.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":13,"avgTrophies":0,"teams":[[{"n":"onepiece","t":"#2C09CPLLJY","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":360},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":296},{"n":"kori","t":"#2URYR2PVJ0","b":"EMZ","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000030.png","tr":791}],[{"n":"kk","t":"#QPGQCJJV","b":"PENNY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000019.png","tr":542},{"n":"mama","t":"#Q9VG8PGR","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":496},{"n":"Les nutéllas","t":"#QP0VPQJ2","b":"PIPER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000015.png","tr":559}]],"battle":{"mode":"brawlBall","type":"ranked","duration":89}},
  {"battleTime":"20260321T092028.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":true,"trophyChange":12,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":284},{"n":"Леша","t":"#Q2CQQG99J","b":"MEEPLE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000089.png","tr":175},{"n":"Lawn_-","t":"#2R0Y229QLP","b":"CORDELIUS","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000070.png","tr":295}],[{"n":"sasso_69💶","t":"#2920802G8","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":253},{"n":"Cisco","t":"#28VPLCQUJ","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":242},{"n":"ilanzian65","t":"#28VRYJYCG","b":"SPIKE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000005.png","tr":253}]],"battle":{"mode":"brawlBall","type":"ranked","duration":88}},
  {"battleTime":"20260321T091834.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"draw","teamIndex":0,"isStarPlayer":true,"trophyChange":null,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":284},{"n":"miliking","t":"#2UPLYCJJUQ","b":"BIBI","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000026.png","tr":300},{"n":"Коко прото","t":"#20GJ8CGPY8","b":"SHELLY","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000000.png","tr":339}],[{"n":"naruto","t":"#290Y298GL","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":380},{"n":"ATHm","t":"#292JCCQCG","b":"NITA","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000008.png","tr":235},{"n":"[CHILL] levex","t":"#28VLY0LUL","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":241}]],"battle":{"mode":"brawlBall","type":"ranked","duration":210}},
  {"battleTime":"20260321T091437.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":false,"trophyChange":11,"avgTrophies":0,"teams":[[{"n":"ツ ᴷⁱˡˡᵧₒᵤ","t":"#989GRUV8P","b":"TRUNK","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000096.png","tr":310},{"n":"Demon 🥀🥀","t":"#GCPP89GCV","b":"SHADE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000086.png","tr":273},{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":273}],[{"n":"✧JøᖙesҜøᖙes","t":"#PQ9CJ92JU","b":"PIPER","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000015.png","tr":281},{"n":"GHOST REAPER","t":"#PQY0LQ9JP","b":"BYRON","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000042.png","tr":292},{"n":"maulgulli","t":"#PQPUVYUQJ","b":"EL PRIMO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000010.png","tr":288}]],"battle":{"mode":"brawlBall","type":"ranked","duration":71}},
  {"battleTime":"20260321T091301.000Z","event":{"id":15001205,"mode":"brawlBall","map":"No Good Deed","mapImage":"http://cdn.meonix.me/cdn/maps/regular/15001205.png"},"result":"victory","teamIndex":0,"isStarPlayer":true,"trophyChange":10,"avgTrophies":0,"teams":[[{"n":"I̸͓͉̱͑͊͌͐̔̊͐͛͝͝","t":"#80R0CVJ8J","b":"PIERCE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000099.png","tr":263},{"n":"hvk salu","t":"#2QY8JG80QL","b":"RICO","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000004.png","tr":178},{"n":"ZETA|GODITO","t":"#9V8Q8V2V2","b":"SHADE","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000086.png","tr":166}],[{"n":"ㅊKyossㅊ","t":"#29208GUY0","b":"COLT","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000001.png","tr":204},{"n":"RPG gamer","t":"#28VUVGGCU","b":"EDGAR","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000043.png","tr":203},{"n":"ninho","t":"#28VJ9GV9G","b":"GROM","bi":"http://cdn.meonix.me/cdn/brawlers/border/16000048.png","tr":188}]],"battle":{"mode":"brawlBall","type":"ranked","duration":98}},
];

/* ── Helpers ── */
const MODE_LABELS: Record<string, string> = {
  gemGrab: "Gem Grab", brawlBall: "Brawl Ball", soloShowdown: "Showdown Solo",
  duoShowdown: "Showdown Duo", trioShowdown: "Showdown Trio", heist: "Heist",
  bounty: "Bounty", hotZone: "Hot Zone", siege: "Siege", knockout: "Knockout",
  basketBrawl: "Basket Brawl",
};
function formatMode(m: string) { return MODE_LABELS[m] ?? m; }

function timeAgo(bt: string) {
  try {
    const d = new Date(bt.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6"));
    const s = (Date.now() - d.getTime()) / 1000;
    if (s < 60) return "à l'instant";
    if (s < 3600) return `${Math.floor(s / 60)} min`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`;
    return `${Math.floor(s / 86400)}j`;
  } catch { return ""; }
}

const RESULT_STYLE = {
  victory: { label: "Victoire", bg: "bg-green-500/20", border: "border-green-500/40", text: "text-green-400", dot: "bg-green-400" },
  defeat:  { label: "Défaite",  bg: "bg-red-500/20",   border: "border-red-500/40",   text: "text-red-400",   dot: "bg-red-400"   },
  draw:    { label: "Égalité",  bg: "bg-slate-500/20", border: "border-slate-500/40", text: "text-slate-400", dot: "bg-slate-400" },
  null:    { label: "—",        bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-400", dot: "bg-slate-500" },
};

function getResultStyle(r: "victory" | "defeat" | "draw" | null) {
  return RESULT_STYLE[r ?? "null"];
}

/* ── BrawlerIcon — compact icon for side columns ── */
function BrawlerIcon({ p, isMe, align }: { p: BrawlerPlayer; isMe: boolean; align: "left" | "right" }) {
  const brawlerName = p.b ? p.b.charAt(0) + p.b.slice(1).toLowerCase() : "?";
  const shortPseudo = p.n.length > 8 ? p.n.slice(0, 7) + "…" : p.n;
  return (
    <div className={`flex flex-col items-center gap-0.5 ${align === "right" ? "items-center" : "items-center"}`}>
      <div className={`relative ${isMe ? "ring-2 ring-yellow-400/90 rounded-xl" : ""}`}>
        <img
          src={p.bi ?? ""}
          alt={brawlerName}
          className="w-10 h-10 rounded-xl object-contain bg-white/5 border border-white/10"
          onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
        />
        {isMe && (
          <Star size={8} className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400 drop-shadow" />
        )}
      </div>
      <p className={`text-[8px] leading-tight text-center max-w-[44px] truncate ${isMe ? "text-yellow-300 font-semibold" : "text-muted-foreground/70"}`}>
        {shortPseudo}
      </p>
    </div>
  );
}

/* ── BattleCard ── */
function BattleCard({ entry, idx, total, onPrev, onNext }: {
  entry: BattleEntry; idx: number; total: number;
  onPrev: () => void; onNext: () => void;
}) {
  const rs = getResultStyle(entry.result);
  const myTeam = entry.teamIndex !== null ? entry.teams[entry.teamIndex] : entry.teams[0] ?? [];
  const opponentTeam = entry.teams.find((_, i) => i !== entry.teamIndex) ?? entry.teams[1] ?? [];
  const hasTeams = entry.teams.length >= 2;
  const dur = entry.battle.duration;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-0 rounded-2xl overflow-hidden border border-white/10 bg-card/60 backdrop-blur-sm shadow-xl">

      {/* ── Top bar: résultat + trophées + temps ── */}
      <div className={`flex items-center justify-between px-4 py-3 ${rs.bg} border-b ${rs.border}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${rs.dot}`} />
          <span className={`text-sm font-bold ${rs.text}`}>{rs.label}</span>
          {entry.isStarPlayer && (
            <span className="flex items-center gap-0.5 text-yellow-400 text-[10px] font-semibold">
              <Star size={10} className="fill-yellow-400" /> Star
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {entry.trophyChange !== null && (
            <span className={`text-base font-extrabold tracking-tight ${entry.trophyChange >= 0 ? "text-green-400" : "text-red-400"}`}>
              {entry.trophyChange >= 0 ? "+" : ""}{entry.trophyChange}&nbsp;🏆
            </span>
          )}
          <span className="text-[11px] text-muted-foreground">{timeAgo(entry.battleTime)}</span>
        </div>
      </div>

      {/* ── Map + brawlers ── */}
      {hasTeams ? (
        <div className="flex items-stretch">
          {/* Left team */}
          <div className="flex flex-col items-center justify-center gap-2 px-2 py-3 shrink-0" style={{ width: 56 }}>
            {myTeam.map((p, i) => (
              <BrawlerIcon key={i} p={p} isMe={p.t === MY_TAG} align="left" />
            ))}
          </div>

          {/* Map image */}
          <div className="relative flex-1 min-w-0">
            <img
              src={entry.event.mapImage}
              alt={entry.event.map}
              className="w-full h-full object-cover"
              style={{ display: "block", minHeight: 100 }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-[10px] font-bold drop-shadow leading-tight">{entry.event.map}</p>
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-[9px]">{formatMode(entry.event.mode)}</p>
                {dur !== null && (
                  <div className="flex items-center gap-0.5 text-white/60 text-[9px]">
                    <Clock size={8} />
                    <span>{Math.floor(dur / 60)}:{String(dur % 60).padStart(2, "0")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right team */}
          <div className="flex flex-col items-center justify-center gap-2 px-2 py-3 shrink-0" style={{ width: 56 }}>
            {opponentTeam.map((p, i) => (
              <BrawlerIcon key={i} p={p} isMe={p.t === MY_TAG} align="right" />
            ))}
          </div>
        </div>
      ) : (
        /* Showdown solo — pas d'équipes */
        <div className="relative w-full">
          <img
            src={entry.event.mapImage}
            alt={entry.event.map}
            className="w-full object-cover"
            style={{ aspectRatio: "16/9", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 right-3">
            <p className="text-white text-xs font-bold drop-shadow">{entry.event.map}</p>
            <p className="text-white/60 text-[10px]">{formatMode(entry.event.mode)}</p>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between px-3 py-2.5 border-t border-white/5">
        <button
          onClick={onPrev}
          disabled={idx === 0}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs text-muted-foreground">{idx + 1} / {total}</span>
        <button
          onClick={onNext}
          disabled={idx === total - 1}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Tabs ── */
const TABS = [
  { id: "stats",     label: "Stats",      icon: BarChart2 },
  { id: "brawlers",  label: "Brawlers",   icon: Shield },
  { id: "battlelog", label: "Battle Log", icon: Swords },
] as const;
type TabId = typeof TABS[number]["id"];

/* ── Main page ── */
export default function StatsPlayerTemplates() {
  const [tab, setTab] = useState<TabId>("battlelog");
  const [battleIdx, setBattleIdx] = useState(0);

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 pt-20 pb-16 px-4 max-w-lg mx-auto flex flex-col gap-0">

        {/* ── Player header ── */}
        <div className="flex items-center gap-4 py-6">
          <div className="relative shrink-0">
            <img
              src={PLAYER.icon}
              alt={PLAYER.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/15 shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 bg-background border border-white/10 text-[10px] font-bold text-foreground px-1.5 py-0.5 rounded-full">
              {PLAYER.expLevel}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl font-bold leading-tight truncate"
              style={{ color: `#${PLAYER.nameColor}` }}
            >
              {PLAYER.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">#{PLAYER.tag}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Trophy size={13} className="text-yellow-400" />
              <span className="text-sm font-semibold text-foreground">
                {PLAYER.trophies.toLocaleString("fr-FR")}
              </span>
              <span className="text-xs text-muted-foreground">trophées</span>
            </div>
          </div>
        </div>

        {/* ── Tab navbar ── */}
        <div className="flex items-center gap-1 bg-card/50 border border-border/40 rounded-xl p-1 mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                tab === id
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {tab === "battlelog" && (
          <BattleCard
            entry={BATTLE_LOG[battleIdx]}
            idx={battleIdx}
            total={BATTLE_LOG.length}
            onPrev={() => setBattleIdx(i => Math.max(0, i - 1))}
            onNext={() => setBattleIdx(i => Math.min(BATTLE_LOG.length - 1, i + 1))}
          />
        )}

        {tab === "stats" && (
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 text-center">
            <BarChart2 size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Stats à venir</p>
          </div>
        )}

        {tab === "brawlers" && (
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 text-center">
            <Shield size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Brawlers à venir</p>
          </div>
        )}
      </main>
    </div>
  );
}
