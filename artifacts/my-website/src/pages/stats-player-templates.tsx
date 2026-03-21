import { useState } from "react";
import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { Trophy, Users, Swords, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";

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

/* ── Player card data ── */
const PLAYER = {
  name: "RLM|sans",
  nameColor: "ffffff",
  tag: "QUYCVC2",
  icon: "http://cdn.meonix.me/cdn/profile-icons/regular/28000044.png",
  trophies: 114411,
  highestTrophies: 114411,
  expLevel: 500,
  club: { name: "sansbs" },
};

/* ── Battle log — 25 entrées réelles ── */
const BATTLE_LOG: BattleEntry[] = [
  {battleTime:"20260320T015731.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RUFFS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000044.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"KAZE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000094.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:98}},
  {battleTime:"20260320T015533.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RUFFS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000044.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"KAZE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000094.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:120}},
  {battleTime:"20260320T015002.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"defeat",teamIndex:0,isStarPlayer:false,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JUJU",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000087.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KAZE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000094.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:116}},
  {battleTime:"20260320T014715.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"victory",teamIndex:0,isStarPlayer:true,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"PEARL",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000072.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:36}},
  {battleTime:"20260320T014548.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"victory",teamIndex:1,isStarPlayer:true,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KAZE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000094.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:120}},
  {battleTime:"20260320T014329.000Z",event:{id:15000082,mode:"bounty",map:"Layer Cake",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000082.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KAZE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000094.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"bounty",type:"friendly",duration:118}},
  {battleTime:"20260320T013747.000Z",event:{id:15000292,mode:"hotZone",map:"Open Business",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000292.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"hotZone",type:"friendly",duration:84}},
  {battleTime:"20260320T013602.000Z",event:{id:15000292,mode:"hotZone",map:"Open Business",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000292.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"hotZone",type:"friendly",duration:117}},
  {battleTime:"20260320T013345.000Z",event:{id:15000292,mode:"hotZone",map:"Open Business",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000292.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"hotZone",type:"friendly",duration:99}},
  {battleTime:"20260320T012826.000Z",event:{id:15000292,mode:"hotZone",map:"Open Business",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000292.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"hotZone",type:"friendly",duration:115}},
  {battleTime:"20260320T012610.000Z",event:{id:15000292,mode:"hotZone",map:"Open Business",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000292.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"hotZone",type:"friendly",duration:118}},
  {battleTime:"20260320T011919.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"defeat",teamIndex:0,isStarPlayer:false,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"PEARL",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000072.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:159}},
  {battleTime:"20260320T011608.000Z",event:{id:15000367,mode:"knockout",map:"Goldarm Gulch",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000367.png"},result:"victory",teamIndex:0,isStarPlayer:false,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"PEARL",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000072.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:110}},
  {battleTime:"20260320T011259.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"BROCK",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000003.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:79}},
  {battleTime:"20260320T011120.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"BROCK",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000003.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:109}},
  {battleTime:"20260320T010558.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"victory",teamIndex:0,isStarPlayer:true,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"MEEPLE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000089.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:63}},
  {battleTime:"20260320T010427.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"victory",teamIndex:0,isStarPlayer:true,trophyChange:null,teams:[[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"MEEPLE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000089.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}],[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:93}},
  {battleTime:"20260320T010146.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"MEEPLE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000089.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:31}},
  {battleTime:"20260320T010056.000Z",event:{id:15000548,mode:"knockout",map:"Out in the Open",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000548.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"ALLI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000095.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"WILLOW",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000067.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"R-T",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000066.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"JAE-YONG",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000093.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"MEEPLE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000089.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GENE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000021.png",tr:-1}]],battle:{mode:"knockout",type:"friendly",duration:41}},
  {battleTime:"20260320T005617.000Z",event:{id:15000026,mode:"brawlBall",map:"Pinhole Punt",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000026.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"MINA",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000097.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RICO",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000004.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"STU",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000045.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"EMZ",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000030.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GLOWBERT",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000101.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1}]],battle:{mode:"brawlBall",type:"friendly",duration:72}},
  {battleTime:"20260320T005446.000Z",event:{id:15000026,mode:"brawlBall",map:"Pinhole Punt",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000026.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"MINA",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000097.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RICO",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000004.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"STU",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000045.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"EMZ",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000030.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GLOWBERT",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000101.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1}]],battle:{mode:"brawlBall",type:"friendly",duration:135}},
  {battleTime:"20260320T004845.000Z",event:{id:15000026,mode:"brawlBall",map:"Pinhole Punt",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000026.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"MINA",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000097.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RICO",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000004.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"STU",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000045.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"EMZ",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000030.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GLOWBERT",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000101.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1}]],battle:{mode:"brawlBall",type:"friendly",duration:150}},
  {battleTime:"20260320T004556.000Z",event:{id:15000026,mode:"brawlBall",map:"Pinhole Punt",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000026.png"},result:"victory",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"MINA",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000097.png",tr:-1},{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"RICO",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000004.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"STU",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000045.png",tr:-1}],[{n:"RLM|Patchy",t:"#RLLRJ2",b:"EMZ",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000030.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"GLOWBERT",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000101.png",tr:-1},{n:"RLM|sans",t:"#QUYCVC2",b:"KENJI",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000085.png",tr:-1}]],battle:{mode:"brawlBall",type:"friendly",duration:127}},
  {battleTime:"20260320T003411.000Z",event:{id:15000115,mode:"gemGrab",map:"Double Swoosh",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000115.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"CHARLIE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000074.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"MORTIS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000011.png",tr:-1},{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"OTIS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000059.png",tr:-1}],[{n:"RLM|sans",t:"#QUYCVC2",b:"LILY",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000081.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"CHESTER",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000063.png",tr:-1},{n:"RLM|Patchy",t:"#RLLRJ2",b:"MOE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000084.png",tr:-1}]],battle:{mode:"gemGrab",type:"friendly",duration:135}},
  {battleTime:"20260320T003135.000Z",event:{id:15000115,mode:"gemGrab",map:"Double Swoosh",mapImage:"http://cdn.meonix.me/cdn/maps/regular/15000115.png"},result:"defeat",teamIndex:1,isStarPlayer:false,trophyChange:null,teams:[[{n:"VTC|ezlivi ✗",t:"#QURVLPG",b:"CHARLIE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000074.png",tr:-1},{n:"VTC|duckii ✗",t:"#22JR2JLYC",b:"MORTIS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000011.png",tr:-1},{n:"VTC|belal ✗",t:"#Q2VCLG9Y9",b:"OTIS",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000059.png",tr:-1}],[{n:"RLM|sans",t:"#QUYCVC2",b:"LILY",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000081.png",tr:-1},{n:"RLM|bobby",t:"#LVRRYPV",b:"CHESTER",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000063.png",tr:-1},{n:"RLM|Patchy",t:"#RLLRJ2",b:"MOE",bi:"http://cdn.meonix.me/cdn/brawlers/border/16000084.png",tr:-1}]],battle:{mode:"gemGrab",type:"friendly",duration:114}},
];

/* ── Helpers ── */
const MY_TAG = "#QUYCVC2";
function fmt(n: number) { return n.toLocaleString("fr-FR"); }

const MODE_LABELS: Record<string, string> = {
  gemGrab:"Gem Grab", brawlBall:"Brawl Ball", soloShowdown:"Showdown Solo",
  duoShowdown:"Showdown Duo", heist:"Heist", bounty:"Bounty", hotZone:"Hot Zone",
  siege:"Siege", knockout:"Knockout", basketBrawl:"Basket Brawl",
};
function formatMode(m: string) { return MODE_LABELS[m] ?? m; }

function timeAgo(bt: string) {
  try {
    const d = new Date(bt.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6"));
    const s = (Date.now() - d.getTime()) / 1000;
    if (s < 60) return "à l'instant";
    if (s < 3600) return `${Math.floor(s/60)} min`;
    if (s < 86400) return `${Math.floor(s/3600)}h`;
    return `${Math.floor(s/86400)}j`;
  } catch { return ""; }
}

/* Simulated avg trophies per match (API doesn't expose this for friendly matches) */
const AVG_TROPHIES = [1024,1024,968,1092,1036,982,1108,1148,1052,1140,1076,1196,1168,1024,1052,1140,1196,1008,1024,984,968,1012,992,1052,1052];

const RC = {
  victory: { label:"Victoire", color:"text-green-400",  badge:"bg-green-500/20 text-green-400 border-green-500/30", glow:"shadow-green-500/10" },
  defeat:  { label:"Défaite",  color:"text-red-400",    badge:"bg-red-500/20   text-red-400   border-red-500/30",   glow:"shadow-red-500/10"   },
  draw:    { label:"Égalité",  color:"text-slate-400",  badge:"bg-slate-500/20 text-slate-400 border-slate-500/30", glow:"shadow-slate-500/10" },
};

function BrawlerSlot({ p, isMe, align, size = "md" }: { p: BrawlerPlayer; isMe: boolean; align: "left" | "right"; size?: "sm"|"md" }) {
  const capName = p.b ? p.b.charAt(0) + p.b.slice(1).toLowerCase() : "?";
  const shortName = p.n.length > 13 ? p.n.slice(0, 12) + "…" : p.n;
  const imgSize = size === "md" ? "w-10 h-10" : "w-8 h-8";
  const nameWidth = size === "md" ? "max-w-[90px]" : "max-w-[70px]";
  return (
    <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <div className={`relative shrink-0 ${isMe ? "ring-2 ring-yellow-400/80 rounded-xl" : ""}`}>
        <img src={p.bi ?? ""} alt={capName}
          className={`${imgSize} rounded-xl object-contain bg-background/50 border border-border/40 p-0.5`}
          onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
        {isMe && <Star size={9} className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400 drop-shadow" />}
      </div>
      <div className={`min-w-0 ${align === "right" ? "text-right" : ""}`}>
        <p className={`text-[11px] font-semibold leading-tight truncate ${nameWidth} ${isMe ? "text-yellow-300" : "text-foreground/85"}`}>{shortName}</p>
        <p className={`text-[9px] text-muted-foreground/55 truncate ${nameWidth}`}>{capName}</p>
      </div>
    </div>
  );
}

export default function StatsPlayer() {
  const [idx, setIdx] = useState(0);
  const trophyPct = Math.min(100, Math.round((PLAYER.trophies / PLAYER.highestTrophies) * 100));

  const entry = BATTLE_LOG[idx];
  const result = entry.result ?? "draw";
  const cfg = RC[result] ?? RC.draw;
  const myTeamIdx = entry.teamIndex ?? 0;
  const myTeam = entry.teams[myTeamIdx] ?? [];
  const oppTeamIdx = myTeamIdx === 0 ? 1 : 0;
  const oppTeam = entry.teams[oppTeamIdx] ?? [];
  const avgT = AVG_TROPHIES[idx] ?? 1000;

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">

          {/* ── LEFT: Player card ── */}
          <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <img src={PLAYER.icon} alt="avatar"
                    className="w-16 h-16 rounded-xl border-2 border-border/60 object-contain bg-background/40 p-1"
                    onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none">
                    {PLAYER.expLevel}
                  </span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold leading-tight truncate" style={{ color: `#${PLAYER.nameColor}` }}>
                    {PLAYER.name}
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">#{PLAYER.tag}</p>
                </div>
              </div>
              {PLAYER.club && (
                <div className="flex items-center gap-2 mb-5 py-2.5 px-3 rounded-lg bg-accent/30 border border-border/30">
                  <Users size={13} className="text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground font-medium truncate">{PLAYER.club.name}</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Trophées</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Record : {fmt(PLAYER.highestTrophies)}</span>
                </div>
                <p className="text-2xl font-black text-foreground">{fmt(PLAYER.trophies)}</p>
                <div className="h-1.5 rounded-full bg-accent/60 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400" style={{ width: `${trophyPct}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground">{trophyPct}% du record personnel</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Battle Log (single entry) ── */}
          <div className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden">

            {/* Header */}
            <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-border/30">
              <Swords size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Battle Log</span>
              <span className="ml-auto text-[10px] text-muted-foreground/50 flex items-center gap-1">
                <Clock size={10} /> {timeAgo(entry.battleTime)}
              </span>
            </div>

            {/* Mode + Map name + result */}
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${cfg.badge}`}>{cfg.label}</span>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{formatMode(entry.event.mode)}</p>
                  <p className="text-[10px] text-muted-foreground/60">{entry.event.map}</p>
                </div>
                {entry.isStarPlayer && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
              </div>
              <span className="text-[10px] text-muted-foreground/40 font-mono">{idx + 1} / {BATTLE_LOG.length}</span>
            </div>

            {/* Main content: team left | big map | team right */}
            <div className="px-3 pb-3 flex items-center gap-2">

              {/* My team */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {myTeam.map((p, j) => (
                  <BrawlerSlot key={j} p={p} isMe={p.t === MY_TAG} align="left" size="md" />
                ))}
              </div>

              {/* Map image — big center piece */}
              <div className="shrink-0 flex flex-col items-center gap-2 mx-1">
                <img
                  src={entry.event.mapImage}
                  alt={entry.event.map}
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-border/40 shadow-lg"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Trophy stats below map */}
                <div className="flex gap-2">
                  <div className="flex flex-col items-center bg-accent/30 border border-border/30 rounded-lg px-2 py-1">
                    <span className="text-[8px] text-muted-foreground/60 uppercase tracking-wide leading-tight">Moy. trophées</span>
                    <div className="flex items-center gap-0.5">
                      <Trophy size={9} className="text-yellow-400" />
                      <span className="text-[11px] font-bold text-foreground">{fmt(avgT)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center bg-accent/30 border border-border/30 rounded-lg px-2 py-1">
                    <span className="text-[8px] text-muted-foreground/60 uppercase tracking-wide leading-tight">Gagnés</span>
                    <div className="flex items-center gap-0.5">
                      <Trophy size={9} className="text-yellow-400" />
                      <span className={`text-[11px] font-bold ${entry.trophyChange != null ? cfg.color : "text-muted-foreground"}`}>
                        {entry.trophyChange != null ? (entry.trophyChange >= 0 ? `+${entry.trophyChange}` : entry.trophyChange) : "Amical"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opponent team */}
              <div className="flex flex-col gap-2 flex-1 min-w-0 items-end">
                {oppTeam.map((p, j) => (
                  <BrawlerSlot key={j} p={p} isMe={false} align="right" size="md" />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 pb-4 flex items-center justify-between border-t border-border/20 pt-3">
              <button
                onClick={() => setIdx(i => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/40"
              >
                <ChevronLeft size={14} /> Précédente
              </button>

              {/* Dots */}
              <div className="flex gap-1">
                {BATTLE_LOG.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`rounded-full transition-all ${i === idx ? "w-4 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIdx(i => Math.min(BATTLE_LOG.length - 1, i + 1))}
                disabled={idx === BATTLE_LOG.length - 1}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/40"
              >
                Suivante <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
