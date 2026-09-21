import { Pressable, StyleSheet, Text } from "react-native";

export interface CustomerRowProps {
  id: string;
  name: string;
  balance: number;
  lastPaid: string;
  defaultExpanded?: boolean;
  onPress: () => void;
}

export function CustomerRow({
  name,
  balance,
  lastPaid,
  defaultExpanded = false,
  onPress,
}: CustomerRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>₱ {balance.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
  },
  balance: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  lastPaid: {
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
});
