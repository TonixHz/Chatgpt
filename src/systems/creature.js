export function createCreatureSystem({THREE,getState,blocked,say,audioCue,finish,$,clamp}){
function findMonsterPath(sx,sz,tx,tz){const step=.8,minX=-11.2,minZ=-49.6,nx=29,nz=63;const cell=(x,z)=>({x:clamp(Math.round((x-minX)/step),0,nx-1),z:clamp(Math.round((z-minZ)/step),0,nz-1)}),pos=(x,z)=>({x:minX+x*step,z:minZ+z*step}),key=(x,z)=>x+','+z;let s=cell(sx,sz),t=cell(tx,tz);const walk=(x,z)=>{const p=pos(x,z);return !blocked(p.x,p.z)};const nearest=c=>{if(walk(c.x,c.z))return c;for(let rad=1;rad<6;rad++)for(let dz=-rad;dz<=rad;dz++)for(let dx=-rad;dx<=rad;dx++){const x=c.x+dx,z=c.z+dz;if(x>=0&&x<nx&&z>=0&&z<nz&&walk(x,z))return{x,z}}return c};s=nearest(s);t=nearest(t);const queue=[s],prev=new Map([[key(s.x,s.z),null]]);let found=false;for(let i=0;i<queue.length&&i<1900;i++){const c=queue[i];if(c.x===t.x&&c.z===t.z){found=true;break}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=c.x+dx,z=c.z+dz,k=key(x,z);if(x<0||x>=nx||z<0||z>=nz||prev.has(k)||!walk(x,z))continue;prev.set(k,key(c.x,c.z));queue.push({x,z})}}if(!found)return[];const path=[];let k=key(t.x,t.z);while(k){const [x,z]=k.split(',').map(Number);path.push(pos(x,z));k=prev.get(k)}path.reverse();return path.slice(1)}
function updateMonster(dt){
 const {world,player,monster,camera,flashlightOn,battery,exitPending}=getState();
 if(!world.monsterAwake)return;
 monster.visible=true;world.elapsed+=dt;
 const dx=player.pos.x-monster.position.x,dz=player.pos.z-monster.position.z,d=Math.hypot(dx,dz);
 const toMonster=monster.position.clone().sub(camera.position).normalize(),lookDir=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
 const lightOnTarget=flashlightOn&&battery>0&&d<13&&lookDir.dot(toMonster)>.91;
 world.lightTarget=lightOnTarget;
 if(lightOnTarget){world.lastNoise=player.pos.clone();world.aiMode='investigating';world.investigateTimer=5.5;if(!world.seenMonster){world.seenMonster=true;say('La luz la alteró. Está siguiendo el calor: apagá la linterna.');audioCue(115,.35,.04,'triangle')}}
 if(world.lastNoise){world.aiMode='investigating';world.investigateTimer=Math.max(world.investigateTimer,3.5)}
 else if(world.investigateTimer>0){world.investigateTimer-=dt;world.aiMode='searching'}
 else world.aiMode='roaming';
 if(!world.roamTarget||Math.hypot(monster.position.x-world.roamTarget.x,monster.position.z-world.roamTarget.z)<.65){world.roamTarget=new THREE.Vector3((Math.random()*12.5)-6.25,0,-1-Math.random()*17)}
 let target=world.roamTarget;
 if(world.lastNoise){target=world.lastNoise;if(monster.position.distanceTo(target)<1.05){world.lastNoise=null;world.investigateTimer=4.2;world.aiMode='searching';target=world.roamTarget}}
 else if(world.aiMode==='searching')target=world.roamTarget;
 world.pathTimer-=dt;
 if(world.pathTimer<=0||!world.path.length){world.path=findMonsterPath(monster.position.x,monster.position.z,target.x,target.z);world.pathTimer=lightOnTarget ? .24 : .72}
 const node=world.path[0];
 if(node){const tx=node.x-monster.position.x,tz=node.z-monster.position.z,td=Math.hypot(tx,tz),speed=lightOnTarget?world.monsterSpeed*2.15:world.aiMode==='investigating'?world.monsterSpeed*1.35:world.monsterSpeed*.52;if(td<.2)world.path.shift();else if(td>0){const mx=tx/td*speed*dt,mz=tz/td*speed*dt;if(!blocked(monster.position.x+mx,monster.position.z))monster.position.x+=mx;if(!blocked(monster.position.x,monster.position.z+mz))monster.position.z+=mz}}
 monster.lookAt(target.x,1.3,target.z);
 const near=clamp(1-d/9,0,1);$('vignette').style.background='radial-gradient(ellipse at center, transparent '+(35-near*20)+'%, rgba(0,0,0,'+(.6+near*.3)+') 100%)';$('vignette').style.boxShadow=near>.25?'inset 0 0 '+Math.round(near*70)+'px rgba(150,20,15,'+(near*.45)+')':'none';
 if(near>.55&&flashlightOn){world.flashFlicker-=dt;if(world.flashFlicker<=0){world.flashFlicker=.06+Math.random()*.2;world.flashMultiplier=Math.random()<.35?0:.12+Math.random()*.3}}else world.flashMultiplier=1;
 if(d<1.25&&!exitPending)finish('NO ESTABAS SOLO','La señal se cortó. El último archivo recuperado contiene 14 segundos de estática.\\n\\nREGISTRO 01: CORRUPTO.')
}

 return {findMonsterPath,updateMonster};
}
