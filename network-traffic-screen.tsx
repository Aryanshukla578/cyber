"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LineChart } from "react-native-chart-kit"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const NetworkTrafficScreen = () => {
  const [trafficData, setTrafficData] = useState({
    labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25"],
    inbound: [65, 78, 90, 81, 56, 55],
    outbound: [45, 67, 89, 76, 45, 51],
  })

  const [stats, setStats] = useState({
    totalTraffic: "2.45 GB",
    activeConnections: 125,
    avgLatency: "24ms",
    packetLoss: "0.02%",
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })

      setTrafficData((prev) => ({
        labels: [...prev.labels.slice(1), currentTime],
        inbound: [...prev.inbound.slice(1), Math.floor(Math.random() * 100)],
        outbound: [...prev.outbound.slice(1), Math.floor(Math.random() * 100)],
      }))

      // Update stats occasionally
      if (Math.random() > 0.7) {
        setStats({
          totalTraffic: `${(Math.random() * 5).toFixed(2)} GB`,
          activeConnections: Math.floor(Math.random() * 200) + 50,
          avgLatency: `${Math.floor(Math.random() * 50) + 10}ms`,
          packetLoss: `${(Math.random() * 0.1).toFixed(2)}%`,
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Network Traffic</Text>
          <Text style={styles.headerSubtitle}>Real-time Monitoring</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#4ECDC4" />
            <Text style={styles.statValue}>{stats.totalTraffic}</Text>
            <Text style={styles.statLabel}>Total Traffic</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="connection" size={24} color="#FFD93D" />
            <Text style={styles.statValue}>{stats.activeConnections}</Text>
            <Text style={styles.statLabel}>Active Connections</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="timer-outline" size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>{stats.avgLatency}</Text>
            <Text style={styles.statLabel}>Avg Latency</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="package-down" size={24} color="#FF69B4" />
            <Text style={styles.statValue}>{stats.packetLoss}</Text>
            <Text style={styles.statLabel}>Packet Loss</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Traffic Flow</Text>
          <LineChart
            data={{
              labels: trafficData.labels,
              datasets: [
                {
                  data: trafficData.inbound,
                  color: (opacity = 1) => `rgba(78, 205, 196, ${opacity})`,
                },
                {
                  data: trafficData.outbound,
                  color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
                },
              ],
              legend: ["Inbound", "Outbound"],
            }}
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
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fafafa",
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#4ECDC4" }]} />
            <Text style={styles.legendText}>Inbound Traffic</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]} />
            <Text style={styles.legendText}>Outbound Traffic</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {\
    fontSize: 14, 14,
    color: '#888888',
    marginTop: 4,
  },
  chartContainer: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default NetworkTrafficScreen

