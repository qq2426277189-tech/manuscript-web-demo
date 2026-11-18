const $=id=>document.getElementById(id);
let persisted={};try{persisted=JSON.parse(localStorage.getItem('manuscript-v1')||'{}')}catch{}
const state={page:'home',index:Math.min(11,Math.max(0,Number(persisted.index)||0)),seen:persisted.seen||[],saved:persisted.saved||[],selected:1,filter:'all',subtitleMode:['both','zh','en'].includes(persisted.subtitleMode)?persisted.subtitleMode:'both',playing:false,history:[],rate:Number(persisted.rate)||0.9};
let timer,toastTimer,utterance,recorder,stream,takeBlob,takeUrl,recordTimer,recordEpoch=0;
function persist(){try{localStorage.setItem('manuscript-v1',JSON.stringify({index:state.index,seen:state.seen,saved:state.saved,subtitleMode:state.subtitleMode,rate:state.rate}))}catch{toast('浏览器未允许保存，下次打开可能无法恢复')}}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3000)}
function stopPlayback(){state.playing=false;clearTimeout(timer);if('speechSynthesis'in window)speechSynthesis.cancel();$('play').textContent='播放';$('play-state').textContent='点击空白处继续 · 点击字幕学习'}
function line(){return LINES.find(x=>x.id===state.selected)}
function renderStory(){
 const l=LINES[state.index];
 $('stage').dataset.mood=l.mood||'rain';
 $('subtitle-en').textContent=l.en;
 $('subtitle-zh').textContent=l.zh;
 renderSubtitleMode();
 $('progress').textContent=String(state.index+1).padStart(2,'0')+' / 12';
 $('track-fill').style.width=((state.index+1)/12*100)+'%';
 $('next').disabled=false;
 $('next').textContent=state.index===11?'完成阅读 →':'下一句 →';
 if(!state.seen.includes(l.id))state.seen.push(l.id);
 persist();
}
function updateCounts(){$('count').textContent=String(state.saved.length).padStart(2,'0');$('manuscript').hidden=!state.saved.length;$('continue').hidden=!state.seen.length}
function go(page,remember=true){
 stopPlayback();
 if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
 if(remember&&page!==state.page)state.history.push(state.page);
 state.page=page;
 document.querySelectorAll('.page').forEach(el=>el.hidden=el.id!==page);
 $('back').style.visibility=page==='home'?'hidden':'visible';
 $('back').disabled=page==='home';
 $('stage').dataset.mood='rain';
 $('stage').classList.toggle('story-mode',page==='story');
 $('location').textContent=page==='home'?'THE ARCHIVE · 23:47':page==='story'?'MANUSCRIPT · I':'PRIVATE ARCHIVE';
 updateCounts();
 if(page==='story')renderStory();
 if(page==='collection')renderCollection();
}
function back(){if(state.page==='home')return;const target=state.history.pop()||'home';go(target,false)}
function speak(text,done){if(!('speechSynthesis'in window)){toast('当前浏览器没有语音服务，将仅展示字幕');done?.();return}speechSynthesis.cancel();utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-GB';utterance.rate=state.rate||0.9;let voice=speechSynthesis.getVoices().find(v=>/^en-GB/.test(v.lang))||speechSynthesis.getVoices().find(v=>/^en/.test(v.lang));if(voice)utterance.voice=voice;utterance.onend=()=>done?.();utterance.onerror=()=>{toast('示范朗读不可用，字幕仍可使用');done?.()};speechSynthesis.speak(utterance)}
function play(){if(state.playing){stopPlayback();return}state.playing=true;$('play').textContent='暂停';$('play-state').textContent='播放中 · 合成语音示范';const current=state.index;let advanced=false;const advance=()=>{if(advanced)return;advanced=true;if(!state.playing||state.page!=='story'||state.index!==current)return;timer=setTimeout(()=>{if(!state.playing)return;if(state.index===11){stopPlayback();toast('这封信，终于有了自己的位置。');return}state.index++;renderStory();state.playing=false;play()},1800)};speak(LINES[current].en,advance)}
const WORDS={};
function study(id){
 stopPlayback();
 state.selected=id;
 const l=line();
 $('sheet-source').textContent=l.source+' / '+String(id).padStart(2,'0');
 $('line-en').textContent=l.en;
 $('line-zh').textContent=l.zh;
 $('line-note').textContent=l.note||'';
 $('line-craft').textContent=l.craft||'';
 $('line-grammar').textContent=l.grammar||'';
 $('line-echo').textContent=l.echo||'';
 $('word-meaning').textContent='点选下面的词语，看它在这句话里的意思。';
 $('voice-rate').value=String(state.rate);
 $('words').replaceChildren();
 (l.words||[]).forEach(w=>{
  const b=document.createElement('button');
  b.className='word-chip';
  b.textContent=w.term;
  b.onclick=()=>{$('word-meaning').textContent=w.meaning};
  $('words').append(b);
 });
 $('save-line').textContent=state.saved.includes(id)?'已收藏 ✓':'收藏台词';
 if(!$('study').open)$('study').showModal();
}
function renderCollection(){const rows=state.saved.map(id=>LINES.find(l=>l.id===id)).filter(Boolean).filter(l=>state.filter==='all'||(state.filter==='voice'?l.id===13:l.id!==13));$('collection-list').replaceChildren();if(!rows.length){let p=document.createElement('p');p.className='empty';p.textContent='这里还没有手稿。\n在剧情字幕或角色语音中，收藏一句愿意再听的英文。';$('collection-list').append(p);return}rows.forEach(l=>{let row=document.createElement('div');row.className='line-row';let n=document.createElement('span');n.textContent=String(l.id).padStart(2,'0');let b=document.createElement('button');b.textContent=l.en;let small=document.createElement('small');small.textContent=l.source+' · 展开学习与重听';b.append(small);b.onclick=()=>study(l.id);row.append(n,b);$('collection-list').append(row)})}
$('back').onclick=back;document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));$('enter').onclick=()=>{state.index=0;go('story')};$('continue').onclick=()=>go('story');$('play').onclick=play;$('next').onclick=advanceStory;$('subtitle').onclick=()=>study(state.index+1);$('archive').onclick=()=>study(state.index+1);$('voice').onclick=()=>study(13);$('manuscript').onclick=()=>go('collection');$('close-study').onclick=()=>$('study').close();$('study').addEventListener('close',()=>{stopPlayback();updateCounts();if(state.page==='collection')renderCollection()});$('save-line').onclick=()=>{if(!state.saved.includes(state.selected)){state.saved.push(state.selected);persist();updateCounts();$('save-line').textContent='已收藏 ✓';toast('已收入角色资料 · 声音手稿')}else toast('这句台词已经在手稿里了')};$('tts').onclick=()=>speak(line().en);document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderCollection()});
let dbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open('manuscript-recordings',1);req.onupgradeneeded=()=>req.result.createObjectStore('takes',{keyPath:'id',autoIncrement:true});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});dbPromise.catch(()=>{});
async function getTakes(){let db=await dbPromise;return new Promise((res,rej)=>{let q=db.transaction('takes').objectStore('takes').getAll();q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
let savedUrls=[];async function showTakes(){savedUrls.forEach(URL.revokeObjectURL);savedUrls=[];$('saved-takes').replaceChildren();try{const takes=(await getTakes()).filter(x=>x.line===state.selected);for(const t of takes){let el=document.createElement('div');el.className='saved';el.textContent='已保存 · '+new Date(t.date).toLocaleString();let a=document.createElement('audio');a.controls=true;const url=URL.createObjectURL(t.blob);savedUrls.push(url);a.src=url;el.append(a);$('saved-takes').append(el)}}catch{toast('录音存储不可用；请检查浏览器隐私设置')}}
function clearTake(){if(takeUrl)URL.revokeObjectURL(takeUrl);takeUrl=null;takeBlob=null;$('take').removeAttribute('src');$('take').hidden=true;$('save-record').disabled=true}
function cleanupRecord(){recordEpoch++;clearTimeout(recordTimer);if(recorder?.state==='recording')recorder.stop();stream?.getTracks().forEach(t=>t.stop());stream=null;clearTake();$('recording').classList.remove('recording');$('record').disabled=false;$('stop').disabled=true;savedUrls.forEach(URL.revokeObjectURL);savedUrls=[]}
$('studio').onclick=()=>{stopPlayback();$('record-line').textContent=line().en;$('record-status').textContent='轻声念出这句话。不评分，也不催促。';$('recording').showModal();showTakes()};$('close-recording').onclick=()=>$('recording').close();$('recording').addEventListener('close',cleanupRecord);
$('record').onclick=async()=>{if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('当前环境不支持录音，请通过启动脚本在 Edge 中打开');return}clearTake();$('record').disabled=true;const epoch=++recordEpoch;try{const acquired=await navigator.mediaDevices.getUserMedia({audio:true});if(epoch!==recordEpoch||!$('recording').open){acquired.getTracks().forEach(t=>t.stop());return}stream=acquired;recorder=new MediaRecorder(stream);const chunks=[];recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=()=>{stream?.getTracks().forEach(t=>t.stop());clearTimeout(recordTimer);if(epoch!==recordEpoch)return;takeBlob=new Blob(chunks,{type:recorder.mimeType});takeUrl=URL.createObjectURL(takeBlob);$('take').src=takeUrl;$('take').hidden=false;$('save-record').disabled=!takeBlob.size;$('record').disabled=false;$('stop').disabled=true;$('recording').classList.remove('recording');$('record-status').textContent=takeBlob.size?'录音已暂存。回听后，选择是否保存。':'未取得录音，请再试一次。'};recorder.start();$('stop').disabled=false;$('record-status').textContent='正在录音 · 点击停止结束（最长 60 秒）';$('recording').classList.add('recording');recordTimer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop()},60000)}catch{$('record').disabled=false;$('record-status').textContent='无法访问麦克风。请检查浏览器权限后重试。'}};
$('stop').onclick=()=>{if(recorder?.state==='recording')recorder.stop()};$('save-record').onclick=async()=>{if(!takeBlob?.size)return;const blob=takeBlob;$('save-record').disabled=true;try{const db=await dbPromise;await new Promise((res,rej)=>{let tx=db.transaction('takes','readwrite');tx.objectStore('takes').add({line:state.selected,blob,date:Date.now()});tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});toast('这一版录音已保存在本机');$('record-status').textContent='已保存。可以录制另一个版本。';showTakes()}catch{$('save-record').disabled=false;toast('保存失败，录音仍可回听')}};
$('settings').onclick=()=>$('info').showModal();$('close-info').onclick=()=>$('info').close();$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('stage').requestFullscreen()}catch{toast('当前浏览器不支持全屏')}};document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPlayback();if(recorder?.state==='recording')recorder.stop()}});window.addEventListener('pagehide',()=>{stopPlayback();stream?.getTracks().forEach(t=>t.stop())});go('home',false);

