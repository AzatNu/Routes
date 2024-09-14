export const useRequestDeleteTodoModule = (
    setRefreshPage,
    refreshPage,
    setCardErrorMessage
) => {
    const requestDeleteTodo = (value) => {
        fetch(`http://localhost:3005/todos/${value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => {
            setRefreshPage(!refreshPage);
            setCardErrorMessage("Задача удалена");
        });
    };
    return {
        requestDeleteTodo,
    };
};
