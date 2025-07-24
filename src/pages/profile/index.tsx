import { useSession, signIn, signOut } from "next-auth/react";

const ProfilePage = () => {
     const { data } = useSession();

     return (
          <main className="p-5 ">
               <h1 className="font-semibold text-2xl">Profil pengguna</h1>
               <h2>Nama: {data?.user.fullname}</h2>
               <h2>Email: {data?.user?.email}</h2>
               {data ? (
                    <button onClick={() => signOut()} className="mt-5 py-1 px-3 bg-blue-600 text-white rounded-md cursor-pointer">
                         SignOut
                    </button>
               ) : (
                    <button onClick={() => signIn()} className="mt-5 py-1 px-3 bg-blue-600 text-white rounded-md cursor-pointer">
                         SignIn
                    </button>
               )}
          </main>
     );
};

export default ProfilePage;
