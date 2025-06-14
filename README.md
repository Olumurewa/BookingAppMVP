# BookingAppMVP

## Built for Frulo AI's initial technical assessment

A modern, cross-platform booking application built with Expo, React Native, and Expo Router. Supports web and mobile (IOS and Android) with a beautiful dark theme and smooth user experience.

## Features
- Book appointments with date and time pickers (web and mobile support)
- View all bookings
- Confirmation screen after booking
- Modern dark theme and custom fonts (Poppins)
- Responsive design for web and mobile
- Animated page transitions and button loaders

## Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- [Expo CLI](https://docs.expo.dev/get-started/installation/):
  ```bash
  npm install -g expo-cli
  ```

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd BookingAppMVP
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Download Fonts
The app uses the Poppins font. If not already present, download the following files into `assets/fonts/`:
- Poppins-Regular.ttf
- Poppins-Medium.ttf
- Poppins-SemiBold.ttf
- Poppins-Bold.ttf

You can get them from [Google Fonts](https://fonts.google.com/specimen/Poppins).

### 5. Start the App

- Offline Mode (Recomended)
  ```bash
  EXPO_OFFLINE=1 npx expo start 
  ```
- For web:
  ```bash
  npm run web
  ```
- For mobile (Android/iOS):
  ```bash
  npm run android
  # or
  npm run ios
  ```

## Usage
- Home: Start a new booking or view your bookings.
- Booking: Enter your name, select a date and time, and confirm.
- Confirmation: See your booking details and navigate to view all bookings.
- View Bookings: See a list of all your bookings.

## Animations & Loaders
- Page transitions use fade-in animation.
- All main action buttons show a loading spinner and a short delay for better UX.

## Troubleshooting
- **Fonts not loading?** Ensure the Poppins font files are in `assets/fonts/`.
- **Date/Time picker not working on web?** Make sure `react-datepicker` is installed and CSS is imported.
- **Module errors?** Run `npm install` to ensure all dependencies are present.
- **Expo Go issues?** Try clearing cache: `expo start -c`.

## Customization
- Edit styles in `app/styles/datepicker.css` and component files for colors, fonts, and layout.
- Adjust time intervals or business hours in the booking screen as needed.

## License
MIT 
