'use client';
import Link from 'next/link';

const OrderSuccess = () => {


    return (
        <main>
            <div className="OrderSuccess">
                <div className="container">
                    <i className="fas fa-check-circle"></i>
                    <h1>Thank you for your order!</h1>
                    <p>
                        Your order has been received and is being processed. You will receive
                        an email confirmation shortly.
                    </p>
                    {/* <a href="/" className="button">
          Continue Shopping
        </a> */}
                    <Link className="button" href='/'>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>

    );
};

export default OrderSuccess;
