// Entrada de teclado y ratón aislada del ciclo de juego.
export function bindKeyboardAndMouse({keys,getState,interact,pause,clamp,toggleFlashlight}){
 document.addEventListener('keydown',e=>{
  keys[e.code]=true;
  if(e.code==='KeyE')interact();
  if(e.code==='KeyF')toggleFlashlight();
  if(e.code==='Escape'&&getState().started)pause();
 });
 document.addEventListener('keyup',e=>{keys[e.code]=false});
 document.addEventListener('mousemove',e=>{
  const {started,renderer,player}=getState();
  if(!started||document.pointerLockElement!==renderer?.domElement)return;
  player.yaw-=e.movementX*.0022;
  player.pitch=clamp(player.pitch-e.movementY*.0022,-1.35,1.35);
 });
}
