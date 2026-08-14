import {
    Download,
    Plus,
    Upload,
    WalletCards,
} from "lucide-react";

import {
    exportRecoveries,
    importRecoveries,
} from "../utils/storage";

export default function MoneyRecoveryHeader({
    onAdd,
    onImport,
}) {
    const handleImport = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            const data = await importRecoveries(file);
            onImport(data);
        } catch {
            alert("Invalid backup file.");
        }

        event.target.value = "";
    };

    return (
        <header className="mb-5 sm:mb-6">
            <div
                className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
        "
            >
                {/* Title */}
                <div className="flex min-w-0 items-center gap-3">
                    {/* Icon */}
                    <div
                        className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[15px]
                    border
                    border-emerald-400/15
                    bg-emerald-400/[0.08]
                    text-emerald-400
                    shadow-lg
                    shadow-emerald-500/5
                    sm:h-12
                    sm:w-12
                "
                    >
                        <WalletCards size={21} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                        <h1
                            className="
                        truncate
                        text-base
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-xl
                        lg:text-2xl
                    "
                        >
                            Money Recovery Tracker
                        </h1>

                        <p
                            className="
                        mt-1
                        max-w-xl
                        text-[10px]
                        leading-4
                        text-slate-500
                        sm:text-xs
                        sm:leading-5
                    "
                        >
                            Track money you've given and recover it on time.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div
                    className="
                flex
                w-full
                gap-2
                sm:w-auto
            "
                >
                    {/* Export */}
                    <button
                        type="button"
                        onClick={exportRecoveries}
                        className="
                    flex
                    h-9
                    flex-1
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    px-3
                    text-[10px]
                    font-semibold
                    text-slate-400
                    transition-all
                    hover:border-white/[0.14]
                    hover:bg-white/[0.07]
                    hover:text-white
                    active:scale-95
                    sm:h-10
                    sm:flex-none
                    sm:px-4
                    sm:text-xs
                "
                    >
                        <Download size={14} />
                        Export
                    </button>

                    {/* Import */}
                    <label
                        className="
                    flex
                    h-9
                    flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    px-3
                    text-[10px]
                    font-semibold
                    text-slate-400
                    transition-all
                    hover:border-white/[0.14]
                    hover:bg-white/[0.07]
                    hover:text-white
                    active:scale-95
                    sm:h-10
                    sm:flex-none
                    sm:px-4
                    sm:text-xs
                "
                    >
                        <Upload size={14} />

                        Import

                        <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={handleImport}
                        />
                    </label>

                    {/* Desktop / Tablet Add Recovery */}
                    <button
                        type="button"
                        onClick={onAdd}
                        className="
                    hidden
                    h-10
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-green-500
                    px-4
                    text-xs
                    font-bold
                    text-white
                    shadow-lg
                    shadow-emerald-500/20
                    transition-all
                    hover:from-emerald-400
                    hover:to-green-400
                    hover:shadow-emerald-500/30
                    active:scale-95
                    sm:flex
                "
                    >
                        <Plus size={15} />
                        Add Recovery
                    </button>
                </div>
            </div>

            {/* Mobile Floating Add Recovery */}
            <button
                onClick={onAdd}
                aria-label="Add Recovery"
                className="
        fixed
        bottom-5
        right-5
        z-50

        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full

        bg-gradient-to-br
        from-emerald-400
        to-green-600

        text-white

        ring-1
        ring-emerald-300/30

        shadow-[0_0_15px_rgba(16,185,129,0.45)]
        transition-all
        duration-200

        hover:scale-105
        hover:shadow-[0_0_25px_rgba(16,185,129,0.65)]

        active:scale-90
        active:shadow-[0_0_12px_rgba(16,185,129,0.35)]

        focus:outline-none
        focus:ring-2
        focus:ring-emerald-400
        focus:ring-offset-2
        focus:ring-offset-slate-950

        sm:hidden
    "
            >
                <Plus
                    size={24}
                    strokeWidth={2.5}
                />
            </button>
        </header>
    );
}