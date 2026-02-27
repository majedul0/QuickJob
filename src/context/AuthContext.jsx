import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "https://quickjob-backend-tc2a.onrender.com/api";
const API_URL = `${API_BASE}/auth`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check localStorage for existing session
  useEffect(() => {
    const stored = localStorage.getItem("quickjob_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem("quickjob_user");
      }
    }
    setLoading(false);
  }, []);

  // Persist user to localStorage whenever it changes
  const saveUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("quickjob_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("quickjob_user");
    }
  };

  /**
   * Sign up a new user
   */
  const signup = async ({ firstName, lastName, email, password, role }) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.errors?.[0]?.message || "Signup failed");
    }

    saveUser(data.data);
    return data.data;
  };

  /**
   * Log in an existing user
   */
  const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.errors?.[0]?.message || "Login failed");
    }

    saveUser(data.data);
    return data.data;
  };

  /**
   * Log out
   */
  const logout = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
