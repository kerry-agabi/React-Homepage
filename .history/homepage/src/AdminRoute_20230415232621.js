
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AdminAccessMessage from './AdminAccessMessage';

function AdminRoute() {
  const { currentUser } = useAuth();
  const adminUserId = 'HO8cRUPUW0edKq19RHEUMPzKxbB2';

  return currentUser && currentUser.uid === adminUserId ? <Outlet /> : <AdminAccessMessage />;
}

export default AdminRoute;
