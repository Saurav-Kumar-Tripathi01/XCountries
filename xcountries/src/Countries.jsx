import { useEffect, useState } from "react";

// CountryCard Component
function CountryCard({ flagUrl, name }) {
    return (
        <div
            className="countryCard"
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

// Countries Component
const Countries = () => {
    const API_url = "https://xcountriesapi.onrender.com/all";
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch countries data
    useEffect(() => {
        fetch(API_url)
            .then((response) => response.json())
            .then((data) => {
                const uniqueCountries = Array.from(
                    new Set(data.data.map((country) => country.name))
                ).map((name) => data.data.find((country) => country.name === name));
                setCountries(uniqueCountries || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: " + error);
                setLoading(false);
            });
    }, []);

    // Filter countries based on search input
    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Search Bar */}
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

            {/* Loading Indicator */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    {/* Render Country Cards */}
                    {filteredCountries.map((country, index) => (
                        <CountryCard
                            name={country.name}
                            flagUrl={country.flag}
                            key={`${country.abbr}-${index}`} // Unique key using country.abbr and index
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Countries;
