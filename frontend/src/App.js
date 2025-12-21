import { Routes, Route } from 'react-router-dom';
import AllCampuses from './components/Campuses/AllCampuses';
import AllStudents from './components/Students/AllStudents';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/campuses" element={<AllCampuses />} />
      <Route path="/students" element={<AllStudents />} />
    </Routes>
  );
}

export default App;
