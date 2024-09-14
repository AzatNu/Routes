import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    useRequestUpdateTodoModule,
    useRequestDeleteTodoModule,
} from "../hooks";
import style from "./Todolist.module.css";

export const TodolistCard = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState([]);
    const [updateInputValue, setUpdateInputValue] = useState("");
    const [updateButtonClicked, setUpdateButtonClick] = useState(false);
    const [cardErrorMessage, setCardErrorMessage] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3005/todos/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTodo(data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, refreshPage]);

    const { requestUpdateTodo } = useRequestUpdateTodoModule({
        setTodo,
        todo,
        id,
        setUpdateButtonClick,
        setCardErrorMessage,
        setRefreshPage,
        refreshPage,
        setIsLoading,
    });
    const { requestDeleteTodo } = useRequestDeleteTodoModule(
        setRefreshPage,
        refreshPage,
        setCardErrorMessage
    );
    console.log(isLoading);

    return (
        <>
            {isLoading && (
                <div className={style["loader-background"]}>
                    <div className={style["loader"]}></div>
                </div>
            )}
            <div className={style["TodolistCard"]}>
                {cardErrorMessage !== "" && !isLoading && (
                    <div className={style["errorWindow"]}>
                        <h2>{cardErrorMessage}</h2>
                        <NavLink to={"/"}>
                            <button
                                onClick={() => {
                                    setCardErrorMessage("");
                                }}
                                className={style["closeErrorWindow"]}
                            >
                                OK
                            </button>
                        </NavLink>
                    </div>
                )}
                <h1 className={style["title"]}>Задача: {id}</h1>
                <div className={style["item"]}>
                    <p
                        className={style["todos-content"]}
                        style={{ wordBreak: "break-word" }}
                    >
                        {todo.title}
                        {!isLoading && todo.title === undefined && (
                            <p>Данная задача не найдена</p>
                        )}
                    </p>
                </div>
                <div className={style["buttons"]}>
                    <NavLink to={"/"}>
                        <button
                            title="Вернуться к списку задач"
                            className={style["Back-button"]}
                        >
                            ⭠
                        </button>
                    </NavLink>
                    <button
                        disabled={isLoading}
                        title="Редактировать задачу"
                        className={style["Edit-button"]}
                        onClick={() => {
                            setUpdateInputValue(updateInputValue);
                            setUpdateButtonClick(true);
                        }}
                    >
                        &#9998;
                    </button>
                    <button
                        disabled={isLoading}
                        title="Удалить задачу"
                        className={style["Delete-button"]}
                        onClick={() => {
                            requestDeleteTodo(id);
                            setUpdateButtonClick(false);
                        }}
                    >
                        &#x2716;
                    </button>
                </div>
                <div className={style["buttons"]}>
                    {updateButtonClicked && (
                        <div className={style["modal"]}>
                            <div className={style["modal-content"]}>
                                <h2>Введите новый текст для задачи</h2>
                                <input
                                    placeholder="Новый текст для задачи"
                                    className={style["modal-input"]}
                                    type="text"
                                    value={updateInputValue}
                                    onChange={(e) =>
                                        setUpdateInputValue(e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => {
                                        requestUpdateTodo(updateInputValue);
                                        setUpdateButtonClick(false);
                                    }}
                                    className={style["modal-button"]}
                                >
                                    &#x2714; Обновить
                                </button>
                                <button
                                    onClick={() => {
                                        setUpdateButtonClick(false);
                                        setUpdateInputValue("");
                                    }}
                                    className={style["modal-button"]}
                                >
                                    &#x2716; Закрыть
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
