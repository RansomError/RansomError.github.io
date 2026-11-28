/* Handy Labs 2.0 — interface effects: mobile menu, ticker repeat (Magic UI Marquee pattern), pointer spotlight and tilt on plates,
   cursor glow, button ripple, playing state, headline decode, language/theme transitions, glass toast.
   The motion stylesheet is loaded here, and only when the visitor has not asked for reduced motion. Content never depends on this file. */
(()=>{try{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(!calm){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/css/motion.css';document.head.append(l)}
const mb=$('#mb'),sh=$('#sheet'),set=o=>{o?sh.setAttribute('data-open',''):sh.removeAttribute('data-open');mb.setAttribute('aria-expanded',o);H.classList.toggle('nav-open',o)};
mb.onclick=()=>set(!sh.hasAttribute('data-open'));
sh.addEventListener('click',e=>{if(e.target.closest('#nav a'))set(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&sh.hasAttribute('data-open')){set(false);mb.focus()}});
matchMedia('(min-width:900px)').addEventListener('change',e=>{if(e.matches)set(false)});
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
