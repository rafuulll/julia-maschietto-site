import * as THREE from './assets/vendor/three.module.min.js';

// A local WebGL scene: a real extruded card, a flexible strap and pointer physics.
// No React runtime. Photograph stays the supplied, identity-preserving hero edit.
export async function createBadge(host) {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000,0);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const canvas=renderer.domElement;
  canvas.setAttribute('aria-hidden','true');
  host.prepend(canvas);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(40,1,.1,40);
  camera.position.set(0,.8,8.5);camera.lookAt(0,.8,0);
  scene.add(new THREE.HemisphereLight(0xffffff,0xd5c6bf,2.3));
  const key=new THREE.DirectionalLight(0xfff7ef,3.1);
  key.position.set(-3,4,7);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);
  key.shadow.camera.left=-5;key.shadow.camera.right=5;
  key.shadow.camera.top=6;key.shadow.camera.bottom=-4;
  key.shadow.normalBias=.035;key.shadow.bias=-.0001;
  scene.add(key);
  const fill=new THREE.DirectionalLight(0xffffff,1.3);fill.position.set(4,1,3);scene.add(fill);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.13}));
  shadow.position.set(.1,0,-.25);shadow.receiveShadow=true;scene.add(shadow);

  const image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=new URL('./assets/hero-julia.webp',import.meta.url).href;});
  const print=document.createElement('canvas');print.width=1024;print.height=1434;
  const ctx=print.getContext('2d');
  ctx.fillStyle='#fbfaf7';ctx.fillRect(0,0,1024,1434);
  ctx.save();ctx.beginPath();ctx.roundRect(46,75,932,900,28);ctx.clip();
  // Object-fit: cover, right aligned, applied live to the existing photograph.
  const scale=Math.max(932/image.width,900/image.height);
  const dw=image.width*scale,dh=image.height*scale;
  ctx.drawImage(image,46+932-dw,75+(900-dh)*.35,dw,dh);ctx.restore();
  ctx.fillStyle='#0a0f15';ctx.font='500 65px Manrope, sans-serif';ctx.fillText('Julia Maschietto',58,1100);
  ctx.fillStyle='#721919';ctx.fillRect(58,1145,90,3);
  ctx.font='400 25px Manrope, sans-serif';ctx.fillText('Estratégia de marca',58,1210);
  ctx.fillText('Conteúdo e direção criativa',58,1258);
  ctx.fillStyle='#73645e';ctx.font='400 19px Manrope, sans-serif';ctx.fillText('Escuta. Repertório. Intenção.',58,1360);
  const texture=new THREE.CanvasTexture(print);texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());

  const width=2.55,height=3.55,radius=.13;
  function rounded(w,h,r) {
    const x=-w/2,y=-h/2,s=new THREE.Shape();
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
    s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
  }
  const shape=rounded(width,height,radius);
  const card=new THREE.Group();scene.add(card);
  const bodyGeometry=new THREE.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.015,bevelThickness:.015,curveSegments:16});
  bodyGeometry.translate(0,0,-.025);
  const body=new THREE.Mesh(bodyGeometry,new THREE.MeshStandardMaterial({color:0xf8f6f1,roughness:.68,metalness:.03}));
  body.castShadow=true;card.add(body);
  const faceGeometry=new THREE.ShapeGeometry(shape,20);
  const positions=faceGeometry.attributes.position,uv=faceGeometry.attributes.uv;
  for(let i=0;i<positions.count;i++)uv.setXY(i,(positions.getX(i)+width/2)/width,(positions.getY(i)+height/2)/height);
  const face=new THREE.Mesh(faceGeometry,new THREE.MeshBasicMaterial({map:texture}));face.position.z=.043;card.add(face);
  const metal=new THREE.MeshStandardMaterial({color:0xc8c6c1,metalness:.85,roughness:.27});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.09,.022,10,24),metal);ring.position.set(0,height/2+.13,.015);ring.castShadow=true;card.add(ring);
  const clamp=new THREE.Mesh(new THREE.BoxGeometry(.17,.23,.065),metal);clamp.position.set(0,height/2+.27,0);card.add(clamp);

  const strapCanvas=document.createElement('canvas');strapCanvas.width=128;strapCanvas.height=256;
  const sc=strapCanvas.getContext('2d');sc.fillStyle='#721919';sc.fillRect(0,0,128,256);
  sc.strokeStyle='rgba(244,223,216,.28)';sc.lineWidth=2;sc.setLineDash([5,5]);
  sc.beginPath();sc.moveTo(10,0);sc.lineTo(10,256);sc.moveTo(118,0);sc.lineTo(118,256);sc.stroke();
  const strapTexture=new THREE.CanvasTexture(strapCanvas);strapTexture.colorSpace=THREE.SRGBColorSpace;
  strapTexture.wrapT=THREE.RepeatWrapping;
  const segments=48,bandGeometry=new THREE.BufferGeometry();
  const bandPositions=new Float32Array((segments+1)*6),bandUV=new Float32Array((segments+1)*4),indices=[];
  for(let i=0;i<=segments;i++){
    bandUV[i*4]=0;bandUV[i*4+1]=i/segments*4;bandUV[i*4+2]=1;bandUV[i*4+3]=i/segments*4;
    if(i<segments){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
  }
  bandGeometry.setAttribute('position',new THREE.BufferAttribute(bandPositions,3).setUsage(THREE.DynamicDrawUsage));
  bandGeometry.setAttribute('uv',new THREE.BufferAttribute(bandUV,2));bandGeometry.setIndex(indices);
  const band=new THREE.Mesh(bandGeometry,new THREE.MeshStandardMaterial({map:strapTexture,roughness:.95,side:THREE.DoubleSide}));
  band.frustumCulled=false;scene.add(band);
  const nodeCount=7,link=.31,anchor=new THREE.Vector3(0,3.2,0);
  // Visible wall bracket: the strap has a physical attachment inside the frame.
  const bracket=new THREE.Mesh(new THREE.BoxGeometry(.76,.13,.10),metal);
  bracket.position.copy(anchor);scene.add(bracket);
  const screwMaterial=new THREE.MeshStandardMaterial({color:0x777572,metalness:.7,roughness:.4});
  for(const x of [-.27,.27]){
    const screw=new THREE.Mesh(new THREE.SphereGeometry(.025,12,8),screwMaterial);
    screw.position.set(x,anchor.y,.065);scene.add(screw);
  }
  const nodes=Array.from({length:nodeCount},(_,i)=>({p:anchor.clone().add(new THREE.Vector3(0,-link*i,0)),old:anchor.clone().add(new THREE.Vector3(0,-link*i,0))}));
  const curve=new THREE.CatmullRomCurve3(nodes.map(n=>n.p));
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
  const point=new THREE.Vector3(),dragOffset=new THREE.Vector3(),dragTarget=new THREE.Vector3();
  const handle=host.querySelector('.badge-handle');
  let dragging=false,visible=false,raf=0,lastTime=0,lastEnergy=2,angle=-.045,angleVelocity=0,yaw=0;
  let pointerTilt=0,pointerPitch=0,downX=0,downY=0,moved=false;
  const end=nodes.at(-1),attachOffset=new THREE.Vector3(0,height/2+.38,0);
  let currentHandle={x:0,y:0,w:0,h:0};
  const vector=new THREE.Vector3(),tangent=new THREE.Vector3(),normal=new THREE.Vector3();

  function projectPointer(event){
    const rect=canvas.getBoundingClientRect();
    pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    ray.setFromCamera(pointer,camera);return ray.ray.intersectPlane(plane,point);
  }
  function begin(event){
    if(event.button!==undefined&&event.button!==0)return;
    if(!projectPointer(event))return;
    ray.setFromCamera(pointer,camera);
    if(!ray.intersectObject(card,true).length)return;
    event.preventDefault();dragging=true;moved=false;downX=event.clientX;downY=event.clientY;
    dragOffset.copy(end.p).sub(point);dragTarget.copy(end.p);
    handle.setPointerCapture(event.pointerId);handle.classList.add('is-dragging');host.dataset.dragging='true';wake();
  }
  function move(event){
    if(dragging){
      if(!projectPointer(event))return;
      dragTarget.copy(point).add(dragOffset);
      dragTarget.x=THREE.MathUtils.clamp(dragTarget.x,-.65,.65);
      dragTarget.y=THREE.MathUtils.clamp(dragTarget.y,1.15,1.8);
      const reach=dragTarget.clone().sub(anchor),max=link*(nodeCount-1)*1.16;
      if(reach.length()>max)dragTarget.copy(anchor).add(reach.setLength(max));
      dragTarget.z=0;
      moved ||= Math.hypot(event.clientX-downX,event.clientY-downY)>5;
      event.preventDefault();wake();
    }else{
      const rect=handle.getBoundingClientRect();
      pointerTilt=((event.clientX-rect.left)/rect.width-.5)*.22;
      pointerPitch=((event.clientY-rect.top)/rect.height-.5)*.09;wake();
    }
  }
  function finish(event){
    if(!dragging)return;
    dragging=false;handle.classList.remove('is-dragging');host.dataset.dragging='false';
    if(handle.hasPointerCapture(event.pointerId))handle.releasePointerCapture(event.pointerId);
    if(!moved)angleVelocity+=.22;
    wake();
  }
  handle.addEventListener('pointerdown',begin);handle.addEventListener('pointermove',move);
  handle.addEventListener('pointerup',finish);handle.addEventListener('pointercancel',finish);
  handle.addEventListener('pointerleave',()=>{if(!dragging){pointerTilt=0;pointerPitch=0;wake();}});
  handle.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter',' ','Home','Escape'].includes(event.key))return;
    event.preventDefault();
    if(event.key==='Home'||event.key==='Escape'){nodes.forEach((n,i)=>{n.p.copy(anchor).add(new THREE.Vector3(0,-link*i,0));n.old.copy(n.p);});angle=0;angleVelocity=0;}
    else if(event.key==='ArrowLeft'||event.key==='ArrowRight'){end.old.x+=(event.key==='ArrowLeft'?.025:-.025);angleVelocity+=(event.key==='ArrowLeft'?-.22:.22);}
    else angleVelocity+=.28;
    wake();
  });
  function simulate(dt){
    const h=Math.min(dt,1/30)/2;
    for(let sub=0;sub<2;sub++){
      nodes[0].p.copy(anchor);nodes[0].old.copy(anchor);
      for(let i=1;i<nodeCount;i++){
        const n=nodes[i];if(dragging&&i===nodeCount-1){n.old.copy(n.p);n.p.copy(dragTarget);continue;}
        vector.copy(n.p).sub(n.old).multiplyScalar(.982);vector.clampLength(0,.14);
        n.old.copy(n.p);n.p.add(vector);n.p.y-=14*h*h;
      }
      const stretch=dragging?Math.max(1,dragTarget.distanceTo(anchor)/(link*(nodeCount-1))):1;
      for(let iteration=0;iteration<14;iteration++){
        for(let i=0;i<nodeCount-1;i++){
          const a=nodes[i],b=nodes[i+1];vector.copy(b.p).sub(a.p);
          const length=vector.length()||.0001,correction=(length-link*stretch)/length;
          const wa=i===0?0:1,wb=dragging&&i+1===nodeCount-1?0:(i+1===nodeCount-1?.12:1),sum=wa+wb;
          if(!sum)continue;
          a.p.addScaledVector(vector,correction*wa/sum);b.p.addScaledVector(vector,-correction*wb/sum);
        }
        nodes[0].p.copy(anchor);if(dragging)end.p.copy(dragTarget);
      }
    }
    end.p.x=THREE.MathUtils.clamp(end.p.x,-.68,.68);
    end.p.y=THREE.MathUtils.clamp(end.p.y,1.15,1.8);
    vector.copy(end.p).sub(nodes.at(-2).p);
    const desired=Math.max(-.13,Math.min(.13,Math.atan2(vector.x,-vector.y)*.3));
    angleVelocity+=(desired-angle)*25*dt;angleVelocity*=Math.exp(-5*dt);angle+=angleVelocity*dt;
    yaw+=(pointerTilt+Math.max(-.32,Math.min(.32,(end.p.x-end.old.x)*9))-yaw)*Math.min(1,dt*7);
    angle=THREE.MathUtils.clamp(angle,-.16,.16);
    card.rotation.set(pointerPitch,yaw,angle);
    card.position.copy(end.p).sub(attachOffset.clone().applyEuler(card.rotation));
    let energy=Math.abs(angleVelocity)+Math.abs(angle-desired)+Math.abs(yaw-pointerTilt);
    nodes.forEach(n=>energy+=n.p.distanceTo(n.old));return energy;
  }
  function updateStrap(){
    for(let i=0;i<=segments;i++){
      const t=i/segments;curve.getPoint(t,vector);curve.getTangent(t,tangent);
      normal.set(-tangent.y,tangent.x,0).normalize().multiplyScalar(.052);
      const index=i*6;
      bandPositions[index]=vector.x+normal.x;bandPositions[index+1]=vector.y+normal.y;bandPositions[index+2]=vector.z+.006;
      bandPositions[index+3]=vector.x-normal.x;bandPositions[index+4]=vector.y-normal.y;bandPositions[index+5]=vector.z+.006;
    }
    bandGeometry.attributes.position.needsUpdate=true;bandGeometry.computeVertexNormals();
  }
  function updateHandle(){
    card.updateMatrixWorld();
    const projected=[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]].map(([x,y])=>new THREE.Vector3(x,y,.06).applyMatrix4(card.matrixWorld).project(camera));
    const w=host.clientWidth,h=host.clientHeight;
    const left=Math.min(...projected.map(p=>(p.x+1)*w/2)),right=Math.max(...projected.map(p=>(p.x+1)*w/2));
    const top=Math.min(...projected.map(p=>(1-p.y)*h/2)),bottom=Math.max(...projected.map(p=>(1-p.y)*h/2));
    const next={x:left,y:top,w:right-left,h:bottom-top};
    if(Math.abs(next.w-currentHandle.w)>.3)handle.style.width=`${next.w.toFixed(2)}px`;
    if(Math.abs(next.h-currentHandle.h)>.3)handle.style.height=`${next.h.toFixed(2)}px`;
    handle.style.transform=`translate3d(${left.toFixed(2)}px,${top.toFixed(2)}px,0)`;currentHandle=next;
  }
  function render(){updateStrap();renderer.render(scene,camera);updateHandle();}
  function tick(time){
    raf=0;if(!visible||document.hidden)return;
    const dt=lastTime?Math.min(.033,(time-lastTime)/1000):.016;lastTime=time;
    lastEnergy=simulate(dt);render();
    if(dragging||lastEnergy>.0008||Math.abs(yaw-pointerTilt)>.0008)raf=requestAnimationFrame(tick);
  }
  function wake(){if(visible&&!document.hidden&&!raf){lastTime=0;raf=requestAnimationFrame(tick);}}
  function resize(){
    const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
    renderer.setSize(w,h,false);camera.aspect=w/h;
    // Fit the entire bracket, strap and card; preserve a safe drag margin.
    const visibleHeight=Math.max(7,4.4/camera.aspect);
    camera.position.set(0,.35,visibleHeight/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))));
    camera.lookAt(0,.35,0);camera.updateProjectionMatrix();render();wake();
  }
  // Settle to a quiet initial pose; reduced motion does not auto-swing.
  for(let i=0;i<160;i++)simulate(.016);
  if(!reduce.matches){nodes.at(-1).old.x-=.012;angleVelocity=.12;}
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0;lastTime=0;}},{rootMargin:'30px'}).observe(host);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);raf=0;host.classList.remove('is-ready');handle.hidden=true;host.dataset.state='fallback';});
  reduce.addEventListener('change',()=>{pointerTilt=0;pointerPitch=0;if(reduce.matches)angleVelocity=0;wake();});
  host.classList.add('is-ready');host.dataset.state='ready';handle.hidden=false;resize();
}
