import { Alert } from "flowbite-react";
import { useMessage } from "../context/MessageContext";
import { AnimatePresence, motion } from "motion/react";

export default function MessageDialog() {
    const { message, setMessage } = useMessage();

    const colorMap = {
        success: 'success',
        error: 'failure',
        info: 'info',
        warning: 'warning',
        loading: 'loading'
    };

    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-circle-exclamation',
        info: 'fa-circle-info',
        warning: 'fa-circle-exclamation',
        loading: 'fa-circle-notch fa-spin'
    };

    return <AnimatePresence>
        {message &&
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed top-4 right-4 z-50 w-[30rem]"
            >
                <Alert color={colorMap[message.type]} >
                    <div className="flex flex-row space-x-2 items-start" >
                        <button
                            className='p-0 hover:-translate-y-0.5 active:translate-y-0 hover:text-blue-500 transition duration-200 ease-in-out cursor-pointer'
                            onClick={() => setMessage(null)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div>
                            <i className={'fa-solid ' + iconMap[message.type]}></i>
                            <span> </span>
                            {message.text}
                        </div>
                    </div>
                </Alert>
            </motion.div>
        }
    </AnimatePresence>;
}
