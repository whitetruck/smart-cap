import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Switch, Button } from 'react-native-paper';

const DeviceScreen = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const batteryLevel = 85;

  return (
    <View style={styles.container}>
      <Card style={styles.deviceCard}>
        <Card.Content>
          <Title>设备状态</Title>
          <List.Item
            title="连接状态"
            description={isConnected ? '已连接' : '未连接'}
            left={props => <List.Icon {...props} icon="bluetooth" color={isConnected ? '#4285F4' : '#EA4335'} />}
            right={() => (
              <Switch
                value={isConnected}
                onValueChange={setIsConnected}
                color="#4285F4"
              />
            )}
          />
          <List.Item
            title="电池电量"
            description={`${batteryLevel}%`}
            left={props => <List.Icon {...props} icon="battery" color={batteryLevel > 20 ? '#34A853' : '#EA4335'} />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.settingsCard}>
        <Card.Content>
          <Title>设备设置</Title>
          <List.Item
            title="自动连接"
            description="打开应用时自动连接设备"
            left={props => <List.Icon {...props} icon="connection" />}
            right={() => (
              <Switch
                value={autoConnect}
                onValueChange={setAutoConnect}
                color="#4285F4"
              />
            )}
          />
          <List.Item
            title="固件版本"
            description="V1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        style={styles.resetButton}
        onPress={() => alert('设备已重置')}
      >
        重置设备
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
    marginBottom: 16,
    elevation: 4,
  },
  settingsCard: {
    marginBottom: 16,
    elevation: 4,
  },
  resetButton: {
    marginTop: 24,
    borderColor: '#EA4335',
    borderWidth: 2,
  },
});

export default DeviceScreen; 