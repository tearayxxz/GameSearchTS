import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useGenreStore } from "../store/useGenreStore";
import { Link } from "react-router-dom";

export default function GeneList() {
  const { genres, imgGenresData, fetchGenres } = useGenreStore();
  const [loading, setLoading] = useState(true);

  // Determine number of skeleton slides based on viewport
  const getSkeletonCount = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    return 3;
  };

  const [skeletonCount, setSkeletonCount] = useState(getSkeletonCount);

  useEffect(() => {
    const handleResize = () => setSkeletonCount(getSkeletonCount());
    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      setLoading(true);
      await fetchGenres();
      setLoading(false);
    };

    fetchData();

    return () => window.removeEventListener("resize", handleResize);
  }, [fetchGenres]);

  return (
    <div className="max-w-[90%] lg:max-w-[1127px] m-auto bg-white backdrop-filter backdrop-blur-3xl bg-opacity-10 mt-[26px] p-2 sm:p-5 rounded-xl flex justify-center items-center transition-all">
      {loading ? (
        <div
          className={`grid gap-5 w-full ${
            skeletonCount === 4 ? "grid-cols-4" : "grid-cols-3"
          }`}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[130px] sm:h-[150px] md:h-[200px] flex justify-center items-center bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={10}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Mousewheel, Keyboard, Navigation, Autoplay]}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {genres.map((genre: any) => {
            const genreImage =
              imgGenresData.find((img: any) => img.id === genre.id)?.image ||
              "";

            return (
              <SwiperSlide key={genre.id}>
                <div className="rounded-lg relative transition-all duration-300 ease-in-out hover:scale-105">
                  {genreImage && (
                    <img
                      src={genreImage}
                      alt={genre.name}
                      className="w-full h-[130px] sm:h-[150px] md:h-[200px] object-cover rounded-lg transition-all duration-300 ease-in-out"
                    />
                  )}
                  <div className="absolute bg-[#02204D] font-bold z-[1] left-0 bottom-7 py-1 px-4 rounded-r-full">
                    <span className="text-white text-sm line-clamp-1">
                      {genre.name}
                    </span>
                  </div>
                  <Link
                    to={`/games?type=genre&id=${genre.id}`}
                    className="absolute inset-0 z-[2]"
                  ></Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
