export interface LeaveRecord {
  id: String;
  staffId: String;
  fullName: String;
  applyDate: Date;
  leaveType: string;
  takenDays: number;
  startDate: Date;
  endDate: Date;
  phoneDuringLeave: string;
  reason?: string;
  leaveStatus: 'Pending' | 'Approved' | 'Rejected';
}

// export interface LeaveTypeDetails {
//   leaveType: 'Annual' | 'Off-In-Lieu' | 'Medical';
//   totalDays: number;
//   remainingDays: number;
// }

export const leaveRecordEmptyInitialObj : LeaveRecord = {
  id: '',
  staffId: '',
  fullName: '',
  applyDate: new Date(),
  leaveType: 'Annual',
  takenDays: 0,
  startDate: new Date(),
  endDate: new Date(),
  phoneDuringLeave: '',
  reason: '',
  leaveStatus: 'Pending'
}