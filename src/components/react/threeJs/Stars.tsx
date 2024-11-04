import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Group, MathUtils, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

function addStar(group: Group) {
  const radius = MathUtils.randFloat(0.02, 0.05);
  const geometry = new SphereGeometry(radius, 24, 24);
  const material = new MeshBasicMaterial({ color: 0xffffff });
  const star = new Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  group.add(star);
}

export function Stars() {
  const { scene } = useThree();
  const starGroupRef = useRef<Group | null>(null);

  useEffect(() => {
    const starGroup = new Group();
    starGroupRef.current = starGroup;
    scene.add(starGroup);

    for (let i = 0; i < 500; i++) {
      addStar(starGroup);
    }

    return () => {
      scene.remove(starGroup);
    };
  }, [scene]);

  useFrame(() => {
    if (starGroupRef.current) {
      starGroupRef.current.rotation.x += 0.0005;
      starGroupRef.current.rotation.y += 0.0005;
    }
  });

  return null;
}
