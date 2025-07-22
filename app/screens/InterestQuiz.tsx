import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { StorageService } from '../../storageService';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const quiz = [
  // Section 1: Learning Goals
  {
    section: 'Learning Goals',
    question: "What's your primary motivation for learning?",
    options: [
      'Get a job or internship',
      'Switch careers',
      'Excel in my current role',
      'Explore something new',
      'Start freelancing or business'
    ],
    key: 'goal'
  },
  // Section 2: Background & Experience
  {
    section: 'Background & Experience',
    question: 'What is your current educational background?',
    options: [
      'High school',
      'Undergraduate student',
      'Graduate student',
      'Working professional',
      'Research/PhD',
      'Other'
    ],
    key: 'educationLevel'
  },
  {
    question: 'What field are you from or interested in?',
    options: [
      'Computer Science / IT',
      'Commerce / Business',
      'Arts / Humanities',
      'Science / Engineering',
      'Law / Policy',
      'Healthcare / Medicine',
      'Undecided / General Learning'
    ],
    key: 'fieldInterest'
  },
  {
    question: 'Do you have experience with any of these tools/languages?',
    options: [
      'Excel / Spreadsheets',
      'Python / R',
      'JavaScript / HTML',
      'Statistical tools (SPSS, Stata)',
      'Design tools (Figma, Canva)',
      'Project tools (Notion, Trello)',
      'None yet'
    ],
    key: 'toolsUsed',
    multi: true
  },

  // Section 3: Interests
  {
    section: 'Interests',
    question: 'Which topics are you most curious about?',
    options: [
      'Web / App Development',
      'Finance / Accounting',
      'Psychology / Sociology',
      'Data Analytics / AI',
      'Marketing / Sales',
      'Design / Creativity',
      'Cybersecurity / Networks',
      'Environment / Sustainability'
    ],
    key: 'domains',
    multi: true
  },
  {
    question: 'How do you like to learn best?',
    options: [
      'Watching videos',
      'Hands-on projects',
      'Reading articles/books',
      'Solving quizzes / problems'
    ],
    key: 'learningStyle'
  }
];

export default function InterestQuiz() {
  const navigation = useNavigation<NavProp>();
  const [current, setCurrent] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [userBio, setUserBio] = useState('');

  const startQuiz = () => setCurrent(0);

  const handleSelect = (option: string) => {
    const key = quiz[current].key;
    const isMulti = quiz[current].multi;
    const updated = { ...answers };

    if (isMulti) {
      const currentVals = (updated[key] as string[]) || [];
      updated[key] = currentVals.includes(option)
        ? currentVals.filter((o) => o !== option)
        : [...currentVals, option];
    } else {
      updated[key] = option;
    }

    setAnswers(updated);
  };

  const next = () => {
    const key = quiz[current].key;
    if (!answers[key] || (Array.isArray(answers[key]) && (answers[key] as string[]).length === 0)) {
      Alert.alert('Please select at least one option');
      return;
    }

    setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    if (!userBio.trim()) {
      Alert.alert('Please write a short description about yourself');
      return;
    }

    const fullData = { ...answers, userBio };
    await StorageService.setData('preferences', JSON.stringify(fullData));
    Alert.alert('Thank you! Your preferences are saved.');
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  // Intro screen
  if (current === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🚀 Help Us Know You!</Text>
        <Text style={styles.description}>
          We'll ask you a few quick, fun questions to understand your learning goals and recommend personalized content.
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={startQuiz}>
          <Text style={styles.nextText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // After last quiz question, show text input for user bio
  if (current === quiz.length) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎯 Final Step!</Text>
        <Text style={styles.description}>
          Tell us a bit about yourself — your goals, interests, or what you hope to achieve. This helps us personalize your learning journey.
        </Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="E.g. I'm a beginner interested in full stack development and want to land a remote job."
          value={userBio}
          onChangeText={setUserBio}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextText}>Submit & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Main quiz flow
  const q = quiz[current];
  const selected = answers[q.key];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progress}>Step {current + 1} of {quiz.length + 1}</Text>
      {q.section && <Text style={styles.section}>{q.section}</Text>}
      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((option) => {
        const isSelected = Array.isArray(selected)
          ? selected.includes(option)
          : selected === option;

        return (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelect(option)}
            style={[styles.option, isSelected && styles.selected]}
          >
            <Text style={[styles.optionText, isSelected && styles.selectedText]}>{option}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextText}>{current === quiz.length - 1 ? 'Next → Intro' : 'Next'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#0f766e' },
  description: { fontSize: 16, color: '#334155', marginBottom: 20 },
  progress: { fontSize: 14, color: '#94a3b8', marginBottom: 10 },
  section: { fontSize: 16, color: '#0f172a', fontWeight: '600', marginBottom: 4 },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#0f766e' },
  option: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  selected: { backgroundColor: '#0f766e' },
  optionText: { fontSize: 16, color: '#334155' },
  selectedText: { color: '#fff' },
  nextButton: {
    backgroundColor: '#10b981',
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  textInput: {
    height: 120,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#334155',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});
