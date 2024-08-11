module.exports = {
  motion: {
    div: ({ children, layoutId, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, layoutId, ...props }) => <span {...props}>{children}</span>,
    // Add other elements as needed
  },
  AnimatePresence: ({ children }) => children,
};
