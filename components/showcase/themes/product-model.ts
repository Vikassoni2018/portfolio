import {
  AmbientLight, CatmullRomCurve3, DirectionalLight, Group, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Scene, SphereGeometry, SRGBColorSpace, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer
} from "three";

export type ProductModel = {
  dispose: () => void;
  setColor: (color: string) => void;
  rotate: (amount: number) => void;
};

export function mountProductModel(target: HTMLDivElement, finish: string): ProductModel | undefined {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true });
  if (!context) return;
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas, context });
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, .1, 30);
  const product = new Group();
  const metal = new MeshStandardMaterial({ color: finish, metalness: .38, roughness: .32 });
  const fabric = new MeshStandardMaterial({ color: "#23232b", roughness: .95 });
  const geometry = new Set<SphereGeometry | TorusGeometry | TubeGeometry>();

  const add = (shape: SphereGeometry | TorusGeometry | TubeGeometry, material: MeshStandardMaterial) => {
    geometry.add(shape);
    const mesh = new Mesh(shape, material);
    product.add(mesh);
    return mesh;
  };

  const curve = new CatmullRomCurve3(
    Array.from({ length: 17 }, (_, index) => {
      const angle = index * Math.PI / 16;
      return new Vector3(1.27 * Math.cos(angle), .12 + 1.5 * Math.sin(angle), 0);
    })
  );
  add(new TubeGeometry(curve, 44, .085, 10, false), metal);
  const liner = add(new TubeGeometry(curve, 44, .065, 10, false), fabric);
  liner.scale.set(.934, .94, 1);

  for (const side of [-1, 1]) {
    const cup = add(new SphereGeometry(1, 28, 20), metal);
    cup.scale.set(.31, .61, .5);
    cup.position.set(1.15 * side, -.31, 0);
    const pad = add(new TorusGeometry(.38, .116, 12, 28), fabric);
    pad.rotation.y = Math.PI / 2;
    pad.scale.set(1.13, 1.18, .91);
    pad.position.set(.96 * side, -.31, 0);
    const liner = add(new SphereGeometry(1, 24, 16), fabric);
    liner.scale.set(.08, .43, .41);
    liner.position.set(.97 * side, -.31, 0);
  }

  scene.add(product, new AmbientLight("#f9eaff", 2.1));
  const key = new DirectionalLight("#ffe4d7", 3);
  key.position.set(3, 4, 5);
  const rim = new DirectionalLight("#94bbff", 2.5);
  rim.position.set(-3, 1, -3);
  scene.add(key, rim);
  camera.position.set(0, .4, 6.5);
  camera.lookAt(0, .32, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  canvas.setAttribute("aria-hidden", "true");
  target.append(canvas);

  let frame = 0;
  let userRotation = -.38;
  let pointerX = 0;
  let pointerY = 0;
  let scrollRotation = 0;
  let visible = false;
  const draw = () => {
    frame = 0;
    product.rotation.y = userRotation + pointerX + scrollRotation;
    product.rotation.x = .04 + pointerY;
    camera.position.z = 6.5 - scrollRotation * .85;
    renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(draw);
  };
  const resize = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    schedule();
  });
  const scroll = () => {
    if (!visible) return;
    const bounds = target.getBoundingClientRect();
    scrollRotation = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height))) * .85;
    schedule();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    scroll();
  });
  const move = (event: PointerEvent) => {
    pointerX = (event.offsetX / target.clientWidth - .5) * .75;
    pointerY = -(event.offsetY / target.clientHeight - .5) * .4;
    schedule();
  };
  const reset = () => {
    pointerX = 0;
    pointerY = 0;
    schedule();
  };

  observer.observe(target);
  resize.observe(target);
  window.addEventListener("scroll", scroll, { passive: true });
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerleave", reset);

  return {
    setColor: (color) => { metal.color.set(color); schedule(); },
    rotate: (amount) => { userRotation += amount; schedule(); },
    dispose: () => {
      observer.disconnect();
      resize.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", reset);
      geometry.forEach((shape) => shape.dispose());
      metal.dispose();
      fabric.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    }
  };
}

