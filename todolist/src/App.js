import { MainPage } from "./componets/mainPage.js";
import { Error404 } from "./componets/404.componet.js";
import { Routes, Route } from "react-router-dom";
import { TodolistCard } from "./componets/TodolistCard.js";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="todo/:id" element={<TodolistCard />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};
