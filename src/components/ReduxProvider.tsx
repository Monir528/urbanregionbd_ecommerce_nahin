"use client";
import {store} from "@/components/store/store";
import { Provider, useSelector } from "react-redux";
import React from "react";

export function ReduxProvider({ children }: { children: React.ReactNode }){

    // const { formCondition } = useSelector((state) => state.cartHandler);
    return <Provider store={store}>
        {children}
    </Provider>
}