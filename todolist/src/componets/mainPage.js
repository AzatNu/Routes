import { useEffect } from "react";
import { useRequestGetTodoModule, useRequestAddTodoModule } from "../hooks";
import style from "./MainPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export const MainPage = ({
    TODOLIST,
    setTODOLIST,
    refreshPage,
    setRefreshPage,
    sortButtonClicked,
    setSortButtonClick,
    addInputValue,
    setAddInputValue,
    errorMessage,
    setErrorMessage,
    Id,
    setId,
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        sortTODOLIST();
    }, [sortButtonClicked]);
    const { isLoading } = useRequestGetTodoModule(setTODOLIST, refreshPage);
    const { requestAddTodo, isAdding } = useRequestAddTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );

    const sortTODOLIST = () => {
        if (!sortButtonClicked) {
            TODOLIST.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            TODOLIST.sort((b, a) => a.title.localeCompare(b.title));
        }
    };

    const serchInTODOLIST = () => {
        if (addInputValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else {
            const newTODOLIST = TODOLIST.filter((todo) =>
                todo.title
                    .toLowerCase()
                    .trim()
                    .includes(addInputValue.toLowerCase().trim())
            );
            setTODOLIST(newTODOLIST);
        }
    };

    return (
        <div className={style["App"]}>
            {isLoading && <div className={style["loader"]}></div>}
            {errorMessage !== "" && (
                <div className={style["errorWindow"]}>
                    <h2>{errorMessage}</h2>
                    <button
                        onClick={() => setErrorMessage("")}
                        className={style["closeErrorWindow"]}
                    >
                        OK
                    </button>
                </div>
            )}
            <h1 className={style["title"]}>TODOLIST</h1>
            <div className={style["content"]}>
                <div className={style["serch-sort-module"]}>
                    <input
                        className={style["search-input"]}
                        placeholder="Найти задачу или добавить её"
                        type="text"
                        value={addInputValue}
                        onChange={(e) => setAddInputValue(e.target.value)}
                    />
                    <button
                        onClick={() => serchInTODOLIST()}
                        className={style["serch-button"]}
                    >
                        Найти
                    </button>
                    <button
                        onClick={() => {
                            setRefreshPage(!refreshPage);
                            setAddInputValue("");
                        }}
                        className={style["serch-button"]}
                    >
                        Сбросить
                    </button>
                    <button
                        onClick={() => setSortButtonClick(!sortButtonClicked)}
                        className={style["serch-button"]}
                    >
                        {sortButtonClicked ? "A — я" : "я — A"}
                    </button>
                    <button
                        onMouseOver={(e) =>
                            (e.currentTarget.title = "Добавить задачу")
                        }
                        onMouseOut={(e) => (e.currentTarget.title = "")}
                        disabled={isAdding}
                        onClick={() => {
                            requestAddTodo(addInputValue);
                            setRefreshPage(!refreshPage);
                            setAddInputValue("");
                        }}
                        className={style["add"]}
                    >
                        +
                    </button>
                </div>
                {!isLoading && TODOLIST.length === 0 && (
                    <h2 className={style["empty"]}>Задачи отсутствуют</h2>
                )}
                {Object.keys(TODOLIST).map((item, index) => (
                    <NavLink
                        key={index}
                        to={`/todo/${TODOLIST[item].id}`}
                        className={style["link"]}
                        onClick={() => setId(TODOLIST[item].id)}
                    >
                        <div className={style["item"]}>
                            Задача: {TODOLIST[item].id} -{" "}
                            {TODOLIST[item].title.length > 30
                                ? `${TODOLIST[item].title.slice(0, 27)}...`
                                : TODOLIST[item].title}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
