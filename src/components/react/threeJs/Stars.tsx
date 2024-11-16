import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Group, MathUtils, Mesh, MeshBasicMaterial, SphereGeometry, BufferGeometry } from "three";

// Pre-create shared resources
const material = new MeshBasicMaterial({ color: 0xffffff });
const ROTATION_SPEED = 0.00015;
const STAR_COUNT = 300;
const BASE_GEOMETRIES = Array(5)
  .fill(0)
  .map(() => {
    const radius = MathUtils.randFloat(0.02, 0.05);
    return new SphereGeometry(radius, 24, 24);
  });

// Pre-calculate star positions
const STAR_POSITIONS = Array(STAR_COUNT)
  .fill(0)
  .map(() => ({
    x: MathUtils.randFloatSpread(100),
    y: MathUtils.randFloatSpread(100),
    z: MathUtils.randFloatSpread(100),
  }));

function addStar(group: Group, geometry: BufferGeometry, position: (typeof STAR_POSITIONS)[0]) {
  const star = new Mesh(geometry, material);
  star.position.set(position.x, position.y, position.z);
  group.add(star);
}

export function Stars() {
  const { scene } = useThree();
  const starGroupRef = useRef<Group>(new Group());

  useEffect(() => {
    const starGroup = starGroupRef.current;
    scene.add(starGroup);

    // Create stars using pre-calculated positions
    STAR_POSITIONS.forEach((position, i) => {
      const geometry = BASE_GEOMETRIES[i % BASE_GEOMETRIES.length];
      addStar(starGroup, geometry, position);
    });

    return () => {
      scene.remove(starGroup);
      // Clean up only on unmount
      BASE_GEOMETRIES.forEach((geometry) => geometry.dispose());
      material.dispose();
    };
  }, [scene]);

  useFrame(() => {
    starGroupRef.current.rotation.x += ROTATION_SPEED;
    starGroupRef.current.rotation.y += ROTATION_SPEED;
  });

  return null;
}
