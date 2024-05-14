import CheckoutForm from "@assets/forms/CheckoutForm";
import PageTemplate from "@assets/page/PageTemplate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Pay = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    // TODO: get amount from cart
    const amount = 1

    return (
        <PageTemplate>
            <Elements stripe={stripePromise} options={{
                mode: 'payment',
                amount: amount * 100,
                currency: 'usd',
                locale: 'en',
            }}
            >
                <CheckoutForm amount={amount} />
            </Elements>
        </PageTemplate>
    );
}

export default Pay;