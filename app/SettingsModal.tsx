import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Paramètres</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Langue</Text>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
            >
              <Text style={styles.languageButtonText}>
                {language === 'en' ? 'Change to ES' : 'Cambiar a EN'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Mode sombre</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              thumbColor={isDarkMode ? "#767577" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#FFD700" }}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              thumbColor={notificationsOn ? "#767577" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#FFD700" }}
            />
          </View>
          
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Informations</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  languageButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
  },
  languageButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: '#3A3A3A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsModal;