"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 sm:px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-between">
      {/* Header / Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
        <div>
          <h1 className="font-serif text-[10vw] sm:text-[6vw] leading-[0.9] tracking-tighter mb-12">
            Capturing the <span className="italic">unseen</span> rhythm of life.
          </h1>
        </div>
        <div className="flex flex-col justify-end items-start">
          <div className="max-w-md text-sm sm:text-base text-gray-600 leading-relaxed space-y-6">
            <p>
              Loes Nooitgedagt is a visual artist and photographer based in
              Amsterdam. Her work explores the delicate balance between control
              and chaos, structure and fluidity.
            </p>
            <p>
              With a background in fine arts, she approaches every subject with
              a painter's eye, looking for texture, light, and composition that
              transcends the ordinary.
            </p>
          </div>
        </div>
      </div>

      {/* Image Grid / Atmosphere */}
      <div className="grid grid-cols-12 gap-4 mb-32">
        <div className="col-span-12 sm:col-span-5 relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src="https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg"
            alt="Studio atmosphere"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="col-span-12 sm:col-span-7 flex flex-col justify-end items-end p-6 sm:p-12">
          <div className="text-right">
            <h3 className="font-serif text-3xl sm:text-4xl italic mb-4">
              Exhibitions
            </h3>
            <ul className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 space-y-2">
              <li>2025 — The Void, Berlin</li>
              <li>2024 — Static Motion, London</li>
              <li>2023 — Foam Talent, Amsterdam</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact / Footer */}
      <div className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
            Contact
          </span>
          <a
            href="mailto:hello@loesnooitgedagt.com"
            className="font-serif text-2xl sm:text-3xl hover:underline"
          >
            hello@loesnooitgedagt.com
          </a>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-xs uppercase tracking-widest hover:text-gray-500"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-xs uppercase tracking-widest hover:text-gray-500"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
