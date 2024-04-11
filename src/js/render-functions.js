const gallery = document.querySelector('.gallery');

  export function createGalleryItem(image) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');

    const imageLink = document.createElement('a');
    imageLink.classList.add('gallery-link');
    imageLink.href = image.largeImageURL;

    const img = document.createElement('img');
    img.classList.add('gallery-image');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const likes = createStats('Likes', image.likes);
    const views = createStats('Views', image.views);
    const comments = createStats('Comments', image.comments);
    const downloads = createStats('Downloads', image.downloads);

    const mainListGallery = document.createElement('div');
    mainListGallery.classList.add('gallery-main');
    mainListGallery.appendChild(likes);
    mainListGallery.appendChild(views);
    mainListGallery.appendChild(comments);
    mainListGallery.appendChild(downloads);
    

    imageLink.appendChild(img);
    galleryItem.appendChild(imageLink);
    galleryItem.appendChild(mainListGallery);
    

    return galleryItem;
}

export function clearGallery() {
    gallery.innerHTML = '';
}

function createStats(name, value) {
    const listGallery = document.createElement('div');
    listGallery.classList.add('gallery-list');

    const listItem  = document.createElement('h3');
    listItem.classList.add('gallery-name');
    listItem.textContent = name;

    const listNumb  = document.createElement('div');
    listNumb.classList.add('gallery-numb');
    listNumb.textContent = value;

    listGallery.appendChild(listItem);
    listGallery.appendChild(listNumb);

    return listGallery;
}


