// src/reduxToolKit/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, getAuth, User } from "firebase/auth";
import { auth } from "@/firebase"; // Ensure your firebase config is correctly imported

// Helper function to extract relevant user properties
const extractUserData = async (user: User) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    accessToken: await user.getIdToken(),
});

// Async thunk for logging in a user with email/password
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return await extractUserData(userCredential.user);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to check for a locally authenticated user
export const initializeAuth = createAsyncThunk(
    "auth/initializeAuth",
    async (_, { rejectWithValue }) => {
        const authInstance = getAuth();
        console.log("authInstance", authInstance);
        return new Promise(async (resolve, reject) => {
            const unsubscribe = authInstance.onAuthStateChanged(
                async (user) => {
                    unsubscribe();
                    if (user) {
                        try {
                            resolve(await extractUserData(user));
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        resolve(null);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
);

interface AuthState {
    user: null | {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        accessToken: string;
    };
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
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
            })
            // initializeAuth cases
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    console.log("state", action.payload);
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
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
