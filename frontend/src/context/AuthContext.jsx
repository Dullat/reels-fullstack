import { createContext, useContext, useState, useRef, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [bootstrapped, setBootstrapped] = useState(false);

  const accessTokenRef = useRef(null);

  const authFetch = async (url, options = {}) => {
    const headers = options.headers || {};

    if (accessTokenRef.current) {
      headers["Authorization"] = `Bearer ${accessTokenRef.current}`;
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });

      if (res.status === 401 && !options.retry) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return authFetch(url, { ...options, __retry: true });
        } else {
          throw new Error("Unauthorized");
        }
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (role, credentials) => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/${role}/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const payload = await res.json();

      if (!res.ok) {
        throw {
          status: res.status,
          at: "Login AuthContext",
          message: payload.msg,
        };
      }

      setAuth(() => {
        if (payload.user) return { user: payload.user, role: "user" };
        if (payload.partner)
          return { partner: payload.partner, role: "partner" };
        return null;
      });

      console.log(auth, payload);
      return {
        success: true,
        error: null,
        id: payload?.partner?._id || payload?.user?._id,
      };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const register = async (role, credentials) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/${role}/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );

      const payload = await res.json();

      if (!res.ok) {
        throw {
          status: res.status,
          at: "Register AuthContext",
          message: payload.msg,
        };
      }

      setAuth(() => {
        if (payload.user) return { user: payload.user, role: "user" };
        if (payload.partner)
          return { partner: payload.partner, role: "partner" };

        return null;
      });

      return {
        success: true,
        error: null,
        id: payload?.partner?._id || payload?.user?._id,
      };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/partner/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log(res);

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/partner/refresh`,
        {
          method: "post",
          credentials: "include",
        },
      );

      const payload = await res.json();

      if (!res.ok) {
        throw data.msg;
      }

      setAuth(() => {
        if (payload.user) return { user: payload.user, role: "user" };
        if (payload.partner)
          return { partner: payload.partner, role: "partner" };
        return null;
      });

      console.log("logged auto", payload);
    } catch (error) {
      console.log("hajd", error);
    }
  };

  useEffect(() => {
    (async () => {
      await refreshToken();
      setBootstrapped(true);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
