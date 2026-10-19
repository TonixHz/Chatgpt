export function createMaterials(THREE){
 const mats={};
 function material(color,roughness=1,emissive=0){const k=color+'-'+roughness+'-'+emissive;if(!mats[k])mats[k]=new THREE.MeshStandardMaterial({color,roughness,emissive,emissiveIntensity:.2});return mats[k]}
 function surfaceTexture(base,kind='wall'){
  const c=document.createElement('canvas');c.width=128;c.height=128;const g=c.getContext('2d');g.fillStyle=base;g.fillRect(0,0,128,128);
  if(kind==='wall'){for(let y=0;y<128;y+=32){g.fillStyle='rgba(0,0,0,.24)';g.fillRect(0,y,128,2);for(let x=((y/32)%2)*32;x<128;x+=64){g.fillRect(x,y,2,32);g.fillStyle='rgba(180,190,170,.08)';g.fillRect(x+3,y+3,58,1)}}}
  if(kind==='floor'){for(let i=0;i<220;i++){g.fillStyle=Math.random()>.5?'rgba(210,210,190,.09)':'rgba(0,0,0,.18)';g.fillRect(Math.random()*128,Math.random()*128,1+Math.random()*5,1+Math.random()*2)}for(let y=0;y<128;y+=32){g.fillStyle='rgba(0,0,0,.24)';g.fillRect(0,y,128,2)}}
  if(kind==='metal'){for(let i=0;i<100;i++){g.fillStyle=Math.random()>.5?'rgba(190,190,170,.13)':'rgba(0,0,0,.2)';g.fillRect(Math.random()*128,Math.random()*128,1+Math.random()*4,1+Math.random()*10)}g.fillStyle='rgba(100,45,28,.42)';for(let i=0;i<18;i++)g.fillRect(Math.random()*128,Math.random()*128,2+Math.random()*5,2+Math.random()*8)}
  if(kind==='wood'){for(let y=0;y<128;y+=32){g.fillStyle='rgba(20,12,7,.45)';g.fillRect(0,y,128,2);for(let i=0;i<20;i++){g.fillStyle='rgba(25,14,7,.2)';g.fillRect(Math.random()*128,y+Math.random()*30,8+Math.random()*30,1)}}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestMipmapNearestFilter;return t;
 }
 function textured(color,kind,roughness=1){const m=material(color,roughness);if(!m.map){m.map=surfaceTexture(color,kind);m.needsUpdate=true}return m}
 return {material,textured};
}
