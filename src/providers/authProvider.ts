import { AuthBindings } from "@refinedev/core";

const API_URL = "http://localhost:8000";

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  image?: string | null;
  avatar?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
};

const normalizeIdentity = (user: Partial<SessionUser> | null | undefined): SessionUser | null => {
  if (!user) return null;

  const name = typeof user.name === "string" && user.name.trim() ? user.name.trim() : user.email?.trim() ?? "";
  const [firstName = name, ...rest] = name.split(/\s+/);
  const lastName = rest.length > 0 ? rest[rest.length - 1] : "";

  return {
    id: user.id ?? "",
    email: user.email ?? "",
    name,
    role: user.role,
    image: user.image ?? null,
    avatar: user.avatar,
    fullName: user.fullName ?? name,
    firstName: user.firstName ?? firstName,
    lastName: user.lastName ?? lastName,
  };
};

export const authProvider: AuthBindings = {
  login: async ({ email, password, providerName, remember }) => {
    if (providerName) {
      window.location.href = `${API_URL}/api/auth/sign-in/${providerName}`;
      return {
        success: true,
      };
    }

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);

      return {
        success: false,
        error: {
          name: "LoginError",
          message: body?.error || body?.message || "Invalid email or password",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },

  register: async ({ email, password, name }) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name ?? email,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);

      return {
        success: false,
        error: {
          name: "RegisterError",
          message: body?.error || body?.message || "Registration failed",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  logout: async () => {
    await fetch(`${API_URL}/api/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    }).catch(() => null);

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/session`, {
        credentials: "include",
      });

      if (res.ok) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        redirectTo: "/login",
      };
    } catch {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/session`, {
        credentials: "include",
      });

      if (!res.ok) return null;

      const body = await res.json();

      return normalizeIdentity(body.user ?? body.data ?? body);
    } catch {
      return null;
    }
  },

  forgotPassword: async ({ email }) => {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);

      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: body?.error || body?.message || "Failed to send reset email",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => null,

  onError: async () => {
    return {
      error: {
        name: "AuthError",
        message: "Authentication Error",
      },
    };
  },
};

export default authProvider;