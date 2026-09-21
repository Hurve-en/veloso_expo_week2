import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { summarise } from "@/data/summary";
import { ShareBar } from "@/components/share-bar";
import { useCustomers } from "@/hooks/use-customers";

export default function HomeScreen() {
  const { status, customers, problem, retry } = useCustomers();

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text style={styles.stateText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text style={styles.stateTitle}>Something went wrong</Text>
        <Text style={styles.stateText}>{problem}</Text>

        <Text style={styles.retry} onPress={retry}>
          Try again
        </Text>
      </SafeAreaView>
    );
  }

  if (status === "empty") {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text style={styles.stateTitle}>No customers yet</Text>
        <Text style={styles.stateText}>
          Add a customer to see your dashboard.
        </Text>
      </SafeAreaView>
    );
  }

  const summary = summarise(customers);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.greeting}>Dashboard</Text>
        <Text style={styles.subtitle}>Customer payment overview</Text>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL OWED</Text>
          <Text style={styles.totalValue}>₱ {summary.total.toFixed(2)}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AVERAGE OWED</Text>
            <Text style={styles.statValue}>₱ {summary.average.toFixed(2)}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>STILL OWING</Text>
            <Text style={styles.statValue}>{summary.owing}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SETTLED</Text>
            <Text style={styles.statValue}>{summary.settled}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>CUSTOMERS</Text>
            <Text style={styles.statValue}>{summary.count}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Breakdown</Text>
          <Text style={styles.sectionSubtitle}>Share of total amount owed</Text>

          <View style={styles.bars}>
            {summary.ranked.map((customer) => (
              <ShareBar
                key={customer.id}
                name={customer.name}
                share={customer.share}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    marginBottom: 24,
  },

  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    marginBottom: 14,
  },

  totalLabel: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  totalValue: {
    color: "#111",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 0.5,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    marginBottom: 20,
  },

  bars: {
    gap: 8,
  },

  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },

  stateTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  stateText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  retry: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "700",
    color: "#2196f3",
  },
});
