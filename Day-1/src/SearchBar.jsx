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

        fetchSuggestions(query);

    },[query]);

    const fetchSuggestions = async (searchText) => {
        try{
            const data = await fetch(`https://api.datamuse.com/sug?s=${searchText}`);
            const response = await data.json();
            setSuggestions(response);
        }
        catch(error){
            console.log("Error: ",error)
        }
        finally{
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