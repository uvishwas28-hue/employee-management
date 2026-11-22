import { NavLink, Outlet } from 'react-router-dom'
import '../App.css'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/employees', label: 'Employees' },
  { to: '/employees/add', label: 'Add Employee' },
  { to: '/departments', label: 'Departments' },
  { to: '/attendance', label: 'Attendance' },
  { to: '/reports', label: 'Reports' },
]

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="brand">Employee Manager</h2>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
