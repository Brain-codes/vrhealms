import React from 'react'
import "./AuthHeader.scss"

const AuthHeader = ({title, description}) => {
  return (
    <div className="auth-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default AuthHeader