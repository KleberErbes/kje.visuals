const films = [
  {id:'entre-montanhas',title:'Entre montanhas',category:'Paisagens e viagens',description:'O rio, a cidade e as montanhas dividem o mesmo enquadramento.'},
  {id:'em-movimento',title:'Em movimento',category:'Eventos · Automotivo',description:'A energia da pista e do encontro em um filme cheio de movimento.'},
  {id:'a-beira-mar',title:'À beira-mar',category:'Paisagens e viagens · Filme vertical',description:'Um voo acompanhando o encontro das ondas com a areia.'},
  {id:'alem-do-horizonte',title:'Além do horizonte',category:'Paisagens e viagens',description:'Entre nuvens e montanhas, a paisagem ganha outra dimensão.'},
  {id:'encontro-na-pista',title:'Encontro na pista',category:'Eventos · Automotivo',description:'Uma visão do alto para guardar a dimensão de um encontro.'},
  {id:'ritmos-da-cidade',title:'Ritmos da cidade',category:'Paisagens e viagens · Urbano',description:'Ruas, telhados e caminhos que desenham a cidade vista de cima.'}
];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('#hero-video');
const toggle = document.querySelector('#video-toggle');
const dialog = document.querySelector('#film-dialog');
const player = document.querySelector('#film-player');
let manuallyPaused = reduceMotion.matches;
let heroVisible = true;
let activeIndex = 0;
let lastFocus;
document.querySelector('#year').textContent = new Date().getFullYear();

function updateHeroControl(){
  const paused = hero.paused;
  toggle.setAttribute('aria-label', paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo');
  document.querySelector('#video-toggle-icon').textContent = paused ? '▷' : 'Ⅱ';
  document.querySelector('#video-toggle-text').textContent = paused ? 'REPRODUZIR' : 'PAUSAR';
}
async function playHero(){
  if(!hero.getAttribute('src')) hero.src = hero.dataset.src;
  hero.muted = true;
  try {await hero.play();} catch {updateHeroControl();}
}
function syncHero(){
  if(manuallyPaused || !heroVisible || document.hidden || dialog.open) hero.pause();
  else playHero();
}
hero.addEventListener('play',updateHeroControl);
hero.addEventListener('pause',updateHeroControl);
hero.addEventListener('error',()=>{manuallyPaused=true;toggle.hidden=true;});
toggle.addEventListener('click',()=>{manuallyPaused=!hero.paused;syncHero();});
document.addEventListener('visibilitychange',syncHero);
reduceMotion.addEventListener('change',e=>{manuallyPaused=e.matches;syncHero();});
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncHero();},{threshold:.08}).observe(document.querySelector('.hero'));
updateHeroControl();

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.06,rootMargin:'0px 0px -24px 0px'});
document.documentElement.classList.add('js');
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('.filter').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  let count=0;
  document.querySelectorAll('.film-card').forEach(card=>{
    const visible=filter==='all'||card.dataset.category===filter;
    card.hidden=!visible;
    if(visible){count++;card.classList.add('visible');}
  });
  document.querySelector('#film-grid').classList.toggle('filtered',filter!=='all');
  document.querySelector('#film-count').textContent=`${count} FILMES`;
}));

function showFilm(index){
  activeIndex=(index+films.length)%films.length;
  const film=films[activeIndex];
  player.pause();
  document.querySelector('#dialog-title').textContent=film.title;
  document.querySelector('#dialog-category').textContent=film.category.toUpperCase();
  document.querySelector('#dialog-description').textContent=film.description;
  document.querySelector('#dialog-counter').textContent=`${String(activeIndex+1).padStart(2,'0')} / 06`;
  document.querySelector('#player-error').hidden=true;
  player.poster=`assets/${film.id}.webp`;
  player.src=`assets/${film.id}.mp4`;
  document.querySelector('#video-download').href=player.src;
  player.muted=true;
  if(!dialog.open){lastFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
  hero.pause();
  player.play().catch(()=>{});
}
document.querySelectorAll('.film-open').forEach(button=>button.addEventListener('click',()=>{
  showFilm(films.findIndex(f=>f.id===button.closest('.film-card').dataset.film));
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.classList.remove('modal-open');lastFocus?.focus({preventScroll:true});syncHero();});
document.querySelector('#previous-film').addEventListener('click',()=>showFilm(activeIndex-1));
document.querySelector('#next-film').addEventListener('click',()=>showFilm(activeIndex+1));
player.addEventListener('error',()=>{if(player.getAttribute('src'))document.querySelector('#player-error').hidden=false;});
