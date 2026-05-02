import { useEffect } from "react";
import { Text, View } from "react-native";

import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function App() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        await addDoc(collection(db, "test"), {
          message: "Hello from CareMate",
          createdAt: new Date(),
        });
        console.log("✅ Firebase connected!");
      } catch (error) {
        console.log("❌ Error:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <View>
      <Text>CareMate App</Text>
    </View>
  );
}
