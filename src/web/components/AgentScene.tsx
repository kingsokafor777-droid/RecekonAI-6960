import { useEffect, useRef } from "react";

/*
  PIXEL-ART OFFICE — Canvas 2D
  - Characters mostly SEATED at desks, working
  - Slow occasional movement between stations
  - Detailed pixel characters matching reference screenshots
  - Large, readable speech bubbles
  - Realistic office furniture
*/

// ─── Constants ────────────────────────────────────────────
const T = 48;          // tile size in canvas pixels (bigger = more detail)
const COLS = 26;
const ROWS = 18;

// ─── Colour palette (exact pixel-art style) ───────────────
const P = {
  // Floors
  woodDark:   "#8B6005", woodMid:  "#9B7015", woodLight: "#AB8025",
  tileCream:  "#d4c4a8", tileAlt:  "#c8b898",
  blueDark:   "#2a3550", blueMid:  "#2e3a5c",
  // Walls
  wallDark:   "#14171f", wallMid:  "#1a1e2a",
  // Furniture
  deskBrown:  "#8B5E1A", deskTop:  "#a06820", deskHL: "#c08030",
  chairBrown: "#7a3a1a", chairSeat:"#9b4a2a",
  chairGreen: "#2d6a3a", chairSeatG:"#3a7a4a",
  chairPink:  "#9b3a6a", chairSeatP:"#b04a7a",
  shelfBrown: "#7B4F1A", shelfTop: "#9B6F2A",
  monitorGray:"#2a2a38", monitorBezl:"#3a3a48",
  screenBlue: "#4499ee", screenLine:"rgba(30,80,200,0.5)",
  laptopGray: "#c8c8d0", laptopScreen:"#66aaff",
  // Kitchen
  vendWhite:  "#d0d8e0", vendGray:  "#a0a8b0",
  waterBlue:  "#c0d8f8", waterBod:  "#d8e8f8",
  kitchenWall:"#b8b0a0",
  // Plants
  plantD:     "#1a6028", plantM: "#24803a", plantL: "#2ea048",
  potBrown:   "#8B5e3c", potDark: "#6b4428",
  // Text
  black: "#000", white: "#fff",
};

// ─── Room definitions (tile x,y,w,h) ─────────────────────
const R = {
  office: { x:0,  y:3,  w:13, h:15 },
  kitchen:{ x:0,  y:0,  w:13, h:3  },
  hall:   { x:13, y:6,  w:3,  h:12 },
  meeting:{ x:16, y:0,  w:10, h:10 },
  lounge: { x:16, y:10, w:10, h:8  },
};

// ─── Fixed workstation positions ──────────────────────────
// Each agent has a seat (tile) and a "facing" when seated
interface Seat { tx:number; ty:number; facing:"up"|"down"|"left"|"right" }

const SEATS: Record<string,Seat> = {
  aria:  { tx:2,  ty:7,  facing:"up"   },
  ben:   { tx:7,  ty:7,  facing:"up"   },
  chloe: { tx:2,  ty:12, facing:"up"   },
  dan:   { tx:7,  ty:12, facing:"up"   },
  eve:   { tx:2,  ty:16, facing:"up"   },
  frank: { tx:7,  ty:16, facing:"up"   },
  // meeting room
  grace: { tx:19, ty:4,  facing:"down" },
  hal:   { tx:22, ty:4,  facing:"down" },
  // lounge
  iris:  { tx:19, ty:13, facing:"right" },
  jake:  { tx:23, ty:13, facing:"left"  },
};

// ─── Agent character definitions ──────────────────────────
interface AgentDef {
  id:string; name:string; role:string;
  hair:string; skin:string; shirt:string; pants:string;
  hairStyle:"short"|"medium"|"afro"|"long"|"bun";
  tasks:string[];
  taskColor:string;
}

const AGENTS:AgentDef[] = [
  { id:"aria",  name:"Aria",  role:"Investigator", hair:"#1a0800", skin:"#8D5524", shirt:"#2d7a3a", pants:"#1e293b", hairStyle:"afro",   tasks:["Scanning inbox…","Receipt found ✉","3 queued","Plaid webhook 📡","Amazon receipt"], taskColor:"#10b981" },
  { id:"ben",   name:"Ben",   role:"Prosecutor",   hair:"#5c3317", skin:"#C68642", shirt:"#1d4ed8", pants:"#c8a96e", hairStyle:"short",   tasks:["OCR: 97.4% ✓","Matching $54.32","4 SKUs found","Fuzzy match ✓","Reconciled!"], taskColor:"#1a3cff" },
  { id:"chloe", name:"Chloe", role:"Clerk",        hair:"#8B1a1a", skin:"#D4956A", shirt:"#7c3aed", pants:"#1e293b", hairStyle:"long",    tasks:["Drafting email…","Kill switch 🔴","PDF generated","Merchant blocked","Hulu cancelled"], taskColor:"#7c3aed" },
  { id:"dan",   name:"Dan",   role:"Surveillance", hair:"#1a1a1a", skin:"#FDBCB4", shirt:"#374151", pants:"#1e3a5f", hairStyle:"short",   tasks:["Zombie: Gym 91d","Price spike +18%","3 subs unused","$272 leak found","Adobe alert"], taskColor:"#ef4444" },
  { id:"eve",   name:"Eve",   role:"Data Agent",   hair:"#1a1a1a", skin:"#8D5524", shirt:"#be185d", pants:"#374151", hairStyle:"bun",     tasks:["SKU graph ready","B2B API ✓","Oat Milk +15%","Market intel","Hedge data out"], taskColor:"#ec4899" },
  { id:"frank", name:"Frank", role:"Card Agent",   hair:"#1e40af", skin:"#C68642", shirt:"#0f766e", pants:"#1e293b", hairStyle:"medium",  tasks:["Card updated","Netflix ✗ blocked","Limit: $200/mo","Auth ✓","Approve $12.99"], taskColor:"#0ea5e9" },
  { id:"grace", name:"Grace", role:"Tax Agent",    hair:"#5c3317", skin:"#D4956A", shirt:"#b45309", pants:"#374151", hairStyle:"medium",  tasks:["Q4 report done","$2,847 saved ✓","Receipts attached","CRA-ready ✓","Export PDF"], taskColor:"#f59e0b" },
  { id:"hal",   name:"Hal",   role:"Matcher",      hair:"#1a1a1a", skin:"#FDBCB4", shirt:"#4338ca", pants:"#c8a96e", hairStyle:"short",   tasks:["Confidence: 97%","Merchant mapped","Amount: ±$0.01","Date delta: 0d","RECONCILED ✓"], taskColor:"#818cf8" },
  { id:"iris",  name:"Iris",  role:"Notifier",     hair:"#8B1a1a", skin:"#C68642", shirt:"#0369a1", pants:"#1e293b", hairStyle:"long",    tasks:["Alert sent!","Push notif ✓","$47 saved/wk","Email drafted","Weekly summary"], taskColor:"#38bdf8" },
  { id:"jake",  name:"Jake",  role:"Security",     hair:"#1a1a1a", skin:"#FDBCB4", shirt:"#1e293b", pants:"#374151", hairStyle:"short",   tasks:["Vault sealed 🔐","PII isolated","AES-256 ✓","Token refresh","Auth audit ✓"], taskColor:"#94a3b8" },
];

