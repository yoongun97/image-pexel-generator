import { PATH } from "@/utils/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-y-16 row-start-2 items-center">
        <h1 className="text-3xl">Gem Cross Stitch Pattern Generator</h1>
        <div className="flex flex-col gap-y-10">
          <Link
            className="text-center hover:bg-slate-400 hover:border-slate-200 border border-slate-950 rounded px-10 py-2 "
            href={PATH.ADD}
          >
            Work Space
          </Link>
          <Link
            className="text-center hover:bg-slate-400 hover:border-slate-200 border border-slate-950 rounded px-10 py-2 "
            href={PATH.LIST}
          >
            Work List
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
