import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import Form from ".";

test("koşulların onaylanmasına göre buton aktifliği", () => {
    // 1) test edilecek olan bileşen render edilmeli
    render(<Form />);

    // 2) gerekli elemanları çağır
    const button = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");

    // 3) checkbox'ın tiklenmemiş olduğunu kontrol et
    expect(checkbox).not.toBeChecked();

    // 4) butonun inaktif olduğunu kontrol et
    expect(button).toBeDisabled();

    // 5) checkbox'a tıkla
    fireEvent.click(checkbox);

    // 6) butonun aktif olduğunu kontrol et
    expect(button).toBeEnabled();

    // 7) checbox'a tekrar tıkla
    fireEvent.click(checkbox);

    // 8) butonun inaktif olduğunu kontrol et
    expect(button).toBeDisabled();
});

test("onay butonunun hover durumuna göre bildirim gözükür", () => {
    // 1) test edilecek olan bileşen render edilmeli
    render(<Form />);

    // 2) gerekli elemanları çağır
    const button = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");
    const alert = screen.getByText(/size herhangi bir ürün/i); // (i)insensitive

    // 3) checkbox'a tıkla
    fireEvent.click(checkbox);

    // 4) bildirimin ekranda olmadığını kontrol et
    expect(alert).not.toBeVisible();

    // 5) mouse'u butona getir
    fireEvent.mouseEnter(button);

    // 6) bildirim ekrana geldi mi kontrol et
    expect(alert).toBeVisible();

    // 7) mouse'u butondan çek
    fireEvent.mouseLeave(button);

    // 8) bildirim ekrandan gitti mi kontrol et
    expect(alert).not.toBeVisible();
})