document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.querySelector('.detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');


    // Fetch dữ liệu quốc gia dựa trên tên quốc gia
    fetch('https://restcountries.com/v3.1/name/' + countryName)
    .then((res) => res.json())
    .then((data) => {
        const country = data[0];
        const languages = Object.values(country.languages);
        let nativeNames = Object.values(country.name.nativeName);
        nativeNames = nativeNames.map((name) => name.common);
        let currencies = Object.values(country.currencies);
        currencies = currencies.map((currency) => currency.name);
        countriesContainer.innerHTML = `
            <div class="image-country">
                <img src="${country.flags.svg}" alt="flag">
            </div>

            <div class="country-information">
                <h1>${country.name.common}</h1>
                <div class="body">
                    <div class="left">
                        <p><strong>Native name:</strong>&nbsp;${nativeNames.join(', ')}</p>
                        <p><strong>Population:</strong>&nbsp;${country.population.toLocaleString('vi-VN')}</p>
                        <p><strong>Region:</strong>&nbsp;${country.region}</p>
                        <p><strong>Sub region:</strong>&nbsp;${country.subregion}</p>
                        <p><strong>Capital:</strong>&nbsp;${country.capital?.[0]}</p>
                    </div>
                    <div class="right">
                        <p><strong>Top level domain:</strong>&nbsp;${country.tld.join(', ')}</p>
                        <p><strong>Currencies:</strong>&nbsp;${currencies.join(', ')}</p>
                        <p><strong>Language:</strong>&nbsp;${languages.join(', ')}</p>
                    </div>
                </div>
                <div class="border-countries">
                    <p><strong>Border countries:</strong>&nbsp;</p>
                    <div class="list-item">
                        Empty
                    </div>
                </div>
            </div>
        `;

        // Xử lý danh sách quốc gia biên giới
        let borderCountries = country.borders;

        if (borderCountries) {
            fetch('https://restcountries.com/v3.1/alpha?codes=' + borderCountries.join(','))
            .then((res) => res.json())
            .then((data) => {
                const borderCountryNames = data.map((country) => country.name.common);
                const borderCountriesContainer = document.querySelector('.border-countries .list-item');
                borderCountriesContainer.innerHTML = '';
                borderCountryNames.forEach((countryName) => {
                    borderCountriesContainer.innerHTML += `<div class="item">${countryName}</div>`;
                });
            });
        }
    });

    
});
