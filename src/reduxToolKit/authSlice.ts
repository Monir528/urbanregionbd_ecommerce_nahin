// src/reduxToolKit/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut, getAuth, User, AuthError } from "firebase/auth";
import { auth } from "@/firebase";

// Helper function to extract relevant user properties
const extractUserData = async (user: User) => {
    try {
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            accessToken: await user.getIdToken(),
        };
    } catch (error) {
        throw new Error("Failed to extract user data: " + (error as Error).message);
    }
};

// Define the user data type for reusability
interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    accessToken: string;
}

interface AuthState {
    user: UserData | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async thunk for logging in a user with email/password
export const loginUser = createAsyncThunk<
    UserData, // Return type on success
    { email: string; password: string }, // Argument type
    { rejectValue: string } // Reject value type
>(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return await extractUserData(userCredential.user);
        } catch (error) {
            const authError = error as AuthError;
            return rejectWithValue(authError.message || "Failed to log in");
        }
    }
);

// Async thunk to check for a locally authenticated user
export const initializeAuth = createAsyncThunk<
    UserData | null, // Return type on success
    void, // Argument type
    { rejectValue: string } // Reject value type
>(
    "auth/initializeAuth",
    async () => {
        const authInstance = getAuth();
        return new Promise((resolve, reject) => {
            const unsubscribe = authInstance.onAuthStateChanged(
                (user) => {
                    unsubscribe();
                    if (user) {
                        extractUserData(user)
                            .then(resolve)
                            .catch((error: Error) => reject(error.message || "Failed to initialize auth"));
                    } else {
                        resolve(null);
                    }
                },
                (error: Error) => {
                    reject(error.message || "Failed to initialize auth");
                }
            );
        });
    }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk<
    null, // Return type on success
    void, // Argument type
    { rejectValue: string } // Reject value type
>(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return null;
        } catch (error) {
            const authError = error as AuthError;
            return rejectWithValue(authError.message || "Failed to log out");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                if (process.env.NODE_ENV === "development") {
                    console.error("Login failed:", action.payload);
                }
            })
            // initializeAuth cases
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.user = null;
                state.isAuthenticated = false;
                if (process.env.NODE_ENV === "development") {
                    console.error("Initialize auth failed:", action.payload);
                }
            })
            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                if (process.env.NODE_ENV === "development") {
                    console.error("Logout failed:", action.payload);
                }
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;