
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onUnitSelect }) => {
  const navigate = useNavigate();
  
  const handleUnitClick = (unitNumber) => {
    if (onUnitSelect) {
      onUnitSelect(unitNumber);
    }
    navigate(`/unit/${unitNumber}`);
  };

  return (
    <div className="sidebar">
      <div className="units-section">
        <h2 className="sidebar-heading">Units</h2>
        
        <div className="unit-list">
          <div className="unit-item" onClick={() => handleUnitClick(1)}>
            <span className="unit-name">UNIT-I</span>
            <div className="unit-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#888888" strokeWidth="2" fill="none"/>
                <path d="M12 8v8M8 12h8" stroke="#888888" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          
          <div className="unit-item" onClick={() => handleUnitClick(2)}>
            <span className="unit-name">UNIT-II</span>
            <div className="unit-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#888888" strokeWidth="2" fill="none"/>
                <path d="M12 8v8M8 12h8" stroke="#888888" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;