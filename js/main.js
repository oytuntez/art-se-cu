(function() {
    var canvas;
    var poemLines = [
        "ay, ayy, se, ayy! secu.\n",
        "\n",
        "so one day, maybe a boy or a girl,\n",
        "most probably not an androgyn.\n",
        "they came; did they go? apparent.\n",
        "come, they must have, for known reasons.\n",
        "\n",
        "ayy, secul; enough, ay ay ay, secular.\n",
        "\n",
        "not welcomed, lined up around a pole,\n",
        "line-break, line breaks, you destroy, you\n",
        "kill. your lawfully protected murder, now goes\n",
        "												AWAY? HUH, NO.\n",
        "towards the west, accepting their imperative.\n",
        "but still to the west with paramounts. we bleed\n",
        "you what, you laugh. oh, this tabula rasa.\n",
        "darlin’, that didn’t work for you, our slates\n",
        "here\n",
        "are full with color and whatever you oppose\n",
        "but it’s your hatred: sitting next to each other,\n",
        "fucking and merging after each other, ayyy\n",
        "												SƐKJƏLƏRɪZƏM\n",
        "where I am looking at, ay, ay, so gray your mind\n",
        "												but your eyes\n",
        "												but your eyes\n"
    ];
    // Psuedo translation
    var arabicPoemLines = [
        ".ايه، ايهه، علـ، ايهه! علمان",
        "",
        "،فيَوم مِن الأيّام، يمكن صَبي أو بنتْ",
        ".بسْ على الأرجح مش شَخص مُخنّتْ",
        ".يمكن يوصلوا للسلطة؛ راحُوا يا تُرى؟ واضحْ",
        ".وصلوا، أكيد، لأسبَاب مَعروفة",
        "",
        ".ايه، علمانـ؛ بِكفّي، اي اي اي، علمَاني",
        "",
        "،غير مرحّب فينا: الأحرار، ربطونا حول عَمود",
        "سطرْ جديد، انقطعَ الحبل، أنتو بتدمِّرو، أنتو",
        "بتقْـتلو. جريمْتكمْ المَحْميِّة بالقانون الآن",
        "         .ستذهبُ لبعيد؟ هه، لا",
        "نحْوَ الغرب، و أنتو قبلانين هَيْمَنته",
        "على الدوام نحْوَ الغربْ صاحب القيم. بينْزل منّا",
        ".الدّمّ، أنتو شو، أنتو بتضْحكو. آه، سبّورة المعرفة العَذراء",
        "حبيباتي، لم تتوفقوا فيها، لوائحنا",
        "هُنَا",
        "مليانة ألوانْ و بكلْ شي أنتو بتعارضوهْ",
        "،لكن كَراهياتكمْ: أشكالْ و ألوانْ قاعدة معَ بعض",
        "عمْ بتنيك و تختلط ببَعض لتكبَرْ، ايه",
        "												SƐKJƏLƏRɪZƏM",
        "أينما نَظَرْتُ، ايه، ايه، عقلْكمْ شايب كتيرْ",
        " لكنْ عُيونكم يا قَـتلة الحُرِّيَّات",
        "                  لكنْ عُيونكم"
    ];

    var signature = "Oytun Tez © 2017, Manhattan";
    var fontFamily = '"Lucida Console", Monaco, monospace';
    var poemTextOptions = {
        fontFamily: fontFamily,
        fontSize: 15,
        lineHeight: 1.6,
        selectable: false,
        hoverCursor: 'default',
        moveCursor: 'default',
        hasControls: false,
        hasBorders: false
    };
    var arabicPoemTextOptions = {
        fill: '#bbb',
        //textBackgroundColor: 'blue',
        //backgroundColor: 'red',
        fontFamily: 'Cairo',
        fontSize: 15,
        lineHeight: 1.6,
        selectable: false,
        hoverCursor: 'default',
        moveCursor: 'default',
        hasControls: false,
        hasBorders: false
    };
    var poemLinePadding = 35;
    var arabicPoemLinePadding = 10;
    var arabicLineAnimationCharacterSpeed = 100;
    var arabicLineGroup = [];
    var arabicPoemDelay = 1; //15

    function initialize() {
        WebFont.load({
            google: {
                families: ['Aref Ruqaa']
            },
            fontloading: start
        });
    }

    function start() {
        canvas = new fabric.Canvas('c', {
            selection: false
        });
        canvas.setBackgroundColor('white');
        canvas.setHeight(1000);
        canvas.setWidth(500);

        placeSignature();
        placePoem();

        canvas.renderAll();

        setTimeout(animateArabicPoem, (arabicPoemDelay*1000));
    }

    function placePoem() {
        var options = Object.create(poemTextOptions);
        options.left = 0;
        options.top = 0;

        for(var i = 0; i < poemLines.length; i++) {
            options.top += poemLinePadding;
            putLine(poemLines[i], options);
            putArabicLine(arabicPoemLines[i], options);
        }
    }
    
    function putLine(line, options) {
        if(line[0] === "	") {
            options = Object.create(options);
            options.fill = "red";
        }

        var text = new fabric.Text(line, options);
        canvas.add(text);
        text.moveTo(2);

        if(line.length === 1) {
            putSeparator(options);
        }
    }

    function putSeparator(options) {
        var separator = new fabric.Line([0, 50, 400, 50], {
            stroke: 'red',
            strokeWidth: 2,
            left: 0,
            top: (options.top+8)
        });

        canvas.add(separator);
    }

    function putArabicLine(line, englishLineOptions) {
        var options = Object.create(arabicPoemTextOptions);

        if(line[0] === "	" || line[0] === " ") {
            options = Object.create(options);
            options.fill = "#e48d8d";
        }

        var text = new fabric.Text(line, options);
        var rect = new fabric.Rect({
            width: text.getWidth(),
            height: text.getHeight(),
            fill: 'white',
            opacity: 1
        });

        var group = new fabric.Group([text, rect], {
            left: 0,
            top: englishLineOptions.top+arabicPoemLinePadding,
            selectable: false,
            hoverCursor: 'default',
            moveCursor: 'default',
            hasControls: false,
            hasBorders: false
        });

        arabicLineGroup.push(group);

        canvas.add(group);
        group.moveTo(1);
    }

    function animateArabicPoem(groupIndex) {
        var items, text, rect;

        if(typeof groupIndex === 'undefined') {
            groupIndex = 0;
        }

        if(!arabicLineGroup.hasOwnProperty(groupIndex)) {
            return;
        }

        items = arabicLineGroup[groupIndex].getObjects();
        text = items[0];
        rect = items[1];

        rect.animate('width', 0, {
            onChange: canvas.renderAll.bind(canvas),
            duration: (arabicLineAnimationCharacterSpeed * text.getText().length),
            onComplete: function() {
                animateArabicPoem(groupIndex+1);
            }
        });
    }

    function placeSignature() {
        var textOptions = {
            left: 350,
            top: 980,
            fontFamily: 'Arial',
            fontSize: 10,
            fontWeight: "100",
            lineHeight: 1.6,
            fill: "#ddd",
            selectable: false,
            hoverCursor: 'default',
            moveCursor: 'default',
            hasControls: false,
            hasBorders: false
        };
        var text = new fabric.Text(signature, textOptions);

        canvas.add(text);
    }

    initialize();
})();