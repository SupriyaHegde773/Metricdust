
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const roadmap = [
  {
    id: 1,
    title: 'Introduction to Programming',
    tags: ['Basic syntax', 'Variables', 'Functions'],
    status: 'Completed',
    button: 'Review',
  },
  {
    id: 2,
    title: 'Object-Oriented Programming',
    tags: ['Classes', 'Inheritance', 'Polymorphism'],
    status: 'Not started',
    button: 'Start',
  },
  {
    id: 3,
    title: 'Web Development Fundamentals',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'Not started',
    button: 'Start',
  },
  {
    id: 4,
    title: 'Advanced Frontend Development',
    tags: ['React', 'State Management', 'API Integration'],
    status: 'Not started',
    button: 'Start',
  },
];

export default function Roadmap() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Learning Roadmap</Text>

      {/* Pathway Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Technical</Text>
        <Text style={styles.tab}>Creative</Text>
        <Text style={styles.tab}>Analytical</Text>
      </View>

      <Text style={styles.subheading}>
        Your technical pathway focuses on programming and development skills.
      </Text>

      {/* Roadmap Items */}
      {roadmap.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.stepNumber}>{index + 1}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.tagRow}>
              {item.tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>{tag}</Text>
              ))}
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.statusText}>{item.status}</Text>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  item.button === 'Review' && styles.reviewButton
                ]}
              >
                <Text
                  style={[
                    styles.actionText,
                    item.button === 'Review' && styles.reviewText
                  ]}
                >
                  {item.button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0f766e'
  },
  tabs: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  tab: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  tabActive: {
    color: '#facc15',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  subheading: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
    color: '#334155',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0f766e',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    color: '#334155',
    marginRight: 8,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    color: '#64748b',
  },
  actionButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  reviewButton: {
    backgroundColor: '#fef3c7',
  },
  reviewText: {
    color: '#92400e',
  },
});
