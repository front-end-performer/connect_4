(function () {
    var currentPlayer = 'player1';
    var column = $('.column');
    var allSlots = $('.slot');
    var circle = $('#box');
    var modal = $('#modal');
    var startWindow = $('#startWindow');
    var audio = $("#mysoundclip")[0];


    $(document).ready(function () {
        modal.hide();
        setTimeout(function () {
            startWindow.css({
                transform: 'translateX(200%)',
                opacity: '0',
                transition: 'all 2s'
            }).fadeIn(100);
        }, 2000);
    });

    var winningDiagonals = [
        [
            allSlots.eq(0),
            allSlots.eq(7),
            allSlots.eq(14),
            allSlots.eq(21)
        ],
        [
            allSlots.eq(1),
            allSlots.eq(8),
            allSlots.eq(15),
            allSlots.eq(22)
        ],
        [
            allSlots.eq(2),
            allSlots.eq(9),
            allSlots.eq(16),
            allSlots.eq(23)
        ],
        [
            allSlots.eq(8),
            allSlots.eq(3),
            allSlots.eq(13),
            allSlots.eq(18)
        ],
        [
            allSlots.eq(4),
            allSlots.eq(9),
            allSlots.eq(14),
            allSlots.eq(19)
        ],
        [
            allSlots.eq(5),
            allSlots.eq(10),
            allSlots.eq(15),
            allSlots.eq(20)
        ],
        [
            allSlots.eq(6),
            allSlots.eq(13),
            allSlots.eq(20),
            allSlots.eq(27)
        ],
        [
            allSlots.eq(7),
            allSlots.eq(14),
            allSlots.eq(21),
            allSlots.eq(28)
        ],
        [
            allSlots.eq(8),
            allSlots.eq(15),
            allSlots.eq(22),
            allSlots.eq(29)
        ],
        [
            allSlots.eq(9),
            allSlots.eq(14),
            allSlots.eq(19),
            allSlots.eq(24)
        ],
        [
            allSlots.eq(10),
            allSlots.eq(15),
            allSlots.eq(20),
            allSlots.eq(25)
        ],
        [
            allSlots.eq(11),
            allSlots.eq(16),
            allSlots.eq(21),
            allSlots.eq(26)
        ],
        [
            allSlots.eq(12),
            allSlots.eq(19),
            allSlots.eq(26),
            allSlots.eq(33)
        ],
        [
            allSlots.eq(13),
            allSlots.eq(20),
            allSlots.eq(27),
            allSlots.eq(34)
        ],
        [
            allSlots.eq(14),
            allSlots.eq(21),
            allSlots.eq(28),
            allSlots.eq(35)
        ],
        [
            allSlots.eq(15),
            allSlots.eq(20),
            allSlots.eq(25),
            allSlots.eq(30)
        ],
        [
            allSlots.eq(16),
            allSlots.eq(21),
            allSlots.eq(26),
            allSlots.eq(31)
        ],
        [
            allSlots.eq(17),
            allSlots.eq(22),
            allSlots.eq(27),
            allSlots.eq(32)
        ],
        [
            allSlots.eq(18),
            allSlots.eq(25),
            allSlots.eq(32),
            allSlots.eq(39)
        ],
        [
            allSlots.eq(19),
            allSlots.eq(26),
            allSlots.eq(33),
            allSlots.eq(40)
        ],
        [
            allSlots.eq(20),
            allSlots.eq(27),
            allSlots.eq(34),
            allSlots.eq(41)
        ],
        [
            allSlots.eq(21),
            allSlots.eq(26),
            allSlots.eq(31),
            allSlots.eq(36)
        ],
        [
            allSlots.eq(22),
            allSlots.eq(27),
            allSlots.eq(32),
            allSlots.eq(37)
        ],
        [
            allSlots.eq(23),
            allSlots.eq(28),
            allSlots.eq(33),
            allSlots.eq(38)
        ]
    ];

    column.on('click', beginGame);

    function beginGame(e) {
        var currentSlot = $(e.currentTarget); // targets curret element by click event
        var slotsInCol = currentSlot.find('.slot'); // finds list of items with class slot

        var foundAndEmptySlot = false;
        for (var i = 5; i >= 0; i--) { // this for loop find's lowest slot
            if (!slotsInCol.eq(i).hasClass('player1') && !slotsInCol.eq(i).hasClass('player2')) {
                foundAndEmptySlot = true;
                break; // i becomes the lowest index in the slot
            }
        }

        if (!foundAndEmptySlot) {
            return;
        }

        slotsInCol.eq(i).addClass(currentPlayer);

        if (slotsInCol.eq(i).hasClass(currentPlayer)) { // invokes click sound on every click event
            audio.play();
        }

        if (checkForVictory(slotsInCol)) { // calling function checkVictory with argument slots in column
            var str = '';
            if (slotsInCol.eq(i).hasClass('player1')) { // check if selected slots has a certain class
                str = '<p class="text_color__blue">' + 'Player 1 COl Won' + '</p>';
            } else {
                str = '<p class="text_color__red">' + 'Player 2 COl Won' + '</p>';
            }
            scaleBoard();
        } else if (checkForVictory($('.row' + i))) {
            if (slotsInCol.eq(i).hasClass('player1')) {
                str = '<p class="text_color__blue">' + 'Player 1 ROW Won' + '</p>';
            } else {
                str = '<p class="text_color__red">' + 'Player 2  ROW Won' + '</p>';
            }
            scaleBoard();
        } else if (checkDiagonal()) {
            if (slotsInCol.eq(i).hasClass('player1')) {
                str = '<p class="text_color__blue">' + 'Player 1 Diagonal Won' + '</p>';
            } else {
                str = '<p class="text_color__red">' + 'Player 2  Diagonal Won' + '</p>';
            }
            scaleBoard();
        }

        function scaleBoard() {
            var isScale = false;
            if (isScale) {
                return;
            } else {
                modal.show().html(str);
                setTimeout(function () {
                    column.addClass('scaleBoard');
                }, 100);
            }
        }
        switchPlayers();
    }

    function checkDiagonal() {
        for (var d = 0; d < winningDiagonals.length; d++) {
            if (winningDiagonals[d][0].hasClass(currentPlayer) &&
                winningDiagonals[d][1].hasClass(currentPlayer) &&
                winningDiagonals[d][2].hasClass(currentPlayer) &&
                winningDiagonals[d][3].hasClass(currentPlayer)) {
                $('.column').off();
                return true;
            }
        }
        return false;
    }

    //// checks vistory
    function checkForVictory(slots) {
        var counter = 0;

        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter == 4) {
                    $('.column').off();
                    return true; // reached 4 , won
                }
            } else {
                counter = 0;
            }
        }
    }

    function switchPlayers() { // changing players 
        if (currentPlayer == 'player1') {
            currentPlayer = 'player2';
            circle.css({
                backgroundColor: '#E9501A'
            });
        } else {
            currentPlayer = 'player1';
            circle.css({
                backgroundColor: '#30A8DF'
            });
        }
    }

    $(document).on('mousemove', function (e) {
        var newX = e.clientX - 2;
        var newY = e.clientY - 2;

        circle.css({
            left: newX + 10 + "px",
            top: newY + 10 + "px"
        });
    });

    modal.on('click', function () {
        $('div')
            .removeClass('player1')
            .removeClass('player2');
        column.removeClass('scaleBoard');
        modal.hide();
        column.on('click', beginGame);
    });
})();