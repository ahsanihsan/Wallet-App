import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./src/Navigator";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <>
        <StatusBar translucent={false} />
        <Navigation />
      </>
    </Provider>
  );
}
