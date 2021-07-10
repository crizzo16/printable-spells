let focus = {
    allChars: [],
    num: 0,
    parseSpells: function () {
        $.ajax({
            url: "https://crizzo16.github.io/printable-spells/spells.json",
            dataType: "json"
        }).done(function (result) {
            focus.allChars = result;
            focus.loadSpells();
        });
    },
    loadSpells: function () {
        $(".printable").html("");
        focus.allChars[focus.num].spells.forEach(function (item, index, array) {
            let spell = $("<div>").addClass("spell-wrapper");
            console.log(item);

            // content stuff
            let spellContent = $("<div>").addClass("spell-content");
            const spellLevel = $("<div>").addClass("spell-level").text(focus.formatLevel(item.level));
            const spellName = $("<div>").addClass("spell-name").text(item.name);
            //Spell Info
            let spellInfo = $("<div>").addClass("spell-info");
            let spellComponents = $("<div>").addClass("spell-components");
            for (i = 0; i < 5; i++) {
                let section = $("<div>").addClass("comp-sec");
                let circle = $("<div>").addClass("circle");
                let secName = $("<div>");
                if (i == 0) {
                    secName.text("verbal");
                    section.addClass("comp-left");
                    if (item.components[0]) circle.addClass("filled");
                } else if (i == 1) {
                    secName.text("ritual");
                    section.addClass("comp-right");
                } else if (i == 2) {
                    secName.text("somatic");
                    section.addClass("comp-left");
                    if (item.components[1]) circle.addClass("filled");
                } else if (i == 3) {
                    secName.text("concentration");
                    section.addClass("comp-right");
                    if (item.concentration) circle.addClass("filled");
                } else {
                    secName.text("material");
                    if (item.components[2]) {
                        circle.addClass("filled");
                        section.addClass("comp-material");
                        let spandral = $("<span>").text(" (" + item.components[3] + ")");
                        secName.append(spandral);
                    }
                }
                section.append(circle).append(secName);
                spellComponents.append(section);
            }
            let spellStuff = $("<div>").addClass("spell-stuff");
            for (j = 0; j < 4; j++) {
                let temp = $("<div>").addClass("trait-sec");
                let tempName = $("<div>").addClass("trait-sec-name");
                let tempText = $("<div>").addClass("trait-sec-info");
                if (j == 0) {
                    tempName.text("Duration");
                    tempText.text(item.duration);
                } else if (j == 1) {
                    tempName.text("Range");
                    tempText.text(item.range);
                } else if (j == 2) {
                    tempName.text("Casting Time");
                    tempText.text(item.time);
                } else {
                    tempName.text("School");
                    tempText.text(item.school);
                }
                temp.append(tempName).append(tempText);
                spellStuff.append(temp);
            }
            spellInfo.append(spellComponents).append(spellStuff);
            //Spell Text
            let spellText = $("<div>").addClass("spell-text");
            item.text.forEach(function (para, ind, arr) {
                let graph = $("<p>").html(para);
                spellText.append(graph);
            });
            //append to spellContent
            spellContent.append(spellLevel).append(spellName).append(spellInfo).append(spellText);

            // border stuff
            const borderStuff1 = $("<img>").addClass("spell-border bottom-right").attr("src", "./Upper Left.png");
            const borderStuff2 = $("<img>").addClass("spell-border top-left").attr("src", "./Upper Left.png");
            const borderStuff3 = $("<div>").addClass("triangle top-left");
            const borderStuff4 = $("<div>").addClass("triangle bottom-right");
            const borderStuff5 = $("<div>").addClass("box bottom-left");
            const borderStuff6 = $("<div>").addClass("box top-right");

            // Append all sections to spell
            spell.append(spellContent).append(borderStuff1).append(borderStuff2).append(borderStuff3).append(borderStuff4).append(borderStuff5).append(borderStuff6);
            $(".printable").append(spell);
        });
    },
    formatLevel: function (num) {
        if (num == 0) {
            return "Cantrip";
        } else if (num == 1) {
            return "1st Level";
        } else if (num == 2) {
            return "2nd Level";
        } else if (num == 3) {
            return "3rd Level";
        } else {
            return num + "th Level";
        }
    }
};

$(document).ready(function () {
    focus.parseSpells();
});