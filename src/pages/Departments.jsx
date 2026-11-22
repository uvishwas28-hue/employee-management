import { useMemo } from 'react'
import { useEmployees } from '../context/EmployeeContext'

function Departments() {
  const { employees, departments } = useEmployees()

  const employeesByDepartment = useMemo(() => {
    const counts = {}
    employees.forEach((employee) => {
      counts[employee.department] = (counts[employee.department] || 0) + 1
    })
    return counts
  }, [employees])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Departments</h1>
          <p className="subtitle">Department catalog and current headcount summary</p>
        </div>
      </div>

      <div className="card">
        {departments.length === 0 ? (
          <p className="empty">No departments available.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Department</th>
                  <th>Head</th>
                  <th>Location</th>
                  <th>Employees</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.code}>
                    <td>{department.code}</td>
                    <td>{department.name}</td>
                    <td>{department.head}</td>
                    <td>{department.location}</td>
                    <td>{employeesByDepartment[department.name] || 0}</td>
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

export default Departments
