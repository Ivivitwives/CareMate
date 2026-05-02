import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet
} from "react-native";
import { db } from "../config/firebaseConfig";

export default function HomeScreen() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "medicines"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMedicines(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <safeareaview style="{styles.container}">
      <view style="{styles.header}">
        <text style="{styles.greeting}">Hello, John</text>
        <text style="{styles.subtitle}">Your medicines for today</text>
      </view>

      <scrollview style="{styles.list}">
        {medicines.map((med) => (
          <view key="{med.id}" style="{styles.card}">
            <view style="{styles.iconContainer}">
              <pill color="#5D5CDE" size="{24}"></pill>
            </view>
            <view style="{styles.info}">
              <text style="{styles.name}">{med.name}</text>
              <text style="{styles.dosage}">{med.dosage}</text>
            </view>
            <text style="{styles.time}">{med.time || "08:00 AM"}</text>
          </view>
        ))}
      </scrollview>

      <link href="/modal" aschild="">
        <touchableopacity style="{styles.fab}">
          <plus color="#fff" size="{30}"></plus>
        </touchableopacity>
      </link>
    </safeareaview>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  header: { padding: 20, marginTop: 40 },
  greeting: { fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#888", fontSize: 16 },
  list: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  iconContainer: { backgroundColor: "#F0EFFF", padding: 10, borderRadius: 12 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: "bold" },
  dosage: { color: "#888", fontSize: 14 },
  time: { fontWeight: "bold", color: "#5D5CDE" },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 25,
    backgroundColor: "#5D5CDE",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
