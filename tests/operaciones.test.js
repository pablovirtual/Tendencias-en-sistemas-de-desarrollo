const {
  sumar,
  restar,
  multiplicar,
  dividir
} = require("../src/operaciones");

describe("Operaciones matemáticas", () => {
  test("suma dos números", () => {
    expect(sumar(4, 2)).toBe(6);
  });

  test("resta dos números", () => {
    expect(restar(4, 2)).toBe(2);
  });

  test("multiplica dos números", () => {
    expect(multiplicar(4, 2)).toBe(8);
  });

  test("divide dos números", () => {
    expect(dividir(4, 2)).toBe(2);
  });

  test("impide dividir entre cero", () => {
    expect(() => dividir(4, 0)).toThrow(
      "No se puede dividir entre cero"
    );
  });
});