// ─── Runtime agent state ───────────────────────────────────
interface AgentRT {
  def: AgentDef;
  // world position in TILES (float)
  wx: number; wy: number;
  // target tile
  tx: number; ty: number;
  facing: "up"|"down"|"left"|"right";
  // animation
  walkPhase: number;
  isWalking: boolean;
  walkSpeed: number;    // tiles per second (very slow)
  // working animation
  workPhase: number;    // for typing/head bob
  mouthPhase: number;
  mouthOpen: boolean;
  // task bubble
  taskIdx: number;
  taskTimer: number;    // seconds
  bubbleAlpha: number;
  bubbleFadeIn: boolean;
  // state: "working"|"walking"|"talking"
  state: "working"|"walking"|"talking";
  stateTimer: number;   // seconds
  // occasional walk destination
  nextDest: {wx:number,wy:number} | null;
}

let rts: AgentRT[] = [];

function initAgents() {
  rts = AGENTS.map(def => {
    const seat = SEATS[def.id];
    const wx = seat ? seat.tx + 0.5 : 2.5;
    const wy = seat ? seat.ty + 0.5 : 5.5;
    return {
      def, wx, wy, tx: wx, ty: wy,
      facing: seat?.facing ?? "down",
      walkPhase: Math.random()*Math.PI*2,
      isWalking: false,
      walkSpeed: 0.8,  // tiles/second — SLOW
      workPhase: Math.random()*Math.PI*2,
      mouthPhase: Math.random()*Math.PI*2,
      mouthOpen: false,
      taskIdx: 0,
      taskTimer: 3 + Math.random()*4,
      bubbleAlpha: 1,
      bubbleFadeIn: true,
      state: "working",
      stateTimer: 8 + Math.random()*20,
      nextDest: null,
    };
  });
}

// ─── Draw helpers ─────────────────────────────────────────
type Ctx = CanvasRenderingContext2D;

function px(ctx:Ctx, x:number,y:number,w:number,h:number,fill:string,stroke?:string) {
  ctx.fillStyle=fill; ctx.fillRect(x,y,w,h);
  if (stroke) { ctx.strokeStyle=stroke; ctx.lineWidth=1; ctx.strokeRect(x,y,w,h); }
}
function circ(ctx:Ctx, x:number,y:number,r:number,fill:string) {
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle=fill; ctx.fill();
}
function txt(ctx:Ctx, s:string,x:number,y:number,size:number,fill:string,align:"left"|"center"|"right"="center",bold=false) {
  ctx.font=`${bold?"bold ":""}${size}px "Press Start 2P", monospace`;
  ctx.textAlign=align; ctx.fillStyle=fill; ctx.fillText(s,x,y);
}
function rtxt(ctx:Ctx, s:string,x:number,y:number,size:number,fill:string,align:"left"|"center"|"right"="center") {
  ctx.font=`bold ${size}px Inter, Arial, sans-serif`;
  ctx.textAlign=align; ctx.fillStyle=fill; ctx.fillText(s,x,y);
}

