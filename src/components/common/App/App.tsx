import React from 'react';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import Layout from "../Layout/Layout";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import './App.css';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Layout />
            </div>
        </QueryClientProvider>
  );
}

export default App;
