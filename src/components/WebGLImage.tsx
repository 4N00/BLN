"use client";

import {
  useRef,
  Suspense,
  useState,
  useEffect,
  useMemo,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from "next/image";
import * as THREE from "three";

// Minimalistic shader with subtle parallax and depth - no color effects
const MinimalShaderMaterial = {
  uniforms: {
    uTexture: { value: new THREE.Texture() },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);

      // Calculate distance from mouse to current pixel
      vec2 mouseOffset = (uMouse - center) * uHover;

      // Subtle parallax displacement - image shifts opposite to mouse movement
      uv -= mouseOffset * 0.15;

      // Gentle zoom towards mouse position
      vec2 zoomCenter = mix(center, uMouse, uHover * 0.4);
      uv = zoomCenter + (uv - zoomCenter) * (1.0 - uHover * 0.06);

      // Clean color output - no chromatic aberration or color manipulation
      vec4 color = texture2D(uTexture, uv);

      gl_FragColor = color;
    }
  `,
};

function ImagePlane({ src, onError }: { src: string; onError?: () => void }) {
  // All hooks must be called at the top, before any conditional returns
  const mesh = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hasError, setHasError] = useState(false);
  const hoverValue = useRef(0);
  const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));
  const textureRef = useRef<THREE.Texture | null>(null);
  const scaleRef = useRef(1);
  const stableScaleRef = useRef<{ x: number; y: number } | null>(null);
  const three = useThree();
  const viewport = three.viewport;
  const size = three.size as { width: number; height: number };

  // Create a unique material instance for each component
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: new THREE.Texture() },
        uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: MinimalShaderMaterial.vertexShader,
      fragmentShader: MinimalShaderMaterial.fragmentShader,
      transparent: true,
    });
  }, []);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);

    // Dispose of previous texture if it exists
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    // Proxy external images through Next.js API to bypass CORS
    const isExternal = src.startsWith("http");
    // Add cache-busting parameter to ensure fresh load (only for proxy)
    const textureUrl = isExternal
      ? `/api/image-proxy?url=${encodeURIComponent(src)}&_t=${Date.now()}`
      : src;

    // Load texture with proper CORS handling
    // Create a new loader instance to avoid cache issues
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    // Clear THREE.js texture cache for this URL to ensure fresh load
    if (THREE.Cache.files[textureUrl]) {
      delete THREE.Cache.files[textureUrl];
    }

    let cancelled = false;

    loader.load(
      textureUrl,
      (loadedTexture) => {
        if (cancelled) {
          loadedTexture.dispose();
          return;
        }
        // Dispose previous texture before setting new one
        if (textureRef.current) {
          textureRef.current.dispose();
        }
        loadedTexture.flipY = true;
        textureRef.current = loadedTexture;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        if (cancelled) return;
        console.error("Failed to load texture:", error);
        setHasError(true);
        // Call onError callback to trigger fallback in parent
        if (onError) {
          onError();
        }
      },
    );

    // Cleanup function
    return () => {
      cancelled = true;
      // Dispose texture on unmount or src change
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, [src]); // Removed onError from dependencies to avoid unnecessary reloads

  // Update texture uniform when texture changes
  useEffect(() => {
    if (material && texture) {
      material.uniforms.uTexture.value = texture;
      material.needsUpdate = true;
      
      // Calculate and cache stable scale when texture loads
      if (texture.image && !stableScaleRef.current) {
        const textureAspect = (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height;
        // @ts-ignore - useThree size type
        const containerAspect = size.width > 0 && size.height > 0 
          ? size.width / size.height
          : viewport.width / viewport.height;
        
        let scaleX = viewport.width;
        let scaleY = viewport.height;
        
        if (textureAspect > containerAspect) {
          scaleX = viewport.height * textureAspect;
          scaleY = viewport.height;
        } else {
          scaleX = viewport.width;
          scaleY = viewport.width / textureAspect;
        }
        
        stableScaleRef.current = { x: scaleX, y: scaleY };
      }
    }
  }, [material, texture, viewport, size]);

  useFrame((state, delta) => {
    if (material && texture) {
      // Very smooth hover transition - much slower for elegant feel
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hoverValue.current,
        0.015,
      );
      // Update mouse position for parallax - very smooth tracking
      material.uniforms.uMouse.value.lerp(mousePosition.current, 0.03);

      // Scale up on hover (5% larger) - very slow and smooth transition
      scaleRef.current = THREE.MathUtils.lerp(
        scaleRef.current,
        1 + hoverValue.current * 0.05,
        0.015,
      );

      if (mesh.current && stableScaleRef.current && texture) {
        // Use cached stable scale to prevent flickering during layout animations
        // Only update scale if texture is loaded and stable scale is set
        mesh.current.scale.set(
          stableScaleRef.current.x * scaleRef.current,
          stableScaleRef.current.y * scaleRef.current,
          1,
        );
      } else if (mesh.current && texture && texture.image) {
        // Fallback: calculate scale if stable scale not set yet
        const textureAspect = (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height;
        let scaleX = viewport.width;
        let scaleY = viewport.height;
        
        // @ts-ignore
        const containerAspect = size.width > 0 && size.height > 0 
          ? size.width / size.height
          : viewport.width / viewport.height;
        
        if (textureAspect > containerAspect) {
          scaleX = viewport.height * textureAspect;
          scaleY = viewport.height;
        } else {
          scaleX = viewport.width;
          scaleY = viewport.width / textureAspect;
        }
        
        mesh.current.scale.set(
          scaleX * scaleRef.current,
          scaleY * scaleRef.current,
          1,
        );
      }
    }
  });

  // Cleanup material on unmount
  useEffect(() => {
    return () => {
      if (material) {
        material.dispose();
      }
    };
  }, [material]);

  // If error occurred, return null - parent will show fallback via onError callback
  if (hasError) {
    return null;
  }

  // Still loading
  if (!texture) {
    return null;
  }

  // Calculate aspect ratio from texture
  const textureAspect = texture.image
    ? (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height
    : 3 / 4; // Default aspect ratio

  // Calculate container aspect ratio from actual container size
  // @ts-ignore - useThree size type
  const containerAspect = size.width > 0 && size.height > 0 
    ? size.width / size.height
    : viewport.width / viewport.height;

  const handlePointerMove = (event: THREE.Event) => {
    if (mesh.current && material) {
      const intersection = (event as any).uv;
      if (intersection) {
        mousePosition.current.set(intersection.x, 1.0 - intersection.y);
      }
    }
  };

  // Use stable scale if available, otherwise calculate
  const getInitialScale = () => {
    if (stableScaleRef.current) {
      return stableScaleRef.current;
    }
    
    // Fallback calculation
    let scaleX = viewport.width;
    let scaleY = viewport.height;

    if (textureAspect > containerAspect) {
      scaleX = viewport.height * textureAspect;
      scaleY = viewport.height;
    } else {
      scaleX = viewport.width;
      scaleY = viewport.width / textureAspect;
    }
    
    return { x: scaleX, y: scaleY };
  };

  const initialScale = getInitialScale();

  return (
    // @ts-ignore - React Three Fiber types
    <mesh
      ref={mesh}
      onPointerOver={() => (hoverValue.current = 1)}
      onPointerOut={() => {
        hoverValue.current = 0;
        mousePosition.current.set(0.5, 0.5);
      }}
      onPointerMove={handlePointerMove}
      scale={[initialScale.x, initialScale.y, 1]}
    >
      {/* @ts-ignore - React Three Fiber types */}
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore - React Three Fiber types */}
      <primitive object={material} attach="material" />
      {/* @ts-ignore - React Three Fiber types */}
    </mesh>
  );
}

// Error Boundary Component
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL Image error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// A wrapper to handle the Canvas context
export default function WebGLImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fallbackImage = (
    <div className={`${className} relative`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  if (useFallback) {
    return fallbackImage;
  }

  return (
    <WebGLErrorBoundary fallback={fallbackImage}>
      <div
        ref={containerRef}
        className={className}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%", display: "block" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            {/* @ts-ignore: Intrinsic elements handling if strictly typed */}
            <ImagePlane src={src} onError={() => setUseFallback(true)} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
