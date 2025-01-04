export const handleCopy = (code, setIsCopied) => {
  navigator.clipboard.writeText(code).then(() => {
    setIsCopied(true);
  });
};
