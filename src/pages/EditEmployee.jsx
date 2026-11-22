import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { useEmployees } from '../context/EmployeeContext'

function EditEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEmployeeById, updateEmployee } = useEmployees()
  const employee = getEmployeeById(id)

  if (!employee) {
    return (
      <div className="card">
        <h1>Employee not found</h1>
        <p className="muted">The employee you are trying to edit does not exist.</p>
        <Link to="/employees" className="btn secondary">
          Back to Employees
        </Link>
      </div>
    )
  }

  const handleSubmit = (values) => {
    updateEmployee(id, values)
    navigate(`/employees/${id}`)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Edit Employee</h1>
          <p className="subtitle">Update information for {employee.name}</p>
        </div>
        <Link to={`/employees/${id}`} className="btn secondary">
          Cancel
        </Link>
      </div>
      <EmployeeForm
        initialValues={employee}
        onSubmit={handleSubmit}
        submitLabel="Update Employee"
      />
    </div>
  )
}

export default EditEmployee
