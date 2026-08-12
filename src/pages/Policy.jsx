import React from "react";
import {
    ShieldCheck,
    Lock,
    Database,
    UserCheck,
    Cookie,
    Mail,
    Eye,
    FileText,
    Settings,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Policy = () => {
    const navigate = useNavigate();

    const sections = [
        {
            id: "introduction",
            title: "Introduction",
        },
        {
            id: "information",
            title: "Information We Collect",
        },
        {
            id: "usage",
            title: "How We Use Information",
        },
        {
            id: "storage",
            title: "Data Storage & Security",
        },
        {
            id: "sharing",
            title: "Information Sharing",
        },
        {
            id: "cookies",
            title: "Cookies & Technologies",
        },
        {
            id: "rights",
            title: "Your Rights",
        },
        {
            id: "third-party",
            title: "Third-Party Services",
        },
        {
            id: "children",
            title: "Children's Privacy",
        },
        {
            id: "changes",
            title: "Policy Changes",
        },
        {
            id: "contact",
            title: "Contact Us",
        },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* ================================================= */}
            {/* Background */}
            {/* ================================================= */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

                <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
            </div>

            {/* ================================================= */}
            {/* Main */}
            {/* ================================================= */}

            <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* ================================================= */}
                {/* Back Button */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="
                        mb-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white/60
                        transition
                        hover:border-violet-400/20
                        hover:bg-violet-500/10
                        hover:text-white
                        active:scale-95
                    "
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                {/* ================================================= */}
                {/* Hero */}
                {/* ================================================= */}

                <section className="mb-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div
                                className="
                                    mb-4
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-violet-400/20
                                    bg-violet-500/10
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-violet-300
                                "
                            >
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Privacy & Security
                            </div>

                            <h1
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            >
                                Privacy Policy
                            </h1>

                            <p
                                className="
                                    mt-3
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-white/45
                                    sm:text-base
                                "
                            >
                                Your privacy matters to us. This
                                Privacy Policy explains how MiniVerse
                                collects, uses, stores, and protects
                                your information when you use our
                                applications and services.
                            </p>

                            <p className="mt-4 text-xs text-white/30">
                                Last updated: August 12, 2026
                            </p>
                        </div>

                        {/* Security Icon */}

                        <div
                            className="
                                hidden
                                h-24
                                w-24
                                shrink-0
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-violet-400/20
                                bg-violet-500/10
                                shadow-xl
                                shadow-violet-500/5
                                sm:flex
                            "
                        >
                            <ShieldCheck className="h-11 w-11 text-violet-400" />
                        </div>
                    </div>
                </section>

                {/* ================================================= */}
                {/* Privacy Highlights */}
                {/* ================================================= */}

                <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <PrivacyCard
                        icon={Lock}
                        title="Data Protection"
                        description="We take reasonable measures to protect your information."
                    />

                    <PrivacyCard
                        icon={Database}
                        title="Responsible Storage"
                        description="Information is stored and handled according to our services."
                    />

                    <PrivacyCard
                        icon={Eye}
                        title="Transparency"
                        description="We explain what information we collect and why."
                    />

                    <PrivacyCard
                        icon={UserCheck}
                        title="Your Control"
                        description="You can manage certain information and account settings."
                    />
                </section>

                {/* ================================================= */}
                {/* Content Layout */}
                {/* ================================================= */}

                <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
                    {/* ================================================= */}
                    {/* Sidebar */}
                    {/* ================================================= */}

                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    p-3
                                "
                            >
                                <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                                    Contents
                                </p>

                                <nav className="space-y-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            type="button"
                                            onClick={() =>
                                                scrollToSection(
                                                    section.id
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-3
                                                py-2
                                                text-left
                                                text-xs
                                                text-white/45
                                                transition
                                                hover:bg-violet-500/10
                                                hover:text-violet-300
                                            "
                                        >
                                            <span>
                                                {section.title}
                                            </span>

                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* ================================================= */}
                    {/* Policy Content */}
                    {/* ================================================= */}

                    <article
                        className="
                            min-w-0
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-5
                            shadow-2xl
                            shadow-black/20
                            sm:p-8
                            lg:p-10
                        "
                    >
                        {/* Introduction */}

                        <PolicySection
                            id="introduction"
                            number="01"
                            icon={FileText}
                            title="Introduction"
                        >
                            <p>
                                Welcome to MiniVerse. We respect your
                                privacy and are committed to protecting
                                the information you provide while using
                                our applications, websites, and related
                                services.
                            </p>

                            <p>
                                This Privacy Policy describes the types
                                of information that may be collected,
                                how that information may be used, and
                                the choices you may have regarding your
                                information.
                            </p>

                            <p>
                                By using MiniVerse, you acknowledge that
                                you have read and understood this
                                Privacy Policy.
                            </p>
                        </PolicySection>

                        {/* Information */}

                        <PolicySection
                            id="information"
                            number="02"
                            icon={Database}
                            title="Information We Collect"
                        >
                            <p>
                                Depending on how you use our services,
                                we may collect information that you
                                voluntarily provide or information
                                generated when you interact with the
                                application.
                            </p>

                            <h3>Information you provide</h3>

                            <ul>
                                <li>
                                    Name or profile information
                                </li>

                                <li>
                                    Email address or contact details
                                </li>

                                <li>
                                    Account credentials
                                </li>

                                <li>
                                    Financial information that you
                                    choose to enter into the Money
                                    Tracker application
                                </li>

                                <li>
                                    Feedback, support requests, or
                                    other information you voluntarily
                                    submit
                                </li>
                            </ul>

                            <h3>Information generated through use</h3>

                            <ul>
                                <li>
                                    Application usage information
                                </li>

                                <li>
                                    Device and browser information
                                </li>

                                <li>
                                    Basic diagnostic information
                                </li>

                                <li>
                                    Preferences and application
                                    settings
                                </li>
                            </ul>
                        </PolicySection>

                        {/* Usage */}

                        <PolicySection
                            id="usage"
                            number="03"
                            icon={Settings}
                            title="How We Use Information"
                        >
                            <p>
                                Information may be used to provide,
                                maintain, improve, and personalize our
                                services.
                            </p>

                            <ul>
                                <li>
                                    To provide application features
                                    and functionality
                                </li>

                                <li>
                                    To save and display your
                                    transactions and preferences
                                </li>

                                <li>
                                    To improve application
                                    performance and usability
                                </li>

                                <li>
                                    To respond to support requests
                                </li>

                                <li>
                                    To identify and resolve technical
                                    issues
                                </li>

                                <li>
                                    To maintain the security and
                                    integrity of our services
                                </li>

                                <li>
                                    To comply with applicable legal
                                    requirements
                                </li>
                            </ul>
                        </PolicySection>

                        {/* Storage */}

                        <PolicySection
                            id="storage"
                            number="04"
                            icon={Lock}
                            title="Data Storage & Security"
                        >
                            <p>
                                We take reasonable technical and
                                organizational measures to protect
                                information against unauthorized
                                access, alteration, disclosure, or
                                destruction.
                            </p>

                            <p>
                                However, no method of transmission or
                                electronic storage can be guaranteed to
                                be completely secure. Therefore, we
                                cannot guarantee absolute security of
                                your information.
                            </p>

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-amber-400/10
                                    bg-amber-400/5
                                    p-4
                                "
                            >
                                <p className="!text-amber-200/70">
                                    <strong className="text-amber-300">
                                        Important:
                                    </strong>{" "}
                                    You should use a strong password
                                    and avoid sharing your account
                                    credentials with others.
                                </p>
                            </div>
                        </PolicySection>

                        {/* Sharing */}

                        <PolicySection
                            id="sharing"
                            number="05"
                            icon={UserCheck}
                            title="Information Sharing"
                        >
                            <p>
                                We do not sell your personal
                                information.
                            </p>

                            <p>
                                Information may be shared only when
                                reasonably necessary to operate our
                                services, comply with legal obligations,
                                protect our rights, or prevent fraud
                                and abuse.
                            </p>

                            <p>
                                When third-party service providers are
                                used, they may process information only
                                as necessary to provide the services
                                they perform for us and subject to
                                applicable requirements.
                            </p>
                        </PolicySection>

                        {/* Cookies */}

                        <PolicySection
                            id="cookies"
                            number="06"
                            icon={Cookie}
                            title="Cookies & Similar Technologies"
                        >
                            <p>
                                Our website or application may use
                                cookies, local storage, or similar
                                technologies to remember preferences,
                                maintain sessions, improve performance,
                                and understand how our services are
                                used.
                            </p>

                            <p>
                                You can control certain cookies through
                                your browser settings. Disabling some
                                technologies may affect parts of the
                                application.
                            </p>
                        </PolicySection>

                        {/* Rights */}

                        <PolicySection
                            id="rights"
                            number="07"
                            icon={UserCheck}
                            title="Your Rights"
                        >
                            <p>
                                Depending on applicable law, you may
                                have rights regarding your personal
                                information.
                            </p>

                            <ul>
                                <li>
                                    Request access to information we
                                    hold about you
                                </li>

                                <li>
                                    Request correction of inaccurate
                                    information
                                </li>

                                <li>
                                    Request deletion where applicable
                                </li>

                                <li>
                                    Withdraw certain permissions or
                                    consent
                                </li>

                                <li>
                                    Contact us regarding privacy
                                    concerns
                                </li>
                            </ul>

                            <p>
                                To exercise an applicable right, please
                                contact us using the information
                                provided below.
                            </p>
                        </PolicySection>

                        {/* Third Party */}

                        <PolicySection
                            id="third-party"
                            number="08"
                            icon={Eye}
                            title="Third-Party Services"
                        >
                            <p>
                                MiniVerse may use third-party
                                infrastructure, analytics, hosting,
                                authentication, database, payment, or
                                communication services.
                            </p>

                            <p>
                                These third parties may process
                                information according to their own
                                privacy policies and terms. We
                                recommend reviewing the privacy policies
                                of third-party services you interact
                                with.
                            </p>
                        </PolicySection>

                        {/* Children */}

                        <PolicySection
                            id="children"
                            number="09"
                            icon={ShieldCheck}
                            title="Children's Privacy"
                        >
                            <p>
                                Our services are not intentionally
                                designed to collect personal information
                                from children in circumstances where
                                such collection is prohibited by
                                applicable law.
                            </p>

                            <p>
                                If you believe that a child has provided
                                personal information to us improperly,
                                please contact us so that we can review
                                and take appropriate action.
                            </p>
                        </PolicySection>

                        {/* Changes */}

                        <PolicySection
                            id="changes"
                            number="10"
                            icon={FileText}
                            title="Changes to This Policy"
                        >
                            <p>
                                We may update this Privacy Policy from
                                time to time to reflect changes in our
                                services, legal requirements, or
                                privacy practices.
                            </p>

                            <p>
                                When changes are made, the updated
                                version will be posted with a revised
                                "Last updated" date.
                            </p>

                            <p>
                                We encourage you to review this page
                                periodically to stay informed about our
                                privacy practices.
                            </p>
                        </PolicySection>

                        {/* Contact */}

                        <PolicySection
                            id="contact"
                            number="11"
                            icon={Mail}
                            title="Contact Us"
                            last
                        >
                            <p>
                                If you have questions, concerns, or
                                requests regarding this Privacy Policy
                                or your personal information, please
                                contact us.
                            </p>

                            <div
                                className="
                                    mt-5
                                    rounded-2xl
                                    border
                                    border-violet-400/10
                                    bg-violet-500/5
                                    p-5
                                "
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-violet-500/10
                                        "
                                    >
                                        <Mail className="h-5 w-5 text-violet-400" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            Privacy Support
                                        </p>

                                        <p className="mt-1 text-sm text-white/40">
                                            For privacy-related
                                            questions, contact your
                                            designated support email.
                                        </p>

                                        <a
                                            href="mailto:privacy@yourdomain.com"
                                            className="
                                                mt-3
                                                inline-block
                                                text-sm
                                                font-medium
                                                text-violet-400
                                                transition
                                                hover:text-violet-300
                                            "
                                        >
                                            privacy@yourdomain.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>
                    </article>
                </div>

                {/* ================================================= */}
                {/* Footer Notice */}
                {/* ================================================= */}

                <div className="mt-8 text-center">
                    <p className="text-xs text-white/25">
                        © 2026 MiniVerse. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
};

/* ================================================= */
/* Privacy Card */
/* ================================================= */

const PrivacyCard = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
                transition
                hover:border-violet-400/20
                hover:bg-violet-500/[0.04]
            "
        >
            <div
                className="
                    mb-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-500/10
                "
            >
                <Icon className="h-4.5 w-4.5 text-violet-400" />
            </div>

            <h3 className="text-sm font-semibold text-white">
                {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-white/35">
                {description}
            </p>
        </div>
    );
};

/* ================================================= */
/* Policy Section */
/* ================================================= */

const PolicySection = ({
    id,
    number,
    icon: Icon,
    title,
    children,
    last = false,
}) => {
    return (
        <section
            id={id}
            className={`
                scroll-mt-24
                ${!last
                    ? "border-b border-white/[0.07] pb-9 mb-9"
                    : ""
                }
            `}
        >
            <div className="mb-5 flex items-start gap-4">
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-violet-400/10
                        bg-violet-500/10
                    "
                >
                    <Icon className="h-4.5 w-4.5 text-violet-400" />
                </div>

                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400/60">
                        Section {number}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                        {title}
                    </h2>
                </div>
            </div>

            <div
                className="
                    space-y-4
                    text-sm
                    leading-7
                    text-white/50
                    sm:text-[15px]
                "
            >
                {children}
            </div>
        </section>
    );
};

export default Policy;