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
    loadSpells: function() {
        $(".printable").html("");
        focus.allChars[focus.num].spells.forEach(function (item, index, array) {
            let spell = $("<div>").addClass("spell-wrapper");

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
    formatLevel: function(num) {
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

$(document).ready(function() {
    focus.parseSpells();
});