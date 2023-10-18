
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  
  import db from "./firebase";
  import { ITodo, INewTodo } from "../types/Todo.types";

  // Create
  export const addTodosDB = async (todo: INewTodo): Promise<string | undefined> => {
    try {
      const docRef = await addDoc(collection(db, "todos"), todo);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  // Read
  export const fetchFromDB = async (): Promise<ITodo[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITodo[];
      return docs;
    } catch (error) {
      console.error("Error fetching documents: ", error);
      throw error;
      return [];
    }
  };
  
  // Update
  export const updateTodosDB = async (id: string, todo: INewTodo): Promise<void> => {
    try {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, todo);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  // Delete
  export const deleteTodoDB = async (id:string): Promise<void> => {
    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  