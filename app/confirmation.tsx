import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { name, date, time } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Booking Confirmed!</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/view-bookings')}
          >
            <Text style={styles.buttonText}>View All Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: '#2C2C2E',
    padding: 25,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#38383A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailItem: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
}); 