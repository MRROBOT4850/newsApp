// const url=;
// var key=fe353924dd734eb994419162630d5910;
const API_KEY="fe353924dd734eb994419162630d5910";
var url = 'https://newsapi.org/v2/everything?q=';

// var req = new Request(url);

// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })
window.addEventListener("load", () => fetchNews("World"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
    
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;


    
// });
searchText.addEventListener("keypress", function(event) {
   
    if (event.key === "Enter") {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
        searchText.value="";
        document.getElementById("myNav").style.width = "0%";
      document.getElementById("myBtn").click();
    }
  });
searchButton.addEventListener("submit",()=>{
    
    // document.getElementById("myNav").style.width = "0%";
});
// getNews(url);
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.querySelector("nav").style.width="0%";

  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
 