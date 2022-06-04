import React from "react";

const LogsPage = () => {
    return <main className='main'>
    <div className='main__top'>
        <h1 className='h1'>Логи</h1>
    </div>

    <div className="logs">
        <div className="logs__table">
            <h2 className="logs__heading">Серверы</h2>
            <ul className="logs__items">
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №1</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №2</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №3</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №4</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №5</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className="logs__table">
            <h2 className="logs__heading">Камеры</h2>
            <ul className="logs__items">
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №1</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №2</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №3</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №4</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
                <li className="logs__item">
                    <a href="#" className="logs__link">
                        <span className="logs__name">Объект №5</span>
                        <span className="logs__date">16:24 19.03.2022</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </main>
}

export default LogsPage