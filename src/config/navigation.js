// Single source of truth for sidebar navigation.
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiList,
  FiUserMinus,
  FiHome,
  FiCalendar,
  FiSettings,
  FiCreditCard,
  FiBarChart2,
} from 'react-icons/fi'

export const navConfig = [
  { label: 'Dashboard', to: '/', icon: FiGrid, end: true },
  {
    label: 'Guests',
    icon: FiUsers,
    children: [
      { label: 'Check-In', to: '/check-in', icon: FiUserPlus },
      { label: 'Guest List', to: '/guests', icon: FiList },
      // { label: 'Check-Out', to: '/check-out', icon: FiUserMinus },
    ],
  },
  // {
  //   label: 'Rooms',
  //   icon: FiHome,
  //   children: [
  //     { label: 'Room Availability', to: '/rooms/availability', icon: FiCalendar },
  //     { label: 'Room Management', to: '/rooms/management', icon: FiHome },
  //   ],
  // },
  // { label: 'Billing', to: '/billing', icon: FiCreditCard },
  { label: 'Reports', to: '/reports', icon: FiBarChart2 },
  // { label: 'Settings', to: '/settings', icon: FiSettings },
]

// Map route path -> page title (used by the top navbar).
export const pageTitleMap = {
  '/': 'Dashboard',
  '/check-in': 'Check-In',
  '/guests': 'Guest List',
  '/check-out': 'Check-Out',
  '/rooms/availability': 'Room Availability',
  '/rooms/management': 'Room Management',
  '/billing': 'Billing',
  '/reports': 'Reports',
  '/settings': 'Settings',
}
