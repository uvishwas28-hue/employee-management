import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEmployees } from '../context/EmployeeContext'

function Employees() {
  const { employees, departments, deleteEmployee } = useEmployees()
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.id.toLowerCase().includes(search.toLowerCase())
      const matchesDepartment =
        departmentFilter === 'All' || employee.department === departmentFilter
      const matchesStatus = statusFilter === 'All' || employee.status === statusFilter
      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [employees, search, departmentFilter, statusFilter])

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete employee "${name}"? This cannot be undone.`)
    if (confirmed) {
      deleteEmployee(id)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="subtitle">Manage employee records, details, and employment status</p>
        </div>
        <Link to="/employees/add" className="btn">
          Add Employee
        </Link>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((department) => (
              <option key={department.code} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {filteredEmployees.length === 0 ? (
          <p className="empty">No employees match your filters.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
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
                          View
                        </Link>
                        <Link
                          to={`/employees/${employee.id}/edit`}
                          className="btn secondary small"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn danger small"
                          onClick={() => handleDelete(employee.id, employee.name)}
                        >
                          Delete
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

export default Employees
