import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function BasketPage() {
  const [products, setProducts] = useState([]);
  const [basketList, setBasketList] = useState([]);

  const [test, settest] = useState(10);

  useEffect(() => {
    fetch("https://northwind.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const addToBasket = (item) => {
    var check = basketList.find((q) => item.id === q.id);
    if (check) {
      check.quantity = check.quantity + 1;
      setBasketList([...basketList]);
    } else {
      let basketObje = {
        id: item.id,
        name: item.name,
        price: item.unitPrice,
        quantity: 1,
      };
      setBasketList([...basketList, basketObje]);
    }
  };

  const deleteBasketItem = (itemID) => {
    let filter = basketList.filter((q) => q.id != itemID);
    setBasketList(filter);
  };

  const addQuantity = (itemId) => {
    let getItem = basketList.find((q) => q.id == itemId);
    getItem.quantity = getItem.quantity + 1;
    setBasketList([...basketList]);
  };

  const decraseItemQuantity = (itemId) => {
    let getItem = basketList.find((q) => q.id == itemId);
    getItem.quantity = getItem.quantity - 1;

    if (getItem.quantity <= 0) {
      deleteBasketItem(itemId);
    }else{
        setBasketList([...basketList]);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <h1>Ürünler</h1>
          <table>
            {products.map((item, index) => (
              <tr>
                <td style={{ textAlign: "left" }}>{index + 1}.</td>
                <td style={{ textAlign: "left" }}>
                  {item.name} - {item.unitPrice}
                </td>
                <td>
                  <Button variant="outlined" onClick={() => addToBasket(item)}>
                    Add to Basket
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <h1>Sepet Listesi</h1>
          <table>
            {basketList.map((item, index) => (
              <tr>
                <td style={{ textAlign: "left" }}>{index + 1}.</td>
                <td style={{ textAlign: "left" }}>
                  {item.name} - {item.unitPrice}
                </td>
                <td style={{ textAlign: "left" }}>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => decraseItemQuantity(item.id)}
                    >
                      {" "}
                      -{" "}
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <TextField
                      id="standard-basic"
                      label={item.quantity}
                      variant="outlined"
                    />
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant="outlined"
                      onClick={() => addQuantity(item.id)}
                    >
                      {" "}
                      +{" "}
                    </Button>
                  </td>
                </td>
                <td>
                  <Button
                    variant="outlined"
                    onClick={() => deleteBasketItem(item.id)}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
