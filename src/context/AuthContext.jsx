import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsersFromStorage = () => {
    const users = localStorage.getItem("users_db");
    return users ? JSON.parse(users) : [];
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const users = getUsersFromStorage();

      const userExists = users.find(
        (u) => u.username === username || u.email === email,
      );
      if (userExists) {
        setError("Username or Email already exists!");
        return false;
      }

      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        image: null,
      };
      users.push(newUser);
      localStorage.setItem("users_db", JSON.stringify(users));

      const userData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const users = getUsersFromStorage();

      const existingUser = users.find(
        (u) => u.username === username && u.password === password,
      );

      if (existingUser) {
        const userData = {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
          image: existingUser.image || null,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else {
        setError("Invalid username or password.");
        return false;
      }
    } catch (err) {
      setError("Something went wrong.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const users = getUsersFromStorage();
      const userIndex = users.findIndex((u) => u.id === user.id);

      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...updatedData };
        users[userIndex] = updatedUser;
        localStorage.setItem("users_db", JSON.stringify(users));

        const sessionData = {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          image: updatedUser.image,
        };
        setUser(sessionData);
        localStorage.setItem("user", JSON.stringify(sessionData));

        return true;
      }
      return false;
    } catch (err) {
      setError("Something went wrong while updating profile.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
