/* Handy Labs 2.0 — app logic: routing (?project=), locale engine, theme, Glasswave browser demo, Vortex gate.
   Locales live in /locales/*.json and are listed in /locales/index.json (name + direction). English is the fallback. */
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],R=document.documentElement;
const st={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const P=['overview','glasswave','v8v','releases','vortex'],droid=/Android/i.test(navigator.userAgent);
const LOC={};let M={en:{n:'English',d:'ltr'},ru:{n:'Русский',d:'ltr'}},L='en',proj='overview';
const load=async c=>{if(LOC[c])return LOC[c];try{const r=await fetch('/locales/'+c+'.json');if(!r.ok)throw 0;return LOC[c]=await r.json()}catch(e){return null}};
const get=(o,k)=>k.split('.').reduce((a,b)=>a==null?a:a[b],o);
const t=k=>get(LOC[L],k)??get(LOC.en,k)??'';
const fmt=n=>new Intl.NumberFormat(L).format(n);
const say=(k,n)=>{$('#msg').textContent=t(k).replace('{n}',fmt(n))};
const pl=n=>(get(LOC[L],'pl.tr.'+new Intl.PluralRules(L).select(n))??t('pl.tr.other')).replace('{n}',fmt(n));
const mm=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
const A=$('#au'),S={tr:[],i:-1,rep:true},cur=()=>S.tr[S.i];
const cv=$('#wv'),g=cv.getContext('2d'),NB=32,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;let ctx,an;
function paint(v){const w=cv.width,h=cv.height,bw=w/NB;g.clearRect(0,0,w,h);g.fillStyle=getComputedStyle(cv).color;for(let i=0;i<NB;i++){const x=v?v[i]/255:.12+.1*Math.sin(i*.6);const bh=Math.max(3,x*h);g.fillRect(i*bw+2,h-bh,bw-4,bh)}}
function viz(){if(ctx){ctx.state==='suspended'&&ctx.resume();return}if(calm||!window.AudioContext)return;try{ctx=new AudioContext();const s=ctx.createMediaElementSource(A);an=ctx.createAnalyser();an.fftSize=128;s.connect(an);an.connect(ctx.destination);const d=new Uint8Array(an.frequencyBinCount);(function f(){requestAnimationFrame(f);an.getByteFrequencyData(d);paint(A.paused?null:d)})()}catch(e){ctx=null}}
function list(){const b=$('#tl');b.replaceChildren();$('#cnt').textContent=pl(S.tr.length);if(!S.tr.length){const p=document.createElement('p');p.className='tm';p.textContent=t('pl.empty');b.append(p);return}
S.tr.forEach((x,i)=>{const e=document.createElement('button');e.type='button';e.className='trk';if(i===S.i)e.setAttribute('aria-current','true');const a=document.createElement('span'),s=document.createElement('small');a.textContent=x.title;s.textContent=x.artist||t('pl.unk');e.append(a,s);e.onclick=()=>play(i);b.append(e)})}
function now(){const x=cur();$('#nt').textContent=x?x.title:t('pl.none');$('#na').textContent=x?(x.artist||t('pl.unk')):''}
function pb(){const p=!A.paused,b=$('#pp');b.textContent=p?'❚❚':'▶';b.setAttribute('aria-label',t(p?'pl.pause':'pl.play'))}
function rp(){const b=$('#rp');b.textContent='↻ '+t(S.rep?'pl.rep':'pl.repoff');b.setAttribute('aria-pressed',S.rep)}
async function play(i){if(!S.tr.length)return say('pl.need');S.i=(i+S.tr.length)%S.tr.length;A.src=cur().url;list();now();viz();try{await A.play()}catch(e){say('pl.err')}}
function add(fs){const a=[...fs].filter(f=>f.type.startsWith('audio/')||/\.(mp3|wav|flac|ogg|m4a|aac|opus|wma|aiff?)$/i.test(f.name));if(!a.length)return say('pl.bad');
a.forEach(f=>{const s=f.name.replace(/\.[^.]+$/,'').replace(/_/g,' ').trim(),m=s.match(/^(.{1,70}?)\s+-\s+(.{1,120})$/);S.tr.push({url:URL.createObjectURL(f),title:m?m[2]:s||f.name,artist:m?m[1]:''})});say('pl.added',a.length);list();if(S.i<0)play(0)}
function meta(){const s=get(LOC[L],'seo.'+proj)||get(LOC.en,'seo.'+proj);if(!s)return;document.title=s[0];const u='https://handylab.ru/'+(proj==='overview'?'':'?project='+proj);
[['meta[name=description]',s[1]],['meta[property="og:title"]',s[0]],['meta[property="og:description"]',s[1]],['meta[name="twitter:title"]',s[0]],['meta[name="twitter:description"]',s[1]],['meta[property="og:url"]',u]].forEach(([q,v])=>{const e=$(q);e&&e.setAttribute('content',v)});$('link[rel=canonical]').href=u}
function show(p,push){if(!P.includes(p))p='overview';proj=p;$$('[data-panel]').forEach(s=>s.hidden=s.id!==p);$$('#nav a').forEach(a=>a.dataset.p===p?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
if(push){history.pushState(null,'',p==='overview'?location.pathname:location.pathname+'?project='+p);scrollTo(0,0)}meta()}
async function setLang(c){if(!M[c])c='en';if(!(await load(c)))c='en';L=c;R.lang=c;R.dir=M[c].d||'ltr';
$$('[data-t]').forEach(e=>{const v=t(e.dataset.t);if(v)e.textContent=v});$$('[data-al]').forEach(e=>{const v=t(e.dataset.al);if(v)e.setAttribute('aria-label',v)});
$('#pv').setAttribute('aria-label',t('pl.prev'));$('#lang').value=c;$('#shop').hidden=c!=='ru';const ok=c==='ru'&&droid;$('#vxc').hidden=!ok;$('#vxe').hidden=ok;rp();pb();now();list();meta()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go],#nav a');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;e.preventDefault();show(a.dataset.go||a.dataset.p,true)});
addEventListener('popstate',()=>show(new URLSearchParams(location.search).get('project'),false));
$('#pick').onclick=()=>$('#file').click();$('#file').onchange=e=>{add(e.target.files);e.target.value=''};
const dz=$('#dz');['dragenter','dragover'].forEach(n=>dz.addEventListener(n,e=>{e.preventDefault();dz.classList.add('on')}));['dragleave','drop'].forEach(n=>dz.addEventListener(n,e=>{e.preventDefault();dz.classList.remove('on')}));dz.addEventListener('drop',e=>add(e.dataTransfer.files));
$('#pp').onclick=()=>{if(S.i<0)return play(0);A.paused?A.play().catch(()=>say('pl.err')):A.pause()};
$('#pv').onclick=()=>{if(!S.tr.length)return say('pl.need');if(A.currentTime>3)A.currentTime=0;else play(S.i-1)};
$('#nx').onclick=()=>S.tr.length?play(S.i+1):say('pl.need');$('#rp').onclick=()=>{S.rep=!S.rep;rp()};$('#vol').oninput=e=>{A.volume=e.target.value/100};
const sk=$('#sk');let seeking=0;sk.oninput=()=>{seeking=1;isFinite(A.duration)&&($('#t1').textContent=mm(A.duration*sk.value/1000))};sk.onchange=()=>{if(isFinite(A.duration))A.currentTime=A.duration*sk.value/1000;seeking=0};
A.volume=.75;A.onplay=A.onpause=pb;A.onloadedmetadata=()=>{$('#t2').textContent=mm(A.duration)};
A.ontimeupdate=()=>{if(!seeking&&A.duration)sk.value=Math.round(A.currentTime/A.duration*1000);$('#t1').textContent=mm(A.currentTime)};
A.onended=()=>{if(S.i<S.tr.length-1)play(S.i+1);else if(S.rep)play(0)};A.onerror=()=>{if(S.i>=0)say('pl.err')};
addEventListener('pagehide',()=>S.tr.forEach(x=>URL.revokeObjectURL(x.url)));paint(null);
const th=$('#theme');th.value=R.dataset.theme;th.onchange=()=>{R.dataset.theme=th.value;st.s('handylabs-theme',th.value)};
(async()=>{
try{const r=await fetch('/locales/index.json');if(r.ok)M=await r.json()}catch(e){}
await load('en');const sel=$('#lang');Object.keys(M).forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=M[c].n;sel.append(o)});
sel.onchange=()=>{st.s('handylabs-lang',sel.value);setLang(sel.value)};
const q=new URLSearchParams(location.search).get('project');proj=P.includes(q)?q:'overview';
const sv=st.g('handylabs-lang'),nl=(navigator.languages||[navigator.language]).map(l=>(l||'').slice(0,2).toLowerCase());
await setLang(M[sv]?sv:nl.find(c=>M[c])||'en');show(proj,false);
})();
})();
