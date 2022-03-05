import { useCart } from "./useCart";

function ListItemsWithHook() {
  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem } = useCart();

  return (
    <div>
      <table
        className="table"
        cellPadding="0"
        border="0"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>名稱</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>移除</th>
          </tr>
        </thead>
        <tbody>
          {items.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.tent_id}</td>
                <td>{v.tent_item} </td>
                <td>
                  <img
                    className="tentSmallPic"
                    src={`http://localhost:3002/tent-pic/img/${v.img}`}
                    alt=""
                  />
                </td>

                <td>{v.price}</td>
                <td>
                  <div className="btn-group mr-2" role="group">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        minusOne(v.id);
                      }}
                    >
                      -
                    </button>
                    <button type="button" className="btn btn-light">
                      {v.quantity}
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        plusOne(v.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{v.itemTotal}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeItem(v.id);
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        items: {cart.totalItems} / total: {cart.cartTotal}
        <br />
        {cart.isEmpty && "購物車為空"}
        <hr />
      </div>
    </div>
  );
}

export default ListItemsWithHook;
