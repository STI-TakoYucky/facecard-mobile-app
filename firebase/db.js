import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth } from '../firebase/firebase'; 
import { getFormattedDate } from '../utils/GetFormattedDate';


//signup users and set their initial data
export async function signUp(email, password, firstName, lastName, birthdate) {

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const formattedDate = getFormattedDate(new Date());

      //add user to the user collection along with the initial data
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        firstName: firstName,
        lastName: lastName,
        role: "User",
        birthday: birthdate,
        markedDates: {},
        profilePicture: "",
        savedProducts: [],
        streak: 0,
        isPremiumAcc: false,
        messages: [],
        routineSchedules: [
          {
            name: "Cleanser",
            schedules: [],
            startDate: formattedDate,
          },
          {
            name: "Moisturizer",
            schedules: [],
            startDate: formattedDate,
          },
          {
            name: "Exfoliate",
            schedules: [],
            startDate: formattedDate,
          },
          {
            name: "Serum",
            schedules: [],
            startDate: formattedDate,
          },
        ],
      });

      return { success: true }
  
    } catch (error) {
      return { success: false }
    }
  }

  export async function signIn(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword (auth, email, password);
        return { success: true, userID: userCredential.user.uid };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: error.code };
        
      }
  }

export async function getDermatologists() {
  try {
    const q = query(collection(db, "users"), where("role", "==", "Dermatologist"));
    const querySnapshot = await getDocs(q);

    const dermatologists = [];
    querySnapshot.forEach((doc) => {
      dermatologists.push(doc.data()); // no id included
    });

    return dermatologists;
  } catch (error) {
    console.log("Error fetching dermatologists:", error);
    return [];
  }
}
