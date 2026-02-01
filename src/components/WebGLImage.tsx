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

// Minimalistic shader with subtle parallax and depth
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
      
      // Parallax displacement - image shifts opposite to mouse movement
      uv -= mouseOffset * 0.12;
      
      // Subtle zoom towards mouse position
      vec2 zoomCenter = mix(center, uMouse, uHover * 0.4);
      uv = zoomCenter + (uv - zoomCenter) * (1.0 - uHover * 0.05);
      
      // Sample texture with slight chromatic aberration effect
      float r = texture2D(uTexture, uv + mouseOffset * 0.003).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - mouseOffset * 0.003).b;
      vec4 color = vec4(r, g, b, texture2D(uTexture, uv).a);
      
      // Subtle brightness and contrast
      color.rgb = mix(color.rgb, color.rgb * 1.08, uHover);
      color.rgb += uHover * 0.02;
      
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
  const { viewport, size } = useThree();

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
    }
  }, [material, texture]);

  useFrame((state, delta) => {
    if (material && texture) {
      // Smooth hover transition
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hoverValue.current,
        0.15,
      );
      // Update mouse position for parallax - smoother tracking
      material.uniforms.uMouse.value.lerp(mousePosition.current, 0.2);
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
    ? texture.image.width / texture.image.height
    : 3 / 4; // Default aspect ratio

  // Calculate container aspect ratio
  const containerAspect = size.width / size.height;

  // Scale to cover the container (like CSS object-cover)
  let scaleX = viewport.width;
  let scaleY = viewport.height;

  if (textureAspect > containerAspect) {
    // Texture is wider - fit to height
    scaleX = viewport.height * textureAspect;
  } else {
    // Texture is taller - fit to width
    scaleY = viewport.width / textureAspect;
  }

  const handlePointerMove = (event: THREE.Event) => {
    if (mesh.current && material) {
      const intersection = (event as any).uv;
      if (intersection) {
        mousePosition.current.set(intersection.x, 1.0 - intersection.y);
      }
    }
  };

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => (hoverValue.current = 1)}
      onPointerOut={() => {
        hoverValue.current = 0;
        mousePosition.current.set(0.5, 0.5);
      }}
      onPointerMove={handlePointerMove}
      scale={[scaleX, scaleY, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={material} attach="material" />
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
      <div className={className} style={{ width: "100%", height: "100%" }}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
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
