"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCloudinaryUrl } from "@/lib/utils";

const galleryFolders = [
  { name: "Summit Launch", path: "launch" },
  { name: "Events", path: "events" },
  { name: "Team", path: "team" },
];

const isCloudinaryUrl = (url: string) => url.startsWith('http');

export default function GalleryPage() {
  const [folderPreviews, setFolderPreviews] = useState(
    galleryFolders.map((f) => ({ ...f, image: "/placeholder.jpg" }))
  );

  useEffect(() => {
    
    async function fetchGalleryPreviews() {
      try {
        const res = await fetch("/api/gallery-txt");
        const data = await res.json();
        setFolderPreviews(data);
      } catch (e) {
        console.error("Error loading gallery previews", e);
      }
    }
    fetchGalleryPreviews();
  }, []);

  return (
    <main className="min-h-screen">
      <Header scrollState={false} />
      <div className="max-w-6xl mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold mb-10 text-center">Galleria</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folderPreviews.map((folder) => (
            <Link
              key={folder.name}
              href={`/gallery/${folder.path}`}
              className="block border rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={isCloudinaryUrl(folder.image) ? folder.image : getCloudinaryUrl(folder.image, { width: 400, quality: 80 })}
                  alt={folder.name}
                  fill={true}
                  className="object-cover rounded-t-xl"
                />
              </div>

              <div className="p-4 text-center font-semibold">{folder.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
