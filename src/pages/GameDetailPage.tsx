import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameDetailStore } from "../store/useGameDetailStore";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/swiper-bundle.css";
import "../customSlider.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import Footer from "../components/Footer";

const playstationPlatforms = [
  "PlayStation 3",
  "PlayStation 4",
  "PlayStation 5",
];
const xboxPlatforms = ["Xbox One", "Xbox Series S/X", "Xbox 360"];

interface Rating {
  id: number;
  count: number;
}

interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
  released_at?: string;
  requirements?: {
    recommended?: string;
  };
}

export default function GameDetailPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { id } = useParams<{ id: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const {
    gameDetails,
    gameTrailers,
    gameScreenshots,
    fetchGameDetails,
    error,
  } = useGameDetailStore();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fetchGameDetails(id);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, fetchGameDetails]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl">ERROR 404</h1>
        <h1 className="text-3xl text-red-600 ">Game not found</h1>
      </div>
    );
  }

  const handleTransitionStart = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => video.pause());
  };

  const handleTransitionEnd = (swiper: SwiperInstance) => {
    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    const video = activeSlide.querySelector("video");
    if (video) {
      video.play();
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-[1127px] mx-auto px-5 mt-[50px]">
        <div className="thumbnail customBtn max-w-[924px] mx-auto">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 w-full h-[429px] rounded-3xl"
            onTransitionStart={handleTransitionStart}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* Main Swiper slides */}
            {gameTrailers &&
              gameTrailers.map((trailer: any) => (
                <SwiperSlide key={trailer.id}>
                  <video controls loop poster={trailer.preview}>
                    <source src={trailer.data.max} type="video/mp4" />
                  </video>
                </SwiperSlide>
              ))}
            {gameScreenshots &&
              gameScreenshots.map((screenshot: any) => (
                <SwiperSlide key={screenshot.id}>
                  <img src={screenshot.image} alt="Screenshot" />
                </SwiperSlide>
              ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {/* Thumbnail Swiper slides */}
            {gameTrailers &&
              gameTrailers.map((trailer: any) => (
                <SwiperSlide key={trailer.id}>
                  <img src={trailer.preview} alt="video" />
                </SwiperSlide>
              ))}
            {gameScreenshots &&
              gameScreenshots.map((screenshot: any) => (
                <SwiperSlide key={screenshot.id}>
                  <img src={screenshot.image} alt="Screenshot" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="content mt-7 max-w-[924px] mx-auto">
          <h1 className="text-5xl">{gameDetails.name}</h1>
          <p className="mt-4 text-3xl mb-3">Rating</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-green-500 text-white px-2 py-1 rounded shadow-inner">
              Very Positive |{" "}
              {gameDetails.ratings.find((rating: Rating) => rating.id === 5)
                ?.count || 0}{" "}
              {/*id:5*/}
            </div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded shadow-inner">
              Positive |{" "}
              {gameDetails.ratings.find((rating: Rating) => rating.id === 4)
                ?.count || 0}{" "}
              {/*id:4*/}
            </div>
            <div className="bg-orange-400 text-white px-2 py-1 rounded shadow-inner">
              Negative |{" "}
              {gameDetails.ratings.find((rating: Rating) => rating.id === 3)
                ?.count || 0}{" "}
              {/*id:3*/}
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded shadow-inner">
              Very Negative |{" "}
              {gameDetails.ratings.find((rating: Rating) => rating.id === 1)
                ?.count || 0}{" "}
              {/*id:1*/}
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl mb-3">Platforms</h1>
            <div className="flex flex-wrap gap-4">
              {gameDetails.platforms.map((p: Platform) => (
                <div
                  key={p.platform.id}
                  className="px-2 py-1 rounded flex items-center gap-2 bg-[#D9D9D9]"
                >
                  {p.platform.name === "PC" && (
                    <FontAwesomeIcon icon={faDisplay} />
                  )}
                  {playstationPlatforms.includes(p.platform.name) && (
                    <FontAwesomeIcon icon={faPlaystation} />
                  )}
                  {xboxPlatforms.includes(p.platform.name) && (
                    <FontAwesomeIcon icon={faXbox} />
                  )}
                  {!["PC", ...playstationPlatforms, ...xboxPlatforms].includes(
                    p.platform.name
                  ) && <FontAwesomeIcon icon={faGamepad} />}
                  <span>| {p.platform.name}</span> {/* Platform name */}
                </div>
              ))}
            </div>
          </div>

          <h1 className="mt-4 mb-3 text-3xl">Genres</h1>
          <p>{gameDetails.genres.map((genre: any) => genre.name).join(", ")}</p>
          <h1 className="mt-4 mb-3 text-3xl">Tags</h1>
          <p>Tags: {gameDetails.tags.map((tag: any) => tag.name).join(", ")}</p>

          <h1 className="mt-4 mb-3 text-3xl">About</h1>
          <p>{gameDetails.description_raw || "Not available"}</p>

          <div className="flex justify-center gap-5 mt-5">
            <div className="text-center">
              <h1 className=" text-md sm:text-xl">MetaScore</h1>
              <div className="border-4 border-[#02204D] rounded-xl  w-20 sm:w-32 h-24 flex items-center justify-center transition-all">
                {gameDetails.metacritic || "N/A"}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-md sm:text-xl">Publisher</h1>
              <div className="border-4 border-[#02204D] rounded-xl  w-24 sm:w-32 h-24 flex items-center justify-center transition-all">
                {gameDetails.publishers[0]?.name || "Not available"}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-md sm:text-xl">Release date</h1>
              <div className="border-4 border-[#02204D] rounded-xl w-24 px-3 sm:px-0 sm:w-32 h-24 flex items-center justify-center transition-all">
                {gameDetails.released || "N/A"}
              </div>
            </div>
          </div>

          <h1 className="mt-5 text-3xl">System requirements for PC</h1>
          {gameDetails.platforms.some(
            (p: Platform) => p.platform.name === "PC"
          ) ? (
            gameDetails.platforms
              .filter((p: Platform) => p.platform.name === "PC")
              .map((p: Platform) => (
                <div key={p.platform.id}>
                  <p>
                    {p.requirements && p.requirements.recommended
                      ? p.requirements.recommended
                      : "Not available"}
                  </p>
                </div>
              ))
          ) : (
            <p>Not available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
