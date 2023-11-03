import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App.tsx";
import Article from "./components/Article/Article.tsx";
import './App.scss'


const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className={'wrapper'}>
                <div className={'container'}>
                    <Routes>
                        <Route path={'/'} element={<App />} />
                        <Route path={'/:id'} element={<Article />} />
                        <Route path="*" element={<p>Page not found</p>} />
                    </Routes>
                </div>
            </div>

        </BrowserRouter>
    );
};

export default AppRouter;