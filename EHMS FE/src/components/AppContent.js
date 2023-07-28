import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import UnAuthorized from '../pages/UnAuthorized'
import { routes } from '../routes'
import { decrypt } from '../utils/aes/AES'



const AppContent = () => {

  const authUser = (useSelector(state => state.auth))
  const role = decrypt(authUser.role)

  const isValidRole = (allowedRoles) => {
    return allowedRoles?.includes(role)

  }
  return (
    <Routes>
      {routes.map((route, id) => (
        isValidRole(route.allowedRoles) ?
          <Route
            key={id}
            exact path={route.path}
            element={route.element}
          /> : <Route
            key={id}
            exact path={'/unauthorized'}
            element={<UnAuthorized />}
          />
      ))}
    </Routes>
  )
}

export default AppContent