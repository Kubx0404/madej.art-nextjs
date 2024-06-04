"use client";

import React, { useEffect, useState, Suspense } from "react";
import Loading from "../../../loading";
const PhotosLayout = React.lazy(() => import("../../../ui/photos"));
const Modal = React.lazy(() => import("../../../ui/modal"));
import { FetchPhotosConfig } from "@/app/types/FetchPhotosConfig";

export default function Home() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });

  useEffect(() => {
    fetch("http://localhost:3001/api/photos/get?tags=landscapes").then(
      (res: Response) => {
        if (res.ok) {
          res.json().then((res) => {
            setImages(res);
          });
        }
      }
    );
  }, []);

  return (
    <main className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')]">
      <Suspense fallback={<Loading />}>
        <PhotosLayout photos_json={images} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
