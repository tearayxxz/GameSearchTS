

export default function Footer() {
  return (
    <div className="mt-14 lg:mt-24 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 transition-all">
      <div className="max-w-[1127px] mx-auto py-[30px] px-4 flex flex-col sm:flex-row sm:justify-center gap-8">

        {/* Contact Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-semibold mb-2">
            Contact <span>Design/Dev</span>
          </h1>
          <p className="text-lg">Yossarun Ratisaksuntorn</p>
          <p className="text-lg">Email: yossarun.18125@gmail.com</p>
        </div>

        {/* Credits Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-semibold mb-2">Credits</h1>
          <p className="text-lg">rawg.io/apidocs</p>
        </div>

        
      </div>
    </div>
  );
}
