$(document).ready(function () {

    //FUNCTIONS
    var p = 0;
    var k = parseInt($("#sizeUser").val());
    var speed = 0;
    var gene = 0;
    var regNum = new RegExp("[0-1]{1,}")
    var time;

    //CREATE BOARD
    function createBoard() {

        clearInterval(time);
        var board = "<table>";
        p = 0;
        k = parseInt($("#sizeUser").val());
        speed = 0;
        gene = 0;
        $("#generation").val(gene);

        for (var i = 0; i < k; i++) {

            board += "<tr>";

            for (var j = 0; j < k; j++) {

                board += "<td class= \"0\" id=\"" + p + "\"></td>";
                p++;
            }

            board += "</tr>";
        }

        board += "</table>";

        $("#game").html(board);
    }

    createBoard();

    //MAKE PATTERN BY HAND
    $("td").click(function () {

        if ($(this).hasClass("life")) {

            $(this).removeClass("life");
            $(this).removeClass("1");
            $(this).addClass("0");
        } else {

            $(this).addClass("life");
            $(this).removeClass("0");
            $(this).addClass("1");
        }
    });

    
    //LAUNCH GAME
    function play() {

        gene++;
        for (var i = 0; i <= p; i++) {

            var n1 = ($("#" + (i - k - 1)).attr("class"));
            if (n1 === undefined || i % k == 0) {

                n1 = 0;
            } else {

                n1 = parseInt(n1.match(regNum)[0]);
            }

            var n2 = $("#" + (i - k)).attr("class");
            if (n2 === undefined) {

                n2 = 0;
            } else {

                n2 = parseInt(n2.match(regNum)[0]);
            }

            var n3 = $("#" + (i - k + 1)).attr("class");
            if (n3 === undefined || (i + 1) % k == 0) {

                n3 = 0;
            } else {

                n3 = parseInt(n3.match(regNum)[0]);
            }

            var n4 = $("#" + (i - 1)).attr("class");
            if (n4 === undefined || i % k == 0) {

                n4 = 0;
            } else {

                n4 = parseInt(n4.match(regNum)[0]);
            }

            var n5 = $("#" + i).attr("class");
            if (n5 === undefined) {

                n5 = 0;
            } else {

                n5 = parseInt(n5.match(regNum)[0]);
            }
            
            var n6 = $("#" + (i + 1)).attr("class");
            if (n6 === undefined || (i + 1) % k == 0) {

                n6 = 0;
            } else {

                n6 = parseInt(n6.match(regNum)[0]);
            }

            var n7 = $("#" + (i + k - 1)).attr("class");
            if (n7 === undefined || i % k == 0) {

                n7 = 0;
            } else {

                n7 = parseInt(n7.match(regNum)[0]);
            }

            var n8 = $("#" + (i + k)).attr("class");
            if (n8 === undefined) {

                n8 = 0;
            } else {

                n8 = parseInt(n8.match(regNum)[0]);
            }

            var n9 = $("#" + (i + k + 1)).attr("class");
            if (n9 === undefined || (i + 1) % k == 0) {

                n9 = 0;
            } else {

                n9 = parseInt(n9.match(regNum)[0]);
            }

            var result = n1 + n2 + n3 + n4 + n6 + n7 + n8 + n9;

            if ((result === 3 && n5 === 0) || (result == 2 && n5 == 1) || (result == 3 && n5 == 1)) {

                $("#" + i).addClass("a");
            } else if ((result < 2 || result > 3) && n5 === 1) {

                $("#" + i).addClass("b");
            }

        }

        for (var i = 0; i <= p; i++) {

            if ($("#" + i).hasClass("a")) {

                $("#" + i).removeClass("a");
                $("#" + i).addClass("life");
                $("#" + i).removeClass("0");
                $("#" + i).addClass("1");
            } else if ($("#" + i).hasClass("b")) {

                $("#" + i).removeClass("b");
                $("#" + i).removeClass("life");
                $("#" + i).addClass("0");
                $("#" + i).removeClass("1");
            }
        }

        $("#generation").val(gene);
    }




    //CLICK FUNCTION
    $("#play").click(function () {

        if (speed != 0) {

        } else {

            speed = parseInt($("#vitesse").val());
            time = setInterval(play, speed);
        }

    });


    $("#pause").click(function () {

        clearInterval(time);
        speed = 0;
    });

    $("#next").click(function () {

        if (speed != 0) {

        } else {

            play();
        }
    });

    $("#random").click(function () {

        if (speed != 0) {

        } else {
            speed = 0;
            gene = 0;

            for (var r = 0; r < p; r++) {

                $("#" + r).removeClass("0");
                $("#" + r).removeClass("1");
                $("#" + r).removeClass("life");

                var rand = (Math.round(Math.random())).toString();

                $("#" + r).addClass(rand);

                if ($("#" + r).attr("class") == "1") {

                    $("#" + r).addClass("life");
                }
            }
        }
    });

    $("#symetry").click(function () {

        if (speed != 0) {

        } else {

            speed = 0;
            gene = 0;
            var ligne = 0;
            for (var s = 0; s < (p / 2); s++) {

                if (s % k == 0) { ligne++ }

                speed = 0;
                $("#" + s).removeClass("0");
                $("#" + s).removeClass("1");
                $("#" + s).removeClass("life");

                var rand = (Math.round(Math.random())).toString();

                $("#" + s).addClass(rand);

                if ($("#" + s).attr("class") == "1") {

                    $("#" + s).addClass("life");
                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).removeClass("0");
                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).addClass("1");
                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).addClass("life");

                } else if ($("#" + s).attr("class") == "0") {

                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).removeClass("life");
                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).removeClass("1");
                    $("#" + (s + (k * (k - (ligne * 2 - 1))))).addClass("0");
                }

            }


        }
    });

    $("#reset").click(function () {

        for (var r = 0; r < p; r++) {

            clearInterval(time);
            speed = 0;
            $("#" + r).removeClass("0");
            $("#" + r).removeClass("1");
            $("#" + r).removeClass("life");
            $("#" + r).addClass("0");
            gene = 0;
            $("#generation").val(gene);
        }
    });

    $("#reSize").click(createBoard);

});