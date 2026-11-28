/* Handy Labs 2.0 — interface layer: mobile menu, custom language/theme pickers, ticker repeat (Magic UI Marquee pattern),
   pointer spotlight and tilt on plates, cursor glow, button ripple, playing state, headline decode, language/theme transitions, glass toast.
   The motion stylesheet is loaded here, and only when the visitor has not asked for reduced motion. Content never depends on this file;
   the native <select> elements stay in the page as the source of truth and as the no-script fallback. */
(()=>{try{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(!calm){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/css/motion.css';document.head.append(l)}
const mb=$('#mb'),sh=$('#sheet'),set=o=>{o?sh.setAttribute('data-open',''):sh.removeAttribute('data-open');mb.setAttribute('aria-expanded',o);H.classList.toggle('nav-open',o)};
mb.onclick=()=>set(!sh.hasAttribute('data-open'));
sh.addEventListener('click',e=>{if(e.target.closest('#nav a'))set(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&sh.hasAttribute('data-open')){set(false);mb.focus()}});
matchMedia('(min-width:900px)').addEventListener('change',e=>{if(e.matches)set(false)});
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const dd=sel=>{
const w=document.createElement('div'),b=document.createElement('button'),p=document.createElement('div'),l=document.createElement('ul');let inp=null;
w.className='dd';b.type='button';b.className='dd-b';b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');p.className='dd-p';p.hidden=true;l.className='dd-l';l.setAttribute('role','listbox');
const lab=()=>{const o=sel.selectedOptions[0],t=o?o.textContent:H.lang.toUpperCase(),a=sel.getAttribute('aria-label')||'';b.textContent=t;b.setAttribute('aria-label',a?a+': '+t:t)};
const items=()=>[...l.children];
const draw=f=>{l.replaceChildren();[...sel.options].filter(o=>!f||norm(o.textContent).includes(f)).forEach(o=>{const li=document.createElement('li');li.setAttribute('role','option');li.tabIndex=-1;li.dataset.v=o.value;li.textContent=o.textContent;if(o.value===sel.value)li.setAttribute('aria-selected','true');l.append(li)})};
const close=back=>{if(p.hidden)return;p.hidden=true;b.setAttribute('aria-expanded','false');if(back)b.focus()};
const open=()=>{draw('');if(sel.options.length>=8){if(!inp){inp=document.createElement('input');inp.type='search';inp.setAttribute('aria-label',sel.getAttribute('aria-label')||'');inp.placeholder=sel.getAttribute('aria-label')||'';inp.oninput=()=>draw(norm(inp.value));p.prepend(inp)}inp.value=''}
p.hidden=false;b.setAttribute('aria-expanded','true');const r=b.getBoundingClientRect(),room=innerHeight-r.bottom;p.classList.toggle('up',room<300&&r.top>room);(fine&&inp||items().find(x=>x.getAttribute('aria-selected'))||items()[0]).focus()};
const choose=v=>{sel.value=v;sel.dispatchEvent(new Event('change',{bubbles:true}));lab();close(true)};
b.onclick=()=>p.hidden?open():close();
b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open()}});
l.addEventListener('click',e=>{const li=e.target.closest('li');if(li)choose(li.dataset.v)});
w.addEventListener('keydown',e=>{if(p.hidden)return;const it=items(),i=it.indexOf(document.activeElement),k=e.key;
if(k==='Escape'){e.stopPropagation();close(true)}
else if(k==='ArrowDown'){e.preventDefault();(it[i+1]||it[0])?.focus()}
else if(k==='ArrowUp'){e.preventDefault();(it[i-1]||it[it.length-1])?.focus()}
else if(k==='Home'&&i>=0){e.preventDefault();it[0].focus()}
else if(k==='End'&&i>=0){e.preventDefault();it[it.length-1].focus()}
else if((k==='Enter'||k===' ')&&i>=0){e.preventDefault();choose(it[i].dataset.v)}
else if(k==='Tab')close()});
document.addEventListener('pointerdown',e=>{if(!w.contains(e.target))close()});
p.append(l);w.append(b,p);sel.before(w);sel.hidden=true;lab();
new MutationObserver(lab).observe(sel,{childList:true,subtree:true,characterData:true});new MutationObserver(lab).observe(H,{attributes:true,attributeFilter:['lang','data-theme']})};
['#lang','#theme'].forEach(s=>{try{const e=$(s);if(e)dd(e)}catch(x){}});
const tk=$('.tick>div');if(tk)for(let i=0;i<3;i++)tk.parentNode.append(tk.cloneNode(true));
$$('.plate').forEach(e=>{
e.addEventListener('pointermove',v=>{const r=e.getBoundingClientRect(),x=v.clientX-r.left,y=v.clientY-r.top;e.style.setProperty('--mx',x+'px');e.style.setProperty('--my',y+'px');if(!calm&&fine){e.style.setProperty('--ry',((x/r.width-.5)*10).toFixed(2)+'deg');e.style.setProperty('--rx',((.5-y/r.height)*8).toFixed(2)+'deg')}});
e.addEventListener('pointerleave',()=>{e.style.setProperty('--rx','0deg');e.style.setProperty('--ry','0deg')})});
if(!calm&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});$$('.rv').forEach(e=>io.observe(e))}else $$('.rv').forEach(e=>e.classList.add('in'));
const m=$('#msg');if(m){let tm;new MutationObserver(()=>{if(!m.textContent)return;m.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>m.classList.remove('on'),3800)}).observe(m,{childList:true,characterData:true,subtree:true})}
if(!calm){
if(fine){let f;addEventListener('pointermove',v=>{if(f)return;f=requestAnimationFrame(()=>{f=0;H.style.setProperty('--cx',v.clientX+'px');H.style.setProperty('--cy',v.clientY+'px')})},{passive:true})}
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*.6,p=document.createElement('span');p.className='rip';p.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.append(p);setTimeout(()=>p.remove(),700)});
const dec=h=>{if(!h)return;const t=h.textContent,p=[...t.replace(/\s/g,'')],n=t.length,L0=H.lang,t0=performance.now();if(!p.length)return;
(function f(now){if(H.lang!==L0)return;const k=Math.min(1,(now-t0)/650),c=Math.floor(k*n);h.textContent=[...t].map((ch,i)=>i<c||/\s/.test(ch)?ch:p[Math.random()*p.length|0]).join('');if(k<1)requestAnimationFrame(f);else h.textContent=t})(t0)};
new MutationObserver(ms=>ms.forEach(x=>{if(!x.target.hidden)dec($('h1',x.target))})).observe($('main'),{attributes:true,subtree:true,attributeFilter:['hidden']});
setTimeout(()=>dec($('[data-panel]:not([hidden]) h1')),500);
const lg=$('#lang'),th=$('#theme'),mn=$('main');
if(lg)lg.addEventListener('change',()=>{mn.classList.remove('sw');void mn.offsetWidth;mn.classList.add('sw');setTimeout(()=>mn.classList.remove('sw'),500)});
if(th)th.addEventListener('change',()=>{H.classList.add('tt');setTimeout(()=>H.classList.remove('tt'),800)})}
const au=$('#au'),pl=$('.pl');if(au&&pl){const s=()=>pl.toggleAttribute('data-playing',!au.paused&&!au.ended);['play','pause','ended','emptied'].forEach(n=>au.addEventListener(n,s))}
}catch(e){}})();
