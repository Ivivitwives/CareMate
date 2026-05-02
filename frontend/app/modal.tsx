import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet
} from "react-native";
import { db } from "../config/firebaseConfig";

export default function AddMedicineModal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");

  const handleSave = async () => {
    if (!name || !dosage)
      return Alert.alert("Required", "Please fill in all details");
    try {
      await addDoc(collection(db, "medicines"), {
        name,
        dosage,
        time: "08:00 AM",
        createdAt: new Date(),
      });
      router.back();
    } catch (e) {
      Alert.alert("Error", "Could not save medicine");
    }
  };

  return (
    <view style="{styles.container}">
      <text style="{styles.title}">Add New Medicine</text>
      <textinput
        style="{styles.input}"
        placeholder="Medicine Name (e.g. Paracetamol)"
        value="{name}"
        onchangetext="{setName}"
      ></textinput>
      <textinput
        style="{styles.input}"
        placeholder="Dosage (e.g. 500mg)"
        value="{dosage}"
        onchangetext="{setDosage}"
      ></textinput>
      <touchableopacity style="{styles.btn}" onpress="{handleSave}">
        <text style="{styles.btnText}">Add to Schedule</text>
      </touchableopacity>
    </view>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#5D5CDE",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
