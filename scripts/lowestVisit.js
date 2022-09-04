const loadLowestDetails = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url)
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLowestPosts(data.data);
    }
    catch (err) {
        console.log(err);
    }
};

const displayLowestPosts = (posts) => {
    const lowestVisit = document.getElementById('lowest-visit');
    const mostVisited = document.getElementById('most-visited');
    const displayContent = document.getElementById('display-content');


    // console.log(posts.length);
    const displayPostItemLength = document.getElementById('display-post-length');
    displayPostItemLength.innerHTML = `
    <h3 class="ml-8 font-semibold">${posts.length ? posts.length : 'No post'} items found for category</h3>
    `
    loddingSpinner(true)
    lowestVisit.innerHTML = ``
    mostVisited.innerHTML = ``
    displayContent.innerHTML = ``
    const showLowest = posts.sort((mostView, lowestView) => {
        console.log(mostView.total_view, lowestView.total_view);
        return mostView.total_view - lowestView.total_view
    });
    showLowest.forEach(post => {
        const { _id, total_view, title, author, thumbnail_url, details, rating } = post;

        // console.log(total_view);        
        const { number, badge } = rating;
        const { name, published_date, img } = author;

        const postDiv = document.createElement('div')
        postDiv.innerHTML = `
        <div class="card-side bg-base-100 shadow-xl mb-5 md:flex">
        <figure class="p-2"><img src="${thumbnail_url}" alt="Movie"></figure>
        <div class="card-body w-64">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0, 500,) + "..."}</p>
          <div class="card-actions justify-between items-center">
            <div class="flex items-center">
              <div id="profile-icon">
                <img class="w-10 rounded-full" src="${img}" alt="">
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
            <label onclick="loadPostsModal('${_id}')" for="read-more-modal" class="btn modal-button">Read
              More</label>
          </div>
        </div>
      </div>
        `
        lowestVisit.appendChild(postDiv)

    })
    loddingSpinner(false);
}