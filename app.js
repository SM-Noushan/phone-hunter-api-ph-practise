// global variable
let counter = 0; //keeping count of how many data has been loaded
let phoneName = 'iphone'; //storing tha name of loaded phone 

// data loading spinner
const toggleLoadSpinner = () => {
    const loadData = document.getElementById('loading-data');
    loadData.classList.toggle('hidden');
}

// display phones
const displayPhone = phones => {
    // console.log(phones);
    const productGallery = document.getElementById('product-gallery');
    const loadMore = document.getElementById('load-more');
    const errorAlert = document.getElementById('error-alert');
    productGallery.textContent = '';
    if (!phones.length) {
        loadMore.classList.add('hidden');
        errorAlert.classList.remove('hidden');
        toggleLoadSpinner();
        return;
    }
    errorAlert.classList.add('hidden');
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
                    <button onclick="handleShowDetails('${phone.slug}')"
                        class="px-4 md:px-6 py-2 md:py-3 bg-color2 hover:bg-color2/90 rounded-xl font-semibold text-base md:text-xl text-white leading-normal">Show
                        Details</button>
                </div>
            </div>`;
        productGallery.appendChild(phoneCard);
    });
    toggleLoadSpinner();
}

// load phones data via api
const loadPhones = async (value) => {
    toggleLoadSpinner();
    phoneName = value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

// search your phone
const handleSearch = () => {
    const searchValue = document.getElementById('input-search').value;
    counter = 0;
    loadPhones(searchValue);
}

// display phone details in a modal
const displayPhoneDetails = phoneDetails => {
    const phoneDetailsBox = document.getElementById('phone-details');
    phoneDetailsBox.textContent = '';
    const phoneDetailsBoxItems = document.createElement('div');
    phoneDetailsBoxItems.classList = 'card glass text-center';
    const sensorsArr = phoneDetails.mainFeatures?.sensors || null;
    let sensors = '';
    if (!!sensorsArr)
        sensorsArr.forEach(sensor => {
            sensors = sensors + ', ' + sensor;
        });
    phoneDetailsBoxItems.innerHTML =
        `<figure class="rounded-lg"><img class="" src="${phoneDetails.image}"
            alt="phone-img" />
        </figure>
        <div class="card-body text-left">
            <h2 class="card-title">${phoneDetails.name || 'No Data Found'} (${phoneDetails.brand || 'No Data Found'})</h2>
            <p class="font-semibold">Storage: <span class="font-normal">${phoneDetails.mainFeatures?.storage || 'No Data Found'}</span></p>
            <p class="font-semibold">Display Size: <span class="font-normal">${phoneDetails.mainFeatures?.displaySize || 'No Data Found'}</span>
            </p>
            <p class="font-semibold">Chipset: <span class="font-normal">${phoneDetails.mainFeatures?.chipSet || 'No Data Found'}</span></p>
            <p class="font-semibold">Memory: <span class="font-normal">${phoneDetails.mainFeatures?.memory || 'No Data Found'}</span></p>
            <p class="font-semibold">Sensors: <span class="font-normal">${sensors ? sensors : 'No Data Found'}</span></p >
            <p class="font-semibold">Release Date: <span class="font-normal">${phoneDetails.releaseDate || 'No Data Found'}</span>
            </p>
            <p class="font-semibold">GPS: <span class="font-normal">${phoneDetails?.others?.GPS || 'No Data Found'}</span></p>
        </div > `;
    phoneDetailsBox.appendChild(phoneDetailsBoxItems);
    myModal.showModal();
    modal_content.scrollTop = 0;
}

// load specific phone details
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    // console.log(phoneDetails);
    displayPhoneDetails(phoneDetails);
}

// load more phones data
const loadMoreData = () => {
    loadPhones(phoneName);
}

// default loaded phones data
loadPhones(phoneName);