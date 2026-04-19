import React from 'react';

const Alert = ({ alert }) => {
  if (!alert) return null;

  const typeMap = {
    success: 'alert-success',
    danger: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div
      className={`alert ${typeMap[alert.type] || 'alert-info'} alert-dismissible mx-3 mt-2`}
      role="alert"
      style={{ borderRadius: 10, fontSize: 14 }}
    >
      <strong>{alert.type === 'success' ? '✅' : alert.type === 'danger' ? '❌' : 'ℹ️'}</strong>
      {' '}{alert.message}
    </div>
  );
};

export default Alert;