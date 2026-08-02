export interface AttendanceRecord {
  id: string;
  employeeName: string;
  avatarInitials: string;
  role: string;
  location: string;
  status: 'In-Facility' | 'On-Break' | 'Clocked-Out' | 'Geofence-Alert';
  lastPunchTime: string;
  lastPunchType: 'Clock In' | 'Break Start' | 'Break End' | 'Clock Out';
  deviceType: 'Mobile GPS' | 'Biometric Face ID' | 'Kiosk NFC';
  gpsCoordinates: { lat: number; lng: number };
  accuracyMeters: number;
  isGeofenced: boolean;
  lastStateChangeTimestamp: number;
}

export interface AttendanceEvent {
  id: string;
  recordId: string;
  employeeName: string;
  type: 'Clock In' | 'Break Start' | 'Break End' | 'Clock Out' | 'Geofence-Alert';
  time: string;
  location: string;
}

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'emp-101',
    employeeName: 'Alex Rivera',
    avatarInitials: 'AR',
    role: 'Senior Tech Lead',
    location: 'Austin Hub',
    status: 'In-Facility',
    lastPunchTime: '08:00:14 AM',
    lastPunchType: 'Clock In',
    deviceType: 'Mobile GPS',
    gpsCoordinates: { lat: 30.2672, lng: -97.7431 },
    accuracyMeters: 3.2,
    isGeofenced: true,
    lastStateChangeTimestamp: Date.now() - 3600000
  },
  {
    id: 'emp-102',
    employeeName: 'Jordan Chen',
    avatarInitials: 'JC',
    role: 'Shift Operations Lead',
    location: 'Austin Hub',
    status: 'On-Break',
    lastPunchTime: '12:15:00 PM',
    lastPunchType: 'Break Start',
    deviceType: 'Biometric Face ID',
    gpsCoordinates: { lat: 30.2678, lng: -97.7438 },
    accuracyMeters: 1.5,
    isGeofenced: true,
    lastStateChangeTimestamp: Date.now() - 1800000
  },
  {
    id: 'emp-103',
    employeeName: 'Morgan Smith',
    avatarInitials: 'MS',
    role: 'Dispatch Coordinator',
    location: 'Dallas Facility',
    status: 'In-Facility',
    lastPunchTime: '08:30:22 AM',
    lastPunchType: 'Clock In',
    deviceType: 'Mobile GPS',
    gpsCoordinates: { lat: 32.7767, lng: -96.7970 },
    accuracyMeters: 4.8,
    isGeofenced: true,
    lastStateChangeTimestamp: Date.now() - 7200000
  },
  {
    id: 'emp-104',
    employeeName: 'Taylor Reed',
    role: 'Logistics Specialist',
    avatarInitials: 'TR',
    location: 'Austin Hub',
    status: 'Geofence-Alert',
    lastPunchTime: '09:12:05 AM',
    lastPunchType: 'Clock In',
    deviceType: 'Mobile GPS',
    gpsCoordinates: { lat: 30.2850, lng: -97.7600 },
    accuracyMeters: 28.5,
    isGeofenced: false,
    lastStateChangeTimestamp: Date.now() - 900000
  },
  {
    id: 'emp-105',
    employeeName: 'Elena Rostova',
    avatarInitials: 'ER',
    role: 'Quality Inspector',
    location: 'Dallas Facility',
    status: 'Clocked-Out',
    lastPunchTime: '05:00:00 PM',
    lastPunchType: 'Clock Out',
    deviceType: 'Biometric Face ID',
    gpsCoordinates: { lat: 32.7770, lng: -96.7975 },
    accuracyMeters: 1.2,
    isGeofenced: true,
    lastStateChangeTimestamp: Date.now() - 14400000
  }
];
