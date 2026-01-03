// Case Progress Logic Test
const getProgress = (status) => {
    const mapping = {
        INTAKE: 20,
        DRAFTING: 40,
        FILED: 70,
        HEARING: 90,
        CLOSED: 100
    };
    return mapping[status] || 0;
};

describe("Case Progress Logic", () => {
    test("it returns 20 for INTAKE", () => {
        expect(getProgress("INTAKE")).toBe(20);
    });

    test("it returns 100 for CLOSED", () => {
        expect(getProgress("CLOSED")).toBe(100);
    });

    test("it returns 0 for unknown status", () => {
        expect(getProgress("REJECTED")).toBe(0);
    });
});
