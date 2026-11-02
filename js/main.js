(function(){
/* ======================= EDIT THESE ======================= */
var WHATSAPP = '23057534025';            // your WhatsApp number: country code + number, digits only
var WHATSAPP_DISPLAY = '+230 5753 4025'; // how the number shows on the page
var EMAIL = 'buildyourdreamwebsitedotcom@gmail.com';
var TIERS = [
  {id:'low',  name:'Low',  web:10000, be:15000, days:7,  lvl:1, for:'A clean site to get your business online.',
   feats:['1–3 pages, mobile-first','WhatsApp, call & contact form','Google Map & SEO basics','1 round of changes'], beNote:'Edit your own text & photos'},
  {id:'mid',  name:'Mid',  web:27000, be:35000, days:14, lvl:2, for:'A full custom site for growing businesses.',
   feats:['Up to 6 custom pages','Scroll animations','Gallery, services & reviews','Google Business set-up'], beNote:'Content editor + bookings'},
  {id:'high', name:'High', web:45000, be:52000, days:25, lvl:3, hot:true, badge:'Most popular', for:'Bespoke, animated, unforgettable.',
   feats:['Up to 10 bespoke pages','Loader & page transitions','Scroll scenes & effects','English + French'], beNote:'Logins, bookings & payments'},
  {id:'ultra',name:'Ultra',web:72000, be:79000, days:38, lvl:4, ultra:true, badge:'Flagship', for:'An app-like flagship experience.',
   feats:['Unlimited pages','Custom interactive features','Bespoke art direction','Priority support'], beNote:'Full admin panel & analytics'}
];
var EXTRAS = [ // optional add-ons in the estimator — change or remove freely
  {id:'logo', n:'Logo design', p:3500, d:2},
  {id:'copy', n:'Copywriting', p:4000, d:2},
  {id:'photo',n:'Stock photo pack', p:2000, d:1},
  {id:'rush', n:'Rush delivery', pct:.2}
];
/* ========================================================== */

var IMG = {conneqt:'assets/img/work/conneqt.webp',niadelta:'assets/img/work/niadelta.webp',tuition:'assets/img/work/tuition-centre.webp',saree:'assets/img/work/saree-shop.webp',store:'assets/img/templates/electronics-store.webp'};
var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var html=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(pointer:fine)').matches;
var G=window.gsap, ST=window.ScrollTrigger, FX=!!(G&&ST&&!reduce);
if(FX){html.classList.add('fx');G.registerPlugin(ST);ST.config({ignoreMobileResize:true})}
$('#yr').textContent=new Date().getFullYear();
/* project images: no right-click save / drag-out (a deterrent, not a lock) */
(function(){var sel='img,.shot,.win,.hcard__img,.tpl__view,.zoom__frame,.lap,.ph-dev,.svc__img';
  ['contextmenu','dragstart'].forEach(function(ev){document.addEventListener(ev,function(e){if(e.target.closest&&e.target.closest(sel))e.preventDefault()})})})();
function fmt(n){return Math.round(n).toLocaleString('en-US')}
function wa(t){return 'https://wa.me/'+WHATSAPP+(t?'?text='+encodeURIComponent(t):'')}
$('#waText').textContent=WHATSAPP_DISPLAY;
$('#waLink').href=wa('Hi! I found WebLuxe online and I’d like a website.');
$('#waFloat').href=$('#ftrWa').href=wa('Hi! I’m interested in a website.');
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show')},2400)}
function copy(text){function fb(){var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('Copied to clipboard')}catch(e){toast('Select the text and copy it manually')}ta.remove()}
  try{navigator.clipboard.writeText(text).then(function(){toast('Copied to clipboard')},fb)}catch(e){fb()}}

/* ---------- split text ---------- */
function splitEl(el){
  var walk=function(node){
    Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType===3){
        var parts=n.textContent.split(/(\s+)/), frag=document.createDocumentFragment();
        parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(p));return}
          var w=document.createElement('span');w.className='w';var i=document.createElement('span');i.className='wi';i.textContent=p;w.appendChild(i);frag.appendChild(w)});
        n.parentNode.replaceChild(frag,n);
      }else if(n.nodeType===1&&n.tagName!=='BR'&&!n.classList.contains('w')){
        if(n.classList.contains('ser')){var w=document.createElement('span');w.className='w';n.parentNode.insertBefore(w,n);var i=document.createElement('span');i.className='wi';w.appendChild(i);i.appendChild(n)}
        else walk(n);
      }
    });
  };
  walk(el);
}
$$('[data-split]').forEach(splitEl);
function charify(el){(function walk(n){Array.prototype.slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();Array.from(c.textContent).forEach(function(ch){if(/\s/.test(ch)){var sp0=document.createElement('span');sp0.className='sp';sp0.textContent=' ';f.appendChild(sp0);return}var sp=document.createElement('span');sp.className='ch';sp.textContent=ch;f.appendChild(sp)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(el)}
if(FX)$$('.hero h1 .wi, .ph h1 .wi').forEach(charify);
function wordsEl(el){(function walk(node){Array.prototype.slice.call(node.childNodes).forEach(function(n){if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return}var sp=document.createElement('span');sp.className='sw';sp.textContent=p;f.appendChild(sp)});n.parentNode.replaceChild(f,n)}else if(n.nodeType===1)walk(n)})})(el)}
if(FX)$$('[data-words]').forEach(wordsEl);

/* ---------- tiers render ---------- */
var mode='web';
function tierCard(t,light){
  var lv='';for(var i=1;i<=4;i++)lv+='<i class="'+(i<=t.lvl?'on':'')+'"></i>';
  return '<article data-tilt class="tier'+(t.hot?' tier--hot':'')+(t.ultra?' tier--ultra':'')+'" data-r data-t="'+t.id+'">'+(t.badge?'<span class="tier__badge">'+t.badge+'</span>':'')+
  '<div class="tier__lvl">'+lv+'</div><h3>'+t.name+' tier</h3><div class="tier__for">'+t.for+'</div>'+
  '<div class="tier__p"><small>Rs</small><span class="tp" data-web="'+t.web+'" data-be="'+t.be+'">'+fmt(t.web)+'</span></div>'+
  '<div class="tier__note">one-off · ready in ~'+(t.days<10?'1 week':Math.round(t.days/7)+' weeks')+'</div>'+
  '<div class="tier__be"><span>+ Backend &amp; admin</span><b>Rs '+fmt(t.be)+'</b></div>'+
  '<ul>'+t.feats.map(function(f){return '<li>'+f+'</li>'}).join('')+'</ul>'+
  '<a href="#contact" class="btn '+(t.hot?'btn--ink':(light?'btn--line-ink':'btn--ghost'))+'" data-plan="'+t.id+'">Choose '+t.name+'</a></article>';
}
$('#homeTiers').innerHTML=TIERS.map(function(t){return tierCard(t,false)}).join('');
$('#priceTiers').innerHTML=TIERS.map(function(t){return tierCard(t,false)}).join('');
TIERS.forEach(function(t){$$('[data-p="'+t.id+'"]').forEach(function(e){e.textContent='Rs '+fmt(t.web)+' · '+fmt(t.be)+' w/ backend'})});
$$('.tier').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--tx',(e.clientX-r.left)+'px');c.style.setProperty('--ty',(e.clientY-r.top)+'px')})});

/* pricing toggle */
var tog=$('#tog'), togI=$('i',tog);
function placeTog(){var b=$('button.on',tog);togI.style.left=b.offsetLeft+'px';togI.style.width=b.offsetWidth+'px'}
$$('button',tog).forEach(function(b){b.addEventListener('click',function(){
  $$('button',tog).forEach(function(x){x.classList.toggle('on',x===b)});placeTog();mode=b.dataset.mode;
  $$('#priceTiers .tp').forEach(function(s){var to=+s.dataset[mode],from=+s.textContent.replace(/,/g,'');
    if(FX){var o={v:from};G.to(o,{v:to,duration:.7,ease:'power3.out',onUpdate:function(){s.textContent=fmt(o.v)}})}else s.textContent=fmt(to)});
  var r=$('input[name=mode][value='+mode+']');if(r){r.checked=true;renderEst()}
})});

