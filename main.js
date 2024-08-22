
const countriesContainer = document.querySelector('.countries-container');// API
const searchBtn = document.getElementById('search'); // Bắt giá trị của nút search
const filterBtn = document.getElementById('country-filter'); //Bắt giá trị của nút filter
const modeBtn = document.getElementById('mode');
const body = document.body;


let countriesData = []; //Biến lưu trữ dữ liệu quốc gia

function displayCountries(countries) {
    countriesContainer.innerHTML = ''; // Xóa nội dung cũ
    countries.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `/detail.html?name=${country.name.common}`
        countryCard.innerHTML =`
            <img src="${country.flags.svg}" alt="flag">
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                        <p><strong>Population: </strong>${country.population.toLocaleString('vi-VN')}</p>
                        <p><strong>Region: </strong>${country.region}</p>
                        <p><strong>Capital: </strong>${country.capital?.[0]}</p>
                </div>
        `
        countriesContainer.append(countryCard);
    });
}

//Fetch API và lưu trữ dữ liệu quốc gia
fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    countriesData = data; //Lưu dữ liệu vào biến toàn cục
    displayCountries(countriesData);
});

//Hàm lọc và tìm kiếm quốc gia
searchBtn.addEventListener('input', () => {
    const searchValue = searchBtn.value.toLowerCase().trim(); //Hàm trim() dùng để xóa khoảng trắng đầu và cuối chuỗi
    const searchCountries = countriesData.filter(country =>  
        country.name.common.toLowerCase().includes(searchValue)
    );
    // Hàm filter() sẽ trả về một mảng mới khi bên trong đã lọc
    // Hàm includes() nó sẽ kiểm tra chuỗi con có tồn tại trong chuỗi chính không
    displayCountries(searchCountries); //Hiển thị quốc gia sau khi lọc
});

//Hàm lọc quốc gia theo châu lục
filterBtn.addEventListener('input', () => {
    const filterValue = filterBtn.value.toLowerCase();
    const filteredCountries = countriesData.filter(country => 
        country.region.toLowerCase().includes(filterValue)
    );
    displayCountries(filteredCountries);
});

//Hàm thay đổi background
modeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); //classList.toggle() : thêm hoặc xóa thẻ dark mode 
})
