const loadAIData = async (isShowAll) => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    // console.log(data.data);
    displayAIData(data.data.tools, isShowAll);
    // showAllBtn(data.data.tools)
}

const displayAIData = (aiData, isShowAll) => {
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerText = '';
    console.log(aiData.length);
    // const defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png'
    const showAllBtn = document.getElementById('show-all-btn');
    if (aiData.length > 6 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }
    if (!isShowAll) {
        aiData = aiData.slice(0, 6);
    }

    aiData.forEach(data => {
        const { id, image, name, published_in, features } = data;
        const div = document.createElement('div');
        // console.log(id);
        div.innerHTML = `
        <div onclick="loadAIDetails('${id}')" class="card card-compact bg-base-100 shadow-xl p-5">
        <figure><img
        src="${image || `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png`}"
        class="h-40 w-full" alt="Image not found" /></figure>
            <ul id="featured-list" class="list-decimal">
            <h3 class="text-2xl font-bold">Features:</h3>
            ${features.map(item => `<li class="ml-5">${item}</li>`).join('')}
            </ul>
            <div class="flex justify-between mt-5 items-center">
                <div class="grid gap-1">
                    <h2 class="card-title">${name}</h2>
                    <div class="flex gap-2 items-center">
                        <i class="fa-regular fa-calendar-days"></i>
                        <p>${published_in}</p>
                    </div>
                </div>
                <div class="">
                    <button class="hover:bg-orange-600 rounded-lg p-2 hover:text-white"><i class="fa-solid fa-arrow-right "></i></button>
                </div>
            </div>
        </div>
        `;
        aiContainer.appendChild(div);
    })

}

const loadAIDetails = async(id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await response.json();
    // displayAIData(data.data);
    // console.log(data.data);
    
    displayData(data.data)
}

const displayData = data => {
    console.log(data);
}
// const displayAIDetails = (aiData) =>{
//     console.log(aiData);
// }

const showAllBtn = (data) => {
    loadAIData(true)
}
loadAIData();