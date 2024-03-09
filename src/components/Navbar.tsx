import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <nav className="container relative flex flex-row items-center justify-between p-8 mx-auto lg:justify-between xl:px-0 max-w-screen-xl">
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
          <Link href="/">
            <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
              <span>
                <Image
                  src="/logo-light.svg"
                  alt="N"
                  width="32"
                  height="32"
                  className="w-36 bg-black p-2"
                />
              </span>
            </span>
          </Link>
        </div>
        <ThemeChanger />
      </nav>
    </div>
  );
}
