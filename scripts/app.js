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

const loadCategoriesDetails = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesPosts(data.data)
};

const displayCategoriesPosts = posts => {
    const displayContent = document.getElementById('display-content');
    displayContent.innerHTML = ``
    posts.forEach(post => {
        const { _id, total_view, title, author, thumbnail_url, details, rating} = post;
        const { number, badge } = rating;
        const { name, published_date, img } = author;
        const postDiv = document.createElement('div')
        postDiv.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl mb-5">
        <figure class="p-2"><img src="${thumbnail_url}" alt="Movie"></figure>
        <div class="card-body w-64">
        <h2 class="card-title">${title}</h2>
        <p>${details.slice(0, 500,) + "..."}</p>
        <div class="card-actions justify-between items-center">
            <div class="flex items-center">
                <div id="profile-icon" class="w-10 rounded-full">
                <img src="${img}" alt="">
                </div>
                <div class="ml-2">
                <p>${name ? name : 'No author'}</p>
                <p>${published_date}</p>
                </div>
            </div>
            <div class="flex items-center justify-evenly">
                <img src="../images/carbon_view.png" alt="">
                <p class="ml-2">${total_view ? total_view : "No view"}</p>
            </div>
            <!-- The button to open modal -->
            <label onclick="loadPostsModal('${_id}')"  for="my-modal" class="btn modal-button">Read More</label>
        </div>
        </div>
        </div>
        `
        displayContent.appendChild(postDiv)
    })
}



loadCategories()