// ─── Draw the office map ───────────────────────────────────
function drawMap(ctx:Ctx) {
  // ── Floors ──
  // Open office — wood tiles
  for (let row=R.office.y; row<R.office.y+R.office.h; row++) {
    for (let col=R.office.x; col<R.office.x+R.office.w; col++) {
      const alt=(col+row)%3;
      const c=alt===0?P.woodDark:alt===1?P.woodMid:P.woodLight;
      px(ctx, col*T,row*T,T,T,c);
      // wood grain lines
      ctx.strokeStyle="rgba(0,0,0,0.08)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(col*T+4,row*T+8); ctx.lineTo(col*T+4,row*T+T-8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(col*T+12,row*T+4); ctx.lineTo(col*T+12,row*T+T-4); ctx.stroke();
    }
  }
  // Kitchen — cream tiles
  for (let row=0; row<R.kitchen.h; row++) {
    for (let col=0; col<R.kitchen.w; col++) {
      px(ctx, col*T,row*T,T,T,(col+row)%2===0?P.tileCream:P.tileAlt);
      ctx.strokeStyle="rgba(0,0,0,0.06)"; ctx.lineWidth=0.5;
      ctx.strokeRect(col*T,row*T,T,T);
    }
  }
  // Hall
  for (let row=R.hall.y; row<R.hall.y+R.hall.h; row++) {
    for (let col=R.hall.x; col<R.hall.x+R.hall.w; col++) {
      px(ctx,col*T,row*T,T,T,(col+row)%2===0?"#9a8060":"#8a7050");
    }
  }
  // Meeting — blue
  for (let row=R.meeting.y; row<R.meeting.y+R.meeting.h; row++) {
    for (let col=R.meeting.x; col<R.meeting.x+R.meeting.w; col++) {
      px(ctx,col*T,row*T,T,T,(col+row)%2===0?P.blueDark:P.blueMid);
    }
  }
  // Lounge — darker blue
  for (let row=R.lounge.y; row<R.lounge.y+R.lounge.h; row++) {
    for (let col=R.lounge.x; col<R.lounge.x+R.lounge.w; col++) {
      px(ctx,col*T,row*T,T,T,(col+row)%2===0?"#1e2d4a":"#223264");
    }
  }

  // ── Walls ──
  ctx.fillStyle=P.wallDark;
  ctx.fillRect(0,0,COLS*T,4);
  ctx.fillRect(0,0,4,ROWS*T);
  ctx.fillRect(0,ROWS*T-4,COLS*T,4);
  ctx.fillRect(COLS*T-4,0,4,ROWS*T);
  // Room dividers
  ctx.fillStyle="#3d2810";
  ctx.fillRect(R.office.x*T+R.office.w*T-4,R.office.y*T,4,R.office.h*T);
  ctx.fillRect(0,R.kitchen.h*T-4,R.kitchen.w*T,4);
  ctx.fillStyle="#1a2040";
  ctx.fillRect(R.meeting.x*T-4,0,4,R.meeting.h*T+R.hall.y*T);
  ctx.fillRect(R.meeting.x*T,R.meeting.h*T-4,R.meeting.w*T,4);

  // ── DESKS (open office) ──
  // 2 columns × 3 rows of desks
  const deskCols=[1,6], deskRows=[5,10,14];
  deskCols.forEach(dc=>{
    deskRows.forEach(dr=>{
      const dx=dc*T, dy=dr*T;
      const dw=T*2.5, dh=T*0.85;
      // desk body
      px(ctx,dx,dy,dw,T*1.2,P.deskBrown);
      // desk top surface
      px(ctx,dx,dy,dw,dh,P.deskTop);
      // highlight edge
      px(ctx,dx,dy,dw,T*0.1,P.deskHL);
      px(ctx,dx,dy,T*0.1,dh,P.deskHL);
      // desk legs
      px(ctx,dx+T*0.15,dy+dh,T*0.2,T*0.35,P.deskBrown);
      px(ctx,dx+dw-T*0.35,dy+dh,T*0.2,T*0.35,P.deskBrown);

      // Monitor on desk
      const mx=dx+dw*0.25, my=dy-T*0.85;
      // monitor base
      px(ctx,dx+dw*0.5-T*0.15,dy-T*0.12,T*0.3,T*0.18,"#555");
      px(ctx,dx+dw*0.5-T*0.4,dy-T*0.03,T*0.8,T*0.1,"#666");
      // bezel
      px(ctx,mx,my,T*1.0,T*0.85,P.monitorGray);
      // screen
      px(ctx,mx+T*0.08,my+T*0.07,T*0.84,T*0.65,P.screenBlue);
      // screen lines (code/data)
      for(let li=0;li<4;li++) {
        px(ctx,mx+T*0.12,my+T*0.14+li*T*0.13,T*(0.3+Math.random()*0.4),T*0.07,`rgba(20,80,200,0.7)`);
      }
      // status dot
      circ(ctx,mx+T*0.92,my+T*0.78,T*0.06,"#2ecc71");

      // keyboard
      px(ctx,dx+dw*0.15,dy+T*0.35,T*0.85,T*0.28,"#9aa0b4");
      px(ctx,dx+dw*0.18,dy+T*0.38,T*0.79,T*0.16,"#b0b8c4");
      // mouse
      circ(ctx,dx+dw*0.7,dy+T*0.45,T*0.12,"#aaa");

      // Paper stacks on desk
      px(ctx,dx+dw-T*0.55,dy+T*0.12,T*0.45,T*0.06,"#e0e0e0");
      px(ctx,dx+dw-T*0.53,dy+T*0.08,T*0.41,T*0.06,"#f0f0f0");

      // Chair in front of desk
      const cx2=dx+dw*0.5-T*0.5, cy2=dy+T*1.2;
      px(ctx,cx2,cy2,T,T,P.chairBrown);
      px(ctx,cx2+T*0.1,cy2+T*0.1,T*0.8,T*0.8,P.chairSeat);
      // chair back
      px(ctx,cx2+T*0.1,cy2-T*0.22,T*0.8,T*0.28,P.chairBrown);
      px(ctx,cx2+T*0.15,cy2-T*0.18,T*0.7,T*0.2,P.chairSeat);
    });
  });

  // ── BOOKSHELVES ──
  const shelves=[
    [0.4,3.2],[0.4,7.8],[0.4,12],[0.4,15.5],     // left wall
    [10.5,3.2],[10.5,7.8],[10.5,12],[10.5,15.5],   // right of open office
  ];
  shelves.forEach(([sx,sy])=>{
    const bx=sx*T, by=sy*T, bw=T*2.2, bh=T*1.1;
    px(ctx,bx,by,bw,bh,P.shelfBrown);
    px(ctx,bx,by,bw,T*0.12,P.shelfTop);
    px(ctx,bx,by,T*0.1,bh,P.shelfTop);
    // books
    const bookCols=["#c0392b","#27ae60","#2980b9","#f1c40f","#9b59b6","#e67e22","#e74c3c","#1abc9c"];
    for(let bi=0;bi<8;bi++){
      const bkx=bx+T*0.12+bi*(bw-T*0.2)/8;
      px(ctx,bkx,by+T*0.15,(bw-T*0.2)/8-T*0.05,bh-T*0.25,bookCols[bi]);
      // book spine highlight
      px(ctx,bkx,by+T*0.15,T*0.04,bh-T*0.25,"rgba(255,255,255,0.2)");
    }
  });
  // Meeting room bookshelves
  [[16.3,2.5],[22.8,2.5],[16.3,7],[22.8,7]].forEach(([sx,sy])=>{
    const bx=sx*T, by=sy*T, bw=T*2, bh=T*1.0;
    px(ctx,bx,by,bw,bh,P.shelfBrown);
    px(ctx,bx,by,bw,T*0.1,P.shelfTop);
    const bookCols2=["#c0392b","#2980b9","#f1c40f","#27ae60","#9b59b6","#e67e22"];
    for(let bi=0;bi<6;bi++){
      const bkx=bx+T*0.1+bi*(bw-T*0.2)/6;
      px(ctx,bkx,by+T*0.12,(bw-T*0.2)/6-T*0.04,bh-T*0.2,bookCols2[bi]);
    }
  });

  // ── PLANTS ──
  const plants=[
    [0.2,3.5],[0.2,9],[0.2,14],[12.2,3.5],[12.2,9],[12.2,14],
    [16.2,4],[24.5,4],[16.2,8.5],[24.5,8.5],
    [16.5,11.5],[24.5,11.5],[16.5,16],[24.5,16],
  ];
  plants.forEach(([px2,py2])=>{
    const x=px2*T, y=py2*T;
    // pot
    px(ctx,x+T*0.25,y+T*0.55,T*0.5,T*0.45,P.potBrown);
    px(ctx,x+T*0.2,y+T*0.52,T*0.6,T*0.1,P.potDark);
    // stems & leaves — chunky pixel style
    ctx.fillStyle=P.plantD;
    ctx.fillRect(x+T*0.45,y+T*0.1,T*0.1,T*0.45);
    ctx.fillStyle=P.plantM;
    ctx.fillRect(x+T*0.2,y+T*0.0,T*0.6,T*0.38);
    ctx.fillStyle=P.plantL;
    ctx.fillRect(x+T*0.3,y-T*0.1,T*0.4,T*0.22);
    ctx.fillRect(x+T*0.1,y+T*0.12,T*0.25,T*0.2);
    ctx.fillRect(x+T*0.65,y+T*0.12,T*0.25,T*0.2);
  });

  // ── KITCHEN EQUIPMENT ──
  const kx=2*T, ky=0.2*T;
  // Vending machine
  px(ctx,kx,ky,T*1.8,R.kitchen.h*T-T*0.6,P.vendWhite,P.vendGray);
  px(ctx,kx+T*0.15,ky+T*0.2,T*1.5,T*1.8,"#4466aa");
  // slots
  for(let ri=0;ri<3;ri++) for(let ci=0;ci<3;ci++) {
    const sc2=["#ff6644","#44aaff","#ffcc44"][ci];
    px(ctx,kx+T*0.22+ci*T*0.46,ky+T*0.28+ri*T*0.52,T*0.38,T*0.38,sc2);
  }
  px(ctx,kx+T*0.3,ky+T*2.1,T*1.2,T*0.3,"#888");  // coin slot
  // Water dispenser
  const wx2=kx+T*2.2, wy2=ky;
  px(ctx,wx2,wy2,T*1.3,R.kitchen.h*T-T*0.6,P.waterBod,"#a0b8cc");
  circ(ctx,wx2+T*0.65,wy2+T*0.5,T*0.42,P.waterBlue);
  circ(ctx,wx2+T*0.65,wy2+T*0.5,T*0.35,"#d8eef8");
  px(ctx,wx2+T*0.25,wy2+T*1.1,T*0.8,T*0.22,"#cc4444");
  px(ctx,wx2+T*0.25,wy2+T*1.45,T*0.8,T*0.22,"#4444cc");
  // Trash / bin
  px(ctx,kx+T*8,ky+T*0.4,T*0.9,R.kitchen.h*T-T*0.9,"#606070","#404050");
  px(ctx,kx+T*7.9,ky+T*0.3,T*1.1,T*0.22,"#505060");
  // Fridge
  px(ctx,kx+T*9.5,ky,T*2.2,R.kitchen.h*T-T*0.4,"#dde0ea","#b0b5c0");
  px(ctx,kx+T*9.6,ky+T*0.15,T*1.0,R.kitchen.h*T*0.45-T*0.2,"#c8ccd8");
  px(ctx,kx+T*9.6,ky+T*0.15+R.kitchen.h*T*0.45,T*1.0,R.kitchen.h*T*0.45,"#c0c4d0");
  px(ctx,kx+T*10.4,ky+T*(R.kitchen.h*0.45-0.1),T*0.18,T*0.25,"#888");  // handle
  // Clock on kitchen wall
  circ(ctx,kx+T*6.5,R.kitchen.h*T-T*0.4,T*0.42,"#d8d0c0");
  circ(ctx,kx+T*6.5,R.kitchen.h*T-T*0.4,T*0.35,"#f0e8d8");
  ctx.strokeStyle="#333"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(kx+T*6.5,R.kitchen.h*T-T*0.4); ctx.lineTo(kx+T*6.5,R.kitchen.h*T-T*0.76); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kx+T*6.5,R.kitchen.h*T-T*0.4); ctx.lineTo(kx+T*6.8,R.kitchen.h*T-T*0.4); ctx.stroke();

  // ── MEETING ROOM FURNITURE ──
  // Conference table
  const mtx=R.meeting.x*T+T*1.5, mty=R.meeting.y*T+T*1.8;
  const mtw=T*6.5, mth=T*4;
  px(ctx,mtx,mty,mtw,mth,P.deskBrown);
  px(ctx,mtx,mty,mtw,T*0.18,P.deskHL);
  px(ctx,mtx+T*0.15,mty+T*0.18,mtw-T*0.3,mth-T*0.18,P.deskTop);
  px(ctx,mtx+T*0.15,mty+T*0.18,T*0.12,mth-T*0.18,P.deskHL);
  // Laptop on meeting table (open)
  const lx2=mtx+mtw*0.35, ly2=mty+mth*0.3;
  px(ctx,lx2,ly2+T*0.28,T*1.1,T*0.62,P.laptopGray);
  px(ctx,lx2+T*0.06,ly2,T*1.0,T*0.65,P.laptopGray);
  px(ctx,lx2+T*0.1,ly2+T*0.05,T*0.9,T*0.52,P.laptopScreen);
  for(let li=0;li<3;li++) px(ctx,lx2+T*0.15,ly2+T*0.1+li*T*0.14,T*(0.3+li*0.2),T*0.07,"rgba(20,80,200,0.6)");
  // Meeting chairs
  const mSeats=[
    {x:R.meeting.x*T+T*2,y:R.meeting.y*T+T*0.3},{x:R.meeting.x*T+T*4.5,y:R.meeting.y*T+T*0.3},
    {x:R.meeting.x*T+T*7,y:R.meeting.y*T+T*0.3},
    {x:R.meeting.x*T+T*2,y:R.meeting.y*T+T*6.2},{x:R.meeting.x*T+T*4.5,y:R.meeting.y*T+T*6.2},
    {x:R.meeting.x*T+T*7,y:R.meeting.y*T+T*6.2},
    {x:R.meeting.x*T+T*0.3,y:R.meeting.y*T+T*2.8},{x:R.meeting.x*T+T*0.3,y:R.meeting.y*T+T*4.5},
  ];
  mSeats.forEach(s=>{
    px(ctx,s.x,s.y,T*0.95,T*0.95,P.chairGreen);
    px(ctx,s.x+T*0.1,s.y+T*0.1,T*0.75,T*0.75,P.chairSeatG);
  });
  // Whiteboard on meeting wall
  const wbx=R.meeting.x*T+T*2.5, wby=R.meeting.y*T+T*0.15;
  px(ctx,wbx,wby,T*4.5,T*1.6,"#f0f0f0","#ccc");
  px(ctx,wbx,wby,T*4.5,T*0.22,"#e0e0e8");
  // Whiteboard text
  ctx.font="bold 14px Arial,sans-serif";
  ctx.fillStyle="#1a3cff"; ctx.textAlign="center";
  ctx.fillText("Stitching Engine",wbx+T*2.25,wby+T*0.55);
  ctx.font="11px Arial,sans-serif"; ctx.fillStyle="#374151";
  ctx.fillText("Bank TXN ↔ Receipt → SKU",wbx+T*2.25,wby+T*0.95);
  ctx.fillText("Confidence: 97.4%  |  Δ=$0.01",wbx+T*2.25,wby+T*1.28);
  // Wall picture
  const ppx=R.meeting.x*T+T*7.5, ppy=R.meeting.y*T+T*1.0;
  px(ctx,ppx,ppy,T*1.8,T*1.4,"#8ba8c8","#6888a0");
  px(ctx,ppx+T*0.1,ppy+T*0.1,T*1.6,T*1.2,"#7dc28a");
  px(ctx,ppx+T*0.1,ppy+T*0.6,T*1.6,T*0.6,"#5a9ee0");
  circ(ctx,ppx+T*0.5,ppy+T*0.35,T*0.22,"#f9e428");
  // Meeting room clock
  circ(ctx,(R.meeting.x+9.5)*T,R.meeting.y*T+T*0.35,T*0.38,"#d0c8b8");
  circ(ctx,(R.meeting.x+9.5)*T,R.meeting.y*T+T*0.35,T*0.3,"#f0e8d8");
  ctx.strokeStyle="#333"; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo((R.meeting.x+9.5)*T,R.meeting.y*T+T*0.35); ctx.lineTo((R.meeting.x+9.5)*T,R.meeting.y*T+T*0.08); ctx.stroke();
  ctx.beginPath(); ctx.moveTo((R.meeting.x+9.5)*T,R.meeting.y*T+T*0.35); ctx.lineTo((R.meeting.x+9.75)*T,R.meeting.y*T+T*0.35); ctx.stroke();

  // ── LOUNGE FURNITURE ──
  const lrx=R.lounge.x*T, lry=R.lounge.y*T;
  // Coffee table
  px(ctx,lrx+T*2.5,lry+T*1.5,T*4,T*2.5,P.deskBrown);
  px(ctx,lrx+T*2.5,lry+T*1.5,T*4,T*0.15,P.deskHL);
  px(ctx,lrx+T*2.6,lry+T*1.65,T*3.8,T*2.2,P.deskTop);
  // Coffee cup on table
  circ(ctx,lrx+T*4.5,lry+T*2.5,T*0.22,"#9B6020");
  circ(ctx,lrx+T*4.5,lry+T*2.5,T*0.16,"#c8a060");
  // Laptop on lounge table (closed)
  px(ctx,lrx+T*3.2,lry+T*2.0,T*1.5,T*0.85,P.laptopGray);
  px(ctx,lrx+T*3.25,lry+T*1.88,T*1.4,T*0.75,P.monitorGray);
  px(ctx,lrx+T*3.3,lry+T*1.93,T*1.3,T*0.6,P.screenBlue);
  // Lounge chairs (sofa style)
  [[0.5,0.4],[0.5,3.8],[7.5,0.4],[7.5,3.8]].forEach(([cx3,cy3])=>{
    px(ctx,lrx+cx3*T,lry+cy3*T,T*1.5,T*1.5,P.chairPink);
    px(ctx,lrx+cx3*T+T*0.12,lry+cy3*T+T*0.12,T*1.26,T*1.26,P.chairSeatP);
    px(ctx,lrx+cx3*T,lry+cy3*T,T*1.5,T*0.2,P.chairPink);
  });
  // Lounge wall art
  const wpx=lrx+T*3.5, wpy=lry+T*0.3;
  px(ctx,wpx,wpy,T*2.5,T*1.6,"#8ba8c8","#6888a0");
  px(ctx,wpx+T*0.1,wpy+T*0.1,T*2.3,T*1.4,"#7dc28a");
  px(ctx,wpx+T*0.1,wpy+T*0.9,T*2.3,T*0.6,"#5a9ee0");
  circ(ctx,wpx+T*0.6,wpy+T*0.4,T*0.25,"#f9e428");

  // ── SIGNS & LABELS ──
  // RECEKON sign
  px(ctx,T*0.3,T*0.15,T*4.5,T*1.6,"#0b1e4f");
  px(ctx,T*0.35,T*0.2,T*4.4,T*1.5,"#0d2260");
  ctx.font="bold 15px Arial,sans-serif"; ctx.fillStyle="#fff"; ctx.textAlign="center";
  ctx.fillText("RECEKON",T*2.55,T*0.85);
  ctx.font="bold 10px Arial,sans-serif"; ctx.fillStyle="#60a5fa";
  ctx.fillText("AI Agent Office",T*2.55,T*1.35);

  // Room labels (large, readable)
  ctx.font="bold 12px Arial,sans-serif"; ctx.textAlign="center";
  ctx.fillStyle="rgba(255,255,255,0.35)";
  ctx.fillText("OPEN OFFICE",(R.office.x+R.office.w*0.5)*T,(R.office.y+0.7)*T);
  ctx.fillStyle="rgba(255,255,255,0.4)";
  ctx.fillText("KITCHEN",(R.kitchen.x+R.kitchen.w*0.5)*T,R.kitchen.h*T-T*0.25);
  ctx.fillStyle="rgba(255,255,255,0.4)";
  ctx.fillText("MEETING ROOM",(R.meeting.x+R.meeting.w*0.5)*T,(R.meeting.y+R.meeting.h-0.4)*T);
  ctx.fillStyle="rgba(255,255,255,0.35)";
  ctx.fillText("LOUNGE",(R.lounge.x+R.lounge.w*0.5)*T,(R.lounge.y+0.65)*T);
}

