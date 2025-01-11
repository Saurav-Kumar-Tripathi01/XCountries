import { useEffect, useState } from "react";

function CountryCard({ flagUrl, name }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid gray",
                borderRadius: "10px",
                padding: "10px",
                height: "250px",
                width: "250px",
                textAlign: "center",
            }}
        >
            <img
                src={flagUrl}
                alt={`Flag of ${name}`}
                style={{
                    height: "100px",
                    width: "100px",
                }}
            />
            <h2>{name}</h2>
        </div>
    );
}

const Countries = () => {
    const API_url = "https://xcountriesapi.onrender.com/all";
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(API_url)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Data:", data);
                setCountries(data.data || []);
            })
            .catch((error) => console.error("Error fetching data: " + error));
    }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid gray",
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                {filteredCountries.map((country) => (
                    <CountryCard
                        name={country.name}
                        flagUrl={country.flag}
                        key={country.abbr}
                    />
                ))}
            </div>
        </div>
    );
};

export default Countries;