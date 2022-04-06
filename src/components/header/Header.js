import { useDispatch, useSelector } from 'react-redux';

const Header = (props) => {
    const dispatch = useDispatch();
    const city = useSelector(state => state.city.city);

    return (
        <header className="header">
            <div className="header__container container" onClick={(e) => props.setIsPopUp(!props.isPopUp)}>
                <div className="header__container__main">
                    <div className="header__container__main__addCity">
                        +
                    </div>
                    <h4>
                        {city}
                    </h4>
                </div>
            </div>
        </header>
    )
}

export default Header;