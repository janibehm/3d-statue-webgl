import { Suspense, lazy } from 'react'
// Move the import inside lazy loading
const ThreeScene = lazy(() => import('./ThreeScene'))

export default function Scene3D() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
      <ThreeScene />
    </Suspense>
  )
}