// ─── Draw a character ─────────────────────────────────────
function drawCharacter(ctx:Ctx, rt:AgentRT) {
  const { def } = rt;
  const px2=rt.wx*T, py2=rt.wy*T;
  const S = T * 0.9;   // character size scale
  const isSeated = rt.state === "working";
  const isWalking = rt.state === "walking";

  // bob when walking
  const bob = isWalking ? Math.abs(Math.sin(rt.walkPhase))*T*0.1 : 0;
  // work bob (typing head bob)
  const workBob = isSeated ? Math.sin(rt.workPhase)*T*0.04 : 0;
  const totalBob = bob + workBob;

  const cx2=px2, base=py2-totalBob;

  ctx.save();
  // Flip horizontal for left-facing
  if (rt.facing==="left") { ctx.translate(cx2,0); ctx.scale(-1,1); ctx.translate(-cx2,0); }
  // slightly dimmer for "background" facing (up)
  if (rt.facing==="up") ctx.globalAlpha=0.92;

  // ── BODY ──
  if (isSeated) {
    // Seated: torso sitting, legs tucked under/beside
    const torsoH=S*0.55, torsoW=S*0.7;
    const torsoX=cx2-torsoW/2, torsoY=base-torsoH;
    // legs (horizontal)
    px(ctx,cx2-S*0.32,base,S*0.62,S*0.32,def.pants);
    px(ctx,cx2-S*0.3,base+S*0.18,S*0.28,S*0.28,def.pants);
    px(ctx,cx2+S*0.02,base+S*0.18,S*0.28,S*0.28,def.pants);
    // shoes
    px(ctx,cx2-S*0.32,base+S*0.32,S*0.28,S*0.14,"#2d1f14");
    px(ctx,cx2+S*0.04,base+S*0.32,S*0.28,S*0.14,"#2d1f14");
    // torso
    px(ctx,torsoX,torsoY,torsoW,torsoH,def.shirt);
    // shirt highlight
    px(ctx,torsoX+S*0.06,torsoY+S*0.06,S*0.18,torsoH-S*0.1,"rgba(255,255,255,0.2)");
    // Typing arms
    const tyA=Math.sin(rt.workPhase)*S*0.08;
    px(ctx,cx2-S*0.55,torsoY+S*0.1+tyA,S*0.22,S*0.38,def.shirt);
    px(ctx,cx2+S*0.33,torsoY+S*0.1-tyA,S*0.22,S*0.38,def.shirt);
    // hands
    px(ctx,cx2-S*0.52,torsoY+S*0.42+tyA,S*0.18,S*0.12,def.skin);
    px(ctx,cx2+S*0.34,torsoY+S*0.42-tyA,S*0.18,S*0.12,def.skin);
  } else {
    // Standing / walking
    const legSwing = isWalking ? Math.sin(rt.walkPhase)*S*0.22 : 0;
    // legs
    px(ctx,cx2-S*0.3,base-S*0.52,S*0.27,S*0.52,def.pants);
    px(ctx,cx2+S*0.03,base-S*0.52,S*0.27,S*0.52,def.pants);
    if (isWalking) {
      px(ctx,cx2-S*0.3,base-S*0.52+legSwing,S*0.27,S*0.52,def.pants);
      px(ctx,cx2+S*0.03,base-S*0.52-legSwing,S*0.27,S*0.52,def.pants);
    }
    // shoes
    px(ctx,cx2-S*0.32,base-S*0.04,S*0.3,S*0.12,"#2d1f14");
    px(ctx,cx2+S*0.01,base-S*0.04,S*0.3,S*0.12,"#2d1f14");
    // torso
    const torsoH=S*0.55, torsoW=S*0.7;
    const torsoX=cx2-torsoW/2, torsoY=base-S*0.52-torsoH;
    px(ctx,torsoX,torsoY,torsoW,torsoH,def.shirt);
    px(ctx,torsoX+S*0.06,torsoY+S*0.06,S*0.16,torsoH-S*0.1,"rgba(255,255,255,0.18)");
    // arms (swing)
    const armSwing=isWalking?Math.sin(rt.walkPhase+Math.PI)*S*0.14:0;
    px(ctx,cx2-S*0.6,torsoY+S*0.05+armSwing,S*0.22,S*0.38,def.shirt);
    px(ctx,cx2+S*0.38,torsoY+S*0.05-armSwing,S*0.22,S*0.38,def.shirt);
    px(ctx,cx2-S*0.58,torsoY+S*0.36+armSwing,S*0.18,S*0.14,def.skin);
    px(ctx,cx2+S*0.38,torsoY+S*0.36-armSwing,S*0.18,S*0.14,def.skin);
  }

  // ── HEAD ──
  const headH=S*0.42, headW=S*0.58;
  const headY = isSeated ? base-S*0.55-headH-S*0.06 : base-S*0.52-S*0.55-headH-S*0.06;
  const headX=cx2-headW/2;
  // neck
  px(ctx,cx2-S*0.1,headY+headH,S*0.2,S*0.1,def.skin);
  // head box
  px(ctx,headX,headY,headW,headH,def.skin);
  // head shadow side
  px(ctx,headX+headW-S*0.08,headY,S*0.08,headH,"rgba(0,0,0,0.12)");

  // ── HAIR ──
  if (def.hairStyle==="afro") {
    ctx.fillStyle=def.hair;
    ctx.fillRect(headX-S*0.12,headY-S*0.18,headW+S*0.24,headH*0.55);
    circ(ctx,cx2,headY-S*0.06,headW*0.6,def.hair);
    circ(ctx,cx2-headW*0.42,headY+S*0.06,headW*0.42,def.hair);
    circ(ctx,cx2+headW*0.42,headY+S*0.06,headW*0.42,def.hair);
  } else if (def.hairStyle==="long") {
    px(ctx,headX-S*0.04,headY-S*0.06,headW+S*0.08,headH*0.45,def.hair);
    px(ctx,headX-S*0.06,headY,S*0.16,headH+S*0.5,def.hair);
    px(ctx,headX+headW-S*0.1,headY,S*0.16,headH+S*0.5,def.hair);
    px(ctx,headX-S*0.04,headY-S*0.06,headW+S*0.08,S*0.09,def.hair);
  } else if (def.hairStyle==="bun") {
    px(ctx,headX,headY-S*0.05,headW,headH*0.42,def.hair);
    circ(ctx,cx2,headY-S*0.12,S*0.2,def.hair);
    circ(ctx,cx2,headY-S*0.12,S*0.11,"rgba(0,0,0,0.2)");
  } else if (def.hairStyle==="medium") {
    px(ctx,headX-S*0.04,headY-S*0.07,headW+S*0.08,headH*0.5,def.hair);
    px(ctx,headX-S*0.04,headY,S*0.12,headH*0.6,def.hair);
    px(ctx,headX+headW-S*0.08,headY,S*0.12,headH*0.6,def.hair);
  } else {
    // short
    px(ctx,headX-S*0.02,headY-S*0.06,headW+S*0.04,headH*0.42,def.hair);
    px(ctx,headX-S*0.02,headY,S*0.1,headH*0.45,def.hair);
    px(ctx,headX+headW-S*0.08,headY,S*0.1,headH*0.45,def.hair);
  }

  // ── FACE ──
  if (rt.facing!=="up") {
    const eyeY2=headY+headH*0.36;
    const eyeL=headX+headW*0.24, eyeR=headX+headW*0.66;
    const eyeW=headW*0.14, eyeH=headH*0.2;
    // whites
    px(ctx,eyeL,eyeY2,eyeW,eyeH,"white");
    px(ctx,eyeR,eyeY2,eyeW,eyeH,"white");
    // pupils
    px(ctx,eyeL+eyeW*0.25,eyeY2+eyeH*0.15,eyeW*0.5,eyeH*0.7,"#1a1a1a");
    px(ctx,eyeR+eyeW*0.25,eyeY2+eyeH*0.15,eyeW*0.5,eyeH*0.7,"#1a1a1a");
    // shine
    px(ctx,eyeL+eyeW*0.55,eyeY2+eyeH*0.1,eyeW*0.28,eyeH*0.28,"white");
    px(ctx,eyeR+eyeW*0.55,eyeY2+eyeH*0.1,eyeW*0.28,eyeH*0.28,"white");
    // mouth
    const mY=headY+headH*0.72;
    if (rt.mouthOpen) {
      px(ctx,headX+headW*0.3,mY,headW*0.4,headH*0.16,"#7a1010");
      px(ctx,headX+headW*0.32,mY,headW*0.36,headH*0.08,"white");
    } else {
      px(ctx,headX+headW*0.3,mY,headW*0.4,headH*0.07,"#3a1010");
    }
  }

  ctx.globalAlpha=1;
  ctx.restore();

  // ── SPEECH BUBBLE ──
  if (rt.bubbleAlpha > 0.05) {
    const bText=rt.def.tasks[rt.taskIdx];
    ctx.save();
    ctx.globalAlpha=Math.min(1,rt.bubbleAlpha);

    const bFontSize = 13;
    ctx.font=`bold ${bFontSize}px Arial,sans-serif`;
    const bW=ctx.measureText(bText).width + 22;
    const bH=26;
    const bxPos=px2-bW/2;
    const byPos=isSeated
      ? (base-S*0.55-S*0.42-S*0.06)-T*1.1-bH
      : (base-S*0.52-S*0.55-S*0.42-S*0.06)-T*0.8-bH;

    // bubble shadow
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(bxPos+3,byPos+3,bW,bH);

    // bubble background
    ctx.fillStyle="#ffffff";
    ctx.strokeStyle=def.taskColor;
    ctx.lineWidth=2.5;
    const br=6;
    ctx.beginPath();
    ctx.moveTo(bxPos+br,byPos);
    ctx.lineTo(bxPos+bW-br,byPos);
    ctx.arcTo(bxPos+bW,byPos,bxPos+bW,byPos+br,br);
    ctx.lineTo(bxPos+bW,byPos+bH-br);
    ctx.arcTo(bxPos+bW,byPos+bH,bxPos+bW-br,byPos+bH,br);
    ctx.lineTo(bxPos+br,byPos+bH);
    ctx.arcTo(bxPos,byPos+bH,bxPos,byPos+bH-br,br);
    ctx.lineTo(bxPos,byPos+br);
    ctx.arcTo(bxPos,byPos,bxPos+br,byPos,br);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // tail
    ctx.fillStyle="#fff";
    ctx.beginPath();
    ctx.moveTo(px2-5,byPos+bH);
    ctx.lineTo(px2+5,byPos+bH);
    ctx.lineTo(px2,byPos+bH+8);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle=def.taskColor; ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(px2-5,byPos+bH); ctx.lineTo(px2,byPos+bH+8); ctx.lineTo(px2+5,byPos+bH);
    ctx.stroke();

    // colored dot
    circ(ctx,bxPos+11,byPos+bH/2,4,def.taskColor);

    // text
    ctx.fillStyle="#0b1e4f";
    ctx.font=`bold ${bFontSize}px Arial,sans-serif`;
    ctx.textAlign="center";
    ctx.fillText(bText,px2+1,byPos+bH*0.67);

    ctx.restore();
  }
}

