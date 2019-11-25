"use strict";
exports.__esModule = true;
var UNIT;
(function (UNIT) {
    UNIT[UNIT["mL"] = 0] = "mL";
    UNIT[UNIT["gram"] = 1] = "gram";
    UNIT[UNIT["cup"] = 2] = "cup";
    UNIT[UNIT["ounce"] = 3] = "ounce";
    UNIT[UNIT["serving"] = 4] = "serving";
    UNIT[UNIT["piece"] = 5] = "piece";
})(UNIT = exports.UNIT || (exports.UNIT = {}));
var SUBSTANCE;
(function (SUBSTANCE) {
    SUBSTANCE[SUBSTANCE["PROTEIN"] = 0] = "PROTEIN";
    SUBSTANCE[SUBSTANCE["CARBOHYDRATES"] = 1] = "CARBOHYDRATES";
    SUBSTANCE[SUBSTANCE["FATs"] = 2] = "FATs";
    SUBSTANCE[SUBSTANCE["VITAMIN_A"] = 3] = "VITAMIN_A";
    SUBSTANCE[SUBSTANCE["IRON"] = 4] = "IRON";
    SUBSTANCE[SUBSTANCE["MAGNESIUM"] = 5] = "MAGNESIUM";
    SUBSTANCE[SUBSTANCE["ETC"] = 6] = "ETC";
})(SUBSTANCE = exports.SUBSTANCE || (exports.SUBSTANCE = {}));
var SubstanceNutrition = /** @class */ (function () {
    function SubstanceNutrition(referenceQuantity, referenceUnit) {
        this.referenceQuantity = referenceQuantity;
        this.referenceUnit = referenceUnit;
    }
    return SubstanceNutrition;
}());
exports.SubstanceNutrition = SubstanceNutrition;
var IngredientModel = /** @class */ (function () {
    function IngredientModel() {
    }
    return IngredientModel;
}());
exports.IngredientModel = IngredientModel;
