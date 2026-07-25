// Centralized mock data for the StaySync RMS prototype.
// All values are static placeholders — no backend, no API calls.

export const stats = [
  { id: 'total-rooms', label: 'Total Rooms', value: 128, delta: '+4', trend: 'up', icon: 'bed' },
  { id: 'available-rooms', label: 'Available Rooms', value: 42, delta: '+6', trend: 'up', icon: 'doorOpen' },
  { id: 'occupied-rooms', label: 'Occupied Rooms', value: 86, delta: '-2', trend: 'down', icon: 'key' },
  { id: 'check-ins', label: "Today's Check-Ins", value: 14, delta: '+3', trend: 'up', icon: 'login' },
  { id: 'check-outs', label: "Today's Check-Outs", value: 9, delta: '-1', trend: 'down', icon: 'logout' },
  { id: 'revenue', label: "Today's Revenue", value: '$4,820', delta: '+12%', trend: 'up', icon: 'dollar' },
]

export const recentCheckIns = [
  { id: 'G-2041', guest: 'Amara Okafor', room: '204', type: 'Deluxe', time: '09:12 AM' },
  { id: 'G-2042', guest: 'Liam Chen', room: '118', type: 'Standard', time: '09:48 AM' },
  { id: 'G-2043', guest: 'Sofia Rossi', room: '310', type: 'Suite', time: '10:05 AM' },
  { id: 'G-2044', guest: 'Noah Williams', room: '102', type: 'Standard', time: '10:31 AM' },
  { id: 'G-2045', guest: 'Priya Nair', room: '220', type: 'Deluxe', time: '11:02 AM' },
]

export const recentCheckOuts = [
  { id: 'G-2010', guest: 'Mateo García', room: '208', type: 'Deluxe', time: '08:30 AM' },
  { id: 'G-2011', guest: 'Hana Kim', room: '115', type: 'Standard', time: '08:55 AM' },
  { id: 'G-2012', guest: 'Omar Haddad', room: '305', type: 'Suite', time: '09:20 AM' },
  { id: 'G-2013', guest: 'Elena Petrova', room: '110', type: 'Standard', time: '09:40 AM' },
]

// 7-day occupancy (percentage) for the dashboard chart.
export const occupancyData = [
  { day: 'Mon', occupancy: 62 },
  { day: 'Tue', occupancy: 70 },
  { day: 'Wed', occupancy: 68 },
  { day: 'Thu', occupancy: 75 },
  { day: 'Fri', occupancy: 84 },
  { day: 'Sat', occupancy: 92 },
  { day: 'Sun', occupancy: 78 },
]

// 7-day revenue (USD) for the dashboard chart.
export const revenueData = [
  { day: 'Mon', revenue: 3200 },
  { day: 'Tue', revenue: 4100 },
  { day: 'Wed', revenue: 3800 },
  { day: 'Thu', revenue: 4500 },
  { day: 'Fri', revenue: 5600 },
  { day: 'Sat', revenue: 6800 },
  { day: 'Sun', revenue: 4820 },
]

export const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive']

export const availableRooms = [
  { id: 'R-101', number: '101', type: 'Standard', rent: 1200 },
  { id: 'R-102', number: '102', type: 'Standard', rent: 1200 },
  { id: 'R-118', number: '118', type: 'Standard', rent: 1200 },
  { id: 'R-204', number: '204', type: 'Deluxe', rent: 2400 },
  { id: 'R-220', number: '220', type: 'Deluxe', rent: 2400 },
  { id: 'R-310', number: '310', type: 'Suite', rent: 4200 },
  { id: 'R-312', number: '312', type: 'Suite', rent: 4200 },
  { id: 'R-401', number: '401', type: 'Executive', rent: 5800 },
]

// ── Room Availability mock data ──────────────────────────────────────────────
// 25 rooms across 4 floors with realistic booking data for a 14-day window.
// Each booking references a guest and spans a date range (ISO strings).
export const roomStatuses = ['available', 'occupied', 'reserved', 'maintenance', 'cleaning']