/* ---------- estimator ---------- */
$('#estTiers').innerHTML=TIERS.map(function(t,i){return '<label><input type="radio" name="tier" value="'+t.id+'"'+(i===0?' checked':'')+'><span><b>'+t.name+'</b><small>Rs '+fmt(t.web)+' / '+fmt(t.be)+'</small></span></label>'}).join('');
$('#estExtras').innerHTML=EXTRAS.map(function(x){return '<label><input type="checkbox" value="'+x.id+'"><span>'+x.n+' <em>'+(x.pct?'+'+Math.round(x.pct*100)+'%':'+'+fmt(x.p))+'</em></span></label>'}).join('');
var shown=10000, estForm=$('#estForm');
function calc(){
  var t=TIERS.filter(function(x){return x.id===$('input[name=tier]:checked',estForm).value})[0];
  var m=$('input[name=mode]:checked',estForm).value, total=t[m], days=t.days+(m==='be'?5:0);
  var lines=[[t.name+' tier — '+(m==='be'?'with backend & admin':'website only'),total]], pct=0;
  $$('#estExtras input:checked').forEach(function(c){var x=EXTRAS.filter(function(e){return e.id===c.value})[0];if(x.pct){pct=x.pct;return}total+=x.p;days+=x.d;lines.push([x.n,x.p])});
  if(pct){var r=total*pct;lines.push(['Rush delivery (+'+Math.round(pct*100)+'%)',r]);total+=r;days=Math.ceil(days*.6)}
  return {total:total,days:days,lines:lines};
}
function tText(d){return d<=8?'Ready in about 1 week':'Ready in about '+Math.round(d/7)+' weeks'}
function eText(r){return 'Hi! I used the WebLuxe price estimator:\n'+r.lines.map(function(l){return '• '+l[0]+' — Rs '+fmt(l[1])}).join('\n')+'\nEstimated total: Rs '+fmt(r.total)+'\nCan we talk about it?'}
function renderEst(){
  var r=calc(), el=$('#estTotal');
  $('#estLines').innerHTML=r.lines.map(function(l){return '<li><span>'+l[0]+'</span><span>Rs '+fmt(l[1])+'</span></li>'}).join('');
  $('#estTime').textContent=tText(r.days); $('#estWa').href=wa(eText(r));
  if(FX){var o={v:shown};G.to(o,{v:r.total,duration:.6,ease:'power3.out',onUpdate:function(){el.textContent=fmt(o.v)}})}else el.textContent=fmt(r.total);
  shown=r.total;
}
estForm.addEventListener('change',renderEst);
$('#estCopy').addEventListener('click',function(){copy(eText(calc()))});
renderEst();

/* plan buttons -> prefill contact */
document.addEventListener('click',function(e){var b=e.target.closest('[data-plan]');if(!b)return;
  var t=TIERS.filter(function(x){return x.id===b.dataset.plan})[0];var sel=$('#fTier');
  sel.selectedIndex=TIERS.indexOf(t); if(mode==='be')$('#fType').value='A website with backend / admin';
  if(!$('#fMsg').value)$('#fMsg').value='I’m interested in the '+t.name+' tier'+(mode==='be'?' with backend & admin panel':'')+'.';
});

/* ---------- contact form ---------- */
$('#contactForm').addEventListener('submit',function(e){
  e.preventDefault();var f=e.target,name=f.name.value.trim();
  if(!name){f.name.focus();toast('Please add your name');return}
  var text='Hi! My name is '+name+(f.biz.value.trim()?' from '+f.biz.value.trim():'')+'.\nI need: '+f.type.value+'\nTier: '+f.tier.value+(f.msg.value.trim()?'\n\n'+f.msg.value.trim():'');
  $('#doneWa').href=wa(text);
  $('#doneMail').href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Website enquiry — '+name)+'&body='+encodeURIComponent(text);
  $('#doneCopy').onclick=function(){copy(text)};
  $('#formDone').classList.add('show');
});

/* ---------- faq ---------- */
$$('#faqList .qa').forEach(function(q){$('button',q).addEventListener('click',function(){var o=!q.classList.contains('open');
  $$('#faqList .qa').forEach(function(x){x.classList.remove('open');$('button',x).setAttribute('aria-expanded','false')});
  if(o){q.classList.add('open');$('button',q).setAttribute('aria-expanded','true')}if(ST)setTimeout(function(){ST.refresh()},600)})});

/* ---------- before/after ---------- */
var ba=$('#ba');$('input',ba).addEventListener('input',function(e){ba.style.setProperty('--x',e.target.value+'%')});

/* ---------- hero: stack, rotator, spotlight ---------- */
var wins=$$('#stackIn .win'),names=['ConneQt','NiaDelta','Your tuition centre'],order=[0,1,2];
setInterval(function(){if(cur!=='home'||reduce)return;order.push(order.shift());wins.forEach(function(w,i){w.dataset.pos=order.indexOf(i)});$('#stackName').textContent=names[order[0]]},3800);
var hero=$('#hero'),stackIn=$('#stackIn');
if(fine&&!reduce){hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px');
  var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;stackIn.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*8)+'deg)'});
  hero.addEventListener('mouseleave',function(){stackIn.style.transform=''})}
var rotWords=['website,','web shop,','platform,','brand,'],ri=0,rotW=$('#rotW'),rotP=$('.rot path');
function scramble(el,to,dur){var chars='abcdefghijklmnopqrstuvwxyz#%&*',from=el.textContent,len=Math.max(from.length,to.length),start=null;dur=dur||600;
  function step(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/dur),out='';for(var i=0;i<len;i++){if(i<to.length*p)out+=to[i]||'';else if(i<to.length)out+=to[i]===' '?' ':chars[Math.floor(Math.random()*chars.length)]}el.textContent=out;if(p<1)requestAnimationFrame(step);else el.textContent=to}
  requestAnimationFrame(step)}
setInterval(function(){if(cur!=='home'||reduce||document.hidden||busy)return;ri=(ri+1)%rotWords.length;
  if(!FX){rotW.textContent=rotWords[ri];return}
  G.timeline().to(rotW,{yPercent:-115,duration:.45,ease:'power3.in'}).call(function(){rotW.textContent=rotWords[ri]}).fromTo(rotW,{yPercent:115},{yPercent:0,duration:.8,ease:'expo.out'}).fromTo(rotP,{strokeDashoffset:420},{strokeDashoffset:0,duration:1,ease:'power3.out'},'-=.55')},3400);

/* search typing loop */
var sq=$('#srchQ'),qs=['restaurant grand baie','tuition moka','car dealer mauritius'],qi=0;
(function typeQ(){var q=qs[qi%qs.length],i=0;sq.textContent='';var t=setInterval(function(){sq.textContent=q.slice(0,++i);if(i>=q.length){clearInterval(t);setTimeout(function(){qi++;typeQ()},4200)}},70)})();

/* ---------- build demo ---------- */
var demo=$('#demo'),steps=$$('#bdSteps .bd__step'),dots=$$('#bdDots i'),urls=['untitled-sketch','draft.design','preview.motion','lepetitlagon.mu'],stage=-1;
function setStage(i){if(i===stage)return;stage=i;demo.dataset.st=i;steps.forEach(function(s,k){s.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k===i)});$('#demoUrl').textContent=urls[i];if(i===3)confetti()}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)setStage(steps.indexOf(e.target))})},{rootMargin:'-45% 0px -45% 0px'});
steps.forEach(function(s){io.observe(s)});
function confetti(){if(reduce)return;var c=$('#confetti'),x=c.getContext('2d'),W=c.width=c.offsetWidth*2,H=c.height=c.offsetHeight*2,ps=[],cols=['#2de2c0','#ff5b37','#ffc93c','#f3eee4','#8fb8ff'];
  for(var i=0;i<90;i++)ps.push({x:W*.78,y:H*.2,vx:(Math.random()-.5)*26,vy:Math.random()*-22-4,r:Math.random()*8+4,c:cols[i%5],a:Math.random()*6,va:(Math.random()-.5)*.4});
  var f=0;(function loop(){x.clearRect(0,0,W,H);ps.forEach(function(p){p.vy+=.8;p.x+=p.vx;p.y+=p.vy;p.vx*=.98;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});if(++f<110)requestAnimationFrame(loop);else x.clearRect(0,0,W,H)})()}

