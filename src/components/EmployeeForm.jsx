import { useState } from 'react'
import { departmentCatalog } from '../data/initialEmployees'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  department: departmentCatalog[0]?.name || '',
  position: '',
  status: 'Active',
  joinDate: new Date().toISOString().slice(0, 10),
}

function EmployeeForm({ initialValues, onSubmit, submitLabel = 'Save Employee' }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Department
          <select name="department" value={form.department} onChange={handleChange}>
            {departmentCatalog.map((department) => (
              <option key={department.code} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Position
          <input name="position" value={form.position} onChange={handleChange} required />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>
        <label>
          Join Date
          <input
            type="date"
            name="joinDate"
            value={form.joinDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="actions">
        <button type="submit" className="btn">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
