import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const useGetWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);

      return width;
};

export default useGetWidth;
