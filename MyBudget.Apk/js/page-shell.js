(()=>{'use strict';
if(document.getElementById('mybudgetSharedHeader'))return;
const root='../../',menuItems=[
['Beranda','../../index.html'],
['Setting','../setting/index.html'],
['About','../about/index.html']
];
const style=document.createElement('style');style.id='mybudgetSharedShellStyle';style.textContent=`
#mybudgetSharedHeader{height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 max(16px,calc((100vw - 680px)/2 + 16px));background:#fff;border-bottom:1px solid #e7ebf2;position:sticky;top:0;z-index:1000;box-shadow:0 2px 10px rgba(24,39,75,.03);font-family:Inter,system-ui,-apple-system,sans-serif}
#mybudgetSharedHeader .mb-brand{display:flex;align-items:center;gap:9px;color:#172033;font-size:18px;font-weight:800;text-decoration:none}
#mybudgetSharedHeader .mb-logo{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#eaf0ff;color:#315efb}
#mybudgetSharedHeader .mb-menu-btn{width:42px;height:42px;border:1px solid #e7ebf2;border-radius:12px;background:#fff;color:#172033;display:grid;place-items:center;font-size:0}
#mybudgetSharedHeader .mb-menu-btn svg{width:24px;height:24px}
#mybudgetSharedMenu{display:none;position:fixed;right:max(12px,calc((100vw - 680px)/2 + 12px));top:76px;width:min(250px,calc(100vw - 24px));z-index:1001;background:#fff;border:1px solid #e7ebf2;border-radius:14px;padding:7px;box-shadow:0 12px 35px #17203322;font-family:Inter,system-ui,-apple-system,sans-serif}
#mybudgetSharedMenu.open{display:block}#mybudgetSharedMenu a{display:flex;align-items:center;gap:11px;padding:12px;border-radius:9px;color:#172033;text-decoration:none;font-size:14px;font-weight:600}#mybudgetSharedMenu a:hover{background:#f5f7fb}#mybudgetSharedMenu a svg{width:22px;height:22px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;color:#315efb}
body{padding-top:0!important}
`;document.head.appendChild(style);
const header=document.createElement('header');header.id='mybudgetSharedHeader';header.innerHTML='<a class="mb-brand" href="../../index.html" aria-label="Beranda MyBudget"><span class="mb-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17 17 4M7 4h10v10"/></svg></span><span>MyBudget</span></a><button class="mb-menu-btn" id="mybudgetSharedMenuBtn" aria-label="Buka menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>';
const menu=document.createElement('nav');menu.id='mybudgetSharedMenu';menu.setAttribute('aria-label','Menu utama MyBudget');const menuIcons={Beranda:'<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>',Setting:'<circle cx="12" cy="12" r="3"/><path d="M19 13.5 21 15l-2 4-2-1a8 8 0 0 1-2 1l-.5 2h-4L10 19a8 8 0 0 1-2-1l-2 1-2-4 2-1v-2l-2-1 2-4 2 1a8 8 0 0 1 2-1l.5-2h4L15 7a8 8 0 0 1 2 1l2-1 2 4-2 1z"/>',About:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'};menu.innerHTML=menuItems.map(([label,url])=>'<a href="'+url+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+menuIcons[label]+'</svg><span>'+label+'</span></a>').join('');
document.body.insertBefore(menu,document.body.firstChild);document.body.insertBefore(header,document.body.firstChild);
const btn=document.getElementById('mybudgetSharedMenuBtn');btn.addEventListener('click',()=>{const open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))});document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!btn.contains(e.target)){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
})();