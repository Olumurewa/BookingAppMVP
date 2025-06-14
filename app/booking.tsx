import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Platform } from 'react-native';
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

  const handleBooking = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
        
        <View style={styles.formGroup}>
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

        <View style={styles.formGroup}>
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
          style={styles.button}
          onPress={handleBooking}
        >
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
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
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  dateTimeButton: {
    backgroundColor: '#2C2C2E',
    borderWidth: 1,
    borderColor: '#38383A',
    padding: 15,
    borderRadius: 12,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
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
}); 