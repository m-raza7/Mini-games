import React from "react";

const TermsConditions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#140b38] via-[#2b135c] to-[#41136d] py-10 px-4">
            <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Terms & Conditions
                    </h1>

                    <p className="mt-4 text-white/70 max-w-2xl mx-auto">
                        Please read these Terms & Conditions carefully before using
                        the Mini Verse application.
                    </p>
                </div>

                <div className="space-y-8 text-white/80 leading-8">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            1. Acceptance of Terms
                        </h2>

                        <p>
                            By accessing or using Mini Verse, you agree to comply
                            with these Terms & Conditions. If you do not agree with
                            any part of these terms, please discontinue using the
                            application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            2. Use of the Application
                        </h2>

                        <p>
                            This application is provided for educational,
                            entertainment, and demonstration purposes. You agree not
                            to misuse, modify, or attempt to disrupt the services
                            provided.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            3. Intellectual Property
                        </h2>

                        <p>
                            All application content, source code, branding, logos,
                            graphics, and UI designs remain the intellectual property
                            of the developer unless otherwise stated.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            4. User Responsibilities
                        </h2>

                        <p>
                            Users are responsible for using the application
                            respectfully and in accordance with applicable laws. Any
                            misuse that affects other users or the application may
                            result in restricted access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            5. Disclaimer
                        </h2>

                        <p>
                            The application is provided on an "as is" basis without
                            warranties of any kind. We do not guarantee uninterrupted
                            availability or error-free operation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            6. Limitation of Liability
                        </h2>

                        <p>
                            The developer shall not be held responsible for any
                            direct, indirect, incidental, or consequential damages
                            resulting from the use or inability to use this
                            application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            7. Changes to These Terms
                        </h2>

                        <p>
                            These Terms & Conditions may be updated at any time.
                            Continued use of the application after changes are
                            published constitutes acceptance of those changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            8. Contact
                        </h2>

                        <p>
                            If you have any questions regarding these Terms &
                            Conditions, please contact the developer.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-white/10 pt-6 text-center text-white/50 text-sm">
                    © {new Date().getFullYear()} Mr Raza. All Rights Reserved.
                </div>

            </div>
        </div>
    );
};

export default TermsConditions;