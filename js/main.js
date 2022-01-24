'use strict';

const width = document.body.clientWidth;
const height = document.body.clientHeight;

// scene
const scene = new THREE.Scene(); //3Dを表現する空間

// material
const strawberryMaterial = new THREE.MeshLambertMaterial({ color: 0xe60033 });
const chocolateMaterial = new THREE.MeshLambertMaterial({ color: 0x58352a });
const creamMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const spongeMaterial = new THREE.MeshLambertMaterial({ color: 0xf7e28b });

// head
const strawberries = new THREE.Group();
for (let i = 0; i < 10; i++) {
  const strawberry = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 15, 100), strawberryMaterial);
  const radian = (i / 10) * Math.PI * 2;
  strawberry.position.set(65 * Math.cos(radian), 32, 65 * Math.sin(radian));
  strawberries.add(strawberry);
}

const chocolate = new THREE.Mesh(new THREE.BoxGeometry(100, 2, 50), chocolateMaterial);
chocolate.position.set(0, 28, 0);

// body
const body = new THREE.Group();

const cream1 = new THREE.Mesh(new THREE.CylinderGeometry(80, 80, 5, 100), creamMaterial);
cream1.position.set(0, 25, 0);
body.add(cream1);

const sponge1 = new THREE.Mesh(new THREE.CylinderGeometry(80, 80, 15, 100), spongeMaterial);
sponge1.position.set(0, 15, 0);
body.add(sponge1);

const cream2 = new THREE.Mesh(new THREE.CylinderGeometry(80, 80, 15, 100), creamMaterial);
cream2.position.set(0, 0, 0);
body.add(cream2);

const sponge2 = new THREE.Mesh(new THREE.CylinderGeometry(80, 80, 15, 100), spongeMaterial);
sponge2.position.set(0, -15, 0);
body.add(sponge2);

const cake = new THREE.Group();
cake.add(body, chocolate, strawberries);
scene.add(cake);

// text
const loader = new THREE.FontLoader();
loader.load(
  'https://threejs-plactice.vercel.app/fontloader/fonts/helvetiker_regular.typeface.json',
  function (font) {
    const matLite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
      }), // マテリアルを設定
      message = 'Happy birthday!!', // 出力する文字
      shapes = font.generateShapes(message, 8), // 文字の大きさを設定
      text_geometry = new THREE.ShapeGeometry(shapes), // ジオメトリを設定
      text = new THREE.Mesh(text_geometry, matLite); // textという変数を作成し設定したジオメトリ・マテリアルにメッシュのクラスに引数として渡す
    cake.add(text); // シーンに作成したtextを引数として渡す。
    text.position.set(-40, 30, 5);
    text.rotation.set(-1.54, 0, 0);
  }
);

// light
const light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(0, 50, 30);
scene.add(light);

const ambient = new THREE.AmbientLight(0xf8f8ff, 0.9);
scene.add(ambient);

// camera
const camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000);
const controls = new THREE.OrbitControls(camera, document.getElementById('stage'));
camera.position.set(0, 120, 160);
camera.lookAt(scene.position);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xe6e6fa);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('stage').appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cake.rotation.y -= 0.01;
}

render();
