import { useState } from 'react'
import LoginScreen from './Screens/LoginScreen'
import ChannelsScreen from './Screens/ChannelsScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen'
import RegisterScreen from './Screens/RegisterScreen'
import WorkspacesScreen from './Screens/WorkspacesScreen'
import { Route, Routes } from 'react-router-dom'
import RewritePasswordScreen from './Screens/RewritePasswordScreen'
import ProtectedRoute from './Components/ProtectedRoute'




function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/rewrite-password" element={<RewritePasswordScreen/>} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/channels" element={<ChannelsScreen />} />
        <Route path="/workspaces" element={<WorkspacesScreen />} />
    
      <Route element={<ProtectedRoute/>}>
   
      </Route>  
      </Routes>
      
      
      
    </div>
  )
}

export default App
