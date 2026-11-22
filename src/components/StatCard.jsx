function StatCard({ title, value, hint }) {
  return (
    <div className="card stat-card">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      {hint ? <p className="muted">{hint}</p> : null}
    </div>
  )
}

export default StatCard
