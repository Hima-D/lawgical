// Redaction Logic Test
const simulateRedaction = (text) => {
    return text
        .replace(/[A-Z][a-z]+/g, "[NAME]")
        .replace(/\d{10}/g, "[PHONE]")
        .replace(/[A-Z]{5,}/g, "[PLACE]");
};

describe("AI Redaction Logic", () => {
    test("it redacts capitalized names", () => {
        const input = "My name is John Doe and I live in Haryana.";
        const output = simulateRedaction(input);
        expect(output).toContain("[NAME]");
        expect(output).not.toContain("John");
        expect(output).not.toContain("Doe");
    });

    test("it redacts 10-digit phone numbers", () => {
        const input = "Call me at 9876543210 for help.";
        const output = simulateRedaction(input);
        expect(output).toContain("[PHONE]");
        expect(output).not.toContain("9876543210");
    });

    test("it redacts large uppercase locations", () => {
        const input = "Case filed at DELHI-NCR headquarters.";
        const output = simulateRedaction(input);
        expect(output).toContain("[PLACE]");
        expect(output).not.toContain("DELHI-NCR");
    });
});
