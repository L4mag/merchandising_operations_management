import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {CSVLink} from "react-csv";
import {setOrderDetails} from "../../../redux/reducers/orderDetailsReducer";
import getOrderDetails from "../../../logic/getOrderDetails.logic";

const OrderDetails = () => {
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails.orderDetails)

  useEffect(() => {
    console.log(orderDetails)
    getOrderDetails().then(
      r => {
        dispatch(setOrderDetails(r))
      }
    )
  }, []);

  return (
    <>
      <h4 className='center'>Order Details</h4>
      <div className='z-depth-3 custom-container center'>
        <input type="text" name="Order Details" id="Order Details" value={''}  required/>
        <table id="items_table" className="tg">
          <thead>
          <tr>
            <th className="tg-0lax">Order_id</th>
            <th className="tg-0lax">pack</th>
            <th className="tg-0lax">qty</th>
          </tr>
          </thead>
          <tbody>
          {
            orderDetails.map((orderDetail, i) =>
              <tr key={i}>
                <td className="tg-0lax">{orderDetail.order_id}</td>
                <td className="tg-0lax">{orderDetail.pack}</td>
                <td className="tg-0lax">{orderDetail.qty}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
      <br/>
      <div className='center'>
        <CSVLink className='btn'
                 data={orderDetails}
                 filename={`OrderDetails_${Date.now()}.csv`}
        >
          Download as CSV
        </CSVLink>
      </div>
    </>
  )
}
export default OrderDetails;
