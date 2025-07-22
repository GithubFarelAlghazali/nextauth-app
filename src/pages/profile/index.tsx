import { useSession } from "next-auth/react";

const ProfilePage = () => {
     const { data } = useSession();

     return (
          <main className="p-5 ">
               <h1 className="font-semibold text-2xl">Profil pengguna</h1>
               <h2>Nama: {data?.user.fullname}</h2>
               <h2>Email: {data?.user?.email}</h2>
          </main>
     );
};

export default ProfilePage;