function renderSubtitleMode(){
 $('subtitle-zh').hidden=state.subtitleMode==='en';
 $('subtitle-en').hidden=state.subtitleMode==='zh';
 $('subtitle-mode').textContent='字幕：'+({both:'双语',zh:'中文',en:'英文'})[state.subtitleMode];
}
function advanceStory(){
 const resume=state.playing;stopPlayback();
 if(state.index>=11){showEnding();return}
 state.index++;renderStory();if(resume)play();
}
$('subtitle-mode').onclick=()=>{const modes=['both','zh','en'];state.subtitleMode=modes[(modes.indexOf(state.subtitleMode)+1)%3];renderSubtitleMode();persist()};
// Only the story backdrop advances: toolbar, dialogue, dialogs and selections never do.
$('story').addEventListener('click',e=>{
 if(state.page!=='story'||document.querySelector('dialog[open]'))return;
 if(e.target.closest('button,a,input,select,textarea,nav,.dialogue,.story-heading'))return;
 if(window.getSelection()?.toString())return;
 advanceStory();
});
document.addEventListener('keydown',e=>{
 if(state.page!=='story'||document.querySelector('dialog[open]')||e.repeat)return;
 if(e.target.closest('button,a,input,textarea,select,[contenteditable]'))return;
 if(e.code==='Space'||e.code==='ArrowRight'){e.preventDefault();advanceStory()}
});

function showEnding(){
 const rows=LINES.filter(l=>l.id!==13&&state.seen.includes(l.id));
 $('ending-echoes').replaceChildren();
 rows.forEach(l=>{
  const p=document.createElement('p');
  const n=document.createElement('span');
  n.textContent=String(l.id).padStart(2,'0')+'  ';
  p.append(n,document.createTextNode(l.echo||l.en));
  $('ending-echoes').append(p);
 });
 if(!$('ending').open)$('ending').showModal();
}
$('ending-close').onclick=()=>$('ending').close();
$('ending-back').onclick=()=>$('ending').close();
$('ending-restart').onclick=()=>{$('ending').close();state.index=0;renderStory();persist()};
$('ending-library').onclick=()=>{$('ending').close();go('collection')};
$('voice-rate').onchange=e=>{state.rate=Number(e.target.value)||0.9;persist()};
document.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{if(b.blur)b.blur()}));
