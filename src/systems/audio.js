export function createAudioSystem({getState,clamp}){
 let audioCtx=null,audioMaster=null,monsterToneGain=null,stepTimer=0,monsterTone=null,heartbeatTimer=0;
 function initAudio(){
  if(audioCtx){if(audioCtx.state==='suspended')audioCtx.resume();return}
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  try{audioCtx=new AC();audioMaster=audioCtx.createGain();audioMaster.gain.value=.55;audioMaster.connect(audioCtx.destination);monsterTone=audioCtx.createOscillator();monsterTone.type='sine';monsterTone.frequency.value=36;monsterToneGain=audioCtx.createGain();monsterToneGain.gain.value=0;monsterTone.connect(monsterToneGain);monsterToneGain.connect(audioMaster);monsterTone.start()}catch(e){audioCtx=null}
 }
 function playStep(sprinting){
  if(!audioCtx||audioCtx.state!=='running')return;
  const duration=sprinting?.16:.12,buffer=audioCtx.createBuffer(1,Math.floor(audioCtx.sampleRate*duration),audioCtx.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);
  const src=audioCtx.createBufferSource(),filter=audioCtx.createBiquadFilter(),gain=audioCtx.createGain(),now=audioCtx.currentTime;
  src.buffer=buffer;filter.type='lowpass';filter.frequency.value=sprinting?380:260;gain.gain.setValueAtTime(sprinting?.16:.09,now);gain.gain.exponentialRampToValueAtTime(.001,now+duration);src.connect(filter);filter.connect(gain);gain.connect(audioMaster);src.start(now);src.stop(now+duration);
 }
 function audioCue(freq=180,duration=.25,volume=.06,type='sine'){
  if(!audioCtx||audioCtx.state!=='running')return;
  const o=audioCtx.createOscillator(),g=audioCtx.createGain(),now=audioCtx.currentTime;o.type=type;o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(Math.max(25,freq*.55),now+duration);g.gain.setValueAtTime(volume,now);g.gain.exponentialRampToValueAtTime(.001,now+duration);o.connect(g);g.connect(audioMaster);o.start(now);o.stop(now+duration+.02);
 }
 function updateAudio(dt){
  if(!audioCtx||audioCtx.state!=='running')return;
  const {world,monster,player}=getState(),moving=!!world.isMoving,sprinting=!!world.isSprinting;
  if(moving){stepTimer-=dt;if(stepTimer<=0){playStep(sprinting);stepTimer=sprinting?.29:.46}}else stepTimer=Math.min(stepTimer,.08);
  let proximity=0;if(world.monsterAwake&&monster&&player)proximity=clamp(1-Math.hypot(player.pos.x-monster.position.x,player.pos.z-monster.position.z)/10,0,1);
  if(monsterToneGain){const target=proximity*proximity*.13;monsterToneGain.gain.setTargetAtTime(target,audioCtx.currentTime,.18);if(monsterTone)monsterTone.frequency.setTargetAtTime(34+proximity*18,audioCtx.currentTime,.25)}
  if(proximity>.4){heartbeatTimer-=dt;if(heartbeatTimer<=0){audioCue(68,.13,.055,'sine');heartbeatTimer=1.15-proximity*.55}}else heartbeatTimer=0;
 }
 return {initAudio,playStep,audioCue,updateAudio};
}
