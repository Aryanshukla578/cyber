import { View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface ThreatCardProps {
  type: string
  severity: string
  timestamp: string
  location: string
  status: string
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "#FF6B6B"
    case "medium":
      return "#FFD93D"
    case "critical":
      return "#FF0000"
    default:
      return "#4ECDC4"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "blocked":
      return "shield-check"
    case "investigating":
      return "magnify"
    case "mitigated":
      return "shield-half-full"
    default:
      return "shield-alert"
  }
}

const getThreatIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "botnet":
      return "robot"
    case "phishing":
      return "fish"
    case "ddos":
      return "lan"
    case "malware":
      return "bug"
    case "ransomware":
      return "lock"
    default:
      return "alert-circle"
  }
}

export default function ThreatCard({ type, severity, timestamp, location, status }: ThreatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <MaterialCommunityIcons name={getThreatIcon(type)} size={24} color="#FFFFFF" />
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(severity) }]}>
          <Text style={styles.severityText}>{severity}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#888888" />
          <Text style={styles.detailText}>{timestamp}</Text>
        </View>
        <View style={styles.detail}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#888888" />
          <Text style={styles.detailText}>{location}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <MaterialCommunityIcons name={getStatusIcon(status)} size={20} color="#4ECDC4" />
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    color: "#888888",
    marginLeft: 8,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    color: "#4ECDC4",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
})

