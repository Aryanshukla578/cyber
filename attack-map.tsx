"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

export default function AttackMap() {
  const [attackPoints, setAttackPoints] = useState([
    { id: 1, top: "30%", left: "20%", color: "#FF6B6B", active: true },
    { id: 2, top: "50%", left: "60%", color: "#4ECDC4", active: true },
    { id: 3, top: "70%", left: "40%", color: "#FFD93D", active: true },
  ])

  // Simulate attack points appearing and disappearing
  useEffect(() => {
    const interval = setInterval(() => {
      setAttackPoints((prev) => {
        // Randomly toggle visibility of attack points
        return prev.map((point) => ({
          ...point,
          active: Math.random() > 0.3,
        }))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Attack Map</Text>
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://api.a0.dev/assets/image?text=cybersecurity%20attack%20map%20visualization%20with%20blue%20lines%20connecting%20different%20points%20across%20a%20world%20map%20dark%20theme&aspect=16:9",
          }}
          style={styles.map}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          {attackPoints.map(
            (point) =>
              point.active && (
                <View
                  key={point.id}
                  style={[
                    styles.point,
                    {
                      top: point.top,
                      left: point.left,
                      backgroundColor: point.color,
                    },
                  ]}
                />
              ),
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  point: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.8,
  },
})

