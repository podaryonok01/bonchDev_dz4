/* 
переписать код, который получает данные с Марса с помощью синтаксиса async/await. При этом искусственную задержку менять нельзя.
Сделать простую страницу (оформить, по желанию), куда выводить полученные данные в виде карточек. Показывать состояние загрузки
(показывать вместо карточек при загрузке лоадер или сообщение). Обработать потенциальные ошибки (вывести сообщение на страницу если
есть ошибка). Также в каждой карточке добавить кнопку, при нажатии на которую в консоль, с помощью оператора Rest и деструктуризации
выводится объект, который состоит из полей date и otherData, где otherData - все оставшиеся данные полученного ранее объекта
(делаем простую имитацию отправки данных на сервер с нужной структурой).
*/

const dataFromMars = [
    {
        date: '1 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    },
    {
        date: '2 июля 2020 г.',
        temperature: '-69,6 ° F',
        windspeed: '10 миль/ч',
        pressure: '765  ПА',
    },
]

const cards = document.querySelector('.cards');

const delay = ms => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function postData(data) {

    try{
        loadingElem = loading();

        await delay(1500);
        dataFromMars.push(data);

        await delay(1000);

        loadingElem.remove();

        const h1 = document.createElement('h1');
        h1.innerText = 'Данные с Марса получены:'
        document.body.prepend(h1);

        dataFromMars.forEach((dataFromMars) => {
            createCard(dataFromMars);
        })
    } catch (error) {
        console.log('=ERROR=', error);
        alert(`При загрузки данных с сервера произошла ошибка ERROR: ${error}`);
    }
    
}

function loading() {
    const div = document.createElement('div');
    div.classList.add('modal');
    document.body.append(div);
    return div
}

function createCard(dataFromMars) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <p>${dataFromMars.date}</p>
    <p>${dataFromMars.temperature}</p>
    <p>${dataFromMars.windspeed}</p>
    <p>${dataFromMars.pressure}</p>
    `;

    const btn = document.createElement('button');
    btn.innerText = 'Вывести данные в консоль';
    btn.classList.add('btn');
    card.append(btn);

    cards.append(card);

    btn.addEventListener('click', () => consoleData({...dataFromMars}));
}

function consoleData({date, ...otherData}){
    const obj = {
        date,
        otherData
    }
    console.log(obj);
}

postData(
    {
        date: '3 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    }
)