/* ---------- reveal states for bento/admin w/o FX ---------- */
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}})},{threshold:.3});
$$('.bx,#admin').forEach(function(el){io2.observe(el)});

/* ---------- services hover image ---------- */
var svcImg=$('#svcImg'),svcI=$('img',svcImg);
if(fine){$$('#svcList .svc__row').forEach(function(r){r.addEventListener('mouseenter',function(){svcI.src=IMG[r.dataset.im];svcImg.classList.add('on')});r.addEventListener('mouseleave',function(){svcImg.classList.remove('on')})});
  var sx=0,sy=0,stx=0,sty=0;addEventListener('mousemove',function(e){stx=e.clientX+24;sty=e.clientY-100},{passive:true});
  (function lp(){sx+=(stx-sx)*.12;sy+=(sty-sy)*.12;svcImg.style.transform=svcImg.classList.contains('on')?'translate('+sx+'px,'+sy+'px)':'translate('+sx+'px,'+sy+'px) scale(.6)';requestAnimationFrame(lp)})()}

/* ---------- shots hover pan ---------- */

/* ---------- cursor + magnetic ---------- */
var c1=$('.cur'),c2=$('.cur2'),c2s=$('span',c2);
if(fine&&FX){var mx=-100,my=-100,x2=-100,y2=-100;
  addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;c1.style.transform='translate('+mx+'px,'+my+'px)'},{passive:true});
  (function lp(){x2+=(mx-x2)*.18;y2+=(my-y2)*.18;c2.style.transform='translate('+x2+'px,'+y2+'px)';requestAnimationFrame(lp)})();
  document.addEventListener('mouseover',function(e){var l=e.target.closest('[data-cursor]');if(l){c2.classList.add('lbl');c2s.textContent=l.dataset.cursor;return}c2.classList.remove('lbl');c2.classList.toggle('hov',!!e.target.closest('a,button,label,input,select,textarea'))});
  $$('.mag').forEach(function(m){m.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect();G.to(m,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.35,duration:.6,ease:'power3.out'})});m.addEventListener('mouseleave',function(){G.to(m,{x:0,y:0,duration:.9,ease:'elastic.out(1,.4)'})})});
}

/* ---------- nav pill + scramble ---------- */
var nav=$('#nav'),pill=$('#navPill');
function placePill(){var a=$('a.on',nav);if(!a||!nav.offsetParent)return;pill.style.left=a.offsetLeft+'px';pill.style.width=a.offsetWidth+'px'}
if(!reduce)$$('a',nav).forEach(function(a){a.addEventListener('mouseenter',function(){if(!a._b){a._b=1;scramble(a,a.textContent,380);setTimeout(function(){a._b=0},400)}})});
addEventListener('resize',function(){placePill();placeTog()});
var rT;function softRefresh(){clearTimeout(rT);rT=setTimeout(function(){if(ST){ST.sort();ST.refresh()}},180)}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){placePill();placeTog();softRefresh()});
addEventListener('load',softRefresh);

/* ---------- header / progress ---------- */
var hdr=$('#hdr'),lastY=0,prog=$('#progBar');
function onScroll(){var y=scrollY;hdr.classList.toggle('is-solid',y>30);if(!html.classList.contains('menu-open'))hdr.classList.toggle('is-hidden',y>lastY&&y>400);lastY=y;
  var m=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(m>0?y/m:0)+')'}
addEventListener('scroll',onScroll,{passive:true});

/* ---------- mobile menu ---------- */
var burger=$('#burger');
function menu(open){html.classList.toggle('menu-open',open);burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');if(lenis){open?lenis.stop():lenis.start()}}
burger.addEventListener('click',function(){menu(!html.classList.contains('menu-open'))});

/* ---------- smooth scroll ---------- */
var lenis=null;
if(FX&&window.Lenis){lenis=new Lenis({duration:1.2,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true});lenis.on('scroll',ST.update);G.ticker.add(function(t){lenis.raf(t*1000)});G.ticker.lagSmoothing(0)}
function toTop(){if(lenis)lenis.scrollTo(0,{immediate:true,force:true});scrollTo(0,0)}
$('#toTop').addEventListener('click',function(){if(lenis)lenis.scrollTo(0,{duration:1.6});else scrollTo({top:0,behavior:'smooth'})});


/* ---------- hero pixel field ---------- */
var dc=$('#dots'),dx=dc.getContext('2d'),DW=0,DH=0,DPR=Math.min(2,window.devicePixelRatio||1),pts=[],mxp=-999,myp=-999,dRun=false,dVis=true;
function dSize(){var r=dc.getBoundingClientRect();DW=r.width;DH=r.height;dc.width=DW*DPR;dc.height=DH*DPR;dx.setTransform(DPR,0,0,DPR,0,0);pts=[];var g=innerWidth<700?24:30;for(var y=g/2;y<DH;y+=g)for(var x=g/2;x<DW;x+=g)pts.push({x:x,y:y,ox:0,oy:0})}
function dFrame(t){dx.clearRect(0,0,DW,DH);var R=180;for(var i=0;i<pts.length;i++){var p=pts[i],ax=p.x-mxp,ay=p.y-myp,d=Math.sqrt(ax*ax+ay*ay),f=d<R?1-d/R:0,w=Math.sin(p.x*.011+t*.0011)*Math.cos(p.y*.013+t*.0008);
  var tx=f?ax/d*f*22:0,ty=f?ay/d*f*22:0;p.ox+=(tx-p.ox)*.12;p.oy+=(ty-p.oy)*.12;var a=.09+w*.05+f*.75,sz=1.2+f*1.8+(w>.6?.5:0);
  dx.fillStyle=f>.04?'rgba(45,226,192,'+a.toFixed(3)+')':'rgba(243,238,228,'+a.toFixed(3)+')';dx.fillRect(p.x+p.ox-sz/2,p.y+p.oy-sz/2,sz,sz)}}
function dLoop(t){if(!dRun)return;dFrame(t);requestAnimationFrame(dLoop)}
function dCheck(){var on=dVis&&cur==='home'&&!document.hidden&&!reduce;if(on&&!dRun){dRun=true;requestAnimationFrame(dLoop)}else if(!on)dRun=false}
dSize();if(reduce)dFrame(0);
new IntersectionObserver(function(es){dVis=es[0].isIntersecting;dCheck()}).observe(dc);
document.addEventListener('visibilitychange',dCheck);
$('#hero').addEventListener('mousemove',function(e){var r=dc.getBoundingClientRect();mxp=e.clientX-r.left;myp=e.clientY-r.top});
$('#hero').addEventListener('mouseleave',function(){mxp=myp=-999});
addEventListener('resize',function(){dSize();fh()});

/* ---------- zoom tabs ---------- */
$$('.ztabs button').forEach(function(b,i){b.addEventListener('click',function(){$$('.ztabs button').forEach(function(x,k){x.classList.toggle('on',k===i);x.setAttribute('aria-selected',k===i)});$$('.zoom__img').forEach(function(im,k){im.classList.toggle('on',k===i)})})});

/* ---------- 3D tilt ---------- */
if(fine&&FX)$$('[data-tilt]').forEach(function(el){
  el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transition='transform .25s ease-out';el.style.transform='perspective(1100px) rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg) translateY(-6px)'});
  el.addEventListener('mouseleave',function(){el.style.transition='';el.style.transform=''})});

/* ---------- footer reveal ---------- */
var ftr=$('.ftr');
function fh(){var h=ftr.offsetHeight;if(h>innerHeight*.9||innerWidth<760){ftr.classList.add('static');html.style.setProperty('--fh','0px')}else{ftr.classList.remove('static');html.style.setProperty('--fh',h+'px')}}
fh();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fh);


