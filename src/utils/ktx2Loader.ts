import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import * as THREE from "three";

let loader: KTX2Loader | null = null;

export const getKTX2Loader = (gl: THREE.WebGLRenderer) => {
  if (!loader) {
    loader = new KTX2Loader().setTranscoderPath("/basis/").detectSupport(gl);
  }
  return loader;
};

export const disposeKTX2Loader = () => {
  if (loader) {
    loader.dispose();
    loader = null;
  }
};
