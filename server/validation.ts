import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

export const PunchSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee ID is required' }),
  employeeName: z.string().min(1, { message: 'Employee Name is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.enum(['IN', 'OUT'], { message: 'Punch type must be IN or OUT' }),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});

export const ShiftSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee ID is required' }),
  employeeName: z.string().min(1, { message: 'Employee Name is required' }),
  dayIndex: z.number().min(0).max(6, { message: 'Day index must be between 0 (Monday) and 6 (Sunday)' }),
  shiftType: z.enum(['Morning', 'Day', 'Evening', 'Night']),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i, { message: 'Invalid start time format' }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i, { message: 'Invalid end time format' }),
  hours: z.number().positive({ message: 'Hours must be a positive number' })
});

export const PayrollRunSchema = z.object({
  cycle: z.string().min(1, { message: 'Pay cycle string is required' }),
  daysExpected: z.number().positive().default(26),
  overtimeRateMultiplier: z.number().positive().default(1.5),
  employeeIds: z.array(z.string()).min(1, { message: 'At least one employee must be selected for payroll' })
});

export const LeaveSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee ID is required' }),
  leaveType: z.enum(['CASUAL', 'SICK', 'EARNED', 'UNPAID']),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Start date must be YYYY-MM-DD' }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'End date must be YYYY-MM-DD' }),
  reason: z.string().min(3, { message: 'Reason must be at least 3 characters' })
});

export const BlogPostSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  summary: z.string().min(5, { message: 'Summary must be at least 5 characters' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
  status: z.enum(['Published', 'Draft']),
  author: z.string().min(1, { message: 'Author is required' })
});