// ─── Update agents (slow, mostly working) ─────────────────
function updateAgents(dt:number) {
  for (const rt of rts) {
    // task bubble fade
    if (rt.bubbleFadeIn) {
      rt.bubbleAlpha = Math.min(1, rt.bubbleAlpha + dt*1.5);
    } else {
      rt.bubbleAlpha = Math.max(0, rt.bubbleAlpha - dt*0.8);
    }

    // task timer
    rt.taskTimer -= dt;
    if (rt.taskTimer <= 0) {
      rt.bubbleFadeIn = false;
      setTimeout(()=>{
        rt.taskIdx = (rt.taskIdx+1) % rt.def.tasks.length;
        rt.bubbleAlpha = 0;
        rt.bubbleFadeIn = true;
        rt.taskTimer = 4 + Math.random()*5;
      }, 600);
      rt.taskTimer = 9999;
    }

    // mouth
    rt.mouthPhase += dt*3.5;
    rt.mouthOpen = rt.state==="working"
      ? Math.sin(rt.mouthPhase*0.4)>0.6   // occasional mouth
      : Math.sin(rt.mouthPhase)>0.3;

    // work animation
    rt.workPhase += dt * (rt.state==="working" ? 4.5 : 1.0);

    // state timer
    rt.stateTimer -= dt;
    if (rt.stateTimer <= 0) {
      if (rt.state==="working") {
        // occasionally stand up & walk to another seat (rare — 30% chance)
        if (Math.random() < 0.3) {
          const keys = Object.keys(SEATS);
          const destKey = keys[Math.floor(Math.random()*keys.length)];
          const dest = SEATS[destKey];
          rt.tx = dest.tx + 0.5;
          rt.ty = dest.ty + 0.5;
          rt.state = "walking";
          rt.stateTimer = 3 + Math.random()*4;
        } else {
          rt.stateTimer = 6 + Math.random()*15;
        }
      } else if (rt.state==="walking") {
        // arrived — sit down
        rt.state = "working";
        rt.facing = rt.ty < rt.wy + 0.5 ? "up" : "down";
        rt.stateTimer = 10 + Math.random()*25;
      }
    }

    // walking movement — SLOW
    if (rt.state==="walking") {
      rt.walkPhase += dt * 6;
      const dx=rt.tx-rt.wx, dy=rt.ty-rt.wy;
      const dist=Math.sqrt(dx*dx+dy*dy);
      const spd=rt.walkSpeed * dt;  // tiles per frame
      if (dist < 0.08) {
        rt.wx=rt.tx; rt.wy=rt.ty;
        rt.state="working";
        rt.facing = dy < 0 ? "up" : dy > 0 ? "down" : dx > 0 ? "right" : "left";
        rt.stateTimer = 10 + Math.random()*25;
      } else {
        rt.wx += (dx/dist)*spd;
        rt.wy += (dy/dist)*spd;
        if (Math.abs(dx)>Math.abs(dy)) rt.facing = dx>0?"right":"left";
        else rt.facing = dy>0?"down":"up";
      }
    }
  }
}

