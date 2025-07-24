import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
     const { push } = useRouter();
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (event: any) => {
          event.preventDefault();
          setLoading(true);
          const form = event.target;
          const data = {
               email: form.email.value,
               password: form.password.value,
               fullname: form.fullname.value,
          };

          const result = await fetch("api/auth/register", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
          });

          if (result.status === 200) {
               form.reset();
               push("/login");
          } else {
               setError(result.status === 400 ? "Email already exists" : "Something went wrong");
               setLoading(false);
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen flex-col gap-2 relative">
               {error && <p className="bg-red-200 p-5 rounded-md text-red-800 absolute top-8">{error}</p>}
               <h1 className="text-2xl">Register</h1>

               <form className="max-w-sm mx-auto p-8 outline-2 outline-slate-300 shadow-2xl rounded-xl" onSubmit={handleSubmit}>
                    <div className="mb-5">
                         <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your name
                         </label>
                         <input
                              type="text"
                              id="fullname"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="John Doe"
                              required
                         />
                    </div>
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
                         disabled={loading}
                    >
                         {loading ? "Register..." : "Submit"}
                    </button>
               </form>
               <Link href={"/login"}>
                    Already have account? <span className="underline">LogIn here</span>
               </Link>
          </div>
     );
};

export default RegisterPage;
