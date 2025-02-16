document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded correctly");

    const mainContent = document.querySelector("#maincontent");

    if (!mainContent) {
        console.error("Main content section not found!");
        return;
    }

    const articles = [
        {
            title: "Septimus Heap Book One: Magyk",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
            date: "July 5, 2022",
            ageRange: "10-14",
            genre: "Fantasy",
            rating: "⭐⭐⭐⭐",
            description: "If you enjoy stories about seventh sons of seventh sons and magyk, this is the book for you.",
            readMoreLink: "#Readmore"
        },
        {
            title: "Magnus Chase Book One: Sword of Summer",
            imageUrl: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
            date: "December 12, 2021",
            ageRange: "12-16",
            genre: "Fantasy",
            rating: "⭐⭐⭐⭐",
            description: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
            readMoreLink: "#Readmore2"
        },
        {
            title: "Belgariad Book One: Pawn of Prophecy",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
            date: "Feb 12, 2022",
            ageRange: "12-16",
            genre: "Fantasy",
            rating: "⭐⭐⭐⭐⭐",
            description: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
            readMoreLink: "#Readmore3"
        }
    ];

    articles.forEach((item) => {
        const articleWrapper = document.createElement("div");
        articleWrapper.classList.add("article-wrapper");

        const infoSection = document.createElement("section");
        infoSection.classList.add("info");
        infoSection.innerHTML = `
            <p><strong>Published:</strong> ${item.date}</p>
            <p><strong>Age Range:</strong> ${item.ageRange}</p>
            <p><strong>Genre:</strong> ${item.genre}</p>
            <p><strong>Rating:</strong> ${item.rating}</p>
        `;

        const articleSection = document.createElement("section");
        articleSection.classList.add("books");
        articleSection.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.imageUrl}" alt="${item.title} Book Cover">
            <p>${item.description} <a href="${item.readMoreLink}">Read More...</a></p>
        `;

        articleWrapper.appendChild(infoSection);
        articleWrapper.appendChild(articleSection);

        mainContent.appendChild(articleWrapper);
    });
});
