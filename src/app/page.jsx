import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen min-w-screen grid place-items-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/hospital_bg.png')" }}
    >
      {/* Overlay for glassmorphism effect and better contrast */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm"></div>

      <div className="text-center relative z-10 p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 shadow-2xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-900 dark:from-blue-400 dark:to-indigo-200 mb-12">
          Hospital 2026
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 font-bold text-white max-w-4xl">
          <Link
            href="/plantas"
            className="group relative flex-1 rounded-2xl overflow-hidden text-center text-3xl py-16 px-12 bg-indigo-600/90 hover:bg-indigo-700 shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative z-10">PLANTAS</div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <Link
            href="/medicinas"
            className="group relative flex-1 rounded-2xl overflow-hidden text-center text-3xl py-16 px-12 bg-emerald-600/90 hover:bg-emerald-700 shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative z-10">MEDICINAS</div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <Link
            href="/pacientes"
            className="group relative flex-1 rounded-2xl overflow-hidden text-center text-3xl py-16 px-12 bg-amber-600/90 hover:bg-amber-700 shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative z-10">PACIENTES</div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
