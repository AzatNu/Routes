export const useRequestUpdateTodoModule = (
    TODOLIST,
    setTODOLIST,
    setErrorMessage,
    setRefreshPage,
    refreshPage
) => {
    const requestUpdateTodo = (updatedValue, id) => {
        if (updatedValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else if (
            TODOLIST.find(
                (item) =>
                    item.title.trim().toLowerCase() ===
                    updatedValue.trim().toLowerCase()
            )
        ) {
            setErrorMessage("Задача с таким названием уже существует");
            return;
        } else if (updatedValue.length > 1200) {
            setErrorMessage("Слишком длинное название задачи");
            return;
        } else {
            fetch(`http://localhost:3005/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedValue,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTODOLIST(
                        TODOLIST.map((item) =>
                            item.id === id
                                ? { ...item, title: updatedValue }
                                : item
                        )
                    );
                })
                .finally(() => {
                    setRefreshPage(!refreshPage);
                    setErrorMessage("Задача обновлена");
                });
        }
    };
    return {
        requestUpdateTodo,
    };
};
