import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon
} from "@heroicons/react/24/solid";

const features = [
    {
        name: "Seamless QR Code Payments:",
        description:
            "Send and receive money instantly with just a scan—no need to share account details or wait ( just like using Xender )",
        icon: CloudArrowUpIcon
    },
    {
        name: "Universal Bank Connectivity:",
        description:
            "Link all your bank accounts in one app for a so you dont have to move from one banking app to another",
        icon: LockClosedIcon
    },
    {
        name: "This is Not a Wallet",
        description:
            " We don't store your money, Payme simply connects your bank accounts to debit and credit funds securely and instantly",
        icon: LockClosedIcon
    },
    {
        name: "Merchant Payments Made Easy",
        description:
            "Pay businesses securely by scanning their QR codes. No cash, no card swipes, no manual transfers—just convenience.",

        icon: ArrowPathIcon
    },
    {
        name: "Future-Ready for E-commerce:",
        description:
            "Soon, shop online and pay with a single tap. No manual transfers or waiting for confirmation.",
        icon: FingerPrintIcon
    }
];

export default function Whysection() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base/7 font-semibold hidden text-indigo-600">
                        Deploy faster
                    </h2>
                    <p className=" text-3xl font-black tracking-tight text-gray-900 sm:text-xl lg:text-balance ">
                        Core Features
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        Quis tellus eget adipiscing convallis sit sit eget
                        aliquet quis. Suspendisse eget egestas a elementum
                        pulvinar et feugiat blandit at. In mi viverra elit nunc.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl p-4 py-5 border-2 border-gray-200 rounded-2xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map(feature => (
                            <div key={feature.name} className="relative pl-16 ">
                                <dt className="text-base/7 font-semibold text-gray-900">
                                    <div className="absolute left-0 top-0 flex size-10  items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                        <feature.icon
                                            aria-hidden="true"
                                            className="size-6 text-black font-black"
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-600">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
