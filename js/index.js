const loadAllNewsCategory = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        return (data.data.news_category);
    }
    catch (error) {
        return error;
    }
}

const displayAllNewsCategory = async() =>{
    const categories = await loadAllNewsCategory();
    console.log(categories);
    const categoryMenu =document.getElementById('category-menu');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('fw-bold');
        li.innerText = `${category.category_name}
        `;
        categoryMenu.appendChild(li);
    });  
}
displayAllNewsCategory();
