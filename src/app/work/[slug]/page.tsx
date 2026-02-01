import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Mock data service (same as Homepage for now)
const projects = [
  {
    id: 1,
    title: "Ethereal Gaze",
    category: "Portrait",
    description:
      "A deep dive into the human soul through the eyes of the beholder. This series explores the vulnerability and strength found in silence.",
    slug: "ethereal-gaze",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
  {
    id: 2,
    title: "Urban Solitude",
    category: "Editorial",
    description:
      "Finding peace in the chaos of the city. A study of shadows, light, and the lonely figures that inhabit the concrete jungle.",
    slug: "urban-solitude",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
  {
    id: 3,
    title: "Liquid Dreams",
    category: "Abstract",
    description:
      "Forms that flow and change, representing the ever-shifting nature of our dreams and subconsciously.",
    slug: "liquid-dreams",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
  },
  {
    id: 4,
    title: "Silent Forms",
    category: "Still Life",
    description:
      "Inanimate objects telling a living story. The beauty of stillness.",
    slug: "silent-forms",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
];

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Find next/prev projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className="pt-32 pb-20 bg-white">
      {/* Hero */}
      <div className="px-6 sm:px-12 max-w-[1800px] mx-auto mb-20 sm:mb-32">
        <Link
          href="/"
          className="inline-flex items-center text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Index
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-12">
          <h1 className="font-serif text-[10vw] sm:text-[8vw] leading-[0.85] italic">
            {project.title}
          </h1>
          <div className="lg:mb-4 lg:ml-auto max-w-sm">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
            <div className="mt-4 text-xs uppercase tracking-widest text-gray-400">
              Category: {project.category}
            </div>
          </div>
        </div>

        {/* Main Hero Image */}
        <div className="w-full aspect-video sm:aspect-[21/9] relative overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-6 sm:px-12 max-w-[1200px] mx-auto space-y-24 sm:space-y-32">
        {project.images?.map((img, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}
          >
            <div className="w-full md:w-[80%] aspect-[4/5] relative overflow-hidden bg-gray-50">
              <Image
                src={img}
                alt={`${project.title} detail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <span className="mt-4 text-xs text-gray-400 uppercase tracking-widest">
              Figure 0{idx + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-40 px-6 sm:px-12 pt-20 border-t border-gray-100 max-w-[1800px] mx-auto flex justify-between items-center">
        <Link
          href={`/work/${prevProject.slug}`}
          className="group flex flex-col items-start gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
            Previous Project
          </span>
          <span className="font-serif text-2xl italic group-hover:underline">
            {prevProject.title}
          </span>
        </Link>
        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col items-end gap-2 text-right"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
            Next Project
          </span>
          <span className="font-serif text-2xl italic group-hover:underline">
            {nextProject.title}
          </span>
        </Link>
      </div>
    </div>
  );
}
