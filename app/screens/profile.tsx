import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { StorageService } from "../../storageService";
import { ProfileService } from "../../ProfileService";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [aliasId, setAliasId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "achievements" | "courses" | "stats"
  >("achievements");

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  const loadProfile = async () => {
    try {
      const id = await StorageService.getData("aliasId");
      const email = user?.email;
      if (!id || !email) return;
      setAliasId(id);
      const res = await ProfileService.getProfileDetails(email, id);
      setProfile(res);
    } catch (e) {
      console.warn("Profile load failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  const displayName = profile?.name || "Emma Johnson";

  const handleSave = () => {
    setProfile({ ...profile, name: editedName });
    setIsEditing(false);
    // Optional: call ProfileService.updateProfileDetails(email, aliasId, { name: editedName });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://images.weserv.nl/?url=ui-avatars.com/api/?name=${encodeURIComponent(
              profile?.name || "Emma Johnson"
            )}&background=0f766e&color=fff&size=128`,
          }}
          style={styles.avatar}
        />

        <View style={styles.headerText}>
          {isEditing ? (
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              style={[styles.name, styles.editableInput]}
              placeholder="Enter name"
            />
          ) : (
            <Text style={styles.name}>{displayName}</Text>
          )}
          <Text style={styles.subtext}>Student • Joined May 2024</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setEditedName(displayName);
            setIsEditing(true);
          }}
        >
          <Ionicons name="create-outline" size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      {isEditing && (
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Interest Areas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Interest Areas</Text>
        <View style={styles.interestList}>
          {["Web Development", "UI/UX Design", "Digital Marketing"].map(
            (item) => (
              <View key={item} style={styles.interestTag}>
                <Text style={styles.interestText}>{item}</Text>
              </View>
            )
          )}
          <TouchableOpacity style={styles.interestAdd}>
            <Text style={styles.addIcon}>+ Add More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Overview */}
      <Text style={styles.sectionTitle}>Progress Overview</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Technical Path</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "25%" }]} />
          </View>
          <Text style={styles.progressPercent}>25%</Text>
        </View>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Creative Path</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFillAlt, { width: "40%" }]} />
          </View>
          <Text style={styles.progressPercent}>40%</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["achievements", "courses", "stats"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
            <Text style={[styles.tab, activeTab === tab && styles.tabActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conditional Tab Content */}
      {activeTab === "achievements" && (
        <>
          <View style={styles.badgeHeader}>
            <Text style={styles.sectionTitle}>Recent Badges</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <MaterialCommunityIcons
                name="trophy-award"
                size={24}
                color="white"
              />
              <Text style={styles.badgeLabel}>Quiz Master</Text>
            </View>
            <View style={styles.badge}>
              <MaterialCommunityIcons
                name="map-marker-path"
                size={24}
                color="white"
              />
              <Text style={styles.badgeLabel}>Roadmap Explorer</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#cbd5e1" }]}>
              <Ionicons name="star-outline" size={24} color="#64748b" />
              <Text style={styles.badgeLabel}>Skill Builder</Text>
            </View>
          </View>
        </>
      )}

      {activeTab === "courses" && (
        <View style={styles.nextStepCard}>
          <Text style={styles.nextStepTitle}>Web Development Basics</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "30%" }]} />
          </View>
          <Text style={styles.progressPercent}>3/10 modules completed</Text>
        </View>
      )}

      {activeTab === "stats" && (
        <View style={styles.statsContainer}>
          {[
            { label: "Active Days", value: "7", icon: "calendar-outline" },
            { label: "Badges Earned", value: "2", icon: "ribbon-outline" },
            { label: "Lessons Completed", value: "3", icon: "book-outline" },
            { label: "Total Points", value: "120", icon: "star-outline" },
          ].map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Ionicons name={item.icon as any} size={26} color="#0f766e" />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Recommendations */}
      <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
      <View style={styles.nextStepCard}>
        <Text style={styles.nextStepTitle}>Web Development Basics</Text>
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeText}>Ready for a New Challenge?</Text>
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={styles.challengeButtonText}>
            Take Skills Assessment →
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
    paddingTop: 40, // added extra top padding to lower entire content
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 24, // added margin top to push header lower
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtext: {
    color: "#64748b",
  },
  editableInput: {
    borderBottomWidth: 1,
    borderColor: "#94a3b8",
    paddingBottom: 2,
  },
  saveBtn: {
    backgroundColor: "#0f766e",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveBtnText: { color: "#fff", fontWeight: "600" },
  cancelBtn: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cancelBtnText: { color: "#334155", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  interestList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestTag: {
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: { color: "#334155" },
  interestAdd: {
    backgroundColor: "#0f766e",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  addIcon: { color: "#fff", fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  progressContainer: { flexDirection: "row", gap: 12, marginBottom: 20 },
  progressCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },
  progressTitle: { fontWeight: "600", color: "#1e293b", marginBottom: 6 },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#0f766e" },
  progressBarFillAlt: { height: "100%", backgroundColor: "#7c3aed" },
  progressPercent: { marginTop: 6, color: "#334155", fontSize: 12 },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  tab: {
    color: "#64748b",
    fontWeight: "600",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tabActive: { color: "#0f766e", borderBottomWidth: 2, borderColor: "#0f766e" },
  badgeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  linkText: { color: "#0f766e", fontWeight: "600" },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#0f766e",
  },
  badgeLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
  },
  nextStepCard: {
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  nextStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0369a1",
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#0f172a" },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },
  challengeCard: {
    backgroundColor: "#fef3c7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  challengeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 8,
  },
  challengeButton: {
    backgroundColor: "#f59e0b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  challengeButtonText: { color: "white", fontWeight: "bold" },
});
