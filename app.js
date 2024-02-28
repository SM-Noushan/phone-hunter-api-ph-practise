let counter = 0;
let phoneName = 'iphone';

const loadPhones = async (value) => {
    toggleLoadSpinner();
    phoneName = value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = phones => {
    // console.log(phones);
    const productGallery = document.getElementById('product-gallery');
    const loadMore = document.getElementById('load-more');
    productGallery.textContent = '';
    let phonesSliced;
    if (counter)
        phonesSliced = phones.slice(0, counter + 6);
    else
        phonesSliced = phones.slice(0, 6);

    counter += 6;
    if (phones.length > counter)
        loadMore.classList.remove('hidden');
    else
        loadMore.classList.add('hidden');
    phonesSliced.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card max-w-96 bg-base-100 border border-[#CFCFCF] p-8 rounded-lg`;
        phoneCard.innerHTML =
            `<figure class="p-10 rounded-lg bg-[#0D6EFD0D]">
                <img src="${phone.image}" alt="image-phone"
                    class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center space-y-2">
                <h2 class="card-title font-bold text-2xl">${phone.phone_name}</h2>
                <p class="opacity-60">There are many variations of passages of available, but the majority have
                    suffered</p>
                <p class="font-bold text-2xl">$999</p>
                <div class="card-actions">
                    <button
                        class="px-4 md:px-6 py-2 md:py-3 bg-color2 hover:bg-color2/90 rounded-xl font-semibold text-base md:text-xl text-white leading-normal">Show
                        Details</button>
                </div>
            </div>`;
        productGallery.appendChild(phoneCard);
    });
    toggleLoadSpinner();
}
const toggleLoadSpinner = () => {
    const loadData = document.getElementById('loading-data');
    loadData.classList.toggle('hidden');
}
const handleSearch = () => {
    const searchValue = document.getElementById('input-search').value;
    counter = 0;
    loadPhones(searchValue);
}
const loadMoreData = () => {
    loadPhones(phoneName);
}

// loadMoreData(phoneName);
loadPhones(phoneName);