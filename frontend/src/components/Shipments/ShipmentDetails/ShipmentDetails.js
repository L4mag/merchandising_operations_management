import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {CSVLink} from "react-csv";
import {setShipmentDetails} from "../../../redux/reducers/shipmentDetailsReducer";
import getShipmentDetails from "../../../logic/getShipmentDetails.logic";

const ShipmentDetails = () => {
  const dispatch = useDispatch()
  const shipmentDetails = useSelector(state => state.shipmentDetails.shipmentDetails)

  useEffect(() => {
    getShipmentDetails().then(
      r => {
        dispatch(setShipmentDetails(r))
      }
    )
  }, []);

  return (
    <>
      <h4 className='center'>Shipment Details</h4>
      <div className='z-depth-3 custom-container center'>
        <input type="text" name="Order Details" id="Order Details" value={''}  required/>
        <table id="items_table" className="tg">
          <thead>
          <tr>
            <th className="tg-0lax">shipment_id</th>
            <th className="tg-0lax">pack</th>
            <th className="tg-0lax">qty</th>
          </tr>
          </thead>
          <tbody>
          {
            shipmentDetails.map((shipmentDetail, i) =>
              <tr key={i}>
                <td className="tg-0lax">{shipmentDetail.shipment_id}</td>
                <td className="tg-0lax">{shipmentDetail.pack}</td>
                <td className="tg-0lax">{shipmentDetail.qty}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
      <br/>
      <div className='center'>
        <CSVLink className='btn'
                 data={shipmentDetails}
                 filename={`ShipmentDetails_${Date.now()}.csv`}
        >
          Download as CSV
        </CSVLink>
      </div>
    </>
  )
}
export default ShipmentDetails;
