let puanText = document.getElementById('puanText');
puan = 0;

puanText.innerHTML = "0"
const body = document.querySelector('body');
const root = document.querySelector('#root');
const oyunCerceve = document.querySelector('#oyun-cerceve');

const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let randomNum = function () {
    let randomArray = [];
    for (let i = 0; i < 4; i++) {
        // 1 ile 99 (ikisi dahil) arasında olan sayılardan 4'unu rastgele bir şekilde seçer
            let randomNumbers = getRndInteger(1, 100);
            randomArray.push(randomNumbers, randomNumbers);
    } 
    // randomArray'deki çiftler her zaman yan yanadır. Aşağıdaki sort metodu randomArray elemanlarının yerlerini karıştırır.
    return randomArray.sort(() => Math.random() - 0.5);

};

/*
Görev 2: Bu numaraları 1-99 arası(1 ve 99 dahil) sayılardan 
rastgele 4 çift oluşturacak şekilde üreten bir fonksiyon yazarak, kod bloğundaki array değerini bu
 fonksiyondan dönen array ile değiştiren kodları yazın
*/


function renderCards() {
    const fotoNumaralari = randomNum(8);
    for (fotoNumara of fotoNumaralari) {
        const yenikart = document.createElement("div");
        yenikart.innerHTML = kartTemplate;
        yenikart.classList.add("kart");
        yenikart.querySelector(".kart-arkayuz img").src = `https://lipsum.app/id/${fotoNumara}/100x100`;
        oyunCerceve.append(yenikart);

        //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
        yenikart.addEventListener("click", kartTiklama);
    }
}

renderCards();


function kartTiklama(olay) {
        //Tıklanan kartı seçilen olarak değişkene atayalım
        const secilenKart = olay.currentTarget;

        //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
        if (secilenKart.classList.contains("eslesti") === true) {
            return;
        }

        //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
        if (secilenKart.classList.contains("acik") === true) {
            return;
        }

        //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
        const tumAcikKartlar = document.querySelectorAll(".acik");
        if (tumAcikKartlar.length === 2) {
            return;
        }

        //Açık olan kart varsa seçelim.
        const acikKart = document.querySelector(".acik");

        //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
        if (acikKart === null) {
            secilenKart.classList.add("acik");

            setTimeout(
                () => {
                    secilenKart.classList.remove("acik");
                }, 1500
            );
            return;
        }

        //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
        secilenKart.classList.add("acik");

        //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
        const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
        const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

        if (acikKartImg.src === secilenKartImg.src) {
            //İki açık kart arasında eşleşme var.
            acikKart.classList.add("eslesti");
            secilenKart.classList.add("eslesti");

            puan++;

            console.log(puan);

            puanText.innerHTML = puan;

            /*
                    Görev 1: Kullanıcı 4 kartı da eşleştirdiğinde sayfa ortasında beliren hareketli gif dosyası
                    formatında bir kutlama görseli belirsin ve bu fotoğraf 5 saniye sonra ortadan kaybolsun.
                */


            acikKart.classList.remove("acik");
            secilenKart.classList.remove("acik");

            setTimeout(() => {
                acikKart.removeEventListener("click", kartTiklama);
                secilenKart.removeEventListener("click", kartTiklama);
            }, 1000);
        } else {
            //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
            setTimeout(() => {
                acikKart.classList.remove("acik");
                secilenKart.classList.remove("acik");
            }, 1500);
        }
        
        if (puan === 4) {
            root.style.display = 'none';
    
            let congratsImg = document.createElement('img');
            congratsImg.src = 'congrats-1.gif';
            body.append(congratsImg);
    
            setTimeout(() => {
                root.style.display = 'block';
                congratsImg.remove();
                restartGame();
            }, 5000)
       
    }
}
function restartGame() {
    oyunCerceve.innerHTML = '';
    renderCards();
    puan = 0;
    puanText.innerText = 0;
}