const $=s=>document.querySelector(s),M=x=>x*1e6;
const fmt=n=>'$'+(n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?Math.round(n/1e3)+'K':Math.round(n));
// ---------- DATA ----------
const C=[
['india','India','🇮🇳','🕌',['#ff9933','#5b1a00'],0,[['Showroom','🚗',[['Rolls-Royce Phantom','🚘',8],['Gold Necklace','📿',2],['Rare Bullet Bike','🏍️',1]]],['Real Estate','🏰',[['Mumbai Sea Mansion','🏰',120],['Palace in Jaipur','🏯',90],['Diamond Ring','💍',5]]]]],
['uae','UAE','🇦🇪','🏙️',['#ffcf6b','#1b2a5a'],M(100),[['Supercar Souk','🏎️',[['Bugatti Chiron','🏎️',60],['Gold Lamborghini','🚙',25],['Gold Bar Tower','🪙',10]]],['Marina','🛥️',[['Mega Yacht','🛥️',200],['Burj Penthouse','🏢',150],['Pet Falcon','🦅',3]]]]],
['france','France','🇫🇷','🗼',['#ffb3c7','#2a2a6a'],M(250),[['Maison de Mode','👗',[['Couture Gown','👗',4],['Handbag Collection','👜',7],['Perfume Vault','🧴',6]]],['Diamond Salon','💎',[['Giant Diamond','💎',80],['Tiara','👑',45],['Vineyard','🍷',70]]]]],
['usa','USA','🇺🇸','🗽',['#6ec1ff','#1a1a3a'],M(400),[['Airfield','🛩️',[['Private Jet','🛩️',300],['Helicopter','🚁',40],['Hollywood Sign','🎬',500]]],['Fifth Avenue','🌆',[['NYC Penthouse','🏙️',250],['Sports Team','🏀',350],['Limo','🚖',2]]]]],
['japan','Japan','🇯🇵','🗻',['#ffd0e0','#2b1442'],M(600),[['Akiba Tech','🤖',[['Robot Butler','🤖',15],['Gaming Setup','🎮',3],['Bullet Train','🚄',400]]],['Collectibles','🎎',[['Rare Anime Figure','🎎',9],['Tuna Auction','🐟',2],['Gold Katana','⚔️',30]]]]],
['swiss','Switzerland','🇨🇭','🏔️',['#cfe8ff','#14325a'],M(800),[['Watch Boutique','⌚',[['Diamond Watch','⌚',35],['Vintage Timepiece','🕰️',18],['Gold Chocolate','🍫',1]]],['Alpine Estate','🏔️',[['Ski Chalet','🏡',110],['Private Cable Car','🚠',60],['Emerald Set','💚',22]]]]],
['uk','United Kingdom','🇬🇧','🎡',['#9aa8c8','#1c1c30'],M(1000),[['Antiques','🏺',[['Ming Vase','🏺',20],['Crown Replica','👑',55],['Royal Carriage','🐎',12]]],['Mayfair','🏛️',[['Castle','🏰',260],['London Taxi Fleet','🚕',9],['Big Ben Clock','🕰️',150]]]]],
['italy','Italy','🇮🇹','🏛️',['#8fd68f','#4a1a1a'],M(1300),[['Ferrari Piazza','🏎️',[['Ferrari SF90','🏎️',55],['Vespa Gold','🛵',1],['Silk Suit','🤵',3]]],['Villa Lago','🏡',[['Lake Como Villa','🏡',180],['Pizza Empire','🍕',40],['Colosseum Box Seat','🏟️',25]]]]],
['sg','Singapore','🇸🇬','🌴',['#7ff5d0','#0a2a3a'],M(1700),[['Marina Mall','🛍️',[['Sky Garden Suite','🌴',140],['Orchid Gold','🌺',5],['Cruise Ship','🚢',420]]],['Tech Tower','🏙️',[['AI Supercomputer','💻',90],['Drone Fleet','🛸',30],['Durian Reserve','🍈',1]]]]],
['brazil','Brazil','🇧🇷','🎭',['#ffe14d','#0a3a1a'],M(2200),[['Carnival Plaza','🎭',[['Carnival Float','🎭',20],['Football Club','⚽',380],['Beach Mansion','🏖️',160]]],['Amazon Co.','🌳',[['Rainforest Acre','🌳',45],['Samba Band','🥁',6],['Gold Parrot','🦜',8]]]]]
].map(([id,name,flag,lm,bg,unlock,shops])=>({id,name,flag,lm,bg,unlock,shops:shops.map(([n,e,items],i)=>({n,e,x:260+i*440,y:300,items:items.map(([a,b,c])=>({id:id+':'+a,n:a,e:b,p:M(c)}))}))}));
const QUOTES=['Tadban tadban tadap-tadap ke mara!','Le let ke mara!','Khade hoke mara!','Let ke mara!','Saare maara!','Mujhse taaran jaaran maaran taaran-karan!','BILLION TRILLION DOLLARS!'];
const GF=['Baby, shopping bag bhar gaya, ab shopping bag ka bag lo!','Itna kharch? Mera bhi to hissa hai!','Yeh dekh, matching wala bhi chahiye!','Sheru, wallet ro raha hai 😭','Ek aur? Haan ek aur!'];
const ACH=[['first','First Billion Spent','💰',s=>s.spent>=1e9],['pro','Shopping Is My Profession','🛍️',s=>s.buys>=25],['king','Billion Trillion King','👑',s=>s.spent>=5e9],['half','Bought Half The World','🌍',s=>Object.keys(s.owned).length>=30],['intl','Sheru Bhai International','✈️',s=>s.visited.length>=8],['first1','First Purchase','🎁',s=>s.buys>=1],['miss','Mission Master','🏆',s=>s.done.length>=3]];
// ---------- STATE ----------
const KEY='sheru-save-v1',def=()=>({money:1e9,spent:0,buys:0,owned:{},country:0,visited:['india'],done:[],cnt:{},ach:[],muted:false});
let S;try{S={...def(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{S=def()}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};
// ---------- AUDIO (files in /public/assets/audio) ----------
const AUDIO={purchase:['purchase','tadban'],tadban:['tadban'],billion:['billion-trillion'],shopping:['shopping'],victory:['victory'],bgm:['background-music']};
let bgm=null;
function play(k,loop){if(S.muted)return;const q=[...AUDIO[k]],t=()=>{const n=q.shift();if(!n)return;const a=new Audio(`/assets/audio/${n}.mp3`);a.loop=!!loop;if(loop)a.volume=.3;a.onerror=t;a.play().then(()=>{if(loop)bgm=a}).catch(()=>{})};t()}
function bgmSync(){if(S.muted&&bgm)bgm.pause();else if(!bgm&&started)play('bgm',true);else if(bgm)bgm.play().catch(()=>{})}
// ---------- UI ----------
const ui=$('#ui'),hud=$('#hud'),cv=$('#c'),g=cv.getContext('2d');
let started=false,view='menu',shop=null,toastT;
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('on'),2200)};
const open=(h)=>{ui.innerHTML=`<div class=panel>${h}</div>`;ui.classList.add('on');ui.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>act[b.dataset.a](b.dataset.v))};
const close=()=>{ui.classList.remove('on');view='game'};
const btn=(a,l,v='',c='')=>`<button class="b ${c}" data-a="${a}" data-v="${v}">${l}</button>`;
function menu(){view='menu';open(`<h1>SHERU BHAI</h1><h2 class=gold style="margin:4px">BILLION TRILLION WORLD TOUR 🌍💸</h2><p>"LE LET KE MARA, BILLION TRILLION DOLLARS!"</p>${btn('play','▶ PLAY')}${btn('tour','🌍 WORLD TOUR')}${btn('coll','🛍️ SHOPPING COLLECTION')}${btn('ach','🏆 ACHIEVEMENTS')}${btn('set','⚙️ SETTINGS')}`)}
const act={
play(){started=true;close();bgmSync();play('shopping')},
menu,
tour(){open(`<h2>🌍 World Tour</h2><div class=grid>${C.map((c,i)=>{const ok=S.spent>=c.unlock||S.visited.includes(c.id);return`<div class=card><div class=e>${c.flag}</div><b>${c.name}</b><br><small>${ok?(i===S.country?'You are here':'Unlocked'):'Spend '+fmt(c.unlock)+' to unlock'}</small><br>${btn('go',ok?'✈ Travel':'🔒 Locked',i,ok?'':'dim')}</div>`}).join('')}</div>${btn(started?'close':'menu','Back')}`)},
go(i){i=+i;const c=C[i];if(S.spent<c.unlock&&!S.visited.includes(c.id))return toast('Locked! Spend '+fmt(c.unlock)+' total');S.country=i;if(!S.visited.includes(c.id))S.visited.push(c.id);P.x=120;P.y=400;play('shopping');check();save();toast(`✈ Welcome to ${c.name} ${c.flag}`);started?close():act.play()},
close,
coll(){const all=C.flatMap(c=>c.shops.flatMap(s=>s.items)),own=all.filter(i=>S.owned[i.id]);open(`<h2>🛍️ Collection (${own.length}/${all.length})</h2><p>Total spent <b class=gold>${fmt(S.spent)}</b> · Purchases ${S.buys}</p><div class=grid>${own.map(i=>`<div class=card><span class=e>${i.e}</span> <b>${i.n}</b> ×${S.owned[i.id]}</div>`).join('')||'<p>Nothing yet. Go shop!</p>'}</div>${btn(started?'close':'menu','Back')}`)},
ach(){open(`<h2>🏆 Achievements</h2><div class=grid>${ACH.map(a=>`<div class=card style="opacity:${S.ach.includes(a[0])?1:.4}"><span class=e>${a[2]}</span> <b>${a[1]}</b></div>`).join('')}</div>${btn(started?'close':'menu','Back')}`)},
set(){open(`<h2>⚙️ Settings</h2>${btn('mute',S.muted?'🔇 Sound OFF':'🔊 Sound ON')}${btn('reset','🗑 Reset Save')}<br>${btn(started?'close':'menu','Back')}`)},
mute(){S.muted=!S.muted;save();bgmSync();act.set()},
reset(){if(confirm('Delete all progress?')){S=def();save();location.reload()}},
buy(id){const it=shop.items.find(i=>i.id===id);if(S.money<it.p)return toast('Not enough money! Use Trillion Bank 🏦');
 S.money-=it.p;S.spent+=it.p;S.buys++;S.owned[id]=(S.owned[id]||0)+1;const cid=C[S.country].id;S.cnt[cid]=(S.cnt[cid]||0)+1;
 play('purchase');if(it.p>=M(100))setTimeout(()=>play('billion'),1300);
 happy=1.6;const big=it.p>=M(200);boom(big?60:25);if(big){zoom=1;play('victory')}
 toast(`${it.e} ${it.n}! `+(it.p>=M(50)?'BILLION TRILLION DOLLARS!':QUOTES[Math.random()*QUOTES.length|0]));
 if(S.cnt[cid]>=3&&!S.done.includes(cid)){S.done.push(cid);S.money+=M(25);setTimeout(()=>toast('🏆 Mission complete! +$25M bonus'),2300)}
 check();save();act.shop(shop)},
bank(){S.money+=M(500);save();toast('🏦 Trillion Bank wired $500M!');act.shop(shop)},
shop(s){shop=s;view='shop';open(`<h2>${s.e} ${s.n}</h2><p class=gold>Balance ${fmt(S.money)}</p><div class=grid>${s.items.map(i=>`<div class=card><span class=e>${i.e}</span> <b>${i.n}</b><br>${fmt(i.p)} ${S.owned[i.id]?'(owned '+S.owned[i.id]+')':''}<br>${btn('buy','BUY',i.id)}</div>`).join('')}</div>${btn('bank','🏦 Trillion Bank +$500M')}${btn('close','Leave')}`)}
};
function check(){ACH.forEach(a=>{if(!S.ach.includes(a[0])&&a[3](S)){S.ach.push(a[0]);toast(`🏆 ${a[1]}!`);play('victory')}})}
function drawHud(){const c=C[S.country],m=c.shops.length&&S.cnt[c.id]||0;hud.innerHTML=`<div class=pill>${c.flag} ${c.name}</div><div class="pill gold">💰 ${fmt(S.money)}</div><div class=pill>🎯 Buy 3 items: ${Math.min(m,3)}/3${S.done.includes(c.id)?' ✅':''}</div><div class=pill>🎒 ${Object.keys(S.owned).length}</div><button class=b style="padding:6px 12px" onclick="document.dispatchEvent(new CustomEvent('hb',{detail:'tour'}))">🗺️</button><button class=b style="padding:6px 12px" onclick="document.dispatchEvent(new CustomEvent('hb',{detail:'coll'}))">🎒</button><button class=b style="padding:6px 12px" onclick="document.dispatchEvent(new CustomEvent('hb',{detail:'set'}))">⚙️</button>`}
document.addEventListener('hb',e=>{view='menu2';act[e.detail]()});
// ---------- INPUT ----------
const keys={};let jx=0,jy=0;
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key.toLowerCase()==='e')interact();if(e.key==='Escape')started&&(ui.classList.contains('on')?close():act.set())});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
const joy=$('#joy'),knob=joy.firstElementChild;
if('ontouchstart' in window||navigator.maxTouchPoints>0)document.body.classList.add('touch');
function jm(e){const t=e.touches?e.touches[0]:e,r=joy.getBoundingClientRect();let dx=(t.clientX-r.left-60)/50,dy=(t.clientY-r.top-60)/50,l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}jx=dx;jy=dy;knob.style.transform=`translate(${dx*35}px,${dy*35}px)`;e.preventDefault()}
joy.addEventListener('touchstart',jm,{passive:false});joy.addEventListener('touchmove',jm,{passive:false});joy.addEventListener('touchend',()=>{jx=jy=0;knob.style.transform=''});
$('#act').addEventListener('touchstart',e=>{e.preventDefault();interact()},{passive:false});$('#act').onclick=()=>interact();

