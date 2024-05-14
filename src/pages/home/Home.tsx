import { LegacyRef, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Fieldset } from "primereact/fieldset";

import { TruckIcon, ShoppingBagIcon, CreditCardIcon } from "@heroicons/react/24/outline";

import PageTemplate from "@assets/PageTemplate";
import ShoppingIllustration from "@assets/ShoppingIllustration";

import "@styles/floatingItem.css";

const Home = () => {
    const stepperRef = useRef<StepperRefAttributes | undefined>(undefined);

    const nada = [
        "nada",
        "nada",
        "nada",
        "nada",
        "nada",
        "nada",
        "nada",
        "nada",
        "nada",
    ]

    const nada2 = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ]

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = (product: string) => {
        return (
            <Card title="Nombre Producto" subTitle="Precio y cuanto cuesta" className="mx-3 my-2">
                <p className="m-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam beatae neque debitis! {product}
                </p>
            </Card>
        );
    };

    return (
        <PageTemplate needBack2Top>
            <section className="py-24 lg:py-32 flex flex-col items-center">
                <h1 className="text-5xl text-center pb-2">Welcome to E-Commerce</h1>
                <p className="text-center text-xl italic text-violet-900">The <strong className="font-medium">best store</strong> online!</p>
                <Link to="/products" className="mt-4 border-4 rounded-lg border-violet-800 w-32 p-2 text-violet-900 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white text-center font-semibold tracking-wider">Go shop now</Link>
            </section>

            <hr />

            <section className="lg:grid lg:grid-cols-2 py-3 lg:py-12 lg:gap-8 mb-4 lg:mb-8 lg:items-center">
                <div>
                    <h2 className="text-2xl mb-2">What is E-Commerce?</h2>
                    <p className="mb-4 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eveniet dolorem mollitia sunt tenetur earum iste asperiores, minus rem ipsam eligendi quidem voluptas temporibus sequi aperiam architecto nemo impedit reprehenderit?</p>

                    <Stepper ref={stepperRef as LegacyRef<StepperRefAttributes>}>
                        <StepperPanel header="Choose">
                            <div className="border-2 rounded-xl flex flex-col justify-center items-center py-5 my-1">
                                <ShoppingBagIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">We have the best products and offers for you to choose from</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                            </footer>
                        </StepperPanel>
                        <StepperPanel header="Pay">
                            <div className="border-2 rounded-xl flex flex-col justify-center items-center py-5 my-1 px-3">
                                <CreditCardIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">We have prepare for you all possible pay methods for you to choose</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                            </footer>
                        </StepperPanel>
                        <StepperPanel header="Receive">
                            <div className="border-2 rounded-xl flex flex-col justify-center items-center py-5 my-1">
                                <TruckIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">Relax and wait for your order to arrive</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                            </footer>
                        </StepperPanel>
                    </Stepper>
                </div>

                <ShoppingIllustration />
            </section>

            <hr />

            <section className="lg:grid lg:grid-cols-3 py-3 lg:py-8 lg:gap-8 my-3 lg:items-center">
                <Carousel value={nada} numVisible={3}
                    numScroll={1} className="lg:col-span-2"
                    itemTemplate={productTemplate}
                    autoplayInterval={3000}
                    responsiveOptions={responsiveOptions}
                />

                <div>
                    <h2 className="text-2xl mb-2">Fresh Product Every Hour!</h2>
                    <p className="text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet rem tempore sapiente exercitationem dolor, molestias minima doloribus repellat hic excepturi dolore expedita fugiat repudiandae nihil officiis molestiae explicabo dicta? Neque.</p>
                </div>
            </section>

            <hr />

            <section className="py-6 lg:py-12">
                <h2 className="text-2xl mb-6 text-center">Explore all our product categories</h2>

                <div className="flex flex-wrap flex-row gap-x-20 gap-4 justify-center">
                    {nada2.map((_item, i) =>
                        <Fieldset key={i} legend="Header" toggleable collapsed className="border-2 w-72 text-center p-2">
                            <p className="m-0">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugit reiciendis id quis facilis ab tenetur cum, tempore placeat facere doloribus dolores voluptatum repudiandae ipsam amet odit accusantium? Numquam, ipsa?
                            </p>
                        </Fieldset>
                    )}
                </div>
            </section>

            <hr />

            <div className="flex justify-center">
                <Link to="/products" className="my-8 mx-auto border-4 rounded-lg border-violet-800 w-32 p-2 text-violet-900 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white text-center font-semibold tracking-wider">Go shop now</Link>
            </div>

            <hr />
        </PageTemplate >
    );
}
export default Home;