import React, { useState } from 'react';
import '../css/AutoComplete.css';
import http from '../helpers/http';

const AutoComplete = () => {
    const [list, setList] = useState([]);
    const [cards, setCards] = useState([]);
    const [item, setItem] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [titles, setTitles] = useState([]);
    const suggestionSelected = (item) => {
        setText(item.title);
        setItem(item);
        setSuggestions([]);
    }
      
    const handleText = (e) => {
        e.preventDefault();
        const value = e.target.value;
        http.postData('http://localhost:3001/search',{ key: value })
        .then((data)=> {
            let r = data.result;
            let t = [];
            r.map((item) => {
                t.push(item.title);
            })
            setTitles(t);
            setList(r);
        })
        setSuggestions(titles);
        setText(value);
    }
    
    const renderSuggestions = () => {
        if(suggestions.length === 0) {
            return null;
        } else {
            return(
            <ul>
                {list.map((item)=><li key={item.id} value={ item.title }
                onClick = {() => 
                    suggestionSelected(item)
                }>{item.title}</li>)}
            </ul>
            );
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        for(let c=0;c<cards.length;c++) {
            if(cards[c].id === item.id) {
                flag = false;
            }
        }
        if(flag) {
            let t = [item];
            setCards([...cards, ...t]);
        }
        setText('');
    }
    return(
        <div className="AutoCompleteText">
            <form>
            <input
            autoComplete="off"
            style = {{
                "width": "50%",
                "padding": "12px 20px",
                "marginRight":"20px",
                //"margin": "8px 0",
                "display": "inline-block",
                "border": "1px solid #ccc",
                "borderRadius": "4px",
                //"boxSizing: "border-box"
            }}
            type="text" 
            id="bookname" 
            name="bookname"
            placeholder="Search Books"
            value={text}
            onChange = {handleText}
            />
            <input
            style = {{
            "width": "20%",
            "backgroundColor": "#4CAF50",
            "color": "white",
            "padding": "14px 20px",
            //"marginLeft":"20px",
            "margin": "8px 0 8px",
            "border": "none",
            "borderRadius": "4px",
            "cursor": "pointer"
            }}
            onClick = {handleSubmit}
            type="submit"
            value="Submit"
            />
            {renderSuggestions()}
        </form>
        <div className="row">
        {cards.map((item)=>
            <div className='column'>
                <div className='card' style={{ marginBottom:'10px'}}>
                    <h4>{ item.title.slice(0,15) }...</h4>
                    <p>{ item.summary.slice(0,75) }...</p>
                    <hr />
                    <small>Arvind</small>
                </div>
            </div>
        )}
        </div>
        </div>
    )
}

export default AutoComplete;