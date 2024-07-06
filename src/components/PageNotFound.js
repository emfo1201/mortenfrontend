import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  // Omdirigera till 404-sidan
  useEffect(() => {
    navigate('/404', { replace: true });
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;

