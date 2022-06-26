// search input
const searchData = () => {
    const searchInput = document.getElementById('default-search');
    const searchText = searchInput.value;
    loadData(searchText);

    searchInput.value = '';
    toggleSpinner("addSpinner", "block");
    toggleSpinner("totalResult", "none");
    toggleSpinner("notFound", 'none');

};

// add spinner
const toggleSpinner = (id, display) => {
    document.getElementById(id).style.display = display;
}
// load data using search keywords
const loadData = async name => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${name}`);
    const data = await res.json();
    console.log(data.numFound);
    document.getElementById("total-res-found").innerText = data.numFound;


    if (data.docs.length === 0) {
        toggleSpinner("notFound", 'block');
        toggleSpinner("addSpinner", 'none');
    } else {
        showDisplay(data.docs);
        toggleSpinner("notFound", 'none');
    };
};

// check cover page id
const verifyCoverId = coverId => {
    if (coverId.hasOwnProperty('cover_i')) {
        return coverId.cover_i;
    } else {
        coverId.cover_i = 11525585;
        // coverId.cover_i = 3805084;
        return coverId.cover_i;
    };
};

// check author Names
const authorNames = names => {
    if (names.hasOwnProperty('author_name')) {
        return names.author_name[0];
    } else {
        names.author_name = ['Name not found!'];
        return names.author_name[0];
    };
};


// load cover page using Id
const loadCoverPage = image => {
    const url = `https://covers.openlibrary.org/b/id/${image}-M.jpg`;
    return url;
};

// get short name of long name
const getShortName = (name, checkName) => {
    if (checkName == "sName") {
        const res = name.substring(0, 15);
        return res;
    } else if (checkName == "aName") {
        const res = name.substring(0, 16);
        return res;
    } else if (checkName == "publisher") {
        const res = name.substring(0, 16);
        return res;
    };
};

// check pages number 
const pagesNumber = pages => {
    if (typeof pages === 'undefined') {
        return "Not Found!";
    } else {
        return pages;
    };
};

// verify publisher
const verifyPublisher = (publisher) => {
    if (publisher.hasOwnProperty('publisher')) {
        return publisher.publisher[0];
    } else {
        publisher.publisher = ['not found!'];
        return publisher.publisher[0];
    };
};



// display data to UI
const showDisplay = data => {
    const totalData = data;


    const parentDiv = document.getElementById("parent-div");
    parentDiv.textContent = '';

    totalData.forEach(element => {
        const coverPageId = verifyCoverId(element);
        const displayImage = loadCoverPage(coverPageId);
        const bookName = element.title;
        const shortName = getShortName(bookName, "sName");
        const authorName = authorNames(element);
        const shortAuthorName = getShortName(authorName, "aName");
        const bookPages = pagesNumber(element.number_of_pages_median);
        const publisher = verifyPublisher(element);
        const shortPublisherName = getShortName(publisher, "publisher");
        const publishYear = pagesNumber(element.first_publish_year);


        const childDiv = document.createElement('div');
        childDiv.innerHTML = `
        <div class="border-solid border-2 border-gray-200 p-2 rounded-md drop-shadow-lg bg-gray-800 opacity-80 text-white">
            <div class = "h-40">
                <img src = '${displayImage}' class = 'mx-auto mt-3 mb-2 h-full rounded-lg'>
            </div>
            <h1>Book Name: ${shortName}</h1>
            <h2>Author: ${shortAuthorName}</h2>
            <h2>Page: ${bookPages}</h2>
            <h4>Publisher: ${shortPublisherName}</h4>
            <h4>Publish Year: ${publishYear}</h4>
        </div>
        `;
        parentDiv.appendChild(childDiv);
    });

    toggleSpinner("addSpinner", "none");
    toggleSpinner("totalResult", "block");
};


// scroll functionality
window.addEventListener("scroll", function () {
    let navbar = document.querySelector("#nav");
    let footer = document.querySelector("footer");
    if (window.pageYOffset > 60) {
        navbar.classList.add("bg-gray-800");
    } else {
        navbar.classList.remove("bg-gray-800");
    };

    if (window.pageYOffset > 450) {
        footer.classList.remove("md:mt-96");
        footer.classList.add("md:mt-10");
    } else {
        footer.classList.add("md:mt-96");
        footer.classList.remove("md:mt-10");
    };
});