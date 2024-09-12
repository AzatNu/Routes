import { useState } from "react";

export const useRequestAddTodoModule = (
    TODOLIST,
    setTODOLIST,
    setErrorMessage
) => {
    const [isAdding, setIsAdding] = useState(false);
    const requestAddTodo = (value) => {
        if (
            TODOLIST.find(
                (item) =>
                    item.title.trim().toLowerCase() ===
                    value.trim().toLowerCase()
            )
        ) {
            setErrorMessage("Задача с таким названием уже существует");
            return;
        } else if (value.trim() === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else if (value.length > 1200) {
            setErrorMessage("Слишком длинное название задачи");
        } else {
            setIsAdding(true);
            fetch("http://localhost:3005/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: value,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTODOLIST((lastState) => [...lastState, data]);
                })
                .finally(() => {
                    setIsAdding(false);
                });
        }
    };

    return {
        requestAddTodo,
        isAdding,
    };
};
