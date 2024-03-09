import Head from "next/head";
import Navbar from "./Navbar";
import { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col gap-10">
      <Head>
        <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="w-full">
        <div className="max-w-screen-xl mx-auto px-8">
          {children}
        </div>
      </div>
    </main>
  )
}