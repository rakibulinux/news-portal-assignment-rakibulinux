const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
};

const displayCategories = (categories) => {
    const displayCategory = document.getElementById('display-categories');
    categories.forEach(category => {
        const { category_id, category_name } = category;
        console.log(category);
        const categoryli = document.createElement('li');
        categoryli.classList.add('p-4', 'text-gray-500');
        categoryli.innerHTML = `
            <a href="#" onclick="loadCategoriesDetails('${category_id}')" class="" >${category_name}</a>
        `;
        displayCategory.appendChild(categoryli);
        // displayCategory.innerHTML = category;
    })
}



loadCategories()