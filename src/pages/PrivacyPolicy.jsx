import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#140b38] via-[#2b135c] to-[#41136d] py-10 px-4">
            <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Privacy Policy
                    </h1>

                    <p className="mt-4 max-w-2xl mx-auto text-white/70">
                        Your privacy is important to us. This Privacy Policy explains
                        how Mini Verse collects, uses, and protects your information
                        when you use our application.
                    </p>
                </div>

                <div className="space-y-8 text-white/80 leading-8">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            1. Information We Collect
                        </h2>

                        <p>
                            Mini Verse is designed to provide an enjoyable experience
                            without collecting unnecessary personal information.
                            Depending on the features you use, we may temporarily store
                            application data such as game progress or settings on your
                            device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            2. How We Use Information
                        </h2>

                        <p>
                            Any information used by the application is intended solely
                            to improve functionality, enhance user experience, and
                            maintain application performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            3. Local Storage
                        </h2>

                        <p>
                            The application may store data locally on your device,
                            including game progress, preferences, or settings. This
                            information remains on your device unless you choose to
                            remove it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            4. Third-Party Services
                        </h2>

                        <p>
                            We may use trusted third-party services for hosting,
                            analytics, or application delivery. These providers may
                            process technical information according to their own
                            privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            5. Data Security
                        </h2>

                        <p>
                            We take reasonable measures to protect your information
                            from unauthorized access, disclosure, or misuse.
                            However, no online service can guarantee complete
                            security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            6. Children's Privacy
                        </h2>

                        <p>
                            Mini Verse does not knowingly collect personal
                            information from children. If you believe that a child
                            has provided personal information, please contact us so
                            appropriate action can be taken.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            7. Changes to This Privacy Policy
                        </h2>

                        <p>
                            This Privacy Policy may be updated periodically. Any
                            changes will be posted on this page with the latest
                            revision date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            8. Contact Us
                        </h2>

                        <p>
                            If you have any questions or concerns regarding this
                            Privacy Policy, please contact the developer through the
                            official communication channels.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
                    © {new Date().getFullYear()} Mr Raza. All Rights Reserved.
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;