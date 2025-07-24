import { getFirestore, getDocs, collection, where, query, addDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
const firestore = getFirestore(app);

export async function signUp(
     userData: {
          email: string;
          fullname: string;
          password: string;
          role?: string;
     },
     callback: (response: { status: boolean; message: string }) => void
) {
     const q = query(collection(firestore, "users"), where("email", "==", userData.email));
     const snapshot = await getDocs(q);
     const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));
     if (data.length > 0) {
          callback({
               status: false,
               message: "Email already exists",
          });
     } else {
          userData.password = await bcrypt.hash(userData.password, 10);
          userData.role = "member";
          await addDoc(collection(firestore, "users"), userData)
               .then(() => {
                    callback({
                         status: true,
                         message: "User registered successfully",
                    });
               })
               .catch((error) => {
                    callback({
                         status: false,
                         message: error,
                    });
               });
     }
}

export async function signIn(userData: { email: string }) {
     const q = query(collection(firestore, "users"), where("email", "==", userData.email));
     const snapshot = await getDocs(q);
     const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));
     if (data.length > 0) {
          return data[0];
     } else {
          return null;
     }
}
