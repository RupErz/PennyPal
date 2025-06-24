import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';

const SettingsScreen = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('12500');
  const [displayName, setDisplayName] = useState('Rupert');
  const [currency, setCurrency] = useState('USD');
  const [payFrequency, setPayFrequency] = useState('Monthly');
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [appLock, setAppLock] = useState(false);

  const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'];
  const payFrequencies = ['Monthly', 'Bi-weekly', 'Weekly'];

  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);

  const handleSave = () => {
    Alert.alert(
      'Settings Saved',
      'Your settings have been updated successfully!',
      [{ text: 'OK' }]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', style: 'destructive' }
      ]
    );
  };

  const SettingItem = ({ icon, label, children, description }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingHeader}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {description && <Text style={styles.settingDescription}>{description}</Text>}
      {children}
    </View>
  );

  const SectionHeader = ({ icon, title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const PickerModal = ({ visible, options, selected, onSelect, onClose }) => {
    if (!visible) return null;
    
    return (
      <View style={styles.pickerOverlay}>
        <View style={styles.pickerModal}>
          <Text style={styles.pickerTitle}>Select Option</Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pickerOption,
                selected === option && styles.pickerOptionSelected
              ]}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={[
                styles.pickerOptionText,
                selected === option && styles.pickerOptionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.pickerCancel} onPress={onClose}>
            <Text style={styles.pickerCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileSubtext}>Tap avatar to change photo</Text>
        </View>

        {/* Financial Settings */}
        <SectionHeader icon="💰" title="Financial Settings" />
        
        <SettingItem icon="💵" label="Monthly Income">
          <TextInput
            style={styles.input}
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            placeholder="Enter your monthly income"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="numeric"
          />
        </SettingItem>

        <SettingItem icon="👤" label="Display Name">
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </SettingItem>

        <SettingItem icon="🌍" label="Currency">
          <TouchableOpacity 
            style={styles.selectButton}
            onPress={() => setShowCurrencyPicker(true)}
          >
            <Text style={styles.selectButtonText}>{currency}</Text>
            <Text style={styles.selectButtonArrow}>▼</Text>
          </TouchableOpacity>
        </SettingItem>

        <SettingItem icon="📊" label="Pay Frequency">
          <TouchableOpacity 
            style={styles.selectButton}
            onPress={() => setShowFrequencyPicker(true)}
          >
            <Text style={styles.selectButtonText}>{payFrequency}</Text>
            <Text style={styles.selectButtonArrow}>▼</Text>
          </TouchableOpacity>
        </SettingItem>

        {/* Notifications */}
        <SectionHeader icon="🔔" title="Notifications" />
        
        <SettingItem 
          icon="🔔" 
          label="Daily Reminders"
          description="Get reminded to track your expenses"
        >
          <Switch
            value={dailyReminders}
            onValueChange={setDailyReminders}
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#22c55e' }}
            thumbColor={dailyReminders ? '#ffffff' : '#f4f3f4'}
          />
        </SettingItem>

        <SettingItem 
          icon="📈" 
          label="Weekly Reports"
          description="Receive weekly spending summaries"
        >
          <Switch
            value={weeklyReports}
            onValueChange={setWeeklyReports}
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#22c55e' }}
            thumbColor={weeklyReports ? '#ffffff' : '#f4f3f4'}
          />
        </SettingItem>

        {/* Achievements */}
        <SectionHeader icon="🏆" title="Achievements" />
        
        <SettingItem icon="🏅" label="Current Achievement">
          <View style={styles.achievementBadge}>
            <Text style={styles.achievementText}>🎯 God of Discipline</Text>
          </View>
        </SettingItem>

        {/* App Settings */}
        <SectionHeader icon="⚙️" title="App Settings" />
        
        <SettingItem 
          icon="🔒" 
          label="App Lock"
          description="Require biometric or passcode to open app"
        >
          <Switch
            value={appLock}
            onValueChange={setAppLock}
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#22c55e' }}
            thumbColor={appLock ? '#ffffff' : '#f4f3f4'}
          />
        </SettingItem>

        {/* Bottom spacing for buttons */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Picker Modals */}
      <PickerModal
        visible={showCurrencyPicker}
        options={currencies}
        selected={currency}
        onSelect={setCurrency}
        onClose={() => setShowCurrencyPicker(false)}
      />

      <PickerModal
        visible={showFrequencyPicker}
        options={payFrequencies}
        selected={payFrequency}
        onSelect={setPayFrequency}
        onClose={() => setShowFrequencyPicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: -32, // Compensate for back button width
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginBottom: 30,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileAvatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  profileSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  settingItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    marginBottom: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22c55e',
    flex: 1,
  },
  settingDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    marginLeft: 36,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  selectButtonArrow: {
    color: '#22c55e',
    fontSize: 12,
  },
  achievementBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  achievementText: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
  // Picker Modal Styles
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModal: {
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#22c55e',
  },
  pickerOptionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pickerOptionTextSelected: {
    fontWeight: 'bold',
  },
  pickerCancel: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  pickerCancelText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SettingsScreen;