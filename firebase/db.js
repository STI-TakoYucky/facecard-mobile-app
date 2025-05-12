import { doc, setDoc } from 'firebase/firestore';
import { db, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth } from '../firebase/firebase'; 
import { getFormattedDate } from '../utils/GetFormattedDate';


//signup users and set their initial data
export async function signUp(email, password, firstName, lastName, birthdate) {

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const formattedDate = getFormattedDate(new Date());

      //add user to the user collection along with the initial data
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: firstName + " " + lastName,
        birthday: birthdate,
        markedDates: {},
        profilePicture: "",
        savedProducts: [],
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
        await signInWithEmailAndPassword (auth, email, password);
        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: error.code };
        
      }
  }