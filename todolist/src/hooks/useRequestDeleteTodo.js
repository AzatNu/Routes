export const useRequestDeleteTodoModule = (
    setRefreshPage,
    refreshPage,
    setErrorMessage
) => {
    const requestDeleteTodo = (value) => {
        fetch(`http://localhost:3005/todos/${value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => {
            setRefreshPage(!refreshPage);
            setErrorMessage("Задача удалена");
        });
    };
    return {
        requestDeleteTodo,
    };
};
