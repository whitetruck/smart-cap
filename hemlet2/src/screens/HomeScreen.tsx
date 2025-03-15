import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, List } from 'react-native-paper';

const users = [
  { id: 1, name: '老公', age: 45, gender: '男' },
  { id: 2, name: '老婆', age: 42, gender: '女' },
  { id: 3, name: '爷爷', age: 80, gender: '男' },
  { id: 4, name: '儿子', age: 18, gender: '男' },
];

const HomeScreen = ({ navigation }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <View style={styles.container}>
      <Card style={styles.deviceCard}>
        <Card.Content>
          <View style={styles.deviceHeader}>
            <Title>灵境光盔</Title>
            <View style={styles.deviceStatus}>
              <Avatar.Icon size={24} icon="battery" color="#34A853" />
              <Paragraph>85%</Paragraph>
              <Avatar.Icon size={24} icon="bluetooth" color="#4285F4" />
              <Paragraph>已连接</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>选择使用者</Title>
      {users.map((profile) => (
        <List.Item
          key={profile.id}
          title={profile.name}
          description={`${profile.age}岁 | ${profile.gender}`}
          left={props => <List.Icon {...props} icon="account" />}
          onPress={() => setSelectedProfile(profile)}
          style={[
            styles.profileItem,
            selectedProfile?.id === profile.id && styles.selectedProfile
          ]}
        />
      ))}

      <Button
        mode="contained"
        style={styles.startButton}
        disabled={!selectedProfile}
        onPress={() => navigation.navigate('Treatment', { profile: selectedProfile })}
      >
        开始治疗
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  deviceCard: {
    marginBottom: 24,
    elevation: 4,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  selectedProfile: {
    backgroundColor: '#E8F0FE',
    borderColor: '#4285F4',
    borderWidth: 1,
  },
  startButton: {
    marginTop: 24,
    paddingVertical: 8,
    backgroundColor: '#4285F4',
  },
});

export default HomeScreen; 