import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
};

// prop olarak veriyi alan bir bileşeni test ediyorsak aldığı prop'ların benzerini göndermemiz gerekir
test("Miktar, başlık ve fotoğraf gelen veriye göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar span'ını çağır
  const amount = screen.getByTestId("amount");

  // miktar 5 mi kontrol et
  expect(amount.textContent).toBe("5");

  // Chocolate yazısı ekrana basıldı mı?
  screen.getByText("Chocolate");

  // resim elementini al
  const image = screen.getByAltText("çeşit-resim");

  // src değeri "/images/chocolate.png" mi?
  expect(image).toHaveAttribute("src", item.imagePath);
});

test("butonlara tıklanınca fonksiyonlar doğru parametre ile çalışır", async () => {
  const user = userEvent.setup();
  // prop olarak scoops bileşeninden gönderilen orijinal fonksiyonları gönderemeyeceğimizden fonksiyonlar doğru şekilde doğru zamanda doğru parametreler ile çalışıyor mu kontrolünü yapabilmek için asıl fonksiyonu taklit eden mock fonksiyonu tanımlamak gerekir.

  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();
  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  // butonları al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const clearBtn = screen.getByRole("button", { name: /sıfırla/i });

  // ekle butonuna tıkla
  await user.click(addBtn);

  // addToBasket fonksiyonu doğru parametreleri alarak çalıştı mı
  expect(addMockFn).toHaveBeenCalledWith(item);

  // sıfırla butonuna tıkla
  await user.click(clearBtn);

  // clearFromBasket methodu doğru parametreleri alarak çalıştı mı
  expect(clearMockFn).toHaveBeenCalledWith(item.name);
});
