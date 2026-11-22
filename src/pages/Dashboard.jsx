import { Link } from 'react-router-dom'
import { useEmployees } from '../context/EmployeeContext'
import StatCard from '../components/StatCard'

function Dashboard() {
  const { employees, departments } = useEmployees()

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((e) => e.status === 'Active').length
  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive').length
  const totalDepartments = departments.length

  const recentEmployees = employees.slice(0, 5)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of your employee management system</p>
        </div>
        <Link to="/employees/add" className="btn">
          Add Employee
        </Link>
      </div>

      <div className="grid stats-grid">
        <StatCard title="Total Employees" value={totalEmployees} hint="All registered employees" />
        <StatCard title="Active Employees" value={activeEmployees} hint="Currently active" />
        <StatCard title="Inactive Employees" value={inactiveEmployees} hint="Not currently active" />
        <StatCard title="Departments" value={totalDepartments} hint="Available departments" />
      </div>

      <div className="card">
        <div className="page-header" style={{ marginBottom: 10 }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Recent Employees</h2>
          <Link to="/employees" className="btn secondary small">
            View All
          </Link>
        </div>
        {recentEmployees.length === 0 ? (
          <p className="empty">No employees found. Add your first employee to get started.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                      <span className={`badge ${employee.status.toLowerCase()}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/employees/${employee.id}`} className="btn secondary small">
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
