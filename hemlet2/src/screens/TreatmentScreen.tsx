import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';

const treatments = [
  {
    id: 1,
    name: '神经康复',
    description: '帮助神经系统恢复和重建',
    duration: '30分钟',
    icon: 'brain',
  },
  {
    id: 2,
    name: '睡眠优化',
    description: '改善睡眠质量，帮助入睡',
    duration: '45分钟',
    icon: 'power-sleep',
  },
  {
    id: 3,
    name: '情绪调适',
    description: '缓解压力，改善心情',
    duration: '20分钟',
    icon: 'emoticon-outline',
  },
  {
    id: 4,
    name: '专注增强',
    description: '提高注意力和集中力',
    duration: '25分钟',
    icon: 'target',
  },
  {
    id: 5,
    name: '脑波调节',
    description: '调节大脑活动频率',
    duration: '35分钟',
    icon: 'sine-wave',
  },
  {
    id: 6,
    name: '认知改善',
    description: '增强记忆力和认知能力',
    duration: '40分钟',
    icon: 'lightbulb-outline',
  },
];

const TreatmentScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const startTreatment = () => {
    // 这里添加开始治疗的逻辑
    alert(`开始为 ${profile.name} 进行${selectedTreatment.name}治疗`);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <Title>当前使用者</Title>
          <Paragraph>{profile.name} | {profile.age}岁 | {profile.gender}</Paragraph>
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>选择治疗模式</Title>
      <View style={styles.treatmentGrid}>
        {treatments.map((treatment) => (
          <Card
            key={treatment.id}
            style={[
              styles.treatmentCard,
              selectedTreatment?.id === treatment.id && styles.selectedCard
            ]}
            onPress={() => setSelectedTreatment(treatment)}
          >
            <Card.Content>
              <Title style={styles.treatmentTitle}>{treatment.name}</Title>
              <Paragraph style={styles.treatmentDesc}>{treatment.description}</Paragraph>
              <Chip icon="clock" style={styles.durationChip}>
                {treatment.duration}
              </Chip>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Button
        mode="contained"
        style={styles.startButton}
        disabled={!selectedTreatment}
        onPress={startTreatment}
      >
        开始治疗
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  profileCard: {
    marginBottom: 24,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  treatmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  treatmentCard: {
    width: '47%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedCard: {
    backgroundColor: '#E8F0FE',
    borderColor: '#4285F4',
    borderWidth: 1,
  },
  treatmentTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  treatmentDesc: {
    fontSize: 12,
    marginBottom: 8,
  },
  durationChip: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
  startButton: {
    marginVertical: 24,
    paddingVertical: 8,
    backgroundColor: '#4285F4',
  },
});

export default TreatmentScreen; 