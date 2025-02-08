import * as th from 'three';

// Simple green cube mesh
export function cube(scene: th.Scene): void {
    const geometry = new th.BoxGeometry(1, 1, 1),
        material = new th.MeshStandardMaterial({ color: 0x00ff00 }),
        cube = new th.Mesh(geometry, material);
    cube.castShadow = true;
    scene.add(cube);
}

export function sphere(sc: th.Scene): void {
    const g = new th.SphereGeometry(3),
        m = new th.MeshStandardMaterial({ color: 0xa3a29e }),
        sphere = new th.Mesh(g, m);
    sphere.castShadow = true;
    sphere.position.set(0, 4, 0);
    sc.add(sphere);
}

export function plane(scene: th.Scene): void {
    const geometry = new th.PlaneGeometry(20, 20);
    const material = new th.MeshStandardMaterial({ color: 0xc2b280 });

    const plane = new th.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2; // Поворачиваем горизонтально
    plane.receiveShadow = true; // Позволяем плоскости получать тени
    plane.position.set(0, -1, 0);

    scene.add(plane);
}
