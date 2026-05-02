import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const medicines = [
  {
    id: "1",
    name: "Paracetamol",
    dose: "500mg • 1 Tablet",
    time: "08:00 AM",
    status: "To Take",
  },
  {
    id: "2",
    name: "Vitamin C",
    dose: "500mg • 1 Tablet",
    time: "02:00 PM",
    status: "Taken",
  },
  {
    id: "3",
    name: "Calcium Tablet",
    dose: "500mg • 1 Tablet",
    time: "08:00 PM",
    status: "Pending",
  },
];

export default function HomeScreen() {
  const renderMedicine = ({ item }: { item: (typeof medicines)[0] }) => (
    <View style={styles.medicineRow}>
      <View style={styles.medicineLeft}>
        <View style={styles.medicineIcon} />
        <View style={styles.medicineText}>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Text style={styles.medicineDose}>{item.dose}</Text>
        </View>
      </View>
      <View style={styles.medicineRight}>
        <Text style={styles.medicineTime}>{item.time}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Taken"
              ? styles.badgeTaken
              : item.status === "To Take"
                ? styles.badgeToTake
                : styles.badgePending,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, John 👋</Text>
        <Text style={styles.sub}>Here is your today's schedule</Text>
      </View>

      <View style={styles.dateRow}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>May 18, 2024</Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>To Take</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Taken</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Missed</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Medicines</Text>
      </View>

      <FlatList
        data={medicines}
        keyExtractor={(i) => i.id}
        renderItem={renderMedicine}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFF", padding: 16 },
  header: { marginTop: 8, marginBottom: 12 },
  greeting: { fontSize: 20, fontWeight: "700", color: "#111" },
  sub: { marginTop: 6, color: "#6B6B7A" },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  dateBox: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EFEAFB",
  },
  dateText: { color: "#555" },
  summaryRow: { flexDirection: "row", gap: 10 },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#EFEAFB",
  },
  summaryNumber: { fontSize: 18, fontWeight: "800", color: "#2B2B3A" },
  summaryLabel: { marginTop: 4, color: "#6B6B7A" },
  sectionHeader: { marginTop: 10, marginBottom: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  medicineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0ECFB",
  },
  medicineLeft: { flexDirection: "row", alignItems: "center" },
  medicineIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#6B50E6",
    marginRight: 12,
  },
  medicineText: { maxWidth: 180 },
  medicineName: { fontWeight: "700" },
  medicineDose: { marginTop: 4, color: "#7B7A88", fontSize: 12 },
  medicineRight: { alignItems: "flex-end" },
  medicineTime: { color: "#7B7A88", fontWeight: "700" },
  statusBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTaken: { backgroundColor: "#E6F6EA" },
  badgeToTake: { backgroundColor: "#E8F0FF" },
  badgePending: { backgroundColor: "#FFF4E6" },
  statusText: { fontSize: 12, fontWeight: "700", color: "#2B2B3A" },
});
