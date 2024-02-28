const loadPhones = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones => {
    const productGallery = document.getElementById('product-gallery');
    let updatedProductGallery;
    phones.forEach(phone => {
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
}

loadPhones();