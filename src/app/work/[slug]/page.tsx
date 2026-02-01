import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";

// Mock data service (same as Homepage for now)
export const projects = [
  {
    id: 1,
    title: "Ethereal Gaze",
    category: "Portrait",
    description:
      "A deep dive into the human soul through the eyes of the beholder. This series explores the vulnerability and strength found in silence.",
    slug: "ethereal-gaze",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
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
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
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
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
  },
  {
    id: 5,
    title: "Portrait Study",
    category: "Portrait",
    description:
      "A study of human expression and emotion captured in intimate moments.",
    slug: "portrait-study",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
  {
    id: 6,
    title: "Natural Light",
    category: "Portrait",
    description:
      "Exploring the interplay between natural light and human form.",
    slug: "natural-light",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
  },
  {
    id: 7,
    title: "Editorial Story",
    category: "Editorial",
    description: "Editorial photography that tells compelling visual stories.",
    slug: "editorial-story",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
  {
    id: 8,
    title: "Wedding Moments",
    category: "Wedding",
    description: "Capturing the most precious moments of love and celebration.",
    slug: "wedding-moments",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
  },
  {
    id: 9,
    title: "Maternity Portrait",
    category: "Portrait",
    description: "Celebrating the beauty and strength of motherhood.",
    slug: "maternity-portrait",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
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
    <ProjectPageClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}
