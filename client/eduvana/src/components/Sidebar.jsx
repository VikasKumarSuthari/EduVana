

const Sidebar = ({ subjectId, setSelectedUnit }) => {
  // Mock unit data categorized by subjectId
  const unitData = {
    'front-end-web-development': [
      { id: 1, title: 'UNIT-I', description: 'Introduction to HTML, CSS, and JavaScript' },
      { id: 2, title: 'UNIT-II', description: 'Advanced JavaScript and React Basics' }
    ],
    'data-structures': [
      { id: 1, title: 'UNIT-I', description: 'Arrays and Linked Lists' },
      { id: 2, title: 'UNIT-II', description: 'Stacks and Queues' }
    ],
    'database-management': [
      { id: 1, title: 'UNIT-I', description: 'SQL Basics and Normalization' },
      { id: 2, title: 'UNIT-II', description: 'Transactions and Indexing' }
    ]
  }

  // Filter units based on the selected subjectId
  const units = unitData[subjectId] || []

  return (
    <div className="sidebar">
      <div className="units-section">
        <h2>Units</h2>
        <ul className="unit-list">
          {units.map(unit => (
            <li key={unit.id} className="unit-item">
              <span>{unit.title}</span>
              <button className="unit-button" onClick={() => setSelectedUnit(unit)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="badges-section">
        <h2>Badges</h2>
        <div className="badge-item">
          <div className="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span className="badge-name">Read Badge</span>
          <span className="badge-count">0 of {units.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
