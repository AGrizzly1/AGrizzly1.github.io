let names = ["AGrizzly1", "Fizzy Friday", "Master Bates", "AfterDeath"]

let gameCount = 0;

class game {
    constructor() {

    }
}

let placing = [
    [], // AGrizzly1's Placement
    [], // Fizzy Friday's Placement
    [], // Master Bates's Placement
    []  // AfterDeath's Placement
];

function ShowLastGames() {
    console.log("Last three games:");
    
    let currentGame = 0

    for (i = gameCount - 3; i < gameCount; i++) {
        for (j = 0; j < placing.length; j++) {
            lastThreeGames[currentGame].push({ 'name': names[j], 'placement': placing[j][i] });
        }
        lastThreeGames[currentGame] = lastThreeGames[currentGame].sort((a, b) => {
            return a.placement - b.placement;
        });

        currentGame++;
    }

    for (i = 0; i < lastThreeGames.length; i++) {
        let div = document.createElement('div');
        div.className = "game-info";
        lastGames.appendChild(div);
        div.innerHTML = `
            <h3>Game ${(gameCount-2)+i}</h3>
            <p>${lastThreeGames[i][0].placement}. ${lastThreeGames[i][0].name}</p>
            <p>${lastThreeGames[i][1].placement}. ${lastThreeGames[i][1].name}</p>
            <p>${lastThreeGames[i][2].placement}. ${lastThreeGames[i][2].name}</p>
            <p>${lastThreeGames[i][3].placement}. ${lastThreeGames[i][3].name}</p>
        `;
    }

    console.log(lastThreeGames);
}

function SortPlayers() {
    let masterList = [];

    for (i = 0; i < placing.length; i++) {
        let points = 0
        let wins = 0
        let average = 0
        let standardDeviationTop = 0;
        let standardDeviation = 0;

        for (j = 0; j < placing[i].length; j++) {
            let place = placing[i][j];

            average += place;
            points += 4 - place;

            if (place == 1) {
                wins++;
            }
        }

        average /= placing[i].length;

        for (j = 0; j < placing[i].length; j++) {
            let place = placing[i][j];
            standardDeviationTop += (place - average) ** 2;
        }

        standardDeviation = Math.sqrt(standardDeviationTop / gameCount);

        masterList.push({ 'name': names[i], 'wins': wins, 'points': points, 'average': average, 'standard deviation': standardDeviation });
    }

    masterList = masterList.sort((a, b) => {
        return b.points - a.points;
    });

    let place = 1;

    for (i = 0; i < masterList.length; i++) {
        masterList[i].place = place;

        if (i + 1 >= masterList.length) {
            continue;
        }
        if (masterList[i].points == masterList[i+1].points) {
            continue;
        }

        place++;
    }

    return masterList
}

function UpdateLeaderboard() {

    for (i = 0; i < masterList.length; i++) {
        table[0][i].textContent = masterList[i].place;
        table[1][i].textContent = masterList[i].name;
        table[2][i].textContent = masterList[i].points;
        table[3][i].textContent = masterList[i].wins;

        if (masterList[i].average > 0) {
            table[4][i].textContent = (masterList[i].average).toFixed(2);
        } else {
            table[4][i].textContent = "None";
        }
    }
}

function AddGame(place1,place2,place3,place4) {
    placing[0][gameCount] = place1;
    placing[1][gameCount] = place2;
    placing[2][gameCount] = place3;
    placing[3][gameCount] = place4;
    gameCount++;
}

// Add Games Here
AddGame(1,2,3,4);
AddGame(3,1,2,4);
AddGame(1,2,4,3);

let lastThreeGames = [
    [],
    [],
    []
];

let table = [
    [firstPosition, secondPosition, thirdPosition, fourthPosition],
    [firstName, secondName, thirdName, fourthName],
    [firstPoints, secondPoints, thirdPoints, fourthPoints],
    [firstWins, secondWins, thirdWins, fourthWins],
    [firstAvg, secondAvg, thirdAvg, fourthAvg]
]

let masterList = SortPlayers();

console.log(masterList);

numGames.textContent = gameCount + (gameCount == 1 ? " game" : " games");

if (gameCount > 0) {
    winners = [];
    for (i = 0; i < masterList.length; i++) {
        if (masterList[i].place == 1) {
            winners.push(masterList[i].name);
        }
    }

    if (winners.length == 1) {
        curLeader.textContent = winners[0];
    }

    if (winners.length >= 2) {
        for (i = 0; i < winners.length; i++) {
            curLeader.textContent += winners[i];

            if (i == winners.length - 2) {
                if (winners.length == 2) {
                    curLeader.textContent += " and ";
                } else {
                    curLeader.textContent += ", and ";
                }
            } else if (i < winners.length - 2) {
                curLeader.textContent += ", ";
            }
        }
    }
} else {
    curLeader.textContent = "nobody";
}

UpdateLeaderboard();

document.getElementById("last-three-games-text").style.display = "none";

if (gameCount >= 3) {
    document.getElementById("last-three-games-text").style.display = "block";
    ShowLastGames();
}