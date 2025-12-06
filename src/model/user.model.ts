import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

import { User } from "../types/types.user.js";

const usersCollection = collection(db, "users");

export const createUser = async (email: string, passwordHash: string) => {
  try {
    const docRef = await addDoc(usersCollection, {
      email,
      password: passwordHash,
      products: [],
    });
    return { id: docRef.id, email, products: [] };
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
        products: data.products || [],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const userRef = doc(usersCollection, id);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        email: data.email,
        passwordHash: data.password,
        products: data.products || [],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProductToUser = async (userId: string, productId: string) => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, {
      products: arrayUnion(productId),
    });
    return true;
  } catch (error) {
    console.error(
      `Error adding product ${productId} to user ${userId}:`,
      error,
    );
    throw error;
  }
};

export const removeProductFromUser = async (
  userId: string,
  productId: string,
) => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, {
      products: arrayRemove(productId),
    });
    return true;
  } catch (error) {
    console.error(
      `Error removing product ${productId} from user ${userId}:`,
      error,
    );
    throw error;
  }
};
