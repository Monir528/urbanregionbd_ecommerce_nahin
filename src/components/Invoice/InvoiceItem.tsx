import { OrderedItem } from "@/types/order";

interface InvoiceItemProps {
    item: OrderedItem
}

const InvoiceItem = ({item}: InvoiceItemProps) => {
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