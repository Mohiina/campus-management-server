import { Routes, Route } from 'react-router-dom';
import AllCampuses from './components/Campuses/AllCampuses';
import AllStudents from './components/Students/AllStudents';
import Navbar from './components/Shared/Navbar';
import SingleCampus from './components/Campuses/SingleCampus';
import SingleStudent from './components/Students/SingleStudent';
import AddCampus from './components/Campuses/AddCampus';
import EditCampus from './components/Campuses/EditCampus';
import AddStudent from './components/Students/AddStudent';
import EditStudent from './components/Students/EditStudent';



function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/campus/add" element={<AddCampus />} />
          <Route path="/campus/edit/:campusId" element={<EditCampus />} />
          <Route path="/campus/:campusId" element={<SingleCampus />} />
          
          <Route path="/students" element={<AllStudents />} />
          <Route path="/student/add" element={<AddStudent />} />
          <Route path="/student/edit/:studentId" element={<EditStudent />} />
          <Route path="/student/:studentId" element={<SingleStudent />} />
        </Routes>
    </>
  );
}

export default App;
