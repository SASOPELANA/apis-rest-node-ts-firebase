import { db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { User } from "../types/types.user.js";

const usersCollection = collection(db, "users");

export const createUser = async (email: string, passwordHash: string) => {
  try {
    const docRef = await addDoc(usersCollection, {
      email,
      password: passwordHash,
    });
    return { id: docRef.id, email };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const q = query(usersCollection, where("email", "==", email));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];

      const data = doc.data();

      return {
        id: doc.id,
        email: data.email,
        passwordHash: data.password,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
