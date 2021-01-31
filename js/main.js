const citiesInformation =
    `29,45,Николаев,494922
43,19,Мариуполь,458533
23,11,Львов,729038
10,45,Киев,2868702


34,54,Одесса,1017022
#менше 1млн.

55,67,Донецк,949825
34,71,Запорожье,766268

34,55,Днепр,993094
35, 56,Севастополь,344853

88,97,Макеевка,351820
#больше 1млн.

66,74,Луганск,424113
5,78,Харьков,1451132
11,45,Симферополь,338319
`

const text = `Львов, город с богатой историей, расположенный на западе Украины, был основан в XIII в. 
и с тех пор много раз менял флаг: он принадлежал Польше, Австро-Венгрии и Советской империи. Во Львов 
организовано много городских праздников, таких как праздники кофе и шоколада, праздник сыра и вина, ежегодный день хлеба и другие. Харьков является одним из 
крупнейших городов Украины, а также областным центром Харьковской области. `


console.log(textAnalizer(citiesInformation)(text));

function textAnalizer(citiesInformation) {
    const arrayOfStrings = citiesInformation.split('\n')
        .filter(function (val) {
            return !(val === "" || val.indexOf("#") > -1)
        })
        .map(function (currentValue) {
            let container = ["x", "y", "name", "population"];
            return currentValue.split(',')
                .reduce(function (result, field, index) {
                        result[container[index]] = field;
                        return result;
                    }
                    , {})
        })
        .sort(function (a, b) {
            return b.population - a.population;
        })
        .slice(0, 10)
        .reduce((obj, current, index) => {
                const city = current.name;
                obj[city] = {population: current.population, rating: index};
                return obj;
            }
            , {});

    return (text) => {
        Object.keys(arrayOfStrings).forEach(function (cityName) {
            if (text.search(cityName) > -1) {
                text = text.replaceAll(cityName, (cityName + " (" + arrayOfStrings[cityName].rating + " место в ТОП-10 " +
                    "самых крупных городов Украины, население " +
                    arrayOfStrings[cityName].population + " человек" + " )"));
            }
        })
        return text;
    }
}




