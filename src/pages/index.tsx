import { Geist, Geist_Mono } from "next/font/google";
import { signIn, useSession, signOut } from "next-auth/react";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export default function Home() {
     const { data }: any = useSession();

     return (
          <main>
               <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
                    <h1 className="text-2xl font-medium">{data ? `Halo, ${data.user.fullname}` : `SignIn terlebih dahulu`}</h1>

                    {data ? (
                         <button onClick={() => signOut()} className="p-5 bg-blue-600 text-white rounded-md cursor-pointer">
                              SignOut
                         </button>
                    ) : (
                         <button onClick={() => signIn()} className="p-5 bg-blue-600 text-white rounded-md cursor-pointer">
                              SignIn
                         </button>
                    )}
               </div>
          </main>
     );
}
