export function createInteractionSystem({THREE,getState,setTarget}){
 function interact(){
  const s=getState();if(!s.started)return;
  let target=s.interactTarget;
  if(!target){
   const nearby=s.interactables.map(o=>({o,d:Math.hypot(s.player.pos.x-o.position.x,s.player.pos.z-o.position.z)})).filter(v=>v.d<3.2);
   const exit=nearby.find(v=>v.o.name==='exit'&&v.d<2.8&&s.player.pos.z<-18.7);
   nearby.sort((a,b)=>a.d-b.d);target=exit?.o||nearby[0]?.o||null;
  }
  if(target?.userData.callback){target.userData.callback();s.prompt.textContent='';setTarget(null)}
 }
 function updateInteraction(){
  const s=getState();if(!s.camera||!s.player)return;
  s.raycaster.setFromCamera(new THREE.Vector2(0,0),s.camera);
  const hits=s.raycaster.intersectObjects(s.interactables,false),hit=hits.find(h=>h.distance<3.8&&h.object.userData.callback);
  if(hit){setTarget(hit.object);s.prompt.textContent=hit.object.userData.label}else{setTarget(null);s.prompt.textContent=''}
 }
 return {interact,updateInteraction};
}
