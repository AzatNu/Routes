import { useState } from "react";
import { MainPage } from "./componets/mainPage.js";
import { Error404 } from "./componets/404.componet.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { TodolistCard } from "./componets/TodolistCard.js";

export const App = () => {
    const [TODOLIST, setTODOLIST] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [updateInputValue, setUpdateInputValue] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);
    const [sortButtonClicked, setSortButtonClick] = useState(false);
    const [Id, setId] = useState(0);
    const [updateButtonClicked, setUpdateButtonClick] = useState(false);
    const navigate = useNavigate();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainPage
                        TODOLIST={TODOLIST}
                        setTODOLIST={setTODOLIST}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        refreshPage={refreshPage}
                        setRefreshPage={setRefreshPage}
                        sortButtonClicked={sortButtonClicked}
                        setSortButtonClick={setSortButtonClick}
                        addInputValue={addInputValue}
                        setAddInputValue={setAddInputValue}
                        updateInputValue={updateInputValue}
                        setUpdateInputValue={setUpdateInputValue}
                        updateButtonClicked={updateButtonClicked}
                        setUpdateButtonClick={setUpdateButtonClick}
                        Id={Id}
                        setId={setId}
                    />
                }
            />
            <Route
                path="todo/:id"
                element={
                    <TodolistCard
                        TODOLIST={TODOLIST}
                        id={Id}
                        setUpdateInputValue={setUpdateInputValue}
                        setUpdateButtonClick={setUpdateButtonClick}
                        setUpdateId={setId}
                        setTODOLIST={setTODOLIST}
                        setErrorMessage={setErrorMessage}
                        setRefreshPage={setRefreshPage}
                        refreshPage={refreshPage}
                        setAddInputValue={setAddInputValue}
                        setSortButtonClick={setSortButtonClick}
                        updateButtonClicked={updateButtonClicked}
                        updateInputValue={updateInputValue}
                    />
                }
            />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};
