import Link from "next/link";

const Footer = () => {

    const MailIcon = () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699" stroke="#90A1B9" strokeWidth="1.5"/>
            <path d="M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="#90A1B9" strokeWidth="1.5"/>
        </svg>
    );

    const PhoneIcon = () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.22003 11.045C10.1494 14.6663 13.332 14.6663 13.332 14.6663C13.6857 14.6663 14.0248 14.5259 14.2748 14.2758C14.5249 14.0258 14.6654 13.6866 14.6654 13.333V11.333C14.6654 10.9794 14.5249 10.6402 14.2748 10.3902C14.0248 10.1402 13.6857 9.99967 13.332 9.99967H11.332" stroke="#90A1B9" strokeWidth="1.5"/>
            <path d="M5.9987 2.66634V4.66634C5.9987 5.07749 5.85793 5.44777 5.46536 5.73301L5.15336 5.96701C4.89122 6.65059 5.86982 8.63959 9.22003 11.045" stroke="#90A1B9" strokeWidth="1.5"/>
        </svg>
    );

    const MapPinIcon = () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="#90A1B9" strokeWidth="1.5"/>
            <circle cx="8" cy="6.666" r="2" stroke="#90A1B9" strokeWidth="1.5"/>
        </svg>
    );

    const linkSections = [
        {
            title: "WEBSITE",
            links: [
                { text: "Home", path: '/', internal: true },
                { text: "Privacy Policy", path: '/privacy-policy', internal: true },
                { text: "Terms & Conditions", path: '/terms', internal: true },
                { text: "Create Your Store", path: '/create-store', internal: true },
            ]
        },
        {
            title: "CONTACT",
            links: [
                { text: "+91 8700525832", path: "tel:+918700525832", icon: PhoneIcon },
                { text: "Gocarthelp@gmail.com", path: "mailto:Gocarthelp@gmail.com", icon: MailIcon },
                { text: "Ghaziabad, Indirapuram", path: "https://www.google.com/maps?q=Ghaziabad+Indirapuram", icon: MapPinIcon }
            ]
        }
    ];

    return (
        <footer id="footer" className="mx-6 bg-white">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">

                    {/* LOGO */}
                    <div>
                        <Link href="/" className="text-4xl font-semibold text-slate-700">
                            <span className="text-green-600">go</span>cart
                            <span className="text-green-600 text-5xl">.</span>
                        </Link>
                        <p className="mt-6 text-sm max-w-[410px]">
                            Welcome to gocart, your ultimate destination for the latest gadgets.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="grid grid-cols-2 gap-16 text-sm">
                        {linkSections.map((section, i) => (
                            <div key={i}>
                                <h3 className="font-medium text-slate-700 mb-3">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            {link.icon && <link.icon />}

                                            {/* ✅ INTERNAL vs EXTERNAL FIX */}
                                            {link.internal ? (
                                                <Link href={link.path} className="hover:underline">
                                                    {link.text}
                                                </Link>
                                            ) : (
                                                <a href={link.path} className="hover:underline">
                                                    {link.text}
                                                </a>
                                            )}

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* COPYRIGHT */}
                <p className="py-4 text-sm text-slate-500">
                    Copyright 2025 © gocart All Rights Reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;