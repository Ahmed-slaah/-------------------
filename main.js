

/* start nav change*/
let fixedNav = document.querySelector('.header');
window.addEventListener('scroll', () => {
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
})
/* end nav change*/

/*start explore*/
let exploreBtn = document.querySelector('.main .btn');
let hadithsection = document.querySelector('.hadith');

exploreBtn.addEventListener('click',()=>{
    hadithsection.scrollIntoView({
        behavior:"smooth"
    })
})
/*end explore*/


/* start hadith change */
let hadethContainer = document.querySelector('.hadith-container'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
let hadithIndex = 0;
hadithChanger();
function hadithChanger() {
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
        .then(response => response.json())
        .then(data => {
            let allHadiths = data.data.hadiths;
            changeHadith();
            next.addEventListener('click', () => {
                if (hadithIndex == 299) {
                    hadithIndex = 0;
                } else {
                    hadithIndex++;
                }
                changeHadith()
            })
            prev.addEventListener('click', () => {
                if (hadithIndex == 0) {
                    hadithIndex = 299;
                } else {
                    hadithIndex--;
                }
                changeHadith();
            })
            function changeHadith() {
                hadethContainer.innerText = allHadiths[hadithIndex].arab
                number.innerText = `300 / ${hadithIndex + 1}`;
            }
        })
}
/* end hadith change */

/* start quraan data */
let surahscontainer = document.querySelector('.surahscontainer')
let ayahcontainer = document.querySelector('.surahscontainer')
quranData();
function quranData (){
    fetch('http://api.alquran.cloud/v1/meta')
    .then(response=>response.json())
    .then(data=>{
        let surahs = data.data.surahs.references ;
        let numberOfSurahs = 114 ;
        for(let i = 0 ; i< 114;i++){
            surahscontainer.innerHTML +=
            `
            <div class="surah">
                <p class="arabic-name">${surahs[i].name}</p>
                <p class="english-name">${surahs[i].englishName}</p>
            </div>
            `
        }
        let surahsTitles = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            ayatContainer = document.querySelector('.ayat');
        surahsTitles.forEach((title,index)=>{
                title.addEventListener('click',()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index+1}`)
                .then(responsee=>responsee.json())
                .then(data=>{
                    ayatContainer.innerHTML ="";
                    let ayat = data.data.ayahs;                    
                    ayat.forEach(aya=>{
                        popup.classList.add('active');
                        ayatContainer.innerHTML+=
                        `
                        <P>${aya.text} <span>~((${aya.numberInSurah}))~</span></P>
                        
                        `
                    })
                   
                })

                })
            })
    })
}

let popup = document.querySelector('.surah-popup'),
    close = document.querySelector('.close')
close.addEventListener('click',()=>{
    popup.classList.remove('active');
})

/*end quraan data*/
/*start pray time*/
let praytime = document.querySelector('.pray-time'),
    prayname = document.querySelector('.pray-name'),
    cards = document.querySelector('.time-cards');
getPrayData();
function getPrayData(){
    fetch('http://api.aladhan.com/v1/timingsByCity?city=Mansoura&country=Egypt&method=8')
    .then(response=>response.json())
    .then(data=>{
       let times = data.data.timings
       cards.innerHTML="";
       for(let time in times){
        cards.innerHTML+=
        `
        <div class="card">
            <div class="circle">
                <svg>
                    <circle cx="100" cy="100" r="100"></circle>
                </svg>
                <div class="pray-time">${times[time]}</div>
            </div>
            <p class="pray-name">${time}</p>
        </div>
        `

       }
    })
}

