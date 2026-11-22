import { useMemo, useState } from 'react'
import { useEmployees } from '../context/EmployeeContext'

function Attendance() {
  const { employees, markAttendance } = useEmployees()
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(today)

  const recordsForDate = useMemo(() => {
    const map = {}
    employees.forEach((employee) => {
      const record = (employee.attendance || []).find((a) => a.date === date)
      map[employee.id] = record ? record.status : 'Not Marked'
    })
    return map
  }, [employees, date])

  const handleMark = (employeeId, status) => {
    markAttendance(employeeId, date, status)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p className="subtitle">Mark and review daily attendance for each employee</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <label>
            Attendance Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        {employees.length === 0 ? (
          <p className="empty">No employees available. Add employees first.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Status for {date}</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{employee.name}</div>
                      <div className="muted">{employee.id}</div>
                    </td>
                    <td>{employee.department}</td>
                    <td>{recordsForDate[employee.id]}</td>
                    <td>
                      <div className="actions">
                        <button
                          type="button"
                          className="btn secondary small"
                          onClick={() => handleMark(employee.id, 'Present')}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          className="btn secondary small"
                          onClick={() => handleMark(employee.id, 'Absent')}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          className="btn secondary small"
                          onClick={() => handleMark(employee.id, 'Late')}
                        >
                          Late
                        </button>
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

export default Attendance
