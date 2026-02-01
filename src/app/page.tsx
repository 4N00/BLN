"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WebGLImage from "@/components/WebGLImage";

const projects = [
  {
    id: 1,
    title: "Ethereal Gaze",
    category: "Portrait",
    slug: "ethereal-gaze",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    colSpan: "md:col-span-5",
    colStart: "md:col-start-1",
    aspectRatio: "3/4",
    width: "w-full md:w-[85%]",
  },
  {
    id: 2,
    title: "Urban Solitude",
    category: "Editorial",
    slug: "urban-solitude",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    colSpan: "md:col-span-4",
    colStart: "md:col-start-6",
    aspectRatio: "4/5",
    width: "w-full md:w-[90%] md:ml-auto",
  },
  {
    id: 3,
    title: "Liquid Dreams",
    category: "Abstract",
    slug: "liquid-dreams",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    colSpan: "md:col-span-3",
    colStart: "md:col-start-8",
    aspectRatio: "3/4",
    width: "w-full",
  },
  {
    id: 4,
    title: "Silent Forms",
    category: "Still Life",
    slug: "silent-forms",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-4",
    colStart: "md:col-start-2",
    aspectRatio: "4/3",
    width: "w-full md:w-[80%]",
  },
  {
    id: 5,
    title: "Portrait Study",
    category: "Portrait",
    slug: "portrait-study",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-3",
    colStart: "md:col-start-7",
    aspectRatio: "3/4",
    width: "w-full md:w-[75%] md:ml-auto",
  },
  {
    id: 6,
    title: "Natural Light",
    category: "Portrait",
    slug: "natural-light",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-5",
    colStart: "md:col-start-1",
    aspectRatio: "5/6",
    width: "w-full md:w-[82%]",
  },
  {
    id: 7,
    title: "Editorial Story",
    category: "Editorial",
    slug: "editorial-story",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-4",
    colStart: "md:col-start-6",
    aspectRatio: "3/4",
    width: "w-full md:w-[88%] md:ml-auto",
  },
  {
    id: 8,
    title: "Wedding Moments",
    category: "Wedding",
    slug: "wedding-moments",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-3",
    colStart: "md:col-start-4",
    aspectRatio: "4/5",
    width: "w-full md:w-[70%] md:mx-auto",
  },
  {
    id: 9,
    title: "Maternity Portrait",
    category: "Portrait",
    slug: "maternity-portrait",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    colSpan: "md:col-span-4",
    colStart: "md:col-start-8",
    aspectRatio: "3/4",
    width: "w-full",
  },
];

export default function Home() {
  return (
    <div className="pt-32 pb-20 px-6 sm:px-12 max-w-[1800px] mx-auto">
      {/* Intro Section */}
      <section className="mb-32">
        <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tighter">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              LOES NOOITGEDAGT
            </motion.span>
          </span>
          <span className="block overflow-hidden mt-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[3vw] sm:text-[2vw] tracking-wider"
            >
              CAPTURING LIFE | LOVE | STYLE | YOU
            </motion.span>
          </span>
        </h1>
        <div className="mt-12 flex justify-end">
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-gray-600">
            A curated collection of visual narratives capturing the unseen and
            the unspoken. Loes Nooitgedagt explores the boundary between reality
            and imagination.
          </p>
        </div>
      </section>

      {/* Gallery Grid - Scattered Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 gap-x-6 mb-32">
        {projects.map((project, index) => (
          <Link
            href={`/work/${project.slug}`}
            key={project.id}
            className={`${project.colSpan} ${project.colStart}`}
          >
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`relative overflow-hidden mb-6 ${project.width}`}>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: project.aspectRatio }}
                >
                  <WebGLImage
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className={`flex flex-col items-start ${project.width}`}>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {(index + 1).toString().padStart(2, "0")} / {project.category}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl italic group-hover:text-gray-600 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* Contact / Footer */}
      <section className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
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
      </section>
    </div>
  );
}
