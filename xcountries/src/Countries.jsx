import { useEffect, useState } from "react";

function CountryCard({flagUrl, name}){
    return (
        <div 
        style = {{
            display : "flex",
            flexDirection : "column",
            alignItems : "center",
            justifyContent: "center",
            border : "1px solid gray",
            borderRadius : "10px",
            padding: "10px",
            height: "250px",
            width: "250px",
            textAlign: "center",
        }}>
            <img src={flagUrl} alt={`Flag of ${name}`} style = {{
                height: "100px",
                width : "100px",
            }}/>
            <h2>{name}</h2>
        </div>
    );
}


const Countries = () =>{
    const API_url = "https://xcountries-backend.azurewebsites.net/all";
    const [countries, setCountries] = useState([]);

    console.log({countries});

    useEffect(() => {
        fetch(API_url).then((response)=>response.json()).then(data => setCountries(data)).catch(error => console.error("Error fetching data: "+error));
    }, []);
    return (
        <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            gap:"10px"
        }}
        >
            {countries.map((country)=>(
                <CountryCard name={country.name} flagUrl = {country.flag} key={country.abbr}  />
            ))}
             
        </div>
    );
};

export default Countries;