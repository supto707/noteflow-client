import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { bootstrapAccount } from "../lib/api";

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signInWithGoogle: async () => ({ error: null }),
  signInWithGithub: async () => ({ error: null }),
  signOut: async () => {},
});

function mapUser(firebaseUser: FirebaseUser | null): AuthUser | null {
  if (!firebaseUser) return null;
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
  };
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/configuration-not-found":
    "Firebase Authentication is not set up for this project. Enable it in the Firebase Console (Authentication → Get started), then enable your sign-in providers.",
  "auth/operation-not-allowed":
    "This sign-in method is disabled. Enable it in Firebase Console → Authentication → Sign-in method.",
  "auth/unauthorized-domain":
    "This domain is not authorized for OAuth. Add it in Firebase Console → Authentication → Settings → Authorized domains.",
  "auth/popup-blocked":
    "The sign-in popup was blocked by the browser. Allow popups for this site and try again.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

function toAuthError(err: unknown, fallback: string): Error {
  const code = (err as any)?.code;
  if (typeof code === "string" && AUTH_ERROR_MESSAGES[code]) {
    return new Error(AUTH_ERROR_MESSAGES[code]);
  }
  return err instanceof Error ? err : new Error(code || fallback);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(mapUser(firebaseUser));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function signUp(email: string, password: string, name: string) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
        setUser({
          id: credential.user.uid,
          email: credential.user.email,
          name: name.trim(),
        });
      }
      const { error } = await bootstrapAccount(name);
      return { error };
    } catch (err: any) {
      return { error: toAuthError(err, "Sign up failed") };
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err: any) {
      return { error: toAuthError(err, "Sign in failed") };
    }
  }

  async function oauthSignIn(provider: GoogleAuthProvider | GithubAuthProvider) {
    try {
      const credential = await signInWithPopup(auth, provider);
      const name =
        credential.user.displayName ||
        credential.user.email?.split("@")[0] ||
        "User";
      const { error } = await bootstrapAccount(name);
      return { error };
    } catch (err: any) {
      if (
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request"
      ) {
        return { error: null };
      }
      return { error: toAuthError(err, "Sign in failed") };
    }
  }

  function signInWithGoogle() {
    return oauthSignIn(new GoogleAuthProvider());
  }

  function signInWithGithub() {
    return oauthSignIn(new GithubAuthProvider());
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signInWithGithub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
