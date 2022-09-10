const loadAllNewsCategory = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        displayAllNewsCategory(data.data.news_category.sort());
    }
    catch (error) {
        return error;
    }
}

const displayAllNewsCategory = data => {
    const categoryMenu = document.getElementById('category-menu');
    data.forEach((category) => {
        const li = document.createElement('li');
        li.classList.add('fw-bold');
        li.innerHTML = `<span class="btn" onclick="loadCategoryWiseNews('${category.category_id}')">${category.category_name} </span>
        `;
        categoryMenu.appendChild(li);
    });
}

const loadCategoryWiseNews = async (id) => {
    try {
        const url = (`https://openapi.programming-hero.com/api/news/category/${id}`);
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryWiseNews(data.data.sort(function (a, b) {
            return b.total_view - a.total_view;
        }));

    }
    catch {
        console.log('There are an error');
    }
};

const displayCategoryWiseNews = (data) => {
    console.log(data);

    const noOfNews = data.length;
    const noOfNewsSection = document.getElementById('no-of-news')
    noOfNewsSection.innerText = noOfNews;

    const newsDetails = document.getElementById('news-container');
    newsDetails.innerHTML = '';
    data.forEach(details => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row g-0 mt-5">
        <div class="col-md-4">
            <img src="${details.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
         <div class="ps-3 col-md-8">
            <div class="card-body">
                <h5 class="card-title">${details.title}</h5>
                <p class="card-text">${details.details}</p>
                <div class="container text-center">
                    <div class="row">
                        <div class="col-sm-4">
                            <img class="img-fluid rounded-circle text-start" height="40px" width="40px"
                                src="${details.author.img}" alt=""><span>${details.author.name}</span>
                        </div>
                        <div class="col-sm-2">
                            <i class="fa-sharp fa-solid fa-eye"><span>${details.total_view}</span></i>
                        </div>
                        <div class="col-sm-4">
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-dark fa-star"> ${details.rating.number}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
        newsDetails.appendChild(div);

    });
}
loadCategoryWiseNews('08')
loadAllNewsCategory();
