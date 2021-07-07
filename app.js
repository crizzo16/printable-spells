let focus = {
    allChars: [],
    num = 0,
    parseSpells: function () {
        $.ajax({
            url: "https://crizzo16.github.io/printable-spells/spells.json",
            dataType: "json"
        }).done(function (result) {
            focus.allChars = result;
        });
    },
    loadSpells: function(num) {
        focus.allChars[focus.num].spells.forEach(function (item, index, array) {
            console.log(item.name);
            let spell = $("<div>").addClass("spell-wrapper");

            $(".printable").append(spell);
        });
    }
};