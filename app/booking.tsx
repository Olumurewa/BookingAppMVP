import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Platform, Animated, Easing, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '../context/BookingContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../utils/dateUtils';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./styles/datepicker.css";

export default function BookingScreen() {
  const router = useRouter();
  const { bookings, addBooking } = useBooking();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBooking = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const booking = {
        name,
        date: formatDate(date),
        time: formatTime(time)
      };
      addBooking(booking);
      router.push({
        pathname: '/confirmation',
        params: booking
      });
    }, 1200);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleTimeChange = (newTime: Date | null) => {
    if (newTime) {
      setTime(newTime);
    }
  };

  const renderBookingItem = ({ item }: { item: any }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingName}>{item.name}</Text>
      <Text style={styles.bookingDateTime}>{item.date} at {item.time}</Text>
    </View>
  );

  // Web-only styles for centering and width (React Native compatible)
  const webScrollContent = Platform.OS === 'web' ? {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 600,
  } : undefined;
  const webContent = Platform.OS === 'web' ? {
    width: 400,
    maxWidth: 400,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 16,
    backgroundColor: 'rgba(44,44,46,0.98)',
    // boxShadow is not supported in RN, so skip it
  } : undefined;

  const formGroupWeb = Platform.OS === 'web' ? { marginBottom: 40 } : undefined;
  const contentWeb = Platform.OS === 'web' ? { paddingBottom: 100 } : undefined;
  const buttonWeb = Platform.OS === 'web' ? { marginTop: 32 } : undefined;

  return (
    <ScrollView style={styles.container} contentContainerStyle={webScrollContent}>
      <Animated.View style={[styles.content, webContent, contentWeb, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Make a Booking</Text>

        {bookings.length > 0 && (
          <View style={styles.bookingsList}>
            <Text style={styles.sectionTitle}>Existing Bookings</Text>
            <FlatList
              data={bookings}
              renderItem={renderBookingItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError('');
            }}
          />
        </View>
        
        <View style={[styles.formGroup, formGroupWeb]}>
          <Text style={styles.label}>Date</Text>
          {Platform.OS === 'web' ? (
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              wrapperClassName="datePicker"
              className="datePickerInput"
              popperClassName="datePickerPopper"
              popperPlacement="bottom-start"
            />
          ) : (
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateTimeButtonText}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.formGroup, formGroupWeb]}>
          <Text style={styles.label}>Time</Text>
          {Platform.OS === 'web' ? (
            <DatePicker
              selected={time}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select a time"
              wrapperClassName="datePicker"
              className="datePickerInput"
              popperClassName="datePickerPopper"
              popperPlacement="bottom-start"
              autoComplete="off"
            />
          ) : (
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateTimeButtonText}>
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Native pickers for iOS/Android */}
        {Platform.OS !== 'web' && showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
            textColor="#FFFFFF"
          />
        )}

        {Platform.OS !== 'web' && showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            textColor="#FFFFFF"
          />
        )}

        <TouchableOpacity 
          style={[styles.button, buttonWeb]}
          onPress={handleBooking}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loader}>
              {Platform.OS === 'web' ? (
                <div className="loader-spinner" />
              ) : (
                <ActivityIndicator color="#fff" />
              )}
            </View>
          ) : (
            <Text style={styles.buttonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  bookingsList: {
    padding: 20,
    backgroundColor: '#2C2C2E',
    marginBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#38383A',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  bookingName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bookingDateTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderWidth: 1,
    borderColor: '#38383A',
    padding: Platform.OS === 'web' ? 8 : 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  dateTimeButton: {
    backgroundColor: '#2C2C2E',
    borderWidth: 1,
    borderColor: '#38383A',
    padding: Platform.OS === 'web' ? 8 : 15,
    borderRadius: 12,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: Platform.OS === 'web' ? 10 : 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    width: Platform.OS === 'web' ? 200 : '100%',
    alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  error: {
    color: '#FF453A',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  loader: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Add this to your CSS (e.g. in app/styles/datepicker.css or a new file):
// .loader-spinner {
//   border: 3px solid #f3f3f3;
//   border-top: 3px solid #007AFF;
//   border-radius: 50%;
//   width: 18px;
//   height: 18px;
//   animation: spin 1s linear infinite;
// }
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// } 