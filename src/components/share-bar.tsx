import { StyleSheet, Text, View } from "react-native";

interface ShareBarProps {
  name: string;
  share: number;
}

export function ShareBar({ name, share }: ShareBarProps) {
  const percent = share * 100;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.percent}>{percent.toFixed(0)}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.bar, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
  },

  percent: {
    fontSize: 14,
  },

  track: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },

  bar: {
    height: "100%",
    backgroundColor: "#2196f3",
  },
});
