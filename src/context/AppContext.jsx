import { createContext, useContext, useState, useCallback } from 'react';
import {
  employees as initialEmployees,
  attendanceRecords as initialAttendance,
  leaveRequests as initialLeaveRequests,
  recentActivities as initialActivities,
} from '../data/sampleData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [employeesList, setEmployeesList] = useState(initialEmployees);
  const [leaveRequestsList, setLeaveRequestsList] = useState(initialLeaveRequests);
  const [attendanceList, setAttendanceList] = useState(initialAttendance);
  const [activitiesList, setActivitiesList] = useState(initialActivities);
  const [toast, setToast] = useState(null);

  // Auth state — null means not logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Role: 'admin' (Sarah Mitchell) or 'employee' (Ethan Wilson)
  const [userRole, setUserRole] = useState('admin');
  const [isClockedIn, setIsClockedIn] = useState(true);
  // Track exact clock-in timestamp so the live timer can compute elapsed/remaining
  const [clockInTime, setClockInTime] = useState(() => {
    // Default: clocked in at 09:02 AM today
    const t = new Date();
    t.setHours(9, 2, 0, 0);
    return t;
  });
  const [clockOutTime, setClockOutTime] = useState(null);
  // Shift window: 09:00 – 18:00
  const SHIFT_START = { h: 9, m: 0 };
  const SHIFT_END   = { h: 18, m: 0 };

  const currentUser =
    userRole === 'admin'
      ? {
          id: 'ADM001',
          name: 'Sarah Mitchell',
          role: 'Administrator',
          email: 'sarah.mitchell@peoplehub.com',
          avatar:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        }
      : {
          id: 'EMP001',
          name: 'Ethan Wilson',
          role: 'Senior Software Developer',
          email: 'ethan.wilson@peoplehub.com',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const switchRole = (newRole) => {
    setUserRole(newRole);
    setIsAuthenticated(true);
    showToast(
      newRole === 'admin'
        ? 'Switched to Administrator Mode (Sarah Mitchell)'
        : 'Switched to Employee Self-Service Mode (Ethan Wilson)',
      'success'
    );
  };

  const login = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('admin');
  };

  const toggleClock = () => {
    const now = new Date();
    const nextState = !isClockedIn;
    setIsClockedIn(nextState);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (nextState) {
      setClockInTime(now);
      setClockOutTime(null);
      showToast(`Clocked in successfully at ${timeStr}`, 'success');
      setActivitiesList((prev) => [
        { text: `Ethan Wilson clocked in at ${timeStr}`, time: 'Just now', type: 'attendance' },
        ...prev,
      ]);
    } else {
      setClockOutTime(now);
      showToast(`Clocked out successfully at ${timeStr}`, 'warning');
      setActivitiesList((prev) => [
        { text: `Ethan Wilson clocked out at ${timeStr}`, time: 'Just now', type: 'attendance' },
        ...prev,
      ]);
    }
  };

  const submitEmployeeLeave = (req) => {
    const newId = `LR00${leaveRequestsList.length + 1}`;
    const newLeave = {
      id: newId,
      employeeId: 'EMP001',
      name: 'Ethan Wilson',
      department: 'Engineering',
      leaveType: req.type || 'Casual Leave',
      fromDate: req.fromDate,
      toDate: req.toDate,
      days: Number(req.days) || 1,
      status: 'Pending',
      reason: req.reason || 'Personal appointment',
      balanceRemaining: 12,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    };

    setLeaveRequestsList((prev) => [newLeave, ...prev]);
    setActivitiesList((prev) => [
      {
        text: `Ethan Wilson submitted ${req.type} request (${req.days} days)`,
        time: 'Just now',
        type: 'leave',
      },
      ...prev,
    ]);
    showToast('Leave request submitted to Sarah Mitchell for approval', 'success');
  };

  const approveLeave = (id) => {
    let reqName = '';
    setLeaveRequestsList((prev) =>
      prev.map((lr) => {
        if (lr.id === id) {
          reqName = lr.name;
          return { ...lr, status: 'Approved' };
        }
        return lr;
      })
    );
    setActivitiesList((prev) => [
      {
        text: `${reqName || 'Employee'}'s leave request was approved`,
        time: 'Just now',
        type: 'leave',
      },
      ...prev,
    ]);
    showToast(`Leave request for ${reqName || 'employee'} approved.`, 'success');
  };

  const rejectLeave = (id) => {
    let reqName = '';
    setLeaveRequestsList((prev) =>
      prev.map((lr) => {
        if (lr.id === id) {
          reqName = lr.name;
          return { ...lr, status: 'Rejected' };
        }
        return lr;
      })
    );
    setActivitiesList((prev) => [
      {
        text: `${reqName || 'Employee'}'s leave request was rejected`,
        time: 'Just now',
        type: 'leave',
      },
      ...prev,
    ]);
    showToast(`Leave request for ${reqName || 'employee'} rejected.`, 'danger');
  };

  const addEmployee = (newEmp) => {
    const id = `EMP00${employeesList.length + 1}`;
    const fullEmp = {
      id,
      name: newEmp.name,
      email: newEmp.email,
      phone: newEmp.phone || '+1 (555) 000-1234',
      department: newEmp.department,
      designation: newEmp.designation,
      status: 'Active',
      workMode: newEmp.workMode || 'Hybrid',
      location: newEmp.location || 'San Francisco, CA',
      joiningDate: new Date().toISOString().split('T')[0],
      tenure: '0 mos (New Hire)',
      employmentType: 'Full-time',
      reportingManager: 'Sarah Mitchell',
      avatar:
        newEmp.avatar ||
        `https://images.unsplash.com/photo-${1534528741775 + employeesList.length}?w=150&h=150&fit=crop&crop=face`,
      leaveBalance: { annual: 14, sick: 8, casual: 5, totalRemaining: 27 },
      attendance: { present: 1, absent: 0, late: 0, percentage: 100 },
    };

    setEmployeesList((prev) => [fullEmp, ...prev]);
    setAttendanceList((prev) => [
      {
        employeeId: id,
        name: newEmp.name,
        department: newEmp.department,
        shift: '09:00 – 18:00',
        checkIn: '09:00 AM',
        checkOut: '—',
        workingHours: 'In Progress',
        status: 'Present',
        source: 'Web App',
        avatar: fullEmp.avatar,
      },
      ...prev,
    ]);
    setActivitiesList((prev) => [
      {
        text: `New employee ${newEmp.name} onboarded to ${newEmp.department}`,
        time: 'Just now',
        type: 'profile',
      },
      ...prev,
    ]);
    showToast(`${newEmp.name} successfully added to organization.`, 'success');
  };

  const updateEmployee = (id, updatedFields) => {
    setEmployeesList((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    );
    showToast('Employee profile updated successfully.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        employees: employeesList,
        leaveRequests: leaveRequestsList,
        attendance: attendanceList,
        activities: activitiesList,
        toast,
        userRole,
        currentUser,
        isAuthenticated,
        isClockedIn,
        clockInTime,
        clockOutTime,
        SHIFT_START,
        SHIFT_END,
        login,
        logout,
        switchRole,
        toggleClock,
        submitEmployeeLeave,
        showToast,
        approveLeave,
        rejectLeave,
        addEmployee,
        updateEmployee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
