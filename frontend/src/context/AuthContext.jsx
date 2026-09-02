// Auth removed — empty context stub for import safety.
import React, { createContext } from 'react';
export const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => <>{children}</>;
