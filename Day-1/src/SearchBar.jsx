import { useEffect, useState } from "react";

export default function SearchBar(){
    const [query,setQuery] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(query.length<2){
            setSuggestions([]);
            return;
        }

        const debounceTimer = setTimeout(()=>{
            fetchSuggestions(query);
        },300)

        return () => clearTimeout(debounceTimer);
    },[query]);

    const fetchSuggestions = async (searchText) => {
        setLoading(true);
        try{
            const data = await fetch(`https://api.datamuse.com/sug?s=${searchText}`);
            const response = await data.json();
            setSuggestions(response);
        }catch(error){
            console.log("Error: ",error)
        }finally{
            setLoading(false);
        }
    };

    return(
        <div>
            <input id="search" type="text" placeholder="Search" value={query} onChange={(e)=> setQuery(e.target.value)}/>
            {loading && <div>Loading...</div>}
            {suggestions.length > 0 &&(
                <ul>{suggestions.map((item,index) => (
                        <li key={index}>{item.word}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}