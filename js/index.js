// load all category section
const loadAllNewsCategory = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        displayAllNewsCategory(data.data.news_category.sort());
    }
    catch (error) {
        console.log('Error in Api Load', error);
    }
}

// display all category section
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

// load all categorywise news section
const loadCategoryWiseNews = async (id) => {
    try {
        // spiner start
        toogleSpnier(true);
        const url = (`https://openapi.programming-hero.com/api/news/category/${id}`);
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryWiseNews(data.data.sort(function (a, b) {
            return b.total_view - a.total_view;
        }));
    }
    catch(error) {
        console.log('Error in Api Load', error);
    }
};

// display all categorywise news section
const displayCategoryWiseNews = (data) => {
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
                <p class="card-text">${details.details.slice(0, 250) + '...'}</p>
                <div class="container text-center">
                    <div class="row">
                        <div class="col-sm-4">
                            <img class="img-fluid rounded-circle text-start" height="40px" width="40px"
                                src="${details.author.img}" alt=""><span>${details.author.name ? details.author.name : 'Information not found'}</span>
                        </div>
                        <div class="col-sm-2">
                            <i class="fa-sharp fa-solid fa-eye"></i><span> ${details.total_view || details.total_view === 0 ? details.total_view : 'Information not found'}</span>
                        </div>
                        <div class="col-sm-4">
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-dark fa-star"> ${details.rating.number}</i>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-sm-2">
                            <i onclick="modalInformation('${details._id}')" class="fa-solid fs-4 fa-arrow-right text-info" data-bs-toggle="modal" data-bs-target="#exampleModal"> </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
        newsDetails.appendChild(div);
    });
    //spnier end
    toogleSpnier(false);
}

// load all categorywise news details section
const modalInformation = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data[0]))
    .catch(error => console.log('Error in Api Load',error));
}

// display all categorywise news details section as modal
const displayDetails = details => {
    const detailContainer = document.getElementById('modal-body');
    detailContainer.innerHTML = ``;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${details.image_url}" class="card-img-top" alt="...">
        <strong class="mt-4">Title: ${details.title}</strong>
            <ul id="category-menu" class="d-block my-4 list-unstyled my-3">
            <li>Catagory Id: ${details.category_id}</li>
            <li>Author Name: ${details.author.name ? details.author.name : 'Information not found'}</li>
            <li>Rating: ${details.rating.number}</li>
            <li>Badge: ${details.rating.badge}</li>
            <li>Published Date: ${details.author.published_date}</li>
            </ul>
        `;
    detailContainer.appendChild(div);
}

// spnier function
const toogleSpnier = isLoading => {
    const loaderSection = document.getElementById('spiner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadCategoryWiseNews('08')
loadAllNewsCategory();
