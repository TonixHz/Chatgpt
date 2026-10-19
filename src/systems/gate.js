export function createGateController({colliders}){
 let gate=null,collider=null,open=false;
 function register(gateObject){
  gate=gateObject;collider={x:0,z:-20.75,hx:1.28,hz:.22};colliders.push(collider);open=false;
 }
 function update(dt,openRequested){
  if(!gate||!openRequested||open)return;
  gate.position.y=Math.min(3.25,gate.position.y+dt*2.4);
  if(gate.position.y>=2.85){
   open=true;
   if(collider){const i=colliders.indexOf(collider);if(i>=0)colliders.splice(i,1);collider=null}
  }
 }
 function isOpen(){return open}
 return {register,update,isOpen};
}
