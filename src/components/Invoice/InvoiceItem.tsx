/* eslint-disable react/prop-types */

const InvoiceItem = ({item}) => {
    // console.log(item?.id);
    const size=item?.id.split('>>>')?.[1]
    
    return (
        <tr>
              <td>{item?.name}</td>
              <td>{size?.toUpperCase()}</td>
              <td>{item?.cartQuantity}</td>
              <td>{item.price}</td>
              <td>0</td>
            </tr>
    );
};

export default InvoiceItem;