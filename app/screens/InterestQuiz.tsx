import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { StorageService } from '../../storageService';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../../AuthService';

const { height } = Dimensions.get('window');

const steps = [
  {
    section: 'Background & Experience',
    title: 'What is your current educational background?',
    key: 'educationLevel',
    options: [
      'High school',
      'Undergraduate student',
      'Graduate student',
      'Working professional',
      'Research/PhD',
      'Other',
    ],
  },
  {
    title: 'What field are you from or interested in?',
    key: 'fieldInterest',
    options: [
      'Computer Science / IT',
      'Commerce / Business',
      'Arts / Humanities',
      'Science / Engineering',
      'Law / Policy',
      'Healthcare / Medicine',
      'Undecided / General Learning',
    ],
  },
  {
    section: 'Interests',
    title: 'Which topics are you most curious about?',
    key: 'domains',
    options: [
      'Web / App Development',
      'Finance / Accounting',
      'Psychology / Sociology',
      'Data Analytics / AI',
      'Marketing / Sales',
      'Cybersecurity / Networks',
    ],
    multi: true,
  },
  {
    title: 'How do you like to learn best?',
    key: 'learningStyle',
    options: [
      'Watching videos',
      'Hands-on projects',
      'Reading articles/books',
      'Solving quizzes / problems',
    ],
    multi: true,
  },
];

export default function InterestQuiz() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [customInput, setCustomInput] = useState('');
  const { setUser } = useAuth();

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const selected = answers[step.key] || [];

  const toggleOption = (option: string) => {
    const isMulti = step.multi;
    if (isMulti) {
      const updated = selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option];
      setAnswers({ ...answers, [step.key]: updated });
    } else {
      setAnswers({ ...answers, [step.key]: [option] });
    }
  };

  const handleNext = () => {
    const trimmed = customInput.trim();
    const merged = trimmed ? [...selected, trimmed] : selected;

    if (merged.length === 0) return;

    setAnswers({ ...answers, [step.key]: merged });
    setCustomInput('');

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete({ ...answers, [step.key]: merged });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack(); // ✅ now works on first step
    }
  };

  const handleComplete = async (final: any) => {
    try {
      await StorageService.setData('profileSetup', JSON.stringify(final));
      await StorageService.setData('profileComplete', 'true');

      const currentUser = await AuthService.currentUser();
      if (currentUser) {
        setUser({
          username: currentUser.username,
          email: currentUser.email ?? '',
        });
      }

      // ✅ Route to Main (ensure 'Main' exists in your stack)
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (error) {
      console.error('Error completing profile setup:', error);
    }
  };

  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {[...Array(totalSteps)].map((_, index) => {
        const isActive = index === currentStep;
        return (
          <View
            key={index}
            style={[
              styles.stepCircle,
              isActive ? styles.stepCircleActive : styles.stepCircleInactive,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                isActive ? styles.stepNumberActive : styles.stepNumberInactive,
              ]}
            >
              {index + 1}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderOptions = () =>
    step.options.map((option) => {
      const isSelected = selected.includes(option);
      return (
        <TouchableOpacity
          key={option}
          style={[styles.optionBtn, isSelected && styles.optionSelected]}
          onPress={() => toggleOption(option)}
        >
          <View
            style={[
              styles.radioCircle,
              isSelected && styles.radioCircleSelected,
            ]}
          />
          <Text
            style={[
              styles.optionLabel,
              isSelected && styles.optionTextSelected,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      );
    });

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.subtitle}>
          Help us personalize your learning experience
        </Text>

        {renderStepper()}

        {step.section && <Text style={styles.sectionText}>{step.section}</Text>}
        <Text style={styles.question}>{step.title}</Text>

        <View>{renderOptions()}</View>

        <Text style={styles.inputLabel}>Add custom option:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={customInput}
          onChangeText={setCustomInput}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.backBtn, currentStep === 0 && styles.backBtn]}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ✅ styles unchanged from previous code
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    maxHeight: height * 0.82,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0f172a',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 13,
    marginBottom: 10,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
    gap: 8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#0f172a',
  },
  stepCircleInactive: {
    backgroundColor: '#e2e8f0',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: 'white',
  },
  stepNumberInactive: {
    color: '#64748b',
  },
  sectionText: {
    color: '#475569',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  question: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 10,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  optionSelected: {
    borderColor: '#0f766e',
    backgroundColor: '#ecfdf5',
  },
  radioCircle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1,
    borderColor: '#94a3b8',
    marginRight: 6,
  },
  radioCircleSelected: {
    backgroundColor: '#0f766e',
    borderColor: '#0f766e',
  },
  optionLabel: {
    fontSize: 12,
    color: '#334155',
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#0f766e',
  },
  inputLabel: {
    fontSize: 12,
    color: '#334155',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
  },
  backBtn: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  nextBtn: {
    flex: 1,
    backgroundColor: '#0f766e',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  nextText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});
