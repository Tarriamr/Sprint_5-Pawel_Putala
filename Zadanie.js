/*Zadanie 1
    Treść zadania:
Napisz funkcję przetwarzającą tablicę obiektów osób. Funkcja powinna generować pseudonim na podstawie określonych
zasad i dodawać go do każdego obiektu osoby, gdy jest to możliwe.
Nie nadpisuj danych wejściowych.
    Wytyczne:
Pobierz trzy ostatnie litery imienia, odwróć ich kolejność i zapisz wynik
Weź pierwsze trzy litery nazwiska, odwróć ich kolejność i dodaj to do wyniku z poprzedniego punktu
Sformatuj połączony wynik tak, aby pseudonim zaczynał się od wielkiej litery, a reszta liter była mała.
Dodaj ten pseudonim jako nową właściwość do obiektu osoby.
Jeśli firstName lub lastName ma mniej niż trzy znaki (pomiń znaki białe) lub nie jest typu string,
nie dodawaj właściwości pseudonimu dla tej osoby.*/

const people = [
    {firstName: false, lastName: 2,},
    {firstName: "Roman", lastName: "Kowalski",},
    {firstName: "Halina", lastName: "Malina",},
    {firstName: "B", lastName: "22",},
    {firstName: "Jan", lastName: "Nowak",},
    {firstName: "Kamil", lastName: null,},
];

function alias(people) {
    return people
        .map(person => {
            if (!Object.values(person).map(element => {
                return typeof element === `string` && element.trim().length >= 3
            }).includes(false)) {
                return {
                    ...person, nickname: nickname(person)
                }
            } else {
                return {
                    ...person
                }
            }
        })
}

function nickname(person) {
    return Object.values(person).reduce((nickname, currentValue, index) => {

        function stringReverse(text) {
            return text.split(``).reverse().join(``);
        }

        let element = ``;

        currentValue = currentValue.trim().toLowerCase();

        if (index === 0) currentValue = stringReverse(currentValue);

        for (let i = 0; i < 3; i++) {
            if (i === 0 && nickname === ``) {
                element = `${element}${currentValue[i].toUpperCase()}`
            } else {
                element = `${element}${currentValue[i]}`
            }
        }

        if (index === 1) element = stringReverse(element);

        return `${nickname}${element}`;
    }, ``);
}

/*
Zadanie 2
    Treść zadania:
Stwórz funkcję, która przetworzy tablicę osób z pierwszego zadania (Należy wykorzystać wynik wywołania funkcji
z pierwszego zadania), zwracając tylko osoby, które mają przypisany pseudonim oraz dodając nowe pole age do każdej osoby.
    Wytyczne:
Filtruj tablicę, aby zawierała tylko osoby z pseudonimem.
Oblicz liczbę liter w imieniu i nazwisku każdej osoby.
Jeśli suma liter jest parzysta, przypisz ją jako age. Jeśli nieparzysta, age oblicz jako sumę liter
w kluczach firstName , lastName i nickname pobieranych dynamicznie podzieloną przez indeks osoby w tablicy
(jeżeli index wynosi 0 zastąp go 1). Użyj odpowiedniej metody do wyciagnięcia kluczy z obiektu oraz reduce
w notacji łańcuchowej do zliczenia liter w kluczach.
Dodaj pole age do każdego obiektu osoby.
Zadbaj o to by wiek był zaokrąglony w górę (odszukaj potrzebnej informacji w internecie).*/

function peopleFilter(people) {
    return people.filter(person => person.nickname)
}

function numberOfLetters(person, personIndex) {
    const firstAge = Object.values(person).reduce((number, element, index) => {
        if (index < 2) {
            return number + element.toString().length
        } else {
            return number
        }
    }, 0)
    if (firstAge % 2 === 0) {
        return firstAge;
    } else {
        return Math.ceil(Object.keys(person).reduce((number, element) => {
            return number + element.toString().length
        }, 0) / (personIndex === 0 ? 1 : personIndex))
    }
}

const peopleWithAge = peopleFilter(alias(people)).map((person, index) => {
    return {
        ...person, age: numberOfLetters(person, index)
    }
})

/*Zadanie 3
    Treść zadania:
Stwórz funkcję, która analizuje tablicę osób z drugiego zadania i znajduje najczęściej występującą literę
w polach firstName, lastName oraz nickname dla każdej osoby. Wynik powinien zawierać literę i jej liczbę wystąpień,
a także określić, co zrobić w przypadku, gdy dwie litery mają tę samą liczbę wystąpień.
    Wytyczne:
Przetwarzaj każdy obiekt osoby, analizując pola firstName, lastName, i nickname.
Zliczaj wystąpienia każdej litery w tych polach i znajdź najczęściej występującą literę.
Jeżeli dwie lub więcej liter mają tę samą liczbę wystąpień i jest to najwyższa wartość, wybierz literę,
która występuje pierwsza w alfabecie.
Zwróć nową tablicę z obiektami, które zawierają imię, nazwisko, pseudonim oraz dodaj nową właściwość do każdej osoby
o nazwie mostCommonLetter, której wartością będzie obiekt z kluczem litery oraz ilością jej wystąpień.*/

function letterCounter(person) {
    const letters = {};
    Object.values(person).forEach(element => {
        if (typeof element === `string`) {
            element.trim().toLowerCase().split(``).forEach(letter => {
                if (letters.hasOwnProperty(letter)) {
                    letters[letter.at(0)]++
                } else {
                    letters[letter] = 1
                }
                return letters;
            })
        }
    })

    const sort = Object
        .entries(letters)
        .sort((a, b) => b[1] - a[1])
        .reduce((result, next) => {
            if (result[1] > next[1]) {
                return result
            } else if (result[1] === next[1]) {
                if (result[0].charCodeAt(0) - next[0].charCodeAt(0) > 0) {
                    return next
                } else {
                    return result
                }
            }
        })

    return {letter: sort[0], count: sort[1]};
}

const peopleWithLetters = peopleWithAge.map((person) => {
    return {
        ...person, mostCommonLetter: letterCounter(person)
    }
})
