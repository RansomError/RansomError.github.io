/* Handy Labs 2.0 — interface effects: mobile menu, ticker repeat (Magic UI Marquee pattern), pointer spotlight (Magic Card pattern),
   reveal on scroll, glass toast for player messages. Content never depends on this file. */
(()=>{try{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const mb=$('#mb'),sh=$('#sheet'),set=o=>{o?sh.setAttribute('data-open',''):sh.removeAttribute('data-open');mb.setAttribute('aria-expanded',o);H.classList.toggle('nav-open',o)};
mb.onclick=()=>set(!sh.hasAttribute('data-open'));
sh.addEventListener('click',e=>{if(e.target.closest('#nav a'))set(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&sh.hasAttribute('data-open')){set(false);mb.focus()}});
matchMedia('(min-width:900px)').addEventListener('change',e=>{if(e.matches)set(false)});
const tk=$('.tick>div');if(tk)for(let i=0;i<3;i++)tk.parentNode.append(tk.cloneNode(true));
$$('.plate').forEach(e=>e.addEventListener('pointermove',v=>{const r=e.getBoundingClientRect();e.style.setProperty('--mx',v.clientX-r.left+'px');e.style.setProperty('--my',v.clientY-r.top+'px')}));
if(!calm&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});$$('.rv').forEach(e=>io.observe(e))}else $$('.rv').forEach(e=>e.classList.add('in'));
const m=$('#msg');if(m){let tm;new MutationObserver(()=>{if(!m.textContent)return;m.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>m.classList.remove('on'),3800)}).observe(m,{childList:true,characterData:true,subtree:true})}
}catch(e){}})();
