gamePattern = []; //random berilgan ranglarni massivga yig'adi
userClickedPattern = []; //user tomonidan bosilgan ranglarni yig'adi va alaloqibat gamePattern bilan solishtirib ko'radi

buttonColours = ["red", "blue", "green", "yellow"]; //random ranglarni berish uchun array
var level = 0; //start

$(".btn").click(function() {                      //click funksiyasi: user ranglarni bosganda unga DIVga class qo'shadi, audioni qo'llaydi. 
    $(this).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);

    playSound(this.id); //this buyerda huddi shu bosilayotgan elementdan nimadir olish uchun, ya'ni kak itself
    var userChosenColour = this.id; //bosilgan DIVni userClickedPattern uchun user tanlagan degan variable yaratadi, 
    
    userClickedPattern.push(userChosenColour); //bosilgan elementni user uchun ochilgan massivga qo'shadi

    checkAnswer(userClickedPattern.length - 1); //arrayni ikkalasi bir biriga to'gri kelyaptimi tekshirib oladi
});

function nextSequence() {                                   //bu funksiya keyingi random rangni generatsiya qiladi, uni array tiqadi, o'shanga mos elementga
    var randomNumber = Math.floor(Math.random() * 4);      //animatsiya qo'shadi, shunga mos audioni play qiladi, va h1 textni keyingi levelga o'zgartiradi
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {     //ko'p martalik ranga mos audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$("body").keydown(function() {    //istlagan keyboard bosilsa restart beradi o'yinga
    if (level === 0) {
        startOver();
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {     //bu qismda har bir levelda array qiymatini solishtiradi va keyingi safar butun arrayni bitta bitta solishtirishga hojat qolmaydi
        console.log("bosour!!!");

        if (gamePattern.length === userClickedPattern.length) {  //bu qismda uzunliklar solishtiriladi, shunda tepadagi qiymatni solishtirish bilan ikkalasi birgalikda umumiy tartib hosil qilib, javoblarni tekshirayveradi
            setTimeout(() => {
                gamePattern.forEach((color, index) => {  //arraydagi qar bir element uchun settimeout ichidagi funksiyalar ishlaydi.
                    setTimeout(() => {
                        $("#" + color).fadeOut(100).fadeIn(100);
                        new Audio('/sounds/' + color + '.mp3').play();
                    }, 500 * index); // Har bir rangni ketma-ket ijro qilish
                });

                setTimeout(function() {
                    userClickedPattern = [];
                    nextSequence();
                }, 500 * gamePattern.length); // To'liq ketma-ketlikni tugatgandan so'ng
            }, 1000);
        }
    } else {
        $("h1").html("GAME OVER <br> click any keyboard key for restart!");

        new Audio("sounds/wrong.mp3").play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
