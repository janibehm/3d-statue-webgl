import { useEffect, useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  BufferGeometry,
  InstancedMesh,
  Matrix4,
} from "three";

// Constants
const ROTATION_SPEED = 0.00015;
const STAR_COUNT = 300;
const GEOMETRY_COUNT = 5;
const SPHERE_SEGMENTS = 16; // Reduced from 24 for better performance

// Pre-create shared resources
const material = new MeshBasicMaterial({ color: 0xffffff });
const matrix = new Matrix4();

// Create base geometries with reduced segments
const BASE_GEOMETRIES = Array(GEOMETRY_COUNT)
  .fill(0)
  .map(() => {
    const radius = MathUtils.randFloat(0.02, 0.05);
    return new SphereGeometry(radius, SPHERE_SEGMENTS, SPHERE_SEGMENTS);
  });

// Pre-calculate star positions with better spread
const STAR_POSITIONS = Array(STAR_COUNT)
  .fill(0)
  .map(() => ({
    x: MathUtils.randFloatSpread(100),
    y: MathUtils.randFloatSpread(100),
    z: MathUtils.randFloatSpread(100),
    geometryIndex: Math.floor(Math.random() * GEOMETRY_COUNT),
  }));

export function Stars() {
  const { scene } = useThree();
  const groupRef = useRef<Group>(new Group());
  const lastTime = useRef(0);

  // Create InstancedMeshes for each geometry type
  const instancedMeshes = useMemo(
    () =>
      BASE_GEOMETRIES.map((geometry) => {
        const count = Math.ceil(STAR_COUNT / GEOMETRY_COUNT);
        return new InstancedMesh(geometry, material, count);
      }),
    [],
  );

  useEffect(() => {
    const group = groupRef.current;
    scene.add(group);

    // Add instanced meshes to group
    instancedMeshes.forEach((mesh) => group.add(mesh));

    // Set instance matrices
    const instanceCounts = new Array(GEOMETRY_COUNT).fill(0);
    STAR_POSITIONS.forEach((position) => {
      const { x, y, z, geometryIndex } = position;
      const instancedMesh = instancedMeshes[geometryIndex];
      const instanceId = instanceCounts[geometryIndex]++;

      matrix.setPosition(x, y, z);
      instancedMesh.setMatrixAt(instanceId, matrix);
    });

    // Update instance matrices
    instancedMeshes.forEach((mesh) => (mesh.instanceMatrix.needsUpdate = true));

    return () => {
      scene.remove(group);
      // Cleanup
      instancedMeshes.forEach((mesh) => mesh.dispose());
      BASE_GEOMETRIES.forEach((geometry) => geometry.dispose());
      material.dispose();
    };
  }, [scene, instancedMeshes]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const delta = time - lastTime.current;

    // Skip frame if delta is too small (frame rate control)
    if (delta < 0.016) return; // ~60fps

    lastTime.current = time;

    groupRef.current.rotation.x += ROTATION_SPEED;
    groupRef.current.rotation.y += ROTATION_SPEED;
  });

  return null;
}