// ─── Main export ───────────────────────────────────────────
export function AgentScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const initDone = useRef(false);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (!initDone.current) { initAgents(); initDone.current=true; }

    const resize = () => {
      const w = container.clientWidth;
      const mapW = COLS*T, mapH = ROWS*T;
      const sc = w / mapW;
      canvas.width  = w;
      canvas.height = mapH * sc;
      canvas.style.height = `${mapH*sc}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const loop = (time:number) => {
      const dt = Math.min((time - lastTimeRef.current)/1000, 0.05);
      lastTimeRef.current = time;

      const w = canvas.width;
      const mapW = COLS*T;
      const sc = w / mapW;

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      ctx.scale(sc, sc);

      // dark surround
      ctx.fillStyle=P.wallDark;
      ctx.fillRect(0,0,COLS*T,ROWS*T);

      drawMap(ctx);
      updateAgents(dt);

      // Sort by wy for depth
      const sorted=[...rts].sort((a,b)=>a.wy-b.wy);
      sorted.forEach(a=>drawCharacter(ctx,a));

      ctx.restore();

      // Fade bottom edge
      const grad=ctx.createLinearGradient(0,canvas.height-60,0,canvas.height);
      grad.addColorStop(0,"rgba(255,255,255,0)");
      grad.addColorStop(1,"rgba(255,255,255,0.96)");
      ctx.fillStyle=grad;
      ctx.fillRect(0,canvas.height-60,canvas.width,60);

      rafRef.current=requestAnimationFrame(loop);
    };

    rafRef.current=requestAnimationFrame(loop);
    return ()=>{
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",resize);
    };
  },[]);

  return (
    <div ref={containerRef} style={{width:"100%",position:"relative",overflow:"hidden"}}>
      <canvas ref={canvasRef}
        style={{display:"block",width:"100%",imageRendering:"pixelated"}}/>
    </div>
  );
}
