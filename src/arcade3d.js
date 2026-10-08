import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

const clay=(color,roughness=.68,metalness=.08)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const orange=clay(0xe77d32),dark=clay(0x141923),trim=clay(0xd8ab58,.36,.55),wood=clay(0xa3653e),teal=clay(0x236876),cream=clay(0xf8e4c4),blue=clay(0x132e4b),white=clay(0xffffff);
function mesh(scene,geometry,material,pos,receive=true){const m=new THREE.Mesh(geometry,material);m.position.set(...pos);m.castShadow=true;m.receiveShadow=receive;scene.add(m);return m}
function box(scene,w,h,d,material,pos){return mesh(scene,new THREE.BoxGeometry(w,h,d),material,pos)}
function stripe(scene,x,y,z,material){return box(scene,.08,.025,9.3,material,[x,y,z])}
function textPlane(scene,txt,x,y,z,size=.32,color='#f8e4c4'){const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle=color;g.font='bold 67px Arial';g.textAlign='center';g.fillText(txt,256,86);const tex=new THREE.CanvasTexture(c);const m=new THREE.Mesh(new THREE.PlaneGeometry(size*4,size),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));m.position.set(x,y,z);scene.add(m);return m}
export class Arcade3D{
  constructor(canvas,game,onResult){
    this.canvas=canvas;this.game=game;this.onResult=onResult;this.shots=[];this.disposed=false;this.ready=false;this.lastX=0;
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(game==='hoops'?0x102131:0x15323d);this.scene.fog=new THREE.Fog(this.scene.background,14,29);
    this.camera=new THREE.PerspectiveCamera(44,16/9,.07,75);this.camera.position.set(0,game==='hoops'?2.7:3.3,game==='hoops'?7.7:8.5);this.camera.lookAt(0,game==='hoops'?2.15:1.1,-2.8);
    this.scene.add(new THREE.HemisphereLight(0xc4e4ff,0x563423,2.25));
    const light=new THREE.DirectionalLight(0xffdfa7,3.5);light.position.set(-3,9,6);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-9;light.shadow.camera.right=9;light.shadow.camera.top=12;light.shadow.camera.bottom=-12;this.scene.add(light);
    const fill=new THREE.PointLight(0x259ad6,65,15);fill.position.set(3,4,-2);this.scene.add(fill);
    this.game==='hoops'?this.buildHoops():this.buildSkee();
    this.held=mesh(this.scene,new THREE.SphereGeometry(.25,32,24),game==='hoops'?orange:cream,[0,.55,4]);this.held.castShadow=true;
    this.heldLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),new THREE.LineDashedMaterial({color:0xffffff,dashSize:.17,gapSize:.15,opacity:.5,transparent:true}));this.scene.add(this.heldLine);
    this.initPhysics();
    this.resize();this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas.parentElement);
  }
  async initPhysics(){
    try{await RAPIER.init();if(this.disposed)return;this.world=new RAPIER.World({x:0,y:-9.81,z:0});this.world.integrationParameters.dt=1/60;this.buildColliders();this.ready=true}catch(e){console.error('Physics init failed',e);this.error=e}
  }
  buildHoops(){
    box(this.scene,5.8,.18,10.5,wood,[0,-.12,-.2]);box(this.scene,.12,2.4,10.5,dark,[-3,1.1,-.2]);box(this.scene,.12,2.4,10.5,dark,[3,1.1,-.2]);
    box(this.scene,.035,2.2,10.5,trim,[-2.93,1.35,-.2]);box(this.scene,.035,2.2,10.5,trim,[2.93,1.35,-.2]);
    box(this.scene,5.8,.15,.4,dark,[0,2.15,-5.25]);box(this.scene,3.5,2.8,.12,blue,[0,3.15,-5]);
    box(this.scene,2.55,1.8,.085,cream,[0,3.05,-4.87]);box(this.scene,1.3,.83,.09,dark,[0,2.94,-4.81]);
    const rim=mesh(this.scene,new THREE.TorusGeometry(.52,.055,12,72),orange,[0,2.52,-4.13]);rim.rotation.x=Math.PI/2;
    for(let i=0;i<14;i++){const a=i*Math.PI*2/14;const b=(i+.5)*Math.PI*2/14;const points=[new THREE.Vector3(.52*Math.cos(a),2.5,.52*Math.sin(a)-4.13),new THREE.Vector3(.4*Math.cos(b),2.04,.4*Math.sin(b)-4.13)];this.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xfaf0dc,transparent:true,opacity:.78})))}
    for(let i=0;i<18;i++)box(this.scene,5.5,.015,.08,i%2?trim:orange,[0,.01,4.5-i*.53]);
    const logo=box(this.scene,3.1,.7,.08,dark,[0,4.68,-5]);textPlane(this.scene,'HOOP DREAMS',0,4.62,-4.94,.34);
    this.hoop={x:0,y:2.52,z:-4.13,radius:.52};
  }
  buildSkee(){
    box(this.scene,5.6,.25,11,wood,[0,-.2,-.2]);box(this.scene,.21,.58,11,teal,[-2.75,.28,-.2]);box(this.scene,.21,.58,11,teal,[2.75,.28,-.2]);
    stripe(this.scene,-2.55,.02,0,trim);stripe(this.scene,2.55,.02,0,trim);
    box(this.scene,4.9,.1,3,teal,[0,.35,-4.14]).rotation.x=-.2;
    box(this.scene,5.1,2.75,.13,blue,[0,1.7,-5.4]);
    const cups=[[0,2.22,50],[-1.92,2.48,100],[1.92,2.48,100],[0,1.68,40],[0,1.11,30],[-1.14,.75,20],[1.14,.75,20],[0,.46,10]];
    this.targets=cups.map(([x,y,p])=>{const z=-5.23;const outer=mesh(this.scene,new THREE.TorusGeometry(p===100?.39:.43,.10,12,44),trim,[x,y,z]);const back=mesh(this.scene,new THREE.CircleGeometry(p===100?.33:.36,44),dark,[x,y,z-.03]);textPlane(this.scene,String(p),x,y,z+.04,.27);return {x,y,z,p,r:.35}});
    textPlane(this.scene,'SKEE-BALL',0,3.85,-5.1,.45);
    for(let z=4;z>-4;z-=.4){box(this.scene,4.8,.008,.009,z%1<.2?trim:wood,[0,-.065,z])}
  }
  buildColliders(){
    const ground=this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0,-.26,0));this.world.createCollider(RAPIER.ColliderDesc.cuboid(2.8,.16,5.6).setFriction(.62).setRestitution(.35),ground);
    for(const x of [-2.9,2.9]){const body=this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x,.65,0));this.world.createCollider(RAPIER.ColliderDesc.cuboid(.12,.75,5.6).setRestitution(.7),body)}
    if(this.game==='hoops'){const back=this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0,3.05,-4.83));this.world.createCollider(RAPIER.ColliderDesc.cuboid(1.29,.9,.06).setRestitution(.64),back);
      for(let i=0;i<18;i++){const a=i*Math.PI*2/18;const body=this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(.52*Math.cos(a),2.52,-4.13+.52*Math.sin(a)));this.world.createCollider(RAPIER.ColliderDesc.ball(.065).setRestitution(.72),body)}}
  }
  resize(){if(this.disposed)return;const w=this.canvas.clientWidth||960,h=this.canvas.clientHeight||540;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix()}
  update(dt,aim,power,holding,handPos){if(this.disposed)return;this.resizeIfNeeded();const x=(aim-.5)*3.9;const y=holding&&handPos?Math.max(.46,3.6-(handPos.y/562)*3):.5;const z=holding?3.5:4.5;this.held.visible=true;this.held.position.set(x,y,z);
    const p=this.heldLine.geometry.attributes.position;p.setXYZ(0,x,y,z);p.setXYZ(1,x*.26,this.game==='hoops'?2.5:1,-4.1);p.needsUpdate=true;this.heldLine.computeLineDistances();
    if(this.ready){this.acc=(this.acc||0)+Math.min(dt,.05);let loops=0;while(this.acc>=1/60&&loops++<4){this.world.step();this.acc-=1/60}}
    for(let i=this.shots.length-1;i>=0;i--){const shot=this.shots[i];shot.time+=dt;if(this.ready){const p=shot.body.translation(),v=shot.body.linvel();shot.mesh.position.set(p.x,p.y,p.z);shot.mesh.rotation.x+=dt*3;shot.mesh.rotation.z+=dt*1.7;if(this.game==='hoops'){const h=this.hoop;if(!shot.finished&&shot.prevY>h.y&&p.y<=h.y&&v.y<0&&Math.hypot(p.x-h.x,p.z-h.z)<h.radius-.1){shot.hit=true;shot.finished=true;shot.swish=!shot.wall;this.onResult({hit:true,swish:shot.swish},shot)}}else if(!shot.finished&&p.z<=-4.9){const valid=this.targets.filter(t=>Math.hypot(p.x-t.x,p.y-t.y)<t.r);shot.hit=valid.length?valid.sort((a,b)=>b.p-a.p)[0].p:0;shot.finished=true;this.onResult({hit:shot.hit},shot)}shot.prevY=p.y}
      if(shot.time>5||shot.mesh.position.y<-.8||shot.mesh.position.z<-6.5){if(!shot.finished)this.onResult({hit:false},shot);this.scene.remove(shot.mesh);shot.mesh.geometry.dispose();this.world?.removeRigidBody(shot.body);this.shots.splice(i,1)}}
    this.renderer.render(this.scene,this.camera)}
  resizeIfNeeded(){const w=this.canvas.clientWidth,h=this.canvas.clientHeight;if(w!==this._w||h!==this._h){this._w=w;this._h=h;this.resize()}}
  launch(aim,power,velocity={}){if(!this.ready)return false;const x=(aim-.5)*3.9,z=4.2;const body=this.world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(x,.62,z).setCcdEnabled(true));this.world.createCollider(RAPIER.ColliderDesc.ball(.25).setRestitution(.58).setFriction(.6).setDensity(1.6),body);const side=Math.max(-2,Math.min(2,velocity.vx||0));const lift=Math.max(0,-(velocity.vy||0));const p=Math.max(.2,Math.min(1,power));body.setLinvel({x:(-x*.25)+side*.28,y:this.game==='hoops'?6.3+3.0*p+lift*.22:2.7+2*p,z:-(this.game==='hoops'?9+2*p:8+2.5*p)},true);body.setAngvel({x:-7,y:2,z:1},true);
    const b=mesh(this.scene,new THREE.SphereGeometry(.25,24,20),this.game==='hoops'?orange:cream,[x,.62,z]);const shot={body,mesh,time:0,finished:false,hit:false,swish:false,wall:false,prevY:.62};this.shots.push(shot);return true}
  dispose(){this.disposed=true;this.resizeObserver?.disconnect();this.world?.free();this.scene.traverse(o=>{o.geometry?.dispose?.()});this.renderer.dispose()}
}
