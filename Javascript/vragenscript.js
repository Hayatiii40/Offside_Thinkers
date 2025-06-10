const person = document.querySelector('#personInfo');
person.innerHTML = '<h1>Makers</h1>';

person.addEventListener('click', () => {
  if (person.textContent == 'Makers') {
    person.classList.add('open');
    vragenContainer.innerHTML = '<h1>Veelgestelde vragen</h1>';
    person.innerHTML = `
            <h1>Makers</h1>
            <ul>
                <img src="" alt="">
                <li><strong>Voornaam:</strong> Muhammed</li>
                <li><strong>Achternaam:</strong> Deniz</li>
                <li><strong>Leeftijd:</strong> 20</li>
            </ul>
            <ul>
                <img src="" alt="">
                <li><strong>Voornaam:</strong> Fatih</li>
                <li><strong>Achternaam:</strong> Kilic</li>
                <li><strong>Leeftijd:</strong> 20</li>
            </ul>
            <ul>
                <img src="" alt="">
                <li><strong>Voornaam:</strong> Hayati</li>   
                <li><strong>Achternaam:</strong> Sahin</li>
                <li><strong>Leeftijd:</strong> 20</li>
            </ul>
            <ul>
                <img src="" alt="">
                <li><strong>Voornaam:</strong> Dzhaner</li>
                <li><strong>Achternaam:</strong> Ahmed</li>
                <li><strong>Leeftijd:</strong> 21</li>
            </ul>
        

    `;
  } else {
    person.innerHTML = '<h1>Makers</h1>';
    person.classList.remove('open');
  }
});

let vragenContainer = document.querySelector('.container');

vragenContainer.addEventListener('click', () => {
  if (vragenContainer.textContent == 'Veelgestelde vragen') {
    vragenContainer.classList.add('open');
    /**/
    person.innerHTML = '<h1>Makers</h1>';
    /**/
    vragenContainer.innerHTML = `<h1>Veelgestelde vragen</h1>
        <ul>
                <li>
                    <div class="question">Hoe werkt het spel?</div>
                    <div class="answer">
                        Het spel toont vragen met vier antwoordopties. Kies het juiste antwoord om punten te verdienen.
                    </div>
                </li>
                <li>
                    <div class="question">Wat is het doel van de quiz?</div>
                    <div class="answer">
                        Het doel is om zoveel mogelijk vragen correct te beantwoorden en een hoge score te behalen.
                    </div>
                </li>
                <li>
                    <div class="question">Hoeveel vragen zijn er?</div>
                    <div class="answer">
                        Er zijn oneindig vragen in de quiz.
                    </div>
                </li>
                <li>
                    <div class="question">Hoelang duurt een ronde?</div>
                    <div class="answer">
                        Een ronde gaat door zolang je de juiste antwoorden geeft.
                    </div>
                </li>
                <li>
                    <div class="question">Op welke apparaten kan ik het spel spelen?</div>
                    <div class="answer">
                        Het spel is beschikbaar op web en mobiel.
                    </div>
                </li>
                
            </ul>`;
  } else {
    vragenContainer.classList.remove('open');
    vragenContainer.innerHTML = '<h1>Veelgestelde vragen</h1>';
  }
});

