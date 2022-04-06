import { useSelector, useDispatch } from 'react-redux';
import { fetchAutoComplete, setTheCity } from '../../actions/index';
import { autoComplete } from '../../services/geocoding/geocoding';
import { useState, useEffect } from 'react';
import close from '../../assets/images/close.png'

const PopUp = (props) => {
    const inpt = useSelector(state => state.city.autoCompleteInput);
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const [updLocalStorge, setUpdLocalStorge] = useState(false);

    useEffect(() => {



        const localStorage = window.localStorage;

        if (localStorage.getItem('cities') === null || localStorage.getItem('cities') === ''){
            setCitiesView([]);
            return;
        } 

        let oldStr = localStorage.getItem('cities');


        let arrOfDots= [];

        for (let i=0; i < oldStr.length; i++) {
            if(oldStr.charAt(i) === ','){
                arrOfDots.push(i);
            }
        }


        if (arrOfDots.length){
            let newArr = arrOfDots.map((item, i) => {
                let oneItem = '';
                if (i !== 0) {
                    oneItem = oldStr.slice(arrOfDots[i-1]+1, item);
                } else {
                    oneItem = oldStr.slice(0, item);
                }

                return (
                    <div className="savedCity" key={i} >
                        <h4 onClick={() => {
                            let seperatorFinder = oneItem.indexOf(' ');
                            console.log(oneItem, 'oneItem');
                            console.log(seperatorFinder, 'sEpErAtOr');

                            const neadedPart = oneItem.slice(0, seperatorFinder);

                            dispatch(setTheCity(neadedPart));
                        }}>{oneItem}</h4>
                        <img onClick={() => {
                            const indexOfItem = localStorage.getItem('cities').indexOf(oneItem);
                            const newFirstStr=localStorage.getItem('cities').slice(0, indexOfItem);
                            const newSecondStr=localStorage.getItem('cities').slice(newFirstStr.length+oneItem.length+1);
                            console.log(newFirstStr, '*', newSecondStr);
                            if (newSecondStr === localStorage.getItem('cities') && !newFirstStr) {
                                localStorage.removeItem('cities');
                                setCitiesView([]);
                                return;
                            }
                            localStorage.setItem('cities', `${newFirstStr}${newSecondStr}`);
                            setUpdLocalStorge(!updLocalStorge);
                        }} src={close} alt="Delete" />
                    </div>
                )
            })
            let oneItem = oldStr.slice(arrOfDots[arrOfDots.length-1]+1);
            let elem = <div className="savedCity" key={arrOfDots.length} >
                <h4 onClick={() => {
                    let seperatorFinder = oneItem.indexOf(' ');
                    const neadedPart = oneItem.slice(0, seperatorFinder);

                    dispatch(setTheCity(neadedPart));
                }}>{oneItem}</h4>
                <img onClick={() => {
                            const indexOfItem = localStorage.getItem('cities').indexOf(oneItem);
                            const newFirstStr=localStorage.getItem('cities').slice(0, indexOfItem-1);
                            const newSecondStr=localStorage.getItem('cities').slice(newFirstStr.length+oneItem.length+1);
                            console.log(newFirstStr, '*', newSecondStr);
                            if (newSecondStr === localStorage.getItem('cities') && !newFirstStr) {
                                localStorage.removeItem('cities');
                                setCitiesView([]);
                                return;
                            }
                            localStorage.setItem('cities', `${newFirstStr}${newSecondStr}`);
                            setUpdLocalStorge(!updLocalStorge);
                        }} src={close} alt="Delete" />
                </div>;

            newArr.push(elem);
            
            setCitiesView(newArr);
        } else{
            let oneItem = oldStr.slice(0, arrOfDots[0]);
            let newArr = <div className="savedCity">
                <h4  onClick={() => {
                    let seperatorFinder = oneItem.indexOf(' ');

                    const neadedPart = oneItem.slice(0, seperatorFinder);

                    dispatch(setTheCity(neadedPart));
                }}>{oneItem}</h4>
                <img onClick={() => {
                            const indexOfItem = localStorage.getItem('cities').indexOf(oneItem);
                            const newFirstStr=localStorage.getItem('cities').slice(0, indexOfItem);
                            const newSecondStr=localStorage.getItem('cities').slice(newFirstStr.length+oneItem.length+1);
                            console.log(newFirstStr, '*', newSecondStr);
                            if (newSecondStr === localStorage.getItem('cities') && !newFirstStr) {
                                localStorage.removeItem('cities');
                                setCitiesView([]);
                                return;
                            }
                            localStorage.setItem('cities', `${newFirstStr}${newSecondStr}`);
                            setUpdLocalStorge(!updLocalStorge);
                        }} src={close} alt="Delete" />
                </div>;
            setCitiesView(newArr);
        }
        if (document.querySelector('#overflow').offsetHeight > 500 || document.querySelector('#overflow').offsetHeight === 0){
            
            document.querySelector('#overflow').style.overflowY = 'scroll';
            document.querySelector('#overflow').style.height = '600px';
        }
        
    }, [updLocalStorge]);





    const inputHandler = async (e) => {
        dispatch(fetchAutoComplete(e.target.value));

        setTimeout(() => {
            autoComplete(e.target.value)
            .then(data => {
                console.log(e.target.value);
                console.log(data, 'data');
                if (!data || !data.length) return;
                let view = data.map((item, i) => {
                    if (item.type !== 'city') return null;
                    return (
                        <div key={i} className="suggestion" onClick={() => dispatch(fetchAutoComplete(item.address.name))}>
                            <h4>{item.address.name}</h4>
                            <h5>{item.address.country}</h5>
                        </div>
                    )
                })
                setSuggestions(view);
            })
        }, 30)


    }
    const btnClickHandler = (val, e) => {
        const localStorage = window.localStorage;

        setTimeout(() => {
            autoComplete(val)
            .then(data => {
                if (data.length && data[0].type === 'city') {
                    dispatch(setTheCity(data[0].address.name));
                    
                    if (localStorage.getItem('cities') === null || localStorage.getItem('cities') === '') {
                        let cityHasSpaces = data[0].address.name.indexOf(' ');
                        let realCityName = data[0].address.name;
                        if (cityHasSpaces !== -1) {
                            realCityName = data[0].address.name.replace(' ', ' ');
                        }
                        localStorage.setItem('cities', `${realCityName} ${data[0].address.country}`);
                    } else {
                        let cityHasSpaces = data[0].address.name.indexOf(' ');
                        let realCityName = data[0].address.name;
                        if (cityHasSpaces !== -1) {
                            realCityName = data[0].address.name.replace(' ', ' ');
                        }
                        console.log(localStorage.getItem('cities').indexOf(`${realCityName} ${data[0].address.country}`, 'indexOf'));

                        if (+localStorage.getItem('cities').indexOf(`${realCityName} ${data[0].address.country}`) !== -1) return;


                        let newCities = `${localStorage.getItem('cities')},${realCityName} ${data[0].address.country}`;
                        localStorage.setItem('cities', newCities);
                    }
                    setUpdLocalStorge(!updLocalStorge);
                }
            })
        }, 30)

        
    }


    return (
        <>
            <div className="popUp" style={{display: `${props.isPopUp ? 'flex' : 'none'}`}}>
                <div id='overflow'>
                    <input type="text" placeholder="Enter a city" value={inpt} onChange={(e) => inputHandler(e)} />
                    <div className="inputSuggestions">
                        {suggestions}
                    </div>
                    {citiesView}
                </div>
                <button onClick={(e) => btnClickHandler(inpt, e)}>Add City</button>
            </div>
            <div className="bluryCover" onClick={() => {props.setIsPopUp(!props.isPopUp)}} style={{display: `${props.isPopUp ? 'flex' : 'none'}`}}></div>
        </>

    )
}

export default PopUp;