export const statusMeta = {
  available: { label: 'Available', dot: 'bg-success', text: 'text-success', chip: 'bg-green-50 text-success dark:bg-green-900/40 dark:text-green-300', bar: 'bg-success' },
  occupied: { label: 'Occupied', dot: 'bg-danger', text: 'text-danger', chip: 'bg-red-50 text-danger dark:bg-red-900/40 dark:text-red-300', bar: 'bg-primary-800' },
  reserved: { label: 'Reserved', dot: 'bg-warning', text: 'text-warning', chip: 'bg-amber-50 text-warning dark:bg-amber-900/40 dark:text-amber-300', bar: 'bg-warning' },
  maintenance: { label: 'Maintenance', dot: 'bg-slate-400', text: 'text-slate-500', chip: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300', bar: 'bg-slate-400' },
  cleaning: { label: 'Cleaning', dot: 'bg-primary-500', text: 'text-primary-600', chip: 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200', bar: 'bg-primary-500' },
}

const guests = [
  { name: 'Amara Okafor', phone: '+91 98765 43210', invoice: 'INV-2026-00045', purpose: 'Business', payment: 'Paid' },
  { name: 'Liam Chen', phone: '+91 99876 54321', invoice: 'INV-2026-00046', purpose: 'Leisure', payment: 'Pending' },
  { name: 'Sofia Rossi', phone: '+91 90011 22334', invoice: 'INV-2026-00047', purpose: 'Conference', payment: 'Paid' },
  { name: 'Noah Williams', phone: '+91 90123 45678', invoice: 'INV-2026-00048', purpose: 'Leisure', payment: 'Partial' },
  { name: 'Priya Nair', phone: '+91 91234 56789', invoice: 'INV-2026-00049', purpose: 'Family Visit', payment: 'Paid' },
  { name: 'Mateo García', phone: '+91 92345 67890', invoice: 'INV-2026-00050', purpose: 'Business', payment: 'Pending' },
  { name: 'Hana Kim', phone: '+91 93456 78901', invoice: 'INV-2026-00051', purpose: 'Medical', payment: 'Paid' },
  { name: 'Omar Haddad', phone: '+91 94567 89012', invoice: 'INV-2026-00052', purpose: 'Leisure', payment: 'Paid' },
  { name: 'Elena Petrova', phone: '+91 95678 90123', invoice: 'INV-2026-00053', purpose: 'Business', payment: 'Partial' },
  { name: 'Daniel Lee', phone: '+91 96789 01234', invoice: 'INV-2026-00054', purpose: 'Conference', payment: 'Paid' },
  { name: 'Fatima Zahra', phone: '+91 97890 12345', invoice: 'INV-2026-00055', purpose: 'Leisure', payment: 'Pending' },
  { name: 'James O\'Brien', phone: '+91 98901 23456', invoice: 'INV-2026-00056', purpose: 'Business', payment: 'Paid' },
]

// Helper to build a date offset from a fixed reference "today" (2026-07-25).
const ref = new Date('2026-07-25T00:00:00')
const day = (offset) => {
  const d = new Date(ref)
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

let bookingId = 1
const b = (roomIdx, startOff, endOff, guestIdx, charges, status = 'occupied') => ({
  id: `BK-${String(bookingId++).padStart(4, '0')}`,
  roomIdx,
  start: day(startOff),
  end: day(endOff),
  guest: guests[guestIdx],
  charges,
  status,
})

export const rooms = [
  // Floor 1
  { id: 'R-101', number: '101', type: 'Deluxe', ac: true, floor: 1, capacity: 2, rent: 2400 },
  { id: 'R-102', number: '102', type: 'Deluxe', ac: true, floor: 1, capacity: 2, rent: 2400 },
  { id: 'R-103', number: '103', type: 'Deluxe', ac: false, floor: 1, capacity: 2, rent: 2000 },
  { id: 'R-104', number: '104', type: 'Standard', ac: true, floor: 1, capacity: 2, rent: 1200 },
  { id: 'R-105', number: '105', type: 'Family', ac: true, floor: 1, capacity: 4, rent: 3600 },
  { id: 'R-106', number: '106', type: 'Standard', ac: false, floor: 1, capacity: 2, rent: 1000 },
  { id: 'R-107', number: '107', type: 'Suite', ac: true, floor: 1, capacity: 3, rent: 4200 },
  // Floor 2
  { id: 'R-201', number: '201', type: 'Deluxe', ac: true, floor: 2, capacity: 2, rent: 2400 },
  { id: 'R-202', number: '202', type: 'Suite', ac: true, floor: 2, capacity: 3, rent: 4200 },
  { id: 'R-203', number: '203', type: 'Standard', ac: true, floor: 2, capacity: 2, rent: 1200 },
  { id: 'R-204', number: '204', type: 'Deluxe', ac: true, floor: 2, capacity: 2, rent: 2400 },
  { id: 'R-205', number: '205', type: 'Family', ac: true, floor: 2, capacity: 4, rent: 3600 },
  { id: 'R-206', number: '206', type: 'Standard', ac: false, floor: 2, capacity: 2, rent: 1000 },
  { id: 'R-207', number: '207', type: 'Executive', ac: true, floor: 2, capacity: 2, rent: 5800 },
  // Floor 3
  { id: 'R-301', number: '301', type: 'Suite', ac: true, floor: 3, capacity: 3, rent: 4200 },
  { id: 'R-302', number: '302', type: 'Deluxe', ac: true, floor: 3, capacity: 2, rent: 2400 },
  { id: 'R-303', number: '303', type: 'Standard', ac: true, floor: 3, capacity: 2, rent: 1200 },
  { id: 'R-304', number: '304', type: 'Executive', ac: true, floor: 3, capacity: 2, rent: 5800 },
  { id: 'R-305', number: '305', type: 'Suite', ac: true, floor: 3, capacity: 3, rent: 4200 },
  { id: 'R-306', number: '306', type: 'Deluxe', ac: false, floor: 3, capacity: 2, rent: 2000 },
  // Floor 4
  { id: 'R-401', number: '401', type: 'Executive', ac: true, floor: 4, capacity: 2, rent: 5800 },
  { id: 'R-402', number: '402', type: 'Suite', ac: true, floor: 4, capacity: 3, rent: 4200 },
  { id: 'R-403', number: '403', type: 'Deluxe', ac: true, floor: 4, capacity: 2, rent: 2400 },
  { id: 'R-404', number: '404', type: 'Standard', ac: true, floor: 4, capacity: 2, rent: 1200 },
  { id: 'R-405', number: '405', type: 'Family', ac: true, floor: 4, capacity: 4, rent: 3600 },
]

// roomIdx maps to the rooms array index above.
export const bookings = [
  b(0, -1, 3, 0, 9600),          // 101 occupied Jul24-Jul28
  b(1, 1, 5, 1, 9600),           // 102 occupied Jul26-Jul30
  b(2, 3, 6, 2, 8000, 'reserved'), // 103 reserved Jul28-Jul31
  b(3, 0, 2, 3, 2400),           // 104 occupied Jul25-Jul27
  b(4, -2, 4, 4, 21600),         // 105 occupied Jul23-Jul29
  b(6, 2, 7, 5, 29400),           // 107 occupied Jul27-Aug01
  b(7, 0, 4, 6, 9600),           // 201 occupied Jul25-Jul29
  b(8, -1, 2, 7, 12600),         // 202 occupied Jul24-Jul27
  b(9, 1, 3, 8, 2400),           // 203 occupied Jul26-Jul28
  b(10, 3, 8, 9, 14400),         // 204 occupied Jul28-Aug02
  b(11, 0, 5, 10, 21600),        // 205 occupied Jul25-Jul30
  b(12, -3, -1, 11, 5000),       // 206 occupied Jul22-Jul24 (past)
  b(13, 2, 6, 0, 23200),          // 207 occupied Jul27-Jul31
  b(14, 1, 4, 1, 12600),          // 301 occupied Jul26-Jul29
  b(15, 0, 3, 2, 7200),           // 302 occupied Jul25-Jul28
  b(16, -1, 1, 3, 2400, 'cleaning'), // 303 cleaning Jul24-Jul26
  b(17, 4, 9, 4, 29000),          // 304 occupied Jul29-Aug03
  b(18, 0, 2, 5, 8400, 'reserved'), // 305 reserved Jul25-Jul27
  b(19, 2, 5, 6, 8000),           // 306 occupied Jul27-Jul30
  b(20, 1, 6, 7, 34800),          // 401 occupied Jul26-Jul31
  b(21, 0, 3, 8, 12600),          // 402 occupied Jul25-Jul28
  b(22, 3, 7, 9, 12000),          // 403 occupied Jul28-Aug01
  b(23, -1, 0, 10, 1200, 'maintenance'), // 404 maintenance Jul24-Jul25
  b(24, 2, 4, 11, 10800),         // 405 occupied Jul27-Jul29
]

export const idProofTypes = ['Aadhaar Card', 'Passport', 'Driving License', 'Voter ID', 'PAN Card']

export const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer']

export const notifications = [
  { id: 'n1', title: 'New check-in request', detail: 'Room 204 · Amara Okafor', time: '2m ago', unread: true },
  { id: 'n2', title: 'Payment received', detail: 'Invoice #INV-9921 · $1,240', time: '18m ago', unread: true },
  { id: 'n3', title: 'Room maintenance flagged', detail: 'Room 312 · AC service', time: '1h ago', unread: false },
  { id: 'n4', title: 'Checkout reminder', detail: 'Room 115 · Hana Kim', time: '3h ago', unread: false },
]
