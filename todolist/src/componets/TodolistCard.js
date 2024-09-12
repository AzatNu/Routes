import styel from "./Todolist.module.css";
import {
    useRequestDeleteTodoModule,
    useRequestUpdateTodoModule,
} from "../hooks";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
export const TodolistCard = ({
    TODOLIST,
    id,
    setUpdateInputValue,
    setUpdateButtonClick,
    setUpdateId,
    setTODOLIST,
    setErrorMessage,
    setRefreshPage,
    refreshPage,
    updateButtonClicked,
    updateInputValue,
}) => {
    const getTodoById = TODOLIST.find((item) => item.id === id);
    const { requestDeleteTodo } = useRequestDeleteTodoModule(
        setRefreshPage,
        refreshPage,
        setErrorMessage
    );
    const { requestUpdateTodo } = useRequestUpdateTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage,
        setRefreshPage,
        refreshPage
    );

    return (
        <div className={styel["TodolistCard"]}>
            <h1 className={styel["title"]}>Задача: {id}</h1>
            <div className={styel["item"]}>
                <p
                    className={styel["todos-content"]}
                    style={{ wordBreak: "break-word" }}
                >
                    {getTodoById?.title}
                </p>
            </div>
            <div className={styel["buttons"]}>
                <NavLink to={`/`}>
                    <button
                        className={styel["Back-button"]}
                        title="Вернуться к списку задач"
                    >
                        ⭠
                    </button>
                </NavLink>
                <button
                    title="Редактировать задачу"
                    className={styel["Edit-button"]}
                    onClick={() => {
                        setUpdateInputValue(getTodoById?.title);
                        setUpdateButtonClick(true);
                        setUpdateId(id);
                    }}
                >
                    &#9998;
                </button>
                <NavLink to={`/`}>
                    <button
                        title="Удалить задачу"
                        className={styel["Delete-button"]}
                        onClick={() => {
                            requestDeleteTodo(id);
                            setRefreshPage(!refreshPage);
                        }}
                    >
                        &#x2716;
                    </button>
                </NavLink>
            </div>
            <div className={styel["buttons"]}>
                {updateButtonClicked && (
                    <div className={styel["modal"]}>
                        <div className={styel["modal-content"]}>
                            <h2>Введите новый текст для задачи</h2>
                            <input
                                placeholder="Новый текст для задачи"
                                className={styel["modal-input"]}
                                type="text"
                                value={updateInputValue}
                                onChange={(e) =>
                                    setUpdateInputValue(e.target.value)
                                }
                            />
                            <NavLink to={`/`}>
                                <button
                                    onClick={() => {
                                        requestUpdateTodo(updateInputValue, id);
                                        setUpdateButtonClick(false);
                                        setUpdateInputValue("");
                                    }}
                                    className={styel["modal-button"]}
                                >
                                    &#x2714; Обновить
                                </button>
                            </NavLink>
                            <button
                                onClick={() => {
                                    setUpdateButtonClick(false);
                                }}
                                className={styel["modal-button"]}
                            >
                                &#x2716; Закрыть
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
