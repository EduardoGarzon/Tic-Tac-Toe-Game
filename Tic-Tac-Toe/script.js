// Select de cada player.
let select_player_one = document.getElementById("select-simbol-player-one");
let select_player_two = document.getElementById("select-simbol-player-two");
let player_one_turn = false, player_two_turn = false, flag_start_game = false, flag_win = false;
// Divs do game board.
const divs = document.querySelectorAll('div[id^="div-square"]');
// p para o resultado.
const p_result = document.getElementById("p-result");
// div para o resultado.
const div_result = document.getElementById("div-result");

// Definindo Players.
select_player_one.addEventListener('change', function () {
    if (select_player_one.value === 'X') {
        select_player_one.style.backgroundColor = '#B00000';
        select_player_one.style.color = '#EEEFF1';
        select_player_one.style.borderColor = '#EEEFF1';
    } else {
        select_player_one.style.backgroundColor = '#0FB000';
        select_player_one.style.color = '#EEEFF1';
        select_player_one.style.borderColor = '#EEEFF1';
    }
});

select_player_two.addEventListener('change', function () {
    if (select_player_two.value === 'X') {
        select_player_two.style.backgroundColor = '#B00000';
        select_player_two.style.color = '#EEEFF1';
        select_player_two.style.borderColor = '#EEEFF1';
    } else {
        select_player_two.style.backgroundColor = '#0FB000';
        select_player_two.style.color = '#EEEFF1';
        select_player_two.style.borderColor = '#EEEFF1';
    }
});

// Definindo as interacoes sobre o Game Board.
divs.forEach(div => div.addEventListener('click', handleCellClick));

// Definindo botão Start.
document.getElementById("start-button").addEventListener('click', function () {
    resetGameBoard();

    if (select_player_one.value === "" || select_player_two.value === "") {
        alert("Selecione o símbolo de cada jogador.");
    } else if (select_player_one.value === select_player_two.value) {
        alert("Os símbolos devem ser diferentes para cada jogador!");
    } else if (select_player_one.value != "" && select_player_two.value != "") {
        alert("JOGADOR 1: " + select_player_one.value + " \n JOGADOR 2: " + select_player_two.value);
        player_one_turn = true;
        flag_start_game = true;
    } else {
        alert("Falha ao definir jogadores.");
    }
});



// Funcao para resetar o jogo.
function resetGameBoard() {
    divs.forEach(div => {
        div.textContent = '';
        div.classList.remove('player1_X', 'player1_O', 'player2_X', 'player2_O');
        div.style.borderColor = '#D6BE1F';
    });

    p_result.textContent = '';
    p_result.style.backgroundColor = '#141414';
    div_result.style.backgroundColor = '#141414';
    div_result.style.display = 'none';

    player_one_turn = false;
    player_two_turn = false;
    flag_start_game = false;
    flag_win = false;
}

// Funcao que define as interacoes do jogo no tabuleiro.
function handleCellClick(ev) {
    if (!flag_start_game || flag_win) return;

    const div = ev.currentTarget;

    if (div.textContent) return;

    const simbol = player_one_turn
        ? select_player_one.value
        : select_player_two.value;

    div.textContent = simbol;

    div.style.borderColor = '#EEEFF1';
    if (player_one_turn) {
        div.classList.add(simbol === 'X' ? 'player1_X' : 'player1_O');
    } else {
        div.classList.add(simbol === 'X' ? 'player2_X' : 'player2_O');
    }

    player_one_turn = !player_one_turn;
    player_two_turn = !player_two_turn;

    let player = simbol === select_player_one.value ? 'Player 1' : 'Player 2';

    flag_win = checkWin(simbol, player);

    if (flag_win) {
        p_result.textContent = player + ' VENCEU!';
        p_result.style.backgroundColor = simbol === 'X' ? '#B00000' : '#0FB000';
        div_result.style.backgroundColor = simbol === 'X' ? '#B00000' : '#0FB000';
        div_result.style.display = 'block';
    }
}

// Funcao que verifica vitória.
function checkWin(simbol, player) {
    // Horizontais
    if (divs[0].textContent === simbol && divs[1].textContent === simbol && divs[2].textContent === simbol) {
        return true;
    } else if (divs[3].textContent === simbol && divs[4].textContent === simbol && divs[5].textContent === simbol) {
        return true;
    } else if (divs[6].textContent === simbol && divs[7].textContent === simbol && divs[8].textContent === simbol) {
        return true;
    }

    // Verticais
    if (divs[0].textContent === simbol && divs[3].textContent === simbol && divs[6].textContent === simbol) {
        return true;
    } else if (divs[1].textContent === simbol && divs[4].textContent === simbol && divs[7].textContent === simbol) {
        return true;
    } else if (divs[2].textContent === simbol && divs[5].textContent === simbol && divs[8].textContent === simbol) {
        return true;
    }

    // Diagonais
    if (divs[0].textContent === simbol && divs[4].textContent === simbol && divs[8].textContent === simbol) {
        return true;
    } else if (divs[6].textContent === simbol && divs[4].textContent === simbol && divs[2].textContent === simbol) {
        return true;
    }

    // Verifica Empate.
    let flag_empate = true;
    divs.forEach(div => {
        if (div.textContent === "") {
            flag_empate = false;
        }
    });

    if (flag_empate) {
        p_result.textContent = 'DEU VELHA!';
        p_result.style.backgroundColor = '#D6BE1F';
        div_result.style.backgroundColor = '#D6BE1F';
        div_result.style.display = 'block';
    }
}