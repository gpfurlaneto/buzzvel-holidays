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
        <title>Buzzvel - Holidays</title>
        <meta
          name="description"
          content="Buzzvel - Holidays, is a user-friendly interface to perform create and to manage operations on holiday plans."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="w-full">
        <div className="max-w-screen-md mx-auto px-8">
          {children}
        </div>
      </div>
    </main>
  )
}