
import './App.css'
import {Route,Routes} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import InterviewerPage from './pages/InterviewerPage'
import CandidatePage from './pages/CandidatePage'
import {Toaster} from 'react-hot-toast'
import DashboardLayout from './pages/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import ScheduleInterview from './components/interviewer/ScheduleInterview'
import JoinInterviewPage from './pages/JoinInterviewPage'
function App() {
 
  return (
  <>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
              <Route  path='/' element={<AuthPage/>}/>
              <Route path='/candidateDashboard' element={
             <ProtectedRoute allowedrole="candidate">
                 <DashboardLayout>
              </DashboardLayout>
              </ProtectedRoute>
            }
            >
               <Route index element={<CandidatePage/>}/>
              </Route>


              <Route path='/interviewerDashboard'element={
             <ProtectedRoute allowedrole="interviewer">
                 <DashboardLayout/>
              {/* </DashboardLayout> */}
              </ProtectedRoute>
              }
              >
                    <Route index element={<InterviewerPage/>}/>
                   <Route path='scheduleInterview' element={<ScheduleInterview/>}/>
              </Route>
              <Route path='/interview-session/:session_code' element={<JoinInterviewPage/>}/>
        </Routes>
  </>
  )
}

export default App
