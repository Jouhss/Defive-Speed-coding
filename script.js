const questions = [
 {level:'Fácil', answer:'nome', image:'assets/questions/q1.png'},
 {level:'Fácil', answer:'idade', image:'assets/questions/q2.png'},
 {level:'Fácil', answer:'i', image:'assets/questions/q3.png'},
 {level:'Médio', answer:'maior', image:'assets/questions/q4.png'},
 {level:'Médio', answer:'frutas', image:'assets/questions/q5.png'},
 {level:'Médio', answer:'nome', image:'assets/questions/q6.png'},
 {level:'Difícil', answer:'numeros', image:'assets/questions/q7.png'},
 {level:'Difícil', answer:'return', image:'assets/questions/q8.png'},
 {level:'Difícil', answer:'ValueError', image:'assets/questions/q9.png'},
 {level:'Difícil', answer:'nome', image:'assets/questions/q10.png'}
];

const screens = {menu:document.querySelector('#menu'), game:document.querySelector('#game'), result:document.querySelector('#result')};
const timerEl=document.querySelector('#timer'), image=document.querySelector('#code-image'), answer=document.querySelector('#answer');
const progress=document.querySelector('#progress'), difficulty=document.querySelector('#difficulty'), feedback=document.querySelector('#feedback');
const dots=document.querySelector('#dots'), resultDots=document.querySelector('#result-dots');
let index=0, score=0, results=[], start=0, interval=null, locked=false;

function show(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active');}
function formatTime(ms){let t=ms/1000;let m=Math.floor(t/60).toString().padStart(2,'0');let s=Math.floor(t%60).toString().padStart(2,'0');let d=Math.floor((t*10)%10);return `${m}:${s}.${d}`}
function renderDots(){dots.innerHTML='';results.forEach(r=>{let d=document.createElement('span');d.className='dot '+(r?'correct':'wrong');dots.appendChild(d)});for(let i=results.length;i<questions.length;i++){let d=document.createElement('span');d.className='dot';dots.appendChild(d)}}
function startGame(){
 index=0;score=0;results=[];locked=false;start=performance.now();clearInterval(interval);
 interval=setInterval(()=>timerEl.textContent=formatTime(performance.now()-start),100);
 show('game');loadQuestion();
}
function loadQuestion(){
 locked=false;const q=questions[index];image.src=q.image;difficulty.textContent=q.level.toUpperCase();progress.textContent=`${index+1} / ${questions.length}`;
 feedback.textContent='';feedback.className='feedback';answer.value='';answer.focus();renderDots();
}
document.querySelector('.available').onclick=startGame;
document.querySelector('#answer-form').onsubmit=(e)=>{
 e.preventDefault();if(locked)return;
 const ok=answer.value.trim()===questions[index].answer;
 locked=true;results.push(ok);if(ok)score++;
 feedback.textContent=ok?'✓ Correto!':'✕ Incorreto!';feedback.className='feedback '+(ok?'good':'bad');renderDots();
 setTimeout(()=>{index++;if(index>=questions.length)finish();else loadQuestion()},650);
};
function finish(){
 clearInterval(interval);const total=performance.now()-start;
 document.querySelector('#final-score').textContent=`${score}/${questions.length}`;
 document.querySelector('#final-time').textContent=formatTime(total);
 document.querySelector('#result-message').textContent=score===10?'Perfeito. Você não errou nenhuma!':score>=7?'Muito bom! Agora tente melhorar seu tempo.':'Continue treinando e tente novamente.';
 resultDots.innerHTML='';results.forEach(r=>{let d=document.createElement('span');d.className='dot '+(r?'correct':'wrong');resultDots.appendChild(d)});
 show('result');
}
document.querySelector('#again').onclick=startGame;
document.querySelector('#menu-again').onclick=()=>{clearInterval(interval);show('menu');timerEl.textContent='00:00.0'};
document.querySelector('#quit').onclick=()=>{clearInterval(interval);show('menu');timerEl.textContent='00:00.0'};
