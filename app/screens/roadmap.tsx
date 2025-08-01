import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, Linking, ActivityIndicator
} from 'react-native';
import axios from 'axios';

const roadmap = [
  { id: 1, title: 'Introduction to Programming', tags: ['Basic syntax', 'Variables', 'Functions'], status: 'Completed', button: 'Review' },
  { id: 2, title: 'Object-Oriented Programming', tags: ['Classes', 'Inheritance', 'Polymorphism'], status: 'Not started', button: 'Start' },
  { id: 3, title: 'Web Development Fundamentals', tags: ['HTML', 'CSS', 'JavaScript'], status: 'Not started', button: 'Start' },
];

export default function Roadmap() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await axios.post(
          'https://udemy-api2.p.rapidapi.com/v1/udemy/category/programming_languages',
          {
            page: 1,
            page_size: 5,
            price: ['free', 'paid'],
            sort: 'popularity',
            locale: 'en_US',
            extract_pricing: true
          },
          {
            headers: {
              'X-RapidAPI-Key': 'dafc3c8mshb75a3c1c151b3cbp119964jsnc9ed8025333f',
              'X-RapidAPI-Host': 'udemy-api2.p.rapidapi.com',
              'Content-Type': 'application/json',
            }
          }
        );

        const raw = resp.data?.data?.courses?.slice(0, 5) || [];

        const formatted = raw.map((c: any) => ({
          image: c.images?.[6] || '',
          title: c.title,
          desc: c.headline || '',
          tags: c.tags?.slice(0, 3) || [],
          rating: c.rating?.toFixed(1) || 'N/A',
          duration: c.course_length || 'N/A',
          price: c.purchase?.price?.price_string || 'Free',
          instructor: c.instructors?.[0]?.display_name || 'Instructor Unknown',
          url: `https://www.udemy.com${c.url}`
        }));

        setCourses(formatted);
      } catch (e) {
        console.error('Error fetching courses:', e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const open = (url: string) => Linking.openURL(url).catch(console.error);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Learning Roadmap</Text>

      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.tabActive]}>Technical</Text>
        <Text style={styles.tab}>Creative</Text>
        <Text style={styles.tab}>Analytical</Text>
      </View>

      <Text style={styles.subheading}>
        Your technical pathway focuses on programming and development skills.
      </Text>

      {roadmap.map((s) => (
        <View key={s.id} style={styles.stepWrapper}>
          <Text style={styles.stepNumber}>{s.id}</Text>
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <View style={styles.tagRow}>
              {s.tags.map((t, i) => (
                <Text key={i} style={styles.skillTag}>{t}</Text>
              ))}
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.status}>{s.status}</Text>
              <TouchableOpacity style={s.button === 'Start' ? styles.startBtn : styles.reviewBtn}>
                <Text style={s.button === 'Start' ? styles.startText : styles.reviewText}>
                  {s.button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.recommendHeader}>
        <Text style={styles.recommendHeading}>Recommended For You</Text>
        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0f766e" />
      ) : (
        courses.map((c, i) => (
          <View key={i} style={styles.courseCard}>
            <Image source={{ uri: c.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <View style={styles.badgeRow}>
                <Text style={styles.badgeBeginner}>Beginner</Text>
                <Text style={styles.badgeCourse}>Course</Text>
              </View>
              <Text style={styles.courseTitle}>{c.title}</Text>
              <Text style={styles.courseDesc}>{c.desc}</Text>

              <View style={styles.tagRow}>
                <Text style={styles.instructorTag}>{c.instructor}</Text>
                <Text style={styles.metaTag}>⭐ {c.rating}</Text>
                <Text style={styles.metaTag}>⏱️ {c.duration}</Text>
                <Text style={c.price.toLowerCase().includes('free') ? styles.freeTag : styles.paidTag}>
                  {c.price.toLowerCase().includes('free') ? 'Free' : 'Paid'}
                </Text>
              </View>

              <View style={styles.tagRow}>
                {c.tags.map((t: string, j: number) => (
                  <Text key={j} style={styles.courseTag}>{t}</Text>
                ))}
              </View>

              <TouchableOpacity
                style={styles.learnMoreBtn}
                onPress={() => open(c.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 12, marginTop: 40 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    color: '#64748b',
  },
  tabActive: {
    backgroundColor: '#facc15',
    color: '#0f172a',
    fontWeight: '600'
  },
  subheading: { fontSize: 14, color: '#475569', marginBottom: 16 },
  stepWrapper: { flexDirection: 'row', marginBottom: 16 },
  stepNumber: { marginRight: 12, color: '#94a3b8', fontSize: 16 },
  stepCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 12,
    padding: 16,
  },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  skillTag: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  status: { fontSize: 13, color: '#64748b' },
  startBtn: {
    backgroundColor: '#0f766e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  startText: { color: '#fff', fontWeight: '600' },
  reviewBtn: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fde68a'
  },
  reviewText: { color: '#92400e', fontWeight: '600' },
  recommendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12
  },
  recommendHeading: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  seeAll: { fontSize: 14, color: '#0f766e' },

  courseCard: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fde68a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: { width: '100%', height: 180 },
  courseContent: { padding: 16 },
  badgeRow: { flexDirection: 'row', marginBottom: 6 },
  badgeBeginner: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8
  },
  badgeCourse: {
    backgroundColor: '#fde68a',
    color: '#92400e',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4
  },
  courseDesc: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4
  },
  instructorTag: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  metaTag: {
    backgroundColor: '#f0fdf4',
    color: '#15803d',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  freeTag: {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
  },
  paidTag: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
  },
  courseTag: {
    backgroundColor: '#fde68a',
    color: '#78350f',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  learnMoreBtn: {
    backgroundColor: '#10b981', // pleasant green
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  learnMoreText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
