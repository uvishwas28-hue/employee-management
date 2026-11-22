import { useNavigate } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { useEmployees } from '../context/EmployeeContext'

function AddEmployee() {
  const { addEmployee } = useEmployees()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    const id = addEmployee(values)
    navigate(`/employees/${id}`)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p className="subtitle">Create a new employee record</p>
        </div>
      </div>
      <EmployeeForm onSubmit={handleSubmit} submitLabel="Create Employee" />
    </div>
  )
}

export default AddEmployee