/* ---------- photos (Unsplash) ---------- */
var PHOTOS={"lemorne": {"id": "photo-1513415563383-4e580ed27a46", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABUAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo80uai30u6uowuTA04GoA1OD1LGWAaeDVcPTw9Qxk4NOBqAPTg9SykTZozUW+jfUjHk0xjTS9ML0DFY1GxpGeo2emApNNJpheml6ZJF5lHme9UfO96PO966Dn5jQEvvSiWs/zvel873qWPmNIS04S+9Zon96cJ/eoaKUjSEtOEvvWaJ/el8/3qbFKRpeb70nm1n+f70ef70rD5i+ZaYZaomf3phn96LBzF1pajaWqTT+9RtP70BzF0y00y1RM/vTDP70xcxU+0e9L9o96zPNo80+tdNjy/aM1PtHvR9p96yvNNHnH1pWKVVmuLj3pRce9ZAnPrSic+tS0aKqbH2j3pftHvWOLg+tO+0H1qeUr2xr/AGj3o+0e9ZH2g+tH2g+tLlD2xqm496Y1z71mGc+tMM59aVg9saTXPvUTXPvWc0x9aiaY+tFg9qzSNz7003XvWW0x9aYZj60tB87J91JuqPNGa2uYcpJupN1MzRSuFh+6jdTRTgKVwsO3UoNIFNPCGpchcomaMmniM0vlmlzD5GREmmk1KYzTGQ0uYORkLGomapmQ1C6mocjSKImaoy9OYVGRWcpM2ikaG00u01PspQldPMR7JkAWnBKnCU9UpOQ/ZEKx1IsVTqlSqlQ5DVMgWL2qQRe1TqlSBKhyLUEVxF7UvlVaCUbKm5agimYvao2iq+UpjJSuPkRmvD7VXkhrUdKgdKLi9mjKeKojHWm8dQmOgnkJ6UUUVuaDhT1oopEkq1KtFFSwJVqQUUVDKQ4UtFFSyhppjUUUhkL1C9FFAED1EaKKYj//2Q==", "cred": "Xavier Coiffic", "cap": "Le Morne, Mauritius"}, "island": {"id": "photo-1513415277900-a62401e19be4", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABUAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDbpabmjNdtziHUU3NGaLiHUhpM00mncBTTDQWphai4AaaaQtTC1MQ+io91G6qQiUU4VCGp4aqQiQU6ow1LupiH7qXdUW6jdXJc1Jd1G6ot1Juo5h2JS1NLVGWphejmHYkLVGz1Gz1E0lPmCxKz0wvUDSVGZapMlosmSjzKpmWgS1aZDLwenh6oiSpFkqrk3Lgenb6qCSnh6dwLG6jdUW6k3Vw3NLku6kLVHuppalctEhamM9MLVGzUuYtDmeoXkprtUDvTUgHPJULS0x3qu71cWZydicy+9AmqmXoDmtonLKZoLLUqy1mq5qZJK0I5zRWSniSqSyVIHoLUjSzSZpuaM1wmtxxNNJpM00mlYtMCajY0pNRsaVjRMY5qBzUrVE1OwORA5qu5qw4qFlrSKOWpMhpRT9tKFrVHO2IKeppAKcBWiIbJFapQ1QCpBVFRZsUUUlcljouIaaTTjTTRYpMaajNPNMNFi+YY1RsKlNNIp2JciBlqJlqyRTCtUkc1RlfbRtqUrRtrRI5+Yj20bak20oWrQ1qMC08CnBaXFBrFGlQaKK5zZDTTTRRQUhpppoooKGmmmiimSxpppooqkYTGGkooq0c7FpRRRVFxFooooNkf/9k=", "cred": "Xavier Coiffic", "cap": "Mauritius coast"}, "umbrellas": {"id": "photo-1791039834079-f0fb58d4b2ad", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABUAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCtThSU4V56RqPWpFqNakWrQiRakFRipBVoljhTqaKcKtEMKWiirQgpaKKYBTqSlplIWiiigoxqcKSlFc3KWPFSLUYp60WEyUU8VGKeKaJZIKUU0U4VaJFpaKKpBYKWiimFhaKKKYxaKTNLSuMxc0oNRbqUNU2NCcGnqagDVIrUmiWTqaeDUCtUgapJJgaeDUIanBqaAlzS5qPdS7qpCJM0ZqPdRuqhkmaM1Huo3UASZozUe6jdSAwd9KHqn5nvThJV2LuXlepFeqKyVKr1LRNy6rU9Wqor1IHqbCLQanBqrB6dvosIsh6N9V99HmVVgLG+jfVbzKPMp2GWd9G+qvmUeZRYC1vpN9VvMo8ylYZzIm96estZQn96mjmrZoz5zVSSp0krMjkq1G9S0O5fV6kD1TR6lDVNguWg9LvquGpd1FhXJ/Mo8yq5aml6dguWfMpPMqqXpN9Ow7lrzKPMqpvpd9Fii35lHmVV30b6VhnHgnNWIyaKK2ZzsuxGrcdFFQykWEqZaKKkocKWiigBDTTRRTEMNIaKKY0JS0UUFIWiiikUf//Z", "cred": "Desiree M", "cap": "Caudan Waterfront, Port Louis"}, "market": {"id": "photo-1791386628431-f10b20bc3d80", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABUAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDiNtOC1Z8mlENXzBYrhaeFqcRU8Re1S2FiALS7asiKl8qpbHYrbaQrVryqQxVNwsVCtMK1cMVRmOlcLFNlqNlq60dRmOlcTiUmWmFaumKmmKi5m4FTbSbat+TR5NBPIzZ8qlEVW/LpRHVXOmxVEXtTxFVoR08R1LY7FQRe1O8qrYjp3l1NyrFHyqQxVe8ummOlcdigYvao2irQaOo2jpXCxntFTDFV9o6jMdFxWKRipvlVdMdJ5dFxcpT8qjyqueXR5dFw5TS204LTqUVYWEC08LQKeKllIAtLtpwpakoZtppWpaQ0hkBWo2SrBFMYUAVilRlKslaYVoEVylJsqcikxQFiHZRsqXFGKVwsTbqUNVffS761ILIanhqqh6cJKRRaDU4NVUSU8SVNhljdSE1Dvpd9FguPJpppN1JmnYLgaYRTiaaaLBcaRTacaaalgFJRmkzWbZRT8yjzKqeZR5lddjOxd82lEtUfMpRLUtDL4lp4lrPElSLJSsK5fElPD1SWSpVaqSC5aDU7dVcNTwadhXJc0mabmjNJodwJppNBNNJrKQ0ITSE0hNMJrnky0ZGaKKK7yQzQDRRUsQ8VKtFFBLJUqdKKKoRKtSCiimA8UUUVLAaaaaKKykWiM0w0UVyTKR//2Q==", "cred": "Desiree M", "cap": "Port Louis market"}, "kiosks": {"id": "photo-1791093626034-6a3a9e73fc82", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABUAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCeiiisgCiiigaEpKdikxSsUMNNNSEU0inYTIzTakIpCKdiGMop2KMUrEiClFGKcBSaGgpaMUtTYtElFJS1rYdhaKKKLFJBijFLS07DsMIpCKkxSYp8pLRGRSYqXFNIp8pmyPbSYqXFJiixBHilxTsUYqWikJijFLRUWLQZozUe6jdVmliUGlBqLdTg1MtIkzTs1EGpQ1Uh2JKKaGpc1ViJIWkozSZp2MJAaSlzTc0mZhRSE0hNSy0LRTc0mahmiIN9Lvqvvo30rmqRY30oeq3mUeZVJmiRa304PVTzKUSVSZVi4HpQ9VBJThJVXMpItbqN1V/Mo307nPIn3Uhaod9JvpNmRMWpC1Ql6QvWbZcSUtSbqhL0m+ocjZIqb6N9V99JvrHnNUix5lJ5lVi9NMlUpmsUW/NoEtUTLSiWtVI05TQEvvTxLWestSLJV8xlOJeElO8yqQkp4ejmOSaLXmUb6rb6XfUuRiT76aXqHfTS9ZSmaRROXpvmVAXppeuaVU3iiKkJoopFoYTUbGiimjeAwmkBooreJsSKalU0UVqjCZKtPBoopnHMUUtFFSzADTTRRXNUNIjDRRRXKzdH/9k=", "cred": "Desiree M", "cap": "Caudan Waterfront"}, "designer": {"id": "photo-1622151834677-70f982c9adef", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABgAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzClooqooBaetMFSKK3iSyVKlWo1FSrVGEiaOrCVXSrCVnI0pky1IKjWpBWLOqI6lpopagsDSGlppoE2IabTjSVRm2czS0U4Ct0jO4AVKi0irUqrVmUpDlFPAoApwFMxbHpU6VAtTpUyRdNky08Go1p4rJo64seDS00U6osXcKKXFGKLEuQ2kxT8UYp2MnI5rbT1Wn7acFra5k5CKtSKKAKkApozbEAp4FAFPAqjNsRRUyikVakVaTZrTQop4oAp4FZs6YgBTgKULTwtQyhoFKFqQLTglIlkW2l21MEpdlFzNo5nbSham2UoSr5jKzIwKeFp4SnhKfMTysYq1IqU9UqQLT5ilTGKtSBacFqQLUuRtGI0LTwtOC1Iq1LZqkMC1IqU9UqVUqWyrEYSnhKlVKeEqbisQhKdsqcJS7KVyeU5fZS7al20baOYOUYFpwWnBacBT5hco0LTwKUCngU+YaiCrUirQoqRRRcpRBVqRVpVWpVWpbLSEValVKcq1Kq1LY7DVSnhKeq1IFqbhYjCUuypgtLtpXDlOSxRinUU7k2G4pwFFLTuFhQKcBSCnrTuFhyipVFMWpVouUkSKKlUUxKmQUrlD1FSqKaoqVRUtjsOUVIBSKKkUVLY7CAU7FKBTsUrhY/9k=", "cred": "Christian Velitchkov", "cap": "Designing late"}, "chef": {"id": "photo-1760888549060-11fdfe935840", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCADAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzCiiigAooooAKKKKACiiigApwptPUUmVFajxThSKKlVCahnQtBgFLiphHTvLpA5FcrTdtWvLpPLoFzGfikqTFIRWlzFxGUUpFJTICiiigAoopQKAACpkXNIiZNW4oqlmsVYbHFVlIqkjiqdY6FEbkQCOneXVkR07y6diblTy6PKq55dJ5ftTsK5z22kK1Y8umMlDidFiuVphFWGWoytTsZSgRUU8rRtp3M+VjQKkRM0KmatwxUmylGwQxVeijoijq3GlNIGxqR1MsdSIlSqlVYm5EI6cI6nCU4JTsK5X8ujy6tbKNlOwjmzHTGjq3tprJQdFyg8dQslaLJULR1EikyjtpQlWTFTlirO4nYjiiq5FHRHHVqNKaRnJjo0qyiU2NKsotaIzYIlTKlKi1Mq1QhgSnBKlC08LTEQ7KXZU2yl2UAcztppWp8U0ipNyuy1GyVZK0wrUsdytspypUu2lVagTYIlWY1piLVhFqkQx8a1ZRajRasIKtEMei1Mq01BUyiqEAWnhacBTwKYhgWl21IBS7aAOVxSEU/FIRUG5ERTCKlIppFSxkWKcBS4pwFQJjkFToKjQVOgqkQyaMVYQVDGKsIKtEslQVMopiCpVFWSOAp4FAFPApgIBTsUoFLigDk6QinUhrM2IyKaRTzTTUsYzFOFFKKgRIlTpUKVOlUiWTx1YSoEqdK0RDJ0qZahSplqhEi08U0U4UxDqWkFOoA5KkNFIazNxDTDTjTDUMApRTacKkCVanSq61OlUiGWUqdKrJVhDVollhKmWq6mplNWImBpwqMGnA0xEgpc0zNLmgDlM0hpM0hNZGwGmE0pNMJqWAuaUGmZpQagCdTUyGq6mpkNUiWWkNToarIanQ1oiSwpqVTUCmpFNUInBpwNQg08GmIlzS5qLdS7qAOXzSE0maQmsjUCaYTQTTCalgOzSg1HmlBqAJ1NToarKamQ1aJZaQ1MhqshqZDWiEWVNSKagU1IDVCJw1ODVAGp26gRNuo3VFuo3UAc7mmk0ZppNZGgE0wmgmmE1DAXNKDUeaUGpuBYU1MhqspqZDVoTLSGplNVkNTKa0RJYU1IDUCmng1QEwal3VEDS5oES7qN1R7qTdQBh000tNNZGghqMmnGmNUMBM0oNNpRUATKamQ1XSpkrSJJZQ1KpqBKmWtEImU08GohTxVASZpc0yigQ/NGaZRmgD/9k=", "cred": "Rodrigo Rodrigues", "cap": "Restaurants"}, "store": {"id": "photo-1781078113453-5c3c8cacf07c", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCACgAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDnRUi1GKkStGZosR1ZjqrHVqOoZaLcdWY6qx1ajqGWiwlTrUCVMtSMkFBpBQaBjGqvJU7VXk6U0IqTVnz1fmrPn71SJZm3NZU/WtS571lz9a3gZTNQGpFqEGpUNJiRZjq1HVSOrUdZs0RbjqzHVWOrMdQy0WUqZagQ1KpqRkoNBNNBpCaBiMaryGpWNV5DTEVpjWfP3q9KaoTnrVIlmbc96y5+tadx3rMm61vAymaINSoarg1MhoZKZajNWo6pxmrUZrNmqLkdWUNVYzVhDWbLRaQ1KpqBTUgNSMlzQTTM0hNAxGNQSGpHNV5DTEyvKaoTmrkpqjMatEsoXB61mzda0Lg9azpetaxMJlwGpkNVQ3NTxmqZEWXIzVuM1SjNWozWUjeJdjNWENVIzVhDWbNEWlNSA1App4NSMmzTS1NzTS1AAzVXkNSM1V5GpoGQSmqUxq1KapTGrRDKM5qhIeauzmqEnWtYmE2Tg1PGaqg1NGa0ZjF6l+I1bjNUYjVuM1hI6olyM1YQ1VjNToazZoiypqQGoAaeDUlEu6mlqbmms1ACO1QSNT2aq8jVSERSmqUxqzKapzGqRDKc5qk55q1MaqMea0Rzy3JAaljNQ5qRDWrMy9EatxmqMRq3GawkdEC4hqwhqohqdDWbNUWVNPBqFWpwNSUSbqazUmaaTTARjUEhp7GoHNMTIZDVOU1ZkNU5jVIiRUmNVWNTymqzGruYdSWpENRU9TWpBciNW4zVCI1bjNZSNoMuoanQ1UQ1OhrJmqLKmng1App4NIokzTSaTNITQA1jUDmpWNQOaYmQSGqcxq1KapzGqRnIpynmqzGp5TVVzzQ2ZxRZpy0ynCtrkMsRmrcZqlGatRmoZcC4hqZDVVDU6GszZMsqaeDUKmpAaQ7kmaQmkoNAxjGoXqZqhegRWlqlMauy1RnqkZyKMpqq55qxMaqt1oCCLtKKbThV3MmSoasRmqq1PGaGOJcQ1OhqqhqwhqTVMsKalU1ApqZTUlEgoNIKKQDWqJ6lNRPQBVlqjPV6WqM9MzkZ81VT1qzN1qsaC4F2lFJSirMR61MhqAVMlMlFpDVhDVWOrCUjVFlKmWoEqZallkgpaQU6kA01C9TGoXpAVpaz7jvWhLWfcU0RIzputVzVifrVc0y4bH//2Q==", "cred": "X F", "cap": "Boutiques"}, "showroom": {"id": "photo-1788178243401-854e12eeb8b1", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCACoAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDq6UUlKKQh4qQVGKkFADxThTRS0ALSGlpDSAaaYacaaaYDTSUpptMApaSimA6lpKKYENOFNpRUgSCnioxTxSAkFOpgp1AC0hopDQAhpppTTDQAhpKDTTTAWjNJmjNUA6lzTc0ZoER0opuaUVIyQU8VGDTwaAJAadmowadmkA7NITSZpCaYCE00mlJphNAhCaTNITTc1QDs0ZpmaM0xEmaM0zNGaAG5pQaZmlBqSiUGng1CDTwaQEoNOzUYNLmgB+aaTSZpCaBATTCaCaYTVABNNJpCaaWpiHZozTN1JupiJN1Lmos0u6gLhmlBqLNKDUFkwNPBqAGng0gJgadmogaXdQBJmmlqbuppamIcTUZNIWphaqQhS1NLU0tTC1USP3Ubqi3Um6mK5Nuo3VFuo3UWC47dShqg3UoasTUsBqeGquGp4agCcNS7qh3Uu6gCXdTS1R7qaWpkjy1MLUwtUbNVITHlqYWqNmpperRJJupN1Rb6TfTETbqXdUG+jfQIdvpweq2+lD1zm5aD08PVUPTw9MCzup26q4el30ATFqaXqIvTS9MkkZqiZ6Yz1Ez1SEyRnpheomemF6tEMmL0b6r76N9USWN9G+q++l307AG+nB6qeZThJXHc6S4HqQPVJXqQPTuIth6dvqsHpd9MCcvTC9RF6Yz0yWSM9RM9Rs9QtJVIlkrSUwyVA0lRmStEQyz5lG+qnmUokrRIi5b30u+qoel307Bcj82nrJWf5tSLLXlqZ2WNBZKlWSqCSVMslaKQi6Hp2+qoenb6q4icvUbPUReo2encTHvJULyVG8lVpJapMhkzy1E01VXm96iMtbRMZSLvm04S1niSnrJW6Rk2zQElPElUFkqQSVXKHMVRLUiSVmCbmp45M14rhY9K5qRyVYSSs2N6so9TGVhF9Xp2+qqtT91bJiJS9RO9NZqhkenzCYkklU5ZqWaSqM0lClcykOeao/Nqu75NM3GuiDBUy6stSrJms9WqZHrshqTKmX1enh6qo9SBq1SMHEyw1WIX5ooryZLQ7y7E1W4zRRXJLcosIafniiitIiGsaryGiilIkpTNVGVqKK0pkLcgNJRRW5oOFPU0UV2USWToamBoorpMJI//2Q==", "cred": "Ositadinma Onyeobi", "cap": "Car showrooms"}, "tutor": {"id": "photo-1574966390692-5140d4310743", "ph": "data:image/jpeg;base64,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", "cred": "Nick Fithen", "cap": "Tuition"}, "villa": {"id": "photo-1692736933732-ad902fc34626", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCACoAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsKaaXNNJrIkY1RNUjGomoERNTDT2NRmgQlOFNpwqkIkWpVqFTUqmrQiUU8VGDTgapCH0UmaM1QhaSkzRmmIdmmk03dTS1cpuDGomNOLVExoAaxqMmlY0wmgQuacDUeaUGqQrEympVNVwakU1SFYnBp4NQhqcGqkIlzRmo91G6qEPzRmo91JupiF3U0tUW+kL1zG48tUbNTS9MZqAFLUwmmlqaWoCw/NKDUW6gNTFYsBqeGquGpwaqQrFkNShqrhqdvq0KxPuo3VBvo30xWJt1G+oN9G+qFYTfSF6r76N9cxsSl6aWqIvTS9AEhamlqjLUm6gdiTdS7qh3UbqAsThqcGqvupd9UgsWN9Lvqvvo31SJsWN9G+q++k31SFYsb6TfVffSeZVCsG+k31X8yk31zmhY30m+oN9G+gZMWpN1RbqTdSGTbqTdUW6jdTHYm3Ub6g3Ub6YWJ99JvqAvTS9UhWLG+kMlVy9NMlUhWLPmUnmVW8yk8yqFYXfS76rb6XfWIyxvo31X307dQMn3UbqhDUu6kMl3Ubqi3UbqBkm6kLVHupC1MY8tTS9RlqaWqkIkL00vURamF6pCJi9JvqAvTd9VYRNuo3VFmlzWVibkoanBqgzTgaLBcmDU7dUIalBpWHcmzRmowaXNOw7js0hNJminYLiE0wmnGmGqSC40moyaeaYatIVxpNN3UGmmqsFyailpKxM7i5ozSUmaLCuSA04Gos04GiwcxKDTgaiBp4p2FzD6WkFOAqrBzDSKaRUuKQrVJBzEJFRkVYK1Gy1SQcxARTCKnK00rVJC5h2KTFSYpCK5wuRGmmpGqM07EOQZpQajJoDVSiYupYnU1KtVlap0NVyiVQmWngU1akUU7FKQYo208Cl207FcxCVphWrBWmFapIOYrlaaVqcrTStVYXMNxTSKkxTSK5TVkLConqdqgeqRjNkRoFBpRWiOVsctTxmoVqVKpIi9i0lTKKgjqwlKxtGQ8CnYoAp2KZomMIphFTEUwimh3ISKaRUpFNIqhXIaaaKK5DoZE9QPRRVowqEVKKKKs5WPWpUooq0Zssx1ZSiihmsCUU+iikbISmmiiqGMNNNFFMD/2Q==", "cred": "Shawn", "cap": "Villas & hotels"}, "phone": {"id": "photo-1793193859142-e2554ff2b24d", "ph": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCADAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvTUb1IaieqAqzVnz1fmqhP3pDM6eqEnWr0/eqMnWpYEXepY6h71NHUiLsParkVUoauxVSEWkqUVElSiqQCmmGnGmmqQiJqYae1MNMDoDUT08mo3NQWVZaoT1elNUJ+9IDPnqhJ1q9P3qjJ1qWBF3qWOoe9Sx0gLsNXYjVCI1diNNCLaGphVdDUwNUhDs000uaaTVAMaozT2phqhG6TUbmnE1G5qCytKaoz96uymqE560gKE9UZOtXZ+9UJaljI6kjNQk81IhqRF2I1ciNUIjVyM00IuoalBquhqUGrQiTNITSZppNUgENMNKTTSaYG4TUTmnE1E5qCiCU1RmPWrkpqjMaQyjOetUZauznrVCU1LAiJ5p6GoieachqLgXYjVyI1QiNW42qkIuo1TKaqoamU1aETZpCaZmjNUgAmmk0E00mmBtE1E5pxNRuakoglNUpjVuU1SmNJgUpz1qhKauznrVCU1mxkJPNOU81Ex5pVNZ3AuxNVuM1QjNW42q0yS6jVMpqqhqZTWiETg0ZqMGlzVIBxNNzSZpM1QGyTUbmnE1GxqCiCU1SmNW5TVKY0mMoznrVCU1dnPWqExrOQyBjzQrVG7c0itzWN9Rl2NquRNWfE1XIjWkWQy6hqdTVRDU6nitUInBpc1GDS5q0A7NGaZmjNMDaNRtTzUb1IyvLVKY1clqjMetIZRnPWs6Y1enPWs6c1lMaKztzQrc1G7c0itzXI3qUXomq5Eaz4TV2I10QIZdjNTqarRmp1NbIkmB4pc0wGlzVoB2aTNNzRmqA3TUb1KaiepGVpaozVdlqjP3pMZnXB61mTnrWjcHrWVcN1rGew0VXbmhDzUTtzQjc1ztFmhCavRGs6A1fhrWmQy7HU61XjqwtdCIJAaXNNFGatCFzSZpCaTNUB0ZqN6lNRPUlFSWqE/etCas6470mBmXJ61kXLda1bo9axrtutYzKRSkbmljbmq8j/NT4WyazcdCzVtz0rRhrMtu1acPSqpozZcj6VOtQx1OtbokfSUUhq0IQ00mlNMJqhHVGonqY1FJ0qCinNWdcd60ZqzrnvSAyLo9aw71utbV33rAvm61nJFIzZG+aprc8iqkh+ap7Y8iiS0K5jbte1akHasu06CtWDoKUESy5HVhahjqda1RAtNNOprVaEyNqYTTmqMmqRJ2JqGTpU5qGTpUFlKas2571pzd6y7nvSGY14eDXO37cmuhvehrmr88mpaGjNY81Ytj8wqsetWLb7woewLc3bPoK14O1ZFn0FbEHQVMUDLsdTrUMdTrWiJA0xqeaY1WiWQvUZNPeojVolnamopKmNQyVkaFKfvWXdd61J+9Zd10NAGJe9DXM3/3jXS33Q1zV/wDeNSMzj1qe3+8KgPWprf7woYI37LoK2YOgrGsegrZt+1JDZejqZahj6VOKtEgajepDUb1aJZA9QmpnqE1aIZ//2Q==", "cred": "tommao wang", "cap": "On their phones"}};
function photoW(el){var w=el.getBoundingClientRect().width||innerWidth,d=Math.min(2,window.devicePixelRatio||1),t=w*d;return t<=700?700:t<=1100?1100:t<=1600?1600:2200}
$$('[data-photo]').forEach(function(el){var p=PHOTOS[el.dataset.photo];if(!p)return;el.style.backgroundImage='url('+p.ph+')';
  var im=document.createElement('img');im.alt=el.closest('figure')?'':p.cap;im.decoding='async';if(!el.hasAttribute('data-eager'))im.loading='lazy';
  im.onload=function(){im.classList.add('ok')};im.onerror=function(){im.remove()};
  im.src='https://images.unsplash.com/'+p.id+'?auto=format&fit=crop&q=72&w='+photoW(el);el.appendChild(im)});

/* ======================= ROUTER ======================= */
var routes={home:'Home',work:'Work',services:'Services',pricing:'Pricing',process:'Process',contact:'Contact'},keys=Object.keys(routes),cur=null,busy=false,mm=null;
var titles={home:'WebLuxe — Web design studio in Mauritius',work:'Work — WebLuxe',services:'Services — WebLuxe',pricing:'Pricing (MUR) — WebLuxe',process:'Process — WebLuxe',contact:'Contact — WebLuxe'};
function show(n){
  $$('[data-page]').forEach(function(p){p.hidden=p.dataset.page!==n});
  cur=n;document.title=titles[n];
  $$('#nav a,.mnav a.big').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+n)});
  placePill();toTop();fh();dCheck();
  if(n==='pricing')requestAnimationFrame(placeTog);
}
function kill(){if(mm){mm.revert();mm=null}if(ST)ST.getAll().forEach(function(t){t.kill()})}
function build(n){
  if(!FX){$$('[data-page="'+n+'"] .cnt').forEach(function(c){c.textContent=c.dataset.to});return}
  kill();mm=G.matchMedia();
  var P=$('[data-page="'+n+'"]');
  $$('[data-r]',P).forEach(function(el){G.fromTo(el,{y:50,opacity:0},{y:0,opacity:1,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}})});
  $$('[data-split]',P).forEach(function(el){if(el.closest('.hero h1,.ph h1'))return;G.fromTo($$('.wi',el),{yPercent:110},{yPercent:0,duration:1.2,stagger:.05,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
  $$('.cnt',P).forEach(function(c){var o={v:0};G.to(o,{v:+c.dataset.to,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:c,start:'top 92%',once:true},onUpdate:function(){c.textContent=Math.round(o.v)}})});
  $$('[data-words]',P).forEach(function(el){G.fromTo($$('.sw',el),{opacity:.13},{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'bottom 45%',scrub:true}})});
  $$('.ph__bg',P).forEach(function(b){G.fromTo(b,{yPercent:0,scale:1.08},{yPercent:14,scale:1,ease:'none',scrollTrigger:{trigger:b.parentNode,start:'top top',end:'bottom top',scrub:true}})});
  $$('.ph__glow',P).forEach(function(g){G.to(g,{yPercent:40,ease:'none',scrollTrigger:{trigger:g.parentNode,start:'top top',end:'bottom top',scrub:true}})});
  if(n==='home'){

    var mob=innerWidth<901;
    /* GTA mask zoom */
    (function(){var svg=$('#gtaMask'),m=$('#gtaMeasure'),ox='50%',oy='50%';
      function origin(){try{var e=m.getExtentOfChar(4),pt=svg.createSVGPoint();pt.x=e.x+e.width/2;pt.y=e.y+e.height*.55;var c=pt.matrixTransform(svg.getScreenCTM()),r=svg.getBoundingClientRect();ox=(c.x-r.left)+'px';oy=(c.y-r.top)+'px';svg.style.transformOrigin=ox+' '+oy}catch(err){}}
      origin();
      var gt=G.timeline({scrollTrigger:{trigger:'#gtaPin',start:'top top',end:mob?'+=160%':'+=220%',pin:true,scrub:true,anticipatePin:1,onRefreshInit:origin}});
      gt.to('#gtaHint',{opacity:0,duration:.08},0)
        .fromTo(svg,{scale:1},{scale:mob?60:48,ease:'power3.in',duration:1},0)
        .to(svg,{opacity:0,duration:.2,ease:'none'},.8)
        .fromTo('.gta__bg',{scale:1.4},{scale:1.05,ease:'power1.out',duration:1.2},0)
        .to('#gtaShade',{opacity:1,duration:.35},.95)
        .fromTo('#gtaCopy > *',{y:70,opacity:0},{y:0,opacity:1,stagger:.08,duration:.4,ease:'power2.out'},1.0)
        .to({},{duration:.25});
    })();
    /* who: parallax columns */
    $$('.who__col').forEach(function(c){var sp=+c.dataset.speed*(mob?.5:1);G.fromTo(c,{yPercent:-sp},{yPercent:sp,ease:'none',scrollTrigger:{trigger:'.who__cols',start:'top bottom',end:'bottom top',scrub:true}})});
    /* scenes */
    (function(){var imgs=$$('.scn__img'),lines=$$('.scn__line'),bars=$$('.scn__prog b');
      var st=G.timeline({scrollTrigger:{trigger:'#scnPin',start:'top top',end:mob?'+=200%':'+=280%',pin:true,scrub:true,anticipatePin:1}});
      st.fromTo(imgs[0],{scale:1.25},{scale:1,duration:1,ease:'none'},0)
        .fromTo(lines[0].children,{y:60,opacity:0},{y:0,opacity:1,stagger:.06,duration:.3},0)
        .to(bars[0],{scaleX:1,duration:1,ease:'none'},0);
      [1,2].forEach(function(i){var t=i*1.1;
        st.to(lines[i-1],{y:-80,opacity:0,duration:.3,ease:'power2.in'},t-.2)
          .fromTo(imgs[i],{clipPath:'inset(100% 0% 0% 0%)',scale:1.3},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:.7,ease:'power2.inOut'},t-.2)
          .set(lines[i],{opacity:1},t)
          .fromTo(lines[i].children,{y:60,opacity:0},{y:0,opacity:1,stagger:.06,duration:.3},t)
          .to(bars[i],{scaleX:1,duration:1,ease:'none'},t)});
      st.to({},{duration:.3});
    })();
    ST.create({trigger:'.marq',start:'top bottom',end:'bottom top',onUpdate:function(s){var v=G.utils.clamp(-12,12,s.getVelocity()/300);G.to('.marq__t',{skewX:-v,duration:.4,overwrite:true})}});
    G.to('.hero__in',{yPercent:12,opacity:.3,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
    mm.add('(min-width:901px)',function(){
      var zt=G.timeline({scrollTrigger:{trigger:'#zoomPin',start:'top top',end:'+=140%',pin:true,scrub:true,anticipatePin:1}});
      zt.fromTo('#zoomF',{clipPath:'inset(17% 24% 17% 24% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none'},0)
        .fromTo('.zoom__img',{scale:1.35},{scale:1,ease:'none'},0)
        .to('.zoom__side',{opacity:0,duration:.25,ease:'none'},0)
        .fromTo('.zoom__ov > *',{y:70,opacity:0},{y:0,opacity:1,stagger:.06,duration:.35,ease:'none'},.55);
    });
    ST.create({trigger:'#hwPin',start:'top bottom',end:'bottom top',onUpdate:function(s){var v=G.utils.clamp(-8,8,s.getVelocity()/220);G.to('.hcard__img',{skewX:-v*.6,scale:1-Math.abs(v)*.004,duration:.5,overwrite:'auto'})}});
    mm.add('(min-width:901px)',function(){var tr=$('#hwTrack');
      G.to(tr,{x:function(){return -(tr.scrollWidth-innerWidth)},ease:'none',scrollTrigger:{trigger:'#hwPin',start:'top top',end:function(){return '+='+(tr.scrollWidth-innerWidth)},pin:true,scrub:true,anticipatePin:1,invalidateOnRefresh:true}});
    });
  }
  if(n==='work'){$$('.shot').forEach(function(s){G.fromTo(s,{clipPath:'inset(14% 10% 14% 10% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 18px)',ease:'none',scrollTrigger:{trigger:s,start:'top 98%',end:'top 45%',scrub:true}})});}
  if(n==='process'){
    G.to('#tlLine',{scaleY:1,ease:'none',scrollTrigger:{trigger:'#tl',start:'top 60%',end:'bottom 60%',scrub:true}});
    $$('.tl__item').forEach(function(it){ST.create({trigger:it,start:'top 60%',onEnter:function(){it.classList.add('on')},onLeaveBack:function(){it.classList.remove('on')}})});
  }
  G.fromTo('#ftrBig',{yPercent:40,opacity:.15},{yPercent:0,opacity:1,ease:'none',scrollTrigger:{trigger:'main',start:'bottom bottom',end:function(){return 'bottom '+(innerHeight-ftr.offsetHeight)+'px'},scrub:true}});
  requestAnimationFrame(function(){ST.sort();ST.refresh()});
}
function heroIn(n){
  if(!FX)return;var P=$('[data-page="'+n+'"]');
  var tl=G.timeline({defaults:{ease:'expo.out'}});
  tl.fromTo($$('.hero h1 .ch, .ph h1 .ch',P),{yPercent:120,rotate:12},{yPercent:0,rotate:0,duration:1.25,stagger:.018,transformOrigin:'0% 100%'})
    .fromTo($$('[data-hi]',P),{y:30,opacity:0},{y:0,opacity:1,duration:1.1,stagger:.08},'-=1.0').fromTo($$('.ph__bg',P),{opacity:0,scale:1.2},{opacity:.55,scale:1.08,duration:1.8,ease:'power2.out'},0);
  if(n==='home'){
    tl.fromTo('#rotW',{yPercent:110,opacity:0},{yPercent:0,opacity:1,duration:1},'-=1.2')
      .fromTo(rotP,{strokeDashoffset:420},{strokeDashoffset:0,duration:1.2,ease:'power3.inOut'},'-=.6')
      .fromTo('#stack',{y:140,opacity:0,rotateX:18},{y:0,opacity:1,rotateX:0,duration:1.6},'-=1.4').fromTo('#dots',{opacity:0},{opacity:1,duration:1.5},'<')
      .fromTo('.chip',{scale:.4,opacity:0},{scale:1,opacity:1,duration:.9,stagger:.08,ease:'back.out(2)'},'-=.9');
  }
}
var ptB=$$('#pt .pt__b'),ptT=$('#ptT'),ptK=$('#ptK'),ptL=$('#pt .pt__line i');
function cover(n,mid,after){
  busy=true;if(lenis)lenis.stop();
  ptT.textContent=routes[n];ptK.textContent=String(keys.indexOf(n)+1).padStart(2,'0')+' / '+String(keys.length).padStart(2,'0');
  G.set('#pt',{display:'block'});G.set(ptB,{clipPath:'inset(100% 0% 0% 0%)'});G.set('.pt__c',{opacity:1,y:0});G.set([ptT,ptK],{yPercent:120});G.set(ptL,{scaleX:0});
  G.timeline({onComplete:function(){busy=false}})
   .to(ptB,{clipPath:'inset(0% 0% 0% 0%)',duration:.8,ease:'expo.inOut',stagger:.08})
   .to([ptK,ptT],{yPercent:0,duration:.8,stagger:.06,ease:'expo.out'},'-=.45')
   .to(ptL,{scaleX:1,duration:.6,ease:'power2.inOut'},'<')
   .call(mid,null,'>-.1')
   .to('.pt__c',{opacity:0,y:-30,duration:.35,ease:'power2.in'},'>+.1')
   .to(ptB.slice().reverse(),{clipPath:'inset(0% 0% 100% 0%)',duration:.85,ease:'expo.inOut',stagger:.08},'>-.1')
   .call(after,null,'-=.75').set('#pt',{display:'none'});
}
function navigate(n){
  if(busy||!routes[n])return;
  if(html.classList.contains('menu-open'))menu(false);
  try{if(location.hash!=='#'+n)history.replaceState(null,'','#'+n)}catch(e){}
  if(n===cur){if(lenis)lenis.scrollTo(0,{duration:1.2});else scrollTo({top:0,behavior:reduce?'auto':'smooth'});return}
  if(!FX){show(n);build(n);return}
  cover(n,function(){kill();show(n);build(n)},function(){if(lenis)lenis.start();heroIn(n)});
}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var n=a.getAttribute('href').slice(1);
  if(routes[n]){e.preventDefault();navigate(n)}else if(n===''){e.preventDefault()}});
