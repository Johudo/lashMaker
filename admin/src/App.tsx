import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "@/components/ui/provider";
import { IndexPage } from "@/pages/IndexPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { LINK_STRUCTURE } from "./config";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider>
            <Theme appearance="dark" colorPalette="teal">
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={LINK_STRUCTURE.Index}>
                                <Route index element={<IndexPage />} />
                            </Route>
                        </Routes>

                        <Toaster />
                    </BrowserRouter>
                </QueryClientProvider>
            </Theme>
        </Provider>
    );
}

export default App;
