export const useRequestUpdateTodoModule = ({
    setTodo,
    todo,
    id,
    setUpdateButtonClick,
    setCardErrorMessage,
    setRefreshPage,
    refreshPage,
    setIsLoading,
}) => {
    const requestUpdateTodo = (updatedInputValue) => {
        setIsLoading(true);
        if (updatedInputValue.trim() === "") {
            setCardErrorMessage("Название задачи не может быть пустым");
            setIsLoading(false);
            return;
        } else if (updatedInputValue.length > 1200) {
            setCardErrorMessage("Слишком длинное название задачи");
            setIsLoading(false);
            return;
        } else if (updatedInputValue.length < 3) {
            setCardErrorMessage("Слишком короткое название задачи");
            setIsLoading(false);
            return;
        } else if (updatedInputValue.trim() === todo.title.trim()) {
            setCardErrorMessage(
                "Новое название не должно совпадать с текущим названием"
            );
            setIsLoading(false);
            return;
        } else {
            fetch(`http://localhost:3005/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: updatedInputValue }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTodo(data);
                })
                .finally(() => {
                    setRefreshPage(!refreshPage);
                    setUpdateButtonClick(false);
                    setIsLoading(false);
                    setCardErrorMessage("Задача обновлена");
                });
        }
    };
    return {
        requestUpdateTodo,
    };
};
