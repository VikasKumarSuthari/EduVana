import { useParams } from 'react-router-dom';

const UnitContent = () => {
  const { unitNumber } = useParams();
  
  return (
    <div className="unit-content">
      <h2>Unit {unitNumber} Content</h2>
      <p>This is the content for Unit {unitNumber}.</p>
    </div>
  );
};

export default UnitContent;