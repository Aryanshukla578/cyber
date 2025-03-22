"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LineChart } from "react-native-chart-kit"
import ThreatCard from "../components/threat-card"
import AttackMap from "../components/attack-map"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen({ navigation }) {
  const [totalThreats, setTotalThreats] = useState(156)
  const [activeAttacks, setActiveAttacks] = useState(23)

  // Simulated data for the chart
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  }

  // In a real app, you would fetch actual threat data from an API
  useEffect(() => {
    // Simulate data updates
    const interval = setInterval(() => {
      setTotalThreats((prev) => prev + Math.floor(Math.random() * 3))
      setActiveAttacks(Math.floor(Math.random() * 30) + 10)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Security Dashboard</Text>
          <Text style={styles.headerSubtitle}>Real-time Threat Monitor</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#FF6B6B" }]}>
            <MaterialCommunityIcons name="shield-alert" size={24} color="white" />
            <Text style={styles.statNumber}>{totalThreats}</Text>
            <Text style={styles.statLabel}>Total Threats</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#4ECDC4" }]}>
            <MaterialCommunityIcons name="shield-check" size={24} color="white" />
            <Text style={styles.statNumber}>{activeAttacks}</Text>
            <Text style={styles.statLabel}>Active Attacks</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Attack Trends</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#1E2923",
              backgroundGradientFrom: "#2C3E50",
              backgroundGradientTo: "#3498DB",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <AttackMap />

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ThreatAnalysis")}>
            <MaterialCommunityIcons name="shield-bug" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Threat Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("FirewallRules")}>
            <MaterialCommunityIcons name="security" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Firewall Rules</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("NetworkTraffic")}>
            <MaterialCommunityIcons name="chart-line" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Network Traffic</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.threatList}>
          <Text style={styles.sectionTitle}>Recent Threats</Text>
          <ThreatCard type="Botnet" severity="High" timestamp="2 min ago" location="United States" status="Blocked" />
          <ThreatCard type="Phishing" severity="Medium" timestamp="5 min ago" location="China" status="Investigating" />
          <ThreatCard type="DDoS" severity="Critical" timestamp="15 min ago" location="Russia" status="Mitigated" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888888",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  statCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  chartContainer: {
    padding: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  threatList: {
    padding: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#2A2A2A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "30%",
  },
  actionButtonText: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
})

