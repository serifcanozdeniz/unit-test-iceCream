import { render, screen } from "@testing-library/react"
import Toppings from "."
import userEvent from "@testing-library/user-event"

test("sosları ekleme ve çıkarma işlemleri toplama etki eder", async () => {

    const user = userEvent.setup();

    // 1) bileşeni renderla
    render(<Toppings />)

    // 2) toplam span'ı al
    const total = screen.getByTestId("total");

    // 3) bütün sos checkbox'larını al
    const toppings = await screen.findAllByRole("checkbox");

    // 4) toplam ücret 0 mı kontrol et
    expect(total.textContent).toBe("0");

    // 5) bütün checkbox'ların tiksiz olduğunu kontrol et
    toppings.forEach((i) => expect(i).not.toBeChecked());

    // 6) soslardan birine tıkla
    await user.click(toppings[0]);

    // 7) total 3'e eşit mi
    expect(total.textContent).toBe("3");

    // 8) soslardan birine daha tıkla
    await user.click(toppings[4]);

    // 9) total 6 oldu mu
    expect(total.textContent).toBe("6");

    // 10) eklenen soslardan birini çıkar
    await user.click(toppings[0]);

    // 11) total 3 oldu mu kontrol et
    expect(total.textContent).toBe("3");

    // 12) eklenen son sosu çıkar
    await user.click(toppings[4]);

    // 13) total 0 oldu mu kontrol et
    expect(total.textContent).toBe("0");
});