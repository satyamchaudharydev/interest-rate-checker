import { AnimatePresence, motion } from "framer-motion"

export const Loader = ({isLoading}: {isLoading: boolean}) => {
    return <AnimatePresence>
    {isLoading && (
      <motion.div
        data-testid="loader"
        className="absolute top-0 left-0 right-0 flex justify-center  bg-[rgba(255,255,255,0.4)] p-4  h-full backdrop-blur-sm"
      >
        <motion.span
          className="ml-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <svg viewBox="25 25 50 50" className="container">
            <circle cx="50" cy="50" r="20" className="loader"></circle>
          </svg>
        </motion.span>
      </motion.div>
    )}
  </AnimatePresence>
}