import { extent, numericExtent, sumPositiveValues } from "./array";
describe("extent", function () {
    test("returns lowest and highest numbers from list of numbers", function () {
        var result = extent([3, 7, 1, 2, 9, -2]);
        expect(result[0]).toBe(-2);
        expect(result[1]).toBe(9);
    });
    test("returns undefined for invalid values", function () {
        var result = extent([NaN, null, undefined]);
        expect(result).toBe(undefined);
    });
    test("returns undefined for empty values", function () {
        var result = extent([]);
        expect(result).toBe(undefined);
    });
    test("returns same lowest and highest number for single number", function () {
        var result = extent([5]);
        expect(result[0]).toBe(5);
        expect(result[1]).toBe(5);
    });
    test("returns valid lowest and highest numbers from mixed values", function () {
        var result = extent([undefined, 4, 3, 7, null, {}, 1, 5]);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(7);
    });
    test("returns earliest and latest date from list of dates", function () {
        var result = extent([new Date(2019, 8, 13), new Date("03/03/1970"), new Date("05/05/1985")]);
        expect(result[0].getFullYear()).toBe(1970);
        expect(result[1].getFullYear()).toBe(2019);
    });
    test("returns same earliest and latest letter for single letter", function () {
        var result = extent(['A']);
        expect(result[0]).toBe('A');
        expect(result[1]).toBe('A');
    });
    test("returns earliest and latest letter from list of letters", function () {
        var result = extent(['X', 'A', 'Y', 'Z', 'C', 'B']);
        expect(result[0]).toBe('A');
        expect(result[1]).toBe('Z');
    });
});
describe("numericExtent", function () {
    test("returns lowest and highest numbers from list of numbers", function () {
        var result = numericExtent([3, 7, 1, 2, 9, -2]);
        expect(result[0]).toBe(-2);
        expect(result[1]).toBe(9);
    });
    test("returns undefined for list of invalid values", function () {
        var result = numericExtent([NaN, null, undefined]);
        expect(result).toBe(undefined);
    });
    test("returns undefined for empty list", function () {
        var result = numericExtent([]);
        expect(result).toBe(undefined);
    });
    test("returns same lowest and highest number for single number", function () {
        var result = numericExtent([5]);
        expect(result[0]).toBe(5);
        expect(result[1]).toBe(5);
    });
    test("returns valid lowest and highest number from mixed values", function () {
        var result = numericExtent([undefined, 4, 3, 7, null, {}, 1, 5]);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(7);
    });
    test("coerces Dates to numbers", function () {
        var earliest = 5270400000;
        var latest = 1568332800000;
        var result = numericExtent([new Date(earliest), new Date(latest), new Date(1985, 5, 5)]);
        expect(result[0]).toBe(earliest);
        expect(result[1]).toBe(latest);
    });
    test("returns earliest and latest timestamp for mixed Dates and numbers", function () {
        var earliest = 5270400000;
        var latest = 1568468277000;
        var result = numericExtent([new Date(2019, 7, 20), new Date(earliest), latest, new Date(1985, 5, 5)]);
        expect(result[0]).toBe(earliest);
        expect(result[1]).toBe(latest);
    });
    test("does not coerce objects", function () {
        var result = numericExtent([{ toString: function () { return "2"; } }, { toString: function () { return "1"; } }]);
        expect(result).toBe(undefined);
    });
});
describe("sumPositiveValues", function () {
    test("returns sum of positive integer elements", function () {
        var result = sumPositiveValues([32, 54, -12, 21]);
        expect(result).toBe(107);
    });
    test("returns sum of positive floating point elements", function () {
        var result = sumPositiveValues([54.124, 78.024, -12.543, 21]);
        expect(result).toBe(153.148);
    });
    test("returns 0 for empty array", function () {
        expect(sumPositiveValues([])).toBe(0);
    });
});