// ---------- CHARACTERS (drawn in code, animated) ----------
let happy=0;
function rr(x,y,w,h,r,c){g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
function person(o,t,gf){const m=o.m,sw=m?Math.sin(t/90):Math.sin(t/500)*.15,bob=m?Math.abs(Math.sin(t/90))*3:Math.sin(t/400)*1.5,hp=happy>0;
 g.save();g.translate(o.x,o.y-bob);g.scale(o.f,1);g.fillStyle='#0005';g.beginPath();g.ellipse(0,bob+2,26,8,0,0,7);g.fill();
 const skin=gf?'#f0b48a':'#c98a5b';
 // legs
 g.lineCap='round';g.lineWidth=9;g.strokeStyle=gf?skin:'#1a1a2e';
 for(const d of[-1,1]){g.beginPath();g.moveTo(d*7,-30);g.lineTo(d*7+sw*d*12,-4);g.stroke();rr(d*7+sw*d*12-7,-8,16,8,4,gf?'#e0203f':'#f5f5f5')}
 // body
 if(gf){g.fillStyle='#ff3d8b';g.beginPath();g.moveTo(-14,-78);g.quadraticCurveTo(-22,-52,-30,-32);g.lineTo(30,-32);g.quadraticCurveTo(22,-52,14,-78);g.closePath();g.fill();rr(-15,-80,30,16,6,'#ff7ab3');rr(-16,-58,32,5,2,'#ffd75e')}
 else{rr(-20,-84,40,56,10,'#5b2a9e');g.fillStyle='#fff';g.beginPath();g.moveTo(-6,-84);g.lineTo(0,-62);g.lineTo(6,-84);g.fill();rr(-20,-48,40,4,2,'#f5b301');g.strokeStyle='#ffd75e';g.lineWidth=3;g.beginPath();g.arc(0,-82,9,.2,Math.PI-.2);g.stroke();g.fillStyle='#ffd75e';g.beginPath();g.arc(0,-72,4,0,7);g.fill()}
 // arms
 g.lineWidth=8;g.strokeStyle=gf?skin:'#5b2a9e';
 for(const d of[-1,1]){const a=hp?-2.3:(m?sw*d*.9:0)+.2;g.beginPath();g.moveTo(d*16,-76);g.lineTo(d*16+Math.sin(a)*d*26*(hp?-1:1)*(hp?.6:1)+(hp?d*8:0),-76+(hp?-26:Math.cos(a)*26));g.stroke();
  if(d===1&&gf&&!hp)rr(20,-60,16,14,4,'#7b2fff');if(d===1&&!gf&&hp){g.fillStyle='#2a8f4a';g.font='22px serif';g.fillText('💵',28,-100)}}
 // head
 g.fillStyle=skin;g.beginPath();g.arc(0,-98,18,0,7);g.fill();
 g.fillStyle='#120a1a';
 if(gf){g.beginPath();g.arc(0,-102,19,Math.PI,0);g.fill();rr(-21,-104,8,40,6,'#120a1a');rr(13,-104,8,36,6,'#120a1a');g.fillStyle='#ff3d8b';g.beginPath();g.arc(12,-114,6,0,7);g.fill()}
 else{g.beginPath();g.arc(0,-104,18,Math.PI*1.02,-.02);g.fill()}
 // face
 rr(-15,-103,30,10,4,'#111');rr(-14,-102,12,7,3,gf?'#ff9bd0':'#3a3a55');rr(2,-102,12,7,3,gf?'#ff9bd0':'#3a3a55');
 if(!gf)rr(-8,-88,16,3,2,'#120a1a');
 g.strokeStyle='#7a1010';g.lineWidth=3;g.beginPath();g.arc(0,-92,hp?7:5,.1,Math.PI-.1);g.stroke();if(hp){g.fillStyle='#fff';g.beginPath();g.arc(0,-91,6,.1,Math.PI-.1);g.fill()}
 g.restore()}
// ---------- WORLD ----------
const P={x:120,y:400,f:1},G={x:80,y:420};let parts=[],zoom=0,t0=0,near=null;
function interact(){if(!started||ui.classList.contains('on')||!near)return;act.shop(near)}
function boom(n){for(let i=0;i<n;i++)parts.push({x:P.x,y:P.y-30,vx:(Math.random()-.5)*10,vy:-Math.random()*10-2,e:['💸','💎','🎉','💰','✨'][Math.random()*5|0],l:60})}
function sky(c){const gr=g.createLinearGradient(0,0,0,540);gr.addColorStop(0,c.bg[0]);gr.addColorStop(1,c.bg[1]);g.fillStyle=gr;g.fillRect(0,0,960,540);
 let s=c.id.length*7;for(let i=0;i<14;i++){s=(s*9301+49297)%233280;const w=40+s%50,h=60+(s>>3)%140;g.fillStyle='#0004';g.fillRect(i*72,300-h,w,h)}
 g.font='150px serif';g.textAlign='center';g.fillText(c.lm,480,230);
 g.fillStyle='#2a1f3acc';g.fillRect(0,300,960,240);g.fillStyle='#f5b30055';g.fillRect(0,300,960,4)}
function frame(t){requestAnimationFrame(frame);const dt=Math.min(.05,(t-t0)/1000||0);t0=t;const c=C[S.country];
 if(started&&!ui.classList.contains('on')){let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+jx,dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0)+jy,l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}P.x=Math.max(30,Math.min(930,P.x+dx*260*dt));P.y=Math.max(330,Math.min(500,P.y+dy*260*dt));if(dx)P.f=dx>0?1:-1;P.m=Math.hypot(dx,dy)>.1}
 G.x+=(P.x-70*P.f-G.x)*.08;G.y+=(P.y+8-G.y)*.08;
 g.save();if(zoom>0){const z=1+zoom*.12;g.translate(480,270);g.scale(z,z);g.translate(-480,-270);g.translate((Math.random()-.5)*zoom*8,0);zoom=Math.max(0,zoom-dt*1.5)}
 sky(c);near=null;g.textAlign='center';
 c.shops.forEach(s=>{const d=Math.hypot(P.x-s.x,P.y-s.y-90);const isN=d<150;if(isN)near=s;g.fillStyle=isN?'#f5b301':'#fff';g.strokeStyle='#000';g.lineWidth=3;g.beginPath();g.roundRect(s.x-100,s.y-120,200,120,16);g.fill();g.stroke();g.font='54px serif';g.fillStyle='#000';g.fillText(s.e,s.x,s.y-50);g.font='bold 16px sans-serif';g.fillText(s.n,s.x,s.y-15);if(isN){g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText(`Press E / tap E to shop`,s.x,s.y-135)}});
 const sprite=(e,o,sz)=>{g.font=sz+'px serif';g.fillStyle='#0005';g.beginPath();g.ellipse(o.x,o.y+4,24,8,0,0,7);g.fill();g.save();g.translate(o.x,o.y-Math.abs(Math.sin(t/120))*4*(Math.hypot(P.x-o.x,P.y-o.y)>8));g.scale(o.f||1,1);g.fillStyle='#fff';g.fillText(e,0,-6);g.restore()};
 G.m=Math.hypot(P.x-G.x,P.y-G.y)>40;G.f=P.f;happy=Math.max(0,happy-dt);person(G,t,true);person(P,t,false);
 parts=parts.filter(p=>p.l>0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.l--;g.font='28px serif';g.fillText(p.e,p.x,p.y)});
 g.restore();$('#act').style.opacity=near?1:.5}
setInterval(()=>{if(started)drawHud()},500);
let gfT=setInterval(()=>{if(started&&!ui.classList.contains('on')&&Math.random()<.3)toast('💃 '+GF[Math.random()*GF.length|0])},12000);
if('serviceWorker' in navigator&&import.meta.env.PROD)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));
addEventListener('pointerdown',()=>{if(started&&!bgm)bgmSync()},{once:true});
drawHud();menu();requestAnimationFrame(frame);
