import { useMemo } from 'react'
import { useEmployees } from '../context/EmployeeContext'
import StatCard from '../components/StatCard'

function Reports() {
  const { employees } = useEmployees()

  const report = useMemo(() => {
    const total = employees.length
    const active = employees.filter((e) => e.status === 'Active').length
    const inactive = employees.filter((e) => e.status === 'Inactive').length

    const byDepartment = employees.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1
      return acc
    }, {})

    let present = 0
    let absent = 0
    let late = 0
    employees.forEach((employee) => {
      ;(employee.attendance || []).forEach((record) => {
        if (record.status === 'Present') present += 1
        if (record.status === 'Absent') absent += 1
        if (record.status === 'Late') late += 1
      })
    })
    const totalAttendance = present + absent + late
    const attendanceRate = totalAttendance
      ? Math.round(((present + late) / totalAttendance) * 100)
      : 0

    return { total, active, inactive, byDepartment, present, absent, late, attendanceRate }
  }, [employees])

  const departmentEntries = Object.entries(report.byDepartment).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p className="subtitle">Summary insights for employees, departments, and attendance</p>
        </div>
      </div>

      <div className="grid stats-grid">
        <StatCard title="Total Employees" value={report.total} />
        <StatCard title="Active Employees" value={report.active} />
        <StatCard title="Inactive Employees" value={report.inactive} />
        <StatCard
          title="Attendance Rate"
          value={`${report.attendanceRate}%`}
          hint="Present + Late"
        />
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Employees by Department</h2>
          {departmentEntries.length === 0 ? (
            <p className="empty">No department data available.</p>
          ) : (
            <ul className="list">
              {departmentEntries.map(([department, count]) => (
                <li key={department}>
                  <strong>{department}:</strong> {count} employee{count === 1 ? '' : 's'}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Attendance Summary</h2>
          {report.present + report.absent + report.late === 0 ? (
            <p className="empty">No attendance records marked yet.</p>
          ) : (
            <ul className="list">
              <li>
                <strong>Present:</strong> {report.present}
              </li>
              <li>
                <strong>Absent:</strong> {report.absent}
              </li>
              <li>
                <strong>Late:</strong> {report.late}
              </li>
              <li>
                <strong>Overall rate:</strong> {report.attendanceRate}% (counting Present and
                Late)
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="card report-section">
        <h2 style={{ marginTop: 0 }}>Notes</h2>
        <p className="muted">
          Reports are calculated from the current employee records stored in your browser. Add or
          update employees and mark attendance to see the summaries change in real time.
        </p>
      </div>
    </div>
  )
}

export default Reports
