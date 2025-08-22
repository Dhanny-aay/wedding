"use client";
import { useState, useMemo } from "react";
import cam from "./assets/camera.png";
import { MoveDiagonal } from "lucide-react";
import ViewMoment from "./viewMoment";
import { useFetchMoments } from "../hooks/momentHooks";
import { ShareMomentsModal, StatusModal } from "./shareMemory";
import placeholder1 from "./assets/placeholder1.png";
import placeholder2 from "./assets/placeholder2.png";
import placeholder3 from "./assets/placeholder3.png";
import placeholder4 from "./assets/placeholder4.png";
import placeholder5 from "./assets/placeholder5.png";
import placeholder6 from "./assets/placeholder6.png";

const ITEMS_PER_LOAD = 6;

const preWeddingImages = [
  { src: placeholder1.src, alt: "Memory 1" },
  { src: placeholder4.src, alt: "Memory 2" },
  { src: placeholder2.src, alt: "Memory 3" },
  { src: placeholder5.src, alt: "Memory 4" },
  { src: placeholder3.src, alt: "Memory 5" },
  { src: placeholder6.src, alt: "Memory 6" },
];

const Gallery = () => {
  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchMoments();

  const momentsData =
    data?.pages?.flatMap((page) =>
      page.data.map((item) => ({
        src: item.mediaUrl,
        alt: item.caption || "Memory",
        description: item.caption,
        _id: item._id,
      }))
    ) || [];

  const [displayLimit, setDisplayLimit] = useState(ITEMS_PER_LOAD);
  const [category, setCategory] = useState("all");
  const [isViewMomentOpen, setViewMomentModal] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [isShareModalOpen, setisShareModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const combinedData = useMemo(() => {
    if (category === "pre") return preWeddingImages;
    if (category === "wedding") return momentsData;
    return [...preWeddingImages, ...momentsData];
  }, [category, momentsData]);

  const displayedMoments = combinedData.slice(0, displayLimit);

  const openModal = (momentItem) => {
    setSelectedMoment(momentItem);
    setViewMomentModal(true);
  };
  const closeModal = () => {
    setViewMomentModal(false);
    setSelectedMoment(null);
  };

  const handleLoadMore = () => {
    if (category === "wedding" && hasNextPage) fetchNextPage();
    setDisplayLimit((prev) => prev + ITEMS_PER_LOAD);
  };
  const handleShowLess = () => setDisplayLimit(ITEMS_PER_LOAD);

  const SkeletonCard = ({ tall }) => (
    <div
      className={`relative overflow-hidden ${
        tall ? "h-[400px] md:h-[500px]" : "h-[250px] md:h-[300px]"
      } bg-gray-200 animate-pulse rounded-lg`}
    />
  );

  const EmptyState = () => (
    <div className="w-full max-w-[600px] mx-auto text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-[#008080]/50 rounded-full flex items-center justify-center">
        <img src={cam.src} alt="Camera" className="w-12 h-12 opacity-50" />
      </div>
      <h3 className="text-2xl font-alexBrush text-[#1b1b1b] mb-4">
        No Memories Yet
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Be the first to share your beautiful moments from Hikmat & Noah's
        special day. Your memories will help tell their love story.
      </p>
      <button
        onClick={() => setisShareModalOpen(true)}
        className="bg-primary py-3 px-6 text-white rounded-[32px] text-sm md:text-base"
      >
        Share Your Memory
      </button>
    </div>
  );

  const SkeletonGroup = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-4">
        <SkeletonCard tall />
        <SkeletonCard />
      </div>
      <div className="flex flex-col gap-4">
        <SkeletonCard />
        <SkeletonCard tall />
      </div>
      <div className="flex flex-col gap-4">
        <SkeletonCard tall />
        <SkeletonCard />
      </div>
    </div>
  );

  const GalleryImage = ({ image, tall }) => (
    <div
      className={`relative overflow-hidden ${
        tall ? "h-[400px] md:h-[500px]" : "h-[250px] md:h-[300px]"
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => openModal(image)}
        className="absolute top-4 right-4 bg-white md:w-10 md:h-10 p-1 rounded-[4px] flex items-center justify-center"
      >
        <MoveDiagonal className="text-[#343330] w-6 h-6 md:w-[28px] md:h-[28px]" />
      </button>
    </div>
  );

  const renderGroup = (group, i) => {
    const colCount = group.length < 3 ? 1 : group.length < 5 ? 2 : 3;
    return (
      <div
        key={i}
        className={`grid gap-4 ${
          colCount === 1
            ? "grid-cols-1"
            : colCount === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3"
        }`}
      >
        <div className="flex flex-col gap-4">
          {group[0] && <GalleryImage image={group[0]} tall />}
          {group[1] && <GalleryImage image={group[1]} />}
        </div>
        {colCount > 1 && (
          <div className="flex flex-col gap-4">
            {group[2] && <GalleryImage image={group[2]} />}
            {group[3] && <GalleryImage image={group[3]} tall />}
          </div>
        )}
        {colCount > 2 && (
          <div className="flex flex-col gap-4">
            {group[4] && <GalleryImage image={group[4]} tall />}
            {group[5] && <GalleryImage image={group[5]} />}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        id="gallery"
        className="py-[100px] px-4 md:px-12 lg:px-40 flex flex-col items-center bg-[#FDF6F8]"
      >
        <p className="text-primary text-sm tracking-[5px] uppercase">
          Our Gallery
        </p>
        <h2 className="mt-4 font-alexBrush text-[#1b1b1b] text-[40px] md:text-[60px] leading-[1]">
          Our Memories
        </h2>

        <div className="mt-6 flex items-center gap-3.5">
          <button
            onClick={() => {
              setCategory("all");
              setDisplayLimit(ITEMS_PER_LOAD);
            }}
            className={`rounded-[50px] px-[17px] py-[7px] text-sm md:text-lg ${
              category === "all"
                ? "bg-primary text-white"
                : "border-2 border-[#008080] text-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setCategory("pre");
              setDisplayLimit(ITEMS_PER_LOAD);
            }}
            className={`rounded-[50px] px-[17px] py-[7px] text-sm md:text-lg ${
              category === "pre"
                ? "bg-primary text-white"
                : "border-2 border-[#008080] text-primary"
            }`}
          >
            Pre Wedding
          </button>
          <button
            onClick={() => {
              setCategory("wedding");
              setDisplayLimit(ITEMS_PER_LOAD);
            }}
            className={`rounded-[50px] px-[17px] py-[7px] text-sm md:text-lg ${
              category === "wedding"
                ? "bg-primary text-white"
                : "border-2 border-[#008080] text-primary"
            }`}
          >
            Wedding
          </button>
        </div>

        <button
          onClick={() => setisShareModalOpen(true)}
          className="mt-6 bg-primary py-4 w-full max-w-[500px] flex items-center justify-center text-sm md:text-lg text-white rounded-[32px]"
        >
          <img src={cam.src} alt="Camera" className="w-6 h-6 mr-1.5" />
          Share your Memories of Hikmat & Noah's Wedding
        </button>

        <div className="w-full max-w-[1440px] mt-12 space-y-8">
          {isLoading && category === "wedding" ? (
            <>
              <SkeletonGroup />
              <SkeletonGroup />
            </>
          ) : displayedMoments.length === 0 ? (
            <EmptyState />
          ) : (
            chunkArray(displayedMoments, 6).map(renderGroup)
          )}
          {isFetchingNextPage && category === "wedding" && <SkeletonGroup />}
        </div>

        {displayedMoments.length > 0 && (
          <div className="mt-[50px] flex gap-4">
            {(hasNextPage || displayedMoments.length < combinedData.length) && (
              <button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="bg-primary rounded-[50px] px-[24px] py-[16px] text-white text-sm md:text-base disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "View More"}
              </button>
            )}
            {displayLimit > ITEMS_PER_LOAD && (
              <button
                onClick={handleShowLess}
                className="border-2 border-primary rounded-[50px] px-[24px] py-[16px] text-primary text-sm md:text-base"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>

      <ViewMoment
        isOpen={isViewMomentOpen}
        onClose={closeModal}
        moment={selectedMoment}
      />
      <ShareMomentsModal
        isOpen={isShareModalOpen}
        onClose={() => setisShareModalOpen(false)}
        onSuccess={() => {
          setisShareModalOpen(false);
          setIsSuccessModalOpen(true);
        }}
        onError={() => {
          setisShareModalOpen(false);
          setIsErrorModalOpen(true);
        }}
      />
      <StatusModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        message="Your memory has been shared."
        isSuccess
      />
      <StatusModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Submission Failed"
        message="Something went wrong. Please try again."
      />
    </>
  );
};

export default Gallery;
