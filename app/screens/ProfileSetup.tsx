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
    title: 'What is your name?',
    key: 'name',
    isTextInput: true,
  },
  {
    title: 'What are you currently pursuing?',
    key: 'currentPursuit',
    options: [
      'School (Grade 9–12)',
      'Undergraduate degree',
      'Postgraduate degree',
      'Preparing for competitive exams',
      'Working professional',
      'Taking a gap year',
      'Still figuring it out',
    ],
  },
  {
    title: 'What are your areas of interest?',
    key: 'interests',
    options: [
      'Technology & Coding',
      'Business & Startups',
      'Art & Design',
      'Psychology & Human Behavior',
      'Content Creation & Media',
      'Environment & Social Impact',
      'Sports & Fitness',
    ],
    multi: true,
  },
  {
    title: 'If your life had a title based on your current vibe, what would it be?',
    key: 'lifeVibe',
    options: [
      'Going with the flow',
      'Future CEO in making',
      'Multi-tasking genius',
      'Learning mode: ON',
      "Don't know, but I'm curious!",
    ],
    multi: false,
  },
  {
    title: 'Pick your go-to learning method:',
    key: 'learningStyle',
    options: [
      'Podcasts',
      'YouTube videos',
      'Deep reading',
      'Hands-on practical experience',
      'Group chats/discussions',
    ],
    multi: true,
  },
];

export default function ProfileSetup() {
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
    const inputTrimmed = customInput.trim();
    const merged = inputTrimmed ? [...selected, inputTrimmed] : selected;

    if (step.isTextInput && inputTrimmed === '') return;
    if (!step.isTextInput && merged.length === 0) return;

    setAnswers({ ...answers, [step.key]: step.isTextInput ? [inputTrimmed] : merged });
    setCustomInput('');

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete({ ...answers, [step.key]: step.isTextInput ? [inputTrimmed] : merged });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
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
    step.options?.map((option) => {
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

        <Text style={styles.question}>{step.title}</Text>

        {step.isTextInput ? (
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            value={customInput}
            onChangeText={setCustomInput}
          />
        ) : (
          <>
            <View>{renderOptions()}</View>
            <Text style={styles.inputLabel}>Add custom option:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={customInput}
              onChangeText={setCustomInput}
            />
          </>
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
            <Text style={styles.nextText}>
              {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
