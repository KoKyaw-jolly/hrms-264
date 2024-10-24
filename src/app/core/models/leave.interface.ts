export interface LeaveRecord {
  id: string;
  staffId: string;
  applyDate: Date;
  leaveTypeId: string;
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
  applyDate: new Date(),
  leaveTypeId: '',
  takenDays: 0,
  startDate: new Date(),
  endDate: new Date(),
  phoneDuringLeave: '',
  reason: '',
  leaveStatus: 'Pending'
}