import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return { isLoading, setIsLoading };
};

export default useLoading;
