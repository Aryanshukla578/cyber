"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface Threat {
  id: number
  type: string
  details: string
  payload: string
  timestamp: string
  ipAddress: string
  status: string
  risk: string
}

const ThreatAnalysisScreen = () => {
  const [threats] = useState<Threat[]>([
    {
      id: 1,
      type: "SQL Injection",
      details: "Attempted SQL injection at login endpoint",
      payload: "' OR '1'='1",
      timestamp: "2025-03-22T10:30:00",
      ipAddress: "192.168.1.100",
      status: "Blocked",
      risk: "High",
    },
    {
      id: 2,
      type: "XSS Attack",
      details: "Cross-site scripting attempt detected",
      payload: "<script>alert('xss')</script>",
      timestamp: "2025-03-22T10:35:00",
      ipAddress: "192.168.1.101",
      status: "Analyzing",
      risk: "Medium",
    },
    {
      id: 3,
      type: "Brute Force",
      details: "Multiple failed login attempts detected",
      payload: "password attempts: admin123, password123, 12345678",
      timestamp: "2025-03-22T10:40:00",
      ipAddress: "192.168.1.102",
      status: "Mitigated",
      risk: "High",
    },
  ])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Threat Analysis</Text>
          <Text style={styles.headerSubtitle}>Detailed Attack Information</Text>
        </View>

        {threats.map((threat) => (
          <View key={threat.id} style={styles.threatCard}>
            <View style={styles.threatHeader}>
              <MaterialCommunityIcons name="bug-outline" size={24} color="#FF6B6B" />
              <Text style={styles.threatType}>{threat.type}</Text>
              <View style={[styles.riskBadge, { backgroundColor: threat.risk === "High" ? "#FF6B6B" : "#FFD93D" }]}>
                <Text style={styles.riskText}>{threat.risk}</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Details:</Text>
              <Text style={styles.detailText}>{threat.details}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Payload:</Text>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>{threat.payload}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>IP Address:</Text>
              <Text style={styles.infoText}>{threat.ipAddress}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Timestamp:</Text>
              <Text style={styles.infoText}>{new Date(threat.timestamp).toLocaleString()}</Text>
            </View>

            <View style={styles.statusContainer}>
              <MaterialCommunityIcons
                name={threat.status === "Blocked" ? "shield-check" : "shield-alert"}
                size={20}
                color={threat.status === "Blocked" ? "#4ECDC4" : "#FFD93D"}
              />
              <Text style={[styles.statusText, { color: threat.status === "Blocked" ? "#4ECDC4" : "#FFD93D" }]}>
                {threat.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
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
  threatCard: {
    backgroundColor: "#2A2A2A",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  threatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  threatType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailSection: {
    marginBottom: 12,
  },
  detailLabel: {
    color: "#888888",
    fontSize: 14,
    marginBottom: 4,
  },
  detailText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  codeBox: {
    backgroundColor: "#000000",
    padding: 8,
    borderRadius: 8,
  },
  codeText: {
    color: "#4ECDC4",
    fontFamily: "monospace",
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#888888",
    fontSize: 14,
    width: 100,
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
})

export default ThreatAnalysisScreen

