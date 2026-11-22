import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEmployees } from '../context/EmployeeContext'

function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEmployeeById, deleteEmployee } = useEmployees()
  const employee = getEmployeeById(id)

  if (!employee) {
    return (
      <div className="card">
        <h1>Employee not found</h1>
        <p className="muted">The employee you are looking for does not exist.</p>
        <Link to="/employees" className="btn secondary">
          Back to Employees
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete employee "${employee.name}"?`)
    if (confirmed) {
      deleteEmployee(employee.id)
      navigate('/employees')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Employee Details</h1>
          <p className="subtitle">Full profile and attendance history for {employee.name}</p>
        </div>
        <div className="actions">
          <Link to={`/employees/${employee.id}/edit`} className="btn secondary">
            Edit
          </Link>
          <button type="button" className="btn danger" onClick={handleDelete}>
            Delete
          </button>
          <Link to="/employees" className="btn secondary">
            Back
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="label">Employee ID</div>
            <div className="text">{employee.id}</div>
          </div>
          <div className="detail-item">
            <div className="label">Full Name</div>
            <div className="text">{employee.name}</div>
          </div>
          <div className="detail-item">
            <div className="label">Email</div>
            <div className="text">{employee.email}</div>
          </div>
          <div className="detail-item">
            <div className="label">Phone</div>
            <div className="text">{employee.phone}</div>
          </div>
          <div className="detail-item">
            <div className="label">Department</div>
            <div className="text">{employee.department}</div>
          </div>
          <div className="detail-item">
            <div className="label">Position</div>
            <div className="text">{employee.position}</div>
          </div>
          <div className="detail-item">
            <div className="label">Status</div>
            <div className="text">
              <span className={`badge ${employee.status.toLowerCase()}`}>{employee.status}</span>
            </div>
          </div>
          <div className="detail-item">
            <div className="label">Join Date</div>
            <div className="text">{employee.joinDate}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Attendance History</h2>
        {employee.attendance && employee.attendance.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...employee.attendance]
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  .map((record) => (
                    <tr key={record.date}>
                      <td>{record.date}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty">
            No attendance records yet. Use the Attendance page to mark attendance.
          </p>
        )}
      </div>
    </div>
  )
}

export default EmployeeDetails
