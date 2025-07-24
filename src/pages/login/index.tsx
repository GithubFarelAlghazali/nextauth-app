import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";

const LoginPage = () => {
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const { push, query } = useRouter();

     const handleSubmit = async (event: any) => {
          event.preventDefault();
          setLoading(true);
          const form = event.target;
          const data = {
               email: form.email.value,
               password: form.password.value,
          };

          const callbackUrl: any = query.callbackUrl || "/";

          try {
               const res = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                    callbackUrl,
               });
               if (!res?.error) {
                    setLoading(false);
                    push(callbackUrl);
               } else {
                    setLoading(false);
                    setError("Email or password is incorrect");
               }
          } catch (error: any) {
               setLoading(false);
               setError("Email or password is incorrect");
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen flex-col gap-2 relative">
               {error && <p className="bg-red-200 p-5 rounded-md text-red-800 absolute top-5">{error}</p>}

               <h1 className="text-2xl">Login</h1>

               <form className="max-w-sm mx-auto p-8 outline-2 outline-slate-300 shadow-2xl rounded-xl" onSubmit={handleSubmit}>
                    <div className="mb-5">
                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your email
                         </label>
                         <input
                              type="email"
                              id="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="name@flowbite.com"
                              required
                         />
                    </div>
                    <div className="mb-5">
                         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your password
                         </label>
                         <input
                              type="password"
                              id="password"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                         />
                    </div>

                    <button
                         type="submit"
                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                         Submit
                    </button>
               </form>
               <Link href={"/register"}>
                    Dont have account? <span className="underline">Register</span>
               </Link>
          </div>
     );
};

export default LoginPage;
