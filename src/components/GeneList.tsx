import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import { useGenreStore } from "../store/useGenreStore";
import { Link } from "react-router-dom";

export default function GeneList() {
  const { genres, imgGenresData, fetchGenres } = useGenreStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <div className="max-w-[90%] lg:max-w-[1127px] m-auto bg-slate-500 mt-[26px] p-2 sm:p-5 rounded-xl flex justify-center items-center transition-all">
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
            imgGenresData.find((img: any) => img.id === genre.id)?.image || "";

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
    </div>
  );
}
