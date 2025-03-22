"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface FirewallRule {
  id: number
  name: string
  port: number
  protocol: string
  action: "BLOCK" | "ALLOW"
  enabled: boolean
}

const FirewallRulesScreen = () => {
  const [rules, setRules] = useState<FirewallRule[]>([
    {
      id: 1,
      name: "Block SSH Access",
      port: 22,
      protocol: "TCP",
      action: "BLOCK",
      enabled: true,
    },
    {
      id: 2,
      name: "Allow HTTPS",
      port: 443,
      protocol: "TCP",
      action: "ALLOW",
      enabled: true,
    },
    {
      id: 3,
      name: "Block Telnet",
      port: 23,
      protocol: "TCP",
      action: "BLOCK",
      enabled: true,
    },
    {
      id: 4,
      name: "Block FTP",
      port: 21,
      protocol: "TCP",
      action: "BLOCK",
      enabled: false,
    },
  ])

  const toggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Firewall Rules</Text>
          <Text style={styles.headerSubtitle}>Manage Network Security</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Rule</Text>
        </TouchableOpacity>

        {rules.map((rule) => (
          <View key={rule.id} style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <MaterialCommunityIcons
                name={rule.action === "BLOCK" ? "shield-lock" : "shield-check"}
                size={24}
                color={rule.action === "BLOCK" ? "#FF6B6B" : "#4ECDC4"}
              />
              <Text style={styles.ruleName}>{rule.name}</Text>
              <Switch
                value={rule.enabled}
                onValueChange={() => toggleRule(rule.id)}
                trackColor={{ false: "#767577", true: "#4ECDC4" }}
                thumbColor={rule.enabled ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>

            <View style={styles.ruleDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Port:</Text>
                <Text style={styles.detailText}>{rule.port}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Protocol:</Text>
                <Text style={styles.detailText}>{rule.protocol}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Action:</Text>
                <View
                  style={[
                    styles.actionBadge,
                    {
                      backgroundColor: rule.action === "BLOCK" ? "#FF6B6B" : "#4ECDC4",
                    },
                  ]}
                >
                  <Text style={styles.actionText}>{rule.action}</Text>
                </View>
              </View>
            </View>

            <View style={styles.ruleActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                <MaterialCommunityIcons name="delete" size={20} color="#FF6B6B" />
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4ECDC4",
    borderStyle: "dashed",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 8,
  },
  ruleCard: {
    backgroundColor: "#2A2A2A",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  ruleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ruleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
    flex: 1,
  },
  ruleDetails: {
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#888888",
    fontSize: 14,
    width: 80,
  },
  detailText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  actionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  ruleActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  actionButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
  },
  deleteButton: {
    marginLeft: 16,
  },
  deleteButtonText: {
    color: "#FF6B6B",
  },
})

export default FirewallRulesScreen

