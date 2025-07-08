import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

const quizQuestions = [
  {
    id: 1,
    question: 'When working on projects, I prefer to:',
    options: [
      'Solve complex technical problems',
      'Design visual elements and user experiences',
      'Lead teams and coordinate efforts',
      'Analyze data and find patterns',
      'Create content and communicate ideas',
    ],
  },
  {
    id: 2,
    question: 'I find the most satisfaction in:',
    options: [
      'Building something that works perfectly',
      'Creating something visually appealing',
      'Helping others achieve their goals',
      'Discovering insights from information',
      'Expressing myself creatively',
    ],
  },
  {
    id: 3,
    question: 'In a team setting, I naturally take on the role of:',
    options: [
      'Technical expert',
      'Creative contributor',
      'Organizer or facilitator',
      'Researcher or strategist',
      'Communicator or presenter',
    ],
  },
  {
    id: 4,
    question: 'When learning something new, I prefer to:',
    options: [
      'Understand how it works in detail',
      'See visual examples and demonstrations',
      'Discuss it with others in a group',
      'Research and compare different approaches',
      'Get hands-on and learn by doing',
    ],
  },
  {
    id: 5,
    question: "I'm most drawn to courses about:",
    options: [
      'Programming and software development',
      'Design and visual arts',
      'Business and entrepreneurship',
      'Science and research methods',
      'Communication and media',
    ],
  },
];

export default function QuizScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [quizQuestions[current].id]: option });
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Profile'); // ✅ Navigate using React Navigation
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const question = quizQuestions[current];
  const selected = answers[question.id];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Analyzing your responses...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progressText}>
        Question {current + 1} of {quizQuestions.length}
      </Text>
      <Text style={styles.question}>{question.question}</Text>

      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(option)}
          style={[
            styles.optionButton,
            selected === option && styles.selectedOption,
          ]}
        >
          <Text style={selected === option ? styles.selectedText : styles.optionText}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, current === 0 && styles.disabledButton]}
          onPress={handlePrev}
          disabled={current === 0}
        >
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            !selected && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={!selected}
        >
          <Text style={styles.navText}>
            {current === quizQuestions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#0f172a',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  optionText: {
    color: '#0f766e',
    fontWeight: '500',
  },
  selectedOption: {
    backgroundColor: '#ccfbf1',
    borderColor: '#0f766e',
  },
  selectedText: {
    color: '#0f766e',
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#334155',
  },
});
