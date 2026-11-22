import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { departmentCatalog, initialEmployees } from '../data/initialEmployees'

const EmployeeContext = createContext(null)

const STORAGE_KEY = 'employee-management.employees'

function loadEmployees() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // fall back to initial data
  }
  return initialEmployees
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(loadEmployees)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
  }, [employees])

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employee.id || `emp-${Date.now()}`,
      attendance: employee.attendance || [],
    }
    setEmployees((prev) => [newEmployee, ...prev])
    return newEmployee.id
  }

  const updateEmployee = (id, updates) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id))
  }

  const getEmployeeById = (id) => employees.find((e) => e.id === id)

  const markAttendance = (id, date, status) => {
    setEmployees((prev) =>
      prev.map((employee) => {
        if (employee.id !== id) return employee
        const attendance = employee.attendance || []
        const existingIndex = attendance.findIndex((a) => a.date === date)
        let nextAttendance
        if (existingIndex >= 0) {
          nextAttendance = attendance.map((a, index) =>
            index === existingIndex ? { ...a, status } : a,
          )
        } else {
          nextAttendance = [...attendance, { date, status }]
        }
        return { ...employee, attendance: nextAttendance }
      }),
    )
  }

  const value = useMemo(
    () => ({
      employees,
      departments: departmentCatalog,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployeeById,
      markAttendance,
    }),
    [employees],
  )

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export function useEmployees() {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider')
  }
  return context
}
