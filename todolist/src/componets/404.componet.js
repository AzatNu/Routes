import { NavLink } from "react-router-dom";
import style from "./Error404.module.css";
export const Error404 = () => {
    return (
        <div className={style["Error404"]}>
            <h1>Error 404</h1>
            <p className={style["Error404-text"]}>
                Страница не найдена, проверте корректность введеннго адреса
            </p>
            <NavLink to={`/`}>
                <button className={style["modal-button"]}>
                    Вернуться к списку задач
                </button>
            </NavLink>
        </div>
    );
};
