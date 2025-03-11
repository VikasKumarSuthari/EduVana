import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const UnitPage = () => {
  const { subjectId } = useParams()
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [subjectName, setSubjectName] = useState('')

  // Example: Mock data mapping subjectId to subject names
  const subjectData = {
    'front-end-web-development': 'Front End Web Development (24-25)',
    'data-structures': 'Data Structures (24-25)',
    'database-management': 'Database Management (24-25)',
  }

  useEffect(() => {
    if (subjectId && subjectData[subjectId]) {
      setSubjectName(subjectData[subjectId])
    } else {
      setSubjectName('Unknown Subject')
    }
  }, [subjectId])

  return (
    <div className="unit-page">
      <div className="page-header">
        <h1>{subjectName}</h1>
      </div>
      
      <div className="page-content">
        <Sidebar subjectId={subjectId} setSelectedUnit={setSelectedUnit} />
        
        <div className="main-content">
          {!selectedUnit && (
            <div className="nothing-to-show">
              <div className="warning-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#F5A623">
                  <path d="M12 2L1 21h22L12 2z"/>
                  <path d="M12 16v2" stroke="white" strokeWidth="2"/>
                  <path d="M12 8v6" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <p>Nothing to show. Please select a unit from the list on the left</p>
            </div>
          )}
          {selectedUnit && (
            <div className="unit-content">
              <h2>{selectedUnit.title}</h2>
              <p>{selectedUnit.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UnitPage
