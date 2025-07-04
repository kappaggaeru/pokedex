
export const SupportComponent: React.FC = () => (
    <div className="flex flex-col">
        <div className="text-gray-500 dark:text-gray-400">
            <p className="font-bold">Support this developer — buy him a coffee!</p>
            <p>This website was built by a single developer. Your support helps fund new features and, of course, coffee!</p>
            <p>If you&aposre in Argentina, you can use <i>Cafecito</i> to pay in ARS.</p>
            <p>If you&aposre in another country, use <i>PayPal</i> to pay in USD.</p>
            <p>Thank you for your support!</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
            <div>
                <div className="
                    bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700
                    border border-gray-200/50 dark:border-gray-600/50 p-4 rounded-lg cursor-pointer
                ">
                    <h5 className="text-gray-500 dark:text-gray-400 first-letter:uppercase">Cafecito</h5>
                </div>
            </div>
            <div>
                <div className="
                    bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700
                    border border-gray-200/50 dark:border-gray-600/50 p-4 rounded-lg cursor-pointer
                ">
                    <h5 className="text-gray-500 dark:text-gray-400 first-letter:uppercase">PayPal</h5>
                </div>
            </div>
        </div>
    </div>
)