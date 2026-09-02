// Auth removed — empty context stub for import safety.
import React, { createContext } from 'react';
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => <>{children}</>;
