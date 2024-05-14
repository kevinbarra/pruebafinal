import PageTemplate from "@assets/page/PageTemplate";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <PageTemplate>
            <Link to="/" className="self-start inline-flex items-center gap-2 mb-5">
                <ArrowLeftIcon className="w-6" />
                Back
            </Link>
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-3xl text-green-600">Purchase successful</h1>
                <p className="text-center">An email has been sent to your inbox with the details</p>
                <p className="text-lg">Thank you for your purchase!</p>

                <img className="w-3/4 mt-5" src="/images/purchase.svg" alt="Purchase Successful" />
            </div>
        </PageTemplate>
    );
}

export default Success;