addEventListener('hashchange',function(){var n=location.hash.slice(1);if(routes[n]&&n!==cur)navigate(n)});

/* ======================= BOOT ======================= */
var first=routes[location.hash.slice(1)]?location.hash.slice(1):'home';
try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
show(first);
if(!FX){$('#ld').style.display='none';build(first);return}
build(first);
if(lenis)lenis.stop();
G.set($$('.hero h1 .ch,.ph h1 .ch'),{yPercent:120});G.set($$('[data-hi]'),{opacity:0});G.set('#stack',{opacity:0});

/* loader: name only, morphs into the header logo */
var ld=$('#ld'),word=$('#ldWord'),num=$('#ldN'),logoTxt=$('#logoTxt'),o={p:0};
$$('#ldWord .ld__mask').forEach(charify);
var chars=$$('#ldWord .ch');
var hdrBits=['.logo__mark','.nav','.hdr__in > .btn','#burger'];
G.set(logoTxt,{opacity:0});G.set(hdrBits,{opacity:0});G.set('.hdr',{y:0});
var tl=G.timeline();
tl.fromTo(chars,{yPercent:120,rotate:8,filter:'blur(6px)',opacity:0},{yPercent:0,rotate:0,filter:'blur(0px)',opacity:1,duration:1.2,stagger:.035,ease:'expo.out'},.15)
  .to('#ldGlow',{opacity:1,duration:1.6,ease:'power2.out'},.2)
  .fromTo('#ldSub',{opacity:0,y:14,filter:'blur(4px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1,ease:'power3.out'},.75)
  .fromTo('#ldMeta',{opacity:0,y:8},{opacity:1,y:0,duration:.9,ease:'power3.out'},.55)
  .to('#ldLine',{scaleX:1,duration:1.9,ease:'power2.inOut'},.45)
  .to(o,{p:100,duration:1.9,ease:'power2.inOut',onUpdate:function(){num.textContent=String(Math.round(o.p)).padStart(3,'0')}},.45)
  .to(chars,{yPercent:-8,duration:.35,stagger:{each:.015,yoyo:true,repeat:1},ease:'sine.inOut'},1.95)
  .addLabel('out',2.6)
  .to(['#ldSub','#ldMeta','.ld__line','#ldSkip'],{opacity:0,y:-6,duration:.45,ease:'power2.in'},'out')
  .add(function(){
    var w=word.getBoundingClientRect(),t=logoTxt.getBoundingClientRect(),sc=t.width/w.width;
    G.to(word,{x:t.left-w.left,y:t.top-w.top+(t.height-w.height*sc)/2,scale:sc,duration:1.25,ease:'expo.inOut'});
  },'out+=.1')
  .to('#ldGlow',{scale:.2,opacity:0,duration:1.1,ease:'expo.inOut'},'out+=.1')
  .to('#ldBg',{opacity:0,duration:.9,ease:'power2.inOut'},'out+=.55')
  .call(function(){if(lenis)lenis.start();heroIn(first)},null,'out+=.75')
  .to(hdrBits,{opacity:1,duration:.7,stagger:.05,ease:'power2.out'},'out+=1.1')
  .fromTo('.logo__mark',{scale:.4,rotate:-90},{scale:1,rotate:0,duration:.9,ease:'back.out(1.8)'},'out+=1.1')
  .set(logoTxt,{opacity:1},'out+=1.36')
  .to(word,{opacity:0,duration:.15},'out+=1.36')
  .set(ld,{display:'none'},'out+=1.55')
  .set(hdrBits.concat([logoTxt]),{clearProps:'opacity,transform'});
function skip(){if(tl.time()<2.55)tl.seek('out')}
ld.addEventListener('click',skip);
})();
